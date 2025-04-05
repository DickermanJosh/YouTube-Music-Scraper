document.addEventListener("DOMContentLoaded", () => {
  const modalBody = document.querySelector('#loginModal .modal-body');

  modalBody.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.id === "loginForm" || form.id === "signupForm") {
      const formData = new FormData(form);
      const username = formData.get("username");
      const password = formData.get("password");
      const endpoint = form.id === "loginForm" ? "/user/login" : "/user/create/account";
      let loginWarning = document.querySelector('#login-warning');

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        loginWarning.innerText = '';
        const data = await response.json();
        console.log(data);
        console.log("Operation successful. Token:", data.token);
        localStorage.setItem("token", data.token);
        bootstrap.Modal.getInstance(document.querySelector('#loginModal')).hide();
        window.location.href = "/user/profile";
      } else {
        // alert("Operation failed.");
        loginWarning.innerText = 'Incorrect username or password.';
      }
    }
  });

  // events for switching forms
  modalBody.addEventListener('click', function(event) {
    if (event.target.id === 'showSignUp') {
      showSignUpForm();
    } else if (event.target.id === 'showLogin') {
      showLoginForm();
    }
  });
});

function showLoginForm() {
  const modalTitle = document.querySelector('#loginModalLabel');
  modalTitle.textContent = 'Login';
  updateModalBody(loginFormHtml());
}

function showSignUpForm() {
  const modalTitle = document.querySelector('#loginModalLabel');
  modalTitle.textContent = 'Create New Account';
  updateModalBody(signUpFormHtml());
}

function updateModalBody(htmlContent) {
  const modalBody = document.querySelector('#loginModal .modal-body');
  modalBody.innerHTML = htmlContent;
}

function loginFormHtml() {
  return `
    <form id="loginForm" action="/user/login" method="POST">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" name="username" placeholder="Username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
      </div>
      <p id='login-warning' class='center-text red-text'>  </p>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <button id="showSignUp" class="btn btn-secondary mt-3">Create New Account</button>`;
}

function signUpFormHtml() {
  return `
    <form id="signupForm" action="/user/create/account" method="POST">
      <div class="mb-3">
        <label for="newUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="newUsername" name="username" required>
      </div>
      <div class="mb-3">
        <label for="newPassword" the form-label">Password</label>
        <input type="password" class="form-control" id="newPassword" name="password" required>
      </div>
      <p id='login-warning' class='center-text red-text'> </p>
      <button type="submit" class="btn btn-primary">Create Account</button>
    </form>
    <button id="showLogin" class="btn btn-secondary mt-3">Back to Login</button>`;
}