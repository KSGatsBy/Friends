import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ==================== APP STATE ====================
let allLines    = [];
let vocabWords  = new Set();
let timeOfDay   = 0;
let isBubblePaused = false;

// ==================== THREE.js SCENE ====================
let scene, camera, renderer;
let characterMeshes = [];
let bubbleLayer = document.getElementById('bubble-layer');
let pendantLights = [];
let fireLight = null;

// 角色配置（坐在沙发上的位置）
const CHAR_CONFIG = [
  { id: 'ross',    x: -0.85, color: '#4A90D9' },
  { id: 'rachel',  x: -0.51, color: '#E8739A' },
  { id: 'monica',  x: -0.17, color: '#F5A623' },
  { id: 'chandler',x:  0.17, color: '#8E6FD4' },
  { id: 'joey',    x:  0.51, color: '#E85D5D' },
  { id: 'phoebe',  x:  0.85, color: '#5EBF8D' },
];

function initThree() {
  const canvas = document.getElementById('cafe-canvas');

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a1f14);
  scene.fog = new THREE.Fog(0x2a1f14, 8, 20);

  // Camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.7, 5.5);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, -1);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 2.5;
  controls.maxDistance = 9;
  controls.maxPolarAngle = Math.PI / 2.1;
  controls.minPolarAngle = Math.PI / 6;

  buildRoom();
  buildSofa();
  buildCoffeeTable();
  buildBar();
  buildFireplace();
  buildPendantLights();
  buildCharacters();
  buildExtraFurniture();
  setupLighting();

  window.addEventListener('resize', onResize);
  animate();
}

// ==================== ROOM ====================
function buildRoom() {
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xD4B896, roughness: 0.9 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x8B6B4A, roughness: 0.7 });
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0xC4A882, roughness: 0.95 });

  // Floor (10m x 8m)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Back wall (z = -4)
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallMat);
  backWall.position.set(0, 2, -4);
  backWall.receiveShadow = true;
  scene.add(backWall);

  // Left wall (x = -5)
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), wallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-5, 2, 0);
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  // Right wall (x = 5)
  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), wallMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(5, 2, 0);
  rightWall.receiveShadow = true;
  scene.add(rightWall);

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), ceilMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 4;
  scene.add(ceiling);

  // Rug under coffee table
  const rugMat = new THREE.MeshStandardMaterial({ color: 0x7A4030, roughness: 0.95 });
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.2, 32), rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.01, -1.5);
  rug.receiveShadow = true;
  scene.add(rug);
}

// ==================== SOFA ====================
function buildSofa() {
  const sofaMat = new THREE.MeshStandardMaterial({ color: 0xC85A2A, roughness: 0.85 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x8B3A1A, roughness: 0.9 });

  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(0, 0, -2.8);

  // Base
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 0.9), sofaMat);
  base.position.y = 0.25;
  base.castShadow = true;
  sofaGroup.add(base);

  // Backrest
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 0.2), darkMat);
  back.position.set(0, 0.65, -0.35);
  back.castShadow = true;
  sofaGroup.add(back);

  // Left arm
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.9), darkMat);
  armL.position.set(-1.1, 0.4, 0);
  armL.castShadow = true;
  sofaGroup.add(armL);

  // Right arm
  const armR = armL.clone();
  armR.position.x = 1.1;
  sofaGroup.add(armR);

  // Cushions (3 seats)
  for (let i = 0; i < 3; i++) {
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.12, 0.75), sofaMat);
    cushion.position.set(-0.7 + i * 0.7, 0.48, 0.05);
    cushion.castShadow = true;
    sofaGroup.add(cushion);
  }

  scene.add(sofaGroup);
}

// ==================== COFFEE TABLE ====================
function buildCoffeeTable() {
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x6B4226, roughness: 0.6 });

  const tableGroup = new THREE.Group();
  tableGroup.position.set(0, 0, -1.3);

  // Round top
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.04, 24), woodMat);
  top.position.y = 0.45;
  top.castShadow = true;
  tableGroup.add(top);

  // Leg
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.45, 12), woodMat);
  leg.position.y = 0.22;
  leg.castShadow = true;
  tableGroup.add(leg);

  // Base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.03, 16), woodMat);
  base.position.y = 0.015;
  tableGroup.add(base);

  // Coffee cup
  const cupMat = new THREE.MeshStandardMaterial({ color: 0xF5F5F0, roughness: 0.4 });
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.08, 12), cupMat);
  cup.position.set(0.1, 0.51, 0);
  cup.castShadow = true;
  tableGroup.add(cup);

  scene.add(tableGroup);
}

