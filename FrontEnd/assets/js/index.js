/**********General variables**********/

// retrieve the DOM element that will host the works
const gallery = document.querySelector('.gallery');
// retrieve the DOM element that will host categories buttons
const filter = document.querySelector('.filter');

/**********Functions to retrieve the gallery and categories from the API*********/

/**
 *
 * @returns function that retrieves works from the API
 */

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}
// console.log(await getWorks());
getWorks();

/**
 *
 * @returns function that retrieves categories from the API
 */

async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}
// console.log(await getCategories());
getCategories();

/**********Functions to generate the gallery and categories*********/

/**
 * @generator function to generate tasks and display them on the website
 */

function generateWorks(work) {
  // create dedicated elements for each work
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  // access the image of each work to configure its source and its alt attributes
  img.src = work.imageUrl;
  img.alt = work.title;
  const figcaption = document.createElement('figcaption');
  // added work title to figcaption as its text
  figcaption.innerText = work.title;

  // appended each element to its parent
  figure.appendChild(img);
  figure.appendChild(figcaption);

  // attach the figure tag to the gallery div
  gallery.appendChild(figure);
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

async function displayWorks() {
  // store http api response in a constant in a JSON format
  const works = await getWorks();
  // console.log(works);

  works.forEach(work => {
    generateWorks(work);
  });
}
displayWorks();

/**
 * @async display categories in the DOM
 */

async function displayCategories() {
  // store http api response in a constant in a JSON format
  const categories = await getCategories();
  // console.log(categories);

  categories.forEach(category => {
    generateCategories(category);
  });
}
displayCategories();

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
      gallery.innerHTML = '';

      // logic for filtering buttons
      if (filterButtonId !== '0') {
        const filteredWorks = works.filter(work => {
          return work.categoryId == filterButtonId;
        });
        filteredWorks.forEach(work => {
          generateWorks(work);
        });
      } else {
        displayWorks();
      }
    });
  });
}
filterCategories();
