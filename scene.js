/* =================================================================
   Central Perk · 3D Diorama — Complete Scene
   Three.js ES Module · All geometry procedural
   ================================================================= */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
const C = {
  W:26, D:20, H:13, wallT:0.7,
  sofa:{w:9.5,h:3.4,d:3.0},
  color:{caramel:0xC97B3C,caramelD:0xA85F28,sofa:0xC05A28,sofa2:0xD4722A,
    deepRed:0x8C3A2B,brick:0x9E4A38,brickD:0x7A3020,deepGreen:0x3E5C4B,
    greenTrim:0x4A7C59,walnut:0x4A3020,walnutL:0x6B4A30,
    cream:0xE8D8B8,creamD:0xD4C09A,woodFloor:0x3A2418,tile:0xC8B49A,
    brass:0xB08D4F,metal:0x2A2A2A,glass:0x9FB8C8,rugRed:0x5A2E1E,rugCream:0xC9A882
  },
  cam:{fov:42,near:0.1,far:400,start:[0,10.5,14],tgt:[0,2.2,0],ms:900},
  light:{ambient:0.45,hemi:0.40,key:2.8,keyRange:50,window:0.65,windowFill:0.50,stage:2.2,bar:3.0},
  render:{maxPR:2,exposure:1.25,fogN:42,fogF:128}
};

// ═══════════════════════════════════════════════════════════════
// RENDERER + SCENE + CAMERA + CONTROLS
// ═══════════════════════════════════════════════════════════════
const renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,C.render.maxPR));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = C.render.exposure;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x120b07);
scene.fog = new THREE.Fog(0x120b07,C.render.fogN,C.render.fogF);

const camera = new THREE.PerspectiveCamera(C.cam.fov,innerWidth/innerHeight,C.cam.near,C.cam.far);
camera.position.set(...C.cam.start);

const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(...C.cam.tgt);
controls.enableDamping = true; controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.7; controls.zoomSpeed = 0.9; controls.panSpeed = 0.7;
controls.screenSpacePanning = true;
controls.minDistance = 8; controls.maxDistance = 90;
controls.maxPolarAngle = Math.PI*0.495; controls.minPolarAngle = 0.08;
controls.autoRotateSpeed = 0.6; controls.update();

// ═══════════════════════════════════════════════════════════════
// LIGHTS
// ═══════════════════════════════════════════════════════════════
const L = {
  ambient: new THREE.AmbientLight(0xFFF0E0, C.light.ambient),
  hemi: new THREE.HemisphereLight(0xFFE0B0, 0x2A1810, C.light.hemi),
  window: new THREE.DirectionalLight(0xB0C8D8, C.light.window),
  key: new THREE.PointLight(0xFFC070, C.light.key, C.light.keyRange, 1.6),
  windowFill: new THREE.DirectionalLight(0x8CB8CC, C.light.windowFill),
  stage: new THREE.PointLight(0xFFC070, C.light.stage, 30, 1.5),
};
L.hemi.position.set(0, C.H, 0);

// Window light — from outside upper-left, angled down across whole room
L.window.position.set(-18, 12, 20); L.window.castShadow = true;
L.window.shadow.mapSize.set(2048, 2048);
L.window.shadow.camera.near = 1; L.window.shadow.camera.far = 80;
L.window.shadow.camera.left = -18; L.window.shadow.camera.right = 18;
L.window.shadow.camera.top = 16; L.window.shadow.camera.bottom = -16;
L.window.shadow.bias = -0.0004;

// Key light — warm point above coffee table, lights the sofa + characters
L.key.position.set(0, 4.5, 2.5); L.key.castShadow = true;
L.key.shadow.mapSize.set(1024, 1024);
L.key.shadow.camera.near = 0.3; L.key.shadow.camera.far = 35;
L.key.shadow.bias = -0.0006;

// Window fill — cool directional from back wall through windows
L.windowFill.position.set(0, 6, -C.D/2 - C.wallT/2 - 2);
L.windowFill.target.position.set(0, 2, 0);
scene.add(L.windowFill.target);

// Stage light — warm point near the mic / bench area
L.stage.position.set(C.W/2 - 1, 3.5, -1.5); L.stage.castShadow = true;
L.stage.shadow.mapSize.set(512, 512);
L.stage.shadow.camera.near = 0.2; L.stage.shadow.camera.far = 25;
L.stage.shadow.bias = -0.0006;

Object.values(L).forEach(l => { if (l && l.isLight) scene.add(l); });

// ═══════════════════════════════════════════════════════════════
// WORLD ROOT
// ═══════════════════════════════════════════════════════════════
const world = new THREE.Group(); scene.add(world);

// ═══════════════════════════════════════════════════════════════
// MATERIAL CACHE — distinct families per surface role
// ═══════════════════════════════════════════════════════════════
const M = {};
function mat(color,rough=0.55,metal=0.0){
  let k=`${color}_${rough}_${metal}`;if(!M[k])M[k]=new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});return M[k];
}
// Semantic shortcuts
function matWood(color=0x4A3020){return mat(color,0.60,0.0)}       // timber: medium-rough, no metal
function matPainted(color=0xE8D8B8){return mat(color,0.72,0.0)}    // painted wall: slightly rougher
function matFabric(color=0xC05A28){return mat(color,0.92,0.0)}     // upholstery: soft coarse fabric
function matGlazed(color=0xE8E0D0){return mat(color,0.22,0.06)}    // ceramic: smooth glossy, slight spec
function matMetal(color=0x2A2A2A){return mat(color,0.20,0.85)}     // bare metal: shiny, high metalness

// ═══════════════════════════════════════════════════════════════
// PROCEDURAL TEXTURES (Canvas based)
// ═══════════════════════════════════════════════════════════════
function createBrickTexture(w=512,h=256){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#5A3428';ctx.fillRect(0,0,w,h); // darker, less saturated base
  const rowH=h/6, brickW=w/8;
  for(let r=0;r<6;r++){const ox=(r%2)*brickW/2;for(let b=-1;b<9;b++){
    const v=90+r*5; // darker range 90-120
    ctx.fillStyle=`rgb(${v+10},${v-25},${v-38})`;
    ctx.fillRect(ox+b*brickW+2,r*rowH+2,brickW-4,rowH-4);
    ctx.strokeStyle='rgba(0,0,0,0.18)';ctx.lineWidth=0.8;
    ctx.strokeRect(ox+b*brickW+2,r*rowH+2,brickW-4,rowH-4);
  }}
  const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}
function createWoodTexture(w=256,h=256){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#4A3020';ctx.fillRect(0,0,w,h);
  for(let y=0;y<h;y+=14){
    ctx.strokeStyle=`rgba(60,30,15,${0.09+Math.random()*0.1})`;ctx.lineWidth=1.5+Math.random()*2;
    ctx.beginPath();ctx.moveTo(0,y+Math.random()*6);for(let x=0;x<w;x+=20)ctx.lineTo(x,y+Math.random()*5);ctx.stroke();
  }
  const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}
function createRugTexture(w=512,h=384){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const ctx=c.getContext('2d');
  // Deep red base
  ctx.fillStyle='#5A2E1E';ctx.fillRect(0,0,w,h);
  // Cream inner rectangle
  ctx.fillStyle='#D4B896';ctx.fillRect(40,30,w-80,h-60);
  // Outer border — dark green
  ctx.strokeStyle='#3E5C4B';ctx.lineWidth=8;ctx.strokeRect(14,14,w-28,h-28);
  // Inner gold line
  ctx.strokeStyle='#C9A060';ctx.lineWidth=3;ctx.strokeRect(44,34,w-88,h-68);
  // Scattered subtle speckles for texture
  for(let i=0;i<80;i++){
    ctx.fillStyle=`rgba(201,168,130,${0.03+Math.random()*0.07})`;
    ctx.beginPath();ctx.arc(50+Math.random()*(w-100),40+Math.random()*(h-80),6+Math.random()*14,0,Math.PI*2);ctx.fill();
  }
  const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}
function createSignTexture(){
  const c=document.createElement('canvas');c.width=1024;c.height=256;
  const ctx=c.getContext('2d');

  // Dark wood panel background
  ctx.fillStyle='#2A1808';ctx.fillRect(0,0,1024,256);

  // Inner cream panel
  ctx.fillStyle='#F5ECD7';ctx.fillRect(24,24,976,208);
  ctx.strokeStyle='#C9A060';ctx.lineWidth=6;ctx.strokeRect(26,26,972,204);

  // Main text: CENTRAL
  ctx.fillStyle='#E8863A';ctx.font='bold 72px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('CENTRAL',512,74);
  // Subtle outline for depth
  ctx.strokeStyle='#5A2E1E';ctx.lineWidth=2;ctx.strokeText('CENTRAL',512,74);

  // Secondary text: PERK
  ctx.fillStyle='#E8863A';ctx.font='bold 72px Georgia';
  ctx.fillText('PERK',512,162);
  ctx.strokeStyle='#5A2E1E';ctx.lineWidth=2;ctx.strokeText('PERK',512,162);

  // Bottom accent: a thin green line
  ctx.strokeStyle='#4A7C59';ctx.lineWidth=4;ctx.beginPath();
  ctx.moveTo(140,190);ctx.lineTo(884,190);ctx.stroke();

  // Small decorative coffee cup between words — use a simple circle+arc instead of emoji
  ctx.fillStyle='#C97B3C';ctx.beginPath();ctx.arc(512,118,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#F5ECD7';ctx.beginPath();ctx.arc(512,118,5,0,Math.PI*2);ctx.fill();

  const tex=new THREE.CanvasTexture(c);tex.wrapS=THREE.ClampToEdgeWrapping;tex.wrapT=THREE.ClampToEdgeWrapping;tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}
function createMenuTexture(){
  const c=document.createElement('canvas');c.width=256;c.height=320;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#E8D8B8';ctx.fillRect(0,0,256,320);
  ctx.fillStyle='#3E2723';ctx.fillRect(8,8,240,304);
  ctx.fillStyle='#E8D8B8';ctx.fillRect(14,14,228,292);
  ctx.fillStyle='#3E2723';ctx.font='bold 20pt Georgia';ctx.textAlign='center';ctx.fillText('MENU',128,48);
  ctx.font='14pt Georgia';['Espresso','Latte','Cappuccino','Mocha','Americano','Hot Cocoa','Croissant','Muffin'].forEach((t,i)=>ctx.fillText(t,64,80+i*26));
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}
function createArtTexture(){
  const c=document.createElement('canvas');c.width=200;c.height=160;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,160);g.addColorStop(0,'#87CEEB');g.addColorStop(0.5,'#B0C4DE');g.addColorStop(1,'#6B8E23');
  ctx.fillStyle=g;ctx.fillRect(0,0,200,160);
  ctx.fillStyle='#333';ctx.fillRect(60,70,80,40);ctx.beginPath();ctx.arc(100,90,14,0,Math.PI*2);ctx.fillStyle='#222';ctx.fill();
  ctx.beginPath();ctx.arc(70,90,14,0,Math.PI*2);ctx.fill();ctx.fillStyle='#444';ctx.fillRect(65,86,70,3);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}

