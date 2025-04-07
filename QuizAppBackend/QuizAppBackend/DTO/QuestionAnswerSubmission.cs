namespace QuizAppBackend.DTO
{
  public class QuestionAnswerSubmission
  {
    public int QuestionId { get; set; }  // ID-ul întrebării
    public int SelectedAnswerId { get; set; }  // ID-ul răspunsului selectat
  }
}
