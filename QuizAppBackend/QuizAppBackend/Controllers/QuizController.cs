using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAppBackend.Database;
using QuizAppBackend.DTO;
using QuizAppBackend.Models;
using QuizAppBackend.Service.QuizService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class QuizController : ControllerBase
  {
    private readonly IQuizService _quizService;
    private readonly ApplicationDbContext _context;

    public QuizController(IQuizService quizService, ApplicationDbContext context)
    {
      _quizService = quizService;
      _context = context;
    }
    [HttpPost]
    public async Task<IActionResult> CreateQuestion([FromBody] QuestionCreateDto questionDto)
    {
      try
      {
        var question = await _quizService.CreateQuestionAsync(questionDto);
        return CreatedAtAction(nameof(GetQuestion), new { id = question.Id }, question);
      }
      catch (ArgumentException ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuestion(int id)
    {
      try
      {
        var question = await _quizService.GetQuestionAsync(id);
        return Ok(question);
      }
      catch (KeyNotFoundException)
      {
        return NotFound();
      }
    }
    [HttpGet("by-subject/{subject}")]
    public async Task<IActionResult> GetQuestionsBySubject(Subject subject)
    {
      var questions = await _quizService.GetQuestionsBySubjectAsync(subject);
      return Ok(questions);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllQuestions()
    {
      var questions = await _quizService.GetAllQuestionsAsync();
      return Ok(questions);
    }

  }
}


