console.log("JS Basics");

// 1. DEFINES THE FUNCTION getUserInfo
function getUserInfo() {
  let name = prompt("Please input your name.");

  let age = prompt("Please enter your age.");
  age = Number(age);

  let attendance = confirm(`Is student ${name} present?`);

  if (attendance) {
    alert(`${name} is present.`);
  } else {
    alert(`${name} is not present.`);
  }

  return {
    name: name,
    age: age,
    attendance: attendance,
  };
}

let userInfo = getUserInfo();
console.log(userInfo);

// 2. CREATES A FUNCTION TO COLLECT DATA FOR MULTIPLE STUDENTS
function collectStudentsData() {
  let students = [];
  let numberOfStudents = prompt(
    "How many students' data do you want to collect?"
  );
  numberOfStudents = Number(numberOfStudents);

  for (let i = 0; i < numberOfStudents; i++) {
    let studentInfo = getUserInfo(i);
    students.push(studentInfo);
  }

  return students;
}

let allStudents = collectStudentsData();
console.log(allStudents);

// 3. CREATES THE FUNCTION showAttendancePercentage
function showAttendancePercentage(students) {
  if (students.length === 0) {
    alert("No student data available.");
    return;
  }

  let studentsPresent = students.filter((student) => student.attendance).length;
  let percentage = (studentsPresent / students.length) * 100;

  alert(`The percentage of students present is: ${percentage.toFixed(2)}%`);
}

showAttendancePercentage(allStudents);

// 4. CREATES THE FUNCTION createTeams
function createTeams(students) {
  let teams = [];
  let numberOfTeams = prompt("How many teams do you want to create?");
  numberOfTeams = Number(numberOfTeams);

  let presentStudents = students.filter((student) => student.attendance);

  if (presentStudents.length === 0) {
    alert("Teams can't be formed with absent students.");
    return [];
  }

  let studentsPerTeam = Math.floor(presentStudents.length / numberOfTeams);
  let extraStudents = presentStudents.length % numberOfTeams;

  let index = 0;
  for (let i = 0; i < numberOfTeams; i++) {
    let teamSize = studentsPerTeam + (extraStudents > 0 ? 1 : 0);
    teams.push(presentStudents.slice(index, index + teamSize));
    index += teamSize;
    extraStudents--;
  }

  return teams;
}

let teams = createTeams(allStudents);
console.log(teams);
