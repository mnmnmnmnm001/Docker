using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Models;

public partial class Enrollment
{
    [Key]
    [Column("EnrollmentID")]
    public int EnrollmentId { get; set; }

    [Column("CourseID")]
    public int? CourseId { get; set; }

    [Column("StudentID")]
    public int? StudentId { get; set; }

    [Column("Grade", TypeName = "decimal(3, 2)")]
    public decimal? Grade { get; set; }
    [ForeignKey("CourseId")]


    public virtual Course Course { get; set; } = default!;
    [ForeignKey("StudentId")]

    public virtual Student Student { get; set; } = default!;
}
