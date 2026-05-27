import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  HandHeart,
  MessageSquareText,
  Send,
  ShieldAlert,
  UserX,
  X,
} from "lucide-react";

import Card from "./Card";
import { adminOngs, adminSummaryCards, complaintReports, ongMessages, reportActionResults, reportActions } from "../data/adminData";

const tabs = [
  { id: "overview", label: "Visão geral", icon: BarChart3 },
  { id: "reports", label: "Reclamações e Denúncias", icon: ShieldAlert },
  { id: "ongs", label: "ONGs e Impacto Social", icon: HandHeart },
  { id: "queue", label: "Operação", icon: ClipboardList },
];

const operationItems = [
  { id: "match-1", group: "Solicitações de matches", title: "Arena Norte quer abrir Match Gold", status: "Pendente" },
  { id: "torneio-1", group: "Torneios pendentes", title: "Copa Bairro Sul", status: "Pendente" },
  { id: "parceiro-1", group: "Parceiros aguardando aprovação", title: "Escola Futuro Atleta", status: "Pendente" },
  { id: "evento-1", group: "Eventos solidários", title: "Festival Solidário de sábado", status: "Em análise" },
];

function AdminWorkspace({ onNotify, variant = "mobile" }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportStatus, setReportStatus] = useState(() => readStorage("sportmatch-report-status"));
  const [selectedOngId, setSelectedOngId] = useState(adminOngs[0].id);
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = readStorage("sportmatch-ong-chat");
    return Object.keys(saved).length ? saved : { [adminOngs[0].id]: ongMessages };
  });
  const [messageDraft, setMessageDraft] = useState("");
  const [operationStatus, setOperationStatus] = useState(() => readStorage("sportmatch-admin-operation-status"));

  const selectedOng = adminOngs.find((ong) => ong.id === selectedOngId) ?? adminOngs[0];
  const currentMessages = chatMessages[selectedOng.id] ?? ongMessages;

  const reportStats = useMemo(() => {
    const finalStatuses = Object.values(reportStatus);
    return {
      open: complaintReports.filter((report) => !["Resolvida", "Arquivada"].includes(reportStatus[report.id] ?? report.status)).length,
      resolved: finalStatuses.filter((status) => status === "Resolvida").length + 48,
      critical: complaintReports.filter((report) => report.severity === "Crítica").length,
    };
  }, [reportStatus]);

  function updateReport(report, action) {
    const result = reportActionResults[action];
    setReportStatus((current) => {
      const next = { ...current, [report.id]: result.status };
      window.localStorage.setItem("sportmatch-report-status", JSON.stringify(next));
      return next;
    });
    setSelectedReport((current) => (current ? { ...current, status: result.status } : current));
    onNotify?.(result.message);
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = messageDraft.trim();
    if (!text) {
      return;
    }

    setChatMessages((current) => {
      const next = {
        ...current,
        [selectedOng.id]: [...(current[selectedOng.id] ?? ongMessages), { from: "sportmatch", text }],
      };
      window.localStorage.setItem("sportmatch-ong-chat", JSON.stringify(next));
      return next;
    });
    setMessageDraft("");
    onNotify?.("Mensagem enviada para a ONG");
  }

  function updateOperation(item, status, message) {
    setOperationStatus((current) => {
      const next = { ...current, [item.id]: status };
      window.localStorage.setItem("sportmatch-admin-operation-status", JSON.stringify(next));
      return next;
    });
    onNotify?.(message);
  }

  return (
    <div className={`admin-workspace ${variant}`}>
      <section className="admin-tabs" aria-label="Abas administrativas">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button className={activeTab === tab.id ? "active" : ""} key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}>
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </section>

      {activeTab === "overview" && (
        <section className="admin-overview-grid">
          {adminSummaryCards.map((item) => (
            <Card className="admin-summary-card" key={item.id}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <span>{item.trend}</span>
            </Card>
          ))}
          <Card className="admin-insight-card" glow>
            <span className="badge gold">
              <AlertTriangle size={14} />
              Central ativa
            </span>
            <h3>Reclamações e impacto social em uma visão de gestão.</h3>
            <p>{reportStats.open} reclamações abertas, {reportStats.critical} crítica e {adminOngs.length} ONGs acompanhadas.</p>
          </Card>
        </section>
      )}

      {activeTab === "reports" && (
        <section className="admin-reports-panel">
          <div className="admin-panel-head">
            <div>
              <span className="badge">Central de atendimento</span>
              <h3>Reclamações e Denúncias</h3>
            </div>
            <div className="admin-filter-pills">
              <span>{reportStats.open} abertas</span>
              <span>{reportStats.resolved} resolvidas</span>
              <span>{reportStats.critical} crítica</span>
            </div>
          </div>

          <div className="complaint-list">
            {complaintReports.map((report) => (
              <article className="complaint-card" data-severity={severityKey(report.severity)} key={report.id}>
                <div>
                  <span className="complaint-type">{report.type}</span>
                  <strong>{report.complainant}</strong>
                  <small>Denunciado: {report.reportedUser}</small>
                </div>
                <p>{report.summary}</p>
                <div className="complaint-meta">
                  <StatusPill status={reportStatus[report.id] ?? report.status} />
                  <span>{report.severity}</span>
                  <span>{report.date}</span>
                </div>
                <button type="button" onClick={() => setSelectedReport(report)}>
                  Analisar
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "ongs" && (
        <section className="admin-ong-panel">
          <div className="admin-panel-head">
            <div>
              <span className="badge gold">ONGs e Impacto Social</span>
              <h3>Parceiras, chat e arrecadação por instituição.</h3>
            </div>
          </div>

          <div className="admin-ong-layout">
            <div className="ong-list">
              {adminOngs.map((ong) => (
                <button className={selectedOng.id === ong.id ? "active" : ""} key={ong.id} type="button" onClick={() => setSelectedOngId(ong.id)}>
                  <strong>{ong.name}</strong>
                  <small>{ong.region}</small>
                  <span>{ong.status}</span>
                </button>
              ))}
            </div>

            <Card className="ong-detail-card">
              <div className="ong-detail-head">
                <div>
                  <span className="badge">{selectedOng.cause}</span>
                  <h3>{selectedOng.name}</h3>
                  <p>{selectedOng.owner} - {selectedOng.contact}</p>
                </div>
                <StatusPill status={selectedOng.status} />
              </div>
              <div className="ong-detail-grid">
                <span>Cidade/região <strong>{selectedOng.region}</strong></span>
                <span>Eventos vinculados <strong>{selectedOng.events}</strong></span>
                <span>Total arrecadado <strong>{selectedOng.total}</strong></span>
              </div>
            </Card>

            <Card className="ong-chat-card">
              <div className="ong-chat-head">
                <div>
                  <strong>{selectedOng.name}</strong>
                  <small>online agora</small>
                </div>
                <MessageSquareText size={18} />
              </div>
              <div className="ong-chat-messages">
                {currentMessages.map((message, index) => (
                  <span className={message.from === "sportmatch" ? "from-admin" : ""} key={`${message.text}-${index}`}>
                    {message.text}
                  </span>
                ))}
              </div>
              <form className="ong-chat-form" onSubmit={sendMessage}>
                <input value={messageDraft} onChange={(event) => setMessageDraft(event.target.value)} placeholder="Escrever mensagem" />
                <button type="submit" aria-label="Enviar mensagem">
                  <Send size={15} />
                </button>
              </form>
            </Card>
          </div>

          <div className="ong-impact-grid">
            {adminOngs.map((ong) => (
              <Card className="ong-impact-card" key={`impact-${ong.id}`}>
                <strong>{ong.name}</strong>
                <span>{ong.impact.food}</span>
                <span>{ong.impact.clothes}</span>
                <span>{ong.impact.events}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === "queue" && (
        <section className="admin-operation-panel">
          <div className="admin-panel-head">
            <div>
              <span className="badge">Fila operacional</span>
              <h3>Aprovações e revisões rápidas</h3>
            </div>
          </div>
          <div className="operation-table">
            {operationItems.map((item) => (
              <article className={operationStatus[item.id] ? "updated" : ""} key={item.id}>
                <span>{item.group}</span>
                <strong>{item.title}</strong>
                <StatusPill status={operationStatus[item.id] ?? item.status} />
                <div>
                  <button type="button" onClick={() => updateOperation(item, "Aprovado", "Solicitação aprovada")}>Aprovar</button>
                  <button type="button" onClick={() => updateOperation(item, "Recusado", "Solicitação recusada")}>Recusar</button>
                  <button type="button" onClick={() => updateOperation(item, "Em revisão", "Item enviado para revisão")}>Revisar</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedReport && (
        <ReportModal
          report={selectedReport}
          status={reportStatus[selectedReport.id] ?? selectedReport.status}
          onClose={() => setSelectedReport(null)}
          onAction={updateReport}
        />
      )}
    </div>
  );
}

function ReportModal({ report, status, onClose, onAction }) {
  return (
    <div className="admin-modal-backdrop" role="presentation">
      <section className="admin-analysis-modal" role="dialog" aria-modal="true" aria-label="Análise da reclamação">
        <header>
          <div>
            <span className="badge">Análise de reclamação</span>
            <h3>{report.type}</h3>
            <p>{report.complainant} contra {report.reportedUser}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar análise">
            <X size={18} />
          </button>
        </header>

        <div className="analysis-grid">
          <Card className="analysis-main">
            <StatusPill status={status} />
            <p>{report.details}</p>
            <div className="analysis-metrics">
              <span>Fair Play <strong>{report.fairPlay}</strong></span>
              <span>Reclamações anteriores <strong>{report.previousReports}</strong></span>
              <span>Gravidade <strong>{report.severity}</strong></span>
            </div>
          </Card>

          <Card className="analysis-list-card">
            <h4>Histórico do usuário denunciado</h4>
            {report.history.map((item) => <span key={item}>{item}</span>)}
          </Card>

          <Card className="analysis-list-card">
            <h4>Prints/evidências</h4>
            {report.evidence.map((item) => <span key={item}>{item}</span>)}
          </Card>

          <Card className="analysis-list-card">
            <h4>Comentários dos participantes</h4>
            {report.comments.map((item) => <span key={item}>{item}</span>)}
          </Card>
        </div>

        <footer>
          {reportActions.map((action) => (
            <button type="button" key={action} onClick={() => onAction(report, action)}>
              {action === "Arquivar denúncia" ? <Archive size={14} /> : action === "Suspender usuário" ? <UserX size={14} /> : <CheckCircle2 size={14} />}
              {action}
            </button>
          ))}
        </footer>
      </section>
    </div>
  );
}

function StatusPill({ status }) {
  return <b className="status-pill" data-status={statusKey(status)}>{status}</b>;
}

function statusKey(status) {
  return status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

function severityKey(severity) {
  return statusKey(severity);
}

function readStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "{}");
  } catch {
    return {};
  }
}

export default AdminWorkspace;
