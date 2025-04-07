using Microsoft.EntityFrameworkCore;
using QuizAppBackend.Models;

namespace QuizAppBackend.Database
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }

    public DbSet<QuizResult> QuizResults { get; set; }

    public DbSet<QuestionResult> QuestionResults { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
   

      modelBuilder.Entity<Question>()
          .Property(q => q.Subject)
          .HasConversion(
              v => v.ToString(),
              v => (Subject)Enum.Parse(typeof(Subject), v));
    }

  }
}
