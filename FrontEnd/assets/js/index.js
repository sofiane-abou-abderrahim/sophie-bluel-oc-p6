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
