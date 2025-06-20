function loadDynamicLayout() {
  fetch('components/dynamic-layout.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load dynamic layout: ' + response.statusText);
      return response.text();
    })
    .then(html => {
      const container = document.getElementById('dynamic-layout-container');
      if (!container) {
        console.warn('Element with id "dynamic-layout-container" not found.');
        return; 
      }
      container.innerHTML = html;
      document.dispatchEvent(new Event('dynamicLayoutLoaded'));
    })
    .catch(err => {
      console.error('Error loading dynamic layout:', err);
    });
}

loadDynamicLayout();