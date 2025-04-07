public class QuestionResult
{
  public int Id { get; set; }
  public int QuestionId { get; set; }  // ID-ul întrebării
  public string UserAnswer { get; set; }  // Răspunsul dat de utilizator
  public string CorrectAnswer { get; set; }  // Răspunsul corect
  public bool IsCorrect { get; set; }  // Dacă răspunsul este corect sau nu
  public QuizResult QuizResult { get; set; }  // Legătura cu rezultatul quizului
}
