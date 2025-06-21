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

  const productImage = document.getElementById("productImage");
  const productQuantity = document.getElementById("productQuantity");
  const productTotalPrice = document.getElementById("productTotalPrice");

  const bonusQuantity = document.getElementById("bonusQuantity");
  const bonusEbookName = document.getElementById("bonusEbookName");
  const bonusEbookImage = document.getElementById("bonusEbookImage");

  if (customerName) customerName.textContent = `Thank You, ${purchaseData.name} & Congratulations!`;
  if (customerEmail) customerEmail.textContent = purchaseData.email;
  if (customerEmailDuplicate) customerEmailDuplicate.textContent = purchaseData.email;

  if (purchaseData.product) {
    if (productImage) {
      productImage.src = purchaseData.product.imgSrc;
      productImage.alt = purchaseData.product.title;
    }
    if (productQuantity) productQuantity.textContent = `${purchaseData.product.quantity} Bottles`;
    if (productTotalPrice) productTotalPrice.textContent = purchaseData.product.finalPrice;

    if (bonusQuantity) bonusQuantity.textContent = purchaseData.product.quantity;

    // Verifica se o ebook existe no objeto produto para mostrar os dados do bônus
    if (bonusEbookName && purchaseData.product.ebook) {
      bonusEbookName.textContent = purchaseData.product.ebook.name;
    }
    if (bonusEbookImage && purchaseData.product.ebook) {
      bonusEbookImage.src = purchaseData.product.ebook.imgSrc;
      bonusEbookImage.alt = purchaseData.product.ebook.name;
    }
  }
});