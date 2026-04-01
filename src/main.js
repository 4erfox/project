document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
  initializeHamburger();
  initializeActiveLink();
  initializeTimelineParallax();
  initializeTimelineScroll();
});

function initializeNavbar() {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initializeHamburger() {
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  });
}

function initializeActiveLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  sections.forEach(section => observer.observe(section));
}

function initializeTimelineParallax() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  timelineItems.forEach(item => {
    observer.observe(item);
  });

  window.addEventListener('scroll', () => {
    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const offset = window.innerHeight / 2;

      if (rect.top < offset) {
        item.style.opacity = Math.min(1, (offset - rect.top) / 200 + 0.3);
      }
    });
  });
}

function initializeTimelineScroll() {
  const progressBar = document.querySelector('.progress-fill');
  const timelineSection = document.getElementById('basics');

  if (!timelineSection || !progressBar) return;

  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = timelineSection.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (rect.top < viewportHeight && rect.bottom > 0) {
      const scrollPercentage = (viewportHeight - rect.top) / (sectionHeight + viewportHeight);
      const progress = Math.min(100, Math.max(0, scrollPercentage * 100));
      progressBar.style.width = progress + '%';
    }
  });
}
