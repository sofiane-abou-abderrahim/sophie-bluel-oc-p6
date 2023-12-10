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
    // retrieve the DOM element that will host the works
    const gallery = document.querySelector('.gallery');

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
  console.log(categories);
}

generateCategories();
