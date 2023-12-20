/**********Functions to swap between first modal & second modal**********/

// Initialize global variables for form elements used in multiple functions
const firstModalContainer = document.querySelector('.modal-content');
const secondModalContainer = document.querySelector('.modal-add-project');

const modalArrow = document.querySelector('.modal-arrow');
if (modalArrow !== null) modalArrow.addEventListener('click', firstModal);

const uploadImageForm = document.querySelector('.modal-upload-image-form');
const labelFile = document.querySelector('.modal-add-image-form');
const inputFile = document.createElement('input');
const imgElement = document.createElement('img');
imgElement.classList.add('img-uploaded');

const btnAdd = document.querySelector('.btn-add-project');
if (btnAdd !== null) btnAdd.addEventListener('click', openModalAdd);

const confirmBtn = document.querySelector('.modal-form-confirm-button');

// Function to display the first modal
function firstModal() {
  firstModalContainer.style.display = 'block';
  secondModalContainer.style.display = 'none';
  // resetForm();
}

// Function to display the second modal
function openModalAdd() {
  firstModalContainer.style.display = 'none';
  secondModalContainer.style.display = 'block';

  inputFile.type = 'file';
  inputFile.id = 'file';
  inputFile.name = 'file';
  inputFile.accept = 'image/png, image/jpeg';
  inputFile.style.display = 'none';
  uploadImageForm.appendChild(inputFile);

  // categoriesSelect(categoriesList);
}