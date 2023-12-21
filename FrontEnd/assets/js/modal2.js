import { getCategories } from './index.js';

/**********Functions to swap between the first modal & second modal**********/

/**
 * Represents a container for the first modal.
 * @type {HTMLElement}
 */
const firstModalContainer = document.querySelector('.modal-content');

/**
 * Represents a container for the second modal.
 * @type {HTMLElement}
 */
const secondModalContainer = document.querySelector('.modal-add-project');

/**
 * Arrow button to switch back to the first modal.
 * @type {HTMLElement}
 */
const modalArrow = document.querySelector('.modal-arrow');

if (modalArrow !== null) modalArrow.addEventListener('click', firstModal);

/**
 * Form for uploading images in the second modal.
 * @type {HTMLFormElement}
 */
const uploadImageForm = document.querySelector('.modal-upload-image-form');

/**
 * Input element for file selection.
 * @type {HTMLInputElement}
 */
const inputFile = document.createElement('input');

/**
 * Button to open the second modal.
 * @type {HTMLElement}
 */
const btnAdd = document.querySelector('.btn-add-project');

if (btnAdd !== null) btnAdd.addEventListener('click', openModalAdd);

/**
 * Dropdown for selecting categories.
 * @type {HTMLSelectElement}
 */
const categorySelect = document.getElementById('modal-categories');

/**
 * Represents the label for the image in the second modal.
 * @type {HTMLElement}
 */
const labelFile = document.querySelector('.modal-add-image-form');

/**
 * Represents the confirm button in the second modal.
 * @type {HTMLElement}
 */
const confirmBtn = document.querySelector('.modal-form-confirm-button');

/**
 * Represents the input element for the image title in the second modal.
 * @type {HTMLInputElement}
 */
const inputTitle = document.getElementById('modal-title-image');

/**
 * Function to display the first modal.
 * @function
 * @returns {void}
 */
function firstModal() {
  firstModalContainer.style.display = 'block';
  secondModalContainer.style.display = 'none';
  resetForm();
}

/**
 * Function to display the second modal.
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function openModalAdd() {
  firstModalContainer.style.display = 'none';
  secondModalContainer.style.display = 'block';

  // Configure input file for image selection
  inputFile.type = 'file';
  inputFile.id = 'file';
  inputFile.name = 'file';
  inputFile.accept = 'image/png, image/jpeg';
  inputFile.style.display = 'none';
  uploadImageForm.appendChild(inputFile);

  // Populate category dropdown
  await categoriesSelect();
}

/**
 * Function to populate the category dropdown for image selection.
 * @async
 * @function
 * @param {Array} [categories] - An array of categories.
 * @returns {Promise<void>}
 */
async function categoriesSelect(categories) {
  // Clear existing options and add a default one
  categorySelect.innerHTML = `<option value ="default" selected></option>`;
  try {
    // Fetch categories and populate dropdown
    categories = await getCategories();
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

/**
 * Function to reset the form in the second modal.
 * @function
 * @returns {void}
 */
function resetForm() {
  // Reset the styling and content of the labelFile element
  labelFile.style.padding = '30px 0 0';
  labelFile.innerHTML = `
    <img src="assets/icons/add-image.svg" alt="">
    <div class="modal-add-image-button">+ Add photo</div>
    <span class="modal-image-format">jpg, png: 4MB max</span>
  `;

  // Clear the selected file and inputTitle value
  inputFile.value = '';
  inputTitle.value = '';

  // Reset the categorySelect value to the default
  categorySelect.value = 'default';

  // Disable the confirm button and reset its styling
  confirmBtn.disabled = true;
  confirmBtn.style.background = '#A7A7A7';
  confirmBtn.style.cursor = 'auto';
}
