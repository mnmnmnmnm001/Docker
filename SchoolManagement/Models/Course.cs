using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Models;

public partial class Course
{
    [Key]
    [Column("CourseID")]
    public int CourseId { get; set; }

    [Required]
    [Column("Title")]
    public string Title { get; set; } = default!;

    [Column("Credits")]
    public int Credits { get; set; }

    [Column("DepartmentID")]
    public int? DepartmentId { get; set; }
    [ForeignKey("DepartmentId")]

    public virtual Department Department { get; set; } = default!;

    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
