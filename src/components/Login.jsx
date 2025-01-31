import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie] = useCookies(["username", "password", "secret_key"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el loader
  const [error, setError] = useState(null); // Estado para errores

  const handleLogin = async () => {
    if (!username || !password || !qr) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    setLoading(true); // Mostrar loader
    setError(null); // Reiniciar el error

    const formData = new FormData();
    formData.append("file", qr);

    try {
      const response = await fetch("http://127.0.0.1:8000/get-secret-key", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCookie("username", username, { path: "/" });
        setCookie("password", password, { path: "/" });
        setCookie("secret_key", data.secret_key, { path: "/" });
        window.location.href = "/";
      } else {
        setError("Error obteniendo la secret key: " + data.detail);
      }
    } catch (err) {
      setError("Error al comunicarse con el servidor.");
    } finally {
      setLoading(false); // Ocultar loader
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading} // Deshabilitar el input mientras se carga
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading} // Deshabilitar el input mientras se carga
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setQr(e.target.files[0])}
        disabled={loading} // Deshabilitar el input mientras se carga
      />

      {loading ? (
        <p>Espera mientras se verifica tu QR...</p>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          Login
        </button>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
