document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.hexo-apple-gallery');
    if (galleries.length === 0) {
        return;
    }

    let currentImageIndex = 0;
    let currentGalleryImages = [];

    // --- 创建灯箱和其内部元素 ---
    const lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.classList.add('gallery-lightbox');
    document.body.appendChild(lightbox);

    const lightboxImage = document.createElement('img');
    lightboxImage.classList.add('gallery-lightbox-image');
    lightbox.appendChild(lightboxImage);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('lightbox-control', 'lightbox-close');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    lightbox.appendChild(closeBtn);

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('lightbox-control', 'lightbox-prev');
    prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    lightbox.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('lightbox-control', 'lightbox-next');
    nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    lightbox.appendChild(nextBtn);
    
    // [新增] 创建缩略图容器
    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.classList.add('lightbox-thumbnails');
    lightbox.appendChild(thumbnailsContainer);

    // --- 功能函数 ---
    function showImage(index) {
        // 更新主图
        lightboxImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            lightboxImage.src = currentGalleryImages[index];
            lightboxImage.style.transform = 'scale(1)';
        }, 150);

        // [新增] 更新缩略图高亮状态
        const thumbnails = thumbnailsContainer.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, thumbIndex) => {
            if (thumbIndex === index) {
                thumb.classList.add('active');
                // 确保当前高亮的缩略图在可视区域内
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function showNextImage(event) {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        showImage(currentImageIndex);
    }

    function showPrevImage(event) {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        showImage(currentImageIndex);
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    // --- 事件监听 ---
    galleries.forEach(gallery => {
        const links = Array.from(gallery.querySelectorAll('.gallery-link'));
        links.forEach((link, index) => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                currentGalleryImages = links.map(a => a.href);
                currentImageIndex = index;
                
                // [新增] 动态生成并填充缩略图
                thumbnailsContainer.innerHTML = ''; // 清空旧的缩略图
                currentGalleryImages.forEach((imageUrl, thumbIndex) => {
                    const thumb = document.createElement('img');
                    thumb.src = imageUrl;
                    thumb.classList.add('lightbox-thumbnail');
                    thumb.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentImageIndex = thumbIndex;
                        showImage(currentImageIndex);
                    });
                    thumbnailsContainer.appendChild(thumb);
                });

                showImage(currentImageIndex);
                lightbox.classList.add('visible');
            });
        });
    });

    lightbox.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    lightboxImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('visible')) {
            if (e.key === 'ArrowRight') {
                showNextImage(e);
            } else if (e.key === 'ArrowLeft') {
                showPrevImage(e);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});
