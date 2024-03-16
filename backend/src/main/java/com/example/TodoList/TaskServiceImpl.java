package com.example.TodoList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task addTask(Task task) {
        taskRepository.save(task);
        return task;
    }

    @Override
    public String deleteTask(Integer taskId) throws Exception {
        Optional<Task> foundTask = taskRepository.findById(taskId);
        if (foundTask.isEmpty()) {
            throw new Exception("Task not found");
        }
        taskRepository.delete(foundTask.get());
        return "Task deleted with id " + taskId;
    }

    @Override
    public Task taskCompleted(Integer taskId) throws Exception {
        Optional<Task> foundTask = taskRepository.findById(taskId);
        if (foundTask.isEmpty()) {
            throw new Exception("task not found by id " + taskId);
        }
        Task oldTask = foundTask.get();
        if (!oldTask.getCompleted()) {
            oldTask.setCompleted(true);
        } else {
            oldTask.setCompleted(false);
        }
        taskRepository.save(oldTask);
        return oldTask;
    }

}
