using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Models;

public partial class Instructor
{
    [Key]
    [Column("InstructorID")]
    public int InstructorId { get; set; }

    [Required]
    [Column("FirstName")]
    public string FirstName { get; set; } = default!;

    [Required]
    [Column("LastName")]
    public string LastName { get; set; } = default!;

    [Column("HireDate")]
    public DateOnly HireDate { get; set; }
}