// ==================== BAR ====================
function buildBar() {
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x5C3820, roughness: 0.55 });
  const darkWood = new THREE.MeshStandardMaterial({ color: 0x3E2412, roughness: 0.6 });

  const barGroup = new THREE.Group();
  barGroup.position.set(-4.2, 0, -1.5);

  // Counter top
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 2.5), woodMat);
  top.position.y = 1.1;
  top.castShadow = true;
  barGroup.add(top);

  // Front panel
  const front = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.05, 2.5), darkWood);
  front.position.set(0.66, 0.55, 0);
  barGroup.add(front);

  // Back shelf (2 levels on wall)
  for (let level = 0; level < 2; level++) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 2.0), woodMat);
    shelf.position.set(-0.5, 1.6 + level * 0.5, 0);
    shelf.castShadow = true;
    barGroup.add(shelf);

    // Bottles on shelf
    for (let i = 0; i < 5; i++) {
      const bottleMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.15 + 0.05, 0.6, 0.3),
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      });
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 8), bottleMat);
      bottle.position.set(-0.5, 1.7 + level * 0.5, -0.8 + i * 0.4);
      barGroup.add(bottle);
    }
  }

  scene.add(barGroup);
}

// ==================== FIREPLACE ====================
function buildFireplace() {
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x9A8878, roughness: 0.9 });
  const mantelMat = new THREE.MeshStandardMaterial({ color: 0x5C3820, roughness: 0.6 });

  const fpGroup = new THREE.Group();
  fpGroup.position.set(4.5, 0, -2.5);

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 1.2), stoneMat);
  body.position.y = 0.6;
  body.castShadow = true;
  fpGroup.add(body);

  // Fire opening
  const fireBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.5, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x1a0a05, roughness: 1 })
  );
  fireBox.position.set(-0.01, 0.35, 0);
  fpGroup.add(fireBox);

  // Mantel shelf
  const mantel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 1.4), mantelMat);
  mantel.position.y = 1.25;
  mantel.castShadow = true;
  fpGroup.add(mantel);

  scene.add(fpGroup);

  // Fire light (orange glow)
  fireLight = new THREE.PointLight(0xff6622, 0.8, 3);
  fireLight.position.set(4.2, 0.4, -2.5);
  scene.add(fireLight);

  // Flame (simple orange plane)
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xff8833, transparent: true, opacity: 0.7 });
  const flame = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), flameMat);
  flame.rotation.y = -Math.PI / 2;
  flame.position.set(4.28, 0.35, -2.5);
  flame.name = 'flame';
  scene.add(flame);
}

// ==================== PENDANT LIGHTS ====================
function buildPendantLights() {
  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0xD4A850,
    roughness: 0.5,
    side: THREE.DoubleSide
  });

  const positions = [-2, 0, 2];
  positions.forEach((x, i) => {
    // Cord
    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.7, 6),
      new THREE.MeshBasicMaterial({ color: 0x222222 })
    );
    cord.position.set(x, 3.65, -1.5);
    scene.add(cord);

    // Shade (cone)
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.2, 16, 1, true), shadeMat);
    shade.position.set(x, 3.25, -1.5);
    shade.castShadow = true;
    scene.add(shade);

    // Light bulb glow
    const bulb = new THREE.PointLight(0xffc880, 0.7, 6, 1.5);
    bulb.position.set(x, 3.1, -1.5);
    bulb.castShadow = true;
    bulb.shadow.mapSize.width = 512;
    bulb.shadow.mapSize.height = 512;
    scene.add(bulb);
    pendantLights.push(bulb);
  });
}

// ==================== CHARACTERS ====================
function buildCharacters() {
  CHAR_CONFIG.forEach((cfg) => {
    const charGroup = new THREE.Group();
    charGroup.position.set(cfg.x, 0.45, -2.55);

    // Body (capsule-ish)
    const bodyMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.25, 4, 8), bodyMat);
    body.position.y = 0.2;
    body.castShadow = true;
    charGroup.add(body);

    // Head
    const headMat = new THREE.MeshStandardMaterial({ color: 0xE8C4A0, roughness: 0.7 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), headMat);
    head.position.y = 0.52;
    head.castShadow = true;
    charGroup.add(head);

    charGroup.userData.characterId = cfg.id;
    charGroup.userData.color = cfg.color;
    scene.add(charGroup);
    characterMeshes.push(charGroup);
  });
}

