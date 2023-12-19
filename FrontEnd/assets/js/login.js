/*********Global constants**********/

const loginForm = document.querySelector('.form .connection');

/**********Function to login & authenticate users**********/

/**
 * @async function to login users
 */

async function login() {
  // retrieve the values entered by the user in the login form inputs
  const loginEmail = document.getElementById('email').value;
  const loginPassword = document.getElementById('password').value;

  // user object to insert into the post fetch body
  const user = {
    email: loginEmail,
    password: loginPassword
  };

  // capture the errors from the fetch request
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    // check the 'ok' property of the HTTP response and throw an exception in case of an error
    if (response.ok) {
      const data = await response.json();
      const userdata = data.token;
      // console.log(userdata);
      localStorage.setItem('user', userdata); // store the user token in localStorage

      // this code checks if the user's authentication token (localStorage.user) matches the token received from the server (userdata)
      // if they match, it redirects the user to the "edit.html" page, suggesting that the user is authenticated.
      if (localStorage.user === userdata) {
        document.location.href = 'edit.html';
      }
      console.log(user);
      console.log(localStorage);
    } else {
      document.querySelector('.error').innerHTML =
        'Erreur dans l’identifiant ou le mot de passe';

      throw new Error(
        'Erreur dans la requête POST. Statut: ' + response.status
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * @event submit call login function upon submit event on the login form
 */

// attach the login function to the form submission event
loginForm.addEventListener('submit', function (event) {
  event.stopPropagation(); // prevent the click event from propagating
  event.preventDefault(); // prevent the form from submitting in the traditional way
  login(); // call the login function when the form is submitted
});
