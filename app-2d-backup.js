// ==================== APP STATE ====================
let allLines    = [];
let vocabWords  = new Set();
let searchIndex = null;
let timeOfDay   = 0;
let isBubblePaused = false;

// ==================== DOM ====================
const cafeScene     = document.getElementById('cafe-scene');
const timeToggle    = document.getElementById('time-toggle');
const searchBtn     = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchClose   = document.getElementById('search-close');
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const searchEmpty   = document.getElementById('search-empty');
const resultsCount  = document.getElementById('results-count');
const hotSearches   = document.getElementById('hot-searches');
const seasonFilter  = document.getElementById('season-filter');
const episodeFilter = document.getElementById('episode-filter');
const vocabBtn      = document.getElementById('vocab-btn');
const vocabOverlay  = document.getElementById('vocab-overlay');
const vocabClose    = document.getElementById('vocab-close');
const vocabList     = document.getElementById('vocab-list');
const vocabClearBtn = document.getElementById('vocab-clear');
const panelOverlay  = document.getElementById('panel-overlay');
const bigQuote      = document.getElementById('big-quote');
const bqChar        = bigQuote?.querySelector('.bq-char');
const bqText        = bigQuote?.querySelector('.bq-text');
const bqClose       = document.getElementById('big-quote-close');
const steamGroup    = document.getElementById('coffee-cup');
const flashEl       = document.querySelector('.flash-msg');

// ==================== INIT ====================
async function init() {
  await loadData();
  buildSearchIndex();
  loadVocab();
  renderHotSearches();
  populateFilters();
  bindEvents();
  startBubbleCarousel();
}

function bindEvents() {
  timeToggle?.addEventListener('click', cycleTime);
  searchBtn?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  panelOverlay?.addEventListener('click', closeAll);
  searchInput?.addEventListener('input', debounce(handleSearch, 250));
  seasonFilter?.addEventListener('change', handleSearch);
  episodeFilter?.addEventListener('change', handleSearch);
  vocabBtn?.addEventListener('click', openVocab);
  vocabClose?.addEventListener('click', closeVocab);
  vocabClearBtn?.addEventListener('click', clearVocab);
  bqClose?.addEventListener('click', closeBig);
  bigQuote?.addEventListener('click', e => { if(e.target===bigQuote) closeBig(); });
  steamGroup?.addEventListener('click', bumpSteam);

  document.querySelectorAll('.char-slot').forEach(slot => {
    slot.addEventListener('click', e => {
      if(e.target.closest('.speech-bubble')) return;
      showBig(slot.dataset.character);
    });
  });

  document.addEventListener('keydown', e => { if(e.key==='Escape') closeAll(); });
}

// ==================== DATA ====================
async function loadData() {
  try {
    const r = await fetch('data/friends_lines.json');
    allLines = await r.json();
    console.log(`✅ ${allLines.length} lines`);
  } catch(e) { console.error(e); allLines=[]; }
}

// ==================== TIME ====================
const times = ['', 'evening', 'night'];
function cycleTime() {
  timeOfDay = (timeOfDay+1)%3;
  cafeScene.className = 'cafe-scene ' + (times[timeOfDay]||'');
}

// ==================== BUBBLE CAROUSEL ====================
function linesFor(char) { return allLines.filter(l=>l.character.toLowerCase()===char); }

function startBubbleCarousel() {
  const chars = ['ross','rachel','monica','chandler','joey','phoebe'];
  let i = 0;
  function next() {
    if(isBubblePaused) return;
    document.querySelectorAll('.speech-bubble').forEach(b=>b.classList.remove('active'));
    const c = chars[i];
    const ls = linesFor(c);
    if(ls.length) {
      const q = ls[Math.floor(Math.random()*ls.length)];
      document.querySelectorAll(`.speech-bubble[data-character="${c}"]`).forEach(b=>{
        const t = b.querySelector('.bubble-text'); if(t) t.textContent = `"${q.text}"`;
        b.classList.add('active');
      });
    }
    i=(i+1)%6;
    setTimeout(next, 3500);
  }
  setTimeout(next, 1200);
}

// ==================== BIG QUOTE ====================
function showBig(char) {
  const ls = linesFor(char); if(!ls.length) return;
  const q = ls[Math.floor(Math.random()*ls.length)];
  isBubblePaused = true;
  document.querySelectorAll('.speech-bubble').forEach(b=>b.classList.remove('active'));
  const colors = {ross:'#4A90D9',rachel:'#E8739A',monica:'#F5A623',chandler:'#8E6FD4',joey:'#E85D5D',phoebe:'#5EBF8D'};
  bqChar.style.background = colors[char]||'#5C3D2E';
  bqChar.textContent = char;
  bqText.textContent = `"${q.text}"`;
  bigQuote.classList.remove('hidden');
}
function closeBig() { bigQuote.classList.add('hidden'); isBubblePaused=false; }

// ==================== STEAM ====================
function bumpSteam() { steamGroup.classList.add('bump'); setTimeout(()=>steamGroup.classList.remove('bump'),600); }

