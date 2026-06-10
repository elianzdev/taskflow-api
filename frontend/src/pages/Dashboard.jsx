import { useEffect, useState } from "react";
import api from "../services/api";

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

  const crearTarea = async (e) => {

    e.preventDefault();

    try {

      await api.post("/tasks", {
        titulo,
        descripcion,
        estado,
      });

      setTitulo("");
      setDescripcion("");
      setEstado("");

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

    setTitulo("");
    setDescripcion("");
    setEstado("");

    setEditandoId(null);

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

    <div className="container mt-5">

      <h1 className="mb-4">Dashboard</h1>

      <div className="card mb-4">

        <div className="card-body">

          <h4 className="mb-3">Crear tarea</h4>

          <form
               onSubmit={
               editandoId ? actualizarTarea : crearTarea
           }
          >

            <div className="mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

            </div>

            <div className="mb-3">

              <textarea
                className="form-control"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

            </div>

            <div className="mb-3">

              <select
                className="form-control"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >

                <option value="">Seleccione estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>

              </select>

            </div>

            <button className="btn btn-primary">
              {editandoId ? "Actualizar tarea" : "Crear tarea"}
            </button>

          </form>

        </div>

      </div>

      <div className="row">

        {
          tasks.map((task) => (

            <div className="col-md-4 mb-3" key={task.id}>

              <div className="card">

                <div className="card-body">

                  <h5>{task.titulo}</h5>

                  <p>{task.descripcion}</p>

                  <span className="badge bg-primary">
                    {task.estado}
                  </span>

                  <div className="mt-3">

                    <button
                     className="btn btn-danger btn-sm"
                     onClick={() => eliminarTarea(task.id)}
                    >
                    Eliminar
                    </button>

                    <button
                     className="btn btn-warning btn-sm ms-2"
                     onClick={() => cargarTarea(task)}
                    >
                    Editar
                    </button>

                    </div>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Dashboard;