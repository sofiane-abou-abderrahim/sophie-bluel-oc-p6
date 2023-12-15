//*********Deletion of existing works*********//

import { displayWorks } from './index.js';

async function deleteWorks(event) {
  // retrieve the value of the 'data-id' attribute of the HTML element that triggered the event (event)
  let id = event.target.dataset.id;
  // console.log(id);

  // send DELETE request to the API
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: 'Bearer ' + localStorage.user
    }
  });

  if (response.ok) {
    event.target.parentElement.remove();
  } else if (response.status == '401') {
    alert('Session expirée, merci de vous reconnecter');
    document.location.href = 'login.html';
  }
}

export function deleteProject() {
  let deleteIcons = document.querySelectorAll('.modal-delete-icon');
  deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', deleteWorks);
  });
}
