function loadDynamicLayout() {
  fetch('components/dynamic-layout.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('dynamic-layout-container').innerHTML = html;
    })
    .catch(err => {
      console.error('Erro ao carregar o componente:', err);
    });
}

loadDynamicLayout();