/* ── Textured materials ─── */
const matBrick = new THREE.MeshStandardMaterial({map:createBrickTexture(),roughness:0.92});
const matBrickFire = new THREE.MeshStandardMaterial({map:createBrickTexture(),roughness:0.85,color:new THREE.Color(1.1,0.9,0.8)});
const matRug = new THREE.MeshStandardMaterial({map:createRugTexture(),roughness:0.95});
const matSignTex = createSignTexture();
const matSignFace = new THREE.MeshStandardMaterial({map:matSignTex,roughness:0.45});
const matNeon = new THREE.MeshStandardMaterial({map:createSignTexture(),roughness:0.5,emissive:0xFFB347,emissiveIntensity:0.7}); // kept for backward compat
const matMenu = new THREE.MeshStandardMaterial({map:createMenuTexture(),roughness:0.6});

// ═══════════════════════════════════════════════════════════════
// HELPERS: rounded box
// ═══════════════════════════════════════════════════════════════
function roundedBox(w,h,d,r=0.3,s=5){
  const geo=new THREE.BoxGeometry(w-2*r,h-2*r,d-2*r,s,s,s);
  const p=geo.attributes.position;const n=[];
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
    const sx=Math.sign(x)*(w/2-r),sy=Math.sign(y)*(h/2-r),sz=Math.sign(z)*(d/2-r);
    n.push(sx+Math.sign(x)*r*Math.tanh(x/(w/2-r+0.01)),sy+Math.sign(y)*r*Math.tanh(y/(h/2-r+0.01)),sz+Math.sign(z)*r*Math.tanh(z/(d/2-r+0.01)));
  }
  geo.setAttribute('position',new THREE.Float32BufferAttribute(n,3));geo.computeVertexNormals();
  return geo;
}

// ═══════════════════════════════════════════════════════════════
// BUILDING SHELL (T4)
// ═══════════════════════════════════════════════════════════════
function buildShell(){
  const g=new THREE.Group();g.name='shell';
  const hW=C.W/2+0.5,hD=C.D/2+0.5;

  // Floor — wood planks
  const floorGeo=new THREE.PlaneGeometry(C.W,C.D);
  const floorTex=createWoodTexture();floorTex.repeat.set(4,3);
  floorTex.rotation = Math.PI/2; // align grain along room length (X axis)
  const floorMat=new THREE.MeshStandardMaterial({map:floorTex,roughness:0.8});
  const floor=new THREE.Mesh(floorGeo,floorMat);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;g.add(floor);

  // Tile area (near bar, left-front)
  const tileGeo=new THREE.PlaneGeometry(7,5);
  const tileMat=new THREE.MeshStandardMaterial({color:0xC8B49A,roughness:0.55});
  const tile=new THREE.Mesh(tileGeo,tileMat);tile.rotation.x=-Math.PI/2;tile.position.set(-C.W/2+3.5,0.01,4);tile.receiveShadow=true;g.add(tile);

  // Threshold strip between wood floor and tile
  const thresholdGeo=new THREE.BoxGeometry(7,0.04,0.15);
  const threshold=new THREE.Mesh(thresholdGeo,matWood(0x3E2723));threshold.position.set(-C.W/2+3.5,0.02,1.5);threshold.receiveShadow=true;g.add(threshold);

  // Back wall (cream — painted)
  const bwGeo=new THREE.BoxGeometry(C.W+2*C.wallT,C.H,C.wallT);
  const bw=new THREE.Mesh(bwGeo,matPainted(0xE8D8B8));bw.position.set(0,C.H/2,-C.D/2-C.wallT/2);bw.castShadow=true;bw.receiveShadow=true;g.add(bw);

  // Left wall
  const lwGeo=new THREE.BoxGeometry(C.wallT,C.H,C.D+2*C.wallT);
  const lw=new THREE.Mesh(lwGeo,matPainted(0xE8D8B8));lw.position.set(-C.W/2-C.wallT/2,C.H/2,0);lw.receiveShadow=true;g.add(lw);

  // Right wall — cream painted (same as left), brick only as accent panel
  const rwGeo=new THREE.BoxGeometry(C.wallT,C.H,C.D+2*C.wallT);
  const rw=new THREE.Mesh(rwGeo,matPainted(0xE8D8B8));rw.position.set(C.W/2+C.wallT/2,C.H/2,0);rw.receiveShadow=true;g.add(rw);

  // Brick accent panel — right rear, 5 wide × 8 tall, inset into wall
  const brickPanelGeo=new THREE.PlaneGeometry(5,8);
  const brickPanel=new THREE.Mesh(brickPanelGeo,matBrick);
  brickPanel.rotation.y=Math.PI/2;
  brickPanel.position.set(C.W/2+C.wallT/2+0.01, 4.5, -3); // centered rear-right
  brickPanel.receiveShadow=true; g.add(brickPanel);

  // Right wall lower decorative panel (wood) — removed; brick accent panel replaces it

  // Green trim at top of walls
  const trimH=0.25;
  const trimGeoB=new THREE.BoxGeometry(C.W+2*C.wallT,trimH,0.2);
  const trimB=new THREE.Mesh(trimGeoB,mat(0x4A7C59,0.7));trimB.position.set(0,C.H-trimH/2,-C.D/2-C.wallT/2-0.1);g.add(trimB);
  const trimGeoL=new THREE.BoxGeometry(0.2,trimH,C.D);
  const trimL=new THREE.Mesh(trimGeoL,mat(0x4A7C59,0.7));trimL.position.set(-C.W/2-C.wallT/2-0.1,C.H-trimH/2,0);g.add(trimL);
  const trimGeoR=new THREE.BoxGeometry(0.2,trimH,C.D);
  const trimR=new THREE.Mesh(trimGeoR,mat(0x4A7C59,0.7));trimR.position.set(C.W/2+C.wallT/2+0.1,C.H-trimH/2,0);g.add(trimR);

  world.add(g);return g;
}

// ═══════════════════════════════════════════════════════════════
// FURNITURE BUILDERS
// ═══════════════════════════════════════════════════════════════

/* ── Coffee cup ─── */
function coffeeCup(x,y,z,s=1){
  const g=new THREE.Group();
  const bodyGeo=new THREE.CylinderGeometry(0.18*s,0.16*s,0.5*s,16);bodyGeo.translate(0,0.25*s,0);
  const body=new THREE.Mesh(bodyGeo,matGlazed(0xF3E6D2));g.add(body);
  const handleGeo=new THREE.TorusGeometry(0.1*s,0.04*s,8,8,Math.PI*0.7);handleGeo.rotateZ(Math.PI*0.4);
  const handle=new THREE.Mesh(handleGeo,matGlazed(0xD8C0A0));handle.position.set(0.19*s,0.24*s,0);g.add(handle);
  const saucerGeo=new THREE.CylinderGeometry(0.22*s,0.22*s,0.06*s,16);
  const saucer=new THREE.Mesh(saucerGeo,matGlazed(0xE8E0D0));g.add(saucer);
  g.position.set(x,y,z);g.scale.set(s,s,s);g.castShadow=true;g.receiveShadow=true;
  return g;
}

/* ── Armchair ─── */
function armchair(color=0xC97B3C,x=0,y=0,z=0,ry=0){
  const g=new THREE.Group();
  const seatGeo=roundedBox(2,0.5,1.8,0.2);
  const seat=new THREE.Mesh(seatGeo,matFabric(color));seat.position.y=0.65;g.add(seat);
  const backGeo=roundedBox(2,1.6,0.4,0.2);
  const back=new THREE.Mesh(backGeo,matFabric(color));back.position.set(0,1.65,-0.7);g.add(back);
  const armGeoL=new THREE.BoxGeometry(0.28,0.7,1.5);
  const armL=new THREE.Mesh(armGeoL,matFabric(color));armL.position.set(-0.86,1,0);g.add(armL);
  const armGeoR=new THREE.BoxGeometry(0.28,0.7,1.5);
  const armR=new THREE.Mesh(armGeoR,matFabric(color));armR.position.set(0.86,1,0);g.add(armR);
  // legs
  const legGeo=new THREE.CylinderGeometry(0.12,0.12,0.45,8);
  [[-0.7,0.25,0.6],[0.7,0.25,0.6],[-0.7,0.25,-0.6],[0.7,0.25,-0.6]].forEach(([lx,ly,lz])=>{
    const leg=new THREE.Mesh(legGeo,matWood(0x3E2723));leg.position.set(lx,ly,lz);g.add(leg);
  });
  g.position.set(x,y,z);g.rotation.y=ry;g.castShadow=true;g.receiveShadow=true;
  return g;
}

/* ── Coffee table ─── */
function coffeeTable(x=0,y=0,z=0){
  const g=new THREE.Group();
  const topGeo=roundedBox(5,0.25,2.6,0.15,5);
  const top=new THREE.Mesh(topGeo,matWood(0x4A3020));top.position.y=1.3;g.add(top);
  const legGeo=new THREE.CylinderGeometry(0.14,0.14,1.2,8);
  [[-2.1,0.6,0.9],[2.1,0.6,0.9],[-2.1,0.6,-0.9],[2.1,0.6,-0.9]].forEach(([lx,ly,lz])=>{
    const leg=new THREE.Mesh(legGeo,matWood(0x3E2723));leg.position.set(lx,ly,lz);g.add(leg);
  });
  g.position.set(x,y,z);g.castShadow=true;g.receiveShadow=true;
  return g;
}

/* ── Rug ─── */
function rug(x,y,z,rx=0){
  const g=new THREE.Group();
  const geo=new THREE.PlaneGeometry(8,5);const rugM=new THREE.MeshStandardMaterial({map:createRugTexture(),roughness:0.95,side:THREE.DoubleSide});
  const m=new THREE.Mesh(geo,rugM);m.rotation.x=-Math.PI/2+rx;m.position.set(x,y,z);m.receiveShadow=true;g.add(m);
  return g;
}

