
function output() {
  const data = localStorage.getItem("users");
  const users = JSON.parse(data);

  
  const createTable = (users) => {
    return `
      <table>
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
    if (users && users.length > 0) {
      users.forEach(user => {
        html += `
          <tr>
            <td>${user.fullname}</td>
            <td>${user.date}</td>
            <td>${user.email}</td>
          </tr>
        `;
      });
    } else {
      html += `
        <tr>
          <td colspan="3">No users found</td>
        </tr>
      `;
    }
    return html;
  };

  document.getElementById('table').innerHTML = createTable(users);
}