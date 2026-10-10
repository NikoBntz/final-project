import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";
const TOKEN_KEY = "levinor_admin_token";

const initialForm = {
  username: "",
  password: "",
};

const emptyProductForm = {
  name: "",
  price: "",
  description: "",
  category: "",
  imageUrl: "",
};

function Admin() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [loginForm, setLoginForm] = useState(initialForm);
  const [loginError, setLoginError] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [editingProductId, setEditingProductId] = useState("");
  const [productMessage, setProductMessage] = useState("");
  const [productError, setProductError] = useState("");

  const loadDashboard = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo cargar el panel.");
      }

      setDashboard(data);
    } catch (error) {
      setLoginError(error.message);
      setToken("");
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    // Dashboard fetch synchronizes authenticated state with the API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, [loadDashboard, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  };

  const handleProductFieldChange = (event) => {
    const { name, value } = event.target;
    setProductForm((current) => ({ ...current, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo iniciar sesión.");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setDashboard(null);
      setLoginForm(initialForm);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setDashboard(null);
    setLoginForm(initialForm);
    setLoginError("");
    setProductForm(emptyProductForm);
    setEditingProductId("");
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    setProductMessage("");
    setProductError("");

    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `${API_URL}/api/admin/products/${editingProductId}`
      : `${API_URL}/api/admin/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price || 0),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo guardar el producto.");
      }

      setProductForm(emptyProductForm);
      setEditingProductId("");
      setProductMessage(editingProductId ? "Producto actualizado." : "Producto creado.");
      await loadDashboard();
    } catch (error) {
      setProductError(error.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setProductForm({
      name: product.name,
      price: String(product.price ?? ""),
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl || "",
    });
    setProductError("");
    setProductMessage("");
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo eliminar el producto.");
      }

      setProductMessage("Producto eliminado.");
      await loadDashboard();
    } catch (error) {
      setProductError(error.message);
    }
  };

  if (!token) {
    return (
      <div className="page-shell admin-page">
        <section className="section-heading align-left">
          <span className="eyebrow">Admin</span>
          <h1>Acceso al panel</h1>
        </section>

        <div className="admin-login-wrap">
          <form className="admin-login-card" onSubmit={handleLogin}>
            <label>
              <span>Usuario</span>
              <input name="username" value={loginForm.username} onChange={handleInputChange} />
            </label>
            <label>
              <span>Contraseña</span>
              <input type="password" name="password" value={loginForm.password} onChange={handleInputChange} />
            </label>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
            {loginError && <p className="error-message">{loginError}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell admin-page">
      <section className="section-heading align-left">
        <span className="eyebrow">Admin</span>
        <h1>Panel operativo</h1>
      </section>

      <div className="admin-toolbar">
        <span>Sesión activa</span>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="admin-layout">
        <main className="admin-main">
          {loading && !dashboard ? (
            <p className="empty-state">Cargando panel...</p>
          ) : (
            <>
              <div className="overview-grid">
                <div className="overview-card">
                  <span>Productos</span>
                  <strong>{dashboard?.stats?.productCount ?? 0}</strong>
                </div>
                <div className="overview-card">
                  <span>Leads</span>
                  <strong>{dashboard?.stats?.messageCount ?? 0}</strong>
                </div>
                <div className="overview-card">
                  <span>Abiertos</span>
                  <strong>{dashboard?.stats?.openLeads ?? 0}</strong>
                </div>
              </div>

              <section className="admin-panel admin-product-form-panel">
                <h3>{editingProductId ? "Editar producto" : "Agregar producto"}</h3>
                <form className="admin-product-form" onSubmit={submitProduct}>
                  <div className="form-row">
                    <label>
                      <span>Nombre</span>
                      <input name="name" value={productForm.name} onChange={handleProductFieldChange} />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      <span>Precio</span>
                      <input name="price" type="number" min="0" step="0.01" value={productForm.price} onChange={handleProductFieldChange} />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      <span>Categoría</span>
                      <input name="category" value={productForm.category} onChange={handleProductFieldChange} />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      <span>Imagen</span>
                      <input name="imageUrl" value={productForm.imageUrl} onChange={handleProductFieldChange} />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      <span>Descripción</span>
                      <textarea name="description" rows="4" value={productForm.description} onChange={handleProductFieldChange} />
                    </label>
                  </div>
                  <div className="admin-form-actions">
                    <button type="submit" className="btn btn-primary">
                      {editingProductId ? "Guardar cambios" : "Crear producto"}
                    </button>
                    {editingProductId && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingProductId("");
                          setProductForm(emptyProductForm);
                          setProductError("");
                          setProductMessage("");
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                  {productMessage && <p className="success-message">{productMessage}</p>}
                  {productError && <p className="error-message">{productError}</p>}
                </form>
              </section>

              <section className="admin-panel">
                <h3>Catálogo reciente</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dashboard?.products || []).map((product) => (
                      <tr key={product._id || product.name}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${Number(product.price).toFixed(2)}</td>
                        <td>
                          <div className="table-actions">
                            <button type="button" className="mini-action-btn" onClick={() => handleEditProduct(product)}>Editar</button>
                            <button type="button" className="mini-action-btn danger" onClick={() => handleDeleteProduct(product._id)}>Borrar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="admin-panel">
                <h3>Mensajes recientes</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Mensaje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dashboard?.messages || []).map((message) => (
                      <tr key={message._id || message.email}>
                        <td>{message.name}</td>
                        <td>{message.email}</td>
                        <td>{message.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Admin;