/* ── Main orange sofa (Central Perk signature) ─── */
function orangeSofa(x=0,y=0,z=0,ry=0){
  const g=new THREE.Group();
  const W=C.sofa.w, H=C.sofa.h, D=C.sofa.d;
  const colorBody = 0xC55A20;  // caramel-orange, like the real CP sofa
  const colorSeat = 0xDA6A28;  // slightly lighter cushion
  const colorStitch = 0xA84A18; // darker stitch line

  // ── Base plinth (thick solid base under entire sofa) ──
  const baseGeo = roundedBox(W-0.3, 0.35, D-0.3, 0.12);
  const base = new THREE.Mesh(baseGeo, matFabric(colorBody));
  base.position.y = 0.18; base.castShadow = true; base.receiveShadow = true; g.add(base);

  // ── Low back rail (horizontal support connecting back to seat base) ──
  const railGeo = roundedBox(W-0.6, 0.22, 0.4, 0.08);
  const rail = new THREE.Mesh(railGeo, matFabric(colorBody));
  rail.position.set(0, 0.52, -D/2+0.35); g.add(rail);

  // ── Backrest (tall, substantial thickness, slight backward lean) ──
  const backGeo = roundedBox(W-0.5, 1.7, 0.55, 0.2, 6);
  const back = new THREE.Mesh(backGeo, matFabric(colorBody));
  back.position.set(0, 1.35, -D/2+0.3);
  back.rotation.x = -0.06; // subtle backward lean
  back.castShadow = true; back.receiveShadow = true; g.add(back);

  // ── Left armrest (thick, sculpted, rounded top) ──
  const armW = 0.55, armH = 0.9, armD = D-0.25;
  const armLGeo = roundedBox(armW, armH, armD, 0.18, 6);
  const armL = new THREE.Mesh(armLGeo, matFabric(colorBody));
  armL.position.set(-W/2+armW/2+0.1, 0.65, -0.05);
  armL.castShadow = true; armL.receiveShadow = true; g.add(armL);

  // ── Right armrest ──
  const armRGeo = roundedBox(armW, armH, armD, 0.18, 6);
  const armR = new THREE.Mesh(armRGeo, matFabric(colorBody));
  armR.position.set(W/2-armW/2-0.1, 0.65, -0.05);
  armR.castShadow = true; armR.receiveShadow = true; g.add(armR);

  // ── Seat base (shared platform the cushions sit on) ──
  const seatBaseGeo = roundedBox(W-1.6, 0.28, D-0.9, 0.08);
  const seatBase = new THREE.Mesh(seatBaseGeo, matFabric(colorBody));
  seatBase.position.y = 0.58; seatBase.castShadow = true; seatBase.receiveShadow = true; g.add(seatBase);

  // ── Three independent seat cushions (rounded, visible from all angles) ──
  const cushionW = (W-1.8)/3; // ~2.57 each
  const cushionH = 0.35;
  const cushionD = D-1.1; // ~1.9
  for(let i=-1;i<=1;i++){
    const cGeo = roundedBox(cushionW-0.08, cushionH, cushionD, 0.15, 6);
    const cushion = new THREE.Mesh(cGeo, matFabric(colorSeat));
    cushion.position.set(i*cushionW*0.98, 0.86, -0.05);
    cushion.castShadow = true; cushion.receiveShadow = true; g.add(cushion);

    // Stitch lines between cushions (vertical grooves on seat base)
    if(i<1){
      const stitchGeo = new THREE.BoxGeometry(0.03, 0.06, cushionD-0.2);
      const stitch = new THREE.Mesh(stitchGeo, mat(colorStitch, 0.9));
      stitch.position.set(i*cushionW*0.98 + cushionW/2, 0.73, -0.05); g.add(stitch);
    }
  }

  // ── Back cushion roll (one long pillow along the back) ──
  const backCushionGeo = roundedBox(W-1.6, 0.38, 0.45, 0.14);
  const backCushion = new THREE.Mesh(backCushionGeo, matFabric(colorSeat));
  backCushion.position.set(0, 1.05, -D/2+0.95); g.add(backCushion);

  // ── Settee legs (6 visible wooden legs — 4 front corners + 2 rear center) ──
  const legGeo = new THREE.CylinderGeometry(0.13, 0.15, 0.5, 8);
  const legPositions = [
    [-W/2+0.5, 0, D/2-0.4], [W/2-0.5, 0, D/2-0.4],          // front-left, front-right
    [-W/2+2.8, 0, D/2-0.4], [W/2-2.8, 0, D/2-0.4],           // front-mid L/R
    [-W/2+0.5, 0, -D/2+0.4], [W/2-0.5, 0, -D/2+0.4],         // rear-left, rear-right
  ];
  legPositions.forEach(([lx,ly,lz])=>{
    const leg = new THREE.Mesh(legGeo, matWood(0x3E2723));
    leg.position.set(lx, ly+0.25, lz); leg.castShadow = true; g.add(leg);
  });

  g.position.set(x,y,z); g.rotation.y = ry;
  g.castShadow = true; g.receiveShadow = true;
  return g;
}

/* ── Round side table ─── */
function roundSideTable(x,y,z){
  const g=new THREE.Group();
  const topGeo=new THREE.CylinderGeometry(0.7,0.7,0.2,24);
  const top=new THREE.Mesh(topGeo,matWood(0x4A3020));top.position.y=1.0;g.add(top);
  const legGeo=new THREE.CylinderGeometry(0.08,0.1,0.85,12);
  const leg=new THREE.Mesh(legGeo,matWood(0x3E2723));leg.position.set(0,0.45,0);g.add(leg);
  const baseGeo=new THREE.CylinderGeometry(0.35,0.4,0.08,16);
  const base=new THREE.Mesh(baseGeo,matWood(0x3E2723));base.position.y=0.05;g.add(base);
  g.position.set(x,y,z);g.castShadow=true;g.receiveShadow=true;
  return g;
}

/* ── Pillow ─── */
function pillow(x,y,z,ry=0,color=0x8C3A2B){
  const g=new THREE.Group();
  const geo=roundedBox(1,0.2,0.8,0.1);
  const m=new THREE.Mesh(geo,matFabric(color));m.position.set(x,y,z);m.rotation.y=ry;m.castShadow=true;m.receiveShadow=true;g.add(m);
  return g;
}

// ═══════════════════════════════════════════════════════════════
// BUILD
// ═══════════════════════════════════════════════════════════════
buildShell();

// ── T5: Central seating (tight compact layout) ──
const mainSofa = orangeSofa(0,0,-1.0,0);
mainSofa.name = 'sofa';
mainSofa.userData = { interactive:true, infoTitle:'橙色沙发', infoDesc:'Central Perk 的灵魂所在。焦糖色灯芯绒面料包裹着又大又软的坐垫——三个独立靠垫，两边是厚实的圆形扶手。每个人都想坐这里。' };
world.add(mainSofa);

const tableCt = coffeeTable(0,0,2.5);
world.add(tableCt);

const rugCt = rug(0,0.005,0.8,0);
world.add(rugCt);
rugCt.children[0].scale.set(1.1,1,1.15);

const armchairL = armchair(0xC97B3C,-6.8,0,1.5,-0.35);
world.add(armchairL);

const armchairR = armchair(0x8C3A2B,6.8,0,1.5,0.35);
world.add(armchairR);

const sideTable = roundSideTable(6.0,0,-1.0);
world.add(sideTable);

// Pillows on sofa
world.add(pillow(-2.8, 1.28, -0.8, 0.1, 0x8C3A2B));
world.add(pillow(0, 1.28, -0.8, -0.05, 0x3E5C4B));
world.add(pillow(2.8, 1.28, -0.8, 0, 0xC97B3C));

// Coffee cups on table
const cup1 = coffeeCup(-1.2, 1.48, 2.1, 0.9);
world.add(cup1);
const cup2 = coffeeCup(1.4, 1.48, 2.5, 0.85);
world.add(cup2);

