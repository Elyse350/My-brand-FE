function output() {
  const data = localStorage.getItem("users");
  let users;

  try {
    users = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return;
  }

  if (!Array.isArray(users)) {
    console.error("users is not an array");
    return;
  }

  // Create table structure and populate with user data
  const createTable = (users) => {
    return `
      <table id="table">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Date</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${createTableData(users)}
        </tbody>
      </table>
    `;
  };

  const createTableData = (users) => {
    let html = "";
    users.forEach((user) => {
      html += `
        <tr>
          <td>${user.fullname}</td>
          <td>${user.date}</td>
          <td>${user.email}</td>
        </tr>
      `;
    });
    return html;
  };

  document.getElementById('table').innerHTML = `
    ${createTable(users)}
  `;
}
