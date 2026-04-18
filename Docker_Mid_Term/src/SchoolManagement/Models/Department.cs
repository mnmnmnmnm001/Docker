using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Models;

public partial class Department
{
    [Key]
    [Column("DepartmentID")]
    public int DepartmentId { get; set; }

    [Required]
    [Column("Name")]
    public string Name { get; set; } = default!;

    [Required]
    [Column("Budget")]
    public decimal Budget { get; set; }

    [Column("StartDate")]
    public DateOnly StartDate { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