// ── T6: Left bar area (complete rebuild — true cafe counter) ──
function buildBar(){
  const g=new THREE.Group();g.name='bar';
  const barCX = -8.5, barCY = 0, barCZ = -1.5;  // bar center (compact layout)
  const barW = 9, barH = 3.6, barD = 2.2;        // total dimensions

  // ═══ BASE CABINETS (3 independent units with gaps for legs) ═══
  const cabinetW = (barW-1.4)/3; // ≈ 2.53 each
  const cabinetH = barH - 0.6;   // 3.0
  const cabinetD = barD - 0.3;   // 1.9
  for(let i=-1;i<=1;i++){
    const cbGeo = roundedBox(cabinetW-0.15, cabinetH-0.1, cabinetD-0.1, 0.1);
    const cb = new THREE.Mesh(cbGeo, matWood(0x4A3020));
    cb.position.set(barCX + i*(cabinetW+0.25), cabinetH/2, barCZ-0.05);
    cb.castShadow = true; cb.receiveShadow = true;
    g.add(cb);

    // Cabinet door line (vertical split)
    const doorLineGeo = new THREE.BoxGeometry(0.03, cabinetH-0.5, cabinetD-0.4);
    const doorLine = new THREE.Mesh(doorLineGeo, mat(0x3E2723, 0.7));
    doorLine.position.set(barCX + i*(cabinetW+0.25), cabinetH/2, barCZ-0.08); g.add(doorLine);

    // Small handle knob
    const knobGeo = new THREE.SphereGeometry(0.06, 6, 4);
    const knob = new THREE.Mesh(knobGeo, matMetal(0xB08D4F));
    knob.position.set(barCX + i*(cabinetW+0.25) + 0.2, cabinetH/2+0.1, barCZ-cabinetD/2+0.05); g.add(knob);
  }

  // Bottom kick plate (recessed base)
  const kickGeo = new THREE.BoxGeometry(barW-0.4, 0.15, barD-0.6);
  const kick = new THREE.Mesh(kickGeo, matWood(0x3E2723));
  kick.position.set(barCX, 0.08, barCZ); g.add(kick);

  // ═══ COUNTER TOP (thick solid slab with front overhang) ═══
  const topGeo = roundedBox(barW+0.3, 0.25, barD+0.3, 0.1, 6);
  const top = new THREE.Mesh(topGeo, matWood(0x6B4A30));
  top.position.set(barCX, barH+0.12, barCZ-0.1); top.receiveShadow = true; g.add(top);

  // Front lip (decorative edge under counter top)
  const lipGeo = new THREE.BoxGeometry(barW+0.1, 0.12, 0.08);
  const lip = new THREE.Mesh(lipGeo, matWood(0x3E2723));
  lip.position.set(barCX, barH-0.06, barCZ+barD/2+0.1); g.add(lip);

  // Side panels (left and right end caps)
  [[-1,0],[1,0]].forEach(([sx,sz])=>{
    const sideGeo = new THREE.BoxGeometry(0.2, barH, barD+0.3);
    const side = new THREE.Mesh(sideGeo, matWood(0x4A3020));
    side.position.set(barCX+sx*(barW/2+0.15), barH/2, barCZ-0.1);
    side.castShadow = true; g.add(side);
  });

  // ═══ REAR SHELVING UNIT (3 shelves with bracket supports) ═══
  const shelfW = barW-0.8, shelfD = 1.0;
  for(let i=0;i<3;i++){
    const shelfGeo = new THREE.BoxGeometry(shelfW, 0.08, shelfD);
    const shelf = new THREE.Mesh(shelfGeo, matWood(0x3E2723));
    shelf.position.set(barCX, barH+0.9+i*1.4, barCZ-barD/2-0.3);
    shelf.castShadow = true; g.add(shelf);

    // Bracket supports (small triangles → simplified as thin boxes)
    [[-1,0],[1,0]].forEach(([bx,bz])=>{
      const bracketGeo = new THREE.BoxGeometry(0.14, 0.1, shelfD-0.1);
      const bracket = new THREE.Mesh(bracketGeo, matMetal(0x2A2A2A));
      bracket.position.set(barCX+bx*(shelfW/2-0.2), barH+0.85+i*1.4, barCZ-barD/2-0.3);
      g.add(bracket);
    });
  }

  // ═══ COUNTER-TOP EQUIPMENT ═══
  // Espresso machine (detailed)
  const espGroup = new THREE.Group();
  const espBodyGeo = roundedBox(1.8, 1.1, 1.1, 0.1);
  const espBody = new THREE.Mesh(espBodyGeo, matMetal(0x2A2A2A));
  espBody.position.y = 0.55; espGroup.add(espBody);
  // Pressure gauge
  const gaugeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.06, 12);
  const gauge = new THREE.Mesh(gaugeGeo, matMetal(0xB08D4F));
  gauge.rotation.x = Math.PI/2; gauge.position.set(0, 0.95, 0.56); espGroup.add(gauge);
  // Group head
  const headGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.15, 8);
  const head = new THREE.Mesh(headGeo, matMetal(0x333333));
  head.position.set(0.5, 0.4, 0.6); espGroup.add(head);
  // Steam wand
  const wandGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.5, 6);
  const wand = new THREE.Mesh(wandGeo, matMetal(0x2A2A2A));
  wand.position.set(-0.5, 0.3, 0.58); wand.rotation.x = 0.3; espGroup.add(wand);
  // Drip tray
  const trayGeo = new THREE.BoxGeometry(0.8, 0.06, 0.5);
  const tray = new THREE.Mesh(trayGeo, matMetal(0x444444));
  tray.position.set(0.5, 0.04, 0.5); espGroup.add(tray);
  espGroup.position.set(barCX+1.5, barH+0.25, barCZ-0.2); g.add(espGroup);

  // Coffee grinder
  const grinderGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.6, 12);
  const grinder = new THREE.Mesh(grinderGeo, matMetal(0x444444));
  grinder.position.set(barCX-2.5, barH+0.25, barCZ+0.1); g.add(grinder);
  const hopperGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.25, 12);
  const hopper = new THREE.Mesh(hopperGeo, matGlazed(0xE8E0D0));
  hopper.position.set(barCX-2.5, barH+0.68, barCZ+0.1); g.add(hopper);

  // Cups on counter (3 cups on saucers)
  for(let c=0;c<3;c++){
    const cupG = coffeeCup(barCX-1+c*1.3, barH+0.25, barCZ+0.35, 0.55);
    g.add(cupG);
  }

  // Cake stand with dome
  const standGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.1, 16);
  const stand = new THREE.Mesh(standGeo, matMetal(0xB08D4F));
  stand.position.set(barCX+3.0, barH+0.25, barCZ+0.25); g.add(stand);
  const cakeGeo2 = new THREE.CylinderGeometry(0.4, 0.45, 0.35, 14);
  const cake2 = new THREE.Mesh(cakeGeo2, mat(0xE8739A, 0.7));
  cake2.position.set(barCX+3.0, barH+0.48, barCZ+0.25); g.add(cake2);
  const domeGeo = new THREE.SphereGeometry(0.45, 12, 6);
  const dome = new THREE.Mesh(domeGeo, new THREE.MeshStandardMaterial({color:0x9FB8C8, roughness:0.05, metalness:0.1, opacity:0.35, transparent:true}));
  dome.scale.set(1, 0.6, 1);
  dome.position.set(barCX+3.0, barH+0.7, barCZ+0.25); g.add(dome);

  // Menu board on rear wall above shelving
  const menuTex = createMenuTexture();
  const menuFrameGeo2 = new THREE.BoxGeometry(1.0, 1.5, 0.1);
  const menuFrame2 = new THREE.Mesh(menuFrameGeo2, matWood(0x3E2723));
  menuFrame2.position.set(barCX-2.5, barH+3.5, barCZ-barD/2-1.0); g.add(menuFrame2);
  const menuGeo2 = new THREE.PlaneGeometry(0.8, 1.3);
  const menuMat3 = new THREE.MeshStandardMaterial({map:menuTex, roughness:0.6});
  const menuPane = new THREE.Mesh(menuGeo2, menuMat3);
  menuPane.position.set(barCX-2.5, barH+3.5, barCZ-barD/2-0.94); g.add(menuPane);

  // ═══ SHELF ITEMS ═══
  // Jars, bottles, books on shelves
  const shelfY = [barH+0.9, barH+2.3, barH+3.7];
  shelfY.forEach((sy,si)=>{
    for(let j=0;j<5;j++){
      const itemGeo = new THREE.CylinderGeometry(0.1, 0.11, 0.35+Math.random()*0.4, 8);
      const itemColor = j%2===0 ? 0xF3E6D2 : (j%3===0 ? 0x4A7C59 : 0x8C3A2B);
      const item = new THREE.Mesh(itemGeo, matGlazed(itemColor));
      item.position.set(barCX-3.5+j*1.7, sy+0.2, barCZ-barD/2-0.25);
      item.castShadow = true; g.add(item);
    }
    // A couple of books on the bottom shelf
    if(si===0){
      for(let b=0;b<3;b++){
        const bookGeo = new THREE.BoxGeometry(0.3, 0.06, 0.8);
        const book = new THREE.Mesh(bookGeo, mat(b===0?0x8C3A2B:b===1?0x4A7C59:0x3E2723, 0.7));
        book.position.set(barCX-2+b*1, sy+0.05, barCZ-barD/2-0.2); g.add(book);
      }
      // One display book leaning against others
      const dBookGeo = new THREE.BoxGeometry(0.25, 0.55, 0.06);
      const dBook = new THREE.Mesh(dBookGeo, mat(0xE8739A, 0.7));
      dBook.position.set(barCX+1.5, sy+0.3, barCZ-barD/2+0.25);
      dBook.rotation.x = -0.25; dBook.rotation.y = -0.2; g.add(dBook);
    }
  });

  // ═══ BAR STOOLS (3 stools in front of counter, facing bar) ═══
  for(let s=0;s<3;s++){
    const stoolG = new THREE.Group();
    const seatGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.14, 16);
    const seatS = new THREE.Mesh(seatGeo, matWood(0x4A3020));
    seatS.position.y = 2.0; seatS.castShadow = true; stoolG.add(seatS);
    const poleGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.7, 8);
    const poleS = new THREE.Mesh(poleGeo, matMetal(0x2A2A2A));
    poleS.position.y = 1.05; stoolG.add(poleS);
    const baseGeo = new THREE.CylinderGeometry(0.3, 0.38, 0.06, 16);
    const baseS = new THREE.Mesh(baseGeo, matMetal(0x2A2A2A));
    baseS.position.y = 0.15; stoolG.add(baseS);
    // Foot ring
    const ringGeo = new THREE.TorusGeometry(0.25, 0.04, 8, 12);
    const ring = new THREE.Mesh(ringGeo, matMetal(0x444444));
    ring.rotation.x = Math.PI/2; ring.position.y = 1.0; stoolG.add(ring);
    stoolG.position.set(barCX-2+s*2.5, 0, barCZ+barD/2+0.8); g.add(stoolG);
  }

  // ═══ WARM SPOTLIGHT above bar ═══
  const barSpot = new THREE.SpotLight(0xFFE8C0, C.light.bar, 14, Math.PI/5.5, 0.35, 1.2);
  barSpot.position.set(barCX, barH+4.5, barCZ-0.5);
  barSpot.target.position.set(barCX, barH+0.2, barCZ);
  barSpot.castShadow = true;
  barSpot.shadow.mapSize.set(512, 512);
  barSpot.shadow.camera.near = 0.5; barSpot.shadow.camera.far = 18;
  barSpot.shadow.bias = -0.0004;
  g.add(barSpot);
  g.add(barSpot.target);

  world.add(g);return g;
}
buildBar();

// ── T7: Right side fireplace + stage area (reduced visual weight) ──
function buildFireplaceAndStage(){
  const g=new THREE.Group();g.name='fireplace_stage';
  const rwX = C.W/2; // right wall inner face ≈ 13

  // Fireplace body — smaller, pushed further back and right
  const fpGeo=roundedBox(3.2, 4.8, 1.2, 0.22, 5);
  const fp=new THREE.Mesh(fpGeo,matBrickFire);fp.position.set(rwX-1.8, 2.6, -4.5);fp.castShadow=true;fp.receiveShadow=true;g.add(fp);
  // Fireplace opening
  const fpOpGeo=new THREE.BoxGeometry(2.2, 3.2, 0.8);
  const fpOp=new THREE.Mesh(fpOpGeo,mat(0x1A0A04,0.95));fpOp.position.set(rwX-1.8, 2.2, -3.95);g.add(fpOp);
  // Mantel
  const mantelGeo=new THREE.BoxGeometry(3.6, 0.25, 1.4);
  const mantel=new THREE.Mesh(mantelGeo,matWood(0x4A3020));mantel.position.set(rwX-1.8, 5.1, -4.5);mantel.castShadow=true;g.add(mantel);
  // Fire glow
  const fireGeo=new THREE.PlaneGeometry(1.8, 2.6);
  const fireMat=new THREE.MeshStandardMaterial({color:0xFF8C00,emissive:0xFF6600,emissiveIntensity:2.2,roughness:0.3,side:THREE.DoubleSide});
  const fire=new THREE.Mesh(fireGeo,fireMat);fire.position.set(rwX-1.8, 2.3, -3.94);g.add(fire);

  // Red patterned bench
  const benchGeo=roundedBox(3.2, 1.3, 1.2, 0.15, 5);
  const bench=new THREE.Mesh(benchGeo,matFabric(0x8C3A2B));bench.position.set(rwX-0.8, 0.75, -2.5);bench.castShadow=true;bench.receiveShadow=true;g.add(bench);
  const benchLegGeo=new THREE.CylinderGeometry(0.08,0.1,0.4,8);
  [[-1.2,0.22,0.35],[1.2,0.22,0.35],[-1.2,0.22,-0.35],[1.2,0.22,-0.35]].forEach(([lx,ly,lz])=>{
    const leg=new THREE.Mesh(benchLegGeo,matWood(0x3E2723));leg.position.set(rwX-0.8+lx,ly,-2.5+lz);g.add(leg);
  });

  // Mic stand
  const micBaseGeo=new THREE.CylinderGeometry(0.25,0.32,0.08,16);
  const micBase=new THREE.Mesh(micBaseGeo,matMetal(0x2A2A2A));micBase.position.set(rwX-0.6, 0.04, -1.5);g.add(micBase);
  const micPoleGeo=new THREE.CylinderGeometry(0.04,0.05,2.4,8);
  const micPole=new THREE.Mesh(micPoleGeo,matMetal(0x2A2A2A));micPole.position.set(rwX-0.6, 1.2, -1.5);g.add(micPole);
  const micHeadGeo=new THREE.SphereGeometry(0.18,12,8);
  const micHead=new THREE.Mesh(micHeadGeo,matMetal(0x333333));micHead.scale.set(1,1.3,1);micHead.position.set(rwX-0.6, 2.5, -1.5);g.add(micHead);

  // Guitar
  const gx = rwX-0.3, gz = -2.5;
  const guitarBodyGeo=new THREE.BoxGeometry(0.65, 1.1, 0.22);guitarBodyGeo.translate(0,-0.55,0);
  const guitarBody=new THREE.Mesh(guitarBodyGeo,matWood(0x6B4F10));guitarBody.position.set(gx, 0.8, gz);guitarBody.rotation.z=0.2;guitarBody.rotation.x=-0.1;g.add(guitarBody);
  const guitarNeckGeo=new THREE.BoxGeometry(0.15, 1.8, 0.1);
  const guitarNeck=new THREE.Mesh(guitarNeckGeo,matWood(0x3E2723));guitarNeck.position.set(gx+0.15, 1.9, gz-0.05);guitarNeck.rotation.z=0.2;guitarNeck.rotation.x=-0.1;g.add(guitarNeck);

  world.add(g);return g;
}
buildFireplaceAndStage();

