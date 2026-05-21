// 1. Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Menambahkan efek hover pada kursor saat menyentuh link atau tombol
const linksAndButtons = document.querySelectorAll('a, button');
linksAndButtons.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(0, 243, 255, 0.2)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// 2. Typing Animation
const texts = ["Mahasiswi", "Universitas Gunadarma", "Semester 2", "Manajemen"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    document.querySelector('.typing-text').textContent = letter;

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Waktu jeda sebelum menghapus
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
type();

// 3. Scroll Fade-in & Animasi Progress Bar
const faders = document.querySelectorAll('.fade-in');
const skillBars = document.querySelectorAll('.skill-per');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Memunculkan elemen (Fade in up)
        entry.target.classList.add('appear');
        
        // Jika yang terlihat adalah container skills, jalankan animasi bar
        if(entry.target.classList.contains('skills-container')) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
        
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 4. Mobile Menu Hamburger Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 5. Partikel Background (menggunakan partcle.js)
particlesJS("particles-js", {
    "particles": {
      "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#00f3ff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.3, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00f3ff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
});

// 6. Audio Player Toggle & Autoplay Trick
const musicToggleBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// Fungsi untuk mengubah tampilan tombol
function updateButtonState() {
    if (isPlaying) {
        musicToggleBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        musicToggleBtn.classList.add('active-music');
    } else {
        musicToggleBtn.innerHTML = '<i class="fas fa-play"></i> Play Music';
        musicToggleBtn.classList.remove('active-music');
    }
}

if (musicToggleBtn && bgMusic) {
    // 1. Coba putar otomatis saat halaman selesai dimuat
    bgMusic.play().then(() => {
        isPlaying = true;
        updateButtonState();
    }).catch(() => {
        console.log("Autoplay ditahan oleh browser sampai ada interaksi user.");
    });

    // 2. Tombol manual Play/Pause
    musicToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play();
        }
        isPlaying = !isPlaying;
        updateButtonState();
    });

    // 3. Trik: Putar otomatis saat user pertama kali scroll atau klik di mana saja
    const autoPlayOnInteract = () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                updateButtonState();
            }).catch(() => {});
        }
        // Hapus pendeteksi setelah musik berhasil terputar agar tidak memberatkan website
        document.removeEventListener('click', autoPlayOnInteract);
        document.removeEventListener('scroll', autoPlayOnInteract);
        document.removeEventListener('touchstart', autoPlayOnInteract);
    };

    // Pasang pendeteksi interaksi ke seluruh halaman
    document.addEventListener('click', autoPlayOnInteract);
    document.addEventListener('scroll', autoPlayOnInteract);
    document.addEventListener('touchstart', autoPlayOnInteract); // Untuk pengguna HP
}

// 7. Lightbox Gallery (Zoom Foto)
const albumItems = document.querySelectorAll('.album-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

if (albumItems.length > 0 && lightbox && lightboxImg) {
    albumItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';
        });
    });

    // Tutup saat tombol 'X' diklik
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Tutup saat area luar gambar diklik
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });
}
