//*********Deletion of existing works*********//

function deleteWorks(event) {
  let id = event.target.dataset.id;
  console.log(id);
}

export function deleteProject() {
  let deleteIcons = document.querySelectorAll('.modal-delete-icon');
  deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', deleteWorks);
  });
}
