/**********General variables**********/

// retrieve the DOM element that will host the works
const mainGallery = document.querySelector('.gallery');
// retrieve the DOM element that will host categories buttons
const filter = document.querySelector('.filter');

const logoutButton = document.querySelector('.logout');
// console.log(logoutButton);

/**********Functions to retrieve the gallery and categories from the API*********/

/**
 *
 * @returns function that retrieves works from the API
 */

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}

/**
 *
 * @returns function that retrieves categories from the API
 */

export async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}

// console.log(await getCategories());

/**********Functions to generate the gallery and categories*********/

/**
 * @generator function to generate tasks and display them on the website
 */

function generateWorks(work, targetGallery, showDeleteIcon = false) {
  // create dedicated elements for each work
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  // access the image of each work to configure its source and its alt attributes
  img.src = work.imageUrl;
  img.alt = work.title;
  const figcaption = document.createElement('figcaption');
  // added work title to figcaption as its text
  figcaption.innerText = work.title;

  // If showDeleteIcon is true, add the delete icon to the figure
  if (showDeleteIcon) {
    // Create a container div to hold both the image and the delete icon
    const container = document.createElement('div');
    container.classList.add('work-container');

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'assets/icons/modal-delete-icon.svg';
    deleteIcon.alt = 'Delete Icon';
    deleteIcon.classList.add('modal-delete-icon');
    deleteIcon.dataset.id = work.id;

    // Append the image and delete icon to the container
    container.appendChild(img);
    container.appendChild(deleteIcon);

    // Append the container and figcaption to the figure
    figure.appendChild(container);
  } else {
    // If showDeleteIcon is false, just append the image and figcaption to the figure
    figure.appendChild(img);
  }

  figure.appendChild(figcaption);

  // Append the figure to the target gallery
  targetGallery.appendChild(figure);
}

/**
 * @generator function to generate categories and display them on the website
 */

function generateCategories(category) {
  // create dedicated elements for each categories button
  const btnFilter = document.createElement('button');
  // insert id and name content to each categories button
  btnFilter.innerText = category.name.toUpperCase();
  btnFilter.id = category.id;
  // added class button
  btnFilter.classList.add('button');

  // check if the filter variable is not null before performing operations on it
  if (filter) {
    // append each categories button to its parent
    filter.appendChild(btnFilter);
  }
  // console.log(filter);
}

/**********Functions to display works and categories**********/

/**
 * @async display works in the DOM
 */

export async function displayWorks(targetGallery, showDeleteIcon) {
  // store http api response in a constant in a JSON format
  const works = await getWorks();
  // console.log(works);

  // Clear the existing content in the target gallery
  targetGallery.innerHTML = '';

  works.forEach(work => {
    generateWorks(work, targetGallery, showDeleteIcon);
  });
}

/**
 * @async display categories in the DOM
 */

export async function displayCategories() {
  // store http api response in a constant in a JSON format
  const categories = await getCategories();
  // console.log(categories);

  categories.forEach(category => {
    generateCategories(category);
  });
}

/*********function to filter the gallery by project category**********/

/**
 * @event clicking filter the tasks according to the selected filter upon clicking on an element in the category menu
 */

async function filterCategories() {
  const works = await getWorks();
  // console.log(works);

  const filterButtons = document.querySelectorAll('.filter .button');
  // console.log(filterButtons);

  // iterate through each filter button
  filterButtons.forEach(filterButton => {
    // add an event listener on each filter button
    filterButton.addEventListener('click', event => {
      // retrieve filter button id upon a click on a selected button
      const filterButtonId = event.target.id;

      // delete all works in the gallery upon each filter button to refresh the page and make it interactive
      mainGallery.innerHTML = '';

      // logic for filtering buttons
      if (filterButtonId !== '0') {
        const filteredWorks = works.filter(work => {
          return work.categoryId == filterButtonId;
        });
        filteredWorks.forEach(work => {
          generateWorks(work, mainGallery);
        });
      } else {
        displayWorks(mainGallery);
      }
    });
  });
}

/**
 * Displays artworks in the gallery upon page load.
 * @param {HTMLElement} targetGallery - The HTML element that will contain the artworks.
 * @param {boolean} showDeleteIcon - Indicates whether the delete icon should be displayed.
 * @returns {Promise<void>} - A promise indicating that the display of artworks is complete.
 */
displayWorks(mainGallery);

/**
 * Displays categories in the menu upon page load.
 * @returns {Promise<void>} - A promise indicating that the display of categories is complete.
 */
displayCategories();

/**
 * Filters artworks based on the selected category upon page load.
 * @returns {Promise<void>} - A promise indicating that the artwork filtering is complete.
 */
filterCategories();

/**
 * Adds a logout event to the logout button.
 * Removes the user from the session upon clicking the logout button.
 */
if (logoutButton !== null) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
  });
}