// ==================== EXTRA FURNITURE ====================
function buildExtraFurniture() {
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x6B4226, roughness: 0.6 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xB83A2A, roughness: 0.8 });

  // Red bench (right side)
  const benchGroup = new THREE.Group();
  benchGroup.position.set(2.8, 0, -1.2);

  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.4), redMat);
  benchSeat.position.y = 0.42;
  benchSeat.castShadow = true;
  benchGroup.add(benchSeat);

  const benchBack = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.35, 0.06), redMat);
  benchBack.position.set(0, 0.6, -0.18);
  benchBack.castShadow = true;
  benchGroup.add(benchBack);

  // Legs
  for (let i = 0; i < 4; i++) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8), woodMat);
    leg.position.set(i < 2 ? -0.4 : 0.4, 0.2, i % 2 === 0 ? -0.15 : 0.15);
    benchGroup.add(leg);
  }
  scene.add(benchGroup);

  // Guitar (corner)
  const guitarMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.5 });
  const guitar = new THREE.Group();
  guitar.position.set(4.3, 0, -3.5);
  guitar.rotation.z = 0.15;

  const guitarBody = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), guitarMat);
  guitarBody.scale.set(1, 1.3, 0.3);
  guitarBody.position.y = 0.25;
  guitar.add(guitarBody);

  const guitarNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.4, 8), guitarMat);
  guitarNeck.position.y = 0.65;
  guitar.add(guitarNeck);
  scene.add(guitar);

  // Small round tables (left side)
  for (let i = 0; i < 2; i++) {
    const smallTable = new THREE.Group();
    smallTable.position.set(-2.5, 0, 0.5 + i * 1.2);

    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.03, 16), woodMat);
    st.position.y = 0.7;
    st.castShadow = true;
    smallTable.add(st);

    const stLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 8), woodMat);
    stLeg.position.y = 0.35;
    smallTable.add(stLeg);

    scene.add(smallTable);
  }
}

// ==================== LIGHTING ====================
function setupLighting() {
  // Ambient (warm)
  const ambient = new THREE.AmbientLight(0xffd9a0, 0.35);
  scene.add(ambient);

  // Soft directional fill from front
  const fillLight = new THREE.DirectionalLight(0xffeedd, 0.15);
  fillLight.position.set(0, 3, 6);
  scene.add(fillLight);
}

// ==================== TIME OF DAY ====================
const timeConfigs = [
  { ambient: 0.35, pendant: 0.7, fire: 0.8, fog: 0x2a1f14, bg: 0x2a1f14 },
  { ambient: 0.2,  pendant: 1.0, fire: 1.0, fog: 0x1a1008, bg: 0x1a1008 },
  { ambient: 0.1,  pendant: 1.2, fire: 1.2, fog: 0x0a0604, bg: 0x0a0604 },
];

function cycleTime() {
  timeOfDay = (timeOfDay + 1) % 3;
  const cfg = timeConfigs[timeOfDay];

  scene.fog.color.setHex(cfg.fog);
  scene.background.setHex(cfg.bg);

  pendantLights.forEach(l => l.intensity = cfg.pendant);
  if (fireLight) fireLight.intensity = cfg.fire;

  document.getElementById('time-toggle').textContent =
    timeOfDay === 0 ? '☀️' : timeOfDay === 1 ? '🌅' : '🌙';
}

// ==================== BUBBLE PROJECTION ====================
const bubbleEls = {};

function createBubbleEls() {
  CHAR_CONFIG.forEach(cfg => {
    const el = document.createElement('div');
    el.className = 'speech-bubble';
    el.innerHTML = `<span class="char-tag" style="background:${cfg.color}">${cfg.id}</span><div class="bubble-text"></div>`;
    el.addEventListener('click', () => showBig(cfg.id));
    bubbleLayer.appendChild(el);
    bubbleEls[cfg.id] = el;
  });
}

function updateBubblePositions() {
  characterMeshes.forEach(charMesh => {
    const id = charMesh.userData.characterId;
    const el = bubbleEls[id];
    if (!el) return;

    // Project head position to screen
    const worldPos = new THREE.Vector3();
    charMesh.children[1].getWorldPosition(worldPos); // head
    worldPos.y += 0.2; // offset above head

    const screenPos = worldPos.clone().project(camera);
    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;

    el.style.left = x + 'px';
    el.style.top = y + 'px';
  });
}

