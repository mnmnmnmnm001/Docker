using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Models;

public partial class Student
{
    [Key]
    [Column("StudentID")]
    public int StudentId { get; set; }

    [Required]
    [Column("FirstName")]
    public string FirstName { get; set; } = default!;

    [Required]
    [Column("LastName")]
    public string LastName { get; set; } = default!;

    [Column("EnrollmentDate")]
    public DateOnly EnrollmentDate { get; set; }

    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
