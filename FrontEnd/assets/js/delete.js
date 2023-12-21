import { displayWorks } from './index.js';

//*********Deletion of existing works*********//

async function deleteWorks(event) {
  // Prevent the default click behavior
  event.preventDefault();

  // Stop the event propagation to avoid page refresh
  event.stopPropagation();

  // retrieve the value of the 'data-id' attribute of the HTML element that triggered the event (event)
  let id = event.target.dataset.id;
  console.log(id);

  const confirmation = confirm('Voulez-vous vraiment supprimer ce projet?');
  if (confirmation) {
    try {
      // send DELETE request to the API
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          Authorization: 'Bearer ' + localStorage.user
        }
      });

      if (response.ok) {
        // Remove the parent element of the delete icon (the entire work container)
        const workContainer = event.target.closest('.work-container');
        workContainer.remove();

        // After deletion, display the updated works in the main gallery
        const mainGallery = document.querySelector('.gallery');
        displayWorks(mainGallery);
      } else if (response.status === '401') {
        alert('Session expirée, merci de vous reconnecter');
        document.location.href = 'login.html';
      } else {
        const errorData = await response.json();
        console.error('Error deleting project:', errorData);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  } else {
    console.log('Suppression annulée');
  }
}

export function deleteProject() {
  let deleteIcons = document.querySelectorAll('.modal-delete-icon');
  deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', deleteWorks);
  });
}
