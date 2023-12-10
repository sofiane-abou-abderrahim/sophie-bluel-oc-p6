/**********General variables**********/

// retrieve the DOM element that will host the works
const gallery = document.querySelector('.gallery');

/**********Functions to retrieve the gallery and categories*********/

/**
 *
 * @returns function that retrieves works from the API
 */

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}
// console.log(await getWorks());
// await getWorks();

/**
 *
 * @returns function that retrieves categories from the API
 */

async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}
// console.log(await getCategories());
// await getCategories();

/**********Functions to generate the gallery and categories*********/

/**
 * @generator function to generate tasks and display them on the website
 */

async function generateWorks() {
  // store http api response in a constant in a JSON format
  const works = await getWorks();
  // console.log(works);
  works.forEach(work => {
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
  });
}

generateWorks();

/**
 * @generator function to generate categories and display them on the website
 */

async function generateCategories() {
  // store http api response in a constant in a JSON format
  const categories = await getCategories();
  // console.log(categories);

  // iterate through the categories list to create DOM elements for each category
  categories.forEach(category => {
    // retrieve the DOM element that will host categories buttons
    const filter = document.querySelector('.filter');

    // create dedicated elements for each categories button
    const btnFilter = document.createElement('button');
    // insert id and name content to each categories button
    btnFilter.innerText = category.name.toUpperCase();
    btnFilter.id = category.id;
    // added class button
    btnFilter.classList.add('button');

    // append each categories button to its parent
    filter.appendChild(btnFilter);
    // console.log(filter);
  });
}

generateCategories();

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
      // console.log(event.target.id);
      const filterButtonId = event.target.id;
      console.log(filterButtonId);
    });
  });
}

filterCategories();
