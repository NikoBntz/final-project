const overviewItems = [
  { label: 'Proyectos', value: '18' },
  { label: 'Leads', value: '36' },
  { label: 'Presupuestos', value: '9' }
];

const tableRows = [
  { id: 'KC-01', name: 'Cocina integral moderna', owner: 'Proyecto residencial', status: 'En proceso' },
  { id: 'CL-12', name: 'Closet empotrado', owner: 'Dormitorio familiar', status: 'Pendiente' },
  { id: 'AN-07', name: 'Anaqueles flotantes', owner: 'Sala de estar', status: 'Listo' }
];

function Admin() {
  return (
    <div className="page-shell admin-page">
      <section className="section-heading align-left">
        <span className="eyebrow">Admin</span>
        <h1>Panel operativo</h1>
      </section>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h3>Accesos rápidos</h3>
          <ul>
            <li>Catálogo</li>
            <li>Mensajes</li>
            <li>Proyectos</li>
          </ul>
        </aside>

        <main className="admin-main">
          <div className="overview-grid">
            {overviewItems.map((item) => (
              <div className="overview-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <section className="admin-panel">
            <h3>Últimos proyectos</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Proyecto</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.owner}</td>
                    <td><span className="status-badge">{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Admin;
