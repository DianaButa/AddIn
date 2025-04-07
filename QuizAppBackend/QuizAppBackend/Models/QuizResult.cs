using QuizAppBackend.Models;

public class QuizResult
{
  public int Id { get; set; }
  public int UserId { get; set; }
  public DateTime DateTaken { get; set; }
  public int TotalQuestions { get; set; }
  public int CorrectAnswers { get; set; }
  public int IncorrectAnswers { get; set; }
  public double Score { get; set; }
  public ICollection<QuestionResult> QuestionResults { get; set; }  
}
