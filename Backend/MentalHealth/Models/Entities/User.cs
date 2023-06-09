using System.ComponentModel.DataAnnotations.Schema;
using MentalHealth.Models.Enums;

namespace MentalHealth.Models.Entities;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public int Points { get; set; }
    public string Role { get; set; } 
    public virtual ICollection<Tree>? Trees { get; set; } = new List<Tree>();
    public virtual ICollection<MoodTracker>? Moods { get; set; } = new List<MoodTracker>();
    public virtual ICollection<UserTask>? UserTasks { get; set; } = new List<UserTask>();
    public DateTime? LastMoodDate { get; set; } = null;
}