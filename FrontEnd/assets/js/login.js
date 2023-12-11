/*********Global constants**********/

const loginForm = document.querySelector('.form .connection');
const loginFormError = document.querySelector('.form .connection .error');

// Retrieve the values entered by the user in the login form inputs
const loginEmail = document.getElementById('email').value;
const loginPassword = document.getElementById('password').value;

// user object to insert into the post fetch body
const user = {
  email: loginEmail,
  password: loginPassword
};
