document.addEventListener('dynamicLayoutLoaded', () => {
  const modalElement = document.getElementById("purchaseModal");
  const modal = new bootstrap.Modal(modalElement, { backdrop: 'static', keyboard: false });

  const form = document.getElementById("purchaseForm");
  const btnSubmit = form.querySelector('button[type="submit"]');

  const inputs = {
    name: document.getElementById("userName"),
    email: document.getElementById("userEmail"),
    phone: document.getElementById("userPhone")
  };

  function validateForm() {
    const nameValid = inputs.name.value.trim().length > 0;
    const emailValid = /^\S+@\S+\.\S+$/.test(inputs.email.value.trim());
    const phoneValid = inputs.phone.value.trim().length > 0;

    return nameValid && emailValid && phoneValid;
  }

  function toggleSubmitButton() {
    btnSubmit.disabled = !validateForm();
  }

  Object.values(inputs).forEach(input => {
    input.addEventListener('input', toggleSubmitButton);
  });

  toggleSubmitButton();

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("buy-button")) {
      modal.show();
    }
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    form.reset();
    toggleSubmitButton(); 
  });

let purchaseData = {};

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    purchaseData = {
      name: inputs.name.value.trim(),
      email: inputs.email.value.trim(),
      phone: inputs.phone.value.trim()
    };

    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

    window.location.href = "/order-confirmation.html";
  });
});