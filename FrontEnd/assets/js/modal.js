import { displayWorks } from './index.js';
import { deleteProject } from './delete.js';
import { firstModal } from './modal2.js';

/*********Display the modal window when clicking the 'edit' button**********/

const modalTriggers = document.querySelectorAll('.modal-trigger');

// variable to find out which modal is opened
let modal = null;

// create a selector to identify all selectable elements
const focusableSelector = 'button, a, input, textarea';
// create variable to save all selectable elements to it when modal box opened
let focusables = [];
// create variable to identify the previously focused element
let previouslyFocusedElement = null;

// function to open modal
const openModal = async function (event) {
  event.preventDefault();
  // retrieve the attribute 'href=#modal1'
  modal = document.querySelector(event.target.getAttribute('href'));
  // retrieve all focusable elements inside the modal corresponding to our focusableSelector and convert node list into array
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  // find the previously focused element and store it in our variable when modal is opened
  previouslyFocusedElement = document.querySelector(':focus');

  // clear the modal gallery before displaying works
  const modalGallery = modal.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';

  // display works in the modal
  await displayWorks(modalGallery, true);

  // delete works from the modal
  deleteProject();

  // display modal
  modal.style.display = null;
  // set the first element focusable by default
  focusables[0].focus();
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  // close modal upon click
  modal.addEventListener('click', closeModal);
  modal
    .querySelectorAll('.close-modal')
    .forEach(close => close.addEventListener('click', closeModal));
  modal.querySelector('.stop-modal').addEventListener('click', stopPropagation);
};

// function to close modal
const closeModal = function (event) {
  // to not do anything if we try to close non existant modal
  if (modal === null) {
    return;
  }
  // set back the focus to the previously focused element after closing modal
  if (previouslyFocusedElement !== null) {
    previouslyFocusedElement.focus();
  }
  event.preventDefault();
  // change default browser behaviour to launch the animation again in a reverse direction
  modal.style.display = 'none';
  modal.offsetWidth;
  modal.style.display = null;

  // add a delay to 'display = none' to change 'aria-hidden' to 'true' first, to see the animation when closing modal
  // window.setTimeout(function () {
  //   // hide modal
  //   modal.style.display = 'none';
  //   // set again modal to null as by default
  //   modal = null;
  // }, 500);

  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  // delete event listener to entirely clean modal box
  modal.removeEventListener('click', closeModal);
  modal
    .querySelectorAll('.close-modal')
    .forEach(close => close.addEventListener('click', closeModal));
  modal
    .querySelector('.stop-modal')
    .removeEventListener('click', stopPropagation);
  // another way to add delay and handle longer animation
  const hideModal = function () {
    // hide modal
    modal.style.display = 'none';
    // prevent from accumulating the same event multiple times with each click & avoiding bug that hides modal from the second click
    modal.removeEventListener('animationend', hideModal);
    // set again modal to null as by default
    modal = null;
  };
  modal.addEventListener('animationend', hideModal);

  window.setTimeout(function () {
    firstModal();
  }, 500);
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
