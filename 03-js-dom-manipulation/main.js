console.log("JS DOM Manipulation");

const studentInput = document.querySelector("#new-student");
const studentList = document.querySelector(".student-list");
const addStudentBtn = document.querySelector("#add-student-btn");
const resetBtn = document.querySelector("#reset-btn");
const pickRandomBtn = document.querySelector("#pick-random-btn");

// Add student button
addStudentBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const studentName = studentInput.value;
  if (!studentName) {
    alert("Please enter a valid name!");
    return;
  }

  studentListFunction(studentList, studentName);
  studentInput.value = "";
});

// Reset button
resetBtn.addEventListener("click", function () {
  const allStudents = document.querySelectorAll(".student-item");
  allStudents.forEach(function (student) {
    student.remove();
  });
});

///// FUNCTION TO ADD NEW STUDENT /////
function studentListFunction(parentElem, studentName) {
  // Creates a student container (row)
  const studentItem = document.createElement("div");
  studentItem.classList.add("student-item");

  // Avatar
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(
    studentName
  )}&radius=10`;

  // Student name element
  const nameElem = document.createElement("span");
  nameElem.textContent = studentName;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    studentItem.remove();
  });

  // APPEND ALL ELEMENTS OF THE LIST (studentItem)
  parentElem.appendChild(studentItem);
  studentItem.appendChild(avatar);
  studentItem.appendChild(nameElem);
  studentItem.appendChild(deleteBtn);
}

///// FUNCTION TO PICK A RANDOM STUDENT /////
pickRandomBtn.addEventListener("click", function () {
  const studentItems = document.querySelectorAll(".student-item");

  const randomIndex = Math.floor(Math.random() * studentItems.length);
  const selectedStudent = studentItems[randomIndex];
  const avatar = selectedStudent.querySelector(".avatar");
  const name = selectedStudent.querySelector("span").textContent;

  // Find the #random-student box for the avatar
  const randomStudentBox = document.querySelector("#random-student");

  // Clear any previous content inside the randomStudentBox
  randomStudentBox.innerHTML = "";

  // Show the avatar inside the box
  randomStudentBox.innerHTML = `<img src="${avatar.src}" alt="Random student" class="avatar">`;

  // Show the name outside the box
  const randomStudentDisplay = document.querySelector(
    "#random-student-outside"
  );
  randomStudentDisplay.innerHTML = `<p><strong>${name}</strong> has been picked!</p>`;
});
