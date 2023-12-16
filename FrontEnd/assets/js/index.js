//**********Global variables*********//

/**
 * @global define global scope variables
 */

// define portfolio in the global scope
const portfolio = document.getElementById('portfolio');

//**********Function to retrieve the gallery from the API**********//

/**
 * @async function that fetches data from the API and subsequently creates a gallery based on that data
 */

const getWorks = async () => {
  let galleryList = [];

  try {
    // retrieve tasks
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const worksData = await worksResponse.json();
    galleryList = worksData;

    // call the functions after retrieving the data
    createGallery(galleryList); // will later create HTML elements based on this data.
  } catch (error) {
    // handle error
    console.error("Une erreur s'est produite : ", error);
  }
};

//**********Function to create the gallery**********//

/**
 *
 * @param {*} galleryList function that creates the gallery
 */

const createGallery = galleryList => {
  const gallery = document.createElement('div');
  gallery.classList.add('gallery');

  // iterate through each item in galleryList & generate an HTML string for each item
  gallery.innerHTML = galleryList
    .map(
      img =>
        `<figure>
    <img src="${img.imageUrl}" alt="${img.title}">
    <figcaption>${img.title}</figcaption>
  </figure>
  `
    )
    .join(''); // The HTML strings are joined together into a single string using .join('')
  portfolio.appendChild(gallery);
};

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