// ==================== BUBBLE CAROUSEL ====================
function linesFor(char) {
  return allLines.filter(l => l.character.toLowerCase() === char);
}

function startBubbleCarousel() {
  const chars = CHAR_CONFIG.map(c => c.id);
  let i = 0;

  function next() {
    if (isBubblePaused) return;

    Object.values(bubbleEls).forEach(el => el.classList.remove('active'));

    const c = chars[i];
    const ls = linesFor(c);
    if (ls.length) {
      const q = ls[Math.floor(Math.random() * ls.length)];
      const el = bubbleEls[c];
      if (el) {
        el.querySelector('.bubble-text').textContent = `"${q.text}"`;
        el.classList.add('active');
      }
    }
    i = (i + 1) % chars.length;
    setTimeout(next, 3500);
  }
  setTimeout(next, 1200);
}

// ==================== BIG QUOTE ====================
const bigQuote = document.getElementById('big-quote');

function showBig(char) {
  const ls = linesFor(char);
  if (!ls.length) return;
  const q = ls[Math.floor(Math.random() * ls.length)];
  isBubblePaused = true;

  Object.values(bubbleEls).forEach(el => el.classList.remove('active'));

  const cfg = CHAR_CONFIG.find(c => c.id === char);
  bigQuote.querySelector('.bq-char').style.background = cfg ? cfg.color : '#5C3D2E';
  bigQuote.querySelector('.bq-char').textContent = char;
  bigQuote.querySelector('.bq-text').textContent = `"${q.text}"`;
  bigQuote.classList.remove('hidden');
}

function closeBig() {
  bigQuote.classList.add('hidden');
  isBubblePaused = false;
}

// ==================== SEARCH ====================
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const searchEmpty = document.getElementById('search-empty');
const resultsCount = document.getElementById('results-count');
const seasonFilter = document.getElementById('season-filter');
const episodeFilter = document.getElementById('episode-filter');

function handleSearch() {
  const q = searchInput.value.trim().toLowerCase();
  const s = seasonFilter.value;
  const e = episodeFilter.value;
  let r = allLines;

  if (q) r = r.filter(l =>
    l.text.toLowerCase().includes(q) ||
    (l.context_before || []).some(c => c.toLowerCase().includes(q)) ||
    (l.context_after || []).some(c => c.toLowerCase().includes(q))
  );
  if (s) r = r.filter(l => l.season === parseInt(s));
  if (e) r = r.filter(l => l.episode === parseInt(e));

  renderResults(r, !!q || !!s || !!e);
}

function renderResults(r, hasQ) {
  if (!hasQ) {
    searchResults.innerHTML = '';
    searchEmpty.classList.add('hidden');
    resultsCount.classList.add('hidden');
    return;
  }
  if (!r.length) {
    searchResults.innerHTML = '';
    searchEmpty.classList.remove('hidden');
    resultsCount.classList.add('hidden');
    return;
  }
  searchEmpty.classList.add('hidden');
  resultsCount.classList.remove('hidden');
  resultsCount.textContent = `找到 ${r.length} 条`;

  const cols = { ross: '#4A90D9', rachel: '#E8739A', monica: '#F5A623', chandler: '#8E6FD4', joey: '#E85D5D', phoebe: '#5EBF8D' };
  searchResults.innerHTML = r.map(l => `
    <div class="result-card">
      <div class="meta">
        S${l.season}E${String(l.episode).padStart(2, '0')}
        <span class="char-badge" style="background:${cols[l.character.toLowerCase()] || '#5C3D2E'}">${l.character}</span>
      </div>
      <div class="text">${l.text}</div>
    </div>
  `).join('');
}

// ==================== VOCAB ====================
const vocabOverlay = document.getElementById('vocab-overlay');
const vocabList = document.getElementById('vocab-list');

function loadVocab() {
  try {
    const s = localStorage.getItem('friends_vocab');
    if (s) vocabWords = new Set(JSON.parse(s));
  } catch (e) { vocabWords = new Set(); }
}

function saveVocab() {
  localStorage.setItem('friends_vocab', JSON.stringify([...vocabWords]));
}

