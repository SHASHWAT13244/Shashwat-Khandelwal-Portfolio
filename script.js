// Theme Toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeToggle.innerHTML = newTheme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  });
  
  // Set initial icon
  themeToggle.innerHTML = currentTheme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

// Animate stats counting
function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');
  
  statValues.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCount(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = Math.floor(progress * target);
      
      stat.textContent = value;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    
    requestAnimationFrame(updateCount);
  });
}

// Animate skill bars
function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.width = `${level}%`;
  });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Certification Collapse Functionality
function setupCertificationCollapse() {
  document.querySelectorAll('.collapse-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = button.closest('.certification-card');
      const content = card.querySelector('.collapse-content');
      const icon = button.querySelector('i');
      
      // Toggle content
      content.classList.toggle('show');
      
      // Update icon and button text
      if (content.classList.contains('show')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        button.innerHTML = 'Hide All <i class="fas fa-chevron-up"></i>';
      } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        button.innerHTML = 'Show All <i class="fas fa-chevron-down"></i>';
      }
    });
  });
}

// GSAP Animations
function setupGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section animation
  gsap.from('.hero-title span', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-buttons', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
  });
  
  // Section animations
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    gsap.from(section.querySelectorAll('.section-divider'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      scaleX: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
  
  // Project card animations
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Skill card animations
  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Certification card animations
  gsap.utils.toArray('.certification-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
}

// Form submission
function setupForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupSmoothScrolling();
  setupGSAPAnimations();
  setupForm();
  setupCertificationCollapse();
  
  // Animate stats and skills when they come into view
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 70%',
    onEnter: animateStats
  });
  
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 70%',
    onEnter: animateSkills
  });
});