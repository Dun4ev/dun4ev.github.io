const form = document.getElementById('demo-inquiry-form');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const demo = document.getElementById('demo-modal');
const photoDialog = document.getElementById('photo-modal');
const photo = document.getElementById('large-photo');
const caption = document.getElementById('photo-caption');
const gallery = [...document.querySelectorAll('#galerija img')];
let currentPhoto = 0;

function validateDates() {
  checkout.min = checkin.value || '';
  checkout.setCustomValidity(checkin.value && checkout.value && checkout.value <= checkin.value
    ? 'Odlazak mora biti posle dolaska.' : '');
}
checkin.addEventListener('input', validateDates);
checkout.addEventListener('input', validateDates);
form.addEventListener('submit', event => {
  event.preventDefault();
  validateDates();
  if (!form.reportValidity()) return;
  const format = value => new Intl.DateTimeFormat('sr-Latn', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${value}T12:00:00`));
  document.getElementById('date-summary').textContent = `${format(checkin.value)} → ${format(checkout.value)}`;
  demo.showModal();
});

function showPhoto(index) {
  currentPhoto = (index + gallery.length) % gallery.length;
  photo.src = gallery[currentPhoto].src;
  photo.alt = gallery[currentPhoto].alt;
  caption.textContent = `${currentPhoto + 1} / ${gallery.length} · ${photo.alt}`;
}
gallery.forEach((image, index) => {
  image.dataset.gallery = 'true';
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Otvori fotografiju: ${image.alt}`);
  const open = () => { showPhoto(index); photoDialog.showModal(); };
  image.addEventListener('click', open);
  image.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  });
});
document.getElementById('previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.getElementById('next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
});
for (const dialog of [demo, photoDialog]) {
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
}

// Compact header and native modal navigation, adapted from the Villa Drina pattern.
const header = document.querySelector('.site-header');
const menuToggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('navigation-drawer');
const desktop = window.matchMedia('(min-width: 1101px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let closeTimer = null;
let previousOverflow = '';
let menuDestination = null;
function updateHeader() { header.classList.toggle('is-compact', window.scrollY > 40); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

function closeMenu(target, immediate = false) {
  if (!drawer.open || closeTimer !== null) return;
  const finish = () => {
    closeTimer = null;
    menuDestination = target || null;
    drawer.close();
    drawer.classList.remove('is-closing');
  };
  if (immediate || reducedMotion.matches) finish();
  else { drawer.classList.add('is-closing'); closeTimer = setTimeout(finish, 450); }
}
menuToggle.addEventListener('click', () => {
  if (drawer.open) return;
  previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  drawer.showModal();
  menuToggle.setAttribute('aria-expanded', 'true');
});
document.getElementById('menu-close').addEventListener('click', () => closeMenu());
drawer.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
drawer.addEventListener('close', () => {
  document.documentElement.style.overflow = previousOverflow;
  menuToggle.setAttribute('aria-expanded', 'false');
  const target = menuDestination;
  menuDestination = null;
  if (target) requestAnimationFrame(() => {
    const section = document.getElementById(target);
    section?.setAttribute('tabindex', '-1');
    section?.focus({ preventScroll: true });
    window.location.hash = target;
    section?.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });
  else if (!desktop.matches) menuToggle.focus({ preventScroll: true });
});
drawer.addEventListener('click', event => {
  const box = drawer.getBoundingClientRect();
  if (event.target === drawer && (event.clientX < box.left || event.clientX > box.right)) closeMenu();
});
drawer.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  closeMenu(link.hash.slice(1));
}));
drawer.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const items = [...drawer.querySelectorAll('button, a[href]')];
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
desktop.addEventListener('change', () => {
  if (!desktop.matches || !drawer.open) return;
  if (closeTimer !== null) { clearTimeout(closeTimer); closeTimer = null; }
  closeMenu(undefined, true);
  header.querySelector('.header-brand').focus({ preventScroll: true });
});
