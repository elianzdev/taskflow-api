import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

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

  return (

    <div className="container mt-5">

      <h1 className="mb-4">Dashboard</h1>

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