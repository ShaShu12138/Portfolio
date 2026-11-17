// Content remains visible even when animation or JavaScript is unavailable.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero-content').animate(
    [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
    { duration: 650, easing: 'ease-out' }
  );
}
