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
  // console.log(works);
  works.forEach(work => {
    // Retrieve the DOM element that will host the works
    const sectionGallery = document.querySelector('.gallery');
  });
}

generateWorks();