// ── T8: Wall decorations, window, sconces, street lamp, plants ──
function buildDecorations(){
  const g=new THREE.Group();g.name='decorations';
  const bwZ = -C.D/2 - C.wallT/2; // back wall face Z: -10.35

  // ── Art painting (back wall, left of window) ──
  const artCanvasTex = createArtTexture();
  const artFrameGeo=new THREE.BoxGeometry(2.2,1.8,0.16);
  const artFrame=new THREE.Mesh(artFrameGeo,matWood(0x4A3020));artFrame.position.set(-7.5,5.6,bwZ+0.1);g.add(artFrame);
  const artGeo=new THREE.PlaneGeometry(1.9,1.5);
  const artMat=new THREE.MeshStandardMaterial({map:artCanvasTex,roughness:0.7});
  const art=new THREE.Mesh(artGeo,artMat);art.position.set(-7.5,5.6,bwZ+0.19);g.add(art);

  // ── Menu board (back wall, right of window) ──
  const menuTex = createMenuTexture();
  const menuFrameGeo=new THREE.BoxGeometry(1.2,1.8,0.12);
  const menuFrame=new THREE.Mesh(menuFrameGeo,matWood(0x3E2723));menuFrame.position.set(7.5,4.6,bwZ+0.06);g.add(menuFrame);
  const menuGeo=new THREE.PlaneGeometry(1.0,1.6);
  const menuMat2=new THREE.MeshStandardMaterial({map:menuTex,roughness:0.6});
  const menuPlane=new THREE.Mesh(menuGeo,menuMat2);menuPlane.position.set(7.5,4.6,bwZ+0.13);g.add(menuPlane);

  // ════════════════════════════════════════════════════════════
  // CENTRAL PERK SIGN — 3D with frame, panel, text, and glow
  // ════════════════════════════════════════════════════════════
  const signG = new THREE.Group(); signG.name = 'sign';
  const signW = 9.0, signH = 2.4, signD = 0.5;
  const signCX = 0, signCY = 12.1;

  // ── Outer wood frame (4 members, thick, visible from side) ──
  const fW = 0.3, fD = signD + 0.2;
  const frameTopGeo = new THREE.BoxGeometry(signW + fW*2, fW, fD);
  const frameTop = new THREE.Mesh(frameTopGeo, matWood(0x3E2723));
  frameTop.position.set(signCX, signCY+signH/2+fW/2, bwZ + fD/2); signG.add(frameTop);

  const frameBotGeo = new THREE.BoxGeometry(signW + fW*2, fW, fD);
  const frameBot = new THREE.Mesh(frameBotGeo, matWood(0x3E2723));
  frameBot.position.set(signCX, signCY-signH/2-fW/2, bwZ + fD/2); signG.add(frameBot);

  const frameLGeo = new THREE.BoxGeometry(fW, signH, fD);
  const frameL = new THREE.Mesh(frameLGeo, matWood(0x3E2723));
  frameL.position.set(signCX-signW/2-fW/2, signCY, bwZ+fD/2); signG.add(frameL);

  const frameRGeo = new THREE.BoxGeometry(fW, signH, fD);
  const frameR = new THREE.Mesh(frameRGeo, matWood(0x3E2723));
  frameR.position.set(signCX+signW/2+fW/2, signCY, bwZ+fD/2); signG.add(frameR);

  // ── Inner panel (cream-colored background block) ──
  const panelGeo = new THREE.BoxGeometry(signW-0.2, signH-0.2, signD-0.1);
  const panel = new THREE.Mesh(panelGeo, matPainted(0xD4C09A));
  panel.position.set(signCX, signCY, bwZ + signD/2); signG.add(panel);

  // ── Text face plate (thin layer with CanvasTexture) ──
  const faceGeo = new THREE.PlaneGeometry(signW-0.5, signH-0.5);
  const face = new THREE.Mesh(faceGeo, matSignFace);
  face.position.set(signCX, signCY, bwZ + signD + 0.02); signG.add(face);

  // ── Glow light (warm orange point light in front of sign) ──
  const signLight = new THREE.PointLight(0xFFC070, 2.2, 10, 1.4);
  signLight.position.set(signCX, signCY, bwZ + signD + 0.6);
  signLight.castShadow = true;
  signLight.shadow.mapSize.set(256, 256);
  signLight.shadow.camera.near = 0.2; signLight.shadow.camera.far = 12;
  signLight.shadow.bias = -0.0005;
  signG.add(signLight);

  // ── userData for raycaster interaction ──
  signG.userData = {
    interactive: true,
    infoTitle: 'CENTRAL PERK 招牌',
    infoDesc: '复古木质招牌悬挂在后墙高处。暖橙色文字配奶油色面板和深胡桃木外框，下方绿色装饰线呼应咖啡馆的经典配色。'
  };

  g.add(signG);

  // ════════════════════════════════════════════════════════════
  // LARGE BACK-WALL WINDOW (behind sofa, centered)
  // ════════════════════════════════════════════════════════════
  const winGroup = new THREE.Group(); winGroup.name = 'window';
  winGroup.userData = { interactive:true, infoTitle:'大窗户', infoDesc:'后墙上镶嵌着一扇深木框大窗，两侧挂着深绿色布帘。窗外透进微弱的蓝灰色冷光，与室内的暖调形成柔和的对比。' };
  g.add(winGroup);
  const winW = 8.5, winH = 5.2;          // opening dimensions
  const winCX = 0, winCY = 6.0;           // center of window on wall
  const frameDepth = 0.3, frameWidth = 0.25; // frame member thickness
  const sillDepth = 0.5, sillThick = 0.22;

  // ── Outer frame (4 members, deep enough to show wall thickness from side) ──
  const outerTopGeo = new THREE.BoxGeometry(winW+frameWidth*2, frameWidth, frameDepth*2);
  const outerTop = new THREE.Mesh(outerTopGeo, matWood(0x3E2723));
  outerTop.position.set(winCX, winCY+winH/2+frameWidth/2, bwZ+frameDepth/2); winGroup.add(outerTop);

  const outerBotGeo = new THREE.BoxGeometry(winW+frameWidth*2, frameWidth, frameDepth*2);
  const outerBot = new THREE.Mesh(outerBotGeo, matWood(0x3E2723));
  outerBot.position.set(winCX, winCY-winH/2-frameWidth/2, bwZ+frameDepth/2); winGroup.add(outerBot);

  const outerLGeo = new THREE.BoxGeometry(frameWidth, winH, frameDepth*2);
  const outerL = new THREE.Mesh(outerLGeo, matWood(0x3E2723));
  outerL.position.set(winCX-winW/2-frameWidth/2, winCY, bwZ+frameDepth/2); winGroup.add(outerL);

  const outerRGeo = new THREE.BoxGeometry(frameWidth, winH, frameDepth*2);
  const outerR = new THREE.Mesh(outerRGeo, matWood(0x3E2723));
  outerR.position.set(winCX+winW/2+frameWidth/2, winCY, bwZ+frameDepth/2); winGroup.add(outerR);

  // ── Inner recessed frame (thinner members, set back into wall) ──
  const innerFrameW = 0.18, innerOffset = 0.08;
  const innerTopGeo = new THREE.BoxGeometry(winW, innerFrameW, frameDepth*0.7);
  const innerTop = new THREE.Mesh(innerTopGeo, matWood(0x4A3020));
  innerTop.position.set(winCX, winCY+winH/2-innerFrameW/2, bwZ+innerOffset); winGroup.add(innerTop);

  const innerBotGeo = new THREE.BoxGeometry(winW, innerFrameW, frameDepth*0.7);
  const innerBot = new THREE.Mesh(innerBotGeo, matWood(0x4A3020));
  innerBot.position.set(winCX, winCY-winH/2+innerFrameW/2, bwZ+innerOffset); winGroup.add(innerBot);

  const innerLGeo = new THREE.BoxGeometry(innerFrameW, winH-innerFrameW*2, frameDepth*0.7);
  const innerL = new THREE.Mesh(innerLGeo, matWood(0x4A3020));
  innerL.position.set(winCX-winW/2+innerFrameW/2, winCY, bwZ+innerOffset); winGroup.add(innerL);

  const innerRGeo = new THREE.BoxGeometry(innerFrameW, winH-innerFrameW*2, frameDepth*0.7);
  const innerR = new THREE.Mesh(innerRGeo, matWood(0x4A3020));
  innerR.position.set(winCX+winW/2-innerFrameW/2, winCY, bwZ+innerOffset); winGroup.add(innerR);

  // ── Window mullion (vertical divider, 2-pane style) ──
  const mullionGeo = new THREE.BoxGeometry(innerFrameW*0.7, winH-innerFrameW*2, frameDepth*0.5);
  const mullion = new THREE.Mesh(mullionGeo, matWood(0x4A3020));
  mullion.position.set(winCX, winCY, bwZ+innerOffset*1.1); winGroup.add(mullion);

  // ── Glass panes (2 panes, semi-transparent blue-grey) ──
  const glassPanes = 2;
  for(let p=0;p<glassPanes;p++){
    const glassGX = winCX + (p===0?-1:1)*(winW/4);
    const glassGeo = new THREE.PlaneGeometry(winW/2-innerFrameW*1.2, winH-innerFrameW*2.2);
    const glassMat = new THREE.MeshStandardMaterial({
      color:0x7B9EAD, roughness:0.08, metalness:0.15,
      opacity:0.42, transparent:true, side:THREE.DoubleSide
    });
    const glassPane = new THREE.Mesh(glassGeo, glassMat);
    glassPane.position.set(glassGX, winCY, bwZ+innerOffset*1.2); winGroup.add(glassPane);
  }

  // ── Window sill (projecting ledge at bottom) ──
  const sillGeo = new THREE.BoxGeometry(winW+frameWidth*2+0.6, sillThick, sillDepth);
  const sill = new THREE.Mesh(sillGeo, matWood(0x3E2723));
  sill.position.set(winCX, winCY-winH/2-frameWidth/2-sillThick/2, bwZ+frameDepth/2+sillDepth/2); winGroup.add(sill);

  // ── Curtain rod ──
  const rodGeo = new THREE.CylinderGeometry(0.08,0.08, winW+frameWidth*2+1.2, 8);
  const rod = new THREE.Mesh(rodGeo, matMetal(0x2A2A2A));
  rod.rotation.z = Math.PI/2;
  rod.position.set(winCX, winCY+winH/2+frameWidth/2+0.5, bwZ+frameDepth/2+sillDepth/2-0.15); winGroup.add(rod);

  // Rod finials (end caps)
  [[-1,0],[1,0]].forEach(([sx,sz])=>{
    const finialGeo = new THREE.SphereGeometry(0.12, 8, 6);
    const finial = new THREE.Mesh(finialGeo, matMetal(0xB08D4F));
    finial.position.set(winCX+sx*(winW/2+frameWidth+0.55), winCY+winH/2+frameWidth/2+0.5, bwZ+frameDepth/2+sillDepth/2-0.15); winGroup.add(finial);
  });

  // ── Curtains (two draped fabric panels with thickness, deep green) ──
  const curtainW = 1.2, curtainH = winH+0.6, curtainD = 0.22;
  const curtainColor = 0x3E5C4B; // deep green

  // Left curtain (gathered/folded look via 3 vertical segments)
  const leftCurtain = new THREE.Group();
  for(let s=0;s<3;s++){
    const segGeo = new THREE.BoxGeometry(curtainW/3-0.04, curtainH, curtainD);
    const seg = new THREE.Mesh(segGeo, matFabric(curtainColor));
    seg.position.x = s*(curtainW/3);
    seg.position.z = (s%2===0 ? 0.05 : -0.04);
    seg.rotation.y = (s===0?0.06 : s===2?-0.06 : 0);
    leftCurtain.add(seg);
  }
  leftCurtain.position.set(winCX-winW/2-frameWidth/2-0.55, winCY-0.05, bwZ+frameDepth/2+sillDepth/2-0.1);
  winGroup.add(leftCurtain);

  const rightCurtain = new THREE.Group();
  for(let s=0;s<3;s++){
    const segGeo = new THREE.BoxGeometry(curtainW/3-0.04, curtainH, curtainD);
    const seg = new THREE.Mesh(segGeo, matFabric(curtainColor));
    seg.position.x = s*(curtainW/3);
    seg.position.z = (s%2===0 ? -0.04 : 0.05);
    seg.rotation.y = (s===0?-0.06 : s===2?0.06 : 0);
    rightCurtain.add(seg);
  }
  rightCurtain.position.set(winCX+winW/2+frameWidth/2+0.55, winCY-0.05, bwZ+frameDepth/2+sillDepth/2-0.1);
  winGroup.add(rightCurtain);

  // ── Wall sconces ──
  [[-3,6.5],[3,6.5]].forEach(([sx,sy])=>{
    const sconceG=new THREE.Group();
    const baseGeo=new THREE.CylinderGeometry(0.12,0.14,0.2,8);
    const base=new THREE.Mesh(baseGeo,matMetal(0xB08D4F));base.rotation.x=Math.PI/2;base.position.set(0,0,0);sconceG.add(base);
    const shadeGeo=new THREE.CylinderGeometry(0.18,0.26,0.6,12);shadeGeo.translate(0,-0.3,0);
    const shade=new THREE.Mesh(shadeGeo,mat(0xE8863A,0.5));shade.position.set(0,-0.4,0);sconceG.add(shade);
    const bulbGeo=new THREE.SphereGeometry(0.1,8,6);
    const bulb=new THREE.Mesh(bulbGeo,new THREE.MeshStandardMaterial({color:0xFFF8D0,emissive:0xFFE066,emissiveIntensity:2.0,roughness:0.1}));bulb.position.set(0,-0.12,0);sconceG.add(bulb);
    sconceG.position.set(sx,sy,-C.D/2-C.wallT/2+0.45);g.add(sconceG);
  });

  // ── Black street lamp (left-front) ──
  const lampG=new THREE.Group();
  const lampPoleGeo=new THREE.CylinderGeometry(0.12,0.14,6,12);
  const lampPole=new THREE.Mesh(lampPoleGeo,matMetal(0x1A1A1A));lampPole.position.y=3;lampG.add(lampPole);
  const lampBaseGeo3=new THREE.CylinderGeometry(0.3,0.4,0.2,16);
  const lampBase3=new THREE.Mesh(lampBaseGeo3,matMetal(0x1A1A1A));lampBase3.position.y=0.05;lampG.add(lampBase3);
  const lampHeadGeo2=new THREE.CylinderGeometry(0.2,0.35,0.8,12);lampHeadGeo2.translate(0,-0.4,0);
  const lampHead2=new THREE.Mesh(lampHeadGeo2,matMetal(0x1A1A1A));lampHead2.position.y=6.4;lampG.add(lampHead2);
  const lampBulbGeo=new THREE.SphereGeometry(0.14,8,6);
  const lampBulb=new THREE.Mesh(lampBulbGeo,new THREE.MeshStandardMaterial({color:0xFFF8D0,emissive:0xFFE066,emissiveIntensity:1.8,roughness:0.1}));lampBulb.position.y=6.05;lampG.add(lampBulb);
  lampG.position.set(-10.5,0,4.5);g.add(lampG);

  // ── Side stool near right armchair (with a book on it) ──
  const stoolGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.9, 8);
  const stool = new THREE.Mesh(stoolGeo, matWood(0x4A3020));
  stool.position.set(9.2, 0.45, 1.5); g.add(stool);
  const bookOnStoolGeo = new THREE.BoxGeometry(0.4, 0.08, 0.55);
  const bookOnStool = new THREE.Mesh(bookOnStoolGeo, mat(0x8C3A2B, 0.7));
  bookOnStool.position.set(9.2, 0.95, 1.5); bookOnStool.rotation.y = 0.3; g.add(bookOnStool);

  // ── Potted plant ──
  const potGeo=new THREE.CylinderGeometry(0.4,0.3,0.9,12);
  const pot=new THREE.Mesh(potGeo,mat(0x8C3A2B,0.7));pot.position.set(-10,0.5,3.5);g.add(pot);
  const leavesGeo=new THREE.SphereGeometry(0.55,8,6);leavesGeo.translate(0,0.3,0);
  const leaves=new THREE.Mesh(leavesGeo,mat(0x3E5C4B,0.9));leaves.position.set(-10,1.2,3.5);g.add(leaves);

  // ── Vase on side table with flowers ──
  const vaseGeo=new THREE.CylinderGeometry(0.15,0.2,0.5,8);
  const vase=new THREE.Mesh(vaseGeo,matGlazed(0xD4C09A));vase.position.set(5.8,1.1,-2.5);g.add(vase);
  // Flower stems
  for(let f=0;f<3;f++){
    const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5+f*0.1, 6);
    const stem = new THREE.Mesh(stemGeo, mat(0x4A7C59, 0.7));
    stem.position.set(5.8+0.05*f, 1.15, -2.5-0.05*f);
    stem.rotation.z = (f-1)*0.2; stem.rotation.x = (f-1)*0.15;
    stem.castShadow = true; g.add(stem);
  }
  // Flower heads (small spheres)
  for(let f=0;f<3;f++){
    const headGeo = new THREE.SphereGeometry(0.06, 6, 4);
    const color = [0xE8739A, 0xF5A623, 0xE8863A][f];
    const flowerHead = new THREE.Mesh(headGeo, mat(color, 0.5));
    flowerHead.position.set(5.8+0.05*f, 1.4+f*0.1, -2.5-0.05*f);
    g.add(flowerHead);
  }

  // ── Coffee table decorations: small magazine / book ──
  const magGeo = new THREE.BoxGeometry(0.9, 0.04, 1.2);
  const mag = new THREE.Mesh(magGeo, mat(0xE8D8B8, 0.75));
  mag.position.set(0, 1.46, 2.2); mag.rotation.x = -0.03; g.add(mag);
  // Magazine cover detail (thin colored strip)
  const magCoverGeo = new THREE.BoxGeometry(0.88, 0.005, 0.15);
  const magCover = new THREE.Mesh(magCoverGeo, mat(0x8C3A2B, 0.7));
  magCover.position.set(0, 1.48, 2.05); g.add(magCover);

  // ── Fireplace mantel: candles ──
  const rwX = C.W/2;
  for(let c=0;c<2;c++){
    const candleGeo = new THREE.CylinderGeometry(0.08, 0.10, 0.35, 8);
    const candle = new THREE.Mesh(candleGeo, matGlazed(0xE8E0D0));
    candle.position.set(rwX-1.8-0.6+c*1.2, 5.35, -4.2); g.add(candle);
    // Flame
    const flameGeo = new THREE.SphereGeometry(0.05, 6, 4);
    const flame = new THREE.Mesh(flameGeo, new THREE.MeshStandardMaterial({color:0xFFA500, emissive:0xFF6600, emissiveIntensity:1.0, roughness:0.2}));
    flame.position.set(rwX-1.8-0.6+c*1.2, 5.6, -4.2); g.add(flame);
  }
  // Small clock on mantel
  const clockBodyGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.18, 12);
  const clockBody = new THREE.Mesh(clockBodyGeo, matWood(0x3E2723));
  clockBody.position.set(rwX-1.8, 5.38, -4.2); g.add(clockBody);
  const clockFaceGeo = new THREE.PlaneGeometry(0.18, 0.18);
  const clockFace = new THREE.Mesh(clockFaceGeo, mat(0xF5ECD7, 0.5));
  clockFace.position.set(rwX-1.8, 5.38, -4.1); g.add(clockFace);

  // ── Window sill: small jar / bottle ──
  const sillZ = -C.D/2-C.wallT/2 + frameDepth/2 + sillDepth/2 + 0.1;
  const sillY = 6.0 - 5.2/2 - 0.25/2 - 0.22/2; // bottom of window sill
  for(let si=0;si<2;si++){
    const jarGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.25, 8);
    const jar = new THREE.Mesh(jarGeo, matGlazed(si===0?0x4A7C59:0xC97B3C));
    jar.position.set(-1.5+si*3, sillY+0.15, sillZ); g.add(jar);
  }

  // ── Bar counter: extra small items (sugar bowl, napkin holder) ──
  const barCX = -8.5, barCZ = -1.5, barH = 3.6;
  // Sugar bowl
  const sugarGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.25, 10);
  const sugar = new THREE.Mesh(sugarGeo, matGlazed(0xF3E6D2));
  sugar.position.set(barCX-0.5, barH+0.22, barCZ+0.25); g.add(sugar);
  // Napkin stack
  const napkinGeo = new THREE.BoxGeometry(0.3, 0.08, 0.35);
  const napkin = new THREE.Mesh(napkinGeo, mat(0xE8E0D0, 0.8));
  napkin.position.set(barCX+0.5, barH+0.15, barCZ+0.3); g.add(napkin);

  world.add(g);return g;
}
buildDecorations();

