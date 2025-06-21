document.addEventListener('DOMContentLoaded', () => {
  fetch('components/footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load footer: ' + response.statusText);
      return response.text();
    })
    .then(html => {
      const container = document.getElementById('footer-container');
      if (!container) {
        console.warn('Element with id "footer-container" not found.');
        return;
      }
      container.innerHTML = html;
    })
    .catch(err => {
      console.error('Error loading footer:', err);
    });

  fetch('components/header.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load header: ' + response.statusText);
      return response.text();
    })
    .then(html => {
      const container = document.getElementById('header-container');
      if (!container) {
        console.warn('Element with id "header-container" not found.');
        return;
      }
      container.innerHTML = html;
    })
    .catch(err => {
      console.error('Error loading header:', err);
    });
});