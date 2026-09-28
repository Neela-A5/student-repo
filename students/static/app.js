const API_URL = "/api/students/";

// Load students when page opens
document.addEventListener("DOMContentLoaded", loadStudents);


// ===============================
// GET STUDENTS
// ===============================

async function loadStudents() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        const students = await response.json();

        displayStudents(students);

    } catch (error) {

        console.error(error);

        showMessage("Could not load students.");

    }
}


// ===============================
// DISPLAY STUDENTS
// ===============================

function displayStudents(students) {

    const tableBody = document.getElementById("student-table-body");

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>

            <td>

                <button
                    class="edit-button"
                    onclick='editStudent(${JSON.stringify(student)})'
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>
        `;

        tableBody.appendChild(row);

    });
}


// ===============================
// ADD / UPDATE STUDENT
// ===============================

document
    .getElementById("student-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const studentId =
            document.getElementById("student-id").value;

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const course =
            document.getElementById("course").value.trim();

        const age =
            Number(document.getElementById("age").value);


        const studentData = {
            name: name,
            email: email,
            course: course,
            age: age
        };


        try {

            let response;

            // UPDATE
            if (studentId) {

                response = await fetch(
                    `${API_URL}${studentId}/`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(studentData)
                    }
                );

            }

            // ADD
            else {

                response = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(studentData)
                    }
                );

            }


            if (!response.ok) {

                const errorData = await response.json();

                console.error(errorData);

                showMessage(
                    "Error: " + JSON.stringify(errorData)
                );

                return;
            }


            // Clear form
            resetForm();

            // Reload students
            loadStudents();

            showMessage(
                studentId
                    ? "Student updated successfully!"
                    : "Student added successfully!"
            );

        }

        catch (error) {

            console.error(error);

            showMessage("Something went wrong.");

        }

    });


// ===============================
// EDIT STUDENT
// ===============================

function editStudent(student) {

    document.getElementById("student-id").value =
        student.id;

    document.getElementById("name").value =
        student.name;

    document.getElementById("email").value =
        student.email;

    document.getElementById("course").value =
        student.course;

    document.getElementById("age").value =
        student.age;


    document.getElementById("form-title").textContent =
        "Edit Student";

    document.getElementById("submit-button").textContent =
        "UPDATE STUDENT";

    document.getElementById("cancel-button").style.display =
        "inline-block";

}


// ===============================
// CANCEL EDIT
// ===============================

function cancelEdit() {

    resetForm();

}


// ===============================
// RESET FORM
// ===============================

function resetForm() {

    document.getElementById("student-form").reset();

    document.getElementById("student-id").value = "";

    document.getElementById("form-title").textContent =
        "Add Student";

    document.getElementById("submit-button").textContent =
        "ADD STUDENT";

    document.getElementById("cancel-button").style.display =
        "none";

}


// ===============================
// DELETE STUDENT
// ===============================

async function deleteStudent(id) {

    const confirmed =
        confirm("Are you sure you want to delete this student?");

    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}${id}/`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error("Failed to delete student");

        }


        showMessage("Student deleted successfully!");

        loadStudents();

    }

    catch (error) {

        console.error(error);

        showMessage("Could not delete student.");

    }

}


// ===============================
// MESSAGE
// ===============================

function showMessage(message) {

    const messageElement =
        document.getElementById("message");

    messageElement.textContent = message;

    setTimeout(() => {

        messageElement.textContent = "";

    }, 3000);

}