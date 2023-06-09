﻿using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using MentalHealth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentalHealth.Controllers;

[Authorize]
[ApiController, Route("/usertask")]
public class UserTaskController : ControllerBase
{
    private readonly TaskService _service;

    public UserTaskController(TaskService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task AddUserTask([FromBody] UserTask userTask)
    {
        await _service.Add(userTask);
    }

    [HttpGet("{taskID}")]
    public async Task<UserTask> GetUserTask(long taskID)
    {
        return await _service.Get(taskID);
    }
    
    [HttpGet]
    public async Task<IEnumerable<UserTask>> GetAllUserTasks()
    {
        return await _service.GetAll();
    }
    
    [HttpPut]
    public async Task UpdateUserTask([FromBody] UserTask task)
    {
        await _service.Update(task);
    }
    
    [HttpPut("{taskID}")]
    public async Task StartUserTask(long taskId)
    {
        await _service.Start(taskId);
    }
    
    [HttpDelete("{taskID}")]
    public async Task DeleteUserTask(long taskID)
    {
        await _service.Delete(taskID);
    }
}