package com.taskflow.backend.controller;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Obtener todas las tareas
    @GetMapping
    public List<Task> obtenerTareas() {
        return taskRepository.findAll();
    }

    // Obtener tarea por ID
    @GetMapping("/{id}")
    public Optional<Task> obtenerTareaPorId(@PathVariable Long id) {
        return taskRepository.findById(id);
    }

    // Crear tarea
    @PostMapping
    public Task crearTarea(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // Actualizar tarea
    @PutMapping("/{id}")
    public Task actualizarTarea(@PathVariable Long id, @RequestBody Task nuevaTask) {

        Task task = taskRepository.findById(id).orElseThrow();

        task.setTitulo(nuevaTask.getTitulo());
        task.setDescripcion(nuevaTask.getDescripcion());
        task.setEstado(nuevaTask.getEstado());

        return taskRepository.save(task);
    }

    // Eliminar tarea
    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}