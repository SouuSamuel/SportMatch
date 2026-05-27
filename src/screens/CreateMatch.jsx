import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

import Card from "../components/Card";

function CreateMatch({ accessRole = "jogador", onCreateMatch }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "Match Gold de sexta",
    sport: "Futebol 7",
    time: "Hoje, 20:00",
    limit: "14",
    place: "Arena Norte",
    level: "Intermediario",
    social: "solidario",
  });
  const navigate = useNavigate();
  const isLimitedPlayer = accessRole === "jogador";

  function handleSubmit(event) {
    event.preventDefault();

    if (isLimitedPlayer) {
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      const id = `${form.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
      onCreateMatch?.({
        id,
        title: form.title,
        sport: form.sport,
        time: form.time,
        place: form.place,
        level: form.level,
        spots: 6,
        limit: Number(form.limit) || 14,
        price: "R$ 10",
        status: "Novo",
        vibe: "criado agora",
        fill: 42,
        organizer: "Voce",
        social: form.social === "normal"
          ? null
          : {
              badge: form.social === "agasalho" ? "Campanha do Agasalho" : "Match Solidario",
              requirement: "1kg de alimento nao perecivel OU roupas para doacao",
              ong: form.social === "agasalho" ? "Arena Solidaria" : "ONG Esperanca",
              collected: "0kg arrecadados",
              clothes: "0 pecas doadas",
            },
        rules: ["Check-in 15 min antes", "Times equilibrados por nivel", "Fair play obrigatorio"],
        players: ["Voce", "Convidado 1", "Convidado 2"],
        chat: [{ name: "Voce", message: "Match criado com sucesso. Bora jogar!" }],
      });
      setLoading(false);
      navigate("/matches");
    }, 900);
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="screen-stack">
      <div className="screen-heading">
        <span className={isLimitedPlayer ? "badge" : "badge gold"}>
          {isLimitedPlayer ? "Limite gratuito" : "Craque ilimitado"}
        </span>
        <h2>Criar Match</h2>
        <p>
          {isLimitedPlayer
            ? "Jogador gratuito tem limite visual de 2 matches por semana."
            : "Criacao ilimitada de matches com prioridade visual para atletas Craque."}
        </p>
      </div>

      {isLimitedPlayer && (
        <Card className="usage-limit-card">
          <h3>2/2 matches usados nesta semana</h3>
          <p>Assine Craque para liberar criacao ilimitada e destaque nos rankings.</p>
          <div className="limit-meter">
            <span style={{ width: "100%" }} />
          </div>
        </Card>
      )}

      <Card className="form-card" glow>
        <form onSubmit={handleSubmit}>
          <label>
            Nome do match
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} />
          </label>
          <label>
            Esporte
            <select value={form.sport} onChange={(event) => updateField("sport", event.target.value)}>
              <option>Futebol 7</option>
              <option>Futsal</option>
              <option>Basquete</option>
              <option>Volei</option>
            </select>
          </label>
          <div className="form-grid">
            <label>
              Horario
              <input value={form.time} onChange={(event) => updateField("time", event.target.value)} />
            </label>
            <label>
              Limite
              <input value={form.limit} onChange={(event) => updateField("limit", event.target.value)} />
            </label>
          </div>
          <label>
            Local
            <input value={form.place} onChange={(event) => updateField("place", event.target.value)} />
          </label>
          <label>
            Nivel
            <select value={form.level} onChange={(event) => updateField("level", event.target.value)}>
              <option>Iniciante</option>
              <option>Intermediario</option>
              <option>Avancado</option>
              <option>Misto</option>
            </select>
          </label>
          <label>
            Acao social
            <select value={form.social} onChange={(event) => updateField("social", event.target.value)}>
              <option value="solidario">Match Solidario</option>
              <option value="agasalho">Campanha do Agasalho</option>
              <option value="normal">Match comum</option>
            </select>
          </label>
          <button className="primary-button form-submit" type="submit" disabled={isLimitedPlayer}>
            {loading ? <Loader2 className="spin" size={18} /> : <CheckCircle2 size={18} />}
            {isLimitedPlayer ? "Limite semanal atingido" : loading ? "Criando match..." : "Publicar match"}
          </button>
        </form>
      </Card>
    </div>
  );
}

export default CreateMatch;
