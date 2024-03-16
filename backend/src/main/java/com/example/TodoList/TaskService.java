package com.example.TodoList;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    public List<Task> getAllTasks();
    public Task addTask(Task task);
    public String deleteTask(Integer taskId) throws Exception;
    public Task taskCompleted(Integer taskId) throws Exception;
}
