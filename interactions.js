    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            // Deteta qual a imagem (gatilho) que foi clicada
            const clickedImage = event.relatedTarget;
            
            // Extrai o SRC e o ALT da imagem clicada
            const imageSrc = clickedImage.getAttribute('src');
            const imageAlt = clickedImage.getAttribute('alt');
            
            // Atualiza o modal com os dados corretos
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('galleryModalLabel');
            
            modalImage.setAttribute('src', imageSrc);
            modalImage.setAttribute('alt', imageAlt);
            modalTitle.textContent = imageAlt; // Define o título do modal como o texto alternativo
        });
    }