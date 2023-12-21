import { getCategories } from './index.js';

/**********Global constants**********/

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
 * Represents the preview image element in the second modal.
 * @type {HTMLImageElement}
 */
const imgElement = document.createElement('img');
imgElement.classList.add('img-uploaded');

/**********Functions to swap between the first modal & second modal**********/

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

/**
 * Function to preview the selected image before validation.
 * @function
 * @param {Event} event - The change event triggered by selecting a file.
 * @returns {void}
 */
function previewFile(event) {
  // Step 1: Regular expression to check if the file has a supported extension (jpg or png)
  // The regular expression /\.(jpe?g|png)$/i indicates that it matches filenames ending with ".jpg" or ".jpeg" or ".png," regardless of case (thanks to the "i" modifier)
  const fileExtensionRegex = /\.(jpe?g|png)$/i;

  // Step 2: Check if no file is selected or if the selected file has an unsupported format
  // In the context of inputFile.files, the term "files" is a property of the file input element and is part of the File API in JavaScript
  // The test() method is a native method of RegExp objects in JavaScript, and it returns true if the provided string matches the regular expression and false otherwise
  if (
    inputFile.files.length === 0 ||
    !fileExtensionRegex.test(inputFile.files[0].name)
  ) {
    // Display an alert for unsupported format, reset the form, and exit the function
    alert('Format non pris en charge, merci de choisir une autre photo');
    resetForm();
    return;
  }

  // Step 3: If the format is supported, get the file, create a URL for the image, and call the displayImage function
  let file = event.target.files[0];
  let url = URL.createObjectURL(file);
  displayImage();

  /**
   * Function to create the image and integrate it into the label.
   * @function
   * @returns {void}
   */
  function displayImage() {
    // Step 1: Remove padding from the labelFile element
    labelFile.style.padding = '0px';

    // Step 2: Set the source of the imgElement to the created URL for the image
    imgElement.src = url;

    // Step 3: Clear the content of the labelFile and append the imgElement to integrate the thumbnail into the label
    labelFile.innerHTML = '';
    labelFile.appendChild(imgElement);
  }
}

/**
 * Event listener for changes in the selected file, triggering the preview function.
 * This listener is attached to the 'change' event of the file input element.
 *
 * @event
 * @type {HTMLElement}
 * @param {Event} event - The 'change' event triggered when a file is selected.
 * @returns {void}
 */
inputFile.addEventListener('change', previewFile);