// ── T9: Six articulated low-poly characters ──
// Each character = head + hair + torso + upper arms + forearms + thighs + shins + shoes
// Pose controlled by joint angles passed via opts

function buildCharacter(hairColor, topColor, bottomColor, skinColor, height, opts={}){
  const H = height; // total standing height
  const g = new THREE.Group();

  // Proportions (fractions of H)
  const headR = H*0.075;
  const neckY = H*0.80;
  const shoulderY = H*0.72;
  const hipY = H*0.38;
  const kneeY = H*0.18;
  const floorY = 0;

  // ── Torso (tapered box: wider at shoulders, narrower at hips) ──
  const torsoTopR = 0.28, torsoBotR = 0.22, torsoLen = shoulderY-hipY;
  const torsoGeo = new THREE.CylinderGeometry(torsoBotR, torsoTopR, torsoLen, 8);
  torsoGeo.translate(0, hipY+torsoLen/2, 0);
  const torso = new THREE.Mesh(torsoGeo, mat(topColor, 0.75));
  torso.castShadow = true; g.add(torso);

  // ── Pelvis (short cylinder) ──
  const pelvisGeo = new THREE.CylinderGeometry(0.22, 0.18, H*0.06, 8);
  pelvisGeo.translate(0, hipY-0.03*H, 0);
  const pelvis = new THREE.Mesh(pelvisGeo, mat(bottomColor, 0.75));
  g.add(pelvis);

  // ── Head ──
  const headGeo = new THREE.SphereGeometry(headR*1.15, 10, 8);
  const head = new THREE.Mesh(headGeo, mat(skinColor, 0.7));
  head.scale.set(1, 1.15, 1); head.position.y = neckY; head.castShadow = true; g.add(head);

  // ── Hair ──
  const hairGeo = new THREE.SphereGeometry(headR*1.25, 10, 8);
  const hair = new THREE.Mesh(hairGeo, mat(hairColor, 0.85));
  hair.scale.set(1, 0.45, 1); hair.position.y = neckY + headR*0.3; g.add(hair);

  // ── Eyes (small spheres on face) ──
  const eyeGeo = new THREE.SphereGeometry(0.035, 4, 4);
  const eyeZ = headR;
  [[-headR*0.3, 0.04], [headR*0.3, 0.04]].forEach(([ex, ey])=>{
    const eye = new THREE.Mesh(eyeGeo, mat(0x111111, 0.2));
    eye.position.set(ex, neckY+ey, eyeZ); g.add(eye);
  });

  // ── Build each side (L/R) = shoulder joint + upper arm + elbow + forearm ──
  const sides = [-1, 1];
  sides.forEach(side=>{
    const sx = side * (torsoTopR+0.05);

    // Upper arm group (pivots at shoulder)
    const upperArmG = new THREE.Group();
    upperArmG.position.set(sx, shoulderY, 0);
    const upperLen = H*0.22;
    const upperGeo = new THREE.CylinderGeometry(0.06, 0.07, upperLen, 8);
    upperGeo.translate(0, -upperLen/2, 0);
    const upperArm = new THREE.Mesh(upperGeo, mat(topColor, 0.75));
    upperArm.castShadow = true; upperArmG.add(upperArm);
    g.add(upperArmG);

    // Forearm group (pivots at elbow = end of upper arm)
    const forearmG = new THREE.Group();
    forearmG.position.set(0, -upperLen, 0);
    const forearmLen = H*0.18;
    const forearmGeo = new THREE.CylinderGeometry(0.05, 0.06, forearmLen, 8);
    forearmGeo.translate(0, -forearmLen/2, 0);
    const forearm = new THREE.Mesh(forearmGeo, mat(skinColor, 0.75));
    forearm.castShadow = true; forearmG.add(forearm);

    // Hand (small sphere)
    const handGeo = new THREE.SphereGeometry(0.05, 6, 4);
    const hand = new THREE.Mesh(handGeo, mat(skinColor, 0.7));
    hand.position.set(0, -forearmLen, 0); forearmG.add(hand);

    upperArmG.add(forearmG);

    // Save references for pose application
    upperArmG.userData = { side, joint:'shoulder' };
    forearmG.userData = { side, joint:'elbow' };

    // Store for external pose setting
    if(!g.userData.arms) g.userData.arms = [];
    g.userData.arms.push({ upper:upperArmG, forearm:forearmG, side });
  });

  // ── Build each leg = thigh + shin + shoe ──
  const legRoots = [-0.12, 0.12];
  legRoots.forEach(lx=>{
    const legG = new THREE.Group();
    legG.position.set(lx, hipY-0.02*H, 0);

    const thighLen = H*0.28;
    const thighGeo = new THREE.CylinderGeometry(0.10, 0.11, thighLen, 8);
    thighGeo.translate(0, -thighLen/2, 0);
    const thigh = new THREE.Mesh(thighGeo, mat(bottomColor, 0.75));
    thigh.castShadow = true; legG.add(thigh);

    const shinG = new THREE.Group();
    shinG.position.set(0, -thighLen, 0);
    const shinLen = H*0.22;
    const shinGeo = new THREE.CylinderGeometry(0.08, 0.09, shinLen, 8);
    shinGeo.translate(0, -shinLen/2, 0);
    const shin = new THREE.Mesh(shinGeo, mat(skinColor, 0.75));
    shin.castShadow = true; shinG.add(shin);

    // Shoe
    const shoeGeo = new THREE.BoxGeometry(0.12, 0.08, 0.18);
    const shoe = new THREE.Mesh(shoeGeo, mat(0x2A1A0A, 0.8));
    shoe.position.set(0, -shinLen-0.02, 0.04); shinG.add(shoe);

    legG.add(shinG);
    g.add(legG);

    if(!g.userData.legs) g.userData.legs = [];
    g.userData.legs.push({ thigh:legG, shin:shinG, rootLx:lx });
  });

  g.castShadow = true; g.receiveShadow = true;
  // Store height for cup placement
  g.userData.charHeight = H;
  return { group:g, height:H };
}

