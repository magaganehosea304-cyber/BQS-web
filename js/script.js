//select HTML elements

const specialMessage = document.querySelector("#special-message");
const specialButton = document.querySelector("#special-button");
const specialImage = document.querySelector("#special-image");

//respond to button click

if(specialMessage && specialButton && specialImage) {
  specialButton.addEventListener("click", function () {
    specialMessage.textContent = "You clicked the button!";

  });
}