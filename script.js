
document.addEventListener('DOMContentLoaded', function () {
    revealOnScroll();
    const scrollBtn = document.querySelector('.scroll-top');

    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            revealOnScroll();
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        scrollBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createLightbox();
    counterOfReaders();
    
});


function createLightbox() {
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    
    function openLightbox(imgSrc, imgAlt, captionText) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightboxCaption.textContent = captionText;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption');

            if (img) {
                const imgSrc = img.src;
                const imgAlt = img.alt;
                const captionText = caption ? caption.textContent.trim() : '';

                openLightbox(imgSrc, imgAlt, captionText);
            }
        });
    });

    lightboxClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function counterOfReaders() {
    let cnt = localStorage.getItem('visitCount');
    if (cnt === null) {cnt = 0};
    cnt++;
    localStorage.setItem('visitCount', cnt);
    document.getElementById('counter').innerText = cnt;
}


function revealOnScroll() {
    const fadeBlocks = document.querySelectorAll('.fade-block');
    fadeBlocks.forEach(function(block) {
	const blockTop = block.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (blockTop < windowHeight - 100) {
           block.classList.add('visible');
        }
        else {
	    block.classList.remove('visible');
        }
    });
}

