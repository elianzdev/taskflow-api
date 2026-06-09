package com.taskflow.backend.service;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Obtener todas las tareas
    public List<Task> obtenerTareas() {
        return taskRepository.findAll();
    }

    // Obtener tarea por ID
    public Optional<Task> obtenerTareaPorId(Long id) {
        return taskRepository.findById(id);
    }

    // Crear tarea
    public Task crearTarea(Task task) {
        return taskRepository.save(task);
    }

    // Actualizar tarea
    public Task actualizarTarea(Long id, Task nuevaTask) {

        Task task = taskRepository.findById(id).orElseThrow();

        task.setTitulo(nuevaTask.getTitulo());
        task.setDescripcion(nuevaTask.getDescripcion());
        task.setEstado(nuevaTask.getEstado());

        return taskRepository.save(task);
    }

    // Eliminar tarea
    public void eliminarTarea(Long id) {
        taskRepository.deleteById(id);
    }
}