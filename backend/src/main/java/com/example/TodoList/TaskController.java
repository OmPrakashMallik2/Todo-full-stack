package com.example.TodoList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> allTasks() {
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @PostMapping("/task")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task newTask = taskService.addTask(task);
        return new ResponseEntity<>(newTask, HttpStatus.OK);
    }

    @DeleteMapping("tasks/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Integer taskId) throws Exception {
        return new ResponseEntity<>(taskService.deleteTask(taskId), HttpStatus.OK);
    }

    @PutMapping("tasks/{taskId}")
    public ResponseEntity<Task> doneTask(@PathVariable Integer taskId) throws Exception {
        return new ResponseEntity<>(taskService.taskCompleted(taskId), HttpStatus.OK);
    }
}
