using QuizAppBackend.Models;

namespace QuizAppBackend.DTO
{
  public class QuestionResponseDto
  {
    public int Id { get; set; }
    public string Text { get; set; }
    public Subject Subject { get; set; }
    public List<AnswerResponseDto> Answers { get; set; }
  }
}
