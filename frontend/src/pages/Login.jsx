import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data);

      alert("Login exitoso");

      navigate("/dashboard");

    } catch (error) {

      alert("Credenciales incorrectas");
    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <h2 className="mb-4">Login</h2>

          <form onSubmit={handleLogin}>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100">
              Iniciar sesión
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;