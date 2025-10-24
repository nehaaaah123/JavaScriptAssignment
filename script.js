$(document).ready(function () {
  let employees = [
    { id: 1, name: "Neha", role: "Developer", email: "neha@gmail.com" },
    { id: 2, name: "Harshit", role: "C2", email: "harshit@gmail.com" },
    { id: 3, name: "Darshan", role: "Manager", email: "darshan@gmail.com" },
    { id: 4, name: "Navya", role: "QA Engineer", email: "navya@gmail.com" },
    { id: 5, name: "Prerna", role: "DevOps", email: "prerna@gmail.com" },
    { id: 6, name: "Naman", role: "HR", email: "naman@gmail.com" },
    { id: 7, name: "Aryan", role: "Support", email: "aryan@gmail.com" },
    { id: 8, name: "Bhojendra", role: "Intern", email: "bhojendra@gmail.com" }
  ];

  function displayEmployees(data) {
    $("#employeeList").html("");
    data.forEach(emp => {
      $("#employeeList").append(`
        <div class="card" data-id="${emp.id}">
          <h3>${emp.name}</h3>
          <p>${emp.role}</p>
          <p>${emp.email}</p>
          <span class="remove-link" data-id="${emp.id}">Remove</span>
        </div>
      `);
    });
  }

  $("#searchBox").on("input", function () {
    const query = $(this).val().toLowerCase();
    const filtered = employees.filter(emp => emp.name.toLowerCase().includes(query));
    displayEmployees(filtered);
  });

  $("#employeeList").on("click", ".card", function (e) {
    if ($(e.target).hasClass("remove-link")) return;
    const id = $(this).data("id");
    const emp = employees.find(e => e.id === id);
    $("#employeeDetails").html(`
      <h2>${emp.name}</h2>
      <p>Role: ${emp.role}</p>
      <p>Email: ${emp.email}</p>
    `);
    $("#employeeModal").fadeIn();
  });

  $("#closeModal").on("click", function () {
    $("#employeeModal").fadeOut();
  });

  $("#addEmployeeForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#empName").val();
    const role = $("#empRole").val();
    const email = $("#empEmail").val();
    const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({ id: newId, name, role, email });
    displayEmployees(employees);
    this.reset();
  });

  $("#employeeList").on("click", ".remove-link", function () {
    const id = $(this).data("id");
    employees = employees.filter(emp => emp.id !== id);
    displayEmployees(employees);
  });

  displayEmployees(employees);
});

