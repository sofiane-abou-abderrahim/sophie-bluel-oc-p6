//*********Deletion of existing works*********//

async function deleteWorks(event) {
  // Prevent the default click behavior
  event.preventDefault();

  // retrieve the value of the 'data-id' attribute of the HTML element that triggered the event (event)
  let id = event.target.dataset.id;
  console.log(id);
}

export function deleteProject() {
  let deleteIcons = document.querySelectorAll('.modal-delete-icon');
  deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', deleteWorks);
  });
}
