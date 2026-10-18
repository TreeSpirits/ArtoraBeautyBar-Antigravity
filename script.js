/* ==========================================================================
   ARTORA BEAUTY BAR — TENAFLY, NJ
   Interactive Client-Side Experience (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header & Mobile Navigation
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Live Salon Hours & Today Highlight (Tenafly, NJ — America/New_York)
  function updateSalonStatus() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const hours = now.getHours() + now.getMinutes() / 60;

    // Highlight today's row in the Hours of Operation list
    const dayRows = document.querySelectorAll('#hoursList li');
    dayRows.forEach(row => {
      if (parseInt(row.getAttribute('data-day'), 10) === day) {
        row.classList.add('today-highlight');
      }
    });

    let isOpen = false;
    let statusMessage = '8 South Summit St, Side Entrance, 2nd Floor • Tenafly, NJ';

    if (day >= 2 && day <= 5) {
      // Tue - Fri: 10:00 AM – 6:00 PM
      isOpen = hours >= 10 && hours < 18;
      statusMessage = isOpen
        ? 'Open Today in Tenafly until 6:00 PM • 8 S Summit St (2nd Fl)'
        : 'Tenafly Studio • Tue–Fri 10am–6pm & Sat 9:30am–6pm';
    } else if (day === 6) {
      // Sat: 9:30 AM – 6:00 PM
      isOpen = hours >= 9.5 && hours < 18;
      statusMessage = isOpen
        ? 'Open Today in Tenafly until 6:00 PM • 8 S Summit St (2nd Fl)'
        : 'Tenafly Studio • Tue–Fri 10am–6pm & Sat 9:30am–6pm';
    } else {
      // Sun or Mon: Closed
      statusMessage = 'Tenafly Studio • Open Tue–Fri 10am–6pm & Sat 9:30am–6pm';
    }

    const statusTextEl = document.getElementById('salonStatusText');
    const statusDotEl = document.getElementById('salonStatusDot');
    if (statusTextEl) statusTextEl.textContent = statusMessage;
    if (statusDotEl) {
      statusDotEl.style.backgroundColor = isOpen ? '#79B473' : '#C5A880';
      statusDotEl.style.boxShadow = isOpen
        ? '0 0 8px rgba(121, 180, 115, 0.8)'
        : '0 0 8px rgba(197, 168, 128, 0.6)';
    }
  }
  updateSalonStatus();

  // 4. Meet Ayfer Deniz — Interactive Portrait Gallery Switcher
  const founderMainImg = document.getElementById('founderMainImg');
  const founderCaptionTitle = document.getElementById('founderCaptionTitle');
  const founderCaptionSub = document.getElementById('founderCaptionSub');
  const founderThumbBtns = document.querySelectorAll('.founder-thumb-btn');

  founderThumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      founderThumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc = btn.getAttribute('data-img');
      const newTitle = btn.getAttribute('data-title');
      const newSub = btn.getAttribute('data-sub');

      if (founderMainImg && newSrc) {
        founderMainImg.style.opacity = '0.35';
        setTimeout(() => {
          founderMainImg.src = newSrc;
          if (founderCaptionTitle) founderCaptionTitle.textContent = newTitle || 'Ayfer Deniz';
          if (founderCaptionSub) founderCaptionSub.textContent = newSub || '';
          founderMainImg.style.opacity = '1';
        }, 160);
      }
    });
  });

  // 5. Services Menu Category Tabs
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCat = btn.getAttribute('data-category');
      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCat === 'all' || cardCat === selectedCat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Lookbook & Motion Reels Filter + Lightbox
  const lookbookFilterBtns = document.querySelectorAll('.lookbook-filter-btn');
  const lookbookItems = document.querySelectorAll('.lookbook-item');

  lookbookFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lookbookFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      lookbookItems.forEach(item => {
        const tags = (item.getAttribute('data-tags') || '').split(' ');
        if (filter === 'all' || tags.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal for Lookbook Items
  const lightboxModal = document.getElementById('lightboxModal');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxMediaWrap = document.getElementById('lightboxMediaWrap');
  const lightboxCaption = document.getElementById('lightboxCaption');

  lookbookItems.forEach(item => {
    item.addEventListener('click', () => {
      const mediaType = item.getAttribute('data-type');
      const mediaSrc = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption') || 'Artora Beauty Bar Lookbook';

      if (!lightboxModal || !lightboxMediaWrap) return;

      lightboxCaption.textContent = caption;
      lightboxMediaWrap.innerHTML = '';

      if (mediaType === 'video') {
        const vid = document.createElement('video');
        vid.src = mediaSrc;
        vid.controls = true;
        vid.autoplay = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.style.maxHeight = '72vh';
        vid.style.maxWidth = '100%';
        vid.style.borderRadius = '4px';
        lightboxMediaWrap.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.src = mediaSrc;
        img.alt = caption;
        img.style.maxHeight = '72vh';
        img.style.maxWidth = '100%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '4px';
        lightboxMediaWrap.appendChild(img);
      }

      lightboxModal.classList.add('open');
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      if (lightboxMediaWrap) lightboxMediaWrap.innerHTML = '';
    }
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  // 7. Vagaro Booking Hub Modal
  const bookingModal = document.getElementById('bookingModal');
  const openBookingModalBtn = document.getElementById('openBookingModalBtn');
  const openBookingModalFooterBtn = document.getElementById('openBookingModalFooterBtn');
  const closeBookingModalBtn = document.getElementById('closeBookingModalBtn');

  function openBookingModal() {
    if (bookingModal) bookingModal.classList.add('open');
  }

  function closeBookingModal() {
    if (bookingModal) bookingModal.classList.remove('open');
  }

  if (openBookingModalBtn) openBookingModalBtn.addEventListener('click', openBookingModal);
  if (openBookingModalFooterBtn) openBookingModalFooterBtn.addEventListener('click', openBookingModal);
  if (closeBookingModalBtn) closeBookingModalBtn.addEventListener('click', closeBookingModal);

  window.addEventListener('click', e => {
    if (e.target === bookingModal) closeBookingModal();
    if (e.target === lightboxModal) closeLightbox();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeLightbox();
    }
  });
});
