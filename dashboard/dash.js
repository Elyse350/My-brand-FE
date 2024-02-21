function output() {
  const data = localStorage.getItem("users");
  const users = JSON.parse(data);

 
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
    `
    
  };
 
  const createTableData = (users) => {
    let html = "";
    if (true) {
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
          <td colspan="4">No users found</td>
        </tr>
      `;
    }
    return html;
  };
  
  document.getElementById('table').innerHTML = `
  
    ${createTable(users)}
  
`;
}
// blog