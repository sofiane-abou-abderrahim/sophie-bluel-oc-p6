/*********Display the modal window when clicking the 'edit' button**********/

const modalTriggers = document.querySelectorAll('.modal-trigger');

// function to open modal
const openModal = function (event) {
  event.preventDefault();
  // retrieve the attribute 'href=#modal1'
  const target = document.querySelector(event.target.getAttribute('href'));
  // display modal
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
};

// open modal upon click on the edit link
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', openModal);
});
