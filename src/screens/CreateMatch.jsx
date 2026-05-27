import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

import Card from "../components/Card";

function CreateMatch({ onCreateMatch }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "Match Gold de sexta",
    sport: "Futebol 7",
    time: "Hoje, 20:00",
    limit: "14",
    place: "Arena Norte",
    level: "Intermediário",
    social: "solidario",
  });
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
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
        organizer: "Você",
        social: form.social === "normal"
          ? null
          : {
              badge: form.social === "agasalho" ? "👕 Campanha do Agasalho" : "🥫 Match Solidário",
              requirement: "1kg de alimento não perecível OU roupas para doação",
              ong: form.social === "agasalho" ? "Arena Solidária" : "ONG Esperança",
              collected: "🥫 0kg arrecadados",
              clothes: "👕 0 peças doadas",
            },
        rules: ["Check-in 15 min antes", "Times equilibrados por nível", "Fair play obrigatório"],
        players: ["Você", "Convidado 1", "Convidado 2"],
        chat: [{ name: "Você", message: "Match criado com sucesso. Bora jogar!" }],
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
        <span className="badge">Formulário fake</span>
        <h2>Criar Match</h2>
        <p>Simulação visual para organizar esporte, horário, local, limite e nível.</p>
      </div>

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
              <option>Vôlei</option>
            </select>
          </label>
          <div className="form-grid">
            <label>
              Horário
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
            Nível
            <select value={form.level} onChange={(event) => updateField("level", event.target.value)}>
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
              <option>Misto</option>
            </select>
          </label>
          <label>
            Ação social
            <select value={form.social} onChange={(event) => updateField("social", event.target.value)}>
              <option value="solidario">🥫 Match Solidário</option>
              <option value="agasalho">👕 Campanha do Agasalho</option>
              <option value="normal">Match comum</option>
            </select>
          </label>
          <button className="primary-button form-submit" type="submit">
            {loading ? <Loader2 className="spin" size={18} /> : <CheckCircle2 size={18} />}
            {loading ? "Criando match..." : "Publicar match fake"}
          </button>
        </form>
      </Card>
    </div>
  );
}

export default CreateMatch;
