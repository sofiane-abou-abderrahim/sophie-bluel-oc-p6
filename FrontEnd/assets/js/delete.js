//*********Deletion of existing works*********//

async function deleteWorks(event) {
  // Prevent the default click behavior
  event.preventDefault();

  // Stop the event propagation to avoid page refresh
  event.stopPropagation();

  // retrieve the value of the 'data-id' attribute of the HTML element that triggered the event (event)
  let id = event.target.dataset.id;
  console.log(id);

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
      const confirmation = confirm('Voulez-vous vraiment supprimer ce projet?');
      if (confirmation) {
        // Remove the parent element of the delete icon (the entire work container)
        const workContainer = event.target.closest('.work-container');
        workContainer.remove();
      }
    } else if (response.status === '401') {
      alert('Session expirée, merci de vous reconnecter');
      document.location.href('login.html');
    } else {
      const errorData = await response.json();
      console.error('Error deleting project:', errorData);
    }
  } catch (error) {
    console.error('Error deleting project:', error);
  }
}

export function deleteProject() {
  let deleteIcons = document.querySelectorAll('.modal-delete-icon');
  deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', deleteWorks);
  });
}
