namespace QuizAppBackend.Models
{
  public class Question
  {
    public int Id { get; set; }
    public string Text { get; set; }
    public Subject Subject { get; set; }
    public List<Answer> Answers { get; set; } = new List<Answer>();
  }


}
