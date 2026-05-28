document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Mobile Sticky CTA Bar Scroll Controller
     ========================================================================== */
  const stickyCtaBar = document.getElementById('stickyCtaBar');
  const heroSection = document.getElementById('hero');
  const applySection = document.getElementById('apply');
  
  function toggleStickyCta() {
    if (!stickyCtaBar || !heroSection || !applySection) return;

    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Check if the actual form is visible in the viewport
    const applyRect = applySection.getBoundingClientRect();
    const isFormVisible = applyRect.top < (window.innerHeight - 80);
    
    // Show sticky CTA if user scrolled past hero, but hide it once the form itself comes into view
    if (scrollPosition > (heroHeight - 100) && !isFormVisible) {
      stickyCtaBar.classList.add('visible');
    } else {
      stickyCtaBar.classList.remove('visible');
    }
  }

  // Scroll listener with tick throttle
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        toggleStickyCta();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Run on load
  toggleStickyCta();


  /* ==========================================================================
     2. Smooth Scroll for internal anchor links (with mobile header offset)
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 70; // Matches header height in index.css
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ==========================================================================
     3. Entry Form submission simulation (Mobile Optimization)
     ========================================================================== */
  const entryForm = document.getElementById('entryForm');
  const formSuccess = document.getElementById('formSuccess');

  if (entryForm) {
    entryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic input validation
      const name = document.getElementById('entryName').value.trim();
      const email = document.getElementById('entryEmail').value.trim();
      const role = document.getElementById('entryRole').value;

      if (!name || !email || !role) {
        alert('すべての必須項目を入力してください。');
        return;
      }

      // Submission animation on submit button
      const submitBtn = entryForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      submitBtn.innerHTML = '送信中...';

      // Simulate network request (1.5s delay)
      setTimeout(() => {
        // Hide form and display success panel
        entryForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Hide the sticky bottom CTA bar since form is submitted
        if (stickyCtaBar) {
          stickyCtaBar.classList.remove('visible');
          // Disable scroll listener
          toggleStickyCta = () => {};
        }

        // Scroll to success panel smoothly
        const headerOffset = 70;
        const elementPosition = applySection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 1500);
    });
  }

});
