import { getCategories } from './index.js';

/**********Functions to swap between first modal & second modal**********/

// Initialize global variables for form elements used in multiple functions
const firstModalContainer = document.querySelector('.modal-content');
const secondModalContainer = document.querySelector('.modal-add-project');

const modalArrow = document.querySelector('.modal-arrow');
if (modalArrow !== null) modalArrow.addEventListener('click', firstModal);

const uploadImageForm = document.querySelector('.modal-upload-image-form');

const inputFile = document.createElement('input');

const btnAdd = document.querySelector('.btn-add-project');
if (btnAdd !== null) btnAdd.addEventListener('click', openModalAdd);

// Function to display the first modal
function firstModal() {
  firstModalContainer.style.display = 'block';
  secondModalContainer.style.display = 'none';
  // resetForm();
}

// Function to display the second modal
async function openModalAdd() {
  firstModalContainer.style.display = 'none';
  secondModalContainer.style.display = 'block';

  inputFile.type = 'file';
  inputFile.id = 'file';
  inputFile.name = 'file';
  inputFile.accept = 'image/png, image/jpeg';
  inputFile.style.display = 'none';
  uploadImageForm.appendChild(inputFile);

  await categoriesSelect();
}

// Select a category for the image to be added
async function categoriesSelect(categories) {
  const categorySelect = document.getElementById('modal-categories');

  categorySelect.innerHTML = `
 <option value ="default" selected></option>
  `;
  try {
    categories = await getCategories();
    // console.log(categories);

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error getting categories:', error);
  }
}
