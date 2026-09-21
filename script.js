// ---------- Referencias ----------
const field = document.getElementById('field');
const scene = document.getElementById('scene');
const petalsBtn = document.getElementById('petalsBtn');
const bigFlower = document.getElementById('bigFlower');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');

const PETAL_COUNT = 6;
const SMALL_FLOWER_COUNT = 10;

// ---------- Crear una flor pequeña ----------
function createFlower(index) {
  const flower = document.createElement('div');
  flower.className = 'flower';

  const height = 110 + Math.round(Math.sin(index * 1.7) * 18);
  const size = 44 + Math.round(Math.cos(index * 1.3) * 8);

  flower.style.width = size + 'px';
  flower.style.height = height + 'px';
  flower.style.animationDuration = (3.4 + (index % 4) * 0.4) + 's';
  flower.style.animationDelay = (-index * 0.5) + 's';

  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.width = '5px';
  stem.style.height = (height - size + 8) + 'px';
  flower.appendChild(stem);

  const leafLeft = document.createElement('div');
  leafLeft.className = 'leaf left';
  leafLeft.style.width = '18px';
  leafLeft.style.height = '10px';
  leafLeft.style.bottom = Math.round(height * 0.28) + 'px';
  leafLeft.style.left = 'calc(50% - 17px)';
  flower.appendChild(leafLeft);

  const leafRight = document.createElement('div');
  leafRight.className = 'leaf right';
  leafRight.style.width = '18px';
  leafRight.style.height = '10px';
  leafRight.style.bottom = Math.round(height * 0.48) + 'px';
  leafRight.style.left = 'calc(50% + 1px)';
  flower.appendChild(leafRight);

  const bloom = document.createElement('div');
  bloom.className = 'bloom';
  bloom.style.width = size + 'px';
  bloom.style.height = size + 'px';
  bloom.style.animationDelay = (-index * 0.6) + 's';

  const petalW = size * 0.37;
  const petalH = size * 0.54;

  for (let p = 0; p < PETAL_COUNT; p++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.width = petalW + 'px';
    petal.style.height = petalH + 'px';
    petal.style.top = (size * 0.23) + 'px';
    petal.style.left = (size * 0.315) + 'px';
    petal.style.transform = `rotate(${(360 / PETAL_COUNT) * p}deg)`;
    bloom.appendChild(petal);
  }

  const center = document.createElement('div');
  center.className = 'center';
  const centerSize = size * 0.31;
  center.style.width = centerSize + 'px';
  center.style.height = centerSize + 'px';
  center.style.top = (size * 0.345) + 'px';
  center.style.left = (size * 0.345) + 'px';
  bloom.appendChild(center);

  flower.appendChild(bloom);
  return flower;
}

// ---------- Armar el campo ----------
function renderField() {
  field.innerHTML = '';
  for (let i = 0; i < SMALL_FLOWER_COUNT; i++) {
    field.appendChild(createFlower(i));
  }
}

// ---------- Pétalos cayendo desde arriba de toda la pantalla ----------
function dropPetals() {
  const total = 26;
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'falling-petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (4 + Math.random() * 3) + 's';
      petal.style.opacity = 0.7 + Math.random() * 0.3;
      scene.appendChild(petal);
      petal.addEventListener('animationend', () => petal.remove());
    }, i * 90);
  }
}

// ---------- Pétalos que salen de la flor grande al presionar el botón ----------
function burstFromBigFlower() {
  const rect = bigFlower.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height * 0.35;

  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'falling-petal';
      petal.style.left = (originX + (Math.random() * 80 - 40)) + 'px';
      petal.style.top = originY + 'px';
      petal.style.animationDuration = (3 + Math.random() * 2) + 's';
      scene.appendChild(petal);
      petal.addEventListener('animationend', () => petal.remove());
    }, i * 60);
  }
}

// ---------- Títulos editables ----------
function setupEditable(el, placeholder) {
  el.addEventListener('focus', () => {
    if (el.textContent.trim() === placeholder) {
      document.execCommand('selectAll', false, null);
    }
  });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      el.blur();
    }
  });
}

setupEditable(titleEl, 'Mi jardín de flores amarillas');
setupEditable(subtitleEl, 'Toca aquí para escribir un subtítulo');

// ---------- Eventos ----------
petalsBtn.addEventListener('click', () => {
  dropPetals();
  burstFromBigFlower();
});

// ---------- Inicio ----------
renderField();

