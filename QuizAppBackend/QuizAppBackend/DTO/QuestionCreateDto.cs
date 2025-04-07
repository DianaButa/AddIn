using QuizAppBackend.Models;

namespace QuizAppBackend.DTO
{
  public class QuestionCreateDto
  {
    public string Text { get; set; }
    public Subject Subject { get; set; }  
    public List<AnswerCreateDTO> Answers { get; set; }
  }
}
