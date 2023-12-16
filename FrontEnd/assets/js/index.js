//**********Global variables*********//

/**
 * Global scope variable to store the portfolio element.
 * @type {HTMLElement}
 */

// define portfolio in the global scope
const portfolio = document.getElementById('portfolio');

//**********Function to retrieve the gallery from the API**********//

/**
 * Async function that fetches data from the API and creates a gallery based on that data.
 */

const getWorks = async () => {
  let galleryList = [];

  try {
    // Fetch tasks from the API
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const worksData = await worksResponse.json();
    galleryList = worksData;

    // Log the fetched data for debugging purposes
    console.log(galleryList);

    // Call the function to create the gallery after retrieving the data
    createGallery(galleryList); // will later create HTML elements based on this data.
  } catch (error) {
    // Handle errors and log to the console
    console.error("Une erreur s'est produite : ", error);
  }
};

//**********Function to create the gallery**********//

/**
 * Function to create the gallery based on the provided data.
 * @param {Array} galleryList - An array of objects representing gallery items.
 */

const createGallery = galleryList => {
  const gallery = document.createElement('div');
  gallery.classList.add('gallery');

  // Log the created gallery for debugging purposes
  console.log(gallery);
  console.log(galleryList);

  /*
    Iterate through each item in galleryList & generate an HTML string for each item.
    The callback function takes an "el" object from "galleryList" and returns an HTML string.
    This operation is performed for each item in the array, resulting in an array of HTML strings.
  */
  gallery.innerHTML = galleryList
    .map(
      el =>
        `<figure>
    <img src="${el.imageUrl}" alt="${el.title}">
    <figcaption>${el.title}</figcaption>
  </figure>
  `
    )
    .join('');
  /*
    The .join method is used to concatenate the array of HTML strings into a single string.
    Without .join(''), the result of the .map method would be an array of HTML strings,
    and when assigned to gallery.innerHTML, it would insert commas between the HTML strings, creating an invalid HTML structure.
  */
  portfolio.appendChild(gallery);
};

// Initiate the process by calling getWorks
getWorks();

// /**
//  *
//  * @returns function that retrieves works from the API
//  */

// async function getWorks() {
//   const response = await fetch('http://localhost:5678/api/works');
//   return await response.json();
// }
// // console.log(await getWorks());
// await getWorks();

// /**
//  * @generator // function to generate tasks and display them on the website
//  */

// async function generateWorks() {
//   // store http api response in a constant in a JSON format
//   const works = await getWorks();
//   // console.log(works);
//   works.forEach(work => {
//     // retrieve the DOM element that will host the works
//     const gallery = document.querySelector('.gallery');

//     // create dedicated elements for each work
//     const figure = document.createElement('figure');
//     const img = document.createElement('img');
//     // access the image of each work to configure its source and its alt attributes
//     img.src = work.imageUrl;
//     img.alt = work.title;
//     const figcaption = document.createElement('figcaption');
//     // added work title to figcaption as its text
//     figcaption.innerText = work.title;

//     // appended each element to its parent
//     figure.appendChild(img);
//     figure.appendChild(figcaption);

//     // attach the figure tag to the gallery div
//     gallery.appendChild(figure);
//   });
// }

// generateWorks();
