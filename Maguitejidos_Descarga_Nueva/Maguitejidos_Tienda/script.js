/* CONFIGURACIÓN DE LA TIENDA
   Escribe tu número con código de país, solo dígitos y sin +, espacios ni guiones.
   Ejemplo de formato para Perú: 51XXXXXXXXX. No uses el número de ejemplo como contacto real.
*/
const WHATSAPP_NUMBER = "51924001391";
const WHATSAPP_DISPLAY = "924 001 391"; // Número visible de la tienda

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}
function sendWhatsApp(message) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!digits) {
    showToast('WhatsApp aún no está configurado. Abre script.js y añade el número real de la tienda.');
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (digits.length < 10 || digits.length > 15) {
    showToast('Revisa el formato del número de WhatsApp en script.js.');
    return;
  }
  window.open(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    const price = button.dataset.price;
    sendWhatsApp(`¡Hola, Maguitejidos! ♡ Me interesa esta creación: ${product} (${price}). ¿Podrían confirmarme la disponibilidad y los detalles del pedido?`);
  });
});
document.getElementById('generalWhatsapp').addEventListener('click', () => {
  sendWhatsApp('¡Hola, Maguitejidos! ♡ Quisiera información sobre sus creaciones tejidas y cómo realizar un pedido.');
});

// Filtros y búsqueda del catálogo
const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.product-card')];
const searchInput = document.getElementById('productSearch');
const emptyState = document.getElementById('emptyState');
let activeCategory = 'todos';
function updateProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase('es');
  let visible = 0;
  cards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    const name = (card.dataset.name + ' ' + card.textContent).toLocaleLowerCase('es');
    const matchesCategory = activeCategory === 'todos' || categories.includes(activeCategory);
    const matchesSearch = !query || name.includes(query);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.filter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  updateProducts();
}));
searchInput.addEventListener('input', updateProducts);

// Favoritos visuales (solo en esta sesión)
document.querySelectorAll('.heart-btn').forEach(button => button.addEventListener('click', () => {
  const liked = button.classList.toggle('liked');
  button.textContent = liked ? '♥' : '♡';
  button.setAttribute('aria-pressed', String(liked));
}));

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuToggle.textContent = open ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();
if (WHATSAPP_DISPLAY.trim()) document.getElementById('whatsappDisplay').textContent = WHATSAPP_DISPLAY.trim();
if (WHATSAPP_NUMBER.replace(/\D/g, '').length >= 10) {
  const setupNote = document.getElementById('setupNote');
  if (setupNote) setupNote.hidden = true;
}
