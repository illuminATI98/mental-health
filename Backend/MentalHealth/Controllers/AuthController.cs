﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MentalHealth.Models.DTOs;
using MentalHealth.Models.Entities;
using MentalHealth.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace MentalHealth.Controllers;

[Route("/welcome")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserService _service;
    private readonly IConfiguration _configuration;
    
    
    public AuthController(UserService service, IConfiguration configuration)
    {
        _service = service;
        _configuration = configuration;
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] RegisterDTO registerDto)
    {
        User user = new User();
        user.Name = registerDto.Name;
        user.Email = registerDto.Email;
        user.Password = registerDto.Password;
        
        if (!await _service.UserExistsByEmail(user.Email))
        {
            await _service.Add(user);
            return Ok(user);
        }
        return BadRequest( new RegisterErrorDTO{Error = "User exists"});
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResultDTO>> Login([FromBody] LoginDTO loginDto)
    {
        var user = await _service.GetByLogin(loginDto.Email, loginDto.Password);
        if (user != null)
        {
            string token = CreateToken(user);
            return Ok(new LoginResultDTO{Token = token});
        }

        return BadRequest( new LoginResultDTO{Error = "Email or password is incorrect"});
    }
    
    private string CreateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim("userID", user.ID.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };
        
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}