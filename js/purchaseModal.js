document.addEventListener("dynamicLayoutLoaded", () => {
  const modalElement = document.getElementById("purchaseModal");
  const modal = new bootstrap.Modal(modalElement, {
    backdrop: "static",
    keyboard: false,
  });

  const form = document.getElementById("purchaseForm");
  const btnSubmit = form.querySelector('button[type="submit"]');

  const inputs = {
    name: document.getElementById("userName"),
    email: document.getElementById("userEmail"),
    phone: document.getElementById("userPhone"),
  };

  const ebooksMap = {
    2: {
      name: "FIRM & FIT",
      imgSrc: "./assets/img/bonus/bonus1.webp",
    },
    3: {
      name: "CRAVINGS CRUSHER",
      imgSrc: "./assets/img/bonus/bonus2.webp",
    },
    6: {
      name: "SKIN-FIRMING BLUEPRINT",
      imgSrc: "./assets/img/bonus/bonus3.webp",
    },
  };

  let selectedProduct = null;

  function validateForm() {
    const nameValid = inputs.name.value.trim().length > 0;
    const emailValid = /^\S+@\S+\.\S+$/.test(inputs.email.value.trim());
    const phoneValid = inputs.phone.value.trim().length > 0;

    return nameValid && emailValid && phoneValid;
  }

  function toggleSubmitButton() {
    btnSubmit.disabled = !validateForm();
  }

  Object.values(inputs).forEach((input) => {
    input.addEventListener("input", toggleSubmitButton);
  });

  toggleSubmitButton();

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("buy-button")) {
      const card = event.target.closest(".product-card");
      if (card) {
        selectedProduct = {
          title: card.querySelector(".product-title")?.textContent.trim(),
          imgSrc: card.querySelector("img.product-img")?.src,
          finalPrice: card.querySelector(".final-price")?.textContent.trim(),
          quantity: card
            .querySelector(".product-title")
            ?.textContent.trim()
            .match(/\d+/)?.[0],
          shippingCost: card
            .querySelector(".shipping-cost")
            ?.textContent.trim(),
        };

        const ebookInfo = ebooksMap[selectedProduct.quantity];
        if (ebookInfo) {
          selectedProduct.ebook = ebookInfo;
        }
      } else {
        selectedProduct = null;
      }
      modal.show();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (!selectedProduct) {
      alert("No product selected.");
      return;
    }

    const purchaseData = {
      name: inputs.name.value.trim(),
      email: inputs.email.value.trim(),
      phone: inputs.phone.value.trim(),
      product: selectedProduct,
    };

    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

    window.location.href = "order-confirmation.html";  });
});