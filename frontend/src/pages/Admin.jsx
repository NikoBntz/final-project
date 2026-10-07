import React from "react";

const Admin = () => {
  return (
    <div className="admin-container">
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <div className="admin-content">
        <aside className="sidebar">
          <h3>Admin Navigation</h3>
          <ul>
            <li>
              <a href="#manage-content">Manage Content</a>
            </li>
            <li>
              <a href="#manage-users">Manage Users</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </aside>
        <main className="dashboard">
          <section id="manage-content">
            <h2>Manage Content</h2>
            <p>Tools for managing website content...</p>
          </section>
          <section id="manage-users">
            <h2>Manage Users</h2>
            <p>User management and permissions...</p>
          </section>
          <section id="settings">
            <h2>Settings</h2>
            <p>Configure website settings...</p>
          </section>
        </main>
      </div>
      <footer>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Admin;
