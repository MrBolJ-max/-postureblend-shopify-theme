/**
 * PostureBlend Theme JavaScript v2 — BRIGHT & ALIVE
 * Enhanced interactions, animations, and particle effects
 */

(function() {
  'use strict';

  const PB = {
    config: {
      stockLimit: 47,
      saleEndHours: 6,
      scrollRevealDelay: 120,
      animationDuration: 900,
      particleCount: 15,
      floatSpeed: 0.5
    },

    init() {
      this.initParticles();
      this.initStockCounter();
      this.initCountdownTimer();
      this.initScrollReveal();
      this.initStickyHeader();
      this.initMobileMenu();
      this.initSmoothScroll();
      this.initTrustBadgesAnimation();
      this.initAddToCartEnhancements();
      this.initFloatingElements();
      this.initParallax();
      this.initCounterAnimation();
    },

    // Floating particles for hero background
    initParticles() {
      const heroes = document.querySelectorAll('.pb-hero, [data-particles]');
      heroes.forEach(hero => {
        for (let i = 0; i < this.config.particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'pb-particle';
          const size = Math.random() * 8 + 4;
          particle.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: pb-float ${6 + Math.random() * 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.1 + Math.random() * 0.15};
          `;
          hero.appendChild(particle);
        }
      });
    },

    // Stock counter with realistic fluctuation
    initStockCounter() {
      const counters = document.querySelectorAll('[data-stock-counter]');
      counters.forEach(counter => {
        let current = parseInt(counter.dataset.stock) || this.config.stockLimit;
        counter.textContent = current;
        
        setInterval(() => {
          if (current > 5 && Math.random() > 0.65) {
            current--;
            counter.textContent = current;
            counter.style.transform = 'scale(1.2)';
            counter.style.color = '#FF6B6B';
            setTimeout(() => {
              counter.style.transform = 'scale(1)';
              counter.style.color = '';
            }, 300);
          }
        }, Math.random() * 50000 + 25000);
      });
    },

    // Countdown timer
    initCountdownTimer() {
      const timers = document.querySelectorAll('[data-countdown]');
      timers.forEach(timer => {
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + this.config.saleEndHours);
        
        const update = () => {
          const diff = endTime - new Date();
          if (diff <= 0) { timer.textContent = '00:00:00'; return; }
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          timer.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        };
        update(); setInterval(update, 1000);
      });
    },

    // Scroll reveal with stagger
    initScrollReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || i * this.config.scrollRevealDelay;
            setTimeout(() => {
              entry.target.classList.add('pb-revealed');
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity ${this.config.animationDuration}ms cubic-bezier(0.4,0,0.2,1), transform ${this.config.animationDuration}ms cubic-bezier(0.4,0,0.2,1)`;
        observer.observe(el);
      });
    },

    // Sticky header
    initStickyHeader() {
      const header = document.querySelector('[data-sticky-header]');
      if (!header) return;
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 80) {
          header.classList.add('pb-header-sticky');
          header.style.cssText = 'box-shadow: 0 4px 24px rgba(74,159,212,0.12); background: rgba(255,255,255,0.95); backdrop-filter: blur(12px);';
        } else {
          header.classList.remove('pb-header-sticky');
          header.style.cssText = '';
        }
        lastScroll = currentScroll;
      });
    },

    // Mobile menu
    initMobileMenu() {
      const toggles = document.querySelectorAll('[data-mobile-toggle]');
      const menu = document.querySelector('[data-mobile-menu]');
      toggles.forEach(t => {
        t.addEventListener('click', () => {
          menu?.classList.toggle('pb-mobile-open');
          document.body.classList.toggle('pb-menu-open');
        });
      });
    },

    // Smooth scroll
    initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
      });
    },

    // Trust badges with bounce
    initTrustBadgesAnimation() {
      const badges = document.querySelectorAll('[data-trust-badge]');
      badges.forEach((badge, i) => {
        badge.style.opacity = '0'; badge.style.transform = 'scale(0.5) translateY(20px)';
        badge.style.transition = `all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${i * 0.12}s`;
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) {
            e.target.style.opacity = '1'; e.target.style.transform = 'scale(1) translateY(0)';
          }});
        }, { threshold: 0.1 });
        observer.observe(badge);
      });
    },

    // Add to cart with celebration
    initAddToCartEnhancements() {
      const buttons = document.querySelectorAll('[data-add-to-cart]');
      buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
          const original = this.innerHTML;
          this.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">✓ Added to Cart!</span>';
          this.style.background = '#48BB78';
          this.style.transform = 'scale(1.05)';
          
          // Mini confetti burst
          this.createParticleBurst?.();
          
          setTimeout(() => {
            this.innerHTML = original;
            this.style.background = '';
            this.style.transform = '';
          }, 2000);
          
          document.dispatchEvent(new CustomEvent('pb:cart:updated', {
            detail: { product: this.dataset.product }
          }));
        });
      });
    },

    // Floating elements on scroll
    initFloatingElements() {
      const floats = document.querySelectorAll('[data-float]');
      window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        floats.forEach(el => {
          const speed = parseFloat(el.dataset.float) || 0.3;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      });
    },

    // Parallax for hero images
    initParallax() {
      const parallaxEls = document.querySelectorAll('[data-parallax]');
      window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.2;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      });
    },

    // Animated number counters
    initCounterAnimation() {
      const counters = document.querySelectorAll('[data-counter]');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.counter);
        const duration = 2000;
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              let start = 0;
              const increment = target / (duration / 16);
              const timer = setInterval(() => {
                start += increment;
                if (start >= target) { counter.textContent = target.toLocaleString(); clearInterval(timer); }
                else { counter.textContent = Math.floor(start).toLocaleString(); }
              }, 16);
              observer.unobserve(e.target);
            }
          });
        }, { threshold: 0.5 });
        observer.observe(counter);
      });
    }
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PB.init());
  } else { PB.init(); }

  window.PostureBlend = PB;
})();
