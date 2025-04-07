namespace QuizAppBackend.DTO
{
    public class QuizResult
    {
        public int Score { get; set; }  // Scorul total
        public int TotalQuestions { get; set; }  // Total întrebări
        public List<QuestionResult> QuestionResults { get; set; }  // Detalii pentru fiecare întrebare
    }
}
