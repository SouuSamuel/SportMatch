import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BarChart3, CheckCircle2, ClipboardList, Handshake, ShieldAlert, UsersRound } from "lucide-react";

import Card from "../components/Card";
import { adminRequests, adminStats, partners } from "../data/mockData";

const messageByAction = {
  Aprovar: "✅ Solicitacao aprovada",
  Recusar: "🚫 Solicitacao recusada",
  Revisar: "⚠️ Denuncia marcada para revisao",
  "Marcar como resolvido": "✅ Marcado como resolvido",
};

const adminColumns = [
  { label: "Solicitacoes pendentes", value: "18", icon: ClipboardList },
  { label: "Denuncias", value: "7", icon: ShieldAlert },
  { label: "Parceiros", value: "38", icon: Handshake },
  { label: "Usuarios reportados", value: "12", icon: UsersRound },
];

function AdminPanel({ onNotify }) {
  const [requestStatus, setRequestStatus] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("sportmatch-admin-status") ?? "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem("sportmatch-admin-status", JSON.stringify(requestStatus));
  }, [requestStatus]);

  const pendingCount = useMemo(
    () => adminRequests.filter((request) => !requestStatus[request.id]).length,
    [requestStatus],
  );

  function handleAction(request, action) {
    const message = messageByAction[action] ?? "Acao fake registrada";
    setRequestStatus((current) => ({
      ...current,
      [request.id]: action,
    }));
    onNotify?.(message);
  }

  return (
    <div className="screen-stack admin-screen">
      <section className="screen-heading admin-heading">
        <span className="badge gold">Painel Admin</span>
        <h2>Operacao fake do SportMatch.</h2>
        <p>Solicitacoes, denuncias, parceiros, ONGs, torneios e relatorios em uma visao de controle.</p>
      </section>

      <div className="admin-control-grid">
        {adminColumns.map((item) => {
          const Icon = item.icon;
          return (
            <Card className="admin-control-card" key={item.label}>
              <Icon size={20} />
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </Card>
          );
        })}
      </div>

      <Card className="admin-command-center" glow>
        <div>
          <span className="badge">
            <AlertTriangle size={14} />
            {pendingCount} pendencias
          </span>
          <h3>Fila de moderacao</h3>
        </div>
        <div className="admin-request-list">
          {adminRequests.map((request) => (
            <article className="admin-request-row" key={request.id}>
              <span>
                <em>{request.group}</em>
                <strong>{request.title}</strong>
                <small>{request.description}</small>
              </span>
              <b>{requestStatus[request.id] ?? request.severity}</b>
              <div>
                <button type="button" onClick={() => handleAction(request, "Aprovar")}>
                  Aprovar
                </button>
                <button type="button" onClick={() => handleAction(request, "Recusar")}>
                  Recusar
                </button>
                <button type="button" onClick={() => handleAction(request, "Revisar")}>
                  Revisar
                </button>
                <button type="button" onClick={() => handleAction(request, "Marcar como resolvido")}>
                  Resolver
                </button>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <div className="admin-split-grid">
        <Card className="admin-report-card">
          <h3>
            <BarChart3 size={18} />
            Estatisticas gerais
          </h3>
          <div className="admin-stat-list">
            {adminStats.map((stat) => (
              <span key={stat.label}>
                <small>{stat.label}</small>
                <strong>{stat.value}</strong>
                <em>{stat.trend}</em>
              </span>
            ))}
          </div>
        </Card>

        <Card className="admin-report-card">
          <h3>
            <CheckCircle2 size={18} />
            Parceiros em validacao
          </h3>
          <div className="admin-partner-list">
            {partners.slice(0, 4).map((partner) => (
              <span key={partner.id}>
                <strong>{partner.name}</strong>
                <small>{partner.type} - {partner.impact}</small>
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;
