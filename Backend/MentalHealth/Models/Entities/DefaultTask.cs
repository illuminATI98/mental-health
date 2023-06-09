using System.ComponentModel.DataAnnotations.Schema;

namespace MentalHealth.Models.Entities;

public class DefaultTask
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    
    public int Point { get; set; }
}