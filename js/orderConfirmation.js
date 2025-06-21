document.addEventListener("DOMContentLoaded", () => {
  const purchaseData = JSON.parse(localStorage.getItem("purchaseData"));

  if (!purchaseData) {
    alert("No purchase data found. Redirecting to home.");
    window.location.href = "/";
    return;
  }

  const customerName = document.getElementById("customerName");
  const customerEmail = document.getElementById("customerEmail");
  const customerEmailDuplicate = document.getElementById("customerEmailDuplicate");

  if (customerName) customerName.textContent = `Thank You, ${purchaseData.name}!`;
  if (customerEmail) customerEmail.textContent = purchaseData.email;
  if (customerEmailDuplicate) customerEmailDuplicate.textContent = purchaseData.email;

  const productImage = document.getElementById("productImage");
  const productQuantity = document.getElementById("productQuantity");
  const productTotalPrice = document.getElementById("productTotalPrice");

  if (purchaseData.product) {
    if (productImage) {
      productImage.src = purchaseData.product.imgSrc;
      productImage.alt = purchaseData.product.title;
    }
    if (productQuantity) productQuantity.textContent = `${purchaseData.product.quantity} Bottles`;
    if (productTotalPrice) productTotalPrice.textContent = purchaseData.product.finalPrice;
  }
});