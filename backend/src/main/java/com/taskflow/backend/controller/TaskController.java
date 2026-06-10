package com.taskflow.backend.controller;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // Permitir solicitudes desde el frontend
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Obtener todas las tareas
    @GetMapping
    public List<Task> obtenerTareas() {
        return taskService.obtenerTareas();
    }

    // Obtener tarea por ID
    @GetMapping("/{id}")
    public Optional<Task> obtenerTareaPorId(@PathVariable Long id) {
        return taskService.obtenerTareaPorId(id);
    }

    // Crear tarea
    @PostMapping
    public Task crearTarea(@Valid@RequestBody Task task) {
        return taskService.crearTarea(task);
    }

    // Actualizar tarea
    @PutMapping("/{id}")
    public Task actualizarTarea(@PathVariable Long id, @Valid @RequestBody Task task) {
        return taskService.actualizarTarea(id, task);
    }

    // Eliminar tarea
    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable Long id) {
        taskService.eliminarTarea(id);
    }
}