// ==================== SEARCH ====================
function buildSearchIndex() {
  if(typeof FlexSearch==='undefined'){console.warn('FlexSearch missing');return}
  searchIndex = new FlexSearch.Document({document:{id:'id',index:['text','context_before','context_after']},tokenize:'forward'});
  allLines.forEach(l=>searchIndex.add(l));
}
function handleSearch() {
  const q = searchInput.value.trim(), s = seasonFilter.value, e = episodeFilter.value;
  let r = allLines;
  if(q&&searchIndex){
    const ids=new Set(); searchIndex.search(q,{enrich:true}).forEach(g=>g.result.forEach(r=>ids.add(r.id)));
    r=r.filter(l=>ids.has(l.id));
  }else if(q){
    const ql=q.toLowerCase();
    r=r.filter(l=>l.text.toLowerCase().includes(ql)||l.context_before.some(c=>c.toLowerCase().includes(ql))||l.context_after.some(c=>c.toLowerCase().includes(ql)));
  }
  if(s) r=r.filter(l=>l.season===parseInt(s));
  if(e) r=r.filter(l=>l.episode===parseInt(e));
  renderResults(r,!!q||!!s||!!e);
}
function renderResults(r,hasQ){
  if(!hasQ){searchResults.innerHTML='';searchEmpty.classList.add('hidden');resultsCount.classList.add('hidden');return}
  if(!r.length){searchResults.innerHTML='';searchEmpty.classList.remove('hidden');resultsCount.classList.add('hidden');return}
  searchEmpty.classList.add('hidden');resultsCount.classList.remove('hidden');
  resultsCount.textContent=`✨ 找到 ${r.length} 条`;
  const cols={ross:'#4A90D9',rachel:'#E8739A',monica:'#F5A623',chandler:'#8E6FD4',joey:'#E85D5D',phoebe:'#5EBF8D'};
  searchResults.innerHTML=r.map(l=>`
    <div class="result-card">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-xs font-bold">S${l.season}E${String(l.episode).padStart(2,'0')}</span>
        <span class="text-xs font-bold text-white px-2 py-0.5 rounded-full" style="background:${cols[l.character.toLowerCase()]||'#5C3D2E'}">${l.character}</span>
      </div>
      <p class="text-sm font-semibold">${l.text}</p>
    </div>`).join('');
}

// ==================== PANELS ====================
function openSearch(){searchOverlay.classList.remove('hidden');panelOverlay.classList.remove('hidden');searchInput.focus()}
function closeSearch(){searchOverlay.classList.add('hidden');panelOverlay.classList.add('hidden')}
function openVocab(){vocabOverlay.classList.remove('hidden');panelOverlay.classList.remove('hidden');renderVocab()}
function closeVocab(){vocabOverlay.classList.add('hidden');panelOverlay.classList.add('hidden')}
function closeAll(){closeSearch();closeVocab();closeBig()}

// ==================== VOCAB ====================
function loadVocab(){try{const s=localStorage.getItem('friends_vocab');if(s)vocabWords=new Set(JSON.parse(s))}catch(e){vocabWords=new Set()}}
function saveVocab(){localStorage.setItem('friends_vocab',JSON.stringify([...vocabWords]))}
function addWord(w){vocabWords.add(w);saveVocab();renderVocab();flash(`已添加: "${w}" ✅`)}
function remWord(w){vocabWords.delete(w);saveVocab();renderVocab();flash(`已移除: "${w}"`)}
function clearVocab(){if(!confirm('清空全部生词？'))return;vocabWords.clear();saveVocab();renderVocab()}
function renderVocab(){
  if(!vocabWords.size){vocabList.innerHTML='<p class="text-sm text-gray-400 text-center py-8">还没有添加生词 👀</p>'}
  else {
    vocabList.innerHTML=[...vocabWords].sort().map(w=>`<div class="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium"><span>${w}</span><button data-word="${w}" class="text-red-400 hover:text-red-600 font-bold px-2">×</button></div>`).join('');
    vocabList.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>remWord(b.dataset.word)));
  }
}

// ==================== HOT ====================
function renderHotSearches() {
  const qs=['we were on a break','how you doin','pivot','smelly cat','unagi',"doesn't share food"];
  hotSearches.innerHTML=qs.map(q=>`<button class="hot-tag" data-query="${q}">${q}</button>`).join('');
  hotSearches.querySelectorAll('.hot-tag').forEach(b=>b.addEventListener('click',()=>{searchInput.value=b.dataset.query;handleSearch()}));
}

// ==================== FILTERS ====================
function populateFilters() {
  [...new Set(allLines.map(l=>l.season))].sort((a,b)=>a-b).forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=`第 ${s} 季`;seasonFilter.appendChild(o)});
}
seasonFilter?.addEventListener('change',()=>{
  episodeFilter.innerHTML='<option value="">全部集</option>';
  const s=seasonFilter.value;
  if(s){[...new Set(allLines.filter(l=>l.season===parseInt(s)).map(l=>l.episode))].sort((a,b)=>a-b).forEach(e=>{const o=document.createElement('option');o.value=e;o.textContent=`第 ${e} 集`;episodeFilter.appendChild(o)})}
});

// ==================== FLASH ====================
function flash(m){flashEl.textContent=m;requestAnimationFrame(()=>flashEl.classList.add('show'));clearTimeout(flashEl._t);flashEl._t=setTimeout(()=>flashEl.classList.remove('show'),1800)}

// ==================== UTILS ====================
function debounce(f,d){let t;return function(...a){clearTimeout(t);t=setTimeout(()=>f.apply(this,a),d)}}

// ==================== START ====================
init();