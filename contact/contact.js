const contactForm = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-submit");
const btnSubmitText = document.querySelector(".btn-submit span");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const error = document.getElementById("contact-error");
const success = document.getElementById("contact-success");

const onSubmit = (e) => {
  e.preventDefault();
  error.innerText = "";
  success.innerText = "";
  if (
    !nameInput.value.trim() ||
    !emailInput.value.trim() ||
    !messageInput.value.trim()
  ) {
    error.innerText = "Please fill all fields";
    return;
  }
  btnSubmitText.innerText = "Sending...";
  btnSubmit.disabled = true;
  fetch("https://site-server.herokuapp.com/send", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      teksag: true,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        error.innerText = result.error;
      } else {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        success.innerText =
          "Thank you, Your message has been sent. We will reach out to you as soon as possible.";
      }
    })
    .catch((err) => {
      console.log(err);
      error.innerText = "Network error, please retry.";
    })
    .finally(() => {
      btnSubmitText.innerText = "Submit";
      btnSubmit.disabled = false;
    });
};

contactForm.addEventListener("submit", onSubmit);
