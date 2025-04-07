using QuizAppBackend.DTO;
using QuizAppBackend.Models;

namespace QuizAppBackend.Service.QuizService
{
  public interface IQuizService
  {
    Task<QuestionResponseDto> CreateQuestionAsync(QuestionCreateDto questionDto);
    Task<Question> GetQuestionAsync(int id);
    Task<List<Question>> GetQuestionsBySubjectAsync(Subject subject);
    Task<List<QuestionResponseDto>> GetAllQuestionsAsync();
  }
}