function renderVocab() {
  if (!vocabWords.size) {
    vocabList.innerHTML = '<p style="text-align:center;color:#aaa;padding:24px 0">还没有添加生词</p>';
  } else {
    vocabList.innerHTML = [...vocabWords].sort().map(w => `
      <div class="vocab-item">
        <span>${w}</span>
        <button data-word="${w}">×</button>
      </div>
    `).join('');
    vocabList.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        vocabWords.delete(b.dataset.word);
        saveVocab();
        renderVocab();
      });
    });
  }
}

// ==================== UTILS ====================
function debounce(f, d) {
  let t;
  return function (...a) { clearTimeout(t); t = setTimeout(() => f.apply(this, a), d); };
}

function flash(msg) {
  const el = document.querySelector('.flash-msg');
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ==================== ANIMATE ====================
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Flame flicker
  const flame = scene.getObjectByName('flame');
  if (flame) {
    flame.material.opacity = 0.5 + Math.random() * 0.3;
    flame.scale.y = 0.9 + Math.random() * 0.2;
  }
  if (fireLight) {
    fireLight.intensity = 0.7 + Math.random() * 0.3;
  }

  updateBubblePositions();
  renderer.render(scene, camera);
}

// ==================== DATA ====================
async function loadData() {
  try {
    const r = await fetch('data/friends_lines.json');
    allLines = await r.json();
    console.log(`Loaded ${allLines.length} lines`);
  } catch (e) {
    console.error('Failed to load lines:', e);
    allLines = [];
  }
}

// ==================== INIT ====================
async function init() {
  await loadData();
  loadVocab();
  createBubbleEls();

  // Hot searches
  const hotSearches = document.getElementById('hot-searches');
  const qs = ['we were on a break', 'how you doin', 'pivot', 'smelly cat', 'unagi'];
  hotSearches.innerHTML = qs.map(q => `<button class="hot-tag" data-query="${q}">${q}</button>`).join('');
  hotSearches.querySelectorAll('.hot-tag').forEach(b => {
    b.addEventListener('click', () => {
      searchInput.value = b.dataset.query;
      handleSearch();
    });
  });

  // Season filter
  [...new Set(allLines.map(l => l.season))].sort((a, b) => a - b).forEach(s => {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = `第 ${s} 季`;
    seasonFilter.appendChild(o);
  });

  seasonFilter.addEventListener('change', () => {
    episodeFilter.innerHTML = '<option value="">全部集</option>';
    const s = seasonFilter.value;
    if (s) {
      [...new Set(allLines.filter(l => l.season === parseInt(s)).map(l => l.episode))]
        .sort((a, b) => a - b)
        .forEach(e => {
          const o = document.createElement('option');
          o.value = e;
          o.textContent = `第 ${e} 集`;
          episodeFilter.appendChild(o);
        });
    }
    handleSearch();
  });
  episodeFilter.addEventListener('change', handleSearch);

  // Bind events
  document.getElementById('time-toggle').addEventListener('click', cycleTime);
  document.getElementById('search-btn').addEventListener('click', () => {
    searchOverlay.classList.remove('hidden');
    document.getElementById('panel-overlay').classList.remove('hidden');
    searchInput.focus();
  });
  document.getElementById('search-close').addEventListener('click', () => {
    searchOverlay.classList.add('hidden');
    document.getElementById('panel-overlay').classList.add('hidden');
  });
  document.getElementById('vocab-btn').addEventListener('click', () => {
    vocabOverlay.classList.remove('hidden');
    document.getElementById('panel-overlay').classList.remove('hidden');
    renderVocab();
  });
  document.getElementById('vocab-close').addEventListener('click', () => {
    vocabOverlay.classList.add('hidden');
    document.getElementById('panel-overlay').classList.add('hidden');
  });
  document.getElementById('vocab-clear').addEventListener('click', () => {
    if (!confirm('清空全部生词？')) return;
    vocabWords.clear();
    saveVocab();
    renderVocab();
  });
  document.getElementById('big-quote-close').addEventListener('click', closeBig);
  bigQuote.addEventListener('click', e => { if (e.target === bigQuote) closeBig(); });
  document.getElementById('panel-overlay').addEventListener('click', () => {
    searchOverlay.classList.add('hidden');
    vocabOverlay.classList.add('hidden');
    document.getElementById('panel-overlay').classList.add('hidden');
  });
  searchInput.addEventListener('input', debounce(handleSearch, 250));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeBig(); searchOverlay.classList.add('hidden'); vocabOverlay.classList.add('hidden'); document.getElementById('panel-overlay').classList.add('hidden'); } });

  // Start 3D
  initThree();
  startBubbleCarousel();
}

init();
