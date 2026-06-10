import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {

    obtenerTareas();

  }, []);

  const obtenerTareas = async () => {

    try {

      const response = await api.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      alert("Error al obtener tareas");
    }
  };

  const limpiarFormulario = () => {

    setTitulo("");
    setDescripcion("");
    setEstado("");
    setEditandoId(null);
  };

  const crearTarea = async (e) => {

    e.preventDefault();

    try {

      await api.post("/tasks", {
        titulo,
        descripcion,
        estado,
      });

      limpiarFormulario();

      obtenerTareas();

    } catch (error) {

      alert("Error al crear tarea");
    }
  };

  const actualizarTarea = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/tasks/${editandoId}`, {
        titulo,
        descripcion,
        estado,
      });

      limpiarFormulario();

      obtenerTareas();

    } catch (error) {

      alert("Error al actualizar tarea");
    }
  };

  const eliminarTarea = async (id) => {

    try {

      await api.delete(`/tasks/${id}`);

      obtenerTareas();

    } catch (error) {

      alert("Error al eliminar tarea");
    }
  };

  const cargarTarea = (task) => {

    setTitulo(task.titulo);
    setDescripcion(task.descripcion);
    setEstado(task.estado);

    setEditandoId(task.id);
  };

  return (

    <>
      <Navbar />

      <div
        className="container py-5"
        style={{ minHeight: "100vh" }}
      >

        <div className="mb-5">

          <h1 className="fw-bold">
            Dashboard
          </h1>

          <p className="text-muted">
            Administra tus tareas fácilmente.
          </p>

        </div>

        <div className="card border-0 shadow-sm mb-5">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold mb-0">

                {
                  editandoId
                    ? "Editar tarea"
                    : "Nueva tarea"
                }

              </h4>

              {
                editandoId && (

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={limpiarFormulario}
                  >
                    Cancelar
                  </button>
                )
              }

            </div>

            <form
              onSubmit={
                editandoId
                  ? actualizarTarea
                  : crearTarea
              }
            >

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Título
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Descripción
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Ingrese la descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />

              </div>

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Estado
                </label>

                <select
                  className="form-select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >

                  <option value="">
                    Seleccione estado
                  </option>

                  <option value="Pendiente">
                    Pendiente
                  </option>

                  <option value="En progreso">
                    En progreso
                  </option>

                  <option value="Completada">
                    Completada
                  </option>

                </select>

              </div>

              <button className="btn btn-dark px-4">

                {
                  editandoId
                    ? "Actualizar tarea"
                    : "Crear tarea"
                }

              </button>

            </form>

          </div>

        </div>

        <div className="row g-4">

          {
            tasks.map((task) => (

              <div
                className="col-md-6 col-lg-4"
                key={task.id}
              >

                <div className="card border-0 shadow-sm h-100">

                  <div className="card-body d-flex flex-column p-4">

                    <div className="mb-3">

                      <h5 className="fw-bold">
                        {task.titulo}
                      </h5>

                      <p className="text-muted mb-0">
                        {task.descripcion}
                      </p>

                    </div>

                    <div className="mt-auto">

                      <span className="badge bg-dark mb-3">
                        {task.estado}
                      </span>

                      <div>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => eliminarTarea(task.id)}
                        >
                          Eliminar
                        </button>

                        <button
                          className="btn btn-outline-dark btn-sm ms-2"
                          onClick={() => cargarTarea(task)}
                        >
                          Editar
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </>
  );
}

export default Dashboard;