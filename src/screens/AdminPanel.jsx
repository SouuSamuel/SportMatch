import AdminWorkspace from "../components/AdminWorkspace";

function AdminPanel({ onNotify }) {
  return (
    <div className="screen-stack admin-screen">
      <section className="screen-heading admin-heading">
        <span className="badge gold">Painel Admin</span>
        <h2>Central de gestão SportMatch.</h2>
        <p>Reclamações, denúncias, ONGs, impacto social e aprovações em uma visão organizada.</p>
      </section>

      <AdminWorkspace onNotify={onNotify} />
    </div>
  );
}

export default AdminPanel;
