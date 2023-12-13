/*********Display the modal window when clicking the 'edit' button**********/

const modalTriggers = document.querySelectorAll('.modal-trigger');

// variable to find out which modal is opened
let modal = null;

// create a selector to identify all selectable elements
const focusableSelector = 'button, a, input, textarea';
// create variable to save all selectable elements to it when modal box opened
let focusables = [];

// function to open modal
const openModal = function (event) {
  event.preventDefault();
  // retrieve the attribute 'href=#modal1'
  modal = document.querySelector(event.target.getAttribute('href'));
  // retrieve all focusable elements inside the modal corresponding to our focusableSelector and convert node list into array
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  // display modal
  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  // close modal upon click
  modal.addEventListener('click', closeModal);
  modal.querySelector('.close-modal').addEventListener('click', closeModal);
  modal.querySelector('.stop-modal').addEventListener('click', stopPropagation);
};

// function to close modal
const closeModal = function (event) {
  // to not do anything if we try to close non existant modal
  if (modal === null) {
    return;
  }
  event.preventDefault();
  // hide modal
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  // delete event listener to entirely clean modal box
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.close-modal').removeEventListener('click', closeModal);
  modal
    .querySelector('.stop-modal')
    .removeEventListener('click', stopPropagation);

  // set again modal to null as by default
  modal = null;
};

// function to prevent from closing modal box when clicking on it
const stopPropagation = function (event) {
  event.stopPropagation();
};

// function to trap the user's focus within the box modal when pressing 'Tab' key
const focusInModal = function (event) {
  event.preventDefault();
  // console.log(focusables);
  // find the index relative to the currently focused element to navigate to the next element when 'Tab' is pressed
  let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
  // console.log(index);
  if (event.shiftKey === true) {
    index--;
  } else {
    // Add a step
    index++;
  }

  // debugger;
  // return index to 0 when reaching the last element
  if (index >= focusables.length) {
    index = 0;
  }
  // prevent from having negative index to loop inside the modal
  if (index < 0) {
    // index equals to the last element
    index = focusables.length - 1;
  }
  // retrieve all focusable elements, find the element at the specified index, and apply the focus method to automatically bring it into focus
  focusables[index].focus();
};

// open modal upon click on the edit link
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', openModal);
});

// support keyboard functionality to close the modal when the 'Escape' key is pressed
window.addEventListener('keydown', function (event) {
  // console.log(event.key);
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeModal(event);
  }
  // trap the user's focus within the modal box
  if (event.key === 'Tab' && modal !== null) {
    focusInModal(event);
  }
});
