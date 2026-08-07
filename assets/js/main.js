(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initActiveNav();
    initMobileNav();
  });

  function initActiveNav() {
    var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (currentPath === href) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    // Toggle menu on button click
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        toggle.focus();
      }
    });

    // Close menu when clicking internal links
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        // Only close if it's an internal link (starts with /)
        var href = link.getAttribute('href');
        if (href && href.charAt(0) === '/') {
          setMenuState(false);
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
          setMenuState(false);
        }
      }
    });

    function setMenuState(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        menu.classList.add('is-open');
      } else {
        menu.classList.remove('is-open');
      }
    }
  }

})();
