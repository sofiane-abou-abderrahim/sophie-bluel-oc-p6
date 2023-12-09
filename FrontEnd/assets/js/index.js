/**
 *
 * @returns function that retrieves works from the API
 */

async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}
// console.log(await getWorks());
await getWorks();

async function generateWorks() {
  // store http api response in a constant in a JSON format
  const works = await getWorks();
  console.log(works);
  works.forEach(work => {
    // retrieve the DOM element that will host the works
    const sectionGallery = document.querySelector('.gallery');

    // create dedicated elements for each work
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    // appended each element to its parent
    figure.appendChild(img);
    figure.appendChild(figcaption);
  });
}

generateWorks();
