const form = document.querySelector("form");
const eField = form.querySelector(".email");
const eInput = eField.querySelector("input");
const pField = form.querySelector(".password");
const pInput = pField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault(); // Prevent form submission

  // Check if email and password are blank
  if (eInput.value == "") {
    eField.classList.add("shake", "error");
  } else {
    eField.classList.remove("error");
    eField.classList.add("valid");
  }

  if (pInput.value == "") {
    pField.classList.add("shake", "error");
  } else {
    pField.classList.remove("error");
    pField.classList.add("valid");
  }

  setTimeout(() => { // Remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  // Check if email and password are not blank
  if (eInput.value !== "" && pInput.value !== "") {
    // Store email and password in local storage
    localStorage.setItem('email', eInput.value);
    localStorage.setItem('password', pInput.value);
    
    // Redirect to dashboard
    window.location.href = './dashboard/dash.html';
  }
}

// Check if email and password are already stored in local storage
if (localStorage.getItem('email') && localStorage.getItem('password')) {
  // Redirect to dashboard if email and password are present
  window.location.href = './dashboard/dash.html';
}
