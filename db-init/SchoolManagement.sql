
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    Budget DECIMAL(18, 2) NOT NULL,
    StartDate DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Instructors (
    InstructorID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    HireDate DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    Credits INT NOT NULL,
    DepartmentID INT,
    CONSTRAINT FK_Course_Department FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    EnrollmentDate DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT,
    StudentID INT,
    Grade DECIMAL(3, 2),
    CONSTRAINT FK_Enrollment_Course FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    CONSTRAINT FK_Enrollment_Student FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Departments (`Name`, Budget, StartDate) VALUES ('Computer Science', 120000.00, '2023-01-01');
INSERT INTO Instructors (FirstName, LastName, HireDate) VALUES ('John', 'Doe', '2020-08-15');
INSERT INTO Courses (Title, Credits, DepartmentID) VALUES ('Introduction to Programming', 3, 1);
INSERT INTO Students (FirstName, LastName, EnrollmentDate) VALUES ('Jane', 'Smith', '2023-09-01');
INSERT INTO Enrollments (CourseID, StudentID, Grade) VALUES (1, 1, 3.5);