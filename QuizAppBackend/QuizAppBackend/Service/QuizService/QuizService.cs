using Microsoft.EntityFrameworkCore;
using QuizAppBackend.Database;
using QuizAppBackend.DTO;
using QuizAppBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizAppBackend.Service.QuizService
{
  public class QuizService : IQuizService
  {
    private readonly ApplicationDbContext _context;

    public QuizService(ApplicationDbContext context)
    {
      _context = context;
    }


    public async Task<QuestionResponseDto> CreateQuestionAsync(QuestionCreateDto questionDto)
    {
      // Validate answers count
      if (questionDto.Answers.Count != 3)
      {
        throw new ArgumentException("Each question must have exactly 3 answers");
      }

      // Validate exactly one correct answer
      if (questionDto.Answers.Count(a => a.IsCorrect) != 1)
      {
        throw new ArgumentException("Each question must have exactly one correct answer");
      }

      // Validate subject
      if (!Enum.IsDefined(typeof(Subject), questionDto.Subject))
      {
        throw new ArgumentException("Invalid subject specified");
      }

      var question = new Question
      {
        Text = questionDto.Text,
        Subject = questionDto.Subject,
        Answers = questionDto.Answers.Select(a => new Answer
        {
          Text = a.Text,
          IsCorrect = a.IsCorrect
        }).ToList()
      };

      _context.Questions.Add(question);
      await _context.SaveChangesAsync();

      return new QuestionResponseDto
      {
        Id = question.Id,
        Text = question.Text,
        Subject = question.Subject,
        Answers = question.Answers.Select(a => new AnswerResponseDto
        {
          Id = a.Id,
          Text = a.Text,
          IsCorrect = a.IsCorrect
        }).ToList()
      };
    }

    public async Task<Question> GetQuestionAsync(int id)
    {
      var question = await _context.Questions
          .Include(q => q.Answers)
          .FirstOrDefaultAsync(q => q.Id == id);

      if (question == null)
      {
        throw new KeyNotFoundException($"Question with ID {id} not found");
      }

      return question;
    }

    public async Task<List<Question>> GetQuestionsBySubjectAsync(Subject subject)
    {
      return await _context.Questions
          .Include(q => q.Answers)
          .Where(q => q.Subject == subject)
          .ToListAsync();
    }

    public async Task<List<QuestionResponseDto>> GetAllQuestionsAsync()
    {
      var questions = await _context.Questions
          .Include(q => q.Answers)
          .ToListAsync();

      return questions.Select(q => new QuestionResponseDto
      {
        Id = q.Id,
        Text = q.Text,
        Subject = q.Subject,
        Answers = q.Answers.Select(a => new AnswerResponseDto
        {
          Id = a.Id,
          Text = a.Text,
          IsCorrect = a.IsCorrect
        }).ToList()
      }).ToList();
    }
  }
}