// Apply pose: set joint rotations per side
function poseChar(char, pose){
  const g = char.group;
  if(!g.userData.arms) return;

  g.userData.arms.forEach(a=>{
    const side = a.side;
    // shoulder: rotation.z = arm lift, rotation.x = forward/back
    a.upper.rotation.z = side*(pose.shoulderLift||0.15);
    a.upper.rotation.x = pose.shoulderFwd||0.0;
    // elbow bend
    a.forearm.rotation.x = pose.elbowBend||0.3;
  });

  if(g.userData.legs){
    g.userData.legs.forEach(l=>{
      l.thigh.rotation.x = pose.hipBend||0.0;
      l.shin.rotation.x = pose.kneeBend||0.0;
    });
  }
}

/* ── Six characters with distinct poses ── */
function placeCharacters(){
  const chars = new THREE.Group(); chars.name = 'characters';
  const sofaZ = -1.0, seatY = 0.92, sitZ = sofaZ - 0.35;

  // ── ROSS (left sofa seat, leaning forward, talking with hands) ──
  const ross = buildCharacter(0x2D2D2D, 0x4A78B4, 0x2D4F7E, 0xF5D0B0, 3.25);
  poseChar(ross, { shoulderLift:0.3, shoulderFwd:-0.25, elbowBend:0.8, hipBend:0.15, kneeBend:0.6 });
  ross.group.position.set(-2.8, seatY, sitZ);
  ross.group.rotation.y = 0.25; // turned slightly toward Rachel
  chars.add(ross.group);

  // Coffee cup in Ross's right hand (side=1 forearm)
  const rossFA = ross.group.userData.arms.find(a=>a.side===1);
  if(rossFA){
    const cupRoss = coffeeCup(0.3, 0, 0, 0.5);
    cupRoss.position.set(0, -ross.height*0.18, 0.08);
    rossFA.forearm.add(cupRoss);
  }

  // ── RACHEL (center sofa, head turned toward Ross, legs crossed) ──
  const rachel = buildCharacter(0xC9A050, 0xE8739A, 0x3E5C4B, 0xF8D8C0, 3.10);
  poseChar(rachel, { shoulderLift:0.12, shoulderFwd:-0.1, elbowBend:0.4, hipBend:0.10, kneeBend:0.7 });
  rachel.group.position.set(0, seatY, sitZ);
  rachel.group.rotation.y = 0.12; // looking at Ross
  chars.add(rachel.group);

  // Cup in Rachel's left hand
  const rachelFA = rachel.group.userData.arms.find(a=>a.side===-1);
  if(rachelFA){
    const cupRachel = coffeeCup(0.28, 0, 0, 0.5);
    cupRachel.position.set(0, -rachel.height*0.18, 0.06);
    rachelFA.forearm.add(cupRachel);
  }

  // ── MONICA (right sofa seat, sitting forward, gesturing) ──
  const monica = buildCharacter(0x1A1A1A, 0xF5A623, 0x4A3020, 0xF0C8A8, 3.00);
  poseChar(monica, { shoulderLift:0.35, shoulderFwd:-0.3, elbowBend:0.9, hipBend:0.20, kneeBend:0.5 });
  monica.group.position.set(2.8, seatY, sitZ);
  monica.group.rotation.y = -0.35; // turned outward, gesturing
  chars.add(monica.group);

  // Cup in Monica's right hand
  const monicaFA = monica.group.userData.arms.find(a=>a.side===1);
  if(monicaFA){
    const cupMon = coffeeCup(0.28, 0, 0, 0.5);
    cupMon.position.set(0, -monica.height*0.18, 0.06);
    monicaFA.forearm.add(cupMon);
  }

  // ── CHANDLER (left armchair, leaning back, one leg over knee) ──
  const chandler = buildCharacter(0x4A3520, 0x7E5FC4, 0x5C3D2E, 0xF5D0B0, 3.30);
  poseChar(chandler, { shoulderLift:0.08, shoulderFwd:-0.05, elbowBend:0.25, hipBend:0.05, kneeBend:0.8 });
  chandler.group.position.set(-6.8, 0, 1.0);
  chandler.group.rotation.y = 0.55; // looking toward center
  chars.add(chandler.group);

  // Cup in right hand
  const chanFA = chandler.group.userData.arms.find(a=>a.side===1);
  if(chanFA){
    const cupChan = coffeeCup(0.3, 0, 0, 0.5);
    cupChan.position.set(0, -chandler.height*0.18, 0.06);
    chanFA.forearm.add(cupChan);
  }

  // ── JOEY (right armchair, relaxed, one arm behind head) ──
  const joey = buildCharacter(0x2A1A0A, 0xE85D5D, 0x2D4F7E, 0xF0C8A8, 3.20);
  poseChar(joey, { shoulderLift:0.05, shoulderFwd:-0.02, elbowBend:0.2, hipBend:0.08, kneeBend:0.65 });
  joey.group.position.set(6.8, 0, 1.0);
  joey.group.rotation.y = -0.55; // looking toward center
  chars.add(joey.group);

  // Cup in left hand
  const joeyFA = joey.group.userData.arms.find(a=>a.side===-1);
  if(joeyFA){
    const cupJoey = coffeeCup(0.3, 0, 0, 0.5);
    cupJoey.position.set(0, -joey.height*0.18, 0.06);
    joeyFA.forearm.add(cupJoey);
  }

  // ── PHOEBE (standing near stage, guitar-adjacent, arms out expressive) ──
  const phoebe = buildCharacter(0xC9A050, 0x5EBF8D, 0x8C3A2B, 0xF8D8C0, 3.15);
  poseChar(phoebe, { shoulderLift:0.45, shoulderFwd:-0.35, elbowBend:1.1, hipBend:0.0, kneeBend:0.0 });
  phoebe.group.position.set(C.W/2-2.5, 0, -1.5);
  phoebe.group.rotation.y = -0.40;
  chars.add(phoebe.group);

  // Cup in right hand
  const phoebeFA = phoebe.group.userData.arms.find(a=>a.side===1);
  if(phoebeFA){
    const cupPho = coffeeCup(0.3, 0, 0, 0.5);
    cupPho.position.set(0, -phoebe.height*0.18, 0.06);
    phoebeFA.forearm.add(cupPho);
  }

  world.add(chars); return chars;
}
placeCharacters();

