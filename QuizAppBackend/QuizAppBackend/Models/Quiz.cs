namespace QuizAppBackend.Models
{
  public class Quiz
  {
    public int Id { get; set; }
    public string Name { get; set; } // Numele quiz-ului
    public DateTime CreatedAt { get; set; } // Data creării quiz-ului
    public List<Question> Questions { get; set; } // Întrebările asociate quiz-ului


  }
}
