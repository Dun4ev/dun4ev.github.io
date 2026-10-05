const map = document.getElementById('property-map');
const world = document.getElementById('map-world');
const toggle = document.getElementById('map-interaction');
const hint = document.getElementById('map-hint');
const plus = document.getElementById('map-zoom-in');
const minus = document.getElementById('map-zoom-out');
let active = false, scale = 1, x = 0, y = 0, drag = null;
function renderMap() {
  x = Math.max(-180, Math.min(180, x));
  y = Math.max(-100, Math.min(100, y));
  world.setAttribute('transform', `translate(${300 + x} ${180 + y}) scale(${scale}) translate(-300 -180)`);
  map.dataset.zoom = scale.toFixed(1);
  plus.disabled = !active || scale >= 1.8;
  minus.disabled = !active || scale <= 1;
}
function zoomMap(amount) { scale = Math.max(1, Math.min(1.8, Math.round((scale + amount) * 10) / 10)); renderMap(); }
function cancelDrag() {
  if (drag && map.hasPointerCapture(drag.id)) map.releasePointerCapture(drag.id);
  drag = null; map.classList.remove('is-dragging');
}
toggle.addEventListener('click', () => {
  active = !active;
  cancelDrag();
  toggle.setAttribute('aria-pressed', String(active));
  toggle.textContent = active ? 'Završi istraživanje' : 'Istraži mapu';
  map.classList.toggle('is-interactive', active);
  hint.textContent = active ? 'Pomerajte mapu prevlačenjem ili strelicama. + i − menjaju razmeru. Ovo je izmišljeni pejzaž.' : 'Izaberite „Istraži mapu” za pomeranje. Mapa nije namenjena navigaciji.';
  renderMap();
});
plus.addEventListener('click', () => zoomMap(.2));
minus.addEventListener('click', () => zoomMap(-.2));
document.getElementById('map-reset').addEventListener('click', () => { x = y = 0; scale = 1; renderMap(); });
map.addEventListener('pointerdown', event => {
  if (!active || event.button !== 0 || event.target.closest('button')) return;
  drag = {id: event.pointerId, startX: event.clientX, startY: event.clientY, x, y};
  map.setPointerCapture(event.pointerId);
  map.classList.add('is-dragging');
});
map.addEventListener('pointermove', event => {
  if (!drag || drag.id !== event.pointerId) return;
  const ratio = 600 / map.getBoundingClientRect().width;
  x = drag.x + (event.clientX - drag.startX) * ratio;
  y = drag.y + (event.clientY - drag.startY) * ratio;
  renderMap();
});
map.addEventListener('pointerup', cancelDrag);
map.addEventListener('pointercancel', cancelDrag);
map.addEventListener('keydown', event => {
  if (!active || event.target !== map) return;
  const movements = {ArrowLeft: [30,0], ArrowRight: [-30,0], ArrowUp: [0,30], ArrowDown: [0,-30]};
  if (movements[event.key]) { event.preventDefault(); const [dx,dy] = movements[event.key]; x += dx; y += dy; renderMap(); }
  if (['+','=','-'].includes(event.key)) { event.preventDefault(); zoomMap(event.key === '-' ? -.2 : .2); }
});
renderMap();
