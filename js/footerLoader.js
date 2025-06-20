document.addEventListener('DOMContentLoaded', () => {
  fetch('components/footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load footer: ' + response.statusText);
      return response.text();
    })
    .then(html => {
      const container = document.getElementById('footer-container');
      if (container) {
        container.innerHTML = html;
      } else {
        console.warn('No element with id "footer-container" found.');
      }
    })
    .catch(console.error);
});