// ═══════════════════════════════════════════════════════════════
// T10-T12: Light toggle + view presets + UI + raycaster
// ═══════════════════════════════════════════════════════════════

// ── Light control ──
let lightsOn = true;
function setLights(on){
  lightsOn = on;
  const s = on ? 1 : 0.12;
  const sDim = on ? 1 : 0.20;
  L.ambient.intensity = C.light.ambient * (on ? 1 : 0.35);
  L.hemi.intensity = C.light.hemi * (on ? 1 : 0.20);
  L.key.intensity = C.light.key * s;
  L.window.intensity = C.light.window * (on ? 1 : 0.10);
  L.windowFill.intensity = C.light.windowFill * (on ? 1 : 0.15);
  L.stage.intensity = C.light.stage * sDim;
  document.getElementById('btn-light').querySelector('span').textContent = on?'关灯':'开灯';
  document.getElementById('btn-light').classList.toggle('on',!on);
}

// ── View presets ──
const views = {
  overview:{pos:[0,10.5,14],tgt:[0,2.2,0]},
  front:{pos:[0,6,14],tgt:[0,3.0,0.5]},
  sofa:{pos:[0,3.5,4],tgt:[0,1.6,-0.5]},
  bar:{pos:[-12,3.8,5],tgt:[-8.5,2.8,-1.5]},
  stage:{pos:[13,3.8,3],tgt:[11,2.5,-2.5]},
  top:{pos:[0,22,0.2],tgt:[0,0,1]},
  reset:{pos:[0,10.5,14],tgt:[0,2.2,0]}
};
let animTarget=null,animStartTime=0;
function animateCamera(viewName){
  const v=views[viewName];if(!v)return;
  animTarget={fromPos:camera.position.clone(),toPos:new THREE.Vector3(...v.pos),fromTgt:controls.target.clone(),toTgt:new THREE.Vector3(...v.tgt)};
  animStartTime=performance.now();
}

// ── Auto rotate (stops when user interacts, resumes after 3s idle) ──
let autoRotate = false;
let _rotateTimeout = null;
function _pauseRotateOnInteract(){
  if(!autoRotate) return;
  controls.autoRotate = false;
  clearTimeout(_rotateTimeout);
  _rotateTimeout = setTimeout(()=>{
    if(autoRotate) controls.autoRotate = true;
  }, 3000);
}
// Wire up pointer events to pause auto-rotate during user drags
renderer.domElement.addEventListener('pointerdown', ()=>_pauseRotateOnInteract());

function toggleAutoRotate(){
  autoRotate = !autoRotate;
  controls.autoRotate = autoRotate;
  document.getElementById('btn-rotate').querySelector('span').textContent = autoRotate ? '停止旋转' : '自动旋转';
  document.getElementById('btn-rotate').classList.toggle('on', autoRotate);
}

// ── Raycaster ──
const raycaster=new THREE.Raycaster();const mouse=new THREE.Vector2();
const interactiveNames=['shell','bar','fireplace_stage','characters']; // legacy

const infoData={
  shell:{title:'咖啡馆',desc:'暖米色墙壁、深木地板与绿色饰条的经典组合。红砖右墙增添一抹纽约下城的温度——就像走进格林威治村某个街角的老咖啡馆。'},
  bar:{title:'吧台',desc:'深色木柜台后面是意式咖啡机和整齐的杯架。粉色蛋糕盘和巧克力蛋糕安静地等着被端走，三张高脚凳暗示着总有客人在这里闲聊。'},
  fireplace_stage:{title:'壁炉与舞台',desc:'右后方红砖墙面上嵌着一座小壁炉，火光轻微跳动。前方放着红色长椅和落地麦克风——角落里还有一把斜靠的木吉他，像个随时可以登场的小舞台。'},
  characters:{title:'老友们',desc:'六个人挤在橙红色长沙发上，各自握着咖啡杯。Ross 在争论什么，Rachel 侧头听，Chandler 刚说了句俏皮话——这是属于他们的又一个下午。'},
  sofa:{title:'橙色沙发',desc:'Central Perk 的灵魂所在。焦糖色灯芯绒面料包裹着又大又软的坐垫——三个独立靠垫，两边是厚实的圆形扶手。每个人都想坐这里。'},
  window:{title:'大窗户',desc:'后墙上镶嵌着一扇深木框大窗，两侧挂着深绿色布帘。窗外透进微弱的蓝灰色冷光，与室内的暖调形成柔和的对比。'}
};
const registeredHotspots = new Set(); // track already-registered objects

// Resolve interactive object: returns infoData key or userData object
function resolveInteractive(hitObj){
  let o=hitObj;
  while(o){
    if(o.userData&&o.userData.interactive) return o.userData;
    if(o.name&&infoData[o.name]) return o.name;
    o=o.parent;
  }
  return null;
}

// ── Hover highlight tracker ──
let _hoveredMesh = null;
let _hoveredOrigEmissive = null;
let _hoveredOrigEmissiveIntensity = null;

window.addEventListener('pointermove',e=>{
  mouse.x=(e.clientX/window.innerWidth)*2-1;mouse.y=-(e.clientY/window.innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hits=raycaster.intersectObjects(world.children,true);
  const tip=document.getElementById('tooltip');

  // Reset previous hover highlight
  if(_hoveredMesh){
    if(_hoveredOrigEmissive !== null) _hoveredMesh.material.emissive.set(_hoveredOrigEmissive);
    if(_hoveredOrigEmissiveIntensity !== null) _hoveredMesh.material.emissiveIntensity = _hoveredOrigEmissiveIntensity;
    _hoveredMesh = null;
  }

  if(hits.length>0){
    const resolved = resolveInteractive(hits[0].object);
    if(resolved){
      document.body.style.cursor = 'pointer';
      const title = typeof resolved==='string' ? infoData[resolved].title : resolved.infoTitle;
      tip.textContent = title; tip.classList.remove('hidden');
      tip.style.left = e.clientX+'px'; tip.style.top = e.clientY+'px';

      // Apply subtle hover glow to the hit mesh
      const hitMesh = hits[0].object;
      if(hitMesh.material && hitMesh.material.emissive){
        _hoveredMesh = hitMesh;
        _hoveredOrigEmissive = hitMesh.material.emissive.getHex();
        _hoveredOrigEmissiveIntensity = hitMesh.material.emissiveIntensity || 0;
        hitMesh.material.emissive.set(0xFFB347);
        hitMesh.material.emissiveIntensity = 0.35;
      }
    } else {
      document.body.style.cursor = 'auto'; tip.classList.add('hidden');
    }
  } else {
    document.body.style.cursor = 'auto'; tip.classList.add('hidden');
  }
});

window.addEventListener('click',e=>{
  if(e.target.closest('#view-panel')||e.target.closest('#info-card')||e.target.closest('#loading'))return;
  mouse.x=(e.clientX/window.innerWidth)*2-1;mouse.y=-(e.clientY/window.innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hits=raycaster.intersectObjects(world.children,true);
  if(hits.length>0){
    const resolved = resolveInteractive(hits[0].object);
    if(resolved){
      if(typeof resolved==='string'){
        document.getElementById('info-title').textContent=infoData[resolved].title;
        document.getElementById('info-desc').textContent=infoData[resolved].desc;
      } else {
        document.getElementById('info-title').textContent=resolved.infoTitle;
        document.getElementById('info-desc').textContent=resolved.infoDesc;
      }
      document.getElementById('info-card').classList.remove('hidden');
    }
  }
});

// ── UI bindings ──
document.querySelectorAll('.vbtn[data-view]').forEach(b=>b.addEventListener('click',()=>animateCamera(b.dataset.view)));
document.getElementById('btn-light').addEventListener('click',()=>setLights(!lightsOn));
document.getElementById('btn-rotate').addEventListener('click',toggleAutoRotate);
document.getElementById('btn-fullscreen').addEventListener('click',()=>{
  if(document.fullscreenElement)document.exitFullscreen();else document.body.requestFullscreen();
});
document.getElementById('info-close').addEventListener('click',()=>document.getElementById('info-card').classList.add('hidden'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('info-card').classList.add('hidden');}});

// First-run hint fade-out
setTimeout(()=>document.getElementById('hint').classList.add('fade'),10000);

// ── Loading screen ──
function hideLoading(){
  const el = document.getElementById('loading');
  if(el) el.classList.add('done');
}
setTimeout(hideLoading, 1800);

// Catch all errors and show them on-screen
window.addEventListener('error', (e) => {
  const msg = e.error?.message || e.message || 'Unknown error';
  hideLoading();
  const app = document.getElementById('app');
  if(app){
    app.innerHTML = '<div style=\"position:fixed;inset:0;background:#120b07;color:#ff6b6b;display:flex;align-items:center;justify-content:center;z-index:9999;font-family:monospace;font-size:16px;padding:40px;text-align:center;white-space:pre-wrap;line-height:1.6;\"><div><h2 style=\"color:#ffb347;margin-bottom:16px;\">Runtime Error</h2><code>' + msg + '</code></div></div>';
  }
});
// Also catch unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  const msg = e.reason?.message || String(e.reason);
  hideLoading();
  const app = document.getElementById('app');
  if(app){
    app.innerHTML = '<div style=\"position:fixed;inset:0;background:#120b07;color:#ff6b6b;display:flex;align-items:center;justify-content:center;z-index:9999;font-family:monospace;font-size:16px;padding:40px;text-align:center;white-space:pre-wrap;line-height:1.6;\"><div><h2 style=\"color:#ffb347;margin-bottom:16px;\">Promise Rejection</h2><code>' + msg + '</code></div></div>';
  }
});
// ═══════════════════════════════════════════════════════════════
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,C.render.maxPR));renderer.setSize(innerWidth,innerHeight);});

// ═══════════════════════════════════════════════════════════════
// RENDER LOOP
// ═══════════════════════════════════════════════════════════════
function animate(){
  requestAnimationFrame(animate);

  // Camera animation interpolation
  if(animTarget){
    const elapsed=performance.now()-animStartTime;const duration=C.cam.ms;const t=Math.min(elapsed/duration,1);
    const ease=t<0.5?2*t*t:-1+(4-2*t)*t;
    camera.position.lerpVectors(animTarget.fromPos,animTarget.toPos,ease);
    controls.target.lerpVectors(animTarget.fromTgt,animTarget.toTgt,ease);
    if(t>=1)animTarget=null;
  }

  controls.update();
  renderer.render(scene,camera);
}
animate();

// ═══════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════
window.__CP = { THREE, scene, camera, renderer, controls, world, L, C, mat, roundedBox, createBrickTexture, createWoodTexture, createRugTexture, createSignTexture, createMenuTexture, createArtTexture, matBrick, matBrickFire, matRug, matNeon, matMenu, M, setLights, animateCamera, toggleAutoRotate };
console.log('[CP] Full scene T2-T12 complete');
