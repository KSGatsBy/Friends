// ============================================================================
// CENTRAL PERK · 3D ISOMETRIC VOXEL CAFE (Upgraded with Voxel Detail, Walking & Scenarios)
// ============================================================================

const FALLBACK_LINES = [
  {
    id: 1, season: 3, episode: 2, timestamp: "00:04:23", character: "Ross",
    text: "We were on a break!",
    translation: "我们当时已经分手（处于冷静期）了！",
    emotes: { rachel: "💢", chandler: "😬", monica: "🙄", joey: "👀" },
    context_before: ["Monica: What are you doing here?", "Ross: I came to talk to Rachel."],
    context_after: ["Rachel: You had no right to sleep with that girl!", "Chandler: Oh boy, here we go again."]
  },
  {
    id: 2, season: 1, episode: 1, timestamp: "00:02:15", character: "Joey",
    text: "How you doin'?",
    translation: "近来可好啊，美女？",
    emotes: { rachel: "😳", phoebe: "😂", monica: "🤦‍♀️", chandler: "😏" },
    context_before: ["Rachel: Hi, I'm Rachel. I'm new here.", "Joey: Oh, really? Well, let me tell you something."],
    context_after: ["Rachel: Is that your signature line?", "Monica: Joey, stop it. She just got here."]
  },
  {
    id: 3, season: 5, episode: 16, timestamp: "00:12:35", character: "Ross",
    text: "PIVOT! PIVOT! PIVOT!",
    translation: "拐弯！往这边拐！拐啊！",
    emotes: { chandler: "💢", rachel: "😂", joey: "💪", monica: "😮" },
    context_before: ["Chandler: I can't push this couch anymore.", "Ross: You just have to turn it slightly."],
    context_after: ["Chandler: SHUT UP! SHUT UP! SHUT UP!", "Rachel: I don't think it's gonna pivot anymore."]
  },
  {
    id: 4, season: 2, episode: 6, timestamp: "00:08:42", character: "Phoebe",
    text: "Smelly cat, smelly cat, what are they feeding you?",
    translation: "臭臭猫，臭臭猫，他们到底给你喂了什么？",
    emotes: { rachel: "🎵", monica: "👏", joey: "🎶", chandler: "😺", ross: "👏" },
    context_before: ["Monica: Phoebe, are you playing at Central Perk tonight?", "Phoebe: Yes! I'm walking up to the mic right now!"],
    context_after: ["Rachel: Oh, that's... weirdly catchy.", "Phoebe: Thanks! It's not his fault."]
  },
  {
    id: 5, season: 4, episode: 12, timestamp: "00:15:10", character: "Chandler",
    text: "Could I BE any more sarcastic?",
    translation: "我还能再讽刺一点吗？",
    emotes: { monica: "😂", joey: "🤣", ross: "😑", rachel: "☕" },
    context_before: ["Monica: Chandler, can you take this seriously for once?", "Chandler: I am taking it very seriously."],
    context_after: ["Monica: That tone is exactly what I'm talking about.", "Joey: Honestly, I think he's got a point."]
  },
  {
    id: 6, season: 8, episode: 14, timestamp: "00:05:30", character: "Rachel",
    text: "No uterus, no opinion.",
    translation: "没子宫的人，没资格发表意见。",
    emotes: { monica: "👏", phoebe: "💯", ross: "🤐", chandler: "😬" },
    context_before: ["Ross: Wait, Braxton Hicks contractions aren't even real pain, right?", "Monica: Ross, tread very carefully."],
    context_after: ["Ross: I'm just reading what the parenting book says!", "Monica: Seriously, Ross, stop talking."]
  },
  {
    id: 7, season: 10, episode: 3, timestamp: "00:11:20", character: "Monica",
    text: "I KNOW!",
    translation: "我知道！！",
    emotes: { rachel: "❤️", chandler: "🙉", joey: "😆", phoebe: "✨" },
    context_before: ["Rachel: Can you believe we always get the best couch in Central Perk?", "Phoebe: And Gunther always brings our coffee first!"],
    context_after: ["Chandler: And there's the volume we all love.", "Joey: My ears are still ringing."]
  },
  {
    id: 8, season: 10, episode: 9, timestamp: "00:18:45", character: "Joey",
    text: "Joey doesn't share food!",
    translation: "乔伊从不跟人分享食物！",
    emotes: { joey: "🍰", rachel: "😂", phoebe: "🍟", monica: "🙄", gunther: "🧁" },
    context_before: ["Rachel: Joey, why are you staring at Gunther's cake counter?", "Joey: Everything was fine until she reached for my fries last night."],
    context_after: ["Phoebe: You didn't let her have one single fry?", "Joey: It's a rule! That chocolate cake on the bar is all mine too."]
  },
  {
    id: 9, season: 6, episode: 17, timestamp: "00:03:50", character: "Ross",
    text: "Unagi is a state of total awareness.",
    translation: "“鳗鱼（Unagi）”是一种全然戒备的终极境界。",
    emotes: { rachel: "🍣", phoebe: "😂", chandler: "🤦‍♂️" },
    context_before: ["Rachel: Ross, why are you touching your temples like that?", "Phoebe: Did you get another bad headache?"],
    context_after: ["Rachel: Pretty sure unagi is freshwater eel at the sushi bar.", "Chandler: Say it again and I'll order you with soy sauce."]
  },
  {
    id: 10, season: 2, episode: 14, timestamp: "00:19:40", character: "Phoebe",
    text: "See? He's her lobster!",
    translation: "看到了吧？他就是她的那只龙虾（天生一对）！",
    emotes: { ross: "❤️", rachel: "🦞", monica: "🥰", joey: "❓" },
    context_before: ["Joey: Why do you keep calling Ross a lobster?", "Phoebe: Because lobsters fall in love and mate for life!"],
    context_after: ["Monica: They actually walk around the tank holding claws?", "Chandler: Great, now I feel guilty about seafood."]
  }
];

const WORD_DICT = {
  "break": { phonetic: "/breɪk/", meaning: "n. 休息；暂停；（感情的）分手冷静期" },
  "doin": { phonetic: "/ˈduːɪn/", meaning: "v. (口语) doing，近来如何" },
  "pivot": { phonetic: "/ˈpɪvət/", meaning: "v./n. 枢轴旋转；转向；拐弯" },
  "smelly": { phonetic: "/ˈsmeli/", meaning: "adj. 有臭味的，难闻的" },
  "feeding": { phonetic: "/ˈfiːdɪŋ/", meaning: "v. 喂养，给……食物" },
  "sarcastic": { phonetic: "/sɑːrˈkæstɪk/", meaning: "adj. 讽刺的，挖苦的，阴阳怪气的" },
  "uterus": { phonetic: "/ˈjuːtərəs/", meaning: "n. 子宫" },
  "opinion": { phonetic: "/əˈpɪnjən/", meaning: "n. 意见，看法，主张" },
  "share": { phonetic: "/ʃer/", meaning: "v. 分享，分担，共用" },
  "unagi": { phonetic: "/uːˈnɑːɡi/", meaning: "n. 日语“淡水鳗鱼”；Ross 自创的“全然戒备状态”" },
  "awareness": { phonetic: "/əˈwernəs/", meaning: "n. 警觉，意识，察觉" },
  "total": { phonetic: "/ˈtoʊtl/", meaning: "adj. 完全的，彻底的，全部的" },
  "lobster": { phonetic: "/ˈlɑːbstər/", meaning: "n. 龙虾；《老友记》俚语指“灵魂伴侣”" },
  "sucks": { phonetic: "/sʌks/", meaning: "v. (俚语) 糟透了，令人不快" },
  "uncomfortable": { phonetic: "/ʌnˈkʌmftəbl/", meaning: "adj. 不自在的，尴尬的" },
  "sandwich": { phonetic: "/ˈsænwɪtʃ/", meaning: "n. 三明治" },
  "coffee": { phonetic: "/ˈkɔːfi/", meaning: "n. 咖啡" },
  "refill": { phonetic: "/ˈriːfɪl/", meaning: "n./v. 续杯，再装满" }
};

const CHAR_META = {
  rachel:   { name: "Rachel",   color: "#E8739A", role: "橙色大沙发左座" },
  monica:   { name: "Monica",   color: "#F5A623", role: "橙色大沙发中座" },
  chandler: { name: "Chandler", color: "#8E6FD4", role: "橙色大沙发右座" },
  ross:     { name: "Ross",     color: "#4A90D9", role: "右侧单人灰扶手椅" },
  joey:     { name: "Joey",     color: "#E85D5D", role: "吧台橙色高脚凳" },
  phoebe:   { name: "Phoebe",   color: "#5EBF8D", role: "右侧红沙发吉他角" },
  gunther:  { name: "Gunther",  color: "#D4AF37", role: "左侧咖啡吧台店长" }
};

// ==================== FINE-GRAINED MAGICAVOXEL PIXEL TEXTURES ====================
const PixelTextures = {
  _cache: {},
  createCanvas(w, h, drawFn, repeatX = 1, repeatY = 1) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx, w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    if (repeatX > 1 || repeatY > 1) {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatX, repeatY);
    }
    return tex;
  },

  // Stippled / Dithered Voxel Surface (gives that crisp MagicaVoxel micro-block feel!)
  voxelGrain(baseHex, variance = 14, rx = 2, ry = 2) {
    const key = `${baseHex}_${variance}_${rx}_${ry}`;
    if (this._cache[key]) return this._cache[key];
    const col = new THREE.Color(baseHex);
    const r0 = Math.round(col.r * 255);
    const g0 = Math.round(col.g * 255);
    const b0 = Math.round(col.b * 255);

    const tex = this.createCanvas(16, 16, (ctx) => {
      for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
          const hash = ((x * 37 + y * 17) % 7) - 3;
          const d = Math.round((hash / 3) * variance);
          const r = Math.min(255, Math.max(0, r0 + d));
          const g = Math.min(255, Math.max(0, g0 + d));
          const b = Math.min(255, Math.max(0, b0 + d));
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }, rx, ry);
    this._cache[key] = tex;
    return tex;
  },

  slateFloor(rx = 10, ry = 8) {
    return this.createCanvas(32, 32, (ctx) => {
      ctx.fillStyle = '#5c605a';
      ctx.fillRect(0, 0, 32, 32);
      const tones = ['#555953', '#626660', '#585c56', '#666a64'];
      for (let x = 0; x < 32; x += 2) {
        for (let y = 0; y < 32; y += 2) {
          ctx.fillStyle = tones[((x * 7 + y * 13) % tones.length)];
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }, rx, ry);
  },

  greenMarble(rx = 4, ry = 2) {
    return this.createCanvas(32, 32, (ctx) => {
      ctx.fillStyle = '#758574';
      ctx.fillRect(0, 0, 32, 32);
      const veins = ['#596959', '#93a38f', '#b5c2ae', '#4a574a'];
      for (let i = 0; i < 24; i++) {
        ctx.fillStyle = veins[i % veins.length];
        const vx = (i * 11) % 30;
        const vy = (i * 7) % 30;
        ctx.fillRect(vx, vy, 4, 1);
        ctx.fillRect(vx + 1, vy + 1, 3, 1);
      }
    }, rx, ry);
  },

  runnerRug() {
    return this.createCanvas(48, 64, (ctx, w, h) => {
      ctx.fillStyle = '#dfd0b8';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#69221f';
      ctx.lineWidth = 3;
      ctx.strokeRect(3, 3, w - 6, h - 6);
      ctx.fillStyle = '#8c2d22';
      ctx.fillRect(7, 7, w - 14, h - 14);
      ctx.strokeStyle = '#e0c699';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, w - 20, h - 20);
      for (let x = 13; x < w - 13; x += 6) {
        for (let y = 13; y < h - 13; y += 6) {
          ctx.fillStyle = (x + y) % 12 === 0 ? '#2b211e' : '#d99b52';
          ctx.fillRect(x, y, 3, 3);
        }
      }
    });
  },

  floralCushion() {
    return this.createCanvas(16, 16, (ctx) => {
      ctx.fillStyle = '#dfc8ab';
      ctx.fillRect(0, 0, 16, 16);
      [[2,2,'#c95b48'],[9,3,'#6b8c5e'],[5,9,'#d48846'],[11,11,'#c95b48'],[3,13,'#6b8c5e']].forEach(([x,y,c]) => {
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 3, 3);
      });
    }, 2, 2);
  },

  woodPlanks(rx = 8, ry = 8) {
    return this.createCanvas(32, 32, (ctx) => {
      const tones = ['#5a3b26', '#523522', '#63422b', '#4b301e'];
      for (let row = 0; row < 4; row++) {
        ctx.fillStyle = tones[row % tones.length];
        ctx.fillRect(0, row * 8, 32, 7);
        ctx.fillStyle = '#382214';
        ctx.fillRect(0, row * 8 + 7, 32, 1);
        ctx.fillRect((row * 11) % 32, row * 8, 1, 8);
        // Subtle voxel grain dots
        ctx.fillStyle = 'rgba(255,220,180,0.06)';
        for (let x = 0; x < 32; x += 3) {
          ctx.fillRect(x, row * 8 + (x % 5), 2, 1);
        }
      }
    }, rx, ry);
  },

  brick(rx = 4, ry = 3) {
    return this.createCanvas(32, 32, (ctx) => {
      ctx.fillStyle = '#cdb29e';
      ctx.fillRect(0, 0, 32, 32);
      const colors = ['#9e362b', '#b24032', '#872a20', '#ba4a3a'];
      for (let row = 0; row < 4; row++) {
        const y = row * 8;
        const offset = (row % 2) * 8;
        for (let col = -1; col < 3; col++) {
          ctx.fillStyle = colors[(row + col + 4) % colors.length];
          ctx.fillRect(col * 16 + offset + 1, y + 1, 14, 6);
          ctx.fillStyle = 'rgba(255,230,200,0.14)';
          ctx.fillRect(col * 16 + offset + 1, y + 1, 14, 1);
        }
      }
    }, rx, ry);
  },

  persianRug() {
    return this.createCanvas(64, 48, (ctx, w, h) => {
      ctx.fillStyle = '#dfd0b8';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#69221f';
      ctx.fillRect(3, 3, w - 6, h - 6);
      ctx.strokeStyle = '#d9ac5e';
      ctx.lineWidth = 2;
      ctx.strokeRect(6, 6, w - 12, h - 12);
      ctx.fillStyle = '#401615';
      ctx.fillRect(10, 10, w - 20, h - 20);
      for (let x = 13; x < w - 13; x += 6) {
        for (let y = 12; y < h - 12; y += 6) {
          ctx.fillStyle = '#d4a259';
          ctx.fillRect(x, y, 4, 4);
          ctx.fillStyle = (x + y) % 2 === 0 ? '#b84035' : '#e6d7be';
          ctx.fillRect(x + 1, y + 1, 2, 2);
        }
      }
    });
  },

  stageTiles(rx = 6, ry = 8) {
    return this.createCanvas(16, 16, (ctx) => {
      ctx.fillStyle = '#e5d8c3';
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = '#cfc0a6';
      ctx.fillRect(0, 0, 16, 1);
      ctx.fillRect(0, 0, 1, 16);
      ctx.fillStyle = '#2e241d';
      ctx.fillRect(13, 13, 3, 3);
    }, rx, ry);
  },

  stripedCurtain() {
    return this.createCanvas(32, 32, (ctx) => {
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#2b5e3b' : '#f4ecdc';
        ctx.fillRect(i * 4, 0, 4, 32);
      }
    }, 1, 2);
  },

  motorcyclePoster() {
    return this.createCanvas(64, 44, (ctx, w, h) => {
      ctx.fillStyle = '#d86428';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f5ad47';
      ctx.fillRect(4, 4, w - 8, h - 8);
      ctx.fillStyle = '#c94322';
      ctx.fillRect(6, 18, w - 12, 18);
      ctx.fillStyle = '#1d1412';
      ctx.fillRect(12, 24, 12, 12);
      ctx.fillRect(40, 24, 12, 12);
      ctx.fillStyle = '#e0d9cc';
      ctx.fillRect(15, 27, 6, 6);
      ctx.fillRect(43, 27, 6, 6);
      ctx.fillStyle = '#991f16';
      ctx.fillRect(20, 16, 24, 10);
      ctx.fillStyle = '#f4e8d1';
      ctx.fillRect(24, 18, 12, 4);
      ctx.fillStyle = '#1d1412';
      ctx.fillRect(38, 10, 6, 8);
    });
  },

  serviceSign() {
    // High-resolution crisp CENTRAL PERK hanging sign texture (512x160 with LinearFilter for sharp typography!)
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 160;
    const ctx = c.getContext('2d');

    // Deep vintage red background with warm cream-gold double border
    ctx.fillStyle = '#c4211a';
    ctx.fillRect(0, 0, 512, 160);
    ctx.strokeStyle = '#fff3db';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 492, 140);
    ctx.strokeStyle = '#e5a93c';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 472, 120);

    // Left & Right Hunter-Green Coffee Cup Emblem Accents
    ctx.fillStyle = '#1d5c3f';
    ctx.beginPath();
    ctx.arc(68, 80, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff3db';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Cute white coffee cup + steam inside left emblem
    ctx.fillStyle = '#fff8eb';
    ctx.fillRect(52, 74, 28, 20);
    ctx.strokeStyle = '#fff8eb';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(82, 84, 6, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.fillRect(48, 96, 36, 4);
    // Steam lines
    ctx.lineWidth = 3;
    [58, 66, 74].forEach(sx => {
      ctx.beginPath();
      ctx.moveTo(sx, 69);
      ctx.lineTo(sx + 2, 57);
      ctx.stroke();
    });

    // Ultra-crisp "CENTRAL PERK" main title
    ctx.fillStyle = '#2b0906';
    ctx.font = '900 44px "Georgia", "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CENTRAL PERK', 284, 74);

    ctx.fillStyle = '#fff8eb';
    ctx.fillText('CENTRAL PERK', 281, 71);

    // Subtitle ribbon
    ctx.fillStyle = '#ffd97d';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('★ COFFEE · TEA · PASTRIES ★', 281, 114);

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  },

  centralPerkWindowLogo() {
    // High-resolution crisp CENTRAL PERK window decal (512x256)
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext('2d');

    ctx.clearRect(0, 0, 512, 256);

    // Hunter-green oval center medallion
    ctx.fillStyle = '#1f5e3b';
    ctx.beginPath();
    ctx.ellipse(256, 118, 115, 76, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#f5d478';
    ctx.stroke();

    // Steaming coffee cup above ribbon
    ctx.fillStyle = '#fff8eb';
    ctx.fillRect(236, 56, 40, 28);
    ctx.fillRect(228, 86, 56, 6);
    ctx.strokeStyle = '#ff7b24';
    ctx.lineWidth = 4;
    [244, 256, 268].forEach(sx => {
      ctx.beginPath();
      ctx.moveTo(sx, 50);
      ctx.lineTo(sx, 34);
      ctx.stroke();
    });

    // Iconic Red Banner across center
    ctx.fillStyle = '#cf291d';
    ctx.fillRect(46, 102, 420, 58);
    ctx.strokeStyle = '#fff5e4';
    ctx.lineWidth = 5;
    ctx.strokeRect(50, 106, 412, 50);

    // Crisp White "CENTRAL PERK" text
    ctx.fillStyle = '#1f0805';
    ctx.font = '900 40px "Georgia", "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CENTRAL PERK', 259, 134);
    ctx.fillStyle = '#fff8eb';
    ctx.fillText('CENTRAL PERK', 256, 131);

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  },

  chalkboard() {
    return this.createCanvas(32, 48, (ctx, w, h) => {
      ctx.fillStyle = '#1e2622';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f0d58c';
      ctx.fillRect(6, 6, 20, 3);
      ctx.fillStyle = '#d4e8dc';
      for (let y = 14; y < 40; y += 5) {
        ctx.fillRect(5, y, 14, 2);
        ctx.fillStyle = '#e89954';
        ctx.fillRect(22, y, 5, 2);
        ctx.fillStyle = '#d4e8dc';
      }
    });
  },

  leopardPrint() {
    return this.createCanvas(16, 16, (ctx) => {
      ctx.fillStyle = '#d89b48';
      ctx.fillRect(0, 0, 16, 16);
      [[2,2],[9,3],[5,8],[12,10],[3,13],[10,14]].forEach(([x, y]) => {
        ctx.fillStyle = '#26170c';
        ctx.fillRect(x, y, 3, 3);
        ctx.fillStyle = '#874c18';
        ctx.fillRect(x+1, y+1, 1, 1);
      });
    }, 2, 2);
  },

  floralRed() {
    return this.createCanvas(16, 16, (ctx) => {
      ctx.fillStyle = '#a3211e';
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = '#de8d47';
      ctx.fillRect(3, 3, 3, 3);
      ctx.fillRect(11, 10, 3, 3);
      ctx.fillStyle = '#f5d79c';
      ctx.fillRect(4, 4, 1, 1);
      ctx.fillRect(12, 11, 1, 1);
    }, 3, 2);
  },

  // ==================== MONICA'S APARTMENT TEXTURES ====================
  monicaTerracottaTiles(rx = 13, ry = 9) {
    return this.createCanvas(32, 32, (ctx) => {
      ctx.fillStyle = '#a64b3d';
      ctx.fillRect(0, 0, 32, 32);
      const tones = ['#9e4335', '#ad5244', '#983f31', '#a4483a'];
      for (let tx = 0; tx < 2; tx++) {
        for (let ty = 0; ty < 2; ty++) {
          const ox = tx * 16;
          const oy = ty * 16;
          ctx.fillStyle = tones[(tx + ty * 2) % tones.length];
          ctx.fillRect(ox + 1, oy + 1, 14, 14);
          // Subtle inner bevel highlight
          ctx.fillStyle = 'rgba(255, 210, 185, 0.10)';
          ctx.fillRect(ox + 2, oy + 2, 12, 1);
          // Grout lines
          ctx.fillStyle = '#752f24';
          ctx.fillRect(ox, oy, 16, 1);
          ctx.fillRect(ox, oy, 1, 16);
          // Signature tiny corner diamond accent (matching the physical miniature tile floor!)
          ctx.fillStyle = '#4a1c15';
          ctx.fillRect(ox - 1, oy - 1, 3, 3);
          ctx.fillStyle = '#d89b7c';
          ctx.fillRect(ox, oy, 1, 1);
        }
      }
    }, rx, ry);
  },

  monicaHardwood(rx = 6, ry = 4) {
    return this.createCanvas(32, 32, (ctx) => {
      const planks = ['#b86830', '#a85a24', '#c4743b', '#9c5220'];
      for (let r = 0; r < 4; r++) {
        ctx.fillStyle = planks[r % planks.length];
        ctx.fillRect(0, r * 8, 32, 7);
        ctx.fillStyle = '#6e3612';
        ctx.fillRect(0, r * 8 + 7, 32, 1);
        ctx.fillRect((r * 13) % 32, r * 8, 1, 8);
      }
    }, rx, ry);
  },

  monicaLivingRug() {
    return this.createCanvas(64, 64, (ctx, w, h) => {
      ctx.fillStyle = '#efe6d5';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#9c7a5b';
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, w - 8, h - 8);
      ctx.strokeStyle = '#c45b4a';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(8, 8, w - 16, h - 16);
      ctx.fillStyle = '#f5ede0';
      ctx.fillRect(11, 11, w - 22, h - 22);
      // Ornate floral medallions & corners
      for (let x = 14; x < w - 14; x += 8) {
        for (let y = 14; y < h - 14; y += 8) {
          ctx.fillStyle = (x + y) % 16 === 0 ? '#c96b58' : '#8a9c78';
          ctx.fillRect(x, y, 4, 4);
          ctx.fillStyle = '#d9b26f';
          ctx.fillRect(x + 1, y + 1, 2, 2);
        }
      }
    });
  },

  floralCurtain(rx = 4, ry = 4) {
    return this.createCanvas(64, 64, (ctx) => {
      ctx.fillStyle = '#f7e8b8';
      ctx.fillRect(0, 0, 64, 64);
      const flowers = [
        [10, 10], [38, 14], [22, 36], [50, 44], [12, 52], [46, 20], [28, 18], [34, 54]
      ];
      flowers.forEach(([fx, fy]) => {
        ctx.fillStyle = '#4e7d44';
        ctx.fillRect(fx - 2, fy + 4, 10, 4);
        ctx.fillStyle = '#c93434';
        ctx.fillRect(fx, fy, 8, 8);
        ctx.fillStyle = '#f59898';
        ctx.fillRect(fx + 2, fy + 2, 4, 4);
        ctx.fillStyle = '#fbe282';
        ctx.fillRect(fx + 3, fy + 3, 2, 2);
      });
    }, rx, ry);
  },

  redPlaidThrow(rx = 2, ry = 2) {
    return this.createCanvas(16, 16, (ctx) => {
      ctx.fillStyle = '#faf4eb';
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = 'rgba(196, 36, 36, 0.75)';
      ctx.fillRect(0, 0, 16, 5);
      ctx.fillRect(0, 8, 16, 4);
      ctx.fillRect(0, 0, 5, 16);
      ctx.fillRect(8, 0, 4, 16);
    }, rx, ry);
  },

  redFloralPillow() {
    return this.createCanvas(16, 16, (ctx) => {
      ctx.fillStyle = '#fcf9f2';
      ctx.fillRect(0, 0, 16, 16);
      [[3, 3], [10, 4], [5, 10], [11, 11]].forEach(([x, y]) => {
        ctx.fillStyle = '#3d703b';
        ctx.fillRect(x - 1, y + 2, 4, 2);
        ctx.fillStyle = '#cf2727';
        ctx.fillRect(x, y, 3, 3);
      });
    }, 2, 2);
  },

  frenchPoster() {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 160;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#dfd3be';
    ctx.fillRect(0, 0, 128, 160);
    ctx.strokeStyle = '#8c6f46';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 112, 144);
    // Vintage header text lines
    ctx.fillStyle = '#3b2d22';
    ctx.font = 'bold 12px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('JOUETS · PARIS', 64, 28);
    // Vintage diagonal touring car silhouette (matching the right wall poster in reference!)
    ctx.save();
    ctx.translate(64, 92);
    ctx.rotate(-0.35);
    ctx.fillStyle = '#38302a';
    ctx.fillRect(-34, -10, 68, 20);
    ctx.fillStyle = '#5c4e43';
    ctx.fillRect(-18, -22, 36, 14);
    ctx.fillStyle = '#1e1916';
    [[-24, 12], [22, 12]].forEach(([wx, wy]) => {
      ctx.beginPath();
      ctx.arc(wx, wy, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4c5ae';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    ctx.restore();
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  },

  softShadowFloor() {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 18, 64, 64, 62);
    grad.addColorStop(0, 'rgba(35, 25, 15, 0.28)');
    grad.addColorStop(0.65, 'rgba(35, 25, 15, 0.10)');
    grad.addColorStop(1, 'rgba(35, 25, 15, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  },

  monicaBathroomTile(rx = 4, ry = 4) {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const tileSize = 64;
    for (let y = 0; y < 128; y += tileSize) {
      for (let x = 0; x < 128; x += tileSize) {
        const isWhite = ((x / tileSize) + (y / tileSize)) % 2 === 0;
        ctx.fillStyle = isWhite ? '#f6f4ee' : '#1e2024';
        ctx.fillRect(x, y, tileSize, tileSize);
        // Subtle porcelain bevel
        ctx.strokeStyle = isWhite ? '#ded8cc' : '#33373d';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
      }
    }
    ctx.strokeStyle = '#c5beaf';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(64, 0); ctx.lineTo(64, 128);
    ctx.moveTo(0, 64); ctx.lineTo(128, 64);
    ctx.stroke();
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(rx, ry);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    return tex;
  },

  kitchenTile(rx = 4, ry = 8) {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f8f7f5';
    ctx.fillRect(0, 0, 128, 64);
    ctx.strokeStyle = '#d6d2ca';
    ctx.lineWidth = 2;
    // Brick subway tile pattern
    ctx.strokeRect(0, 0, 64, 32);
    ctx.strokeRect(64, 0, 64, 32);
    ctx.strokeRect(-32, 32, 64, 32);
    ctx.strokeRect(32, 32, 64, 32);
    ctx.strokeRect(96, 32, 64, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(rx, ry);
    return tex;
  },

  // ==================== JOEY & CHANDLER'S APARTMENT & HALLWAY TEXTURES ====================
  joeyParquet(rx = 12, ry = 8) {
    return this.createCanvas(32, 32, (ctx) => {
      // 90s Parquet Wood Floor: Alternating 16x16 blocks of horizontal vs vertical planks
      const tonesH = ['#61391e', '#522e17', '#6e4124', '#4c2813'];
      const tonesV = ['#5a341b', '#482612', '#693e21', '#442310'];

      // Quadrant 0: Top-Left (Horizontal slats)
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = tonesH[i % tonesH.length];
        ctx.fillRect(0, i * 4, 15, 3);
        ctx.fillStyle = '#32180a';
        ctx.fillRect(0, i * 4 + 3, 16, 1);
      }
      // Quadrant 1: Top-Right (Vertical slats)
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = tonesV[i % tonesV.length];
        ctx.fillRect(16 + i * 4, 0, 3, 15);
        ctx.fillStyle = '#32180a';
        ctx.fillRect(16 + i * 4 + 3, 0, 1, 16);
      }
      // Quadrant 2: Bottom-Left (Vertical slats)
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = tonesV[(i + 2) % tonesV.length];
        ctx.fillRect(i * 4, 16, 3, 15);
        ctx.fillStyle = '#32180a';
        ctx.fillRect(i * 4 + 3, 16, 1, 16);
      }
      // Quadrant 3: Bottom-Right (Horizontal slats)
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = tonesH[(i + 2) % tonesH.length];
        ctx.fillRect(16, 16 + i * 4, 15, 3);
        ctx.fillStyle = '#32180a';
        ctx.fillRect(16, 16 + i * 4 + 3, 16, 1);
      }
      // Dividing border lines
      ctx.fillStyle = '#281308';
      ctx.fillRect(15, 0, 1, 32);
      ctx.fillRect(0, 15, 32, 1);
    }, rx, ry);
  },

  joeyStripedRug() {
    return this.createCanvas(64, 64, (ctx, w, h) => {
      // Modern off-white woven geometric rug under Barcaloungers (matching reference photo!)
      ctx.fillStyle = '#f0ebe1';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#635d55';
      ctx.lineWidth = 1.5;
      // Cross-hatched diagonal thin accent lines
      for (let x = -32; x < w + 32; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 48, h);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(70,65,58,0.55)';
      ctx.lineWidth = 1.0;
      for (let x = w + 32; x > -32; x -= 14) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - 36, h);
        ctx.stroke();
      }
      // Border trim
      ctx.strokeStyle = '#c5bcaf';
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, w - 4, h - 4);
    });
  },

  magnaDoodle() {
    return this.createCanvas(64, 64, (ctx, w, h) => {
      // Iconic Blue Magna Doodle sketch board on Joey's front door
      ctx.fillStyle = '#1c5ec7';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#0f4496';
      ctx.strokeRect(1, 1, w - 2, h - 2);
      // Yellow slide eraser knob at bottom
      ctx.fillStyle = '#f5c518';
      ctx.fillRect(12, h - 8, 40, 5);
      ctx.fillStyle = '#d99e08';
      ctx.fillRect(28, h - 9, 8, 7);
      // Drawing screen
      ctx.fillStyle = '#dbe1e6';
      ctx.fillRect(8, 8, w - 16, h - 20);
      // Magna doodle sketch: Stick figure Joey + pizza slice doodle!
      ctx.fillStyle = '#343c44';
      ctx.beginPath();
      ctx.arc(32, 22, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(31, 28, 2, 12);
      ctx.fillRect(24, 32, 16, 2);
      ctx.fillRect(27, 40, 4, 2);
      ctx.fillRect(33, 40, 4, 2);
      // Little heart / note
      ctx.fillStyle = '#c72424';
      ctx.fillRect(44, 18, 5, 4);
      ctx.fillRect(46, 22, 3, 2);
    });
  },

  foosballTurf() {
    return this.createCanvas(64, 48, (ctx, w, h) => {
      // Foosball Pitch: Vibrant green with white markings
      ctx.fillStyle = '#267838';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, w - 6, h - 6);
      // Halfway line & center circle
      ctx.beginPath();
      ctx.moveTo(w / 2, 3);
      ctx.lineTo(w / 2, h - 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 7, 0, Math.PI * 2);
      ctx.stroke();
      // Goal penalty boxes
      ctx.strokeRect(3, 14, 8, 20);
      ctx.strokeRect(w - 11, 14, 8, 20);
    });
  },

  barcaloungerLeather() {
    return this.createCanvas(32, 32, (ctx) => {
      // Chocolate tufted leather for Joey and Chandler's recliners
      ctx.fillStyle = '#382012';
      ctx.fillRect(0, 0, 32, 32);
      const tones = ['#452817', '#3d2314', '#4b2d1a', '#341d10'];
      for (let x = 0; x < 32; x += 8) {
        for (let y = 0; y < 32; y += 8) {
          ctx.fillStyle = tones[((x + y) / 8) % tones.length];
          ctx.fillRect(x + 1, y + 1, 6, 6);
          // Tuft button shadow & highlight
          ctx.fillStyle = '#1c0e07';
          ctx.fillRect(x + 3, y + 3, 2, 2);
          ctx.fillStyle = 'rgba(255,210,170,0.14)';
          ctx.fillRect(x + 2, y + 1, 4, 1);
        }
      }
    }, 2, 2);
  },

  hallwayRunner(rx = 4, ry = 10) {
    return this.createCanvas(32, 32, (ctx) => {
      // 90s Manhattan Apartment Hallway Carpet
      ctx.fillStyle = '#c7bca8';
      ctx.fillRect(0, 0, 32, 32);
      // Borders along left and right edges
      ctx.fillStyle = '#6b4d34';
      ctx.fillRect(0, 0, 4, 32);
      ctx.fillRect(28, 0, 4, 32);
      ctx.fillStyle = '#8f6e4e';
      ctx.fillRect(4, 0, 2, 32);
      ctx.fillRect(26, 0, 2, 32);
      // Small geometric diamond pattern in center
      for (let y = 2; y < 32; y += 8) {
        ctx.fillStyle = '#8a7962';
        ctx.fillRect(15, y, 2, 2);
        ctx.fillRect(14, y + 1, 4, 1);
        ctx.fillRect(10, y + 4, 2, 2);
        ctx.fillRect(20, y + 4, 2, 2);
      }
    }, rx, ry);
  },

  nycSkyline(theme = 'studio') {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext('2d');

    // 1. Sky Gradient & Atmosphere
    let skyGrad;
    if (theme === 'day') {
      skyGrad = ctx.createLinearGradient(0, 0, 0, 160);
      skyGrad.addColorStop(0, '#5397e0');
      skyGrad.addColorStop(0.65, '#99cbf7');
      skyGrad.addColorStop(1, '#dff0fd');
    } else if (theme === 'evening') {
      skyGrad = ctx.createLinearGradient(0, 0, 0, 160);
      skyGrad.addColorStop(0, '#3a1e4a');
      skyGrad.addColorStop(0.35, '#a33d5a');
      skyGrad.addColorStop(0.70, '#e86a43');
      skyGrad.addColorStop(1, '#fec059');
    } else if (theme === 'night') {
      skyGrad = ctx.createLinearGradient(0, 0, 0, 160);
      skyGrad.addColorStop(0, '#090d1c');
      skyGrad.addColorStop(0.55, '#121a36');
      skyGrad.addColorStop(1, '#1e2b54');
    } else { // studio / default
      skyGrad = ctx.createLinearGradient(0, 0, 0, 160);
      skyGrad.addColorStop(0, '#9bb6d3');
      skyGrad.addColorStop(0.55, '#c5d8ea');
      skyGrad.addColorStop(1, '#e8f1f8');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 512, 256);

    // 2. Stars & Moon (Night) or Fluffy Clouds (Day) or Sunset Glow (Evening)
    if (theme === 'night') {
      // Moon
      ctx.fillStyle = '#fffae8';
      ctx.beginPath();
      ctx.arc(420, 38, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f1730';
      ctx.beginPath();
      ctx.arc(425, 36, 13, 0, Math.PI * 2);
      ctx.fill();
      // Stars
      ctx.fillStyle = '#ffffff';
      const starCoords = [[45,22],[90,45],[135,18],[180,52],[240,30],[310,24],[360,60],[470,35],[65,68],[285,48]];
      starCoords.forEach(([sx, sy]) => {
        ctx.fillRect(sx, sy, 2, 2);
      });
    } else if (theme === 'day') {
      // Fluffy pixel clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
      [[60, 35, 70, 16], [85, 25, 45, 18], [280, 42, 80, 18], [315, 30, 55, 20], [440, 48, 55, 15]].forEach(([cx, cy, cw, ch]) => {
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, ch / 2);
        else ctx.rect(cx, cy, cw, ch);
        ctx.fill();
      });
    } else if (theme === 'evening') {
      // Warm glowing sunset disc
      const sunGrad = ctx.createRadialGradient(260, 120, 4, 260, 120, 55);
      sunGrad.addColorStop(0, 'rgba(255, 240, 180, 0.95)');
      sunGrad.addColorStop(0.4, 'rgba(255, 180, 80, 0.55)');
      sunGrad.addColorStop(1, 'rgba(255, 120, 60, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(260, 120, 55, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Distant Manhattan High-rise Silhouette (Empire State / Mid-town)
    const distColor = theme === 'night' ? '#182442' : (theme === 'evening' ? '#683652' : '#8fa6bd');
    ctx.fillStyle = distColor;
    const distBuildings = [
      [20, 75, 42, 100], [75, 90, 36, 85], [125, 60, 24, 115], // Spire
      [133, 40, 8, 20], [136, 28, 2, 12],
      [160, 85, 48, 90], [220, 70, 40, 105], [275, 95, 45, 80],
      [335, 65, 38, 110], [385, 80, 50, 95], [450, 72, 42, 103]
    ];
    distBuildings.forEach(([bx, by, bw, bh]) => ctx.fillRect(bx, by, bw, bh));

    // 4. Midground Greenwich Village Red Brick Facades & Brownstones
    const bColor1 = theme === 'night' ? '#221e28' : (theme === 'evening' ? '#5c2d28' : '#883d31');
    const bColor2 = theme === 'night' ? '#1c1822' : (theme === 'evening' ? '#4d221e' : '#733328');
    const bColor3 = theme === 'night' ? '#282230' : (theme === 'evening' ? '#69332e' : '#994637');
    const trimColor = theme === 'night' ? '#3d3a4a' : (theme === 'evening' ? '#8a6460' : '#d2c2b0');

    // Building 1 (Left): x = 0 to 175
    ctx.fillStyle = bColor1;
    ctx.fillRect(0, 92, 175, 164);
    ctx.fillStyle = trimColor;
    ctx.fillRect(0, 88, 175, 6);
    ctx.fillRect(0, 96, 175, 2);

    // Building 2 (Center - Across the street, Ugly Naked Guy's apartment!): x = 165 to 360
    ctx.fillStyle = bColor2;
    ctx.fillRect(165, 80, 195, 176);
    ctx.fillStyle = trimColor;
    ctx.fillRect(165, 75, 195, 7);
    ctx.fillRect(165, 84, 195, 3);

    // Iconic Wooden NYC Rooftop Water Tank on top of Building 2!
    const tankWood = theme === 'night' ? '#241a14' : (theme === 'evening' ? '#4a2d1a' : '#734629');
    const tankRoof = theme === 'night' ? '#1a1310' : (theme === 'evening' ? '#362012' : '#52311c');
    // Wooden Stilts
    ctx.fillStyle = '#1e1c22';
    ctx.fillRect(235, 62, 3, 14);
    ctx.fillRect(268, 62, 3, 14);
    ctx.fillRect(242, 62, 2, 14);
    ctx.fillRect(261, 62, 2, 14);
    // Tank body
    ctx.fillStyle = tankWood;
    ctx.fillRect(230, 36, 46, 26);
    // Metal hoops
    ctx.fillStyle = '#1c1e22';
    ctx.fillRect(230, 42, 46, 2);
    ctx.fillRect(230, 52, 46, 2);
    // Conical roof
    ctx.fillStyle = tankRoof;
    ctx.beginPath();
    ctx.moveTo(226, 36);
    ctx.lineTo(253, 20);
    ctx.lineTo(280, 36);
    ctx.closePath();
    ctx.fill();

    // Building 3 (Right): x = 345 to 512
    ctx.fillStyle = bColor3;
    ctx.fillRect(345, 86, 167, 170);
    ctx.fillStyle = trimColor;
    ctx.fillRect(345, 81, 167, 7);
    ctx.fillRect(345, 90, 167, 2);

    // 5. Windows & Window Lights
    const isNightOrEve = (theme === 'night' || theme === 'evening');
    const winLit = '#ffdf78';
    const winLitAmber = '#ffa642';
    const winDark = theme === 'night' ? '#0f131f' : '#2b394a';
    const winBorder = theme === 'night' ? '#333744' : '#d8d4cb';

    const drawWinGrid = (startX, startY, cols, rows, spacingX, spacingY, wW, wH, litIndices) => {
      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = startX + c * spacingX;
          const wy = startY + r * spacingY;
          ctx.fillStyle = winBorder;
          ctx.fillRect(wx - 2, wy - 2, wW + 4, wH + 4);
          const isLit = isNightOrEve && litIndices.includes(idx);
          ctx.fillStyle = isLit ? (idx % 2 === 0 ? winLit : winLitAmber) : winDark;
          ctx.fillRect(wx, wy, wW, wH);
          ctx.fillStyle = isLit ? 'rgba(50, 40, 20, 0.45)' : winBorder;
          ctx.fillRect(wx + Math.floor(wW / 2), wy, 1, wH);
          ctx.fillRect(wx, wy + Math.floor(wH / 2), wW, 1);
          idx++;
        }
      }
    };

    drawWinGrid(18, 108, 4, 3, 38, 44, 20, 28, [0, 2, 5, 7, 8, 11]);
    drawWinGrid(184, 98, 4, 3, 44, 46, 22, 30, [1, 2, 4, 6, 9, 10]);

    // Easter Egg: Ugly Naked Guy (丑裸男) in center window (r=1, c=1: x=228, y=144)!
    const ungX = 228;
    const ungY = 144;
    ctx.fillStyle = '#ffcf5c';
    ctx.fillRect(ungX, ungY, 22, 30);
    ctx.fillStyle = theme === 'night' ? '#422416' : '#572d1c';
    ctx.fillRect(ungX + 8, ungY + 6, 6, 6);   // Head
    ctx.fillRect(ungX + 5, ungY + 12, 12, 10); // Torso
    ctx.fillRect(ungX + 17, ungY + 8, 3, 7);  // Arm
    ctx.fillRect(ungX + 19, ungY + 6, 3, 3);
    ctx.fillStyle = 'rgba(70, 50, 20, 0.5)';
    ctx.fillRect(ungX + 11, ungY, 1, 30);
    ctx.fillRect(ungX, ungY + 15, 22, 1);

    drawWinGrid(368, 104, 3, 3, 46, 44, 22, 28, [0, 3, 4, 7]);

    // 6. NYC Fire Escape Zig-Zag Stairs
    ctx.strokeStyle = '#1a1c20';
    ctx.lineWidth = 2;
    [104, 148, 192].forEach(py => {
      ctx.strokeRect(84, py, 42, 6);
    });
    ctx.beginPath();
    ctx.moveTo(126, 110); ctx.lineTo(84, 148);
    ctx.moveTo(84, 154); ctx.lineTo(126, 192);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  },

  taxiChecker() {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 16;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f2b90c';
    ctx.fillRect(0, 0, 128, 16);
    const size = 8;
    for (let x = 0; x < 128; x += size) {
      for (let y = 0; y < 16; y += size) {
        if ((Math.floor(x / size) + Math.floor(y / size)) % 2 === 0) {
          ctx.fillStyle = '#111111';
          ctx.fillRect(x, y, size, size);
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y, size, size);
        }
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
    return tex;
  },

  taxiSign() {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fffce8';
    ctx.fillRect(0, 0, 64, 32);
    ctx.fillStyle = '#f5b000';
    ctx.fillRect(0, 0, 64, 4);
    ctx.fillRect(0, 28, 64, 4);
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TAXI', 32, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    return tex;
  },

  charFace(skinHex, eyeHex, smileColor = '#8c3b2b', charKey = '', exprState = 'normal') {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    const isBlink = exprState === 'blink';
    const isTalk = exprState === 'talk';

    // 1. Base Porcelain-Peach Mii Skin & Subtle Chin Shading
    ctx.fillStyle = skinHex || (['ross', 'chandler', 'joey'].includes(charKey) ? '#f7c5a3' : '#fde5c8');
    ctx.fillRect(0, 0, 128, 128);
    const chinGrad = ctx.createLinearGradient(0, 92, 0, 128);
    chinGrad.addColorStop(0, 'rgba(235, 175, 130, 0)');
    chinGrad.addColorStop(1, 'rgba(220, 145, 102, 0.42)');
    ctx.fillStyle = chinGrad;
    ctx.fillRect(0, 92, 128, 36);

    // 2. Rosy Mii Cheek Blush Circles (Prominent on girls & Chandler!)
    if (!['ross', 'joey'].includes(charKey)) {
      [[24, 78], [104, 78]].forEach(([bx, by]) => {
        const bGrad = ctx.createRadialGradient(bx, by, 2, bx, by, 18);
        bGrad.addColorStop(0, 'rgba(244, 142, 116, 0.55)');
        bGrad.addColorStop(1, 'rgba(244, 142, 116, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 18, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Helper for Mii Eyes (supports open eyes & closed blinking eyes!)
    const drawMiiEye = (cx, cy, irisColor, hasLashes, isLeft, hasCrease) => {
      if (hasCrease) {
        ctx.strokeStyle = 'rgba(195, 135, 100, 0.65)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(cx, cy + (isBlink ? 4 : 2), 14, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      }

      if (isBlink) {
        // Gentle closed eyelid curve + downward lashes!
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 3.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - 12, cy + 1);
        ctx.quadraticCurveTo(cx, cy + 7, cx + 12, cy + 1);
        ctx.stroke();

        if (hasLashes) {
          const dir = isLeft ? -1 : 1;
          ctx.lineWidth = 2.6;
          [
            [cx + dir * 9, cy + 2, cx + dir * 14, cy + 5],
            [cx + dir * 5, cy + 4, cx + dir * 8, cy + 8]
          ].forEach(([x1, y1, x2, y2]) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          });
        }
        return;
      }

      // White sclera
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 13, 8.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Colored Iris
      ctx.fillStyle = irisColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 6.8, 0, Math.PI * 2);
      ctx.fill();

      // Black Pupil
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.6, 0, Math.PI * 2);
      ctx.fill();

      // White Catchlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 2.2, cy - 2.2, 1.7, 0, Math.PI * 2);
      ctx.fill();

      // Bold Mii Upper Eyeliner
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 3.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy + 2.5, 13.2, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Lower subtle lid line
      ctx.strokeStyle = 'rgba(40, 25, 18, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy - 2.5, 12.5, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();

      // 3 Outer Eyelashes (for Monica, Phoebe, Rachel, Joey)
      if (hasLashes) {
        const dir = isLeft ? -1 : 1;
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 2.8;
        [
          [cx + dir * 10, cy - 4, cx + dir * 15, cy - 8],
          [cx + dir * 12, cy - 1, cx + dir * 17, cy - 3],
          [cx + dir * 11, cy + 2, cx + dir * 16, cy + 3]
        ].forEach(([x1, y1, x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }
    };

    // Helper for Animated Talking Open Mouth (keeps each character's lip color!)
    const drawTalkingMouth = (cy, lipStrokeColor, width = 18, height = 9.5) => {
      // Dark mouth interior
      ctx.fillStyle = '#3b1212';
      ctx.beginPath();
      ctx.ellipse(64, cy, width, height, 0, 0, Math.PI * 2);
      ctx.fill();
      // Pink tongue at bottom of mouth
      ctx.fillStyle = '#e06363';
      ctx.beginPath();
      ctx.ellipse(64, cy + height * 0.45, width * 0.58, height * 0.42, 0, 0, Math.PI);
      ctx.fill();
      // White upper teeth row
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(64, cy - height * 0.48, width * 0.78, height * 0.34, 0, 0, Math.PI);
      ctx.fill();
      // Lip outline
      ctx.strokeStyle = lipStrokeColor;
      ctx.lineWidth = 3.4;
      ctx.beginPath();
      ctx.ellipse(64, cy, width, height, 0, 0, Math.PI * 2);
      ctx.stroke();
    };

    if (charKey === 'monica') {
      // MONICA Mii: Arched black brows, bright blue lashed eyes, double-bridge nose + dimple lines, bold crimson lipstick smile!
      drawMiiEye(39, 54, '#1868d6', true, true, false);
      drawMiiEye(89, 54, '#1868d6', true, false, false);

      // Arched black eyebrows
      ctx.strokeStyle = '#141416';
      ctx.lineWidth = 3.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(24, 42);
      ctx.quadraticCurveTo(38, 34, 52, 43);
      ctx.moveTo(104, 42);
      ctx.quadraticCurveTo(90, 34, 76, 43);
      ctx.stroke();

      // Monica's Nose (double vertical bridge + nostrils + side dimple ticks)
      ctx.strokeStyle = '#181412';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(61, 56); ctx.lineTo(60, 75); ctx.lineTo(56, 80);
      ctx.moveTo(67, 56); ctx.lineTo(68, 75); ctx.lineTo(72, 80);
      ctx.moveTo(58, 80); ctx.lineTo(70, 80);
      ctx.stroke();
      // Subtle nose-side laugh ticks
      ctx.strokeStyle = 'rgba(185, 120, 90, 0.75)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(54, 74); ctx.lineTo(47, 79);
      ctx.moveTo(74, 74); ctx.lineTo(81, 79);
      ctx.stroke();

      // Bold Crimson Lipstick Smile with White Teeth (or Open Talking Mouth!)
      if (isTalk) {
        drawTalkingMouth(97, '#991b1b', 18, 9.5);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(44, 92);
        ctx.quadraticCurveTo(64, 108, 84, 92);
        ctx.quadraticCurveTo(64, 94, 44, 92);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 4.2;
        ctx.beginPath();
        ctx.moveTo(44, 92);
        ctx.quadraticCurveTo(64, 108, 84, 92);
        ctx.quadraticCurveTo(64, 93, 44, 92);
        ctx.stroke();
      }

    } else if (charKey === 'phoebe') {
      // PHOEBE Mii: Golden-brown soft brows, sky-blue lashed eyes with eyelid crease, diagonal cheek laugh lines, coral-red open smile!
      drawMiiEye(39, 54, '#3c84d8', true, true, true);
      drawMiiEye(89, 54, '#3c84d8', true, false, true);

      // Warm golden-brown curved eyebrows
      ctx.strokeStyle = '#7c5424';
      ctx.lineWidth = 3.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(25, 39);
      ctx.quadraticCurveTo(39, 34, 52, 39);
      ctx.moveTo(103, 39);
      ctx.quadraticCurveTo(89, 34, 76, 39);
      ctx.stroke();

      // Diagonal upper-cheek laugh lines from nose bridge
      ctx.strokeStyle = 'rgba(195, 130, 96, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(55, 62); ctx.lineTo(42, 74);
      ctx.moveTo(73, 62); ctx.lineTo(86, 74);
      ctx.stroke();

      // Phoebe's Nose
      ctx.strokeStyle = '#181412';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(60, 62); ctx.lineTo(60, 74);
      ctx.moveTo(68, 62); ctx.lineTo(68, 74);
      ctx.moveTo(56, 75);
      ctx.quadraticCurveTo(64, 82, 72, 75);
      ctx.stroke();

      // Coral-Pink Smile with White Teeth (or Open Talking/Singing Mouth!)
      if (isTalk) {
        drawTalkingMouth(97, '#e04842', 18, 9.8);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(44, 92);
        ctx.quadraticCurveTo(64, 108, 84, 92);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#e04842';
        ctx.lineWidth = 4.2;
        ctx.beginPath();
        ctx.moveTo(44, 92);
        ctx.quadraticCurveTo(64, 108, 84, 92);
        ctx.stroke();
        ctx.strokeStyle = '#9e2420';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.moveTo(43, 92);
        ctx.quadraticCurveTo(64, 94, 85, 92);
        ctx.stroke();
      }

    } else if (charKey === 'rachel') {
      // RACHEL Mii: Honey-brown angled brows, teal-blue lashed eyes, J-curve nose, curved cheek contour arcs, dark-lined white smile!
      drawMiiEye(40, 54, '#1c6b8c', true, true, false);
      drawMiiEye(88, 54, '#1c6b8c', true, false, false);

      // Angled warm-brown eyebrows
      ctx.strokeStyle = '#825422';
      ctx.lineWidth = 3.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(25, 41);
      ctx.quadraticCurveTo(38, 35, 53, 42);
      ctx.moveTo(103, 41);
      ctx.quadraticCurveTo(90, 35, 75, 42);
      ctx.stroke();

      // Rachel's J-hook Nose with soft side shadow
      ctx.fillStyle = 'rgba(215, 150, 110, 0.45)';
      ctx.beginPath();
      ctx.arc(65, 74, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#181412';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(62, 57);
      ctx.lineTo(58, 73);
      ctx.quadraticCurveTo(57, 80, 66, 79);
      ctx.stroke();

      // Curved Cheek Contour Lines framing the blush (Signature in Rachel's Mii!)
      ctx.strokeStyle = 'rgba(195, 130, 96, 0.78)';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(14, 71);
      ctx.quadraticCurveTo(28, 76, 30, 96);
      ctx.moveTo(114, 71);
      ctx.quadraticCurveTo(100, 76, 98, 96);
      ctx.stroke();

      // Sleek Dark-Lined White Smile (or Open Talking Mouth!)
      if (isTalk) {
        drawTalkingMouth(96, '#181412', 16.5, 8.8);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(47, 92);
        ctx.quadraticCurveTo(64, 104, 81, 92);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#181412';
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(47, 92);
        ctx.quadraticCurveTo(64, 104, 81, 92);
        ctx.closePath();
        ctx.stroke();
      }

    } else if (charKey === 'ross') {
      // ROSS Mii (5/7): Droopy puppy-dog olive-green eyes, orange under-eye bags, grey-brown 5-o'clock stubble beard, long nose + philtrum dot, flat melancholy mouth!
      // 1. Grey-brown 5-o'clock stubble shadow across lower jaw & around mouth
      ctx.fillStyle = 'rgba(138, 108, 92, 0.36)';
      ctx.beginPath();
      ctx.moveTo(8, 72);
      ctx.quadraticCurveTo(14, 124, 64, 126);
      ctx.quadraticCurveTo(114, 124, 120, 72);
      ctx.quadraticCurveTo(96, 86, 86, 82);
      ctx.quadraticCurveTo(64, 72, 42, 82);
      ctx.quadraticCurveTo(32, 86, 8, 72);
      ctx.fill();
      // Lighter skin cutout immediately around lips inside the stubble arch
      ctx.fillStyle = '#f3b996';
      ctx.beginPath();
      ctx.ellipse(64, 98, 23, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Droopy olive-green puppy-dog eyes
      drawMiiEye(41, 49, '#5e6b38', false, true, false);
      drawMiiEye(87, 49, '#5e6b38', false, false, false);

      // 3. Signature warm-orange diagonal under-eye bags / creases!
      ctx.strokeStyle = 'rgba(236, 156, 72, 0.85)';
      ctx.lineWidth = 4.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(35, 60); ctx.lineTo(54, 53);
      ctx.moveTo(93, 60); ctx.lineTo(74, 53);
      ctx.stroke();

      // 4. Sad/flat thick black eyebrows
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(25, 39); ctx.quadraticCurveTo(40, 36, 54, 39);
      ctx.moveTo(103, 39); ctx.quadraticCurveTo(88, 36, 74, 39);
      ctx.stroke();

      // 5. Long prominent nose with bulbous tip & philtrum dot underneath!
      ctx.fillStyle = 'rgba(232, 152, 118, 0.55)';
      ctx.beginPath();
      ctx.arc(64, 78, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(58, 56);
      ctx.lineTo(57, 74);
      ctx.lineTo(52, 81);
      ctx.quadraticCurveTo(64, 89, 76, 81);
      ctx.lineTo(70, 73);
      ctx.stroke();
      // Philtrum dot right under nose tip
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(64, 88, 2.3, 0, Math.PI * 2);
      ctx.fill();

      // 6. Flat closed mouth with upturned corner ticks (or Open Talking Mouth!) + chin crease line
      if (isTalk) {
        drawTalkingMouth(97, '#111111', 15.5, 7.5);
      } else {
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(46, 97);
        ctx.quadraticCurveTo(64, 100, 82, 97);
        ctx.moveTo(45, 95); ctx.lineTo(47, 99);
        ctx.moveTo(83, 95); ctx.lineTo(81, 99);
        ctx.stroke();
      }
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(57, 108); ctx.lineTo(71, 108);
      ctx.stroke();

    } else if (charKey === 'chandler') {
      // CHANDLER Mii (6/7): Rectangular grey glasses, blue eyes, warm orange under-eye bags, U-bulb nose, open awkward grin, double-chin curve!
      drawMiiEye(41, 54, '#1b4f82', false, true, false);
      drawMiiEye(87, 54, '#1b4f82', false, false, false);

      // Warm orange under-eye bags inside the glasses
      ctx.strokeStyle = 'rgba(238, 166, 90, 0.72)';
      ctx.lineWidth = 3.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(35, 63); ctx.quadraticCurveTo(44, 65, 53, 59);
      ctx.moveTo(93, 63); ctx.quadraticCurveTo(84, 65, 75, 59);
      ctx.stroke();

      // Medium-brown eyebrows right above the glasses frames
      ctx.strokeStyle = '#422614';
      ctx.lineWidth = 4.2;
      ctx.beginPath();
      ctx.moveTo(24, 41); ctx.quadraticCurveTo(38, 38, 54, 43);
      ctx.moveTo(104, 41); ctx.quadraticCurveTo(90, 38, 74, 43);
      ctx.stroke();

      // Iconic Grey Rectangular Glasses Frames (rounded rectangles + nose bridge)
      ctx.strokeStyle = '#6c6e6b';
      ctx.lineWidth = 3.4;
      ctx.beginPath();
      ctx.roundRect(22, 44, 36, 21, 7);
      ctx.roundRect(70, 44, 36, 21, 7);
      ctx.moveTo(58, 53);
      ctx.quadraticCurveTo(64, 50, 70, 53);
      ctx.stroke();

      // Rounded U-hook nose
      ctx.fillStyle = 'rgba(225, 152, 115, 0.45)';
      ctx.beginPath();
      ctx.arc(64, 73, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#181412';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(56, 73);
      ctx.quadraticCurveTo(64, 83, 72, 73);
      ctx.stroke();

      // Awkward open mouth with white upper teeth & dark lower mouth interior (opens wider when talking!)
      if (isTalk) {
        drawTalkingMouth(92, '#111111', 17.5, 9.5);
      } else {
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.moveTo(47, 89);
        ctx.quadraticCurveTo(64, 83, 81, 89);
        ctx.quadraticCurveTo(64, 100, 47, 89);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(50, 89);
        ctx.quadraticCurveTo(64, 85, 78, 89);
        ctx.quadraticCurveTo(64, 91, 50, 89);
        ctx.fill();
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(47, 89);
        ctx.quadraticCurveTo(64, 83, 81, 89);
        ctx.quadraticCurveTo(64, 100, 47, 89);
        ctx.stroke();
      }

      // Signature Double-Chin / Soft Chin Crease Arc underneath mouth!
      ctx.strokeStyle = 'rgba(198, 128, 96, 0.82)';
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(46, 106);
      ctx.quadraticCurveTo(64, 114, 82, 106);
      ctx.stroke();

    } else if (charKey === 'joey') {
      // JOEY Mii (7/7): Thick angled dark brows, warm hazel-brown eyes with lashes, cheek contour arcs, "How you doin'?" lopsided smirk, chin beauty mark!
      drawMiiEye(41, 54, '#543d1c', true, true, false);
      drawMiiEye(87, 54, '#543d1c', true, false, false);

      // Thick expressive dark-charcoal eyebrows angled toward center
      ctx.strokeStyle = '#282220';
      ctx.lineWidth = 5.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(22, 41); ctx.lineTo(36, 39); ctx.lineTo(55, 44);
      ctx.moveTo(106, 41); ctx.lineTo(92, 39); ctx.lineTo(73, 44);
      ctx.stroke();

      // Double-bridge triangular nose with nostrils
      ctx.strokeStyle = '#141210';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(60, 52); ctx.lineTo(58, 72); ctx.lineTo(54, 77);
      ctx.moveTo(68, 52); ctx.lineTo(70, 72); ctx.lineTo(74, 77);
      ctx.stroke();
      ctx.fillStyle = '#141210';
      ctx.beginPath();
      ctx.arc(59, 76, 1.8, 0, Math.PI * 2);
      ctx.arc(69, 76, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Outer Cheek Dimple / Contour Arcs
      ctx.strokeStyle = 'rgba(192, 122, 92, 0.78)';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(15, 65);
      ctx.quadraticCurveTo(19, 76, 29, 81);
      ctx.moveTo(113, 65);
      ctx.quadraticCurveTo(109, 76, 99, 81);
      ctx.stroke();

      // Signature Lopsided "How you doin'?" One-Sided Smirk (or Open Talking Smirk!)
      if (isTalk) {
        drawTalkingMouth(92, '#141210', 16.5, 8.5);
      } else {
        ctx.strokeStyle = '#141210';
        ctx.lineWidth = 3.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(46, 91);
        ctx.lineTo(68, 91);
        ctx.quadraticCurveTo(79, 91, 86, 84);
        ctx.stroke();
      }

      // Chin beauty mark / mole at the very bottom center of chin!
      ctx.fillStyle = '#141210';
      ctx.beginPath();
      ctx.arc(63, 114, 2.4, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // Default Mii Face for Gunther
      drawMiiEye(40, 54, eyeHex || '#2c1e16', false, true, false);
      drawMiiEye(88, 54, eyeHex || '#2c1e16', false, false, false);

      ctx.strokeStyle = '#2b1b10';
      ctx.lineWidth = 4.0;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(26, 40); ctx.quadraticCurveTo(40, 35, 52, 41);
      ctx.moveTo(102, 40); ctx.quadraticCurveTo(88, 35, 76, 41);
      ctx.stroke();

      ctx.strokeStyle = '#241810';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(64, 57); ctx.lineTo(61, 74); ctx.lineTo(68, 76);
      ctx.stroke();

      if (isTalk) {
        drawTalkingMouth(96, smileColor || '#7a2e22', 16, 8.5);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(46, 92);
        ctx.quadraticCurveTo(64, 105, 82, 92);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = smileColor || '#7a2e22';
        ctx.lineWidth = 3.2;
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }
};

// ==================== 3D VOXEL SCENE STATE ====================
let scene, camera, renderer, controls, raycaster, mouse;
let isRetroPixel = false;
let timeOfDay = 0; // 0: Studio Canvas (like reference image!), 1: Day, 2: Evening, 3: Night
let allLines = [];
let vocabWords = new Set();
let searchIndex = null;

const charObjects = {};
const interactiveMeshes = [];
const warmPointLights = [];
const lampBulbs = [];
const steamParticles = [];
const noteParticles = [];
let dustParticles = null;
let nycBackdropMesh = null;
let currentPolaroidDataUrl = null;
let currentPolaroidQuote = null;
let serviceSignGroup = null;
let camTargetPos = null;
let camTargetLook = null;

// Dual-Diorama Scene State (Central Perk <-> Monica's Apartment 360° Spin Switch!)
let stageSpinGroup = null;
let cafeDioramaGroup = null;
let monicaDioramaGroup = null;
let currentLocation = 'cafe'; // 'cafe' | 'monica'
let spinTransition = null;    // { startTime, duration, targetLocation, swapped }

// Dynamic 4th-Floor & Interactive Prop Animations
const animatedDoors = [];
const animatedRecliners = [];
const animatedFoosball = {
  rods: [],
  ball: null,
  spinUntil: 0
};
const animatedCanoe = {
  group: null,
  oar1: null,
  oar2: null,
  activeUntil: 0
};
const animatedPets = {
  duck: null,
  duckHead: null,
  chick: null,
  chickHead: null,
  quackUntil: 0
};
const animatedCheesecake = {
  group: null,
  fork: null,
  nibbleUntil: 0
};
const sparkleParticles = [];

// Dynamic Manhattan Street & Window Micro-Ecology State
const animatedYellowCab = {
  group: null,
  wheels: [],
  headlights: [],
  taillights: [],
  frontSpot: null,
  x: -12.5,
  speed: 4.6,
  isWaiting: false,
  resumeTime: 0
};
const animatedPigeon = {
  group: null,
  head: null,
  leftWing: null,
  rightWing: null,
  flutterTimer: 0,
  nextPeckTime: 2500
};
let joeyTvLight = null;
let joeyTvScreenMesh = null;
const hallwaySconceLights = [];

// Isometric Camera Presets (Supports both Central Perk and Monica's Apartment!)
const CAM_PRESETS = {
  island:   { pos: new THREE.Vector3(-27.5, 27.0, 35.0), look: new THREE.Vector3(-0.3, 1.8, 0.4), slider: 22 },
  overview: { pos: new THREE.Vector3(-13.0, 20.0, 26.5), look: new THREE.Vector3(-0.3, 2.1, 0.8), slider: 48 },
  couch:    { pos: new THREE.Vector3(-0.6, 6.8, 13.5),   look: new THREE.Vector3(-0.6, 2.1, 4.2), slider: 86 },
  bar:      { pos: new THREE.Vector3(-3.2, 7.5, 11.5),   look: new THREE.Vector3(-9.2, 2.5, -0.5), slider: 78 },
  stage:    { pos: new THREE.Vector3(4.5, 7.5, 12.2),    look: new THREE.Vector3(10.2, 2.5, 2.2), slider: 78 }
};

const MONICA_CAM_PRESETS = {
  island:   { pos: new THREE.Vector3(0.0, 68.0, 102.0), look: new THREE.Vector3(0.0, 2.0, -1.0), slider: 15 },
  overview: { pos: new THREE.Vector3(0.0, 48.0, 74.0), look: new THREE.Vector3(0.0, 2.2, -0.5), slider: 38 },
  couch:    { pos: new THREE.Vector3(-19.8, 12.0, 18.0), look: new THREE.Vector3(-16.8, 2.2, 1.5), slider: 75 },
  bar:      { pos: new THREE.Vector3(19.8, 12.0, 18.0), look: new THREE.Vector3(16.8, 2.2, 1.5), slider: 75 },
  stage:    { pos: new THREE.Vector3(0.0, 9.0, 16.0), look: new THREE.Vector3(0.0, 1.8, 3.5), slider: 82 }
};

// ==================== VOXEL HELPER PRIMITIVES ====================
function mat(colorHex, opts = {}) {
  const useGrain = opts.grain === true && !opts.map;
  return new THREE.MeshStandardMaterial({
    color: useGrain ? 0xffffff : colorHex,
    roughness: opts.roughness ?? 0.8,
    metalness: opts.metalness ?? 0.05,
    map: opts.map || (useGrain ? PixelTextures.voxelGrain(colorHex, opts.variance ?? 12, opts.rx ?? 2, opts.ry ?? 2) : null),
    emissive: opts.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.DoubleSide
  });
}

function voxBox(w, h, d, colorOrMat, x = 0, y = 0, z = 0, parent = scene, castShadow = true) {
  const m = (colorOrMat instanceof THREE.Material) ? colorOrMat : mat(colorOrMat);
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  if (parent) parent.add(mesh);
  return mesh;
}

function voxCyl(rt, rb, h, segs, colorOrMat, x = 0, y = 0, z = 0, parent = scene) {
  const m = (colorOrMat instanceof THREE.Material) ? colorOrMat : mat(colorOrMat);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segs), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (parent) parent.add(mesh);
  return mesh;
}

function voxSphere(r, segs, colorOrMat, x = 0, y = 0, z = 0, parent = scene) {
  const m = (colorOrMat instanceof THREE.Material) ? colorOrMat : mat(colorOrMat);
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, segs, Math.max(6, Math.floor(segs / 2))), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (parent) parent.add(mesh);
  return mesh;
}

function tagInteractive(obj, data) {
  obj.traverse(child => {
    if (child.isMesh) {
      child.userData = { ...data };
      interactiveMeshes.push(child);
    }
  });
}

// ==================== BUILD STEPPED VOXEL SOFA (Authentic Tufted & Fringed!) ====================
function buildSteppedVoxelSofa(x, y, z, width, colorMain, colorCushion, numCushions = 3, withFringe = true) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  const mMain = mat(colorMain, { variance: 15, rx: 4, ry: 2 });
  const mCush = mat(colorCushion, { variance: 14, rx: 2, ry: 2 });
  const mFringe = mat(0xb87c38, { variance: 16 });
  const mWood = mat(0x3a2316);

  // Golden-Brown Fringe Skirt along bottom front & sides (Authentic Central Perk Couch detail!)
  if (withFringe) {
    voxBox(width - 0.1, 0.34, 2.28, mFringe, 0, 0.24, 0.02, g);
  }

  // Multi-tiered Voxel Base & Tufted Backrest
  voxBox(width, 0.42, 2.3, mMain, 0, 0.56, 0, g);
  voxBox(width - 0.2, 0.24, 2.35, mMain, 0, 0.80, 0.02, g);

  // High Curved/Stepped Tufted Backrest with vertical pleats (matching the real studio couch!)
  voxBox(width - 0.1, 1.75, 0.65, mMain, 0, 1.65, -0.82, g);
  voxBox(width - 0.4, 0.42, 0.54, mMain, 0, 2.62, -0.82, g);
  voxBox(width - 1.1, 0.22, 0.42, mMain, 0, 2.90, -0.82, g);

  // Vertical Tufted Pleats & Buttons across the backrest
  const pleatCount = 6;
  const pleatSpan = (width - 1.4) / pleatCount;
  for (let p = 0; p <= pleatCount; p++) {
    const px = -((width - 1.4) / 2) + p * pleatSpan;
    voxBox(0.08, 1.65, 0.12, colorMain, px, 1.85, -0.48, g);
    voxBox(0.14, 0.14, 0.14, 0x9e3814, px, 1.95, -0.45, g); // Tuft button
  }

  // Individual Plush Voxel Cushions with front bevel step
  const cSpan = (width - 1.5) / numCushions;
  for (let i = 0; i < numCushions; i++) {
    const cx = -((numCushions - 1) * cSpan) / 2 + i * cSpan;
    voxBox(cSpan - 0.06, 0.38, 1.68, mCush, cx, 1.02, 0.16, g);
    voxBox(cSpan - 0.14, 0.12, 1.58, mCush, cx, 1.24, 0.14, g);
  }

  // Stepped Rolled Outward Voxel Armrests (Left & Right)
  [-width / 2 + 0.35, width / 2 - 0.35].forEach((ax, idx) => {
    const outDir = idx === 0 ? -1 : 1;
    voxBox(0.75, 1.18, 2.35, mMain, ax, 1.1, 0.02, g);
    voxBox(0.95, 0.42, 2.42, mMain, ax + outDir * 0.12, 1.72, 0.02, g);
    voxBox(0.72, 0.20, 2.32, mMain, ax + outDir * 0.18, 1.98, 0.02, g);
  });

  // Voxel Carved Wooden Feet
  [[-width/2 + 0.4, -0.9], [width/2 - 0.4, -0.9], [-width/2 + 0.4, 0.9], [width/2 - 0.4, 0.9]].forEach(([lx, lz]) => {
    voxBox(0.32, 0.28, 0.32, mWood, lx, 0.14, lz, g);
  });

  scene.add(g);
  return g;
}

// ==================== BUILD THE CENTRAL PERK DIORAMA (1:1 Real Set Floorplan!) ====================
function buildCafeDiorama() {
  const _prevScene = scene;
  if (cafeDioramaGroup) scene = cafeDioramaGroup;
  const brickMat = mat(0xffffff, { map: PixelTextures.brick(4, 3), roughness: 0.88 });
  const brickPillarMat = mat(0xffffff, { map: PixelTextures.brick(2, 3), roughness: 0.88 });
  const darkWoodMat = mat(0x3a2519, { variance: 14 });
  const medWoodMat = mat(0x6e462b, { variance: 14 });
  const warmWallMat = mat(0xf2ba85, { variance: 10, rx: 4, ry: 3 });
  const greenTrimMat = mat(0x1d4232, { variance: 10 });
  const orangeCushion = mat(0xe6652c, { variance: 14 });

  // 0. SOFT DROP SHADOW PLANE UNDER DIORAMA ISLAND
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(52, 40),
    new THREE.MeshBasicMaterial({ map: PixelTextures.softShadowFloor(), transparent: true, depthWrite: false })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.set(-0.6, -0.82, 0.3);
  scene.add(shadowPlane);

  // 1. MULTI-LAYERED VOXEL DIORAMA SLAB & AUTHENTIC SLATE-GREY STUDIO FLOOR
  // Main axis-aligned slab ends cleanly at x=9.6 so it never pokes out behind the angled right walls
  voxBox(29.4, 0.55, 26.2, 0x26170f, -4.4, -0.52, 0); // Bottom architectural plinth
  voxBox(28.8, 0.45, 25.6, 0x3b2418, -4.4, -0.15, 0); // Mid rim
  voxBox(28.0, 0.32, 24.8, mat(0xffffff, { map: PixelTextures.slateFloor(11, 10), roughness: 0.85 }), -4.4, 0.08, 0);

  // Angled Right Elevated Terrace Platform (White octagonal tiles with black dots + Dark Hunter-Green step curbing!)
  const tileMat = mat(0xffffff, { map: PixelTextures.stageTiles(6, 10), roughness: 0.75 });
  const terraceGroup = new THREE.Group();
  terraceGroup.position.set(10.4, 0, 0.2);
  terraceGroup.rotation.y = -0.15;
  // Matching angled architectural plinth & mid-rim under the terrace so no corner overhangs
  voxBox(10.4, 0.54, 22.8, 0x26170f, 0.2, -0.525, 0.2, terraceGroup);
  voxBox(9.8, 0.44, 22.2, 0x3b2418, 0.1, -0.155, 0.1, terraceGroup);
  voxBox(9.6, 0.42, 21.6, greenTrimMat, 0.2, 0.34, 0.1, terraceGroup);
  voxBox(9.1, 0.46, 21.1, tileMat, 0.35, 0.38, 0.1, terraceGroup);
  scene.add(terraceGroup);

  // Two Iconic Tall Hunter-Green Fluted Cast-Iron Columns along the raised step edge!
  const ironColMat = mat(0x1e4d3b, { roughness: 0.45, metalness: 0.3, variance: 10 });
  [[5.8, 3.2], [4.1, -6.0]].forEach(([cx, cz]) => {
    const colG = new THREE.Group();
    colG.position.set(cx, 0.25, cz);
    voxBox(0.95, 0.45, 0.95, ironColMat, 0, 0.22, 0, colG);
    voxBox(0.76, 0.35, 0.76, ironColMat, 0, 0.62, 0, colG);
    voxCyl(0.28, 0.32, 7.6, 8, ironColMat, 0, 4.5, 0, colG);
    voxBox(0.88, 0.42, 0.88, ironColMat, 0, 8.4, 0, colG);
    scene.add(colG);
  });

  // 2. WALLS (Cutaway Box: Left Brick Wall at x=-17.8 + Back Wall at z=-11.9 + Angled Right Bay Window Wall)
  voxBox(0.75, 9.2, 24.2, brickMat, -17.8, 4.6, 0);
  voxBox(0.95, 0.55, 24.4, 0xf4eee4, -17.8, 9.4, 0);

  // Teal Chalkboard Menu on front-left brick wall (cleanly offset from brick wall x=-17.425)
  const menuGroup = new THREE.Group();
  menuGroup.position.set(-17.28, 5.2, 7.2);
  voxBox(0.16, 3.6, 2.8, 0x3b8c7a, 0, 0, 0, menuGroup);
  voxBox(0.14, 3.0, 2.2, mat(0xffffff, { map: PixelTextures.chalkboard() }), 0.08, 0, 0, menuGroup);
  scene.add(menuGroup);

  // Back-Left Wall with Green Door & Striped Curtain (clean non-overlapping Z layers at z=-11.9)
  voxBox(11.4, 9.2, 0.72, 0xf3d5b5, -12.1, 4.6, -11.9);
  voxBox(11.6, 0.55, 0.94, 0xf4eee4, -12.1, 9.48, -11.9);
  voxBox(3.4, 7.5, 0.88, greenTrimMat, -11.8, 3.9, -11.85);
  voxBox(2.7, 6.9, 1.02, 0x261b14, -11.8, 3.7, -11.82); // Distinct depth so back/front never Z-fight
  const curtainMat = mat(0xffffff, { map: PixelTextures.stripedCurtain() });
  voxBox(1.5, 6.8, 0.22, curtainMat, -11.1, 3.8, -11.18);
  voxBox(0.8, 6.8, 0.24, curtainMat, -10.45, 3.8, -11.06);
  voxBox(0.95, 0.35, 0.32, 0x1d4232, -10.45, 3.2, -11.02);

  // Back-Center Wall (abuts Back-Left Wall cleanly at x=-6.4 without overlapping!)
  voxBox(11.6, 9.2, 0.72, warmWallMat, -0.6, 4.6, -11.9);
  voxBox(11.4, 3.1, 0.18, 0x5c3822, -0.6, 1.6, -11.44); // Inner wainscot panel only on inside face
  voxBox(11.8, 0.55, 0.94, 0xf4eee4, -0.6, 9.48, -11.9);

  // Motorcycle Framed Painting (cleanly stepped in front of wall z=-11.42)
  const paintingGroup = new THREE.Group();
  paintingGroup.position.set(-0.6, 6.0, -11.42);
  voxBox(4.6, 3.2, 0.18, 0x3b2214, 0, 0, 0, paintingGroup);
  voxBox(4.1, 2.7, 0.14, mat(0xffffff, { map: PixelTextures.motorcyclePoster() }), 0, 0, 0.08, paintingGroup);
  scene.add(paintingGroup);

  // Hanging Ultra-Crisp "CENTRAL PERK" Signboard (512x160 high-res texture!)
  serviceSignGroup = new THREE.Group();
  serviceSignGroup.position.set(-0.6, 7.65, -10.1);
  voxBox(0.08, 1.4, 0.08, 0xd0d0d0, -1.6, 0.95, 0, serviceSignGroup);
  voxBox(0.08, 1.4, 0.08, 0xd0d0d0, 1.6, 0.95, 0, serviceSignGroup);
  voxBox(4.8, 1.38, 0.24, mat(0xffffff, {
    map: PixelTextures.serviceSign(),
    emissive: 0x3a0502,
    emissiveIntensity: 0.22
  }), 0, 0, 0, serviceSignGroup);
  scene.add(serviceSignGroup);
  tagInteractive(serviceSignGroup, { type: 'sign', message: '🔔 CENTRAL PERK 招牌 · 老友记永远的聚会圣地！' });

  // Decorative Colorful Orbs + Pink Blossom Arrangement
  [-4.6, 3.6].forEach(xPos => {
    [7.5, 6.1, 4.7].forEach((yPos, idx) => {
      const cols = [0xe65c2e, 0xf2b738, 0xd92b2b];
      voxBox(0.65, 0.65, 0.65, cols[idx % 3], xPos, yPos, -11.18);
    });
  });
  // Pink blossom voxel tree on back-right stand
  voxBox(1.1, 2.2, 1.1, darkWoodMat, 3.8, 1.3, -10.6);
  [[3.6, 3.0, -10.5], [4.0, 3.4, -10.4], [3.5, 3.7, -10.7], [3.9, 4.0, -10.6]].forEach(([fx, fy, fz]) => {
    voxBox(0.45, 0.45, 0.45, 0xff7da0, fx, fy, fz);
  });

  // Right Brick Wall Section & Angled Bay Window Wall
  voxBox(4.4, 9.2, 0.84, brickPillarMat, 7.4, 4.6, -11.3);
  voxBox(1.2, 9.2, 1.54, brickPillarMat, 9.0, 4.6, -10.95); // Corner return column bridging to rightBackWall
  voxBox(4.6, 0.55, 1.04, 0xf4eee4, 7.4, 9.48, -11.3);
  voxBox(1.4, 0.56, 1.74, 0xf4eee4, 9.0, 9.485, -10.95);

  const rightBackWall = new THREE.Group();
  rightBackWall.position.set(12.64, 4.6, -10.18);
  rightBackWall.rotation.y = -0.15;
  voxBox(7.6, 9.2, 0.64, greenTrimMat, 0, 0, 0, rightBackWall);
  voxBox(7.2, 0.54, 0.88, 0xf4eee4, 0.05, 4.87, 0, rightBackWall);
  voxBox(3.8, 6.0, 0.78, 0x6e4327, -0.3, -0.8, 0, rightBackWall);
  voxBox(1.5, 2.3, 0.92, 0xf5ebd8, -1.25, 0.6, 0, rightBackWall);
  voxBox(1.5, 2.3, 0.92, 0xf5ebd8, 0.65, 0.6, 0, rightBackWall);
  scene.add(rightBackWall);

  // Right Side Bay Window Wall — TRUE HOLLOW SEE-THROUGH WINDOWS (Balanced Z=24.8 with Zero Z-Fighting!)
  const rightSideWall = new THREE.Group();
  rightSideWall.position.set(15.2, 4.6, 0.3);
  rightSideWall.rotation.y = -0.15;
  const creamWallMat = mat(0xefe3ce, { variance: 10 });
  const clearGlassMat = new THREE.MeshStandardMaterial({
    color: 0x88b4cc,
    transparent: true,
    opacity: 0.26,
    roughness: 0.15,
    metalness: 0.1,
    depthWrite: false
  });
  const logoMat = new THREE.MeshBasicMaterial({
    map: PixelTextures.centralPerkWindowLogo(),
    transparent: true,
    opacity: 0.96,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    side: THREE.DoubleSide
  });

  // 1) Solid Lower Wainscot Wall & Upper Header Wall (flush at local z=-10.3 to meet rightBackWall at a seamless 90° corner)
  voxBox(0.68, 2.5, 18.2, creamWallMat, 0, -3.35, -1.2, rightSideWall);
  voxBox(0.68, 1.5, 18.2, creamWallMat, 0, 3.85, -1.2, rightSideWall);
  voxBox(0.92, 0.55, 20.2, 0xf4eee4, 0, 4.88, -0.2, rightSideWall);

  // 2) Vertical Wall Mullion Pillars between the 4 Hollow Window Openings (back pillar flush to z=-10.3)
  voxBox(0.68, 5.2, 1.60, creamWallMat, 0, 0.5, -9.5, rightSideWall);
  [-4.9, -0.7, 3.5, 7.1].forEach(pz => {
    voxBox(0.68, 5.2, 0.80, creamWallMat, 0, 0.5, pz, rightSideWall);
  });

  // 3) 4 Spacious True Hollow Bay Windows (you can see inside from the right side with zero glitching!)
  [-7.0, -2.8, 1.4, 5.3].forEach((wz, idx) => {
    const winW = idx === 3 ? 2.8 : 3.35;
    // Hollow Green Window Frame (top bar, bottom sill, left & right vertical stiles, upper transom bar)
    voxBox(0.78, 0.28, winW + 0.12, greenTrimMat, 0, 3.0, wz, rightSideWall);
    voxBox(0.82, 0.32, winW + 0.16, greenTrimMat, 0, -2.0, wz, rightSideWall);
    voxBox(0.76, 5.0, 0.24, greenTrimMat, 0, 0.5, wz - winW / 2 + 0.08, rightSideWall);
    voxBox(0.76, 5.0, 0.24, greenTrimMat, 0, 0.5, wz + winW / 2 - 0.08, rightSideWall);
    // Upper cream transom blind bar (cleanly thicker so it never shares a plane with glass or frame)
    voxBox(0.84, 0.75, winW - 0.26, 0xf7eedc, 0, 2.15, wz, rightSideWall);

    // Thin center glass pane inside the hollow frame (x=0, thickness=0.06)
    voxBox(0.06, 4.6, winW - 0.30, clearGlassMat, 0, 0.45, wz, rightSideWall, false);

    // Iconic Crisp CENTRAL PERK decal on the center window (visible from both inside & outside!)
    if (idx === 2) {
      const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.75, 1.38), logoMat);
      logoPlane.position.set(0.06, 0.35, wz);
      logoPlane.rotation.y = Math.PI / 2;
      rightSideWall.add(logoPlane);
    }
  });

  // 4) Front Brick Corner Pillar (cleanly at z=8.55, thicker than cream wall)
  voxBox(1.06, 9.2, 2.2, brickPillarMat, 0, 0, 8.55, rightSideWall);
  scene.add(rightSideWall);

  // 3. WALL SCONCES & CURVED OVERHEAD TRACK LIGHTING
  function addWallSconce(x, y, z, rotY = 0, twin = true) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    voxBox(0.5, 0.4, 0.25, 0x2a1d17, 0, 0, 0, g);
    (twin ? [-0.35, 0.35] : [0]).forEach(ox => {
      const bulbMat = mat(0xfff0c2, { emissive: 0xffaa33, emissiveIntensity: 1.6, grain: false });
      const shade = voxCyl(0.22, 0.34, 0.45, 6, bulbMat, ox, 0.35, 0.25, g);
      lampBulbs.push(shade.material);
    });
    const pl = new THREE.PointLight(0xff9d42, 0.55, 10.5);
    pl.position.set(x, y + 0.2, z + 0.5);
    scene.add(pl);
    warmPointLights.push(pl);
    scene.add(g);
  }
  addWallSconce(-17.3, 4.2, 8.5, Math.PI / 2, true);
  addWallSconce(-15.5, 7.8, -11.3, 0, false);
  addWallSconce(7.0, 7.2, -10.7, 0, true);
  addWallSconce(14.7, 5.2, 8.5, -Math.PI / 2, true);

  // Overhead Black Curved Track Lighting Rail
  const trackGroup = new THREE.Group();
  scene.add(trackGroup);
  voxBox(8.5, 0.18, 0.18, 0x1a1614, -13.0, 8.6, -2.8, trackGroup);
  voxBox(0.18, 0.18, 8.5, 0x1a1614, -8.8, 8.6, -6.8, trackGroup);
  [[-8.8, -3.0], [-8.8, -5.8], [-8.8, -8.5]].forEach(([tx, tz]) => {
    voxCyl(0.06, 0.06, 0.6, 6, 0x222222, tx, 8.25, tz, trackGroup);
    voxCyl(0.15, 0.38, 0.5, 8, 0xc0c0c0, tx, 7.85, tz, trackGroup);
    const bMat = mat(0xfffae0, { emissive: 0xffb84d, emissiveIntensity: 1.8, grain: false });
    const bulb = voxBox(0.22, 0.22, 0.22, bMat, tx, 7.55, tz, trackGroup);
    lampBulbs.push(bulb.material);
  });

  // 4. FOREGROUND CENTER: LARGE PERSIAN RUG + TUFTED ORANGE COUCH + COFFEE TABLE + ROSS'S TAUPE ARMCHAIR + LEFT BISTRO TABLE
  const persianRugMat = mat(0xffffff, { map: PixelTextures.persianRug() });
  const runnerRugMat = mat(0xffffff, { map: PixelTextures.runnerRug() });
  const leopardMat = mat(0xffffff, { map: PixelTextures.leopardPrint() });
  const floralCushMat = mat(0xffffff, { map: PixelTextures.floralCushion() });
  const blackIron = mat(0x181a18, { roughness: 0.5, metalness: 0.4 });

  // 4A) Foreground Main Persian Rug & Iconic Tufted Orange Velvet Couch with Golden Fringe
  // Shifted slightly left (X=-0.5) so there is a spacious gap on the right to Ross's armchair, and closer to Joey's small round table on the left!
  voxBox(12.2, 0.08, 7.8, persianRugMat, 0.1, 0.25, 5.1);
  buildSteppedVoxelSofa(-0.5, 0.25, 2.3, 6.6, 0xd85224, 0xe8682e, 3, true);

  // 4B) Distressed Sage-Wood & Oak Coffee Table (with Magazines, Floral Bowl & Twin White Ceramic Pitchers!)
  const coffeeTable = new THREE.Group();
  coffeeTable.position.set(-0.5, 0.25, 5.65);
  voxBox(4.6, 0.22, 2.35, 0xc89d66, 0, 1.26, 0, coffeeTable); // Warm oak tabletop
  voxBox(4.4, 0.24, 2.15, 0x626b54, 0, 1.05, 0, coffeeTable); // Weathered sage-green apron frame
  [[-1.95, -0.92], [1.95, -0.92], [-1.95, 0.92], [1.95, 0.92]].forEach(([lx, lz]) => {
    voxBox(0.22, 1.05, 0.22, 0x4b5240, lx, 0.52, lz, coffeeTable);
  });

  // Left Stack of Magazines ("CIO" blue & red magazines from the photo!)
  const mag1 = voxBox(0.85, 0.08, 1.05, 0xf2efe9, -1.55, 1.41, 0.25, coffeeTable);
  mag1.rotation.y = 0.25;
  const mag2 = voxBox(0.78, 0.08, 0.96, 0x2b62a8, -1.62, 1.48, 0.22, coffeeTable);
  mag2.rotation.y = 0.38;
  voxBox(0.65, 0.06, 0.25, 0xd93829, -1.62, 1.53, 0.05, coffeeTable);

  // Center Floral Arrangement Bowl + Twin White Ceramic Creamer/Coffee Pitchers
  voxCyl(0.38, 0.28, 0.22, 8, 0x38593b, -0.35, 1.46, 0.1, coffeeTable);
  [[-0.45, 0.05, 0xff7b24], [-0.25, 0.18, 0xffbe2e], [-0.35, -0.05, 0xe84a27]].forEach(([fx, fz, fc]) => {
    voxBox(0.22, 0.22, 0.22, fc, fx, 1.64, fz, coffeeTable);
  });
  // Two White Ceramic Pitchers (Signature detail in the photo!)
  voxCyl(0.18, 0.22, 0.42, 8, 0xfaf8f5, -0.05, 1.56, 0.52, coffeeTable);
  voxCyl(0.16, 0.20, 0.36, 8, 0xfaf8f5, 0.28, 1.53, 0.22, coffeeTable);
  // Green Tray & Saucer Plates + Dark Booklet on Right
  voxCyl(0.32, 0.28, 0.06, 8, 0xd8e2bd, -0.15, 1.40, -0.55, coffeeTable);
  voxBox(0.55, 0.08, 0.55, 0x4b5e48, 0.72, 1.41, 0.15, coffeeTable);
  const rightBook = voxBox(0.55, 0.07, 0.68, 0x2c302e, 1.15, 1.41, 0.55, coffeeTable);
  rightBook.rotation.y = -0.35;

  function addCoffeeCup(parent, x, y, z, cupColor, worldX, worldZ) {
    const cg = new THREE.Group();
    cg.position.set(x, y, z);
    voxCyl(0.34, 0.28, 0.06, 8, 0xdfe6c8, 0, 0.03, 0, cg);
    voxCyl(0.22, 0.18, 0.32, 8, cupColor, 0, 0.20, 0, cg);
    voxCyl(0.18, 0.18, 0.04, 8, 0x3b2212, 0, 0.35, 0, cg);
    parent.add(cg);
    tagInteractive(cg, { type: 'coffee', message: '☕ 咖啡香气四溢！蒸汽+100%' });

    for (let i = 0; i < 3; i++) {
      const sMat = mat(0xffffff, { transparent: true, opacity: 0.55, grain: false });
      const sp = voxBox(0.13, 0.13, 0.13, sMat, worldX, y + 0.75 + i * 0.32, worldZ, scene, false);
      steamParticles.push({
        mesh: sp,
        baseX: worldX,
        baseY: y + 0.7,
        baseZ: worldZ,
        offset: i * 1.4 + worldX
      });
    }
  }
  addCoffeeCup(coffeeTable, -0.95, 1.38, -0.52, 0xf2d272, -1.45, 5.13);
  addCoffeeCup(coffeeTable, 0.55, 1.38, -0.48, 0x7b587d, 0.05, 5.17);
  addCoffeeCup(coffeeTable, 1.45, 1.38, -0.35, 0x262626, 0.95, 5.30);
  scene.add(coffeeTable);

  // 4C) Foreground Right: Ross's Olive-Taupe Tufted Armchair with Rolled Arms & Fringe Skirt!
  // Spaced comfortably away from the Orange Couch (X=-0.5..+2.8) & Coffee Table (X=-0.5..+1.8)!
  const greyChair = new THREE.Group();
  greyChair.position.set(4.85, 0.25, 5.65);
  greyChair.rotation.y = -0.82;
  const taupeFabric = mat(0x7c7058, { variance: 14 });
  const taupeFringe = mat(0x9e8c6a, { variance: 16 });
  voxBox(2.3, 0.32, 2.15, taupeFringe, 0, 0.22, 0, greyChair); // Bottom fringe skirt
  voxBox(2.25, 0.52, 2.1, taupeFabric, 0, 0.62, 0, greyChair);
  voxBox(1.5, 0.28, 1.6, mat(0x8a7d63, { variance: 12 }), 0, 0.98, 0.12, greyChair);
  voxBox(2.15, 1.95, 0.58, taupeFabric, 0, 1.75, -0.78, greyChair); // High tufted back
  voxBox(1.75, 0.32, 0.48, taupeFabric, 0, 2.82, -0.78, greyChair);
  [-0.5, 0, 0.5].forEach(px => voxBox(0.12, 0.12, 0.12, 0x4d4433, px, 1.95, -0.46, greyChair));
  voxBox(0.52, 1.25, 2.05, taupeFabric, -0.96, 1.18, 0.04, greyChair);
  voxBox(0.52, 1.25, 2.05, taupeFabric, 0.96, 1.18, 0.04, greyChair);
  scene.add(greyChair);

  // 4D) Foreground Left: Small Round Wood Bistro Table + TWO Leopard/Botanical Print Wooden Chairs (Joey sits here!)
  const frontLeftTable = new THREE.Group();
  frontLeftTable.position.set(-5.0, 0.25, 6.0);
  voxCyl(1.18, 1.18, 0.18, 12, medWoodMat, 0, 1.52, 0, frontLeftTable);
  voxCyl(0.20, 0.54, 1.48, 8, blackIron, 0, 0.75, 0, frontLeftTable);
  voxCyl(0.18, 0.15, 0.32, 8, 0xd93829, -0.22, 1.72, -0.1, frontLeftTable);
  voxBox(0.32, 0.24, 0.22, 0xb83227, 0.15, 1.70, 0.15, frontLeftTable);
  scene.add(frontLeftTable);

  function addLeopardWoodChair(x, y, z, rotY) {
    const ch = new THREE.Group();
    ch.position.set(x, y, z);
    ch.rotation.y = rotY;
    voxBox(1.22, 0.22, 1.22, leopardMat, 0, 0.98, 0, ch); // Leopard seat
    voxBox(1.18, 0.95, 0.20, leopardMat, 0, 1.78, -0.52, ch); // Leopard backrest
    [[-0.48, -0.48], [0.48, -0.48], [-0.48, 0.48], [0.48, 0.48]].forEach(([lx, lz]) => {
      voxBox(0.16, 0.98, 0.16, darkWoodMat, lx, 0.49, lz, ch);
    });
    voxBox(0.16, 0.85, 0.85, darkWoodMat, -0.52, 1.35, -0.1, ch);
    voxBox(0.16, 0.85, 0.85, darkWoodMat, 0.52, 1.35, -0.1, ch);
    scene.add(ch);
  }
  addLeopardWoodChair(-6.35, 0.25, 4.75, 1.18); // Joey's chair facing the Orange Couch & Coffee Table!
  addLeopardWoodChair(-6.45, 0.25, 7.15, 1.95);

  // 5. CENTER-MID (DIRECTLY BEHIND ORANGE COUCH): LONG RUNNER RUG + 2 HIGH ROUND BISTRO TABLES + 6 SQUARE FLORAL STOOLS!
  voxBox(6.8, 0.08, 7.2, runnerRugMat, -0.3, 0.25, -3.2);

  [[-0.25, -1.6], [-0.45, -4.9]].forEach(([tx, tz]) => {
    const bistro = new THREE.Group();
    bistro.position.set(tx, 0.25, tz);
    voxCyl(1.18, 1.18, 0.16, 12, medWoodMat, 0, 1.85, 0, bistro);
    voxCyl(0.16, 0.16, 1.82, 8, blackIron, 0, 0.91, 0, bistro);
    voxCyl(0.58, 0.62, 0.08, 10, blackIron, 0, 0.04, 0, bistro);
    // Tiny floral centerpiece & coffee cups on each bistro table
    voxBox(0.28, 0.26, 0.28, 0xff8524, 0, 2.02, 0, bistro);
    voxCyl(0.16, 0.14, 0.24, 8, 0x263859, -0.42, 2.0, 0.25, bistro);
    voxCyl(0.16, 0.14, 0.24, 8, 0xf5efe6, 0.38, 2.0, -0.28, bistro);
    scene.add(bistro);
  });

  // 6 Square Floral-Upholstered High Wooden Barstools around the 2 Mid Bistro Tables!
  [
    [-1.35, -0.55, 0.2], [0.05, -0.45, -0.15], [1.15, -1.55, 0.35],
    [-1.75, -4.25, 0.1], [-0.25, -3.75, -0.1], [0.95, -4.65, 0.25]
  ].forEach(([sx, sz, srot]) => {
    const sqStool = new THREE.Group();
    sqStool.position.set(sx, 0.25, sz);
    sqStool.rotation.y = srot;
    voxBox(0.96, 0.36, 0.96, floralCushMat, 0, 1.38, 0, sqStool);
    [[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]].forEach(([lx, lz]) => {
      voxBox(0.12, 1.25, 0.12, darkWoodMat, lx, 0.62, lz, sqStool);
    });
    voxBox(0.78, 0.08, 0.78, darkWoodMat, 0, 0.45, 0, sqStool); // Footrest rung
    scene.add(sqStool);
  });

  // 6. FAR-BACK CENTER ALCOVE: CRIMSON-RED VELVET SOFA + TWO RED ARMCHAIRS + OCTAGONAL TABLE + BOOKCASE!
  voxBox(6.0, 0.08, 3.6, persianRugMat, -0.2, 0.25, -9.6);
  buildSteppedVoxelSofa(-0.2, 0.25, -10.55, 4.5, 0x8c1d18, 0xa62620, 2, false);

  // Two Red Armchairs Flanking the Back Alcove
  [[-3.05, -9.15, 1.15], [2.65, -9.15, -1.15]].forEach(([rx, rz, rrot]) => {
    const redCh = new THREE.Group();
    redCh.position.set(rx, 0.25, rz);
    redCh.rotation.y = rrot;
    const redVelvet = mat(0xb02820, { variance: 14 });
    voxBox(1.75, 0.55, 1.65, redVelvet, 0, 0.55, 0, redCh);
    voxBox(1.65, 1.45, 0.42, redVelvet, 0, 1.35, -0.62, redCh);
    voxBox(0.36, 1.05, 1.6, redVelvet, -0.72, 0.95, 0, redCh);
    voxBox(0.36, 1.05, 1.6, redVelvet, 0.72, 0.95, 0, redCh);
    scene.add(redCh);
  });

  // Octagonal Dark Wood & Glass Coffee Table in Back Alcove
  const octTable = new THREE.Group();
  octTable.position.set(-0.2, 0.25, -8.85);
  voxCyl(1.15, 1.15, 0.16, 8, darkWoodMat, 0, 0.95, 0, octTable);
  voxCyl(0.85, 0.85, 0.88, 8, 0x261810, 0, 0.45, 0, octTable);
  voxBox(0.45, 0.12, 0.35, 0xd9453b, -0.2, 1.08, 0.1, octTable);
  scene.add(octTable);

  // Wooden Bookcase filled with colorful books on right of back sofa
  const bookcase = new THREE.Group();
  bookcase.position.set(2.85, 0.25, -10.85);
  voxBox(1.6, 2.4, 0.85, darkWoodMat, 0, 1.2, 0, bookcase);
  [-0.5, 0, 0.5].forEach((bx, bi) => {
    voxBox(0.35, 0.65, 0.65, [0xd93829, 0xebad38, 0x3875b8][bi], bx, 1.45, 0.1, bookcase);
  });
  scene.add(bookcase);

  // 7. LEFT SIDE: ANGLED GREEN-MARBLE BAR COUNTER + FRONT SNACK DISPLAY + 4 SWIVEL BARSTOOLS + ESPRESSO HUTCH!
  // Positioned at X=-9.4, Z=-2.4 so there is a WIDE, spacious walkway between the Bar and the Orange Couch!
  const marbleMat = mat(0xffffff, { map: PixelTextures.greenMarble(4, 3), roughness: 0.35 });
  const oakPanelMat = mat(0x7a4b2a, { variance: 14 });

  // 7A) Angled Main Bar Counter (with Front Snack & Bottled Drink Rack + Back White Cake Dome & Cash Register!)
  const barCounter = new THREE.Group();
  barCounter.position.set(-9.4, 0.25, -2.4);
  barCounter.rotation.y = 0.24;

  // Main angled counter body & green-veined marble countertop
  voxBox(2.1, 2.25, 7.2, oakPanelMat, 0, 1.12, -0.6, barCounter);
  voxBox(2.35, 0.22, 7.5, marbleMat, 0, 2.34, -0.6, barCounter);

  // Front Cutaway Snack, Chip & Bottled Drink Display Rack (Facing foreground!)
  const snackCase = new THREE.Group();
  snackCase.position.set(-0.65, 0, 3.05);
  voxBox(2.4, 2.25, 1.9, oakPanelMat, 0, 1.12, 0, snackCase);
  voxBox(2.6, 0.22, 2.1, marbleMat, 0, 2.34, 0, snackCase);
  // 3 Shelves of Red Snack Boxes, Yellow Chip Bags & Colorful Drink Bottles!
  [-0.75, -0.25, 0.25, 0.75].forEach((sx, si) => {
    voxBox(0.42, 0.48, 0.45, 0xd92626, sx, 1.85, 0.76, snackCase); // Top row: Red snack boxes
    voxBox(0.38, 0.42, 0.42, si % 2 === 0 ? 0xf2c12e : 0xd9822b, sx, 1.25, 0.78, snackCase); // Mid row: Yellow/orange chips
    voxCyl(0.14, 0.14, 0.42, 6, [0x6e38a8, 0x4aa838, 0xe8c527, 0x3878c8][si], sx, 0.62, 0.80, snackCase); // Bottom row: Bottles
  });
  barCounter.add(snackCase);

  // White Glass Pedestal Cake Stand with White Frosted Cake + Vintage Black Cash Register on Back of Counter!
  voxCyl(0.52, 0.35, 0.35, 10, 0xfaf8f5, 0.1, 2.62, -3.3, barCounter);
  voxCyl(0.44, 0.44, 0.42, 10, 0xfffdf7, 0.1, 2.95, -3.3, barCounter); // White frosted cake
  voxBox(0.85, 0.75, 0.85, 0x1e2022, -0.15, 2.82, -4.15, barCounter); // Black cash register
  tagInteractive(barCounter, { type: 'cake', scenario: 'food' });
  scene.add(barCounter);

  // 7B) 4 Round Patterned-Cushion Swivel Barstools with Silver Chrome Legs & Footrings!
  const chromeMat = mat(0xd0d6dc, { metalness: 0.75, roughness: 0.2, grain: false });
  [[-7.35, 0.45], [-7.0, -0.95], [-6.65, -2.35], [-6.3, -3.75]].forEach(([bx, bz]) => {
    const stool = new THREE.Group();
    stool.position.set(bx, 0.25, bz);
    voxCyl(0.62, 0.60, 0.34, 10, floralCushMat, 0, 1.52, 0, stool);
    voxCyl(0.08, 0.08, 1.45, 8, chromeMat, 0, 0.72, 0, stool);
    voxCyl(0.48, 0.48, 0.06, 10, chromeMat, 0, 0.55, 0, stool); // Chrome circular footring
    voxCyl(0.42, 0.46, 0.08, 10, chromeMat, 0, 0.04, 0, stool);
    scene.add(stool);
  });

  // 7C) Backbar Wooden Hutch & Ornate Copper/Brass Twin-Dome Espresso Machine along Left Wall!
  const backbar = new THREE.Group();
  backbar.position.set(-13.8, 0.25, -2.6);
  backbar.rotation.y = 0.24;
  voxBox(2.1, 2.2, 10.2, oakPanelMat, 0, 1.1, 0, backbar);
  voxBox(2.3, 0.2, 10.4, marbleMat, 0, 2.28, 0, backbar);
  voxBox(1.3, 3.8, 9.8, darkWoodMat, -0.35, 4.2, 0, backbar);
  // Rows of white mugs, syrup bottles, red & orange tea tins in the hutch
  for (let z = -4.2; z <= 4.2; z += 1.2) {
    voxCyl(0.18, 0.16, 0.34, 6, 0xfaf8f5, 0.35, 1.4, z, backbar);
    voxBox(0.35, 0.48, 0.35, z > 0 ? 0xe84829 : 0xf29b2e, 0.35, 0.65, z, backbar);
    voxCyl(0.22, 0.22, 0.52, 8, 0xd4a238, 0.2, 3.6, z, backbar);
  }
  // Ornate Vintage Copper & Brass Espresso Machine with Twin Golden Domes!
  const copperMat = mat(0xb86236, { metalness: 0.6, roughness: 0.3 });
  const brassMat = mat(0xe6b842, { metalness: 0.7, roughness: 0.25 });
  voxBox(1.15, 1.35, 2.3, copperMat, 0.25, 3.05, -0.5, backbar);
  voxCyl(0.32, 0.36, 0.55, 8, brassMat, 0.25, 3.95, -0.95, backbar);
  voxCyl(0.32, 0.36, 0.55, 8, brassMat, 0.25, 3.95, -0.05, backbar);
  scene.add(backbar);

  // 8. RIGHT ELEVATED TILED TERRACE: FERN PLANT STAND + WOODEN ENTRANCE DOOR + GREEN FLORAL PEDESTAL + RED/GOLD BROCADE SOFA + 2 ROUND TABLES & 3 LEOPARD CHAIRS!
  // 8A) Diagonal Persian Rug on the White-Tiled Raised Terrace
  const rightRug = voxBox(4.8, 0.08, 10.2, persianRugMat, 10.4, 0.64, 1.55);
  rightRug.rotation.y = -0.15;

  // 8B) Brick Pillar + Wooden Plant Stand with Lush Green Boston Fern & Tall Floral Vase (Top-Right by Door!)
  const fernTable = new THREE.Group();
  fernTable.position.set(6.4, 0.64, -8.3);
  fernTable.rotation.y = -0.18;
  voxBox(1.5, 1.45, 1.3, medWoodMat, 0, 0.72, 0, fernTable);
  // Lush green Boston fern on lower shelf / floor
  [[-0.2, 0.35, 0.4], [0.25, 0.42, 0.38], [0, 0.58, 0.52], [-0.35, 0.28, 0.25], [0.35, 0.3, 0.2]].forEach(([fx, fy, fz]) => {
    voxBox(0.42, 0.38, 0.42, 0x2d7a3e, fx, fy, fz, fernTable);
  });
  // Tall floral vase on top of plant stand
  voxCyl(0.24, 0.18, 0.55, 8, 0xd9bf9b, 0, 1.72, 0, fernTable);
  voxBox(0.65, 0.65, 0.65, 0x8c2424, 0, 2.25, 0, fernTable);
  scene.add(fernTable);

  // 8C) Lime/Olive-Green Carved Wooden Pedestal Column with Big Orange Floral Bouquet!
  const greenPedestal = new THREE.Group();
  greenPedestal.position.set(11.4, 0.64, -3.2);
  greenPedestal.rotation.y = -0.15;
  const oliveColMat = mat(0x7d8c38, { variance: 14 });
  voxBox(1.15, 2.45, 1.15, oliveColMat, 0, 1.22, 0, greenPedestal);
  voxBox(1.32, 0.25, 1.32, oliveColMat, 0, 2.48, 0, greenPedestal);
  [[0, 2.85, 0, 0xff6e24], [-0.28, 2.75, 0.2, 0x2d7a3e], [0.28, 2.8, -0.15, 0xffaa2b]].forEach(([fx, fy, fz, fc]) => {
    voxBox(0.45, 0.45, 0.45, fc, fx, fy, fz, greenPedestal);
  });
  scene.add(greenPedestal);

  // 8D) Ornate Red-and-Gold Brocade Sofa against Right Bay Window Wall + Phoebe's Guitar!
  const redSofa = new THREE.Group();
  redSofa.position.set(12.5, 0.64, 1.55);
  redSofa.rotation.y = -Math.PI / 2 - 0.15;
  const redFloralMat = mat(0xffffff, { map: PixelTextures.floralRed(), roughness: 0.8 });
  voxBox(5.0, 0.62, 1.85, redFloralMat, 0, 0.52, 0, redSofa);
  voxBox(4.8, 1.85, 0.46, redFloralMat, 0, 1.52, -0.68, redSofa);
  voxBox(0.44, 1.25, 1.85, 0x6e3b1e, -2.3, 0.98, 0, redSofa);
  voxBox(0.44, 1.25, 1.85, 0x6e3b1e, 2.3, 0.98, 0, redSofa);
  // Leopard-print throw pillows on the brocade sofa (just like the photo!)
  voxBox(0.75, 0.72, 0.35, leopardMat, -1.4, 1.22, -0.32, redSofa);
  voxBox(0.75, 0.72, 0.35, leopardMat, 1.4, 1.22, -0.32, redSofa);

  const guitar = new THREE.Group();
  guitar.position.set(1.05, 1.45, 0.12);
  guitar.rotation.set(-0.35, 0.2, -0.28);
  voxBox(0.85, 1.05, 0.28, 0xc87d3b, 0, 0, 0, guitar);
  voxBox(0.68, 0.75, 0.28, 0xc87d3b, 0, 0.65, 0, guitar);
  voxCyl(0.2, 0.2, 0.3, 8, 0x1e120a, 0, 0.3, 0, guitar);
  voxBox(0.22, 1.5, 0.16, 0x4a2c16, 0, 1.6, 0, guitar);
  voxBox(0.3, 0.42, 0.18, 0x3b2010, 0, 2.4, 0, guitar);
  redSofa.add(guitar);
  tagInteractive(guitar, { type: 'guitar', char: 'phoebe' });
  scene.add(redSofa);

  // 8E) Two Small Round Café Tables + 3 Leopard-Print Wooden Chairs on the Right Terrace Rug!
  [[8.5, -1.35], [9.25, 3.35]].forEach(([tx, tz]) => {
    const rt = new THREE.Group();
    rt.position.set(tx, 0.64, tz);
    voxCyl(1.18, 1.18, 0.16, 12, medWoodMat, 0, 1.52, 0, rt);
    voxCyl(0.18, 0.48, 1.48, 8, blackIron, 0, 0.75, 0, rt);
    voxBox(0.28, 0.26, 0.28, 0xff7b24, 0, 1.72, 0, rt);
    voxCyl(0.16, 0.14, 0.24, 8, 0xf29bbb, -0.38, 1.68, 0.25, rt);
    scene.add(rt);
  });
  addLeopardWoodChair(9.7, 0.64, -3.6, -0.15);
  addLeopardWoodChair(10.45, 0.64, 0.85, -1.65);
  addLeopardWoodChair(10.05, 0.64, 5.35, -2.85);

  // Phoebe's Mic Stand next to the Right Terrace
  const mic = new THREE.Group();
  mic.position.set(7.7, 0.64, 1.05);
  voxCyl(0.42, 0.45, 0.14, 10, blackIron, 0, 0.07, 0, mic);
  voxCyl(0.06, 0.06, 2.8, 6, blackIron, 0, 1.45, 0, mic);
  const boom = voxBox(0.12, 0.12, 0.85, blackIron, 0.15, 2.85, 0, mic);
  boom.rotation.z = 0.45;
  boom.rotation.y = 0.5;
  scene.add(mic);
  tagInteractive(mic, { type: 'guitar', char: 'phoebe' });
  scene = _prevScene;
}

// ==================== BUILD 4TH FLOOR HALLWAY DIORAMA (Connecting Apt 19 & 20) ====================
function buildHallwayDiorama(hallwayGroup) {
  const woodPlankMat = mat(0xffffff, { map: PixelTextures.woodPlanks(3, 8), roughness: 0.78 });
  const runnerMat = mat(0xffffff, { map: PixelTextures.hallwayRunner(3, 8), roughness: 0.82 });
  const creamWallMat = mat(0xded7c8, { variance: 6 });
  const darkTrimMat = mat(0x382214, { variance: 8 });
  const whiteTrimMat = mat(0xf7f4ed, { variance: 6 });
  const brassMat = mat(0xf2bf38, { metalness: 0.65, roughness: 0.25 });

  // 1. Narrowed Cozy NYC Hallway Floor (Strictly between x = -2.8 and +2.8, z = -10.8 to +8.8 -> width 5.6, depth 19.6, zero overlap!)
  voxBox(5.6, 0.32, 19.6, woodPlankMat, 0.0, 0.08, -1.0, hallwayGroup);
  voxBox(3.4, 0.05, 18.6, runnerMat, 0.0, 0.265, -1.0, hallwayGroup);

  // 2. Back North Wall (Unified at z = -10.8, y = 0.24 so crown molding aligns with both apartments at y = 9.59!)
  const backWall = new THREE.Group();
  backWall.position.set(0, 0.24, -10.8);
  voxBox(5.6, 9.2, 0.75, creamWallMat, 0, 4.6, 0, backWall);
  voxBox(5.6, 0.7, 0.14, darkTrimMat, 0, 0.35, 0.44, backWall); // Baseboard (stepped forward on interior face)
  voxBox(5.6, 0.22, 0.14, darkTrimMat, 0, 3.6, 0.44, backWall); // Chair rail
  voxBox(5.8, 0.48, 0.95, whiteTrimMat, 0, 9.35, 0, backWall);  // Crown molding

  // Vintage Framed Hallway Artwork & Brass "4F" Plaque above Stairwell
  voxBox(2.0, 1.5, 0.12, darkTrimMat, 0, 6.3, 0.43, backWall);  // Walnut frame
  voxBox(1.7, 1.2, 0.12, 0xf5efe2, 0, 6.3, 0.49, backWall);   // Matboard
  voxBox(1.2, 0.8, 0.12, 0x5c7a6e, 0, 6.3, 0.55, backWall);   // Vintage botanical/NYC art canvas
  voxBox(0.8, 0.3, 0.12, brassMat, 0, 4.9, 0.44, backWall);   // Brass "4F" floor plate

  // Two Warm Glowing Sconces in Hallway Back Wall
  [-1.8, 1.8].forEach(sx => {
    voxBox(0.25, 0.5, 0.3, brassMat, sx, 6.2, 0.44, backWall);
    const sconceShade = voxCyl(0.25, 0.15, 0.45, 8, mat(0xffebb3, { emissive: 0xffa433, emissiveIntensity: 1.5, grain: false }), sx, 6.45, 0.60, backWall);
    lampBulbs.push(sconceShade.material);
    const pl = new THREE.PointLight(0xffa43b, 0.65, 10.5);
    pl.position.set(sx, 6.7, -10.0);
    hallwayGroup.add(pl);
    warmPointLights.push(pl);
    hallwaySconceLights.push(pl);
  });
  hallwayGroup.add(backWall);

  // 2B. Non-Overlapping Hallway Side Wainscoting
  voxBox(0.12, 0.70, 14.3, darkTrimMat, -2.74, 0.59, -3.25, hallwayGroup);
  voxBox(0.12, 0.22, 14.3, darkTrimMat, -2.74, 3.84, -3.25, hallwayGroup);
  voxBox(0.12, 0.70, 14.3, darkTrimMat, 2.74, 0.59, -3.25, hallwayGroup);
  voxBox(0.12, 0.22, 14.3, darkTrimMat, 2.74, 3.84, -3.25, hallwayGroup);

  // 3. Stairwell Landing & Wooden Steps (Proportionally scaled to fit narrowed hallway at z = -7.8)
  const stairsGroup = new THREE.Group();
  stairsGroup.position.set(0, 0.24, -7.8);
  // Dark wood stair landing carpet base
  voxBox(2.8, 0.16, 3.6, 0x2a1b12, 0, 0.08, -0.8, stairsGroup);
  // 5 Wooden stair steps ascending neatly toward the North wall (from z = +0.6 to -2.0)
  for (let s = 0; s < 5; s++) {
    const stepH = 0.36 * (s + 1);
    voxBox(2.5, stepH, 0.52, 0x6b4226, 0, stepH / 2, 0.6 - s * 0.52, stairsGroup);
    voxBox(2.58, 0.08, 0.56, 0x8b5a2b, 0, stepH + 0.02, 0.6 - s * 0.52, stairsGroup); // Step tread nosing
  }
  // Top landing platform against North wall
  voxBox(2.6, 1.95, 0.85, 0x6b4226, 0, 0.975, -2.1, stairsGroup);
  // Staircase banister handrails & solid side stringers
  [-1.25, 1.25].forEach(bx => {
    const rail = voxBox(0.16, 0.16, 2.8, 0x3d2010, bx, 2.35, -0.6, stairsGroup);
    rail.rotation.x = 0.48;
    // Front & back newel posts
    voxBox(0.24, 1.9, 0.24, 0x4a2a16, bx, 0.95, 0.85, stairsGroup);
    voxBox(0.24, 3.2, 0.24, 0x4a2a16, bx, 1.60, -1.85, stairsGroup);
    // Vertical balusters
    [-1.2, -0.7, -0.2, 0.3].forEach((bz, bi) => {
      const bH = 1.4 + (3 - bi) * 0.28;
      voxCyl(0.04, 0.04, bH, 6, 0x3d2010, bx, bH / 2 + 0.3, bz, stairsGroup);
    });
  });
  hallwayGroup.add(stairsGroup);

  // 4. Outer Faces of Apartment Doors facing each other across hallway:
  // LEFT: Joey's Door #19 outer face (at x = -2.75, y = 0.24, z = 5.9, facing +X into hallway)
  const door19Outer = new THREE.Group();
  door19Outer.position.set(-2.75, 0.24, 5.9);
  voxBox(0.14, 7.8, 3.8, whiteTrimMat, 0, 3.9, 0, door19Outer);

  // Pivoting Door Leaf for Door #19 (hinge at z = -1.68)
  const door19Pivot = new THREE.Group();
  door19Pivot.position.set(0.08, 0, -1.68);
  voxBox(0.14, 7.4, 3.36, mat(0xd4be96, { variance: 6 }), 0, 3.7, 1.68, door19Pivot);
  voxBox(0.12, 1.1, 2.6, 0xd8d0e8, 0.07, 6.55, 1.68, door19Pivot);
  // Brass Door Number "19" in 3D voxels!
  const num19Group = new THREE.Group();
  num19Group.position.set(0.12, 4.8, 1.68);
  voxBox(0.08, 0.65, 0.12, brassMat, 0, 0, -0.25, num19Group); // "1"
  voxBox(0.08, 0.65, 0.12, brassMat, 0, 0, 0.32, num19Group);  // "9"
  voxBox(0.08, 0.35, 0.32, brassMat, 0, 0.15, 0.22, num19Group);
  voxBox(0.08, 0.12, 0.32, brassMat, 0, 0, 0.22, num19Group);
  door19Pivot.add(num19Group);
  voxCyl(0.06, 0.06, 0.18, 8, brassMat, 0.12, 4.3, 1.68, door19Pivot).rotation.z = Math.PI / 2;
  voxBox(0.15, 0.22, 0.22, brassMat, 0.12, 3.4, 2.98, door19Pivot);
  door19Outer.add(door19Pivot);

  const door19Data = {
    pivot: door19Pivot,
    isOpen: false,
    openAngle: -1.45,
    closeAngle: 0,
    currentAngle: 0,
    targetAngle: 0,
    toggle() {
      this.isOpen = !this.isOpen;
      this.targetAngle = this.isOpen ? this.openAngle : this.closeAngle;
      SoundEngine.playSFX('door');
      flash(this.isOpen ? '🚪 Joey & Chandler 的 19 号门已推开！' : '🚪 19 号门已关上。');
    }
  };
  animatedDoors.push(door19Data);
  tagInteractive(door19Pivot, {
    type: 'animated_door',
    door: door19Data,
    message: '🚪 19 号公寓门 (Joey & Chandler)'
  });
  hallwayGroup.add(door19Outer);

  // RIGHT: Monica's Door #20 outer face (at x = +2.75, y = 0.24, z = 5.9, facing -X into hallway)
  const door20Outer = new THREE.Group();
  door20Outer.position.set(2.75, 0.24, 5.9);
  voxBox(0.14, 7.8, 3.8, whiteTrimMat, 0, 3.9, 0, door20Outer);

  // Pivoting Door Leaf for Door #20 (hinge at z = -1.68)
  const door20Pivot = new THREE.Group();
  door20Pivot.position.set(-0.08, 0, -1.68);
  voxBox(0.14, 7.4, 3.36, mat(0x9170bf, { variance: 10 }), 0, 3.7, 1.68, door20Pivot);
  voxBox(0.12, 1.1, 2.6, 0xd8d0e8, -0.07, 6.55, 1.68, door20Pivot);
  // Brass Door Number "20" in 3D voxels!
  const num20Group = new THREE.Group();
  num20Group.position.set(-0.12, 4.8, 1.68);
  voxBox(0.08, 0.65, 0.32, brassMat, 0, 0, -0.25, num20Group); // "2"
  voxBox(0.08, 0.65, 0.32, brassMat, 0, 0, 0.25, num20Group);  // "0"
  door20Pivot.add(num20Group);
  voxCyl(0.06, 0.06, 0.18, 8, brassMat, -0.12, 4.3, 1.68, door20Pivot).rotation.z = Math.PI / 2;
  voxBox(0.15, 0.22, 0.22, brassMat, -0.12, 3.4, 2.98, door20Pivot);
  door20Outer.add(door20Pivot);

  const door20Data = {
    pivot: door20Pivot,
    isOpen: false,
    openAngle: 1.45,
    closeAngle: 0,
    currentAngle: 0,
    targetAngle: 0,
    toggle() {
      this.isOpen = !this.isOpen;
      this.targetAngle = this.isOpen ? this.openAngle : this.closeAngle;
      SoundEngine.playSFX('door');
      flash(this.isOpen ? '🚪 Monica & Rachel 的 20 号紫门已推开！' : '🚪 20 号紫门已关上。');
    }
  };
  animatedDoors.push(door20Data);
  tagInteractive(door20Pivot, {
    type: 'animated_door',
    door: door20Data,
    message: '🚪 20 号公寓门 (Monica & Rachel)'
  });
  hallwayGroup.add(door20Outer);

  // 5. THE ICONIC DROPPED CHEESECAKE EASTER EGG (走廊偷吃芝士蛋糕名场面)
  const cheesecakeGroup = new THREE.Group();
  cheesecakeGroup.position.set(0.0, 0.28, 4.0);

  // Cardboard delivery box base & folded corner flap
  voxBox(2.0, 0.05, 2.0, mat(0xf2ede2, { roughness: 0.9 }), 0, 0.025, 0, cheesecakeGroup);
  voxBox(0.42, 0.24, 0.05, mat(0xe5dcce, { roughness: 0.9 }), -0.92, 0.12, 0.92, cheesecakeGroup);

  // Tilted delivery box lid lying on the rug with red Chicago bakery logo stripe
  const boxLid = new THREE.Group();
  boxLid.position.set(1.42, 0.04, -0.25);
  boxLid.rotation.y = 0.38;
  boxLid.rotation.z = -0.12;
  voxBox(1.9, 0.05, 1.9, mat(0xf9f6ef, { roughness: 0.85 }), 0, 0.025, 0, boxLid);
  voxBox(1.9, 0.26, 0.05, mat(0xeee6d7, { roughness: 0.85 }), 0, 0.13, -0.92, boxLid);
  voxBox(0.28, 0.06, 1.9, mat(0xd90429, { roughness: 0.6 }), 0, 0.03, 0, boxLid); // Red ribbon seal
  cheesecakeGroup.add(boxLid);

  // Delicious Chicago Mama's Little Bakery Cheesecake
  // Golden graham cracker crust rim
  voxBox(1.48, 0.14, 1.38, mat(0xb87c3e, { roughness: 0.85 }), -0.15, 0.09, 0.05, cheesecakeGroup);
  // Rich creamy ivory-white filling
  voxBox(1.36, 0.38, 1.26, mat(0xfff6dc, { roughness: 0.6 }), -0.15, 0.31, 0.05, cheesecakeGroup);
  // Luscious ruby strawberry glaze
  voxBox(1.24, 0.08, 1.14, mat(0xc9182b, { roughness: 0.35, metalness: 0.1 }), -0.15, 0.52, 0.05, cheesecakeGroup);
  // Glossy strawberry garnish pieces
  voxBox(0.32, 0.12, 0.28, mat(0xa00f1e, { roughness: 0.3 }), -0.35, 0.60, -0.15, cheesecakeGroup);
  voxBox(0.28, 0.10, 0.32, mat(0xa00f1e, { roughness: 0.3 }), 0.10, 0.59, 0.20, cheesecakeGroup);

  // Broken-off creamy slice sliding onto cardboard
  voxBox(0.46, 0.10, 0.46, mat(0xb87c3e, { roughness: 0.85 }), 0.55, 0.06, 0.45, cheesecakeGroup);
  voxBox(0.42, 0.28, 0.42, mat(0xfff6dc, { roughness: 0.6 }), 0.55, 0.20, 0.45, cheesecakeGroup);
  voxBox(0.40, 0.06, 0.40, mat(0xc9182b, { roughness: 0.35 }), 0.55, 0.36, 0.45, cheesecakeGroup);

  // Scattered crumbs and strawberry drops on carpet
  voxBox(0.12, 0.04, 0.12, mat(0xb87c3e), 0.78, 0.02, -0.45, cheesecakeGroup);
  voxBox(0.09, 0.04, 0.09, mat(0xc9182b), 0.28, 0.02, 0.88, cheesecakeGroup);
  voxBox(0.10, 0.04, 0.10, mat(0xb87c3e), -0.88, 0.02, 0.68, cheesecakeGroup);
  voxBox(0.14, 0.04, 0.12, mat(0xb87c3e), -0.68, 0.02, -0.78, cheesecakeGroup);

  animatedCheesecake.group = cheesecakeGroup;

  tagInteractive(cheesecakeGroup, {
    type: 'cheesecake',
    message: '🍰 Rachel & Chandler 偷吃掉在走廊地上的芝士蛋糕！Joey 从兜里掏出叉子："Alright, what are we having?"'
  });
  hallwayGroup.add(cheesecakeGroup);
}

function buildJoeyApartmentDiorama(joeyGroup) {
  const parquetMat = mat(0xffffff, { map: PixelTextures.joeyParquet(12, 8), roughness: 0.80 });
  const stripedRugMat = mat(0xffffff, { map: PixelTextures.joeyStripedRug(), roughness: 0.85 });
  const leatherMat = mat(0xffffff, { map: PixelTextures.barcaloungerLeather(), roughness: 0.75 });
  const foosballMat = mat(0xffffff, { map: PixelTextures.foosballTurf(), roughness: 0.85 });
  const magnaMat = mat(0xffffff, { map: PixelTextures.magnaDoodle(), roughness: 0.82 });
  const wallMat = mat(0xe2dac9, { variance: 6 });
  const woodOakMat = mat(0xa86e3c, { variance: 10 });
  const darkWoodMat = mat(0x382214, { variance: 10 });
  const yellowSofaMat = mat(0xedb434, { variance: 8 });
  const whiteTrimMat = mat(0xf7f4ed, { variance: 6 });
  const brassMat = mat(0xf2bf38, { metalness: 0.65, roughness: 0.25 });
  const boatWoodMat = mat(0xb8793e, { variance: 8 });
  const marbleMat = mat(0xffffff, { map: PixelTextures.kitchenTile(3, 4), roughness: 0.5 });
  const floralCurtainMat = mat(0xffffff, { map: PixelTextures.floralCurtain(2, 2), roughness: 0.82 });

  // 1. FLOOR (Strictly inside Joey's walls: x = -15.4 to +15.4 -> width 30.8, z = -10.8 to +8.8 -> depth 19.6)
  voxBox(30.8, 0.32, 19.6, parquetMat, 0.0, 0.08, -1.0, joeyGroup);
  // Striped Area Rug under recliners and small table
  voxBox(12.8, 0.06, 10.5, stripedRugMat, -4.5, 0.25, 1.8, joeyGroup);

  // Helper for Warm Glowing Lamps in Joey's Apartment
  function addJoeyWarmLight(x, y, z, intensity = 0.65, dist = 11.5) {
    const pl = new THREE.PointLight(0xffa43b, intensity, dist);
    pl.position.set(x, y, z);
    joeyGroup.add(pl);
    warmPointLights.push(pl);
    return pl;
  }

  // 2. LEFT BOUNDARY WALL (West Wall, x = -15.4, z: -10.8 to +8.8 -> length 19.6)
  const westWall = new THREE.Group();
  westWall.position.set(-15.4, 0.24, -1.0);
  voxBox(0.75, 9.2, 19.6, wallMat, 0, 4.6, 0, westWall);
  voxBox(0.95, 0.48, 19.8, whiteTrimMat, 0, 9.35, 0, westWall);
  voxBox(0.90, 0.60, 19.6, darkWoodMat, 0, 0.45, 0, westWall);

  // 2A) JOEY'S GIANT BUILT-IN ENTERTAINMENT CENTER (Oversized Honey-Oak Cabinet)
  const tvUnit = new THREE.Group();
  tvUnit.position.set(1.15, 3.8, 0.5);
  // Main cabinet frame
  voxBox(1.5, 7.4, 8.8, woodOakMat, 0, 0, 0, tvUnit);
  // Recessed center shelf cavity for TV
  voxBox(1.55, 3.4, 4.2, 0x181512, 0.05, 0.1, 0, tvUnit);
  // Retro CRT TV
  const tvMesh = voxBox(1.2, 2.6, 3.4, 0x242426, 0.1, 0.1, 0, tvUnit);
  // Curved dark screen with phosphor glow
  const tvScreenMat = mat(0x182428, { emissive: 0x284868, emissiveIntensity: 0.35, roughness: 0.2 });
  joeyTvScreenMesh = voxBox(0.12, 2.1, 2.8, tvScreenMat, 0.72, 0.1, 0, tvUnit);
  voxBox(0.08, 0.08, 0.08, 0x38e562, 0.76, -0.9, 1.3, tvUnit); // Glowing green power LED
  // Dedicated TV light casting late-night cool glow across the living room
  joeyTvLight = new THREE.PointLight(0x5cb8ff, 0.0, 9.5);
  joeyTvLight.position.set(1.4, 0.1, 0);
  tvUnit.add(joeyTvLight);
  // Shelves above TV with stereo amp and cassettes/books
  voxBox(1.4, 0.16, 8.6, woodOakMat, 0.05, 2.1, 0, tvUnit);
  voxBox(0.85, 0.65, 1.8, 0x1a1a1d, 0.15, 2.5, -1.8, tvUnit); // Stereo receiver
  // Colorful VHS tape cases & books
  [-0.6, -0.2, 0.2, 0.6, 1.0].forEach((vx, vi) => {
    voxBox(0.65, 0.85, 0.22, [0xc42828, 0x2862c4, 0xf2b92e, 0x38a855, 0x8a38a8][vi], 0.2, 2.6, vx, tvUnit);
  });
  // Side cabinet doors with brass knobs
  voxBox(0.15, 6.8, 1.9, woodOakMat, 0.75, 0, -3.2, tvUnit);
  voxBox(0.15, 6.8, 1.9, woodOakMat, 0.75, 0, 3.2, tvUnit);
  voxCyl(0.08, 0.08, 0.2, 6, brassMat, 0.85, 0, -2.4, tvUnit).rotation.z = Math.PI / 2;
  voxCyl(0.08, 0.08, 0.2, 6, brassMat, 0.85, 0, 2.4, tvUnit).rotation.z = Math.PI / 2;
  // Framed photograph on top of cabinet
  voxBox(0.12, 1.1, 1.4, 0x382214, 0.2, 4.2, -1.5, tvUnit);
  voxBox(0.08, 0.85, 1.15, 0xf4eee4, 0.26, 4.2, -1.5, tvUnit);

  tagInteractive(tvUnit, {
    type: 'tv',
    message: '📺 Joey 亲自锯木头打造的超大电视柜！（虽然巨大到把两间卧室门都挡住了）'
  });
  westWall.add(tvUnit);

  // 2B) CHICK & DUCK (🐥 小黄鸭与小鸡在客厅巡逻！)
  const petGroup = new THREE.Group();
  petGroup.position.set(2.2, 0.0, 6.8);
  // The White Duck
  const duckGroup = new THREE.Group();
  duckGroup.position.set(0, 0, 0);
  voxBox(0.68, 0.55, 0.85, 0xffffff, 0, 0.32, 0, duckGroup); // Body
  const duckHead = new THREE.Group();
  duckHead.position.set(0, 0.6, 0.28);
  voxBox(0.42, 0.45, 0.45, 0xffffff, 0, 0.12, 0, duckHead); // Head
  voxBox(0.38, 0.12, 0.42, 0xf58a18, 0, 0.05, 0.3, duckHead); // Orange Bill
  voxBox(0.08, 0.08, 0.08, 0x1e1e1e, -0.18, 0.18, 0.07, duckHead); // Eyes
  voxBox(0.08, 0.08, 0.08, 0x1e1e1e, 0.18, 0.18, 0.07, duckHead);
  duckGroup.add(duckHead);
  voxBox(0.24, 0.08, 0.35, 0xf58a18, -0.15, 0.04, 0.05, duckGroup); // Webbed feet
  voxBox(0.24, 0.08, 0.35, 0xf58a18, 0.15, 0.04, 0.05, duckGroup);
  petGroup.add(duckGroup);

  // The Chicken / Rooster
  const chickGroup = new THREE.Group();
  chickGroup.position.set(0.95, 0, 0.65);
  chickGroup.rotation.y = -0.5;
  voxBox(0.55, 0.48, 0.65, 0xfafafa, 0, 0.28, 0, chickGroup);
  const chickHead = new THREE.Group();
  chickHead.position.set(0, 0.5, 0.22);
  voxBox(0.35, 0.38, 0.35, 0xfafafa, 0, 0.12, 0, chickHead);
  voxBox(0.12, 0.28, 0.35, 0xd42424, 0, 0.38, 0, chickHead); // Red comb
  voxBox(0.12, 0.18, 0.15, 0xd42424, 0, -0.02, 0.16, chickHead); // Red wattle
  voxBox(0.22, 0.12, 0.25, 0xf2b92e, 0, 0.08, 0.23, chickHead); // Yellow beak
  chickGroup.add(chickHead);
  voxBox(0.18, 0.06, 0.26, 0xf58a18, -0.12, 0.03, 0, chickGroup);
  voxBox(0.18, 0.06, 0.26, 0xf58a18, 0.12, 0.03, 0, chickGroup);
  petGroup.add(chickGroup);

  animatedPets.duck = duckGroup;
  animatedPets.duckHead = duckHead;
  animatedPets.chick = chickGroup;
  animatedPets.chickHead = chickHead;
  animatedPets.baseDuckPos = duckGroup.position.clone();
  animatedPets.baseChickPos = chickGroup.position.clone();

  tagInteractive(petGroup, {
    type: 'duck',
    message: '🐥 Chandler 的小黄鸭与小鸡！"Who\'s a good boy? Quack quack!"'
  });
  westWall.add(petGroup);
  joeyGroup.add(westWall);

  // 3. BACK BOUNDARY WALL (North Wall, z = -10.8, x: -15.4 to +15.4 -> full width 30.8!)
  const northWall = new THREE.Group();
  northWall.position.set(0.0, 0.24, -10.8);
  voxBox(30.8, 9.2, 0.75, wallMat, 0, 4.6, 0, northWall);
  voxBox(31.0, 0.48, 0.95, whiteTrimMat, 0, 9.35, 0, northWall);
  voxBox(30.8, 0.60, 0.90, darkWoodMat, 0, 0.45, 0, northWall);

  // 3A) LARGE MULTI-PANE WINDOW WITH FLORAL CURTAINS (Left side of back wall, x = -8.2)
  const windowGroup = new THREE.Group();
  windowGroup.position.set(-8.2, 4.8, 0.44);
  // White window frame (front face at z = +0.08)
  voxBox(7.2, 5.8, 0.16, whiteTrimMat, 0, 0, 0, windowGroup);
  // Sky glass (stepped forward so front face is at z = +0.16 — zero Z-fighting with white frame!)
  voxBox(6.4, 5.0, 0.14, 0x82b4dc, 0, 0, 0.09, windowGroup);
  // Window grid mullions (stepped forward so front face is at z = +0.23 — zero Z-fighting with glass!)
  [-1.8, 0, 1.8].forEach(wx => {
    voxBox(0.14, 5.0, 0.14, whiteTrimMat, wx, 0, 0.16, windowGroup);
  });
  [-1.4, 0, 1.4].forEach(wy => {
    voxBox(6.4, 0.14, 0.14, whiteTrimMat, 0, wy, 0.16, windowGroup);
  });
  // Tied-back floral curtains (matching user photo!)
  const curtL = voxBox(1.2, 5.8, 0.42, floralCurtainMat, -3.4, -0.1, 0.28, windowGroup);
  voxBox(1.3, 0.25, 0.48, brassMat, -3.4, -0.6, 0.30, windowGroup); // Tieback
  const curtR = voxBox(1.2, 5.8, 0.42, floralCurtainMat, 3.4, -0.1, 0.28, windowGroup);
  voxBox(1.3, 0.25, 0.48, brassMat, 3.4, -0.6, 0.30, windowGroup); // Tieback
  northWall.add(windowGroup);

  // Sconces flanking window (positioned cleanly outside the curtains)
  [-13.0, -3.4].forEach(sx => {
    voxBox(0.25, 0.5, 0.25, brassMat, sx, 6.2, 0.48, northWall);
    voxCyl(0.24, 0.14, 0.45, 8, 0xfce4b6, sx, 6.45, 0.62, northWall);
    addJoeyWarmLight(sx, 6.5, -10.0, 0.55, 9.5);
  });

  // 3B) MUSTARD YELLOW 2-SEATER SOFA & HUGSY THE PENGUIN! (x = -8.2, z = -7.0)
  const sofaGroup = new THREE.Group();
  sofaGroup.position.set(-8.2, 0.24, -7.0);
  // Sofa base, cushions, backrest & rolled arms
  voxBox(6.4, 0.65, 2.8, yellowSofaMat, 0, 0.5, 0, sofaGroup);
  voxBox(2.8, 0.45, 2.4, yellowSofaMat, -1.5, 0.95, 0.1, sofaGroup);
  voxBox(2.8, 0.45, 2.4, yellowSofaMat, 1.5, 0.95, 0.1, sofaGroup);
  voxBox(6.4, 2.2, 0.65, yellowSofaMat, 0, 2.0, -1.15, sofaGroup);
  voxBox(0.75, 1.4, 2.8, yellowSofaMat, -3.2, 1.4, 0, sofaGroup);
  voxBox(0.75, 1.4, 2.8, yellowSofaMat, 3.2, 1.4, 0, sofaGroup);
  // Throw pillows
  voxBox(0.85, 0.85, 0.35, mat(0xffffff, { map: PixelTextures.stripedCurtain() }), 0.2, 1.5, -0.85, sofaGroup);
  voxBox(0.75, 0.75, 0.32, 0xf2ede4, 2.0, 1.5, -0.85, sofaGroup);

  // HUGSY THE BEDTIME PENGUIN PAL! (Sitting on the left of yellow sofa wearing red Santa hat!)
  const hugsy = new THREE.Group();
  hugsy.position.set(-1.8, 1.15, 0.15);
  voxBox(0.65, 0.85, 0.65, 0x1e1e22, 0, 0.42, 0, hugsy); // Black body
  voxBox(0.45, 0.65, 0.15, 0xf8f8f8, 0, 0.38, 0.28, hugsy); // White belly
  voxBox(0.24, 0.16, 0.35, 0xf58a18, 0, 0.58, 0.42, hugsy); // Orange beak
  voxBox(0.08, 0.08, 0.08, 0x1a1a1a, -0.15, 0.68, 0.32, hugsy); // Eyes
  voxBox(0.08, 0.08, 0.08, 0x1a1a1a, 0.15, 0.68, 0.32, hugsy);
  // Red festive hat with white brim and pom-pom!
  voxBox(0.68, 0.15, 0.68, 0xf8f8f8, 0, 0.88, 0, hugsy);
  voxCyl(0.28, 0.08, 0.55, 8, 0xd42424, 0.06, 1.2, -0.05, hugsy);
  voxBox(0.18, 0.18, 0.18, 0xffffff, 0.12, 1.5, -0.1, hugsy);
  tagInteractive(hugsy, {
    type: 'hugsy',
    message: '🐧 Joey 最爱的睡前企鹅玩偶 Hugsy！"He is my bedtime penguin pal!"'
  });
  sofaGroup.add(hugsy);
  joeyGroup.add(sofaGroup);

  // Low Coffee Table in front of Yellow Sofa
  const coffeeTable = new THREE.Group();
  coffeeTable.position.set(-8.2, 0.24, -4.2);
  voxBox(4.4, 0.18, 2.0, 0xd2b48c, 0, 0.8, 0, coffeeTable);
  voxBox(4.0, 0.06, 1.7, 0x82b4dc, 0, 0.9, 0, coffeeTable); // Glass top
  [-1.9, 1.9].forEach(tx => {
    [-0.8, 0.8].forEach(tz => {
      voxCyl(0.08, 0.08, 0.8, 6, 0x8b5a2b, tx, 0.4, tz, coffeeTable);
    });
  });
  // Snack bowl & magazines on table
  voxCyl(0.35, 0.25, 0.22, 8, 0xf2c12e, -0.8, 0.95, 0, coffeeTable); // Chips bowl
  voxBox(0.75, 0.06, 0.55, 0x3868b8, 0.8, 0.92, 0.1, coffeeTable);
  joeyGroup.add(coffeeTable);

  // Triangular Corner Side Table + Desk Lamp
  const cornerTable = new THREE.Group();
  cornerTable.position.set(-3.4, 0.24, -7.8);
  voxBox(2.2, 0.18, 2.2, 0xf0ece1, 0, 1.2, 0, cornerTable);
  voxBox(1.8, 0.15, 1.8, 0xd2b48c, 0, 0.6, 0, cornerTable);
  // Black desk lamp
  voxCyl(0.25, 0.28, 0.08, 8, 0x1a1a1a, 0, 1.3, 0, cornerTable);
  voxCyl(0.05, 0.05, 0.9, 6, 0x1a1a1a, 0, 1.75, 0, cornerTable);
  const lampHead = voxCyl(0.32, 0.16, 0.45, 8, 0x1a1a1a, 0.15, 2.15, 0, cornerTable);
  lampHead.rotation.z = -0.55;
  const deskBulb = voxCyl(0.14, 0.14, 0.20, 8, mat(0xfff5d2, { emissive: 0xffb84d, emissiveIntensity: 1.6, grain: false }), 0.18, 2.15, 0, cornerTable);
  deskBulb.rotation.z = -0.55;
  lampBulbs.push(deskBulb.material);
  addJoeyWarmLight(-3.4, 2.6, -7.6, 0.65, 8.5);
  cornerTable.add(deskBulb);
  joeyGroup.add(cornerTable);

  // 3C) BEDROOM DOOR (Mounted flush on interior face of North Wall, each layer stepped forward in Z so zero Z-fighting!)
  const bedDoor = new THREE.Group();
  bedDoor.position.set(1.2, 0.0, 0.44);
  voxBox(3.4, 7.8, 0.16, whiteTrimMat, 0, 3.9, 0, bedDoor); // White frame (front at +0.08)
  voxBox(2.9, 7.4, 0.16, mat(0xd4be96, { variance: 6 }), 0, 3.7, 0.09, bedDoor); // Tan door (front at +0.17)
  voxBox(2.3, 1.1, 0.14, 0xd8d0e8, 0, 6.6, 0.16, bedDoor); // Transom window (front at +0.23)
  voxCyl(0.08, 0.08, 0.22, 6, brassMat, 1.15, 3.5, 0.24, bedDoor).rotation.x = Math.PI / 2;
  northWall.add(bedDoor);
  joeyGroup.add(northWall);

  // 4. LIVING ROOM C-POSITION: THE TWO BARCALOUNGERS & PEDESTAL TABLE
  const barcaGroup = new THREE.Group();
  barcaGroup.position.set(0, 0.24, 0);

  function createBarcalounger(isJoey = true) {
    const chair = new THREE.Group();
    // Recliner base & deep leather seat cushion
    voxBox(3.2, 0.95, 3.4, leatherMat, 0, 0.65, 0, chair);
    voxBox(2.6, 0.55, 2.8, leatherMat, 0, 1.3, 0.1, chair); // Seat pillow

    // Reclined backrest on hinge pivot
    const backPivot = new THREE.Group();
    backPivot.position.set(0, 1.4, -0.8);
    voxBox(2.8, 3.0, 0.85, leatherMat, 0, 1.4, -0.4, backPivot);
    voxBox(2.4, 0.95, 0.75, leatherMat, 0, 2.7, -0.65, backPivot); // Headrest pillow
    backPivot.rotation.x = -0.15;
    chair.add(backPivot);

    // Chunky rolled armrests
    voxBox(0.75, 1.45, 3.6, leatherMat, -1.7, 1.4, 0, chair);
    voxBox(0.75, 1.45, 3.6, leatherMat, 1.7, 1.4, 0, chair);

    // Extended footrest on hinge pivot at front bottom
    const footPivot = new THREE.Group();
    footPivot.position.set(0, 0.75, 1.3);
    voxBox(2.6, 0.45, 1.5, leatherMat, 0, 0.15, 0.75, footPivot);
    footPivot.rotation.x = 0;
    chair.add(footPivot);

    // Side recline lever
    const leverPivot = new THREE.Group();
    leverPivot.position.set(2.15, 1.1, 0.4);
    voxBox(0.12, 0.65, 0.12, brassMat, 0, 0.32, 0, leverPivot);
    voxCyl(0.12, 0.12, 0.22, 6, 0x1e1e1e, 0.05, 0.62, 0, leverPivot);
    leverPivot.rotation.x = 0;
    chair.add(leverPivot);

    const reclinerData = {
      chairGroup: chair,
      backPivot,
      footPivot,
      leverPivot,
      isJoey,
      isReclined: false,
      progress: 0,
      targetProgress: 0,
      toggle() {
        this.isReclined = !this.isReclined;
        this.targetProgress = this.isReclined ? 1.0 : 0.0;
        SoundEngine.playSFX('pop');
        if (this.isReclined) {
          triggerCrowdEmotes(this.isJoey ? { joey: '🛋️😍', chandler: '🛋️' } : { chandler: '🛋️😎', joey: '🛋️' });
          flash(this.isJoey ? '🛋️ Joey 猛力后仰躺平！"Ahhh, that is the stuff!"' : '🛋️ Chandler 踢出躺椅脚托！"Could this BE more comfortable?!"');
        } else {
          flash('🛋️ 躺椅复位收起。');
        }
      }
    };
    animatedRecliners.push(reclinerData);

    tagInteractive(chair, {
      type: 'barcalounger',
      recliner: reclinerData,
      message: isJoey
        ? '🛋️ Joey 的灵魂皮躺椅 Barcalounger！点击即可向后仰躺踢出脚托！'
        : '🛋️ Chandler 的灵魂皮躺椅 Barcalounger！点击即可向后仰躺踢出脚托！'
    });

    return chair;
  }

  // Chandler's Barcalounger (Left chair)
  const chandlerChair = createBarcalounger(false);
  chandlerChair.position.set(-6.2, 0, -0.5);
  chandlerChair.rotation.y = -0.32;
  barcaGroup.add(chandlerChair);

  // Joey's Barcalounger (Right chair)
  const joeyChair = createBarcalounger(true);
  joeyChair.position.set(-2.5, 0, 1.8);
  joeyChair.rotation.y = -0.32;
  barcaGroup.add(joeyChair);

  joeyGroup.add(barcaGroup);

  // Round White Pedestal Coffee Table (in front of Chandler's chair)
  const pedTable = new THREE.Group();
  pedTable.position.set(-8.5, 0.24, 2.8);
  voxCyl(0.95, 1.1, 0.12, 14, 0xf4f0e8, 0, 0.06, 0, pedTable); // Base
  voxCyl(0.14, 0.14, 1.4, 8, 0xd0cbc0, 0, 0.75, 0, pedTable); // Pedestal pole
  voxCyl(1.5, 1.5, 0.12, 16, 0xfaf7f2, 0, 1.45, 0, pedTable); // Tabletop
  // Pizza box on table
  voxBox(1.1, 0.18, 1.1, 0xd44035, -0.2, 1.55, -0.15, pedTable);
  voxBox(0.95, 0.08, 0.95, 0xf5d061, -0.2, 1.62, -0.15, pedTable); // Pizza inside
  // Beer Mug with Frothy Foam!
  const beer = voxCyl(0.22, 0.22, 0.55, 8, 0xd98b29, 0.5, 1.75, 0.25, pedTable);
  voxCyl(0.25, 0.25, 0.14, 8, 0xffffff, 0.5, 2.05, 0.25, pedTable); // Foam
  joeyGroup.add(pedTable);

  // 5. FOREGROUND: THE ICONIC CANOE / ROWBOAT (z = 6.9, strictly inside z = +8.8 floor edge)
  const canoeGroup = new THREE.Group();
  canoeGroup.position.set(2.2, 0.24, 6.9);
  canoeGroup.rotation.y = -0.06;
  // Wooden boat hull: bottom plinth & tapered pointed bow & stern
  voxBox(9.6, 0.35, 2.6, boatWoodMat, 0, 0.2, 0, canoeGroup);
  // Outer gunwales / sides
  voxBox(9.8, 1.1, 0.25, boatWoodMat, 0, 0.75, -1.2, canoeGroup);
  voxBox(9.8, 1.1, 0.25, boatWoodMat, 0, 0.75, 1.2, canoeGroup);
  // Pointed Bow (left) & Stern (right)
  const bow = voxBox(1.5, 1.1, 1.8, boatWoodMat, -5.2, 0.75, 0, canoeGroup);
  bow.rotation.y = 0.5;
  const stern = voxBox(1.5, 1.1, 1.8, boatWoodMat, 5.2, 0.75, 0, canoeGroup);
  stern.rotation.y = -0.5;
  // Interior bench thwart seats
  voxBox(0.45, 0.18, 2.3, 0x8b5a2b, -1.8, 0.85, 0, canoeGroup);
  voxBox(0.45, 0.18, 2.3, 0x8b5a2b, 1.8, 0.85, 0, canoeGroup);

  // Two Wooden Oars on independent animated rotation pivots!
  const oar1Pivot = new THREE.Group();
  oar1Pivot.position.set(-0.6, 1.35, -0.3);
  voxBox(5.2, 0.08, 0.14, 0xdeb887, 0, 0, 0, oar1Pivot);
  voxBox(1.2, 0.05, 0.35, 0xcd853f, -2.2, 0, -0.65, oar1Pivot); // Blade
  canoeGroup.add(oar1Pivot);

  const oar2Pivot = new THREE.Group();
  oar2Pivot.position.set(0.6, 1.35, 0.3);
  voxBox(5.2, 0.08, 0.14, 0xdeb887, 0, 0, 0, oar2Pivot);
  voxBox(1.2, 0.05, 0.35, 0xcd853f, 2.2, 0, -0.65, oar2Pivot); // Blade
  canoeGroup.add(oar2Pivot);

  animatedCanoe.group = canoeGroup;
  animatedCanoe.oar1 = oar1Pivot;
  animatedCanoe.oar2 = oar2Pivot;
  animatedCanoe.baseY = 0.24;
  animatedCanoe.baseRotY = -0.06;

  tagInteractive(canoeGroup, {
    type: 'canoe',
    message: '🛶 客厅皮划艇！Joey & Chandler 在空荡荡的客厅划桨！"We have a canoe!"'
  });
  joeyGroup.add(canoeGroup);

  // 6. KITCHEN AREA & BREAKFAST BAR (East side of Joey's apartment)
  const kitchenGroup = new THREE.Group();
  kitchenGroup.position.set(0, 0.24, 0);

  // 6A) L-SHAPED BREAKFAST BAR COUNTER
  const counterGroup = new THREE.Group();
  counterGroup.position.set(4.5, 0, -2.4);
  // Main counter base
  voxBox(1.6, 2.4, 6.2, mat(0xe5dcce, { variance: 6 }), 0, 1.2, 0, counterGroup);
  voxBox(1.9, 0.25, 6.5, marbleMat, 0, 2.45, 0, counterGroup); // Marble countertop
  // Open end bookshelf on counter with cookbooks
  voxBox(1.5, 2.2, 0.2, darkWoodMat, 0, 1.2, 3.1, counterGroup);
  [-0.6, 0.0, 0.6].forEach(by => {
    voxBox(1.3, 0.45, 0.3, [0xc42828, 0x2862c4, 0x38a855][(by + 1) % 3], 0, 1.2 + by, 3.0, counterGroup);
  });
  // Counter Accessories: Pizza box, bowl of chips, microwave, blender
  voxBox(1.2, 0.22, 1.2, 0xd43828, 0, 2.65, 1.8, counterGroup); // Pizza box
  voxBox(0.9, 0.08, 0.9, 0xf5d061, 0, 2.75, 1.8, counterGroup);
  voxCyl(0.42, 0.28, 0.32, 8, 0xf2c12e, 0, 2.7, 0.5, counterGroup); // Chip bowl
  // Black Microwave
  const micro = voxBox(1.4, 0.95, 1.6, 0x1e1e1e, 0.1, 3.0, -1.2, counterGroup);
  voxBox(0.08, 0.65, 0.9, 0x334433, -0.65, 3.0, -1.4, counterGroup); // Screen
  voxBox(0.06, 0.06, 0.06, 0x55ff55, -0.66, 3.2, -0.6, counterGroup); // Digital clock
  // Blender
  voxCyl(0.25, 0.28, 0.35, 8, 0x1a1a1a, 0.1, 2.75, -2.4, counterGroup);
  voxCyl(0.24, 0.18, 0.65, 8, 0x82b4dc, 0.1, 3.2, -2.4, counterGroup);
  kitchenGroup.add(counterGroup);

  // Two Swivel Bar Stools (Round dark green/black leather + brass ring)
  [-3.2, -0.6].forEach(sz => {
    const stool = new THREE.Group();
    stool.position.set(2.8, 0, sz);
    voxCyl(0.65, 0.65, 0.08, 10, brassMat, 0, 0.04, 0, stool); // Base
    voxCyl(0.08, 0.08, 1.5, 6, brassMat, 0, 0.8, 0, stool); // Stem
    voxCyl(0.55, 0.55, 0.08, 8, brassMat, 0, 0.65, 0, stool); // Footrest ring
    voxCyl(0.72, 0.72, 0.28, 12, 0x1f2b24, 0, 1.65, 0, stool); // Dark green leather seat
    voxCyl(0.75, 0.75, 0.08, 12, brassMat, 0, 1.55, 0, stool); // Brass trim ring
    kitchenGroup.add(stool);
  });

  // 6B) KITCHEN BACK WALL (Non-overlapping Sink Counter [x: 5.4..9.4], Stove [x: 9.5..12.1], Fridge [x: 12.2..14.8])
  const kitchenBack = new THREE.Group();
  kitchenBack.position.set(0, 0, -9.5);
  // Base counter with sink (x = 5.4 to 9.4 -> width 4.0, center x = 7.4)
  voxBox(4.0, 2.4, 1.8, mat(0xe5dcce, { variance: 6 }), 7.4, 1.2, 0, kitchenBack);
  voxBox(4.1, 0.25, 2.0, marbleMat, 7.4, 2.45, 0, kitchenBack);
  // Chrome sink & faucet (centered at x = 7.4, stepped above countertop y = 2.575 to prevent Z-fighting)
  voxBox(2.2, 0.2, 1.4, 0x222428, 7.4, 2.52, 0, kitchenBack);
  voxBox(1.8, 0.22, 1.0, 0xd0d5dd, 7.4, 2.55, 0, kitchenBack);
  voxCyl(0.05, 0.05, 0.45, 6, 0xe0e6ed, 7.4, 2.8, -0.5, kitchenBack); // Faucet
  // Upper Wall Cabinets in warm cream/beige (spanning x = 5.4 to 12.1 -> width 6.7, center x = 8.75)
  voxBox(6.7, 2.6, 1.4, mat(0xede4d5, { variance: 6 }), 8.75, 6.4, -0.1, kitchenBack);
  [6.2, 7.8, 9.6, 11.2].forEach(hx => {
    voxCyl(0.05, 0.05, 0.15, 6, brassMat, hx, 6.0, 0.65, kitchenBack).rotation.x = Math.PI / 2;
  });
  // Open Shelves with cereal boxes & mugs
  voxBox(6.7, 0.15, 1.3, darkWoodMat, 8.75, 4.7, -0.1, kitchenBack);
  [6.2, 7.6, 9.4, 11.0].forEach((cx, ci) => {
    voxBox(0.65, 0.95, 0.45, [0xe03828, 0x2868d4, 0xf2b92e, 0x38a855][ci], cx, 5.25, -0.1, kitchenBack);
  });

  // Retro White Stove & Oven (x = 9.5 to 12.1 -> width 2.6, center x = 10.8, zero overlap with sink cabinet!)
  const stoveGroup = new THREE.Group();
  stoveGroup.position.set(10.8, 0, 0.1);
  voxBox(2.6, 2.45, 2.0, 0xf5f3ee, 0, 1.23, 0, stoveGroup);
  voxBox(2.1, 1.1, 0.12, 0x242426, 0, 1.1, 1.02, stoveGroup); // Oven window
  // Burner grates on top
  voxBox(0.7, 0.08, 0.7, 0x1e1e1e, -0.6, 2.50, -0.4, stoveGroup);
  voxBox(0.7, 0.08, 0.7, 0x1e1e1e, 0.6, 2.50, -0.4, stoveGroup);
  voxBox(0.7, 0.08, 0.7, 0x1e1e1e, -0.6, 2.50, 0.4, stoveGroup);
  voxBox(0.7, 0.08, 0.7, 0x1e1e1e, 0.6, 2.50, 0.4, stoveGroup);
  // Frying pan with sunny-side-up fried egg!
  voxCyl(0.38, 0.35, 0.15, 8, 0x242426, -0.6, 2.60, 0.4, stoveGroup);
  voxBox(0.08, 0.08, 0.45, 0x242426, -0.6, 2.63, 0.75, stoveGroup); // Pan handle
  voxCyl(0.22, 0.22, 0.06, 8, 0xffffff, -0.6, 2.66, 0.4, stoveGroup); // Egg white
  voxCyl(0.09, 0.09, 0.08, 8, 0xf5a623, -0.6, 2.70, 0.4, stoveGroup); // Yolk
  // Whistling stainless steel tea kettle
  voxCyl(0.32, 0.38, 0.42, 8, mat(0xe8ecef, { metalness: 0.85, roughness: 0.2 }), 0.6, 2.73, -0.4, stoveGroup);
  kitchenBack.add(stoveGroup);

  // Retro White Refrigerator covered in colorful magnets & notes! (x = 12.2 to 14.8 -> center x = 13.5, strictly inside East wall at 15.02!)
  const fridge = new THREE.Group();
  fridge.position.set(13.5, 0, 0.2);
  voxBox(2.6, 6.8, 2.2, 0xf5f3ee, 0, 3.4, 0, fridge);
  voxBox(2.62, 0.12, 2.22, 0xd0cbc0, 0, 4.4, 0, fridge); // Door split
  // Colorful magnets and notes on fridge door!
  [[-0.55, 5.2, 0xe03828], [0.4, 5.6, 0x38a855], [-0.4, 3.6, 0xf2b92e], [0.55, 3.2, 0x2868d4]].forEach(([mx, my, mc]) => {
    voxBox(0.32, 0.32, 0.08, mc, mx, my, 1.14, fridge);
  });
  kitchenBack.add(fridge);
  kitchenGroup.add(kitchenBack);
  joeyGroup.add(kitchenGroup);

  // 7. FOOSBALL TABLE (桌上足球台, x = 8.8, z = 2.6)
  const foosball = new THREE.Group();
  foosball.position.set(8.8, 0.24, 2.6);
  // Sturdy black wooden cabinet
  voxBox(3.6, 1.6, 5.2, 0x1e1e20, 0, 1.4, 0, foosball);
  // Green soccer turf pitch inside
  voxBox(3.0, 0.1, 4.6, foosballMat, 0, 2.1, 0, foosball);
  // 4 Angled black legs
  [-1.5, 1.5].forEach(lx => {
    [-2.2, 2.2].forEach(lz => {
      voxBox(0.45, 1.6, 0.45, 0x141416, lx, 0.7, lz, foosball);
    });
  });

  // Animated rotating rods with players!
  const foosballRods = [];
  [-1.5, -0.5, 0.5, 1.5].forEach((rz, ri) => {
    const rodGroup = new THREE.Group();
    rodGroup.position.set(0, 2.4, rz);
    // Silver metal rod
    voxCyl(0.04, 0.04, 4.8, 6, mat(0xe8ecef, { metalness: 0.9, roughness: 0.15 }), 0, 0, 0, rodGroup).rotation.z = Math.PI / 2;
    // Black rubber handles on both sides
    voxCyl(0.1, 0.1, 0.35, 6, 0x141414, -2.5, 0, 0, rodGroup).rotation.z = Math.PI / 2;
    voxCyl(0.1, 0.1, 0.35, 6, 0x141414, 2.5, 0, 0, rodGroup).rotation.z = Math.PI / 2;
    // Tiny painted voxel players on the rods (Red vs Blue)
    const pCol = (ri % 2 === 0) ? 0xd42828 : 0x2862c4;
    [-0.7, 0.7].forEach(px => {
      voxBox(0.24, 0.45, 0.18, pCol, px, -0.12, 0, rodGroup);
      voxBox(0.18, 0.2, 0.18, 0xfce4b6, px, 0.18, 0, rodGroup); // Head
    });
    foosball.add(rodGroup);
    foosballRods.push({
      group: rodGroup,
      baseSpeed: (ri % 2 === 0 ? 1 : -1) * (3.5 + ri * 0.8),
      ri
    });
  });

  // Soccer ball that bounces between sides!
  const foosballBall = voxSphere(0.12, 8, 0xffffff, 0, 2.22, 0, foosball);

  animatedFoosball.rods = foosballRods;
  animatedFoosball.ball = foosballBall;

  tagInteractive(foosball, {
    type: 'foosball',
    message: '⚽ 桌上足球台！Joey 和 Chandler 决定生活一切重大事项的决斗场！"GOAL!"'
  });
  joeyGroup.add(foosball);

  // 8. FULL EAST PARTY WALL (x = 15.4, z: -10.8 to +8.8 -> length 19.6) & ENTRANCE DOOR #19 + PAT THE DOG
  const entry19Group = new THREE.Group();
  entry19Group.position.set(15.4, 0.24, -1.0);
  voxBox(0.75, 9.2, 19.6, wallMat, 0, 4.6, 0, entry19Group);
  voxBox(0.95, 0.48, 19.8, whiteTrimMat, 0, 9.35, 0, entry19Group);
  // Interior baseboard strictly on Joey's interior face (-X), stopping before Door #19
  voxBox(0.14, 0.60, 14.3, darkWoodMat, -0.44, 0.45, -2.65, entry19Group);

  // Door #19 inner face (aligned at world z = 5.9 -> rel z = 6.9, stepped in -X for zero Z-fighting)
  voxBox(0.16, 7.6, 3.6, mat(0xd4be96, { variance: 6 }), -0.46, 3.8, 6.9, entry19Group);
  voxBox(0.14, 1.4, 2.6, 0xd8d0e8, -0.54, 6.4, 6.9, entry19Group); // Transom window
  voxBox(0.18, 7.8, 0.20, whiteTrimMat, -0.47, 3.9, 5.0, entry19Group);
  voxBox(0.18, 7.8, 0.20, whiteTrimMat, -0.47, 3.9, 8.8, entry19Group);
  voxBox(0.18, 0.24, 4.0, whiteTrimMat, -0.47, 7.8, 6.9, entry19Group);

  // THE ICONIC BLUE MAGNA DOODLE SKETCH BOARD!
  const magnaBoard = voxBox(0.08, 1.5, 1.5, magnaMat, -0.60, 4.4, 6.9, entry19Group);
  tagInteractive(magnaBoard, {
    type: 'door',
    message: '🎨 门后经典的蓝色磁力涂鸦板 (Magna Doodle)！每一集都有不同的涂鸦与留言！'
  });

  // Brass doorknob & deadbolt chain
  voxBox(0.22, 0.58, 0.20, 0x1e1a18, -0.60, 3.4, 8.25, entry19Group);
  voxBox(0.26, 0.24, 0.24, brassMat, -0.66, 3.3, 8.25, entry19Group);

  // PAT THE DOG (The Giant White Ceramic Greyhound Statue standing proudly by the door!)
  const patDog = new THREE.Group();
  patDog.position.set(-2.2, 0, 3.2);
  // White pedestal base
  voxBox(1.5, 0.35, 2.6, 0xfaf9f5, 0, 0.18, 0, patDog);
  // Sleek white sculpted ceramic body of Pat the Dog
  const whiteCeramic = mat(0xffffff, { roughness: 0.15, metalness: 0.05 }); // Glossy porcelain
  voxBox(0.75, 1.5, 1.8, whiteCeramic, 0, 1.3, 0, patDog); // Torso
  // 4 Slender white ceramic legs
  voxBox(0.22, 1.4, 0.22, whiteCeramic, -0.25, 0.7, -0.65, patDog);
  voxBox(0.22, 1.4, 0.22, whiteCeramic, 0.25, 0.7, -0.65, patDog);
  voxBox(0.22, 1.4, 0.22, whiteCeramic, -0.25, 0.7, 0.65, patDog);
  voxBox(0.22, 1.4, 0.22, whiteCeramic, 0.25, 0.7, 0.65, patDog);
  // Slender elegant neck & greyhound head
  const neck = voxBox(0.45, 1.2, 0.55, whiteCeramic, 0, 2.3, 0.65, patDog);
  neck.rotation.x = -0.35;
  voxBox(0.5, 0.55, 0.95, whiteCeramic, 0, 2.9, 0.95, patDog); // Head & muzzle
  voxBox(0.12, 0.35, 0.18, whiteCeramic, -0.22, 3.3, 0.75, patDog); // Pointed ears
  voxBox(0.12, 0.35, 0.18, whiteCeramic, 0.22, 3.3, 0.75, patDog);
  voxBox(0.12, 0.12, 0.12, 0x1a1a1a, 0, 2.85, 1.45, patDog); // Black nose
  // Warm spotlight shining down on Pat the Dog!
  const patSpot = new THREE.PointLight(0xffeedd, 0.8, 6.5);
  patSpot.position.set(0, 4.2, 0.8);
  patDog.add(patSpot);
  warmPointLights.push(patSpot);

  tagInteractive(patDog, {
    type: 'pat_dog',
    message: '🐕 Pat the Dog！Joey 在《我们的生活》成名发财后买下的巨型白色陶瓷大狗雕像！'
  });
  entry19Group.add(patDog);
  joeyGroup.add(entry19Group);
}

// ==================== BUILD 4TH FLOOR DUAL APARTMENTS (JOEY & CHANDLER #19 + HALLWAY + MONICA & RACHEL #20) ====================
function buildMonicaApartmentDiorama() {
  const _prevScene = scene;
  const masterAptGroup = monicaDioramaGroup || scene;

  // 0. MASTER SOFT DROP SHADOW PLANE & EXPANDED 4TH FLOOR PLINTH BASE (Covers Joey + Narrowed Hallway + Monica)
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(110, 44),
    new THREE.MeshBasicMaterial({ map: PixelTextures.softShadowFloor(), transparent: true, depthWrite: false })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.set(0.0, -0.82, 0.0);
  masterAptGroup.add(shadowPlane);

  // Master Plinth spanning across both apartments + narrowed hallway (worldX: -37.2 to +36.8, worldZ: -14.4 to +10.0)
  voxBox(74.0, 0.55, 24.4, 0xe8e2d5, -0.2, -0.52, -2.2, masterAptGroup);
  voxBox(73.2, 0.45, 23.6, 0xf7f4ed, -0.2, -0.15, -2.2, masterAptGroup);

  // Build Central Hallway connecting Apartment 19 (Left) & Apartment 20 (Right)
  const hallwaySubGroup = new THREE.Group();
  hallwaySubGroup.position.set(0, 0, 0);
  masterAptGroup.add(hallwaySubGroup);
  buildHallwayDiorama(hallwaySubGroup);

  // Build Joey & Chandler's Apartment 19 (Left Wing, centered at x = -19.8)
  const joeySubGroup = new THREE.Group();
  joeySubGroup.position.set(-19.8, 0, 0);
  masterAptGroup.add(joeySubGroup);
  buildJoeyApartmentDiorama(joeySubGroup);

  // Build Monica & Rachel's Apartment 20 (Right Wing, centered at x = +19.8)
  const monicaSubGroup = new THREE.Group();
  monicaSubGroup.position.set(19.8, 0, 0);
  masterAptGroup.add(monicaSubGroup);
  scene = monicaSubGroup;

  const brickMat = mat(0xffffff, { map: PixelTextures.brick(4, 3), roughness: 0.86 });
  const purpleWallMat = mat(0x9d7ec9, { variance: 9, rx: 4, ry: 3 });
  const purpleDoorMat = mat(0x9170bf, { variance: 10 });
  const skyBlueMat = mat(0x38a5e0, { variance: 10 });
  const butterYellowMat = mat(0xede580, { variance: 8 });
  const tealDoorMat = mat(0x166b60, { variance: 10 });
  const whiteTrimMat = mat(0xf6f3ec, { variance: 6 });
  const honeyWoodMat = mat(0xc78946, { variance: 12 });
  const darkWalnutMat = mat(0x3b2215, { variance: 12 });
  const brassMat = mat(0xf2bf38, { metalness: 0.65, roughness: 0.25 });
  const floralCurtainMat = mat(0xffffff, { map: PixelTextures.floralCurtain(2, 2), roughness: 0.82 });
  const redFloralPillowMat = mat(0xffffff, { map: PixelTextures.redFloralPillow(), roughness: 0.8 });
  const redPlaidMat = mat(0xffffff, { map: PixelTextures.redPlaidThrow(2, 2), roughness: 0.82 });
  const livingRugMat = mat(0xffffff, { map: PixelTextures.monicaLivingRug(), roughness: 0.85 });

  // Terracotta red diamond tile floor for Monica's apartment (Strictly inside walls: x = -15.4 to +15.0, z = -10.8 to +8.8, clipped at 45° kitchen corner!)
  voxBox(25.8, 0.32, 19.6, mat(0xffffff, { map: PixelTextures.monicaTerracottaTiles(11, 8), roughness: 0.82 }), 2.1, 0.08, -1.0);
  voxBox(4.6, 0.32, 15.0, mat(0xffffff, { map: PixelTextures.monicaTerracottaTiles(2, 6), roughness: 0.82 }), -13.1, 0.08, 1.3);

  // Raised Honey-Hardwood Platform in Back Hallway & Window Alcove (from x = -4.25 to 15.0, z = -10.8 to -4.8 -> depth 6.0)
  const hardwoodMat = mat(0xffffff, { map: PixelTextures.monicaHardwood(7, 4), roughness: 0.78 });
  voxBox(19.25, 0.38, 6.0, 0x7a421d, 5.375, 0.43, -7.8); // Step riser
  voxBox(19.15, 0.40, 5.92, hardwoodMat, 5.375, 0.46, -7.8);

  // Helper for Warm Glowing Lamps in Monica's Apartment
  function addAptWarmLight(x, y, z, intensity = 0.65, dist = 11.5) {
    const pl = new THREE.PointLight(0xffa43b, intensity, dist);
    pl.position.set(x, y, z);
    scene.add(pl);
    warmPointLights.push(pl);
    return pl;
  }

  // ==================== 1. LEFT BOUNDARY WALL: PURPLE ENTRY & RED-BRICK KITCHEN ====================
  const LEFT_WALL_X = -15.4;

  // 1A) FRONT-LEFT PURPLE ENTRY WALL & ICONIC PURPLE DOOR (z: 2.0 to 8.8)
  const entryGroup = new THREE.Group();
  entryGroup.position.set(LEFT_WALL_X, 0.24, 5.4);
  voxBox(0.75, 9.2, 6.8, purpleWallMat, 0, 4.6, 0, entryGroup);
  voxBox(0.95, 0.48, 7.0, whiteTrimMat, 0, 9.35, 0, entryGroup);

  // Iconic Purple Front Door with peephole yellow frame!
  voxBox(0.28, 7.6, 3.6, purpleDoorMat, 0.42, 3.8, 0.5, entryGroup);
  voxBox(0.16, 1.4, 2.6, 0xd8d0e8, 0.56, 6.4, 0.5, entryGroup); // Transom window
  voxBox(0.32, 7.8, 0.20, whiteTrimMat, 0.44, 3.9, -1.4, entryGroup);
  voxBox(0.32, 7.8, 0.20, whiteTrimMat, 0.44, 3.9, 2.4, entryGroup);
  voxBox(0.32, 0.24, 4.0, whiteTrimMat, 0.44, 7.8, 0.5, entryGroup);

  // Legendary Gold/Yellow Sculpted Peephole Frame!
  voxBox(0.18, 0.92, 0.78, brassMat, 0.58, 4.55, 0.5, entryGroup);
  voxBox(0.20, 0.52, 0.42, purpleDoorMat, 0.60, 4.55, 0.5, entryGroup);
  voxCyl(0.06, 0.06, 0.22, 8, 0x1e1814, 0.62, 4.55, 0.5, entryGroup).rotation.z = Math.PI / 2;

  // Brass doorknob & lock
  voxBox(0.22, 0.58, 0.20, 0x1e1a18, 0.58, 3.4, 1.85, entryGroup);
  voxBox(0.26, 0.24, 0.24, brassMat, 0.64, 3.3, 1.85, entryGroup);
  voxBox(0.22, 0.18, 0.18, brassMat, 0.60, 4.1, 1.85, entryGroup);

  // Coat Hook + Hanger + Hanging Striped Apron/Towel (at z = -2.2 within entryGroup -> world z = 3.2)
  voxBox(0.22, 0.22, 0.22, brassMat, 0.45, 5.4, -2.2, entryGroup);
  voxBox(0.14, 0.35, 0.95, 0xfaf8f5, 0.50, 5.0, -2.2, entryGroup);
  voxBox(0.18, 2.4, 0.88, mat(0xffffff, { map: PixelTextures.stripedCurtain() }), 0.52, 3.65, -2.2, entryGroup);

  // Welcome Mat in front of door
  voxBox(2.2, 0.08, 3.4, livingRugMat, 1.75, 0.04, 0.5, entryGroup);
  tagInteractive(entryGroup, { type: 'door', message: '🚪 Monica 公寓标志性紫门与黄色猫眼相框！' });
  scene.add(entryGroup);

  // 1B) LEFT RED-BRICK KITCHEN WALL (z: -6.2 to 2.0, length = 8.2)
  const leftBrickWall = new THREE.Group();
  leftBrickWall.position.set(LEFT_WALL_X, 0.24, -2.1);
  voxBox(0.75, 9.2, 8.2, brickMat, 0, 4.6, 0, leftBrickWall);
  voxBox(0.95, 0.48, 8.4, whiteTrimMat, 0, 9.35, 0, leftBrickWall);

  // 3 Hanging Cast-Iron Frying Pans (matching photo 1 & 3!)
  const panRack = new THREE.Group();
  panRack.position.set(0.45, 6.2, 2.8);
  voxBox(0.15, 0.16, 2.6, 0x26201c, 0, 0.65, 0, panRack);
  [[-0.85, 0x222426], [0.0, 0x1e2022], [0.85, 0x282a2c]].forEach(([pz, pCol], pi) => {
    voxBox(0.12, 0.72, 0.12, 0x1e1e1e, 0.08, 0.3, pz, panRack);
    const pan = voxCyl(0.44, 0.38, 0.20, 10, pCol, 0.14, -0.22, pz, panRack);
    pan.rotation.z = Math.PI / 2;
    if (pi === 0) {
      const inner = voxCyl(0.36, 0.34, 0.22, 10, 0xe8b4c8, 0.16, -0.22, pz, panRack);
      inner.rotation.z = Math.PI / 2;
    }
  });
  leftBrickWall.add(panRack);

  // Tall Sky-Blue Open Upper Shelves (stocked with groceries!)
  const blueUpperShelf = new THREE.Group();
  blueUpperShelf.position.set(0.85, 5.4, -0.3);
  voxBox(1.35, 4.2, 3.6, skyBlueMat, 0, 0, 0, blueUpperShelf);
  [-1.3, 0.0, 1.3].forEach(sy => {
    voxBox(1.42, 0.16, 3.65, skyBlueMat, 0.05, sy, 0, blueUpperShelf);
  });
  [-1.15, -0.38, 0.38, 1.15].forEach((sz, si) => {
    voxBox(0.65, 0.82, 0.55, [0xe84829, 0xf2c12e, 0x2864b8, 0xf5efe6][si], 0.2, 0.55, sz, blueUpperShelf);
    voxCyl(0.24, 0.24, 0.62, 8, [0xf2b92e, 0x3878c8, 0xd93829, 0x5ebf8d][si], 0.2, -0.82, sz, blueUpperShelf);
    voxBox(0.55, 0.60, 0.52, [0xfaf6ed, 0x2b5da8, 0xe89b27, 0xd9453b][si], 0.2, 1.75, sz, blueUpperShelf);
  });
  leftBrickWall.add(blueUpperShelf);

  // Lower Sky-Blue Stove Counter + Black 4-Burner Stove + Cooking Pots
  voxBox(1.9, 2.2, 6.4, skyBlueMat, 1.15, 1.1, 0.1, leftBrickWall);
  voxBox(2.05, 0.18, 6.5, honeyWoodMat, 1.15, 2.25, 0.1, leftBrickWall);
  voxBox(1.65, 0.16, 2.4, 0x1a1c1e, 1.2, 2.38, 0.5, leftBrickWall); // Stove
  voxCyl(0.38, 0.32, 0.42, 10, 0xf2b8c6, 1.2, 2.65, 1.1, leftBrickWall); // Pink pot
  voxCyl(0.35, 0.32, 0.52, 10, 0x242628, 1.2, 2.70, -0.2, leftBrickWall); // Black kettle
  scene.add(leftBrickWall);

  // 1C) Front Sky-Blue Peninsula Counter & Open Bookcase (Projects inward at z = 1.8)
  const peninsula = new THREE.Group();
  peninsula.position.set(-12.7, 0.24, 1.8);
  voxBox(5.4, 2.45, 1.75, skyBlueMat, 0, 1.22, 0, peninsula);
  voxBox(5.6, 0.18, 1.92, skyBlueMat, 0, 2.52, 0, peninsula);
  [-0.75, 0.0, 0.75].forEach(sy => {
    voxBox(5.1, 0.14, 1.5, 0x2688bf, 0, 1.22 + sy, 0.15, peninsula);
  });
  [-1.8, -0.8, 0.2, 1.2, 2.0].forEach((px, pi) => {
    voxBox(0.65, 0.48, 0.62, [0xfaf6f0, 0xd93829, 0xf2c12e, 0x3878c8, 0x4aa858][pi], px, 1.62, 0.35, peninsula);
    voxBox(0.68, 0.45, 0.62, [0xeb9838, 0xfaf6f0, 0x4aa858, 0xd9453b, 0xf2c12e][pi], px, 0.85, 0.35, peninsula);
  });
  // Cookbooks on top ("FRUIT candy" & Berry Book)
  const book1 = voxBox(1.15, 1.25, 0.18, 0xfaf6f0, -0.6, 3.18, 0.25, peninsula);
  book1.rotation.x = -0.22;
  const book2 = voxBox(1.45, 1.32, 0.22, 0xf7bfd0, 0.85, 3.22, 0.30, peninsula);
  book2.rotation.x = -0.22;
  voxBox(0.55, 0.65, 0.24, 0xc92828, 0.55, 3.22, 0.32, peninsula);
  scene.add(peninsula);

  // ==================== 2. KITCHEN 45° ANGLED CORNER WALL (SINK & WINDOW) & CORNER POCHÉ ENCLOSURE ====================
  // Seamlessly bridges Left Wall (-15.4, -6.2) to Back Wall (-10.8, -10.8) at +45° (+Math.PI / 4)!
  const cornerWallGroup = new THREE.Group();
  cornerWallGroup.position.set(-13.1, 0.24, -8.5);
  cornerWallGroup.rotation.y = Math.PI / 4;

  // 45°-rotated floor filler strictly on the interior side of the 45° wall (zero tiles sticking out behind the wall!)
  voxBox(6.4, 0.31, 3.2, mat(0xffffff, { map: PixelTextures.monicaTerracottaTiles(3, 2), roughness: 0.82 }), 0, -0.165, 1.6, cornerWallGroup);

  // Diagonal brick wall slab
  voxBox(6.55, 9.2, 0.75, brickMat, 0, 4.6, 0, cornerWallGroup);
  voxBox(6.75, 0.48, 0.95, whiteTrimMat, 0, 9.35, 0, cornerWallGroup);

  // Structural Corner Poché Enclosure (Seals the exterior corner between Hallway at x = -15.4 and Back Wall at z = -10.8 so there is zero gap!)
  voxBox(0.75, 9.2, 4.6, brickMat, -15.4, 4.84, -8.5);
  voxBox(0.95, 0.48, 4.8, whiteTrimMat, -15.4, 9.59, -8.5);
  voxBox(4.6, 9.2, 0.75, brickMat, -13.1, 4.84, -10.8);
  voxBox(4.8, 0.48, 0.95, whiteTrimMat, -13.1, 9.59, -10.8);
  // Seamless miter corner posts at (-15.4, -6.2), (-15.4, -10.8), and (-10.8, -10.8)
  voxBox(0.78, 9.2, 0.78, brickMat, -15.4, 4.84, -6.2);
  voxBox(0.96, 0.48, 0.96, whiteTrimMat, -15.4, 9.59, -6.2);
  voxBox(0.78, 9.2, 0.78, brickMat, -15.4, 4.84, -10.8);
  voxBox(0.96, 0.48, 0.96, whiteTrimMat, -15.4, 9.59, -10.8);
  voxBox(0.78, 9.2, 0.78, brickMat, -10.8, 4.84, -10.8);
  voxBox(0.96, 0.48, 0.96, whiteTrimMat, -10.8, 9.59, -10.8);
  // Architectural poché cap sealing the triangular void between the 45° wall and the orthogonal outer corner (strictly inside triangle!)
  voxBox(3.6, 0.48, 1.0, whiteTrimMat, -13.6, 9.59, -10.3);
  voxBox(2.6, 0.48, 1.0, whiteTrimMat, -14.1, 9.59, -9.4);
  voxBox(1.6, 0.48, 1.0, whiteTrimMat, -14.6, 9.59, -8.5);

  // Kitchen Window on interior face of 45° wall with 4 light-blue panes (stepped in Z so zero Z-fighting!)
  voxBox(3.0, 3.0, 0.14, skyBlueMat, 0, 5.4, 0.45, cornerWallGroup); // Frame (front at +0.52)
  voxBox(2.5, 2.5, 0.14, 0xdff2fc, 0, 5.4, 0.53, cornerWallGroup);   // Glass (front at +0.60)
  voxBox(2.5, 0.14, 0.14, skyBlueMat, 0, 5.4, 0.60, cornerWallGroup); // Horizontal mullion (front at +0.67)
  voxBox(0.14, 2.5, 0.14, skyBlueMat, 0, 5.4, 0.60, cornerWallGroup); // Vertical mullion (front at +0.67)
  // Floral curtain valance & side ruffles
  voxBox(3.4, 1.20, 0.36, floralCurtainMat, 0, 6.85, 0.68, cornerWallGroup);
  voxBox(0.85, 3.1, 0.32, floralCurtainMat, -1.35, 5.3, 0.68, cornerWallGroup);
  voxBox(0.85, 3.1, 0.32, floralCurtainMat, 1.35, 5.3, 0.68, cornerWallGroup);

  // Sky-Blue Angled Corner Sink Cabinet + White Porcelain Drop-in Sink Basin
  voxBox(3.8, 2.2, 1.95, skyBlueMat, 0, 1.1, 1.18, cornerWallGroup);
  voxBox(3.9, 0.18, 2.05, honeyWoodMat, 0, 2.25, 1.18, cornerWallGroup);
  voxBox(2.2, 0.36, 1.35, 0xfafcfb, 0, 2.40, 1.20, cornerWallGroup); // White sink rim
  voxBox(1.8, 0.30, 1.05, 0xdce8eb, 0, 2.46, 1.20, cornerWallGroup); // Basin interior
  voxCyl(0.07, 0.07, 0.62, 8, 0xd4af37, 0, 2.75, 0.65, cornerWallGroup); // Gold faucet
  scene.add(cornerWallGroup);

  // ==================== 3. BACK RED-BRICK KITCHEN WALL (z = -10.8, x: -10.8 to -4.6) ====================
  const backKitchen = new THREE.Group();
  backKitchen.position.set(-7.6, 0.24, -10.8);
  // Ends cleanly at x = -4.60 so it never overlaps with the hallway partition wall!
  voxBox(6.0, 9.2, 0.75, brickMat, -0.1, 4.6, 0, backKitchen);
  voxBox(6.2, 0.48, 0.95, whiteTrimMat, -0.1, 9.35, 0, backKitchen);

  // Pale Butter-Yellow Two-Door Upper Wall Cabinet (Centered at x = -8.8 in world)
  const yellowCab = new THREE.Group();
  yellowCab.position.set(-1.2, 6.2, 0.85);
  voxBox(2.8, 3.0, 1.1, butterYellowMat, 0, 0, 0, yellowCab);
  voxBox(1.2, 2.55, 0.16, 0xd6cf6b, -0.65, 0, 0.54, yellowCab);
  voxBox(1.2, 2.55, 0.16, 0xd6cf6b, 0.65, 0, 0.54, yellowCab);
  voxBox(0.14, 2.7, 0.22, butterYellowMat, 0, 0, 0.56, yellowCab);
  backKitchen.add(yellowCab);
  addAptWarmLight(-8.8, 7.2, -9.2, 0.68, 11.0);

  // Wooden Stand with Microwave Oven + Roast Chicken (at x = -8.8 in world)
  voxBox(1.5, 1.9, 1.5, honeyWoodMat, -1.2, 0.95, 1.15, backKitchen);
  voxBox(1.45, 1.05, 1.3, 0x1e2022, -1.2, 2.45, 1.15, backKitchen);
  voxBox(0.90, 0.65, 0.12, 0xf5d68a, -1.35, 2.45, 1.82, backKitchen); // Glowing window

  // White Retro Refrigerator with Notes & Magnets (at x = -6.0 in world)
  voxBox(2.15, 4.65, 2.05, 0xf7f6f2, 1.6, 2.32, 1.3, backKitchen);
  voxBox(2.18, 0.08, 2.08, 0xd8d5ce, 1.6, 3.1, 1.3, backKitchen); // Freezer seam
  voxBox(0.52, 0.62, 0.08, 0x3b444b, 1.45, 3.7, 2.35, backKitchen); // Magnet photo
  voxBox(0.42, 0.42, 0.08, 0xd9453b, 2.05, 3.5, 2.35, backKitchen); // Red note

  // Clean Kitchen-side Dark Walnut Trim Post (at world x = -4.55, width 0.14 -> -4.62 to -4.48, strictly separated from purple wall at -4.46!)
  voxBox(0.14, 9.15, 1.60, darkWalnutMat, 3.05, 4.58, 0.80, backKitchen);
  scene.add(backKitchen);

  // ==================== 4. ROUND KITCHEN DINING TABLE & 4 PASTEL CHAIRS ====================
  // Tucked snugly in the kitchen dining area (x = -7.6, z = -0.5)
  const kitchenTable = new THREE.Group();
  kitchenTable.position.set(-7.6, 0.24, -0.5);
  voxCyl(1.85, 1.85, 0.18, 16, honeyWoodMat, 0, 1.56, 0, kitchenTable);
  voxCyl(0.24, 0.32, 1.52, 10, honeyWoodMat, 0, 0.76, 0, kitchenTable);
  voxCyl(0.85, 0.92, 0.12, 10, honeyWoodMat, 0, 0.06, 0, kitchenTable);
  // Two tall beer mugs with fluffy white foam!
  voxCyl(0.20, 0.17, 0.45, 8, 0xd98a2b, -0.55, 1.88, -0.25, kitchenTable);
  voxCyl(0.21, 0.20, 0.12, 8, 0xfaf8f5, -0.55, 2.12, -0.25, kitchenTable);
  voxCyl(0.20, 0.17, 0.45, 8, 0xd98a2b, 0.55, 1.88, -0.20, kitchenTable);
  voxCyl(0.21, 0.20, 0.12, 8, 0xfaf8f5, 0.55, 2.12, -0.20, kitchenTable);
  voxBox(0.55, 0.45, 0.20, 0xb8763e, -0.10, 1.88, -0.75, kitchenTable);
  scene.add(kitchenTable);

  function addKitchenChair(x, z, rotY, chairColor) {
    const ch = new THREE.Group();
    ch.position.set(x, 0.24, z);
    ch.rotation.y = rotY;
    const cMat = mat(chairColor, { variance: 10 });
    voxBox(1.18, 0.16, 1.18, 0xf7f4ee, 0, 0.96, 0, ch);
    voxBox(1.14, 1.05, 0.16, cMat, 0, 1.56, -0.52, ch);
    [[-0.46, -0.46], [0.46, -0.46], [-0.46, 0.46], [0.46, 0.46]].forEach(([lx, lz]) => {
      voxBox(0.14, 0.94, 0.14, cMat, lx, 0.47, lz, ch);
    });
    scene.add(ch);
  }
  addKitchenChair(-7.6, 1.5, Math.PI, 0xdfc2dc);       // Front chair (Joey sits here!)
  addKitchenChair(-7.6, -2.5, 0, 0xe8cad8);           // Back chair
  addKitchenChair(-9.6, -0.5, Math.PI / 2, 0xd6d2c4);  // Left cream chair
  addKitchenChair(-5.6, -0.5, -Math.PI / 2, 0xe5cf8e); // Right yellow chair (Monica sits here!)

  // Authentic Vintage Kitchen Hanging Pendant Lamps (Dining Table & Peninsula)
  function addKitchenPendant(px, pz) {
    const pend = new THREE.Group();
    pend.position.set(px, 0.24, pz);
    voxCyl(0.02, 0.02, 3.2, 6, 0x111111, 0, 7.6, 0, pend); // Black drop wire
    voxCyl(0.65, 0.16, 0.38, 10, mat(0x2d4f3e, { roughness: 0.35 }), 0, 6.05, 0, pend); // Forest green enamel cone shade
    voxCyl(0.16, 0.16, 0.22, 8, brassMat, 0, 6.32, 0, pend); // Brass fitting
    const pendBulb = voxCyl(0.20, 0.20, 0.28, 8, mat(0xfffae2, { emissive: 0xffb538, emissiveIntensity: 1.8, grain: false }), 0, 5.85, 0, pend);
    lampBulbs.push(pendBulb.material);
    const pl = new THREE.PointLight(0xffa43b, 0.75, 10.5);
    pl.position.set(0, 5.75, 0);
    pend.add(pl);
    warmPointLights.push(pl);
    scene.add(pend);
  }
  addKitchenPendant(-7.6, -0.5);  // Over dining table
  addKitchenPendant(-11.5, 1.8);  // Over kitchen counter peninsula

  // ==================== 5. RECESSED MONICA'S BATHROOM & HALLWAY (x: -4.45 to -1.2, z: -10.8 to -13.6) ====================
  // Authentic Monica's Bathroom: Checkered black & white tiles, clawfoot bathtub, Chandler's yellow rubber duckie,
  // shower curtain, vanity mirror, glowing sconce, hollow white door frame and teal ajar door!
  const hallwayGroup = new THREE.Group();
  hallwayGroup.position.set(-2.8, 0.65, -10.8);

  // Black & White Checkered Bathroom Floor (strictly behind threshold z = 0.0)
  const bathFloorMat = mat(0xffffff, { map: PixelTextures.monicaBathroomTile(3, 4) });
  voxBox(3.2, 0.10, 2.7, bathFloorMat, 0, 0.05, -1.38, hallwayGroup);

  // Back White Subway-Tiled Bathroom Wall
  voxBox(3.4, 8.8, 0.36, mat(0xf0eef2, { map: PixelTextures.kitchenTile(3, 8) }), 0, 4.4, -2.65, hallwayGroup);
  // Left interior bathroom wall
  voxBox(0.32, 8.8, 2.6, purpleWallMat, -1.54, 4.4, -1.35, hallwayGroup);
  // Right interior bathroom wall
  voxBox(0.32, 8.8, 2.6, purpleWallMat, 1.54, 4.4, -1.35, hallwayGroup);

  // White Clawfoot Bathtub (Positioned clearly in view through the open doorway!)
  const bathTubMat = mat(0xffffff, { roughness: 0.12, metalness: 0.05 });
  voxBox(1.38, 1.15, 2.05, bathTubMat, 0.25, 0.65, -1.30, hallwayGroup);
  // Gold clawfeet
  [[-0.32, -0.45], [0.82, -0.45], [-0.32, -2.15], [0.82, -2.15]].forEach(([fx, fz]) => {
    voxBox(0.16, 0.18, 0.16, brassMat, fx, 0.12, fz, hallwayGroup);
  });
  // Inner turquoise bathwater surface & bubble foam
  voxBox(1.12, 0.08, 1.80, mat(0x76c2de, { roughness: 0.1, transparent: true, opacity: 0.88 }), 0.25, 1.02, -1.30, hallwayGroup, false);
  voxBox(0.32, 0.12, 0.28, 0xfafcff, 0.45, 1.08, -1.65, hallwayGroup); // Bubble foam
  voxBox(0.24, 0.10, 0.24, 0xfafcff, -0.05, 1.07, -1.50, hallwayGroup);
  // Chrome Tub Faucet & Knobs
  voxBox(0.10, 0.38, 0.14, 0xd4d8dc, 0.25, 1.38, -2.22, hallwayGroup);

  // Chandler's Yellow Rubber Duckie (🐥 Floating right in front so you can spot it immediately!)
  voxBox(0.26, 0.20, 0.30, 0xffd214, 0.22, 1.14, -0.95, hallwayGroup); // Body
  voxBox(0.18, 0.18, 0.18, 0xffd214, 0.22, 1.30, -0.84, hallwayGroup); // Head
  voxBox(0.12, 0.07, 0.10, 0xff6a00, 0.22, 1.28, -0.72, hallwayGroup); // Orange beak

  // Shower Curtain on Brass Rail
  voxBox(2.6, 0.06, 0.06, brassMat, 0.0, 4.6, -0.45, hallwayGroup);
  voxBox(0.42, 3.8, 0.16, mat(0xcae5eb, { variance: 8 }), 0.92, 2.65, -0.45, hallwayGroup); // Gathered drape on right

  // Vanity Mirror & Wall Sconce on Back Subway Tile Wall
  voxBox(0.95, 1.65, 0.06, mat(0xc5dbe8, { roughness: 0.1 }), -0.55, 3.6, -2.42, hallwayGroup);
  voxBox(1.05, 1.75, 0.04, brassMat, -0.55, 3.6, -2.44, hallwayGroup);
  const bathSconce = voxCyl(0.18, 0.28, 0.45, 8, mat(0xfff2c6, { emissive: 0xffaa33, emissiveIntensity: 1.6, grain: false }), 0.35, 4.9, -2.35, hallwayGroup);
  lampBulbs.push(bathSconce.material);
  addAptWarmLight(-2.6, 5.2, -12.1, 0.85, 8.5); // Warm interior bathroom light!

  // HOLLOW White Door Frame & Transom (Replaces solid block so doorway & transom are wide open!)
  const transGlassMat = new THREE.MeshStandardMaterial({
    color: 0x8eb8d4, transparent: true, opacity: 0.32, roughness: 0.15, depthWrite: false
  });
  // Left & Right vertical door jambs
  voxBox(0.24, 7.6, 0.50, whiteTrimMat, -1.28, 3.8, 0.0, hallwayGroup);
  voxBox(0.24, 7.6, 0.50, whiteTrimMat, 1.28, 3.8, 0.0, hallwayGroup);
  // Horizontal transom bar above doorway (at y = 5.95) & top lintel (at y = 7.48)
  voxBox(2.32, 0.22, 0.50, whiteTrimMat, 0.0, 5.95, 0.0, hallwayGroup);
  voxBox(2.80, 0.24, 0.50, whiteTrimMat, 0.0, 7.48, 0.0, hallwayGroup);
  // Clear Transom Window Glass & Cross Muntin (y = 6.06 to 7.36)
  voxBox(2.30, 1.28, 0.10, transGlassMat, 0.0, 6.71, 0.0, hallwayGroup, false);
  voxBox(0.10, 1.28, 0.24, whiteTrimMat, 0.0, 6.71, 0.0, hallwayGroup);
  // Upper Purple Wall Header above door frame (y = 7.60 to 8.80) & Top Crown Molding
  voxBox(2.80, 1.20, 0.55, purpleWallMat, 0.0, 8.20, 0.0, hallwayGroup);
  voxBox(3.00, 0.48, 0.95, whiteTrimMat, 0.0, 8.95, 0.0, hallwayGroup);

  // Teal Bathroom Door — Swung Ajar inward to the left so the bathtub & rubber duckie are clearly visible!
  const ajarDoor = new THREE.Group();
  ajarDoor.position.set(-1.14, 0, -0.08);
  ajarDoor.rotation.y = -0.88; // Swung inward into the bathroom
  voxBox(2.15, 5.82, 0.20, tealDoorMat, 1.07, 2.91, 0, ajarDoor);
  // Recessed panels on teal door
  voxBox(1.65, 2.15, 0.24, mat(0x11564d), 1.07, 4.15, 0, ajarDoor);
  voxBox(1.65, 2.15, 0.24, mat(0x11564d), 1.07, 1.55, 0, ajarDoor);
  // Brass doorknob on both sides
  voxBox(0.16, 0.16, 0.34, brassMat, 1.92, 2.85, 0, ajarDoor);
  hallwayGroup.add(ajarDoor);

  // Exterior hallway return wall & warm sconce (at rel x = -1.53 -> world x = -4.33, width 0.26 -> -4.46 to -4.20, zero overlap with walnut post!)
  voxBox(0.26, 8.8, 1.54, purpleWallMat, -1.53, 4.4, 0.78, hallwayGroup);
  const hallSconce = voxCyl(0.22, 0.32, 0.52, 8, mat(0xfff2c6, { emissive: 0xffaa33, emissiveIntensity: 1.5, grain: false }), -1.12, 6.2, 0.72, hallwayGroup);
  lampBulbs.push(hallSconce.material);
  addAptWarmLight(-2.8, 6.8, -9.8, 0.65, 10.0);

  tagInteractive(hallwayGroup, {
    type: 'bathroom',
    message: '🛁 Monica 的卫生间 · 发现钱德勒最爱泡澡的小黄鸭！🐥 "What is so wrong with a grown man taking a bath?!"'
  });
  scene.add(hallwayGroup);

  // ==================== 6. BACK-RIGHT RAISED WINDOW ALCOVE (x: -1.2 to 15.0, z: -10.8 to -4.8) ====================
  const windowAlcove = new THREE.Group();
  windowAlcove.position.set(6.9, 0.65, -10.8);

  // Open Back Purple Wall Cutout (Clean openings for NYC Window & Balcony Door!)
  // Left wall section (from rel x = -8.1 to -4.7, width 3.4)
  voxBox(3.4, 8.8, 0.72, purpleWallMat, -6.4, 4.4, 0, windowAlcove);
  // Top wall header above window (rel x = -4.7 to +4.9, width 9.6, height 1.5, y = 7.3 to 8.8)
  voxBox(9.6, 1.5, 0.72, purpleWallMat, 0.1, 8.05, 0, windowAlcove);
  // Bottom wall below window sill (rel x = -4.7 to +4.9, width 9.6, height 1.9, y = 0 to 1.9)
  voxBox(9.6, 1.9, 0.72, purpleWallMat, 0.1, 0.95, 0, windowAlcove);
  // Top wall header above Balcony Door (rel x = 4.9 to 8.1, width 3.2, height 1.5, y = 7.3 to 8.8)
  voxBox(3.2, 1.5, 0.72, purpleWallMat, 6.5, 8.05, 0, windowAlcove);
  // Vertical column between window and balcony door (rel x = 4.9 to 5.2)
  voxBox(0.4, 7.3, 0.72, purpleWallMat, 5.0, 3.65, 0, windowAlcove);
  // Right outer edge column (rel x = 7.7 to 8.1)
  voxBox(0.6, 7.3, 0.72, purpleWallMat, 7.8, 3.65, 0, windowAlcove);

  // Crown molding along the top of the entire back wall
  voxBox(16.4, 0.48, 0.95, whiteTrimMat, 0, 8.95, 0, windowAlcove);

  // Large Black-Grid Bay Window Glass
  const winGlassMat = new THREE.MeshStandardMaterial({
    color: 0x8eb8d4, transparent: true, opacity: 0.22, roughness: 0.15, depthWrite: false
  });

  // Authentic Balcony Door (阳台的门 · centered at rel x = 6.4, world x = 13.3)
  const balconyDoorGroup = new THREE.Group();
  balconyDoorGroup.position.set(6.4, 0, 0);
  // Hollow White Door Frame Casing (Left/Right jambs, transom bar, top lintel)
  voxBox(0.22, 7.35, 0.82, whiteTrimMat, -1.08, 3.67, 0.05, balconyDoorGroup);
  voxBox(0.22, 7.35, 0.82, whiteTrimMat, 1.08, 3.67, 0.05, balconyDoorGroup);
  voxBox(2.38, 0.24, 0.82, whiteTrimMat, 0, 7.23, 0.05, balconyDoorGroup);
  voxBox(1.96, 0.22, 0.82, whiteTrimMat, 0, 5.36, 0.05, balconyDoorGroup);

  // Rectangular Transom Window above door (亮子采光窗 · open and transparent!)
  voxBox(1.92, 1.64, 0.12, winGlassMat, 0, 6.30, 0.08, balconyDoorGroup, false);
  voxBox(1.92, 0.10, 0.32, whiteTrimMat, 0, 6.30, 0.08, balconyDoorGroup);
  voxBox(0.10, 1.64, 0.32, whiteTrimMat, 0, 6.30, 0.08, balconyDoorGroup);

  // Pivoting Purple Paneled Door Leaf (hinge on left jamb at x = -0.98)
  const balcDoorMat = mat(0x78568c, { variance: 10 });
  const balcDoorPivot = new THREE.Group();
  balcDoorPivot.position.set(-0.98, 0, 0.08);
  voxBox(1.95, 5.25, 0.46, balcDoorMat, 0.98, 2.62, 0, balcDoorPivot);
  // Recessed upper & lower molded panels on door face
  voxBox(1.55, 2.05, 0.10, mat(0x654378), 0.98, 3.85, 0.26, balcDoorPivot);
  voxBox(1.55, 2.05, 0.10, mat(0x654378), 0.98, 1.45, 0.26, balcDoorPivot);
  // Polished Brass Knob & Lock Plate
  voxBox(0.16, 0.16, 0.25, brassMat, 1.70, 2.6, 0.28, balcDoorPivot);
  voxBox(0.10, 0.42, 0.08, brassMat, 1.70, 2.6, 0.25, balcDoorPivot);
  balconyDoorGroup.add(balcDoorPivot);

  const balcDoorData = {
    pivot: balcDoorPivot,
    isOpen: false,
    openAngle: -1.35,
    closeAngle: 0,
    currentAngle: 0,
    targetAngle: 0,
    toggle() {
      this.isOpen = !this.isOpen;
      this.targetAngle = this.isOpen ? this.openAngle : this.closeAngle;
      SoundEngine.playSFX('door');
      flash(this.isOpen ? '🚪 阳台门推开！通往曼哈顿消防梯露台！' : '🚪 阳台门已关上。');
    }
  };
  animatedDoors.push(balcDoorData);

  tagInteractive(balcDoorPivot, {
    type: 'animated_door',
    door: balcDoorData,
    scenario: 'ugly_naked',
    message: '🚪 阳台门 · 通往曼哈顿消防梯露台！老友们曾在这里用长筷子戳对面的丑裸男 🥢'
  });
  windowAlcove.add(balconyDoorGroup);

  // Exterior Manhattan Fire Escape Platform & Iron Railing (消防梯露台与黑色铁艺护栏)
  const fireEscape = new THREE.Group();
  fireEscape.position.set(0.1, 0, -0.65);
  // Iron platform deck
  voxBox(14.2, 0.18, 1.6, 0x181a1d, 0, 0.09, 0, fireEscape);
  // Handrails
  voxBox(14.2, 0.14, 0.14, 0x181a1d, 0, 2.2, -0.75, fireEscape);
  voxBox(14.2, 0.14, 0.14, 0x181a1d, 0, 0.35, -0.75, fireEscape);
  for (let bx = -6.8; bx <= 6.8; bx += 0.85) {
    voxBox(0.08, 1.85, 0.08, 0x181a1d, bx, 1.25, -0.75, fireEscape);
  }
  // Side Railings
  [-7.0, 7.0].forEach(sx => {
    voxBox(0.14, 0.14, 1.6, 0x181a1d, sx, 2.2, 0, fireEscape);
    voxBox(0.14, 0.14, 1.6, 0x181a1d, sx, 0.35, 0, fireEscape);
    voxBox(0.08, 1.85, 0.08, 0x181a1d, sx, 1.25, -0.3, fireEscape);
    voxBox(0.08, 1.85, 0.08, 0x181a1d, sx, 1.25, 0.3, fireEscape);
  });
  // Fire Escape Vertical Emergency Ladder
  const ladderX = -5.8;
  voxBox(0.10, 8.2, 0.10, 0x181a1d, ladderX - 0.5, 4.1, -0.65, fireEscape);
  voxBox(0.10, 8.2, 0.10, 0x181a1d, ladderX + 0.5, 4.1, -0.65, fireEscape);
  for (let ly = 0.6; ly <= 8.0; ly += 0.65) {
    voxBox(1.0, 0.08, 0.08, 0x181a1d, ladderX, ly, -0.65, fireEscape);
  }

  // Cute Voxel Pigeon perched on the Fire Escape Railing (曼哈顿常客小鸽子 🐦)
  const pigeonGroup = new THREE.Group();
  pigeonGroup.position.set(2.2, 2.27, -0.75);
  // Pigeon body
  voxBox(0.24, 0.22, 0.36, 0x6e7a85, 0, 0.14, 0, pigeonGroup);
  // Iridescent purple & teal neck collar
  voxBox(0.22, 0.18, 0.18, 0x583e6b, 0, 0.22, 0.12, pigeonGroup);
  voxBox(0.23, 0.08, 0.19, 0x24624b, 0, 0.30, 0.12, pigeonGroup);
  // Tail feathers slanting downward
  const pTail = voxBox(0.16, 0.05, 0.22, 0x333b44, 0, 0.15, -0.22, pigeonGroup);
  pTail.rotation.x = -0.28;
  // Pink voxel feet clasping railing
  voxBox(0.05, 0.10, 0.08, 0xdb7870, -0.06, 0.02, 0, pigeonGroup);
  voxBox(0.05, 0.10, 0.08, 0xdb7870, 0.06, 0.02, 0, pigeonGroup);

  // Animated pigeon head (pivot at neck for lifelike bobs & rail pecking)
  const pigeonHead = new THREE.Group();
  pigeonHead.position.set(0, 0.34, 0.14);
  voxBox(0.18, 0.18, 0.18, 0x7c8a96, 0, 0.08, 0, pigeonHead); // Head
  voxBox(0.04, 0.04, 0.04, 0x111111, -0.10, 0.10, 0.04, pigeonHead); // Left eye
  voxBox(0.04, 0.04, 0.04, 0x111111, 0.10, 0.10, 0.04, pigeonHead);  // Right eye
  voxBox(0.06, 0.05, 0.10, 0xeb9578, 0, 0.07, 0.13, pigeonHead);      // Peach beak
  pigeonGroup.add(pigeonHead);

  // Animated wings (flapping on click or idle flutter)
  const pLeftWing = new THREE.Group();
  pLeftWing.position.set(-0.13, 0.18, 0);
  voxBox(0.06, 0.18, 0.32, 0x47525d, 0, -0.04, 0, pLeftWing);
  voxBox(0.07, 0.04, 0.24, 0x1a1e22, 0, -0.04, 0, pLeftWing); // Black wing bar
  pigeonGroup.add(pLeftWing);

  const pRightWing = new THREE.Group();
  pRightWing.position.set(0.13, 0.18, 0);
  voxBox(0.06, 0.18, 0.32, 0x47525d, 0, -0.04, 0, pRightWing);
  voxBox(0.07, 0.04, 0.24, 0x1a1e22, 0, -0.04, 0, pRightWing);
  pigeonGroup.add(pRightWing);

  animatedPigeon.group = pigeonGroup;
  animatedPigeon.head = pigeonHead;
  animatedPigeon.leftWing = pLeftWing;
  animatedPigeon.rightWing = pRightWing;

  tagInteractive(pigeonGroup, {
    type: 'pigeon',
    message: '🐦 曼哈顿常客小鸽子咕咕！"Hey, don\'t touch my breadcrumbs!"'
  });
  fireEscape.add(pigeonGroup);
  windowAlcove.add(fireEscape);

  // Manhattan Lower Street & Roadway (visible through bay window below fire escape)
  const streetGroup = new THREE.Group();
  streetGroup.position.set(0.1, -0.15, -1.85);
  // Dark asphalt roadway
  voxBox(28.0, 0.20, 2.4, mat(0x23272d, { roughness: 0.9 }), 0, 0, 0, streetGroup);
  // Sidewalk concrete curb
  voxBox(28.0, 0.22, 0.45, mat(0x7a828e, { roughness: 0.85 }), 0, 0.08, 1.15, streetGroup);
  // White dashed lane divider markings
  for (let rx = -12.0; rx <= 12.0; rx += 3.2) {
    voxBox(1.6, 0.02, 0.14, 0xededeb, rx, 0.11, 0, streetGroup);
  }
  windowAlcove.add(streetGroup);

  // Iconic Animated NYC Yellow Cab (经典纽约黄色计程车 🚕)
  const cabGroup = new THREE.Group();
  cabGroup.position.set(animatedYellowCab.x, -0.06, -1.85);

  const taxiYellowMat = mat(0xf2b90c, { roughness: 0.35, metalness: 0.1 });
  const darkGlassMat = mat(0x283848, { roughness: 0.15, metalness: 0.35 });
  const chromeMat = mat(0xd4d8dc, { metalness: 0.85, roughness: 0.15 });
  const tireMat = mat(0x1a1a1a, { roughness: 0.9 });
  const hubMat = mat(0xcccccc, { roughness: 0.2, metalness: 0.8 });

  // Lower chassis & Main yellow body
  voxBox(3.4, 0.28, 1.55, 0x181818, 0, 0.24, 0, cabGroup);
  voxBox(3.4, 0.52, 1.58, taxiYellowMat, 0, 0.58, 0, cabGroup);

  // Black and white checkerboard side stripes
  voxBox(3.2, 0.15, 0.04, mat(0xffffff, { map: PixelTextures.taxiChecker() }), 0, 0.68, 0.80, cabGroup);
  voxBox(3.2, 0.15, 0.04, mat(0xffffff, { map: PixelTextures.taxiChecker() }), 0, 0.68, -0.80, cabGroup);

  // Cabin greenhouse with dark glass
  voxBox(1.95, 0.50, 1.44, darkGlassMat, -0.15, 1.04, 0, cabGroup);
  voxBox(1.85, 0.10, 1.48, taxiYellowMat, -0.15, 1.32, 0, cabGroup); // Yellow roof

  // Rooftop glowing "TAXI" sign
  const cabSign = voxBox(0.68, 0.24, 0.34, mat(0xffffff, {
    map: PixelTextures.taxiSign(),
    emissive: 0xffe680,
    emissiveIntensity: 0.8
  }), -0.15, 1.48, 0, cabGroup);
  lampBulbs.push(cabSign.material);

  // Chrome bumpers & front radiator grille
  voxBox(0.18, 0.20, 1.68, chromeMat, 1.72, 0.38, 0, cabGroup);
  voxBox(0.18, 0.20, 1.68, chromeMat, -1.72, 0.38, 0, cabGroup);
  voxBox(0.12, 0.32, 1.05, chromeMat, 1.71, 0.64, 0, cabGroup);

  // Glowing headlights with forward beam
  const hlMat = mat(0xfffee6, { emissive: 0xffffbb, emissiveIntensity: 1.8, grain: false });
  voxBox(0.14, 0.14, 0.18, hlMat, 1.71, 0.64, 0.58, cabGroup);
  voxBox(0.14, 0.14, 0.18, hlMat, 1.71, 0.64, -0.58, cabGroup);
  lampBulbs.push(hlMat);
  const cabFrontSpot = new THREE.PointLight(0xfffae0, 0.85, 10.5);
  cabFrontSpot.position.set(2.4, 0.65, 0);
  cabGroup.add(cabFrontSpot);
  animatedYellowCab.frontSpot = cabFrontSpot;

  // Glowing red taillights
  const tlMat = mat(0xff2222, { emissive: 0xff1111, emissiveIntensity: 1.6, grain: false });
  voxBox(0.14, 0.12, 0.16, tlMat, -1.71, 0.64, 0.58, cabGroup);
  voxBox(0.14, 0.12, 0.16, tlMat, -1.71, 0.64, -0.58, cabGroup);
  lampBulbs.push(tlMat);

  // 4 Wheels
  animatedYellowCab.wheels = [];
  [
    [1.1, 0.82], [-1.1, 0.82], [1.1, -0.82], [-1.1, -0.82]
  ].forEach(([wx, wz]) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(wx, 0.30, wz);
    const tire = voxCyl(0.30, 0.30, 0.24, 10, tireMat, 0, 0, 0, wheelGroup);
    tire.rotation.x = Math.PI / 2;
    const hub = voxCyl(0.16, 0.16, 0.26, 8, hubMat, 0, 0, 0, wheelGroup);
    hub.rotation.x = Math.PI / 2;
    cabGroup.add(wheelGroup);
    animatedYellowCab.wheels.push(wheelGroup);
  });

  animatedYellowCab.group = cabGroup;
  tagInteractive(cabGroup, {
    type: 'taxi',
    message: '🚕 哔哔——！纽约黄色计程车呼啸穿梭在西村街头！"Hey, I\'m walkin\' here!"'
  });
  windowAlcove.add(cabGroup);

  // Exterior NYC Skyline Panoramic Backdrop Plane (Framed neatly behind fire escape & street!)
  const nycGeo = new THREE.PlaneGeometry(14.2, 7.0);
  const nycMat = new THREE.MeshBasicMaterial({
    map: PixelTextures.nycSkyline('studio'),
    depthWrite: false
  });
  nycBackdropMesh = new THREE.Mesh(nycGeo, nycMat);
  nycBackdropMesh.position.set(0.1, 4.6, -2.65);
  windowAlcove.add(nycBackdropMesh);

  // Large Black-Grid Bay Window (Centered at x = 7.0 in world)
  voxBox(9.6, 5.4, 0.12, winGlassMat, 0.1, 4.6, 0.42, windowAlcove, false);
  [-4.7, -2.35, 0.1, 2.45, 4.8].forEach(wx => {
    voxBox(0.18, 5.5, 0.48, 0x1a1c1e, wx, 4.6, 0.42, windowAlcove);
  });
  [1.9, 3.7, 5.5, 7.3].forEach(wy => {
    voxBox(9.7, 0.18, 0.48, 0x1a1c1e, 0.1, wy, 0.42, windowAlcove);
  });

  // Grand Cream-Yellow Floral Valance & Tied-Back Side Curtains
  voxBox(10.8, 1.35, 0.65, floralCurtainMat, 0.1, 7.65, 0.68, windowAlcove);
  voxBox(1.45, 6.4, 0.58, floralCurtainMat, -4.6, 4.2, 0.68, windowAlcove);
  voxBox(1.45, 6.4, 0.58, floralCurtainMat, 4.8, 4.2, 0.68, windowAlcove);

  // Window Sill Bench + Red Floral Cushion
  voxBox(9.6, 1.25, 1.6, 0xf5f0e6, 0.1, 0.62, 1.0, windowAlcove);
  voxBox(1.6, 0.85, 0.95, redFloralPillowMat, -3.4, 1.45, 1.1, windowAlcove);

  // Warm Ochre-Yellow Writing Desk + Books + Glowing Floral Table Lamp + Desk Chair
  const yellowDesk = new THREE.Group();
  yellowDesk.position.set(0.3, 0, 3.3);
  const deskMat = mat(0xe3a129, { variance: 10 });
  voxBox(4.4, 0.38, 1.85, deskMat, 0, 1.68, 0, yellowDesk);
  [[-1.95, -0.75], [1.95, -0.75], [-1.95, 0.75], [1.95, 0.75]].forEach(([lx, lz]) => {
    voxBox(0.22, 1.65, 0.22, deskMat, lx, 0.82, lz, yellowDesk);
  });
  voxBox(0.65, 0.72, 0.48, 0xfaf6f0, -1.35, 2.22, -0.25, yellowDesk);
  voxBox(0.22, 0.70, 0.48, 0xc92828, -0.95, 2.22, -0.25, yellowDesk);
  voxBox(0.75, 0.10, 0.62, 0xf2c12e, -0.15, 1.92, 0.1, yellowDesk);
  // Glowing Floral Table Lamp on Desk
  voxCyl(0.26, 0.32, 0.42, 8, 0xfaf6f0, 1.35, 2.08, -0.1, yellowDesk);
  const deskShade = voxCyl(0.38, 0.58, 0.75, 10, mat(0xfff0c4, {
    map: PixelTextures.floralCurtain(1, 1),
    emissive: 0xffaa33,
    emissiveIntensity: 1.35
  }), 1.35, 2.65, -0.1, yellowDesk);
  lampBulbs.push(deskShade.material);
  windowAlcove.add(yellowDesk);
  addAptWarmLight(8.5, 3.8, -7.5, 0.85, 12.0);

  // Wooden Desk Chair & Small Floral Rug on Platform
  const deskChair = new THREE.Group();
  deskChair.position.set(0.3, 0, 4.8);
  deskChair.rotation.y = Math.PI - 0.25;
  voxBox(1.18, 0.16, 1.18, 0xfaf6f0, 0, 0.96, 0, deskChair);
  voxBox(1.18, 0.95, 0.16, darkWalnutMat, 0, 1.52, -0.52, deskChair);
  [[-0.48, -0.48], [0.48, -0.48], [-0.48, 0.48], [0.48, 0.48]].forEach(([lx, lz]) => {
    voxBox(0.14, 0.94, 0.14, darkWalnutMat, lx, 0.47, lz, deskChair);
  });
  windowAlcove.add(deskChair);
  voxBox(2.6, 0.06, 2.2, livingRugMat, 3.8, 0.04, 5.2, windowAlcove);

  // Cozy White Armchair with Blue Throw Pillow on Left of Platform (Ross sits here! x = 1.6 in world)
  const whiteArmchair = new THREE.Group();
  whiteArmchair.position.set(-5.3, 0, 3.6);
  whiteArmchair.rotation.y = 0.52;
  voxBox(2.1, 0.55, 1.95, 0xf7f5f0, 0, 0.55, 0, whiteArmchair);
  voxBox(1.95, 1.45, 0.42, 0xf7f5f0, 0, 1.42, -0.75, whiteArmchair);
  voxBox(0.32, 1.05, 1.9, darkWalnutMat, -0.92, 0.95, 0, whiteArmchair);
  voxBox(0.32, 1.05, 1.9, darkWalnutMat, 0.92, 0.95, 0, whiteArmchair);
  voxBox(1.05, 0.85, 0.35, 0x5c7ec9, 0, 1.25, -0.38, whiteArmchair);
  windowAlcove.add(whiteArmchair);
  tagInteractive(windowAlcove, { type: 'window', scenario: 'ugly_naked' });
  scene.add(windowAlcove);

  // ==================== 7. CENTER & RIGHT LIVING ROOM (EXPANSIVE 2/3 OF APARTMENT!) ====================
  // 7A) Large Cream Patterned Persian Area Rug (centered at x = 4.8, z = 1.8)
  voxBox(11.2, 0.08, 9.2, livingRugMat, 4.8, 0.25, 1.8);

  // 7B) Long White Fabric Sofa (Facing Right +X toward Coffee Table & TV! Located at x = -1.6, z = 1.8)
  const whiteSofa = new THREE.Group();
  whiteSofa.position.set(-1.6, 0.25, 1.8);
  whiteSofa.rotation.y = Math.PI / 2;
  const whiteFabricMat = mat(0xf6f4ee, { variance: 8 });
  voxBox(6.6, 0.62, 2.2, whiteFabricMat, 0, 0.42, 0, whiteSofa);
  voxBox(6.4, 1.65, 0.52, whiteFabricMat, 0, 1.45, -0.82, whiteSofa);
  [-2.0, 0, 2.0].forEach(cx => {
    voxBox(1.9, 0.28, 1.65, whiteFabricMat, cx, 0.86, 0.16, whiteSofa);
  });
  voxBox(0.65, 1.22, 2.22, whiteFabricMat, -3.0, 0.95, 0, whiteSofa);
  voxBox(0.65, 1.22, 2.22, whiteFabricMat, 3.0, 0.95, 0, whiteSofa);
  // Red floral throw pillows & plaid throw blanket
  voxBox(1.15, 0.92, 0.38, redFloralPillowMat, -1.8, 1.38, -0.38, whiteSofa);
  voxBox(1.15, 0.92, 0.38, redFloralPillowMat, 1.7, 1.38, -0.38, whiteSofa);
  voxBox(1.65, 0.14, 2.28, redPlaidMat, -2.1, 1.72, -0.45, whiteSofa);
  scene.add(whiteSofa);

  // 7C) End Table Behind Sofa with Red-and-White Floral Lamp (at x = -1.6, z = -2.2)
  const backEndTable = new THREE.Group();
  backEndTable.position.set(-1.6, 0.25, -2.2);
  voxBox(1.7, 1.45, 1.7, 0x1e2022, 0, 0.72, 0, backEndTable);
  voxCyl(0.28, 0.34, 0.42, 8, 0xfaf6f0, 0, 1.65, 0, backEndTable);
  const redLampShade = voxCyl(0.42, 0.65, 0.82, 10, mat(0xffffff, {
    map: PixelTextures.redFloralPillow(),
    emissive: 0xff7b2e,
    emissiveIntensity: 1.25
  }), 0, 2.22, 0, backEndTable);
  lampBulbs.push(redLampShade.material);
  scene.add(backEndTable);
  addAptWarmLight(-1.6, 3.2, -2.2, 0.78, 11.0);

  // 7C2) Monica's Iconic Arched Brass Floor Lamp (拱形铜制落地灯 · 弧形金属杆伸向沙发与茶几上方)
  const archedLamp = new THREE.Group();
  archedLamp.position.set(0.6, 0.25, -2.2);
  voxCyl(0.65, 0.72, 0.18, 12, brassMat, 0, 0.09, 0, archedLamp); // Heavy circular brass base
  voxCyl(0.06, 0.06, 4.2, 8, brassMat, 0, 2.18, 0, archedLamp);   // Vertical stem
  const arch1 = voxCyl(0.06, 0.06, 2.2, 8, brassMat, 0.2, 4.8, 0.35, archedLamp);
  arch1.rotation.x = 0.42;
  const arch2 = voxCyl(0.06, 0.06, 1.8, 8, brassMat, 0.4, 5.85, 0.95, archedLamp);
  arch2.rotation.x = 0.85;
  const arch3 = voxCyl(0.06, 0.06, 0.9, 8, brassMat, 0.4, 6.05, 1.55, archedLamp);
  arch3.rotation.x = 1.45;
  voxCyl(0.68, 0.32, 0.46, 12, brassMat, 0.4, 5.45, 1.85, archedLamp); // Brass dome shade
  const floorBulb = voxCyl(0.24, 0.24, 0.28, 8, mat(0xfffbe6, { emissive: 0xffaa33, emissiveIntensity: 2.0, grain: false }), 0.4, 5.30, 1.85, archedLamp);
  lampBulbs.push(floorBulb.material);
  const floorLight = new THREE.PointLight(0xffa43b, 0.85, 12.0);
  floorLight.position.set(0.4, 5.2, 1.85);
  archedLamp.add(floorLight);
  warmPointLights.push(floorLight);
  tagInteractive(archedLamp, {
    type: 'lamp',
    message: '💡 Monica 的经典拱形铜制落地灯 · 为温暖的客厅洒下琥珀色光晕'
  });
  scene.add(archedLamp);

  // 7D) Tiered Grey Side Table in front of Sofa with Magazines (at x = -1.6, z = 5.8)
  const frontSideTable = new THREE.Group();
  frontSideTable.position.set(-1.6, 0.25, 5.8);
  const greyWoodMat = mat(0x9a9c9e, { variance: 10 });
  voxBox(1.85, 0.16, 1.85, greyWoodMat, 0, 1.42, 0, frontSideTable);
  voxBox(1.65, 0.14, 1.65, greyWoodMat, 0, 0.52, 0, frontSideTable);
  [[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]].forEach(([lx, lz]) => {
    voxBox(0.16, 1.42, 0.16, greyWoodMat, lx, 0.71, lz, frontSideTable);
  });
  const m1 = voxBox(0.85, 0.95, 0.16, 0x2b68b8, -0.15, 1.92, 0, frontSideTable);
  m1.rotation.z = 0.25;
  const m2 = voxBox(0.85, 0.92, 0.16, 0xd9453b, 0.25, 1.90, 0.15, frontSideTable);
  m2.rotation.z = -0.22;
  scene.add(frontSideTable);

  // 7E) Square Light-Oak Coffee Table in Center of Living Room (x = 4.2, z = 1.8)
  const aptCoffeeTable = new THREE.Group();
  aptCoffeeTable.position.set(4.2, 0.25, 1.8);
  const lightOakMat = mat(0xd8b480, { variance: 10 });
  voxBox(3.6, 0.20, 3.4, lightOakMat, 0, 1.18, 0, aptCoffeeTable);
  voxBox(3.3, 0.14, 3.1, lightOakMat, 0, 0.38, 0, aptCoffeeTable);
  [[-1.6, -1.5], [1.6, -1.5], [-1.6, 1.5], [1.6, 1.5]].forEach(([lx, lz]) => {
    voxBox(0.20, 1.18, 0.20, lightOakMat, lx, 0.59, lz, aptCoffeeTable);
  });
  // Open book & ceramic mugs
  voxBox(0.95, 0.10, 1.15, 0x2b62a8, -0.45, 1.32, 0.45, aptCoffeeTable).rotation.y = 0.35;
  voxCyl(0.28, 0.24, 0.06, 8, 0x222426, -0.65, 1.31, -0.55, aptCoffeeTable);
  voxCyl(0.18, 0.15, 0.28, 8, 0x3b2a1e, -0.65, 1.46, -0.55, aptCoffeeTable);
  voxCyl(0.28, 0.24, 0.06, 8, 0x222426, 0.65, 1.31, -0.35, aptCoffeeTable);
  voxCyl(0.18, 0.15, 0.28, 8, 0x3b2a1e, 0.65, 1.46, -0.35, aptCoffeeTable);
  tagInteractive(aptCoffeeTable, { type: 'coffee', scenario: 'trivia' });
  scene.add(aptCoffeeTable);

  // 7F) Mustard-Gold Plush Armchair with Blue Pillow & Blanket (Chandler's seat at x = 4.5, z = -2.0)
  const mustardChair = new THREE.Group();
  mustardChair.position.set(4.5, 0.25, -2.0);
  mustardChair.rotation.y = -0.22;
  const mustardMat = mat(0xc4923b, { variance: 14 });
  voxBox(2.65, 0.62, 2.25, mustardMat, 0, 0.42, 0, mustardChair);
  voxBox(2.45, 1.55, 0.55, mustardMat, 0, 1.42, -0.82, mustardChair);
  voxBox(0.58, 1.18, 2.25, mustardMat, -1.08, 0.92, 0, mustardChair);
  voxBox(0.58, 1.18, 2.25, mustardMat, 1.08, 0.92, 0, mustardChair);
  voxBox(1.18, 0.88, 0.36, 0x587ec9, 0.1, 1.25, -0.38, mustardChair);
  voxBox(0.72, 0.68, 1.65, mat(0xffffff, { map: PixelTextures.stripedCurtain() }), -1.12, 1.25, 0.25, mustardChair);
  scene.add(mustardChair);

  // 7G) Foreground Dark-Walnut Long Bench with Woven Runner & Books (at x = 4.2, z = 6.6)
  const frontBench = new THREE.Group();
  frontBench.position.set(4.2, 0.25, 6.6);
  voxBox(6.8, 0.22, 1.65, darkWalnutMat, 0, 1.12, 0, frontBench);
  voxBox(6.4, 0.16, 1.35, darkWalnutMat, 0, 0.35, 0, frontBench);
  [[-3.0, -0.65], [3.0, -0.65], [-3.0, 0.65], [3.0, 0.65]].forEach(([lx, lz]) => {
    voxBox(0.22, 1.12, 0.22, darkWalnutMat, lx, 0.56, lz, frontBench);
  });
  voxBox(6.88, 0.06, 1.25, mat(0xffffff, { map: PixelTextures.stripedCurtain() }), 0, 1.25, 0, frontBench);
  voxBox(1.15, 0.28, 0.95, 0xf2e8c9, -1.35, 1.42, 0, frontBench).rotation.y = 0.38;
  voxBox(1.12, 0.32, 0.92, 0xe8b427, 1.75, 1.44, 0.05, frontBench).rotation.y = -0.25;
  scene.add(frontBench);

  // ==================== 8. RIGHT LAVENDER WALL (x = 15.0, z: -10.8 to +8.8 -> length 19.6) ====================
  const rightWall = new THREE.Group();
  rightWall.position.set(15.0, 0.24, -1.0);
  voxBox(0.75, 9.2, 19.6, purpleWallMat, 0, 4.6, 0, rightWall);
  voxBox(0.95, 0.48, 19.8, whiteTrimMat, 0, 9.35, 0, rightWall);

  // Monica's Bedroom Door (z = -5.4 within rightWall -> world z = -6.55)
  voxBox(0.88, 7.4, 3.2, purpleDoorMat, -0.1, 4.1, -5.4, rightWall);
  voxBox(0.22, 0.22, 0.22, brassMat, -0.58, 3.6, -4.1, rightWall);

  // 3 Small Framed Photos + Iconic French Vintage Poster ("Jouets")
  [5.8, 4.4, 3.0].forEach(fy => {
    voxBox(0.18, 0.95, 0.85, 0x5c3d24, -0.42, fy, -2.4, rightWall);
    voxBox(0.20, 0.68, 0.58, 0xe8dfc8, -0.45, fy, -2.4, rightWall);
  });
  // Large Gold-Framed French Poster (world z = 1.25)
  voxBox(0.22, 4.4, 3.8, 0xb89648, -0.42, 5.2, 2.4, rightWall);
  voxBox(0.24, 3.9, 3.3, mat(0xffffff, { map: PixelTextures.frenchPoster() }), -0.46, 5.2, 2.4, rightWall);

  // Glowing Wall Sconce
  const rightSconce = voxCyl(0.32, 0.52, 0.72, 8, mat(0xffebb3, {
    emissive: 0xff9d2e,
    emissiveIntensity: 1.5,
    grain: false
  }), -0.85, 6.4, 4.8, rightWall);
  lampBulbs.push(rightSconce.material);
  addAptWarmLight(13.8, 6.6, 3.6, 0.82, 12.0);

  // Warm Wood TV Cabinet + Retro CRT TV (Facing the White Sofa! at world z = 2.4)
  const tvStand = new THREE.Group();
  tvStand.position.set(-1.55, 0.0, 2.4);
  voxBox(1.85, 1.85, 3.8, honeyWoodMat, 0, 0.92, 0, tvStand);
  voxBox(1.35, 1.65, 2.2, 0x1c1e20, 0.05, 2.65, -0.2, tvStand);
  voxBox(0.12, 1.32, 1.85, 0x2e3842, -0.60, 2.65, -0.2, tvStand);
  rightWall.add(tvStand);

  // Potted Monstera Plant in Gold Planter + Round Mat
  const plantGroup = new THREE.Group();
  plantGroup.position.set(-1.8, 0.0, 6.0);
  voxCyl(0.52, 0.38, 1.15, 10, brassMat, 0, 0.58, 0, plantGroup);
  [
    [-0.65, 2.0, -0.4, 0.35], [0.45, 2.35, -0.5, -0.25],
    [-0.45, 1.65, 0.55, 0.42], [0.55, 1.85, 0.45, -0.35], [0, 2.55, 0.1, 0.1]
  ].forEach(([lx, ly, lz, lrot]) => {
    voxCyl(0.05, 0.05, 1.2, 6, 0x3b6e28, lx * 0.5, ly - 0.5, lz * 0.5, plantGroup);
    const leaf = voxBox(0.95, 0.12, 0.78, 0x4e8c35, lx, ly, lz, plantGroup);
    leaf.rotation.z = lrot;
    voxBox(0.65, 0.14, 0.48, 0x8cc468, lx, ly + 0.02, lz, plantGroup).rotation.z = lrot;
  });
  rightWall.add(plantGroup);
  voxCyl(1.35, 1.35, 0.06, 14, livingRugMat, -1.6, 0.04, 7.8, rightWall);
  scene.add(rightWall);

  scene = _prevScene;
}

// ==================== BUILD ARTICULATED VOXEL CHARACTERS (ROUNDED PILLOW-BOX MII HEADS & HAIRSTYLES!) ====================
function createMiiHeadMesh(key, skinMat, faceMat) {
  const geo = new THREE.BoxGeometry(0.88, 0.86, 0.80, 14, 14, 10);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;

  for (let i = 0; i < pos.count; i++) {
    const ox = pos.getX(i);
    const oy = pos.getY(i);
    const oz = pos.getZ(i);

    const nx = ox / 0.44; // [-1, 1]
    const ny = oy / 0.43; // [-1, 1]
    const nz = oz / 0.40; // [-1, 1]

    // 1. Softly round the horizontal 90° edges (blend 50% box + 50% cylinder so cheeks are soft, not sharp!)
    const sXZ = Math.max(Math.abs(nx), Math.abs(nz));
    const lenXZ = Math.hypot(nx, nz) || 1;
    const cylX = (nx / lenXZ) * sXZ;
    const cylZ = (nz / lenXZ) * sXZ;
    let rx = nx * 0.50 + cylX * 0.50;
    let rz = nz * 0.50 + cylZ * 0.50;

    // 2. Gentle, balanced jawline chamfer (compromise between square box and oval: broad rounded chin, NEVER pointy!)
    let jawScale = 1.0;
    let yLift = 0;

    if (ny > 0.35) {
      // Softly rounded forehead / crown corners
      const t = (ny - 0.35) / 0.65; // 0 -> 1 at top
      jawScale = 1.0 - 0.12 * t * t;
      yLift = -0.035 * t * t * (rx * rx + rz * rz * 0.5);
    } else if (ny < -0.15) {
      // Gentle lower-cheek & chin rounding: keeps 76%~80% full width at the bottom, lifting only the outer corners!
      const t = (-0.15 - ny) / 0.85; // 0 -> 1 at bottom
      const taperAmt = (key === 'rachel') ? 0.22 : 0.18;
      jawScale = 1.0 - taperAmt * Math.pow(t, 1.5);
      // Lift the outer bottom jaw corners slightly so the 90° square corners become a soft rounded U-curve!
      const cornerDist = Math.abs(rx);
      if (cornerDist > 0.45) {
        const ct = (cornerDist - 0.45) / 0.55;
        yLift = 0.085 * Math.pow(t, 1.3) * Math.pow(ct, 1.6);
      }
    }

    const fx = rx * 0.44 * jawScale;
    const fy = oy + yLift;
    const fz = rz * 0.40 * (0.35 + 0.65 * jawScale);

    pos.setXYZ(i, fx, fy, fz);

    // Planar UV projection on front face so facial expressions stay 100% undistorted
    if (oz > 0.38) {
      uv.setXY(i, 0.5 + (fx / 0.82), 0.50 + (fy / 0.86));
    }
  }

  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, [skinMat, skinMat, skinMat, skinMat, faceMat, skinMat]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

// Softly beveled pillow-box hair piece helper (matches voxel aesthetic while avoiding harsh 90° spikes!)
function miiHairLock(w, h, d, m, x, y, z, parent, rx = 0, ry = 0, rz = 0, taperBottom = 0) {
  const geo = new THREE.BoxGeometry(w, h, d, 6, 6, 6);
  const pos = geo.attributes.position;
  const hw = w / 2, hh = h / 2, hd = d / 2;

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i) / hw;
    const ny = pos.getY(i) / hh;
    const nz = pos.getZ(i) / hd;

    // Softly beveled box cross-section (65% box + 35% cylinder)
    const s = Math.max(Math.abs(nx), Math.abs(nz));
    const len = Math.hypot(nx, nz) || 1;
    const ux = nx * 0.65 + ((nx / len) * s) * 0.35;
    const uz = nz * 0.65 + ((nz / len) * s) * 0.35;

    let scaleXZ = 1.0 - 0.14 * ny * ny;
    if (taperBottom > 0 && ny < 0) {
      const bt = -ny;
      scaleXZ *= (1 - Math.min(0.45, taperBottom * 0.5) * Math.pow(bt, 1.3));
    }

    pos.setXYZ(i, ux * hw * scaleXZ, ny * hh, uz * hd * scaleXZ);
  }

  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, typeof m === 'number' ? mat(m) : m);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function createVoxelCharacter(key, cfg) {
  const root = new THREE.Group();
  root.position.set(cfg.x, cfg.y, cfg.z);
  root.rotation.y = cfg.rotY || 0;
  (stageSpinGroup || scene).add(root);

  const skinHexVal = cfg.skinHex || (['ross', 'chandler', 'joey'].includes(key) ? '#f7c5a3' : '#fde5c8');
  const skinMat = mat(cfg.skin || (['ross', 'chandler', 'joey'].includes(key) ? 0xf7c5a3 : 0xfde5c8), { grain: false });
  const makeFaceTex = (expr) => {
    const tex = PixelTextures.charFace(skinHexVal, cfg.eyeHex || '#2c1e16', '#8c3b2b', key, expr);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  };
  const faceTextures = {
    normal: makeFaceTex('normal'),
    blink: makeFaceTex('blink'),
    talk: makeFaceTex('talk')
  };
  const faceMat = mat(0xffffff, { map: faceTextures.normal, grain: false });

  // Articulated Head Group with Softly Rounded Pillow-Box Mii Head!
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.90, 0);
  root.add(headGroup);

  const headMesh = createMiiHeadMesh(key, skinMat, faceMat);
  headGroup.add(headMesh);

  // Softly Rounded Neck
  voxCyl(0.18, 0.20, 0.22, 10, skinMat, 0, 1.40, 0, root);

  // Layered Soft-Voxel Mii Hair matching each character's Mii reference photo!
  const hairMat = mat(cfg.hairColor, { variance: 8 });
  const hairInnerMat = mat(cfg.hairInnerColor || cfg.hairColor, { variance: 8 });

  if (cfg.hairStyle === 'mii_monica') {
    // MONICA: Jet-black center-parted wavy shoulder-length bob!
    miiHairLock(0.94, 0.30, 0.88, hairMat, 0, 0.38, -0.02, headGroup); // Top crown
    miiHairLock(0.92, 0.88, 0.26, hairMat, 0, -0.02, -0.32, headGroup, 0, 0, 0, 0.25); // Back hair
    // Center-parted M-arch forehead waves (with center parting gap)
    miiHairLock(0.36, 0.14, 0.20, hairMat, -0.24, 0.34, 0.34, headGroup, 0, 0, 0.14);
    miiHairLock(0.36, 0.14, 0.20, hairMat, 0.24, 0.34, 0.34, headGroup, 0, 0, -0.14);
    // Wavy side locks framing cheeks softly
    [-1, 1].forEach(dir => {
      miiHairLock(0.20, 0.56, 0.72, hairMat, dir * 0.42, 0.10, -0.02, headGroup);
      miiHairLock(0.22, 0.44, 0.64, hairMat, dir * 0.44, -0.16, 0.01, headGroup, 0, 0, dir * 0.08);
      miiHairLock(0.18, 0.36, 0.52, hairMat, dir * 0.39, -0.38, 0.02, headGroup, 0, 0, dir * -0.08, 0.5);
      miiHairLock(0.16, 0.32, 0.44, hairInnerMat, dir * 0.29, -0.42, -0.02, headGroup, 0, 0, 0, 0.5);
    });
  } else if (cfg.hairStyle === 'mii_phoebe') {
    // PHOEBE: Pale golden-blonde center-parted wavy long hair with warm golden-tan inner layer!
    miiHairLock(0.96, 0.30, 0.88, hairMat, 0, 0.38, -0.02, headGroup);
    miiHairLock(0.94, 0.98, 0.26, hairInnerMat, 0, -0.08, -0.32, headGroup, 0, 0, 0, 0.3);
    // Center-parted M-arch blonde hairline with golden-tan inner root contour
    miiHairLock(0.34, 0.12, 0.20, hairInnerMat, -0.22, 0.32, 0.34, headGroup, 0, 0, 0.14);
    miiHairLock(0.34, 0.12, 0.20, hairInnerMat, 0.22, 0.32, 0.34, headGroup, 0, 0, -0.14);
    miiHairLock(0.38, 0.14, 0.20, hairMat, -0.24, 0.36, 0.33, headGroup, 0, 0, 0.16);
    miiHairLock(0.38, 0.14, 0.20, hairMat, 0.24, 0.36, 0.33, headGroup, 0, 0, -0.16);
    // Wavy outer blonde locks + golden-tan inner shoulder locks
    [-1, 1].forEach(dir => {
      miiHairLock(0.20, 0.58, 0.72, hairMat, dir * 0.43, 0.08, -0.02, headGroup);
      miiHairLock(0.22, 0.46, 0.64, hairMat, dir * 0.45, -0.18, 0.01, headGroup, 0, 0, dir * 0.10);
      miiHairLock(0.18, 0.42, 0.52, hairMat, dir * 0.41, -0.44, 0.02, headGroup, 0, 0, dir * -0.06, 0.5);
      miiHairLock(0.18, 0.44, 0.46, hairInnerMat, dir * 0.30, -0.48, -0.03, headGroup, 0, 0, dir * 0.06, 0.5);
    });
  } else if (cfg.hairStyle === 'mii_rachel') {
    // RACHEL: Iconic honey-caramel "The Rachel" cut with side-swept bangs & inward-curving layered tips!
    miiHairLock(0.96, 0.32, 0.88, hairMat, 0, 0.38, -0.02, headGroup);
    miiHairLock(0.92, 0.92, 0.26, hairInnerMat, 0, -0.04, -0.32, headGroup, 0, 0, 0, 0.3);
    // Side-swept bangs cleanly framing upper forehead (never poking out like horns!)
    miiHairLock(0.52, 0.15, 0.18, hairMat, -0.15, 0.33, 0.35, headGroup, 0, 0, -0.18);
    miiHairLock(0.28, 0.14, 0.18, hairMat, 0.26, 0.34, 0.34, headGroup, 0, 0, -0.22);
    // Layered caramel & chestnut side locks curving gently inward around jawline
    [-1, 1].forEach(dir => {
      miiHairLock(0.21, 0.60, 0.72, hairMat, dir * 0.43, 0.06, -0.01, headGroup);
      miiHairLock(0.20, 0.42, 0.60, hairMat, dir * 0.39, -0.32, 0.02, headGroup, 0, 0, dir * 0.14, 0.5);
      miiHairLock(0.17, 0.40, 0.50, hairInnerMat, dir * 0.29, -0.40, -0.02, headGroup, 0, 0, dir * 0.12, 0.5);
    });
  } else if (cfg.hairStyle === 'mii_ross') {
    // ROSS (5/7): Jet-black short textured crop with angular polygonal crown & neat tapered sideburns!
    miiHairLock(0.92, 0.28, 0.88, hairMat, 0, 0.40, -0.02, headGroup);
    miiHairLock(0.64, 0.16, 0.68, hairMat, 0, 0.49, 0.02, headGroup); // Textured polygonal center peak
    miiHairLock(0.90, 0.56, 0.24, hairMat, 0, 0.12, -0.33, headGroup, 0, 0, 0, 0.2);
    // Clean forehead hairline arch
    miiHairLock(0.84, 0.12, 0.18, hairMat, 0, 0.36, 0.34, headGroup);
    // Tapered sideburns hugging upper temples
    [-1, 1].forEach(dir => {
      miiHairLock(0.15, 0.44, 0.50, hairMat, dir * 0.42, 0.14, -0.02, headGroup, 0, 0, dir * -0.05, 0.4);
    });
  } else if (cfg.hairStyle === 'mii_chandler') {
    // CHANDLER (6/7): Chestnut-brown spiky flat-top Mii hair with jagged sawtooth spikes on top & slim sideburns!
    miiHairLock(0.94, 0.26, 0.88, hairMat, 0, 0.40, -0.02, headGroup);
    miiHairLock(0.90, 0.56, 0.24, hairMat, 0, 0.12, -0.33, headGroup, 0, 0, 0, 0.2);
    // Jagged spiky crown tufts angled across the top (matching 6/7 reference!)
    miiHairLock(0.28, 0.16, 0.46, hairMat, -0.28, 0.49, 0.06, headGroup, 0, 0, 0.22);
    miiHairLock(0.34, 0.18, 0.48, hairMat, 0.02, 0.51, 0.06, headGroup, 0, 0, 0.18);
    miiHairLock(0.28, 0.16, 0.46, hairMat, 0.28, 0.49, 0.06, headGroup, 0, 0, 0.22);
    // Slim vertical sideburns
    [-1, 1].forEach(dir => {
      miiHairLock(0.14, 0.44, 0.48, hairMat, dir * 0.42, 0.15, -0.01, headGroup, 0, 0, 0, 0.35);
    });
  } else if (cfg.hairStyle === 'mii_joey') {
    // JOEY (7/7): Jet-black 90s asymmetrical Curtain Hair (off-center part on left with long sweeping right curtain bang!)
    miiHairLock(0.94, 0.30, 0.88, hairMat, 0, 0.40, -0.02, headGroup);
    miiHairLock(0.90, 0.58, 0.24, hairMat, 0, 0.10, -0.33, headGroup, 0, 0, 0, 0.25);
    // Left curtain bang sweeping down to left temple
    miiHairLock(0.36, 0.18, 0.20, hairMat, -0.28, 0.30, 0.34, headGroup, 0, 0, 0.42);
    // Long diagonal right curtain bang sweeping from off-center part (-0.08, 0.38) across to right temple (+0.38, 0.16)!
    miiHairLock(0.56, 0.20, 0.20, hairMat, 0.16, 0.29, 0.35, headGroup, 0, 0, -0.38);
    // Rounded fuller side hair + short sideburns at ears
    [-1, 1].forEach(dir => {
      miiHairLock(0.18, 0.46, 0.54, hairMat, dir * 0.43, 0.16, -0.01, headGroup, 0, 0, dir * -0.08, 0.35);
    });
  } else {
    // Gunther's Bleached-Blonde Spiky Hair
    miiHairLock(0.92, 0.28, 0.88, hairMat, 0, 0.39, -0.01, headGroup);
    miiHairLock(0.90, 0.65, 0.24, hairMat, 0, 0.08, -0.33, headGroup, 0, 0, 0, 0.2);
    [-1, 1].forEach(dir => {
      miiHairLock(0.16, 0.38, 0.52, hairMat, dir * 0.41, 0.16, -0.02, headGroup);
    });
    if (cfg.hairStyle === 'spiky') {
      miiHairLock(0.78, 0.20, 0.68, hairMat, 0, 0.50, 0.04, headGroup);
    }
  }

  // Balanced Soft-Edged Torso (Clean shoulders that work seamlessly with both sweaters and open jackets!)
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 0.91, 0);
  root.add(torsoGroup);

  const torsoMat = mat(cfg.shirtColor, { variance: 10 });
  miiHairLock(0.74, 0.98, 0.46, torsoMat, 0, 0, 0, torsoGroup);
  if (cfg.tieColor) {
    voxBox(0.16, 0.60, 0.48, cfg.tieColor, 0, 0.01, 0.02, torsoGroup);
  }
  if (cfg.jacketColor) {
    miiHairLock(0.24, 0.98, 0.50, cfg.jacketColor, -0.26, 0, 0.01, torsoGroup);
    miiHairLock(0.24, 0.98, 0.50, cfg.jacketColor, 0.26, 0, 0.01, torsoGroup);
  }

  // Articulated Arms (Softly rounded rectangular arms attached flush to the shoulders!)
  const leftArm = new THREE.Group();
  leftArm.position.set(-0.50, 1.32, 0);
  miiHairLock(0.24, 0.74, 0.26, cfg.jacketColor || cfg.shirtColor, 0, -0.30, 0, leftArm);
  miiHairLock(0.20, 0.20, 0.22, skinMat, 0, -0.72, 0, leftArm);
  root.add(leftArm);

  const rightArm = new THREE.Group();
  rightArm.position.set(0.50, 1.32, 0);
  miiHairLock(0.24, 0.74, 0.26, cfg.jacketColor || cfg.shirtColor, 0, -0.30, 0, rightArm);
  miiHairLock(0.20, 0.20, 0.22, skinMat, 0, -0.72, 0, rightArm);
  if (cfg.hasMug) {
    voxCyl(0.15, 0.13, 0.25, 8, 0xf5b935, 0, -0.75, 0.22, rightArm);
    rightArm.rotation.x = -0.65;
    rightArm.userData.hasMug = true;
  }
  root.add(rightArm);

  // Articulated Left & Right Legs (Supports both Seated Pose & Walking Swing!)
  const pantsMat = mat(cfg.pantsColor, { variance: 12 });
  const shoeMat = mat(0x241914);

  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.22, 0.42, 0);
  voxBox(0.34, 0.72, 0.34, pantsMat, 0, -0.32, 0, leftLeg);
  voxBox(0.34, 0.2, 0.44, shoeMat, 0, -0.72, 0.05, leftLeg);
  root.add(leftLeg);

  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.22, 0.42, 0);
  voxBox(0.34, 0.72, 0.34, pantsMat, 0, -0.32, 0, rightLeg);
  voxBox(0.34, 0.2, 0.44, shoeMat, 0, -0.72, 0.05, rightLeg);
  root.add(rightLeg);

  if (cfg.seated) {
    leftLeg.rotation.x = -Math.PI / 2.2;
    rightLeg.rotation.x = -Math.PI / 2.2;
  }

  tagInteractive(root, { type: 'character', char: key });

  // DOM 3D Label, Speech Bubble & Crowd Reaction Emote
  const labelsLayer = document.getElementById('labels-layer');
  const bubblesLayer = document.getElementById('bubbles-layer');

  const labelEl = document.createElement('div');
  labelEl.className = 'char-3d-label';
  labelEl.innerHTML = `<span class="label-dot" style="background:${CHAR_META[key].color}"></span>${CHAR_META[key].name}<span class="label-state"></span>`;
  labelEl.addEventListener('click', (e) => {
    e.stopPropagation();
    focusCharacter(key);
  });
  labelsLayer.appendChild(labelEl);

  const emoteEl = document.createElement('div');
  emoteEl.className = 'crowd-emote';
  bubblesLayer.appendChild(emoteEl);

  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'voxel-bubble';
  bubbleEl.innerHTML = `
    <div class="vb-header">
      <span class="vb-speaker" style="background:${CHAR_META[key].color}">${CHAR_META[key].name}</span>
      <span class="vb-step"></span>
    </div>
    <div class="vb-text"></div>
    <div class="vb-trans"></div>
  `;
  bubbleEl.addEventListener('click', (e) => {
    e.stopPropagation();
    openDialogueCard(currentSceneQuote || linesFor(key)[0]);
  });
  bubblesLayer.appendChild(bubbleEl);

  charObjects[key] = {
    key,
    group: root,
    head: headGroup,
    torso: torsoGroup,
    faceMat,
    faceTextures,
    nextBlinkAt: performance.now() + 1200 + Math.random() * 3500,
    blinkUntil: 0,
    nextSipAt: performance.now() + 3500 + Math.random() * 8000,
    sipUntil: 0,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    cafePose: {
      pos: new THREE.Vector3(cfg.x, cfg.y, cfg.z),
      rotY: cfg.rotY || 0,
      seated: !!cfg.seated,
      visible: true
    },
    monicaPose: cfg.monicaPose ? {
      pos: new THREE.Vector3(cfg.monicaPose.x, cfg.monicaPose.y, cfg.monicaPose.z),
      rotY: cfg.monicaPose.rotY || 0,
      seated: !!cfg.monicaPose.seated,
      visible: cfg.monicaPose.visible !== false
    } : {
      pos: new THREE.Vector3(cfg.x, cfg.y, cfg.z),
      rotY: cfg.rotY || 0,
      seated: !!cfg.seated,
      visible: false
    },
    homePos: new THREE.Vector3(cfg.x, cfg.y, cfg.z),
    homeRotY: cfg.rotY || 0,
    homeSeated: !!cfg.seated,
    baseY: cfg.y,
    isSeated: !!cfg.seated,
    isTalking: false,
    walkState: null, // { targetPos, targetRotY, onArrive, returnDelay, stateLabel }
    labelEl,
    emoteEl,
    bubbleEl
  };
}

function buildAllCharacters() {
  createVoxelCharacter('rachel', {
    x: -2.35, y: 1.38, z: 2.45, rotY: 0.18,
    seated: true, hasMug: true,
    monicaPose: { x: 22.4, y: 1.28, z: -0.5, rotY: -1.57, seated: true, visible: true },
    hairColor: 0xac762c, hairInnerColor: 0x7c5018, hairStyle: 'mii_rachel',
    shirtColor: 0x26282a, pantsColor: 0x2b3648
  });

  createVoxelCharacter('monica', {
    x: -0.5, y: 1.38, z: 2.45, rotY: 0.0,
    seated: true,
    monicaPose: { x: 18.35, y: 1.32, z: 0.45, rotY: 1.57, seated: true, visible: true },
    hairColor: 0x18181c, hairInnerColor: 0x101014, hairStyle: 'mii_monica',
    shirtColor: 0x242628, pantsColor: 0x2e4a70
  });

  createVoxelCharacter('chandler', {
    x: 1.35, y: 1.38, z: 2.45, rotY: -0.2,
    seated: true,
    monicaPose: { x: -26.0, y: 1.32, z: -0.5, rotY: 0.32, seated: true, visible: true },
    hairColor: 0x422614, hairStyle: 'mii_chandler',
    shirtColor: 0x523b1e, pantsColor: 0x4a4238
  });

  createVoxelCharacter('ross', {
    x: 4.85, y: 1.32, z: 5.65, rotY: -0.82,
    seated: true,
    monicaPose: { x: 26.3, y: 1.72, z: -7.2, rotY: -0.52, seated: true, visible: true },
    hairColor: 0x161618, hairStyle: 'mii_ross',
    shirtColor: 0x523b1e, pantsColor: 0x2f2924
  });

  createVoxelCharacter('joey', {
    x: -6.35, y: 1.28, z: 4.75, rotY: 1.18,
    seated: true,
    monicaPose: { x: -22.3, y: 1.32, z: 1.8, rotY: 0.32, seated: true, visible: true },
    hairColor: 0x18181a, hairStyle: 'mii_joey',
    shirtColor: 0xd63629, pantsColor: 0x354f78
  });

  createVoxelCharacter('phoebe', {
    x: 11.8, y: 1.72, z: 1.55, rotY: -1.68,
    seated: true,
    monicaPose: { x: 18.35, y: 1.32, z: 3.0, rotY: 1.57, seated: true, visible: true },
    hairColor: 0xebd282, hairInnerColor: 0xc4a654, hairStyle: 'mii_phoebe',
    shirtColor: 0x7e38b8, pantsColor: 0x4a286e
  });

  createVoxelCharacter('gunther', {
    x: -11.4, y: 1.05, z: -2.8, rotY: 1.35,
    seated: false,
    monicaPose: { x: -11.4, y: 1.05, z: -2.8, rotY: 1.35, seated: false, visible: false },
    hairColor: 0xfff394, hairStyle: 'spiky',
    shirtColor: 0x386648, tieColor: 0xd9453b, pantsColor: 0x26221e
  });
}

// ==================== 3D SPINNING DIORAMA SCENE SWITCHER (Central Perk <-> Monica's Apartment 20) ====================
function switchDioramaScene() {
  if (spinTransition) return; // Prevent double-trigger while spinning
  SoundEngine.playSFX('door');
  const nextLoc = currentLocation === 'cafe' ? 'monica' : 'cafe';
  spinTransition = {
    startTime: performance.now(),
    duration: 1150,
    targetLocation: nextLoc,
    swapped: false
  };
  const destTitle = nextLoc === 'monica' ? "🚪 正在旋转微缩孤岛 · 前往 Monica 的紫门公寓 (Apt 20)..." : "☕ 正在旋转微缩孤岛 · 返回 Central Perk 咖啡馆...";
  flash(destTitle);
}

function applyLocationState(loc) {
  currentLocation = loc;
  const isMonica = (loc === 'monica');

  if (cafeDioramaGroup) cafeDioramaGroup.visible = !isMonica;
  if (monicaDioramaGroup) monicaDioramaGroup.visible = isMonica;

  // Toggle cafe-only steam particles
  steamParticles.forEach(sp => {
    sp.mesh.visible = !isMonica;
  });

  // Reposition all characters to their scene-specific seats & poses
  Object.values(charObjects).forEach(co => {
    const pose = isMonica ? co.monicaPose : co.cafePose;
    co.walkState = null;
    co.homePos.copy(pose.pos);
    co.homeRotY = pose.rotY;
    co.homeSeated = pose.seated;
    co.baseY = pose.pos.y;
    co.isSeated = pose.seated;
    co.group.position.copy(pose.pos);
    co.group.rotation.y = pose.rotY;
    co.group.visible = pose.visible;
    co.leftLeg.rotation.x = co.isSeated ? -Math.PI / 2.2 : 0;
    co.rightLeg.rotation.x = co.isSeated ? -Math.PI / 2.2 : 0;
    const stateSpan = co.labelEl.querySelector('.label-state');
    if (stateSpan) stateSpan.textContent = '';
    if (!pose.visible) {
      co.labelEl.style.display = 'none';
      co.emoteEl.classList.remove('active');
      co.bubbleEl.classList.remove('active');
    }
  });

  // Update Top-Left Brand Badge & Switch Button
  const brandTitle = document.getElementById('brand-title');
  const brandSub = document.getElementById('brand-sub');
  const brandDot = document.getElementById('brand-dot');
  const switchBtn = document.getElementById('scene-switch-btn');
  const switchIcon = document.getElementById('scene-switch-icon');
  const switchText = document.getElementById('scene-switch-text');

  if (brandTitle) brandTitle.textContent = isMonica ? "4TH FLOOR APTS" : "CENTRAL PERK";
  if (brandSub) brandSub.textContent = isMonica ? "APT 19 & 20 · NYC" : "ISOMETRIC VOXEL";
  if (brandDot) brandDot.style.background = isMonica ? "#9b72cf" : "#2d6a4f";
  if (switchBtn) switchBtn.classList.toggle('to-cafe', isMonica);
  if (switchIcon) switchIcon.textContent = isMonica ? "☕" : "🏢";
  if (switchText) switchText.textContent = isMonica ? "回 Central Perk" : "去 4楼双公寓";

  // Update Topic Bar Label
  const topicLabel = document.getElementById('topic-bar-label') || document.querySelector('.topic-bar-label');
  if (topicLabel) topicLabel.textContent = isMonica ? "🎬 4楼双公寓小剧场:" : "🎬 咖啡馆小剧场:";

  // Update Camera Preset Button Labels
  const camBtnIsland = document.querySelector('.cam-btn[data-cam="island"]');
  const camBtnOverview = document.querySelector('.cam-btn[data-cam="overview"]');
  const camBtnCouch = document.querySelector('.cam-btn[data-cam="couch"]');
  const camBtnBar = document.querySelector('.cam-btn[data-cam="bar"]');
  const camBtnStage = document.querySelector('.cam-btn[data-cam="stage"]');
  if (camBtnIsland) camBtnIsland.textContent = isMonica ? "🏢 4楼全景" : "🏝️ 远观微缩岛";
  if (camBtnOverview) camBtnOverview.textContent = isMonica ? "🚪 双公寓俯瞰" : "☕ 咖啡馆中景";
  if (camBtnCouch) camBtnCouch.textContent = isMonica ? "🐥 Joey家 (躺椅/独木舟/桌上足球)" : "🛋️ 橘色沙发六人组";
  if (camBtnBar) camBtnBar.textContent = isMonica ? "🚪 Monica家 (紫门/厨房/大飘窗)" : "☕ 吧台特写";
  if (camBtnStage) camBtnStage.textContent = isMonica ? "🍰 4楼过道 (芝士蛋糕/对门)" : "🎸 演出角特写";

  // Hide or show Gunther in the character bar (Gunther works at Central Perk, not the 4th floor!)
  const guntherPill = document.querySelector('.char-pill[data-char="gunther"]');
  if (guntherPill) guntherPill.style.display = isMonica ? 'none' : '';

  // Update Scenario Director Chips for the active location
  const chipsContainer = document.querySelector('.director-chips');
  if (chipsContainer) {
    const chips = isMonica
      ? [
          { scenario: 'foosball', label: '⚽ Joey & Chandler 桌上足球' },
          { scenario: 'cheesecake', label: '🍰 过道偷吃芝士蛋糕' },
          { scenario: 'canoe', label: '🛶 客厅独木舟' },
          { scenario: 'turkey', label: '🦃 Monica 火鸡头舞' },
          { scenario: 'trivia', label: '🏆 公寓抢房竞猜' },
          { scenario: 'ugly_naked', label: '🔭 窗前围观裸男' },
          { scenario: 'clean', label: '🧹 Monica 洁癖大扫除' }
        ]
      : [
          { scenario: 'break', label: '💔 争论“冷静期”' },
          { scenario: 'smellycat', label: '🎸 Phoebe 唱臭臭猫' },
          { scenario: 'food', label: '🍰 Joey 吧台盯蛋糕' },
          { scenario: 'coffee_run', label: '☕ Rachel 吧台端咖啡' },
          { scenario: 'pivot', label: '🛋️ PIVOT 搬沙发' },
          { scenario: 'lobster', label: '🦞 龙虾灵魂伴侣' }
        ];
    chipsContainer.innerHTML = chips.map(c =>
      `<button class="topic-chip" data-scenario="${c.scenario}">${c.label}</button>`
    ).join('');
    chipsContainer.querySelectorAll('.topic-chip').forEach(chip => {
      chip.addEventListener('click', () => triggerScenario(chip.dataset.scenario));
    });
  }

  // Smoothly set camera to island view of the newly active diorama
  setCameraPreset('island');
}

// ==================== CHARACTER WALKING & AUTONOMOUS ROUTINES (Feature #2) ====================
function sendCharacterWalk(charKey, destX, destY, destZ, destRotY, stateText, holdMs = 5500, onReach = null, actionType = '', returnPos = null) {
  const co = charObjects[charKey];
  if (!co) return;
  co.isSeated = false;
  const stateSpan = co.labelEl.querySelector('.label-state');
  if (stateSpan) stateSpan.textContent = `· ${stateText}`;

  co.walkState = {
    phase: 'to_target',
    targetPos: new THREE.Vector3(destX, destY, destZ),
    targetRotY: destRotY,
    onReach,
    holdUntil: 0,
    holdMs,
    actionType,
    returnPos: returnPos ? new THREE.Vector3(returnPos.x, returnPos.y, returnPos.z) : null
  };
}

function triggerCrowdEmotes(emoteMap = {}) {
  Object.values(charObjects).forEach(co => {
    co.emoteEl.classList.remove('active');
    clearTimeout(co._emoteTimer);
    const sym = emoteMap[co.key];
    if (sym && !co.isTalking && co.group.visible) {
      co.emoteEl.textContent = sym;
      co._emoteTimer = setTimeout(() => {
        co.emoteEl.classList.add('active');
        setTimeout(() => co.emoteEl.classList.remove('active'), 2800);
      }, 350);
    }
  });
}

// ==================== SCENARIO PROP BUILDERS & HELPERS ====================
function createTurkeyHeadMesh() {
  const turkeyGroup = new THREE.Group();
  turkeyGroup.name = 'turkeyHeadProp';
  turkeyGroup.position.set(0, 0.45, 0); // Fits atop Monica's Mii head!

  const turkeyMat = mat(0xc97d3a, { roughness: 0.75 });
  const drumstickMat = mat(0xa85e26, { roughness: 0.75 });
  const boneMat = mat(0xfdfaf0, { roughness: 0.6 });
  const glassesYellowMat = mat(0xf9d71c, { roughness: 0.3 });
  const darkLensMat = mat(0x18181a, { roughness: 0.1 });
  const fezMat = mat(0xb31b1b, { roughness: 0.8 });

  // Plump roasted turkey body
  voxBox(1.08, 0.95, 1.02, turkeyMat, 0, 0.15, 0, turkeyGroup);
  voxBox(0.25, 0.65, 0.75, drumstickMat, -0.60, 0.1, 0, turkeyGroup);
  voxBox(0.25, 0.65, 0.75, drumstickMat, 0.60, 0.1, 0, turkeyGroup);

  // Two drumsticks pointing up and forward
  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.55, 0.45, -0.15);
  leftLeg.rotation.z = -0.4;
  leftLeg.rotation.x = -0.3;
  voxBox(0.32, 0.65, 0.32, drumstickMat, 0, 0.25, 0, leftLeg);
  voxBox(0.16, 0.35, 0.16, boneMat, 0, 0.65, 0, leftLeg);
  turkeyGroup.add(leftLeg);

  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.55, 0.45, -0.15);
  rightLeg.rotation.z = 0.4;
  rightLeg.rotation.x = -0.3;
  voxBox(0.32, 0.65, 0.32, drumstickMat, 0, 0.25, 0, rightLeg);
  voxBox(0.16, 0.35, 0.16, boneMat, 0, 0.65, 0, rightLeg);
  turkeyGroup.add(rightLeg);

  // Iconic oversized yellow sunglasses!
  const glassesGroup = new THREE.Group();
  glassesGroup.position.set(0, 0.12, 0.54);
  voxBox(0.96, 0.42, 0.10, glassesYellowMat, 0, 0, 0, glassesGroup);
  voxBox(0.36, 0.30, 0.12, darkLensMat, -0.25, 0, 0.01, glassesGroup);
  voxBox(0.36, 0.30, 0.12, darkLensMat, 0.25, 0, 0.01, glassesGroup);
  turkeyGroup.add(glassesGroup);

  // Red fez hat with yellow tassel
  voxCyl(0.22, 0.18, 0.35, 10, fezMat, 0, 0.78, 0, turkeyGroup);
  voxBox(0.06, 0.18, 0.06, glassesYellowMat, 0.08, 0.74, 0.12, turkeyGroup);

  return turkeyGroup;
}

function createVoxelFork() {
  const fork = new THREE.Group();
  fork.name = 'silverForkProp';
  const silverMat = mat(0xe8ebed, { metalness: 0.85, roughness: 0.2 });
  voxBox(0.06, 0.45, 0.06, silverMat, 0, -0.15, 0, fork);
  voxBox(0.14, 0.08, 0.06, silverMat, 0, 0.1, 0, fork);
  voxBox(0.04, 0.18, 0.04, silverMat, -0.05, 0.22, 0, fork);
  voxBox(0.04, 0.18, 0.04, silverMat, 0, 0.22, 0, fork);
  voxBox(0.04, 0.18, 0.04, silverMat, 0.05, 0.22, 0, fork);
  return fork;
}

function createCleaningSponge() {
  const sponge = new THREE.Group();
  sponge.name = 'cleaningSpongeProp';
  const yellowMat = mat(0xffd166, { roughness: 0.9 });
  const greenScrubMat = mat(0x06d6a0, { roughness: 0.8 });
  voxBox(0.24, 0.12, 0.36, yellowMat, 0, 0, 0, sponge);
  voxBox(0.24, 0.04, 0.36, greenScrubMat, 0, 0.08, 0, sponge);
  return sponge;
}

function attachScenarioProp(parentGroup, propMesh) {
  if (!parentGroup) return;
  const existing = parentGroup.getObjectByName(propMesh.name);
  if (existing) parentGroup.remove(existing);
  parentGroup.add(propMesh);
}

function removeScenarioProp(parentGroup, propName) {
  if (!parentGroup) return;
  const existing = parentGroup.getObjectByName(propName);
  if (existing) parentGroup.remove(existing);
}

// ==================== SCENARIO & TOPIC DIRECTOR (Feature #4) ====================
function triggerScenario(scenarioKey) {
  if (scenarioKey === 'smellycat') {
    SoundEngine.playSmellyCatSong();
  } else {
    SoundEngine.playSFX('sitcom_laugh');
  }
  if (scenarioKey === 'break') {
    const q = allLines.find(l => l.id === 1) || FALLBACK_LINES[0];
    playConversationScene(q);
    triggerCrowdEmotes({ rachel: "💢", chandler: "😬", monica: "🙄", joey: "👀" });
    flash('💔 触发名场面：Ross 与 Rachel 争论 "We were on a break!"');
  } else if (scenarioKey === 'smellycat') {
    const q = allLines.find(l => l.id === 4) || FALLBACK_LINES[3];
    if (currentLocation === 'cafe') {
      sendCharacterWalk('phoebe', 7.9, 1.52, 1.15, -2.1, '🎸 舞台弹唱中', 7500, () => {
        spawnMusicNotes(charObjects.phoebe.group.position);
        triggerCrowdEmotes({ rachel: "🎵", monica: "👏", joey: "🎶", chandler: "😺", ross: "👏" });
      });
    } else {
      spawnMusicNotes(charObjects.phoebe.group.position);
      triggerCrowdEmotes({ rachel: "🎵", monica: "👏", joey: "🎶", chandler: "😺", ross: "👏" });
    }
    playConversationScene(q);
    flash('🎸 Phoebe 开始弹唱《Smelly Cat》！');
  } else if (scenarioKey === 'food') {
    const q = allLines.find(l => l.id === 8) || FALLBACK_LINES[7];
    if (currentLocation === 'cafe') {
      sendCharacterWalk('joey', -8.2, 1.08, 1.8, -2.5, '🍰 盯着吧台零食与蛋糕', 7000, () => {
        triggerCrowdEmotes({ gunther: "😳", rachel: "😂", monica: "🤦‍♀️", chandler: "🍟" });
      });
    } else {
      camTargetPos = new THREE.Vector3(18.0, 9.0, -1.0);
      camTargetLook = new THREE.Vector3(16.0, 2.0, -7.5);
      sendCharacterWalk('joey', 16.0, 1.05, -7.5, 3.14, '🍗 打开 Monica 的冰箱找吃的', 7500, () => {
        triggerCrowdEmotes({ monica: "😱", chandler: "😂", rachel: "🍕", ross: "👀" });
      }, 'food');
    }
    playConversationScene(q);
    flash('🍰 Joey 寻找美食："Joey doesn\'t share food!"');
  } else if (scenarioKey === 'coffee_run') {
    if (currentLocation === 'monica') {
      switchDioramaScene();
      return;
    }
    sendCharacterWalk('rachel', -7.6, 1.08, -1.5, -1.5, '☕ 找 Gunther 端咖啡', 6800, () => {
      boostCoffeeSteam();
      triggerCrowdEmotes({ gunther: "😍", ross: "👀", monica: "☕", phoebe: "✨" });
    });
    const coffeeScene = {
      id: 98, season: 3, episode: 12, timestamp: "00:05:18", character: "Gunther",
      text: "Here's your fresh hazelnut latte, Rachel. On the house.",
      translation: "瑞秋，这是刚做好的榛果拿铁，算我请你的。",
      emotes: { gunther: "😍", rachel: "☕", joey: "🙋‍♂️", chandler: "😏" },
      context_before: ["Rachel: Hey Gunther, can I grab a fresh pot for the table?", "Gunther: I already brewed your favorite blend."],
      context_after: ["Joey: Hey Gunther, is my muffin on the house too?", "Gunther: Five dollars, Joey."]
    };
    playConversationScene(coffeeScene);
    flash('☕ Rachel 起身穿过宽敞过道走向吧台找 Gunther 端咖啡！');
  } else if (scenarioKey === 'pivot') {
    const q = allLines.find(l => l.id === 3) || FALLBACK_LINES[2];
    playConversationScene(q);
    triggerCrowdEmotes({ chandler: "💢", rachel: "😂", joey: "💪", monica: "😮" });
    flash('🛋️ Ross 激动指挥搬沙发："PIVOT! PIVOT! PIVOT!"');
  } else if (scenarioKey === 'lobster') {
    const q = allLines.find(l => l.id === 10) || FALLBACK_LINES[9];
    playConversationScene(q);
    triggerCrowdEmotes({ ross: "❤️", rachel: "🦞", monica: "🥰", joey: "❓" });
    flash('🦞 Phoebe 阐述著名的“龙虾灵魂伴侣理论”！');
  } else if (scenarioKey === 'foosball') {
    SoundEngine.playSFX('foosball');
    animatedFoosball.spinUntil = performance.now() + 8500;
    // Glide camera smoothly to Joey's Foosball table!
    camTargetPos = new THREE.Vector3(-11.0, 9.5, 9.5);
    camTargetLook = new THREE.Vector3(-11.0, 2.0, 2.6);
    sendCharacterWalk('joey', -13.3, 1.05, 2.6, 1.57, '⚽ 操控黄色球员猛烈进攻', 7800, () => {
      triggerCrowdEmotes({ joey: "⚽🔥", chandler: "😱", monica: "👀", rachel: "📣" });
    }, 'foosball');
    sendCharacterWalk('chandler', -8.7, 1.05, 2.6, -1.57, '⚽ 防守球门快速转杆', 7800, () => {
      triggerCrowdEmotes({ chandler: "🧤💥", joey: "💢", monica: "😆" });
    }, 'foosball');
    const foosballScene = {
      id: 205, season: 4, episode: 12, timestamp: "00:12:30", character: "Joey",
      text: "And the ball goes to the yellow guys! Joey shoots... GOOOAAAL!",
      translation: "球传到了黄色小人脚下！乔伊起脚射门……球进啦——！",
      emotes: { joey: "⚽🔥", chandler: "😫", monica: "😏", rachel: "🎉" },
      context_before: [
        "Chandler: No spinning the rods, Joey! That's against the rules!",
        "Joey: There are no rules when the Chick and the Duck are watching!"
      ],
      context_after: [
        "Chandler: Oh man, another goal?! I want a rematch!",
        "Monica: Step aside boys, let a real foosball champion show you how it's done!"
      ]
    };
    playConversationScene(foosballScene);
    flash('⚽ Joey & Chandler 在 19 号公寓桌上足球激烈对决："GOOOAAAL!"');
    setTimeout(() => {
      if (currentLocation === 'monica') setCameraPreset('island');
    }, 9500);
  } else if (scenarioKey === 'cheesecake') {
    SoundEngine.playSFX('cheesecake');
    animatedCheesecake.nibbleUntil = performance.now() + 12500;
    spawnSparkles(new THREE.Vector3(0, 0.6, 4.0), [0xffd15c, 0xffeb99, 0xc42735, 0xffffff], 20);

    // Automatically swing open doors #19 & #20!
    animatedDoors.forEach(d => {
      d.isOpen = true;
      d.targetAngle = d.openAngle;
    });

    // Camera eases to dramatic cinematic focus on the dropped floor cheesecake
    camTargetPos = new THREE.Vector3(0, 6.2, 9.6);
    camTargetLook = new THREE.Vector3(0, 0.45, 4.0);

    // Chandler & Rachel step out directly through their respective apartment doors into the corridor!
    if (charObjects.chandler) {
      charObjects.chandler.group.position.set(-3.2, 1.05, 5.9);
      charObjects.chandler.group.rotation.y = 0;
      charObjects.chandler.isSeated = false;
      sendCharacterWalk('chandler', -0.95, 0.45, 4.2, 1.57, '🍰 蹲在走廊地板上偷吃蛋糕', 9800, () => {
        attachScenarioProp(charObjects.chandler.rightArm, createVoxelFork());
        triggerCrowdEmotes({ chandler: "😋🍰", rachel: "🍴" });
      }, 'cheesecake', { x: -3.2, y: 1.05, z: 5.9 });
    }

    if (charObjects.rachel) {
      charObjects.rachel.group.position.set(3.2, 1.05, 5.9);
      charObjects.rachel.group.rotation.y = 0;
      charObjects.rachel.isSeated = false;
      sendCharacterWalk('rachel', 0.95, 0.45, 4.2, -1.57, '🍰 拿出小叉子加入分食', 9800, () => {
        attachScenarioProp(charObjects.rachel.rightArm, createVoxelFork());
        triggerCrowdEmotes({ rachel: "🤤", chandler: "🤤" });
      }, 'cheesecake', { x: 3.2, y: 1.05, z: 5.9 });
    }

    // Joey's iconic surprise entrance 2.6 seconds later from door #19!
    setTimeout(() => {
      if (charObjects.joey && currentLocation === 'monica') {
        charObjects.joey.group.position.set(-3.2, 1.05, 5.9);
        charObjects.joey.group.rotation.y = 0;
        charObjects.joey.isSeated = false;
        SoundEngine.playSFX('door');
        sendCharacterWalk('joey', -1.75, 0.55, 4.0, 1.15, '🍴 走出门看到地板蛋糕', 7200, () => {
          triggerCrowdEmotes({ joey: "😳", chandler: "🍰", rachel: "🍰" });
          setTimeout(() => {
            SoundEngine.playSFX('cheesecake');
            attachScenarioProp(charObjects.joey.rightArm, createVoxelFork());
            triggerCrowdEmotes({ joey: "🍴😎", chandler: "😳", rachel: "😂" });
            flash('🍴 Joey 掏出西装内袋叉子："Alright, what are we having?"');
          }, 1100);
        }, 'cheesecake', { x: -3.2, y: 1.05, z: 5.9 });
      }
    }, 2600);

    const cheesecakeScene = {
      id: 206, season: 7, episode: 11, timestamp: "00:18:40", character: "Joey",
      text: "Alright, what are we having?",
      translation: "行吧，咱们今天吃的是什么好吃的？",
      emotes: { joey: "🍴😎", chandler: "🍰", rachel: "😂", monica: "😱" },
      context_before: [
        "Chandler: Rachel, look! Mama's Little Bakery cheesecake dropped on the hallway carpet!",
        "Rachel: We can't eat floor cheesecake... wait, which piece hasn't touched the dirt?!"
      ],
      context_after: [
        "Joey: *pulls out fork from coat pocket*",
        "Chandler: You carry a fork in your pocket?! Always prepared!"
      ]
    };
    playConversationScene(cheesecakeScene);
    flash('🍰 名场面：4楼过道掉落芝士蛋糕！Joey 从西装口袋掏出叉子："Alright, what are we having?"');

    // When routine completes, doors swing closed and camera returns smoothly!
    setTimeout(() => {
      if (currentLocation === 'monica') {
        animatedDoors.forEach(d => {
          d.isOpen = false;
          d.targetAngle = d.closeAngle;
        });
        SoundEngine.playSFX('door');
        setTimeout(() => {
          if (currentLocation === 'monica') setCameraPreset('island');
        }, 1200);
      }
    }, 12800);
  } else if (scenarioKey === 'canoe') {
    SoundEngine.playSFX('canoe');
    animatedCanoe.activeUntil = performance.now() + 8500;
    // Camera focuses on Joey's living room canoe
    camTargetPos = new THREE.Vector3(-17.6, 9.0, 13.5);
    camTargetLook = new THREE.Vector3(-17.6, 1.8, 6.9);
    sendCharacterWalk('joey', -19.4, 1.25, 6.9, 1.57, '🛶 坐在独木舟里划桨', 7800, () => {
      triggerCrowdEmotes({ joey: "🛶✨", chandler: "🤦‍♂️", monica: "😂" });
    }, 'canoe');
    sendCharacterWalk('chandler', -15.8, 1.25, 6.9, -1.57, '🛶 坐在独木舟另一头生无可恋', 7800, () => {
      triggerCrowdEmotes({ chandler: "😐", joey: "🚣‍♂️", rachel: "🤣" });
    }, 'canoe');
    const canoeScene = {
      id: 207, season: 4, episode: 2, timestamp: "00:14:05", character: "Chandler",
      text: "Our apartment got completely cleaned out... but hey, we have a canoe!",
      translation: "我们家被小偷彻底搬空了……但是瞧，我们有一艘独木舟！",
      emotes: { chandler: "😐", joey: "🛶", monica: "🤦‍♀️", rachel: "🤣", ross: "🦖" },
      context_before: [
        "Joey: The guy bet me I couldn't fit in the entertainment center, locked me in, and took everything!",
        "Chandler: You traded our stereo and TV for a wooden CANOE?!"
      ],
      context_after: [
        "Joey: Come on Chandler, grab an oar! Row with me!",
        "Chandler: Row to where, Joey?! To the kitchen?!"
      ]
    };
    playConversationScene(canoeScene);
    flash('🛶 名场面：客厅皮划艇！Joey & Chandler 坐在空荡客厅里的独木舟划桨！');
    setTimeout(() => {
      if (currentLocation === 'monica') setCameraPreset('island');
    }, 9500);
  } else if (scenarioKey === 'turkey') {
    // Attach giant voxel Turkey Head with sunglasses onto Monica's head!
    if (charObjects.monica) {
      attachScenarioProp(charObjects.monica.head, createTurkeyHeadMesh());
    }
    // Camera zooms smoothly to the purple door
    camTargetPos = new THREE.Vector3(6.5, 9.0, 12.0);
    camTargetLook = new THREE.Vector3(5.2, 2.0, 5.9);
    sendCharacterWalk('monica', 5.2, 1.05, 5.9, -1.57, '🦃 紫门前跳火鸡舞', 7800, () => {
      triggerCrowdEmotes({ chandler: "❤️", joey: "😱", rachel: "😂", phoebe: "👏" });
    }, 'turkey');
    const turkeyScene = {
      id: 201, season: 5, episode: 8, timestamp: "00:19:42", character: "Chandler",
      text: "You look so great with that turkey on your head... I love you.",
      translation: "你头上套着火鸡跳舞的样子太美了……我爱你。",
      emotes: { monica: "🦃", chandler: "❤️", joey: "😳", rachel: "🥰" },
      context_before: [
        "Monica: Look! I put the turkey on my head with sunglasses to cheer you up!",
        "Monica: Doing the turkey dance by the purple door!"
      ],
      context_after: [
        "Monica: Wait... what did you just say?!",
        "Joey: Did the turkey just wink at me?!"
      ]
    };
    playConversationScene(turkeyScene);
    flash('🦃 名场面：Monica 走到紫色大门前跳起火鸡舞，Chandler 脱口而出 "I love you!"');
    setTimeout(() => {
      if (currentLocation === 'monica') setCameraPreset('island');
    }, 9500);
  } else if (scenarioKey === 'trivia') {
    const triviaScene = {
      id: 202, season: 4, episode: 12, timestamp: "00:16:10", character: "Ross",
      text: "Lightning round! What is Chandler Bing's job?!",
      translation: "闪电抢答环节！钱德勒·宾的工作到底是什么？！",
      emotes: { rachel: "😱", monica: "😫", chandler: "😏", joey: "🏆", ross: "⚡" },
      context_before: [
        "Monica: I bet the apartment that we know you guys better than you know us!",
        "Ross: Ten seconds left on the clock!"
      ],
      context_after: [
        "Rachel: Oh! Oh! He's a... a transponster?!",
        "Monica: THAT'S NOT EVEN A WORD! NOOOO!"
      ]
    };
    playConversationScene(triviaScene);
    triggerCrowdEmotes({ rachel: "😱", monica: "😫", chandler: "😏", joey: "🏆", ross: "⚡" });
    flash('🏆 公寓归属权大竞猜："He\'s a transponster!" — "THAT\'S NOT EVEN A WORD!"');
  } else if (scenarioKey === 'ugly_naked') {
    camTargetPos = new THREE.Vector3(25.0, 8.5, -2.0);
    camTargetLook = new THREE.Vector3(26.7, 2.5, -7.8);
    sendCharacterWalk('joey', 26.7, 1.48, -7.8, 3.14, '🔭 趴在大飘窗往外看', 7800, () => {
      triggerCrowdEmotes({ rachel: "👀", monica: "😮", phoebe: "🫣", chandler: "🔭", ross: "😳" });
    }, 'ugly_naked');
    const windowScene = {
      id: 203, season: 3, episode: 8, timestamp: "00:08:25", character: "Phoebe",
      text: "Look out the big window! Ugly Naked Guy is decorating his Christmas tree!",
      translation: "快往大格子窗外看！丑裸男正在装饰他的圣诞树呢！",
      emotes: { phoebe: "🫣", joey: "🔭", rachel: "👀", monica: "😮", ross: "😳" },
      context_before: [
        "Joey: Hey guys, come over to the window alcove!",
        "Rachel: Wait, what is he doing across the street?"
      ],
      context_after: [
        "Chandler: My eyes! MY EYES!",
        "Monica: Okay, step away from the floral curtains!"
      ]
    };
    playConversationScene(windowScene);
    flash('🔭 老友们湊在黑色大格子落地窗前围观街对面：“MY EYES! MY EYES!”');
    setTimeout(() => {
      if (currentLocation === 'monica') setCameraPreset('island');
    }, 9500);
  } else if (scenarioKey === 'clean') {
    if (charObjects.monica) attachScenarioProp(charObjects.monica.rightArm, createCleaningSponge());
    camTargetPos = new THREE.Vector3(12.0, 9.0, 4.5);
    camTargetLook = new THREE.Vector3(10.3, 2.0, -1.8);
    sendCharacterWalk('monica', 10.3, 1.05, -1.8, -1.57, '🧹 检查蓝色橱柜与灶台卫生', 7800, () => {
      triggerCrowdEmotes({ monica: "✨", chandler: "🧹", rachel: "😅", joey: "🍪" });
    }, 'clean');
    const cleanScene = {
      id: 204, season: 7, episode: 5, timestamp: "00:04:15", character: "Monica",
      text: "Not just health-department clean... MONICA clean!",
      translation: "不只是卫生局标准的干净……而是莫妮卡级别的干净！",
      emotes: { monica: "🧼", chandler: "😅", rachel: "🧹", joey: "🍪", phoebe: "✨" },
      context_before: [
        "Chandler: Honey, I already wiped the kitchen counter and the round table.",
        "Monica: Did you use the coasters on the coffee table?"
      ],
      context_after: [
        "Joey: Hey Monica, can I eat this cookie over the sink?",
        "Monica: Over the sink with a plate under your chin!"
      ]
    };
    playConversationScene(cleanScene);
    flash('🧹 Monica 巡视开放式厨房：“Not just clean... MONICA clean!”');
    setTimeout(() => {
      if (currentLocation === 'monica') setCameraPreset('island');
    }, 9500);
  }
}

function handleCustomUserTopic(userInput) {
  const clean = userInput.trim();
  if (!clean) return;
  const ql = clean.toLowerCase();

  // Check if matches any existing Friends line
  const matched = allLines.find(l =>
    l.text.toLowerCase().includes(ql) ||
    (l.translation && l.translation.includes(ql)) ||
    (l.context_before || []).some(c => c.toLowerCase().includes(ql))
  );

  if (matched) {
    playConversationScene(matched);
    flash(`💬 老友们接上了你的话题："${clean}"`);
    return;
  }

  // Otherwise generate an interactive Central Perk group response to the user's message!
  const customScene = {
    id: 999, season: 10, episode: 18, timestamp: "LIVE", character: "Chandler",
    text: `Wait—did someone at our coffee table just bring up "${clean}"? Could that BE any more interesting?`,
    translation: `等等——刚才是谁在咖啡桌提到了“${clean}”？这也太有意思了吧！`,
    emotes: { rachel: "😮", monica: "✨", joey: "👍", phoebe: "🔮", ross: "🤓" },
    context_before: [
      `Rachel: Hey guys, listen to this topic: "${clean}"!`,
      `Monica: I KNOW! I was literally just thinking about that!`
    ],
    context_after: [
      `Phoebe: Oh, my grandma used to sing a song about "${clean}"!`,
      `Joey: As long as it comes with a sandwich, I'm in!`
    ]
  };
  playConversationScene(customScene);
  flash(`✨ 你向咖啡馆抛出了新话题："${clean}"，六人组热烈讨论中！`);
}

// ==================== MULTI-TURN CONVERSATION ENGINE ====================
let currentSceneQuote = null;
let activeSpeakerKey = null;
let conversationTimer = null;
let isDialogueModalOpen = false;
let sceneOrderIndex = 0;

function parseDialogueTurn(rawStr) {
  const idx = rawStr.indexOf(':');
  if (idx !== -1) {
    const rawName = rawStr.slice(0, idx).trim().toLowerCase();
    const text = rawStr.slice(idx + 1).trim();
    const charKey = CHAR_META[rawName] ? rawName : 'joey';
    return { charKey, speakerName: rawStr.slice(0, idx).trim(), text };
  }
  return { charKey: 'rachel', speakerName: 'Rachel', text: rawStr };
}

function buildConversationSteps(quoteItem) {
  const steps = [];
  (quoteItem.context_before || []).forEach(line => {
    steps.push({ ...parseDialogueTurn(line), isMain: false, quoteItem });
  });
  steps.push({
    charKey: quoteItem.character.toLowerCase(),
    speakerName: quoteItem.character,
    text: quoteItem.text,
    translation: quoteItem.translation || '',
    isMain: true,
    quoteItem
  });
  (quoteItem.context_after || []).forEach(line => {
    steps.push({ ...parseDialogueTurn(line), isMain: false, quoteItem });
  });
  return steps;
}

function playConversationScene(quoteItem) {
  if (!quoteItem) return;
  clearTimeout(conversationTimer);
  currentSceneQuote = quoteItem;
  const steps = buildConversationSteps(quoteItem);
  let stepIdx = 0;

  // Occasionally trigger autonomous character walking between scenes!
  if (currentLocation === 'cafe') {
    if (quoteItem.id === 4 && !charObjects.phoebe?.walkState) {
      sendCharacterWalk('phoebe', 7.9, 1.52, 1.15, -2.1, '🎸 舞台弹唱', 7000);
    } else if (quoteItem.id === 8 && !charObjects.joey?.walkState) {
      sendCharacterWalk('joey', -7.8, 1.08, -2.8, -1.4, '🍰 偷瞄蛋糕', 6500);
    }
  }

  function runStep() {
    if (isDialogueModalOpen) {
      conversationTimer = setTimeout(runStep, 1500);
      return;
    }
    const step = steps[stepIdx];
    showSpeakerBubble(step.charKey, step.text, step.isMain ? step.translation : '', `${stepIdx + 1}/${steps.length}`, quoteItem);

    if (step.isMain) {
      const defaultEmotes = { rachel: "☕", monica: "😄", chandler: "😏", joey: "👀", phoebe: "✨", ross: "🤔" };
      triggerCrowdEmotes(quoteItem.emotes || defaultEmotes);
    }

    if (step.charKey === 'phoebe') {
      spawnMusicNotes(charObjects.phoebe.group.position);
    }

    stepIdx++;
    if (stepIdx < steps.length) {
      conversationTimer = setTimeout(runStep, step.isMain ? 3600 : 2700);
    } else {
      conversationTimer = setTimeout(() => {
        sceneOrderIndex = (sceneOrderIndex + 1) % allLines.length;
        playConversationScene(allLines[sceneOrderIndex]);
      }, 3200);
    }
  }
  runStep();
}

function showSpeakerBubble(charKey, text, translation = '', stepLabel = '', quoteItem = null) {
  Object.values(charObjects).forEach(co => {
    co.isTalking = (co.key === charKey);
    co.bubbleEl.classList.remove('active');
  });

  activeSpeakerKey = charKey;
  const target = charObjects[charKey] || charObjects.rachel;
  if (!target) return;

  const textEl = target.bubbleEl.querySelector('.vb-text');
  const transEl = target.bubbleEl.querySelector('.vb-trans');
  const stepEl = target.bubbleEl.querySelector('.vb-step');
  if (textEl) textEl.textContent = `"${text}"`;
  if (transEl) {
    transEl.textContent = translation || '';
    transEl.style.display = translation ? 'block' : 'none';
  }
  if (stepEl) stepEl.textContent = quoteItem ? `S${quoteItem.season}E${String(quoteItem.episode).padStart(2,'0')} · ${stepLabel}` : stepLabel;
  target.bubbleEl.classList.add('active');

  const tickerSpeaker = document.getElementById('ticker-speaker');
  const tickerText = document.getElementById('ticker-text');
  if (tickerSpeaker && tickerText) {
    tickerSpeaker.textContent = CHAR_META[charKey]?.name || charKey;
    tickerSpeaker.style.background = CHAR_META[charKey]?.color || '#4A90D9';
    tickerText.textContent = `"${text}"`;
  }

  // Speak the English line in the character's voice!
  SoundEngine.speakLine(charKey, text);
}

// ==================== MUSICAL NOTES & STEAM BOOST ====================
function spawnMusicNotes(originPos) {
  const colors = [0xff6b9d, 0xffd15c, 0x5ebf8d, 0x6bc5ff];
  for (let i = 0; i < 6; i++) {
    const note = voxBox(0.2, 0.2, 0.2, colors[i % colors.length],
      originPos.x + (Math.random() - 0.5) * 1.4,
      originPos.y + 2.4 + i * 0.2,
      originPos.z + (Math.random() - 0.5) * 1.4,
      scene, false
    );
    noteParticles.push({ mesh: note, life: 1.0, vy: 0.025 + Math.random() * 0.015 });
  }
}

function spawnSparkles(originPos, colorHex = 0xffd15c, count = 8) {
  const sparkColors = Array.isArray(colorHex) ? colorHex : [colorHex, 0xfff0aa, 0xff9944, 0xffffff];
  for (let i = 0; i < count; i++) {
    const pMesh = voxBox(0.14, 0.14, 0.14, sparkColors[i % sparkColors.length],
      originPos.x + (Math.random() - 0.5) * 1.6,
      originPos.y + 0.3 + Math.random() * 0.7,
      originPos.z + (Math.random() - 0.5) * 1.6,
      scene, false
    );
    sparkleParticles.push({
      mesh: pMesh,
      life: 1.0,
      vy: 0.018 + Math.random() * 0.02,
      vx: (Math.random() - 0.5) * 0.015,
      vz: (Math.random() - 0.5) * 0.015,
      rotSpeed: (Math.random() - 0.5) * 0.2
    });
  }
}

function boostCoffeeSteam() {
  SoundEngine.playSFX('espresso');
  steamParticles.forEach(sp => {
    sp.mesh.scale.set(1.9, 1.9, 1.9);
    setTimeout(() => sp.mesh.scale.set(1, 1, 1), 900);
  });
  flash('☕ 热咖啡蒸汽升腾！Central Perk 暖意满满');
}

// ==================== CAMERA ZOOM & PRESETS (远观微缩岛 <-> 近看人物) ====================
function setCameraPreset(presetName) {
  const presets = currentLocation === 'monica' ? MONICA_CAM_PRESETS : CAM_PRESETS;
  const p = presets[presetName] || CAM_PRESETS[presetName];
  if (!p) return;
  camTargetPos = p.pos.clone();
  camTargetLook = p.look.clone();
  const slider = document.getElementById('zoom-slider');
  if (slider && p.slider) {
    slider.value = p.slider;
    updateZoomLabel(p.slider);
  }
  document.querySelectorAll('.cam-btn[data-cam]').forEach(b => {
    b.classList.toggle('active', b.dataset.cam === presetName);
  });
}

function applyZoomSliderValue(val) {
  // Interpolate smoothly along camera ray between Miniature Island (dist=98 for 4th floor / 52 for cafe) and Character Close-up (dist=9.2)
  const ratio = (val - 15) / 85; // 0 (far island) -> 1 (close character)
  const maxDist = currentLocation === 'monica' ? 145.0 : 52.0;
  const closeLook = currentLocation === 'monica'
    ? new THREE.Vector3(0.0, 2.0, 0.8)
    : new THREE.Vector3(-0.6, 2.1, 2.0);
  const targetLook = new THREE.Vector3().lerpVectors(
    new THREE.Vector3(0, 1.8, -0.5),
    closeLook,
    ratio
  );
  const dir = camera.position.clone().sub(controls.target).normalize();
  const dist = THREE.MathUtils.lerp(maxDist, 9.2, ratio);
  camTargetLook = targetLook;
  camTargetPos = targetLook.clone().add(dir.multiplyScalar(dist));
  updateZoomLabel(val);
}

function updateZoomLabel(val) {
  const lbl = document.getElementById('zoom-label');
  if (!lbl) return;
  if (val < 35) lbl.textContent = '微缩孤岛';
  else if (val < 68) lbl.textContent = currentLocation === 'monica' ? '公寓中景' : '咖啡馆中景';
  else lbl.textContent = '人物特写';
}

function focusCharacter(charKey) {
  const co = charObjects[charKey];
  if (!co) return;

  // Smoothly zoom camera in to look at this character!
  const charPos = co.group.position.clone();
  camTargetLook = charPos.clone().add(new THREE.Vector3(0, 1.4, 0));
  camTargetPos = charPos.clone().add(new THREE.Vector3(1.8, 4.8, 8.2));
  const slider = document.getElementById('zoom-slider');
  if (slider) {
    slider.value = 86;
    updateZoomLabel(86);
  }

  if (charKey === 'gunther') {
    triggerScenario('coffee_run');
    return;
  }

  const charLines = linesFor(charKey);
  if (charLines.length) {
    const picked = charLines[Math.floor(Math.random() * charLines.length)];
    playConversationScene(picked);
    openDialogueCard(picked);
  }
}

// ==================== INTERACTIVE DIALOGUE & WORD CARD ====================
function linesFor(char) {
  return allLines.filter(l => l.character.toLowerCase() === char.toLowerCase());
}

function tokenizeSentenceToClickableWords(sentence) {
  return sentence.split(/(\s+)/).map(token => {
    const clean = token.replace(/[^a-zA-Z']/g, '').toLowerCase();
    if (!clean) return token;
    return `<span class="clickable-word" data-word="${clean}">${token}</span>`;
  }).join('');
}

function openDialogueCard(quoteItem) {
  if (!quoteItem) return;
  currentSceneQuote = quoteItem;
  isDialogueModalOpen = true;

  const bigQuote = document.getElementById('big-quote');
  const bqChar = bigQuote.querySelector('.bq-char');
  const bqEp = document.getElementById('bq-ep');
  const bqBefore = document.getElementById('bq-context-before');
  const bqAfter = document.getElementById('bq-context-after');
  const bqText = document.getElementById('bq-text');
  const bqTrans = document.getElementById('bq-trans');
  const wlBox = document.getElementById('word-lookup-box');

  const charKey = quoteItem.character.toLowerCase();
  bqChar.style.background = CHAR_META[charKey]?.color || '#5C3D2E';
  bqChar.textContent = quoteItem.character;
  bqEp.textContent = `S${String(quoteItem.season).padStart(2,'0')}E${String(quoteItem.episode).padStart(2,'0')} · ${quoteItem.timestamp || '00:10:00'}`;

  bqBefore.innerHTML = (quoteItem.context_before || []).map(l => `<p>💬 ${l}</p>`).join('');
  bqAfter.innerHTML = (quoteItem.context_after || []).map(l => `<p>💬 ${l}</p>`).join('');

  bqText.innerHTML = `"${tokenizeSentenceToClickableWords(quoteItem.text)}"`;
  bqTrans.textContent = quoteItem.translation || '';
  wlBox.classList.add('hidden');

  bqText.querySelectorAll('.clickable-word').forEach(span => {
    span.addEventListener('click', (e) => {
      e.stopPropagation();
      bqText.querySelectorAll('.clickable-word').forEach(s => s.classList.remove('selected'));
      span.classList.add('selected');
      showWordDefinition(span.dataset.word);
    });
  });

  bigQuote.classList.remove('hidden');
  SoundEngine.speakLine(quoteItem.character, quoteItem.text, true);
}

function showWordDefinition(rawWord) {
  const w = rawWord.toLowerCase().replace(/^'+|'+$/g, '');
  const info = WORD_DICT[w] || {
    phonetic: `/${w}/`,
    meaning: `《老友记》口语常用词 · 点击右侧按钮收藏至生词本`
  };
  const wlBox = document.getElementById('word-lookup-box');
  document.getElementById('wl-word').textContent = w;
  document.getElementById('wl-phonetic').textContent = info.phonetic;
  document.getElementById('wl-meaning').textContent = info.meaning;
  document.getElementById('wl-add-btn').onclick = () => addWord(w);
  const speakBtn = document.getElementById('wl-speak-btn');
  if (speakBtn) speakBtn.onclick = () => SoundEngine.speakWord(w);
  wlBox.classList.remove('hidden');
  SoundEngine.speakWord(w);
}

function closeDialogueCard() {
  document.getElementById('big-quote').classList.add('hidden');
  isDialogueModalOpen = false;
}

// ==================== CINEMATIC TYNDALL DUST MOTES ====================
function createCinematicDustMotes() {
  const count = 110;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const initialY = new Float32Array(count);
  const speeds = new Float32Array(count);
  const driftPhases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = 0.6 + Math.random() * 7.4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    initialY[i] = positions[i * 3 + 1];
    speeds[i] = 0.12 + Math.random() * 0.22;
    driftPhases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const c = document.createElement('canvas');
  c.width = 32;
  c.height = 32;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255, 245, 215, 0.95)');
  g.addColorStop(0.35, 'rgba(255, 215, 155, 0.55)');
  g.addColorStop(1, 'rgba(255, 190, 110, 0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  const tex = new THREE.CanvasTexture(c);

  const pointsMat = new THREE.PointsMaterial({
    size: 0.42,
    map: tex,
    transparent: true,
    opacity: 0.58,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  dustParticles = new THREE.Points(geometry, pointsMat);
  dustParticles.userData = { initialY, speeds, driftPhases, count };
  (stageSpinGroup || scene).add(dustParticles);
}

// ==================== THREE.JS INITIALIZATION & RENDER LOOP ====================
function initThreeScene() {
  const canvas = document.getElementById('voxel-canvas');
  scene = new THREE.Scene();

  // Narrow-FOV Isometric-like Perspective (26 deg) gives that crisp Miniature Island look when zoomed out,
  // while still allowing smooth 3D close-up zooming right into the characters!
  camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 380);
  camera.position.copy(CAM_PRESETS.island.pos);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.copy(CAM_PRESETS.island.look);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.minDistance = 6.5;
  controls.maxDistance = 220;

  renderer.domElement.addEventListener('pointerdown', () => {
    camTargetPos = null;
    camTargetLook = null;
  });

  // Sync zoom slider when user uses mouse wheel
  renderer.domElement.addEventListener('wheel', () => {
    camTargetPos = null;
    camTargetLook = null;
    const maxDist = currentLocation === 'monica' ? 145.0 : 52.0;
    const dist = camera.position.distanceTo(controls.target);
    const val = Math.round(THREE.MathUtils.clamp(((maxDist - dist) / (maxDist - 9.2)) * 85 + 15, 15, 100));
    const slider = document.getElementById('zoom-slider');
    if (slider) {
      slider.value = val;
      updateZoomLabel(val);
    }
  });

  const ambientLight = new THREE.AmbientLight(0xfff5e8, 0.82);
  ambientLight.name = 'ambientLight';
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xfff0d6, 0.92);
  dirLight.name = 'dirLight';
  dirLight.position.set(18, 34, 24);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 4096;
  dirLight.shadow.mapSize.height = 4096;
  dirLight.shadow.camera.near = 2;
  dirLight.shadow.camera.far = 120;
  dirLight.shadow.bias = -0.0001;
  dirLight.shadow.normalBias = 0.04;
  const d = 42;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  scene.add(dirLight);

  // Cinematic Soft Rim / Back Light (勾勒角色与模型精致体素金边)
  const rimLight = new THREE.DirectionalLight(0xffeedd, 0.42);
  rimLight.name = 'rimLight';
  rimLight.position.set(-18, 16, -14);
  scene.add(rimLight);

  const centerGlow = new THREE.PointLight(0xff9f45, 0.72, 22);
  centerGlow.position.set(-1.0, 7.5, 2.0);
  scene.add(centerGlow);
  warmPointLights.push(centerGlow);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Master Spin Stage Group holds both Dioramas + Characters so the entire Miniature Island spins together!
  stageSpinGroup = new THREE.Group();
  scene.add(stageSpinGroup);

  cafeDioramaGroup = new THREE.Group();
  monicaDioramaGroup = new THREE.Group();
  monicaDioramaGroup.visible = false;
  stageSpinGroup.add(cafeDioramaGroup);
  stageSpinGroup.add(monicaDioramaGroup);

  try {
    buildCafeDiorama();
  } catch (err) {
    console.error('buildCafeDiorama error:', err);
  }

  try {
    buildMonicaApartmentDiorama();
  } catch (err) {
    console.error('buildMonicaApartmentDiorama error:', err);
  }

  try {
    buildAllCharacters();
  } catch (err) {
    console.error('buildAllCharacters error:', err);
  }

  try {
    createCinematicDustMotes();
  } catch (err) {
    console.error('createCinematicDustMotes error:', err);
  }

  try {
    applyLocationState('cafe');
  } catch (err) {
    console.error('applyLocationState error:', err);
  }

  try {
    setup3DInteractions();
  } catch (err) {
    console.error('setup3DInteractions error:', err);
  }

  window.addEventListener('resize', onWindowResize);
  requestAnimationFrame(animate);
}

function isObjectVisibleInHierarchy(obj) {
  let cur = obj;
  while (cur) {
    if (!cur.visible) return false;
    cur = cur.parent;
  }
  return true;
}

function setup3DInteractions() {
  const canvas = document.getElementById('voxel-canvas');
  let downX = 0, downY = 0;

  canvas.addEventListener('pointermove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactiveMeshes, false).filter(h => isObjectVisibleInHierarchy(h.object));
    canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
  });

  canvas.addEventListener('pointerdown', e => {
    downX = e.clientX;
    downY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('pointerup', e => {
    canvas.style.cursor = 'grab';
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactiveMeshes, false).filter(h => isObjectVisibleInHierarchy(h.object));
    if (hits.length > 0) {
      const data = hits[0].object.userData;
      if (data.type === 'character') {
        SoundEngine.playSFX('pop');
        focusCharacter(data.char);
      } else if (data.type === 'animated_door' && data.door) {
        data.door.toggle();
      } else if (data.type === 'barcalounger') {
        if (data.recliner) {
          data.recliner.toggle();
        } else {
          SoundEngine.playSFX('pop');
          triggerCrowdEmotes({ joey: '🛋️😍', chandler: '🛋️✨' });
          flash(data.message || '🛋️ Joey & Chandler 的灵魂皮躺椅 Barcaloungers！');
        }
      } else if (data.type === 'coffee') {
        boostCoffeeSteam();
      } else if (data.type === 'guitar') {
        triggerScenario('smellycat');
      } else if (data.type === 'foosball') {
        SoundEngine.playSFX('foosball');
        animatedFoosball.spinUntil = performance.now() + 5500;
        triggerScenario('foosball');
      } else if (data.type === 'cheesecake') {
        SoundEngine.playSFX('cheesecake');
        animatedCheesecake.nibbleUntil = performance.now() + 12500;
        spawnSparkles(new THREE.Vector3(0, 0.6, 4.0), [0xffd15c, 0xffeb99, 0xc42735, 0xffffff], 18);
        triggerScenario('cheesecake');
      } else if (data.type === 'canoe') {
        SoundEngine.playSFX('canoe');
        animatedCanoe.activeUntil = performance.now() + 6500;
        triggerScenario('canoe');
      } else if (data.type === 'pat_the_dog') {
        SoundEngine.playSFX('bark');
        triggerCrowdEmotes({ joey: '🐶❤️', chandler: '🙄' });
        flash(data.message || '🐶 Pat the Dog 白狗雕像！Joey 巨星时期的心爱收藏！');
      } else if (data.type === 'duck' || data.type === 'chick_duck') {
        SoundEngine.playSFX('duck');
        animatedPets.quackUntil = performance.now() + 4500;
        triggerCrowdEmotes({ joey: '🐥❤️', chandler: '🦆✨' });
        flash(data.message || '🐥 Chandler 的小黄鸭与小鸡！"Who\'s a good boy? Quack quack!"');
      } else if (data.type === 'bathroom') {
        SoundEngine.playSFX('pop');
        triggerCrowdEmotes({ chandler: '🛁🐥', monica: '🧼' });
        flash(data.message || '🛁 Monica 的卫生间 · 发现钱德勒最爱泡澡的小黄鸭！🐥');
      } else if (data.type === 'taxi') {
        SoundEngine.playSFX('cab_horn');
        if (animatedYellowCab) {
          animatedYellowCab.boostUntil = performance.now() + 3200;
          spawnSparkles(new THREE.Vector3(animatedYellowCab.x, 0.6, -1.85), [0xf2b90c, 0xffffff, 0xffe680], 12);
        }
        flash(data.message || '🚕 哔哔——！纽约黄色计程车呼啸穿梭！"Taxi! Take me to Central Perk!" 📯');
      } else if (data.type === 'pigeon') {
        SoundEngine.playSFX('pigeon');
        if (animatedPigeon) {
          animatedPigeon.flutterUntil = performance.now() + 2600;
          spawnSparkles(new THREE.Vector3(2.2, 2.35, -0.75), [0xb0c4de, 0xffffff, 0x7a828e], 10);
        }
        flash(data.message || '🐦 曼哈顿常客小鸽子受到惊扰扑腾起翅膀！"Coo-coo!"');
      } else if (data.type === 'lamp') {
        SoundEngine.playSFX('pop');
        flash(data.message || '💡 复古暖光落地灯/吊灯 · 营造温暖温馨的纽约公寓夜景');
      } else if (data.type === 'door' || data.type === 'balcony_door') {
        SoundEngine.playSFX('door');
        if (data.door) data.door.toggle();
        else if (data.scenario) triggerScenario(data.scenario);
        else if (data.message) flash(data.message);
      } else if (data.scenario) {
        triggerScenario(data.scenario);
      } else if (data.message) {
        SoundEngine.playSFX('pop');
        flash(data.message);
      }
    }
  });
}

function projectTo2D(vec3) {
  const v = vec3.clone().project(camera);
  return {
    x: (v.x * 0.5 + 0.5) * window.innerWidth,
    y: (-(v.y * 0.5) + 0.5) * window.innerHeight,
    visible: v.z < 1
  };
}

function animate(timeMs) {
  requestAnimationFrame(animate);
  const t = timeMs * 0.001;

  // 360° Diorama Spin Transition Animation (Central Perk <-> Monica's Apartment)
  if (spinTransition && stageSpinGroup) {
    const elapsed = timeMs - spinTransition.startTime;
    const progress = Math.min(1, elapsed / spinTransition.duration);
    // Cubic ease-in-out
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    stageSpinGroup.rotation.y = eased * Math.PI * 2;
    const scalePulse = 1 - 0.18 * Math.sin(progress * Math.PI);
    stageSpinGroup.scale.set(scalePulse, scalePulse, scalePulse);

    if (progress >= 0.5 && !spinTransition.swapped) {
      spinTransition.swapped = true;
      applyLocationState(spinTransition.targetLocation);
    }

    if (progress >= 1) {
      stageSpinGroup.rotation.y = 0;
      stageSpinGroup.scale.set(1, 1, 1);
      const arrivedLoc = spinTransition.targetLocation;
      spinTransition = null;
      if (arrivedLoc === 'monica') {
        flash("🏢 欢迎来到 4 楼！左侧 Joey & Chandler 家 (19号)，中间连廊，右侧 Monica 家 (20号)！点击皮躺椅、桌上足球、独木舟或芝士蛋糕互动");
      } else {
        flash("☕ 欢迎回到 Central Perk 咖啡馆！");
      }
    }
  }

  if (camTargetPos && camTargetLook) {
    camera.position.lerp(camTargetPos, 0.075);
    controls.target.lerp(camTargetLook, 0.075);
    if (camera.position.distanceTo(camTargetPos) < 0.08) {
      camTargetPos = null;
      camTargetLook = null;
    }
  }
  controls.update();

  if (serviceSignGroup) {
    serviceSignGroup.rotation.z = Math.sin(t * 1.4) * 0.025;
  }

  steamParticles.forEach(sp => {
    const cycle = (t * 0.65 + sp.offset) % 1.8;
    sp.mesh.position.y = sp.baseY + cycle * 1.15;
    sp.mesh.position.x = sp.baseX + Math.sin(t * 2.2 + sp.offset) * 0.12;
    sp.mesh.material.opacity = Math.max(0, (1 - cycle / 1.8) * 0.55);
  });

  for (let i = noteParticles.length - 1; i >= 0; i--) {
    const np = noteParticles[i];
    np.mesh.position.y += np.vy;
    np.mesh.rotation.y += 0.08;
    np.life -= 0.016;
    if (np.life <= 0) {
      scene.remove(np.mesh);
      noteParticles.splice(i, 1);
    }
  }

  // Cinematic Floating Tyndall Dust Motes
  if (dustParticles) {
    const pos = dustParticles.geometry.attributes.position.array;
    const { speeds, driftPhases, count } = dustParticles.userData;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] = ((pos[i * 3 + 1] - 0.6 + speeds[i] * 0.012) % 7.4) + 0.6;
      pos[i * 3 + 0] += Math.sin(t * 0.7 + driftPhases[i]) * 0.003;
      pos[i * 3 + 2] += Math.cos(t * 0.6 + driftPhases[i]) * 0.003;
    }
    dustParticles.geometry.attributes.position.needsUpdate = true;
  }

  // ==================== DYNAMIC PROPS & INTERACTION ANIMATIONS ====================
  // 1. Interactive Pivoting Doors (#19, #20, Balcony Door)
  animatedDoors.forEach(d => {
    if (!d.pivot) return;
    d.currentAngle = THREE.MathUtils.lerp(d.currentAngle, d.targetAngle, 0.12);
    d.pivot.rotation.y = d.currentAngle;
  });

  // 2. Interactive Barcaloungers Recline Animation
  animatedRecliners.forEach(rec => {
    rec.progress = THREE.MathUtils.lerp(rec.progress, rec.targetProgress, 0.09);
    if (rec.backPivot) rec.backPivot.rotation.x = -0.15 - 0.45 * rec.progress;
    if (rec.footPivot) rec.footPivot.rotation.x = 0.88 * rec.progress;
    if (rec.leverPivot) rec.leverPivot.rotation.x = -0.65 * rec.progress;

    // Synchronize seated Joey / Chandler posture with the recliner movement!
    if (!rec.isJoey && charObjects.chandler && !charObjects.chandler.walkState && currentLocation === 'monica') {
      const ch = charObjects.chandler;
      if (ch.isSeated) {
        ch.torso.rotation.x = -0.32 * rec.progress;
        ch.leftLeg.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2.2, -0.05, rec.progress);
        ch.rightLeg.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2.2, -0.05, rec.progress);
        ch.group.position.y = ch.baseY - 0.16 * rec.progress;
      }
    }
    if (rec.isJoey && charObjects.joey && !charObjects.joey.walkState && currentLocation === 'monica') {
      const j = charObjects.joey;
      if (j.isSeated) {
        j.torso.rotation.x = -0.32 * rec.progress;
        j.leftLeg.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2.2, -0.05, rec.progress);
        j.rightLeg.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2.2, -0.05, rec.progress);
        j.group.position.y = j.baseY - 0.16 * rec.progress;
      }
    }
  });

  // 3. Foosball Table Rod Spinning & Ball Bounce
  if (animatedFoosball && animatedFoosball.rods && animatedFoosball.rods.length) {
    const isSpinning = timeMs < animatedFoosball.spinUntil;
    animatedFoosball.rods.forEach(rod => {
      if (isSpinning) {
        rod.group.rotation.x += rod.baseSpeed * 0.14;
      } else {
        rod.group.rotation.x = Math.sin(t * 1.8 + rod.ri * 1.2) * 0.16;
      }
    });
    if (animatedFoosball.ball) {
      if (isSpinning) {
        animatedFoosball.ball.position.x = Math.sin(t * 9.0) * 1.1;
        animatedFoosball.ball.position.z = Math.cos(t * 6.5) * 1.8;
        animatedFoosball.ball.position.y = 2.22 + Math.abs(Math.sin(t * 18.0)) * 0.12;
      } else {
        animatedFoosball.ball.position.x = Math.sin(t * 0.8) * 0.25;
        animatedFoosball.ball.position.z = Math.cos(t * 0.6) * 0.35;
        animatedFoosball.ball.position.y = 2.22;
      }
    }
  }

  // 4. Living Room Canoe Rocking & Oar Rowing
  if (animatedCanoe && animatedCanoe.group) {
    const isRowing = timeMs < animatedCanoe.activeUntil;
    if (isRowing) {
      animatedCanoe.group.position.y = animatedCanoe.baseY + Math.sin(t * 4.5) * 0.10;
      animatedCanoe.group.rotation.z = Math.sin(t * 4.5) * 0.05;
      animatedCanoe.group.rotation.y = animatedCanoe.baseRotY + Math.sin(t * 2.2) * 0.04;
      if (animatedCanoe.oar1) {
        animatedCanoe.oar1.rotation.y = 0.35 + Math.sin(t * 4.5) * 0.42;
        animatedCanoe.oar1.rotation.x = Math.sin(t * 4.5) * 0.16;
      }
      if (animatedCanoe.oar2) {
        animatedCanoe.oar2.rotation.y = -0.35 - Math.sin(t * 4.5) * 0.42;
        animatedCanoe.oar2.rotation.x = -Math.sin(t * 4.5) * 0.16;
      }
    } else {
      animatedCanoe.group.position.y = animatedCanoe.baseY + Math.sin(t * 1.4) * 0.02;
      animatedCanoe.group.rotation.z = Math.sin(t * 1.4) * 0.015;
      if (animatedCanoe.oar1) animatedCanoe.oar1.rotation.y = 0.35;
      if (animatedCanoe.oar2) animatedCanoe.oar2.rotation.y = -0.35;
    }
  }

  // 5. The Chick & The Duck Waddling & Pecking
  if (animatedPets && animatedPets.duck && animatedPets.duckHead) {
    const isExcited = timeMs < animatedPets.quackUntil;
    const waddleSpeed = isExcited ? 14.0 : 5.0;
    const bobSpeed = isExcited ? 10.0 : 3.5;
    animatedPets.duck.rotation.y = Math.sin(t * waddleSpeed * 0.5) * 0.18;
    animatedPets.duck.rotation.z = Math.sin(t * waddleSpeed) * 0.12;
    animatedPets.duckHead.rotation.x = Math.sin(t * bobSpeed) * 0.28 + 0.1;
    if (isExcited && Math.random() < 0.08) {
      spawnSparkles(new THREE.Vector3(-17.6, 1.0, 6.8), 0xffd15c, 2);
    }
  }
  if (animatedPets && animatedPets.chick && animatedPets.chickHead) {
    const isExcited = timeMs < animatedPets.quackUntil;
    const hopSpeed = isExcited ? 18.0 : 8.0;
    animatedPets.chick.position.y = Math.max(0, Math.sin(t * hopSpeed)) * (isExcited ? 0.25 : 0.1);
    animatedPets.chickHead.rotation.x = Math.sin(t * (hopSpeed * 0.7)) * 0.35 + 0.12;
  }

  // 6. Dropped Floor Cheesecake Squish & Crumb Sparkles
  if (animatedCheesecake && animatedCheesecake.group) {
    const isEating = timeMs < animatedCheesecake.nibbleUntil;
    if (isEating) {
      const wobble = Math.sin(t * 14.0) * 0.04;
      animatedCheesecake.group.scale.set(1.0 + wobble, 1.0 - wobble, 1.0 + wobble);
      if (Math.random() < 0.20) {
        spawnSparkles(new THREE.Vector3(0, 0.45, 4.0), [0xffd15c, 0xffeb99, 0xc42735, 0xffffff], 2);
      }
    } else {
      animatedCheesecake.group.scale.set(1, 1, 1);
    }
  }

  // 7. Manhattan Street Cruising NYC Yellow Cab (🚕)
  if (animatedYellowCab && animatedYellowCab.group) {
    const cab = animatedYellowCab;
    const isBoosted = timeMs < (cab.boostUntil || 0);
    const speed = isBoosted ? 0.095 : 0.042;
    if (cab.isWaiting) {
      if (timeMs > cab.resumeTime) {
        cab.isWaiting = false;
      }
    } else {
      cab.x += speed;
      cab.wheels.forEach(w => {
        w.rotation.z -= speed * 3.6;
      });
      cab.group.position.y = -0.06 + Math.sin(t * 18.0) * 0.012;
      cab.group.position.x = cab.x;

      if (cab.x > 13.5) {
        cab.x = -13.5;
        cab.group.position.x = cab.x;
        cab.isWaiting = true;
        cab.resumeTime = timeMs + 1800 + Math.random() * 2200;
      }
    }
  }

  // 8. Fire Escape Perched Voxel Pigeon (🐦 Pecking, Bobbing & Flutters)
  if (animatedPigeon && animatedPigeon.group) {
    const pig = animatedPigeon;
    const isFluttering = timeMs < (pig.flutterUntil || 0);
    if (isFluttering) {
      pig.group.position.y = 2.27 + Math.abs(Math.sin(t * 22.0)) * 0.16;
      if (pig.leftWing) pig.leftWing.rotation.z = 0.25 + Math.sin(t * 30.0) * 0.85;
      if (pig.rightWing) pig.rightWing.rotation.z = -0.25 - Math.sin(t * 30.0) * 0.85;
      if (pig.head) pig.head.rotation.x = Math.sin(t * 14.0) * 0.35;
    } else {
      pig.group.position.y = 2.27;
      if (pig.leftWing) pig.leftWing.rotation.z = 0.08;
      if (pig.rightWing) pig.rightWing.rotation.z = -0.08;

      const peckCycle = (t * 0.55) % 3.0;
      if (peckCycle < 0.75) {
        pig.head.rotation.x = 0.52 + Math.sin(t * 16.0) * 0.32;
      } else {
        pig.head.rotation.x = Math.sin(t * 3.8) * 0.14;
      }
    }
  }

  // 9. Joey's CRT TV Dynamic Phosphor Flicker & Hallway Sconce Flame Flicker
  if (joeyTvLight) {
    const flick = 0.88 + Math.sin(t * 17.0) * 0.10 + (Math.random() - 0.5) * 0.14;
    const baseTvInt = (timeOfDay === 3 ? 1.7 : (timeOfDay === 2 ? 0.95 : (timeOfDay === 1 ? 0.25 : 0.45)));
    joeyTvLight.intensity = Math.max(0.08, baseTvInt * flick);
    if (joeyTvScreenMesh) {
      joeyTvScreenMesh.material.emissiveIntensity = 0.75 + Math.sin(t * 13.0) * 0.22;
    }
  }
  if (hallwaySconceLights && hallwaySconceLights.length) {
    hallwaySconceLights.forEach((sc, sIdx) => {
      const sFlick = 0.94 + Math.sin(t * 6.5 + sIdx * 2.1) * 0.06 + (Math.random() - 0.5) * 0.05;
      const baseSconceInt = (timeOfDay === 3 ? 1.35 : (timeOfDay === 2 ? 1.05 : 0.65));
      sc.intensity = baseSconceInt * sFlick;
    });
  }

  // 10. Sparkle Particles Update
  for (let i = sparkleParticles.length - 1; i >= 0; i--) {
    const sp = sparkleParticles[i];
    sp.mesh.position.y += sp.vy;
    sp.mesh.position.x += sp.vx;
    sp.mesh.position.z += sp.vz;
    sp.mesh.rotation.y += sp.rotSpeed;
    sp.mesh.rotation.x += sp.rotSpeed * 0.7;
    sp.life -= 0.022;
    sp.mesh.scale.setScalar(Math.max(0.01, sp.life));
    if (sp.life <= 0) {
      scene.remove(sp.mesh);
      sparkleParticles.splice(i, 1);
    }
  }

  const speakerObj = activeSpeakerKey ? charObjects[activeSpeakerKey] : null;
  const camDist = camera.position.distanceTo(controls.target);

  Object.values(charObjects).forEach((co, idx) => {
    const phase = t * 2.2 + idx * 1.1;

    // 1. Handle Autonomous Walking State (Feature #2)
    if (co.walkState) {
      const ws = co.walkState;
      const target = ws.phase === 'to_target' ? ws.targetPos : (ws.returnPos || co.homePos);
      const dx = target.x - co.group.position.x;
      const dz = target.z - co.group.position.z;
      const dist2D = Math.hypot(dx, dz);

      if (dist2D > 0.12) {
        // Walk step movement + leg swing + arm swing + natural body roll!
        const speed = 0.055;
        co.group.position.x += (dx / dist2D) * speed;
        co.group.position.z += (dz / dist2D) * speed;
        co.group.position.y = target.y + Math.abs(Math.sin(t * 14)) * 0.12;
        
        const targetYaw = Math.atan2(dx, dz);
        let yawDiff = targetYaw - co.group.rotation.y;
        while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
        while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
        co.group.rotation.y += yawDiff * 0.22;
        co.group.rotation.z = Math.sin(t * 14) * 0.04;

        co.leftLeg.rotation.x = Math.sin(t * 14) * 0.65;
        co.rightLeg.rotation.x = -Math.sin(t * 14) * 0.65;
        co.leftArm.rotation.x = -Math.sin(t * 14) * 0.45;
        co.rightArm.rotation.x = Math.sin(t * 14) * 0.45;
      } else {
        co.group.rotation.z = 0;
        // Arrived at target or returned home
        co.group.position.copy(target);
        if (ws.phase === 'to_target') {
          co.group.rotation.y = ws.targetRotY;
          co.leftLeg.rotation.x = 0;
          co.rightLeg.rotation.x = 0;

          // Contextual interactive poses while holding at target
          if (ws.actionType === 'cheesecake') {
            if (co.key === 'chandler' || co.key === 'rachel') {
              co.torso.rotation.x = 0.42;
              co.rightArm.rotation.x = -1.15 + Math.sin(t * 7.5) * 0.28;
              co.leftArm.rotation.x = -0.55;
              co.head.rotation.x = 0.35;
              if (Math.random() < 0.10) {
                spawnSparkles(new THREE.Vector3(0, 0.6, 4.0), [0xffd15c, 0xffeb99, 0xc42735], 2);
              }
            } else if (co.key === 'joey') {
              const hasFork = !!co.rightArm.getObjectByName('silverForkProp');
              if (hasFork) {
                // Joey crouches and devours cake with his fork!
                co.torso.rotation.x = 0.38;
                co.rightArm.rotation.x = -1.18 + Math.sin(t * 7.2) * 0.28;
                co.rightArm.rotation.z = -0.15;
                co.leftArm.rotation.x = -0.52;
                co.head.rotation.x = 0.32;
                if (Math.random() < 0.12) {
                  spawnSparkles(new THREE.Vector3(0, 0.6, 4.0), [0xffd15c, 0xffeb99, 0xc42735], 2);
                }
              } else {
                // Joey stands in disbelief looking down at floor eaters!
                co.torso.rotation.x = -0.06;
                co.rightArm.rotation.x = -0.55 + Math.sin(t * 3.0) * 0.12;
                co.rightArm.rotation.z = -0.25;
                co.leftArm.rotation.x = -0.15;
                co.head.rotation.y = 0.28;
                co.head.rotation.x = -0.08;
              }
            }
          } else if (ws.actionType === 'foosball') {
            co.torso.rotation.x = 0.28;
            const isSpinning = timeMs < animatedFoosball.spinUntil;
            if (isSpinning) {
              co.leftArm.rotation.x = -1.0 + Math.sin(t * 14.0) * 0.45;
              co.rightArm.rotation.x = -1.0 - Math.sin(t * 14.0) * 0.45;
            } else {
              if (co.key === 'joey') {
                co.group.position.y = co.baseY + 0.35 + Math.abs(Math.sin(t * 8.0)) * 0.15;
                co.leftArm.rotation.x = -2.7;
                co.rightArm.rotation.x = -2.7;
                co.head.rotation.x = -0.25;
              } else {
                co.head.rotation.x = 0.45;
                co.leftArm.rotation.x = -0.2;
                co.rightArm.rotation.x = -0.2;
              }
            }
          } else if (ws.actionType === 'canoe') {
            if (co.key === 'joey') {
              co.torso.rotation.x = Math.sin(t * 4.5) * 0.20;
              co.leftArm.rotation.x = -0.7 + Math.sin(t * 4.5) * 0.48;
              co.rightArm.rotation.x = -0.7 + Math.sin(t * 4.5) * 0.48;
            } else {
              co.torso.rotation.x = 0.14;
              co.head.rotation.z = 0.22;
              co.head.rotation.x = 0.15;
              co.leftArm.rotation.x = -0.25;
              co.rightArm.rotation.x = -0.25;
            }
          } else if (ws.actionType === 'turkey') {
            co.group.rotation.z = Math.sin(t * 8.5) * 0.18;
            co.leftArm.rotation.z = 0.55 + Math.sin(t * 8.5) * 0.38;
            co.leftArm.rotation.x = -0.45 + Math.cos(t * 8.5) * 0.30;
            co.rightArm.rotation.z = -0.55 - Math.sin(t * 8.5) * 0.38;
            co.rightArm.rotation.x = -0.45 + Math.cos(t * 8.5) * 0.30;
            co.head.rotation.x = Math.sin(t * 17.0) * 0.14;
            if (Math.random() < 0.14) {
              spawnSparkles(new THREE.Vector3(5.2, 2.6, 5.9), [0xff4d6d, 0xff758f, 0xffd166], 2);
            }
          } else if (ws.actionType === 'clean') {
            co.torso.rotation.x = 0.22;
            co.rightArm.rotation.x = -0.9 + Math.sin(t * 14.0) * 0.35;
            co.rightArm.rotation.z = Math.cos(t * 14.0) * 0.30;
            if (Math.random() < 0.16) {
              spawnSparkles(new THREE.Vector3(10.3, 2.2, -1.8), [0x70d6ff, 0xffd166, 0xffffff], 2);
            }
          } else if (ws.actionType === 'ugly_naked') {
            co.torso.rotation.x = 0.28;
            co.leftArm.rotation.x = -1.25;
            co.rightArm.rotation.x = -1.25;
            co.head.rotation.y = Math.sin(t * 2.0) * 0.22;
          } else if (ws.actionType === 'food') {
            co.rightArm.rotation.x = -1.2 + Math.sin(t * 6.5) * 0.30;
            co.head.rotation.x = 0.2 + Math.sin(t * 8.0) * 0.15;
            if (Math.random() < 0.12) {
              spawnSparkles(new THREE.Vector3(16.0, 1.8, -7.5), [0xffb703, 0xfb8500], 2);
            }
          }

          if (!ws.holdUntil) {
            ws.holdUntil = timeMs + ws.holdMs;
            if (ws.onReach) ws.onReach();
          } else if (timeMs > ws.holdUntil) {
            ws.phase = 'returning';
            removeScenarioProp(co.head, 'turkeyHeadProp');
            removeScenarioProp(co.rightArm, 'silverForkProp');
            removeScenarioProp(co.rightArm, 'cleaningSpongeProp');
            co.torso.rotation.x = 0;
            co.head.rotation.x = 0;
            co.head.rotation.y = 0;
            co.head.rotation.z = 0;
          }
        } else {
          // Back at seat or door!
          removeScenarioProp(co.head, 'turkeyHeadProp');
          removeScenarioProp(co.rightArm, 'silverForkProp');
          removeScenarioProp(co.rightArm, 'cleaningSpongeProp');
          co.torso.rotation.x = 0;
          co.head.rotation.x = 0;
          co.head.rotation.y = 0;
          co.head.rotation.z = 0;
          co.group.position.copy(co.homePos);
          co.group.rotation.y = co.homeRotY;
          co.isSeated = co.homeSeated;
          co.leftLeg.rotation.x = co.isSeated ? -Math.PI / 2.2 : 0;
          co.rightLeg.rotation.x = co.isSeated ? -Math.PI / 2.2 : 0;
          const stateSpan = co.labelEl.querySelector('.label-state');
          if (stateSpan) stateSpan.textContent = '';
          co.walkState = null;
        }
      }
    } else {
      // Seated or standing idle / talking animations
      co.leftLeg.rotation.x = co.isSeated ? -Math.PI / 2.2 : 0;
      co.rightLeg.rotation.x = co.isSeated ? -Math.PI / 2.2 : 0;

      if (co.isTalking) {
        co.group.position.y = co.baseY + Math.abs(Math.sin(t * 7.5)) * 0.1;

        if (co.key === 'joey') {
          // Joey: "How you doin'?" smirk nod & arm gesture!
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, 0.18, 0.14);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, -0.16, 0.14);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, Math.sin(t * 7.0) * 0.14 - 0.08, 0.14);
          co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, -0.85 + Math.sin(t * 6.0) * 0.2, 0.14);
          co.rightArm.rotation.z = THREE.MathUtils.lerp(co.rightArm.rotation.z, -0.35, 0.14);
          co.leftArm.rotation.x = THREE.MathUtils.lerp(co.leftArm.rotation.x, -0.25, 0.14);
        } else if (co.key === 'chandler') {
          // Chandler: sarcastic shrug with both arms out
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(t * 4.5) * 0.25, 0.14);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, Math.sin(t * 3.5) * 0.18, 0.14);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, 0.05, 0.14);
          co.leftArm.rotation.z = THREE.MathUtils.lerp(co.leftArm.rotation.z, 0.45 + Math.sin(t * 6.0) * 0.15, 0.14);
          co.rightArm.rotation.z = THREE.MathUtils.lerp(co.rightArm.rotation.z, -0.45 - Math.sin(t * 6.0) * 0.15, 0.14);
          co.leftArm.rotation.x = THREE.MathUtils.lerp(co.leftArm.rotation.x, -0.45, 0.14);
          co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, -0.45, 0.14);
        } else if (co.key === 'monica') {
          // Monica: high energy double chop hands or hands-on-hips
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(t * 8.0) * 0.15, 0.18);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, Math.sin(t * 9.0) * 0.12, 0.18);
          co.leftArm.rotation.x = THREE.MathUtils.lerp(co.leftArm.rotation.x, -0.65 + Math.sin(t * 11.0) * 0.35, 0.18);
          co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, -0.65 - Math.sin(t * 11.0) * 0.35, 0.18);
        } else if (co.key === 'ross') {
          // Ross: "PIVOT!" two-hand pushing gesture
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(t * 4.0) * 0.2, 0.12);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, Math.sin(t * 6.0) * 0.1, 0.12);
          co.leftArm.rotation.x = THREE.MathUtils.lerp(co.leftArm.rotation.x, -1.05 + Math.sin(t * 7.5) * 0.3, 0.15);
          co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, -1.05 + Math.sin(t * 7.5) * 0.3, 0.15);
        } else if (co.key === 'phoebe') {
          // Phoebe: whimsical sway and guitar strumming
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(t * 3.5) * 0.25, 0.12);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, Math.sin(t * 3.0) * 0.2, 0.12);
          co.leftArm.rotation.x = THREE.MathUtils.lerp(co.leftArm.rotation.x, -0.75, 0.14);
          co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, -0.85 + Math.sin(t * 13.0) * 0.35, 0.2);
        } else if (co.key === 'rachel') {
          // Rachel: expressive gestures & hair touch / coffee hold
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(t * 5.0) * 0.18, 0.14);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, 0.12, 0.14);
          co.leftArm.rotation.x = THREE.MathUtils.lerp(co.leftArm.rotation.x, -0.45 + Math.sin(t * 6.0) * 0.25, 0.14);
          if (!co.rightArm.userData.hasMug) {
            co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, -0.35 + Math.cos(t * 5.5) * 0.25, 0.14);
          }
        } else {
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(t * 4.5) * 0.22, 0.14);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, Math.sin(t * 5.8) * 0.06, 0.14);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, Math.sin(t * 3.2) * 0.07, 0.14);
          co.leftArm.rotation.x = -0.35 + Math.sin(t * 6.5) * 0.35;
          if (!co.rightArm.userData.hasMug) {
            co.rightArm.rotation.x = -0.25 + Math.cos(t * 6.0) * 0.28;
          }
        }
      } else {
        co.group.position.y = co.baseY + Math.sin(phase) * 0.025;
        co.leftArm.rotation.x = Math.sin(phase * 0.7) * 0.06;

        // Feature #4: Character Subtle Idle Sipping
        if (timeMs > co.nextSipAt) {
          co.sipUntil = timeMs + 2200; // 2.2s gentle sip
          co.nextSipAt = timeMs + 9000 + Math.random() * 15000;
        }
        if (timeMs < co.sipUntil) {
          const sipProg = (2200 - (co.sipUntil - timeMs)) / 2200;
          const sipCurve = Math.sin(sipProg * Math.PI); // 0 -> 1 -> 0
          const baseArmX = co.rightArm.userData.hasMug ? -0.65 : 0;
          co.rightArm.rotation.x = THREE.MathUtils.lerp(baseArmX, -1.25, sipCurve);
          co.rightArm.rotation.z = -0.15 * sipCurve;
          if (!speakerObj || speakerObj === co) {
            co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, 0.12 * sipCurve, 0.1);
          }
        } else if (!co.rightArm.userData.hasMug) {
          co.rightArm.rotation.x = THREE.MathUtils.lerp(co.rightArm.rotation.x, 0, 0.08);
          co.rightArm.rotation.z = THREE.MathUtils.lerp(co.rightArm.rotation.z, 0, 0.08);
        }

        // Feature #2: Listener Head Look-At Tracking & Attentive Nodding!
        if (speakerObj && speakerObj !== co) {
          const sdx = speakerObj.group.position.x - co.group.position.x;
          const sdz = speakerObj.group.position.z - co.group.position.z;
          const worldAngleToSpeaker = Math.atan2(sdx, sdz);
          let relYaw = worldAngleToSpeaker - co.group.rotation.y;
          while (relYaw > Math.PI) relYaw -= Math.PI * 2;
          while (relYaw < -Math.PI) relYaw += Math.PI * 2;
          // Clamp neck rotation to a natural human range (-45 deg to +45 deg) + subtle life sway
          const targetYaw = THREE.MathUtils.clamp(relYaw * 0.72, -0.78, 0.78) + Math.sin(t * 1.4 + idx) * 0.05;
          const targetPitch = Math.sin(t * 2.8 + idx * 1.7) * 0.045; // Gentle attentive nod
          const targetTilt = THREE.MathUtils.clamp(relYaw * 0.08, -0.06, 0.06);
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, targetYaw, 0.08);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, targetPitch, 0.08);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, targetTilt, 0.08);
        } else {
          co.head.rotation.y = THREE.MathUtils.lerp(co.head.rotation.y, Math.sin(phase * 0.5) * 0.1, 0.08);
          co.head.rotation.x = THREE.MathUtils.lerp(co.head.rotation.x, 0, 0.08);
          co.head.rotation.z = THREE.MathUtils.lerp(co.head.rotation.z, 0, 0.08);
        }
      }
    }

    // Feature #4: Natural Chest Expansion Breathing
    if (co.torso) {
      const breath = Math.sin(t * 2.2 + idx * 1.3);
      co.torso.scale.set(1 + breath * 0.03, 1 + breath * 0.015, 1 + breath * 0.04);
    }

    // Feature #1: Dynamic Mii Eye Blinking & Lip-Sync Mouth Animation!
    if (co.faceMat && co.faceTextures) {
      if (timeMs > co.nextBlinkAt) {
        co.blinkUntil = timeMs + 145; // 145ms crisp natural blink
        // Occasional double-blink for extra realism!
        co.nextBlinkAt = timeMs + (Math.random() < 0.18 ? 320 : 2600 + Math.random() * 3800);
      }
      const isBlinking = timeMs < co.blinkUntil;
      const isMouthOpen = co.isTalking && (Math.sin(t * 17.5 + idx) > -0.15);
      const targetTex = isBlinking
        ? co.faceTextures.blink
        : (isMouthOpen ? co.faceTextures.talk : co.faceTextures.normal);
      if (co.faceMat.map !== targetTex) {
        co.faceMat.map = targetTex;
        co.faceMat.needsUpdate = true;
      }
    }

    // Project 3D Head position to 2D Screen
    const headWorld = new THREE.Vector3();
    co.head.getWorldPosition(headWorld);
    co._distToCam = headWorld.distanceTo(camera.position);
    co._labelPos = projectTo2D(headWorld.clone().add(new THREE.Vector3(0, 0.75, 0)));

    const emotePos = projectTo2D(headWorld.clone().add(new THREE.Vector3(0, 1.12, 0)));
    if (emotePos.visible) {
      co.emoteEl.style.left = `${emotePos.x}px`;
      co.emoteEl.style.top = `${emotePos.y}px`;
    }

    const bubblePos = projectTo2D(headWorld.clone().add(new THREE.Vector3(0, 1.38, 0)));
    if (bubblePos.visible) {
      // Clamp bubble inside safe screen margins so it never gets cut off at top/left/right edges
      const clampedX = Math.max(165, Math.min(window.innerWidth - 165, bubblePos.x));
      const clampedY = Math.max(98, Math.min(window.innerHeight - 130, bubblePos.y));
      co.bubbleEl.style.left = `${clampedX}px`;
      co.bubbleEl.style.top = `${clampedY}px`;
    }
  });

  // Sort characters front-to-back from camera so overlapping 2D labels never pile up from side angles!
  const sortedChars = Object.values(charObjects).sort((a, b) => a._distToCam - b._distToCam);
  const placedLabels = [];
  sortedChars.forEach(co => {
    if (!co.group.visible) {
      co.labelEl.style.display = 'none';
      co.emoteEl.classList.remove('active');
      co.bubbleEl.classList.remove('active');
      return;
    }
    const lp = co._labelPos;
    if (!lp || !lp.visible) {
      co.labelEl.style.display = 'none';
      return;
    }
    // Check collision against already-placed closer character labels
    const isOverlapping = !co.isTalking && placedLabels.some(p => Math.abs(p.x - lp.x) < 68 && Math.abs(p.y - lp.y) < 24);
    if (isOverlapping) {
      co.labelEl.style.display = 'none';
    } else {
      placedLabels.push({ x: lp.x, y: lp.y });
      co.labelEl.style.left = `${lp.x}px`;
      co.labelEl.style.top = `${lp.y}px`;
      co.labelEl.style.opacity = camDist > 38 ? '0.68' : '1';
      co.labelEl.style.zIndex = String(Math.round(100 - co._distToCam));
      co.labelEl.style.display = 'block';
    }
  });

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  const scale = isRetroPixel ? 0.42 : Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(scale);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ==================== ATMOSPHERE & LIGHTING MODES ====================
function cycleTimeOfDay() {
  timeOfDay = (timeOfDay + 1) % 4;
  const cafeScene = document.getElementById('cafe-scene');
  const timeIcon = document.getElementById('time-icon');
  const amb = scene.getObjectByName('ambientLight');
  const dir = scene.getObjectByName('dirLight');
  const rim = scene.getObjectByName('rimLight');

  if (timeOfDay === 0) {
    cafeScene.className = 'cafe-scene studio';
    timeIcon.textContent = '🎨';
    if (amb) { amb.intensity = 0.82; amb.color.setHex(0xfff5e8); }
    if (dir) { dir.intensity = 0.92; dir.color.setHex(0xfff0d6); }
    if (rim) { rim.intensity = 0.40; rim.color.setHex(0xffeedd); }
    if (dustParticles) dustParticles.material.opacity = 0.52;
    warmPointLights.forEach(l => l.intensity = 0.65);
    lampBulbs.forEach(m => { if (m) m.emissiveIntensity = 0.35; });
    if (animatedYellowCab && animatedYellowCab.frontSpot) animatedYellowCab.frontSpot.intensity = 0.35;
    flash('🎨 微缩画布模式 · 纯净等轴测体素模型视野');
  } else if (timeOfDay === 1) {
    cafeScene.className = 'cafe-scene day';
    timeIcon.textContent = '☀️';
    if (amb) { amb.intensity = 0.84; amb.color.setHex(0xfff1d6); }
    if (dir) { dir.intensity = 0.98; dir.color.setHex(0xffe4b5); }
    if (rim) { rim.intensity = 0.58; rim.color.setHex(0xfff3c4); }
    if (dustParticles) dustParticles.material.opacity = 0.70;
    warmPointLights.forEach(l => l.intensity = 0.78);
    lampBulbs.forEach(m => { if (m) m.emissiveIntensity = 0.20; });
    if (animatedYellowCab && animatedYellowCab.frontSpot) animatedYellowCab.frontSpot.intensity = 0.25;
    flash('☀️ 暖阳午后 · 晴朗天光与暖金阳光洒满场景');
  } else if (timeOfDay === 2) {
    cafeScene.className = 'cafe-scene evening';
    timeIcon.textContent = '🌅';
    if (amb) { amb.intensity = 0.64; amb.color.setHex(0xffb894); }
    if (dir) { dir.intensity = 0.72; dir.color.setHex(0xff9254); }
    if (rim) { rim.intensity = 0.75; rim.color.setHex(0xffaa66); }
    if (dustParticles) dustParticles.material.opacity = 0.85;
    warmPointLights.forEach(l => l.intensity = 1.25);
    lampBulbs.forEach(m => { if (m) m.emissiveIntensity = 1.45; });
    if (animatedYellowCab && animatedYellowCab.frontSpot) animatedYellowCab.frontSpot.intensity = 1.15;
    flash('🌅 曼哈顿粉橘晚霞 · 落日余晖与室内暖灯交织');
  } else {
    cafeScene.className = 'cafe-scene night';
    timeIcon.textContent = '🌙';
    if (amb) { amb.intensity = 0.45; amb.color.setHex(0x9bb4eb); }
    if (dir) { dir.intensity = 0.38; dir.color.setHex(0x7ca2e8); }
    if (rim) { rim.intensity = 0.48; rim.color.setHex(0x8cb4ff); }
    if (dustParticles) dustParticles.material.opacity = 0.48;
    warmPointLights.forEach(l => l.intensity = 1.60);
    lampBulbs.forEach(m => { if (m) m.emissiveIntensity = 2.40; });
    if (animatedYellowCab && animatedYellowCab.frontSpot) animatedYellowCab.frontSpot.intensity = 1.85;
    flash('🌙 格林威治村星夜 · 静谧靛蓝夜空与室内琥珀暖光');
  }

  // Update NYC Window Backdrop to reflect the current lighting atmosphere
  if (nycBackdropMesh && PixelTextures.nycSkyline) {
    const themeName = (timeOfDay === 0) ? 'studio' : (timeOfDay === 1 ? 'day' : (timeOfDay === 2 ? 'evening' : 'night'));
    nycBackdropMesh.material.map = PixelTextures.nycSkyline(themeName);
    nycBackdropMesh.material.needsUpdate = true;
  }
}

function toggleRetroPixelMode() {
  isRetroPixel = !isRetroPixel;
  const overlay = document.getElementById('pixel-overlay');
  overlay.classList.toggle('retro-on', isRetroPixel);
  onWindowResize();
  flash(isRetroPixel ? '👾 已开启：8-Bit 复古像素颗粒滤镜' : '🧊 已开启：高清细颗粒体素微缩模型');
}

// ==================== DATA, SEARCH & VOCAB BOOK ====================
async function loadData() {
  try {
    const r = await fetch('data/friends_lines.json');
    if (!r.ok) throw new Error('HTTP error');
    const json = await r.json();
    // Merge emotes from FALLBACK_LINES
    allLines = json.map(item => {
      const fb = FALLBACK_LINES.find(f => f.id === item.id);
      return { ...item, emotes: fb?.emotes || null };
    });
  } catch (e) {
    allLines = FALLBACK_LINES;
  }
}

function buildSearchIndex() {
  if (typeof FlexSearch === 'undefined') return;
  searchIndex = new FlexSearch.Document({
    document: { id: 'id', index: ['text', 'translation', 'context_before', 'context_after'] },
    tokenize: 'forward'
  });
  allLines.forEach(l => searchIndex.add(l));
}

function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const seasonFilter = document.getElementById('season-filter');
  const episodeFilter = document.getElementById('episode-filter');
  const q = searchInput.value.trim();
  const s = seasonFilter.value;
  const e = episodeFilter.value;

  let r = allLines;
  if (q) {
    const ql = q.toLowerCase();
    r = r.filter(l =>
      l.text.toLowerCase().includes(ql) ||
      (l.translation && l.translation.includes(ql)) ||
      l.character.toLowerCase().includes(ql) ||
      (l.context_before || []).some(c => c.toLowerCase().includes(ql)) ||
      (l.context_after || []).some(c => c.toLowerCase().includes(ql))
    );
  }
  if (s) r = r.filter(l => l.season === parseInt(s));
  if (e) r = r.filter(l => l.episode === parseInt(e));
  renderResults(r, !!q || !!s || !!e);
}

function renderResults(r, hasQ) {
  const searchResults = document.getElementById('search-results');
  const searchEmpty = document.getElementById('search-empty');
  const resultsCount = document.getElementById('results-count');
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
  resultsCount.textContent = `✨ 找到 ${r.length} 段经典对话（点击即可在 3D 咖啡馆中演练）`;

  searchResults.innerHTML = r.map(l => {
    const col = CHAR_META[l.character.toLowerCase()]?.color || '#5C3D2E';
    return `
      <div class="result-card" data-id="${l.id}">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-amber-900">S${String(l.season).padStart(2,'0')}E${String(l.episode).padStart(2,'0')}</span>
            <span class="text-xs font-bold text-white px-2 py-0.5 rounded-full" style="background:${col}">${l.character}</span>
          </div>
          <span class="text-xs text-amber-700 font-semibold">▶️ 播放场景</span>
        </div>
        <p class="text-sm font-bold text-gray-900">"${l.text}"</p>
        ${l.translation ? `<p class="text-xs text-gray-500 mt-0.5">${l.translation}</p>` : ''}
      </div>`;
  }).join('');

  searchResults.querySelectorAll('.result-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = allLines.find(x => x.id === parseInt(card.dataset.id));
      if (item) {
        closeAllPanels();
        playConversationScene(item);
        openDialogueCard(item);
      }
    });
  });
}

function loadVocab() {
  try {
    const s = localStorage.getItem('friends_vocab');
    if (s) vocabWords = new Set(JSON.parse(s));
  } catch (e) {
    vocabWords = new Set();
  }
  updateVocabBadge();
}

function saveVocab() {
  localStorage.setItem('friends_vocab', JSON.stringify([...vocabWords]));
  updateVocabBadge();
}

function updateVocabBadge() {
  const badge = document.getElementById('vocab-badge');
  if (!badge) return;
  if (vocabWords.size > 0) {
    badge.textContent = vocabWords.size;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function addWord(w) {
  vocabWords.add(w);
  saveVocab();
  renderVocab();
  flash(`📖 已收入生词本: "${w}"`);
}

function remWord(w) {
  vocabWords.delete(w);
  saveVocab();
  renderVocab();
}

function renderVocab() {
  const vocabList = document.getElementById('vocab-list');
  if (!vocabWords.size) {
    vocabList.innerHTML = '<p class="text-sm text-gray-400 text-center py-8">还没有添加生词 👀<br><span class="text-xs">点击场景中的角色或气泡，再点英文单词即可收藏</span></p>';
    return;
  }
  vocabList.innerHTML = [...vocabWords].sort().map(w => {
    const info = WORD_DICT[w];
    return `
      <div class="flex items-center justify-between px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm">
        <div>
          <span class="font-bold text-amber-950 mr-2">${w}</span>
          <span class="text-xs text-amber-700">${info ? info.meaning : ''}</span>
        </div>
        <button data-word="${w}" class="text-red-400 hover:text-red-600 font-bold px-2">×</button>
      </div>`;
  }).join('');
  vocabList.querySelectorAll('button').forEach(b => b.addEventListener('click', () => remWord(b.dataset.word)));
}

function closeAllPanels() {
  document.getElementById('search-overlay')?.classList.add('hidden');
  document.getElementById('vocab-overlay')?.classList.add('hidden');
  document.getElementById('ref-overlay')?.classList.add('hidden');
  document.getElementById('polaroid-modal')?.classList.add('hidden');
  document.getElementById('panel-overlay')?.classList.add('hidden');
  closeDialogueCard();
}

// ==================== PROCEDURAL AUDIO, AMBIENT BGM & CHARACTER VOICE TTS ENGINE ====================
const SoundEngine = (() => {
  let ctx = null;
  let isMuted = false;
  let unlocked = false;
  let ambientTimer = null;
  let chordStep = 0;
  let voices = [];

  // Load Web Speech API voices
  function refreshVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      voices = window.speechSynthesis.getVoices() || [];
    }
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function ensureContext() {
    if (!ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  // Pluck a warm acoustic guitar / electric piano note
  function playNote(freq, startTime, duration = 1.4, vol = 0.032, type = 'triangle') {
    const audio = ensureContext();
    if (!audio || isMuted) return;
    const osc = audio.createOscillator();
    const sub = audio.createOscillator();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    sub.type = 'sine';
    sub.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, startTime);
    filter.frequency.exponentialRampToValueAtTime(420, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const subGain = audio.createGain();
    subGain.gain.setValueAtTime(vol * 0.25, startTime);
    subGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

    osc.connect(filter);
    sub.connect(subGain);
    subGain.connect(filter);
    filter.connect(gain);
    gain.connect(audio.destination);

    osc.start(startTime);
    sub.start(startTime);
    osc.stop(startTime + duration + 0.05);
    sub.stop(startTime + duration + 0.05);
  }

  // Cozy Lo-Fi Jazz Guitar Chords for Central Perk vs Monica's Apartment
  const CAFE_CHORDS = [
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [164.81, 196.00, 246.94, 293.66], // Em7
    [146.83, 174.61, 220.00, 261.63], // Dm7
    [130.81, 164.81, 196.00, 246.94]  // Cmaj7
  ];
  const MONICA_CHORDS = [
    [130.81, 164.81, 246.94, 293.66], // Cmaj9
    [110.00, 164.81, 196.00, 246.94], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 329.63]  // G6
  ];

  function startAmbientLoop() {
    if (ambientTimer) clearInterval(ambientTimer);
    ambientTimer = setInterval(() => {
      if (isMuted || !unlocked) return;
      const audio = ensureContext();
      if (!audio) return;
      const now = audio.currentTime;
      const chords = currentLocation === 'monica' ? MONICA_CHORDS : CAFE_CHORDS;
      const chord = chords[chordStep % chords.length];
      chordStep++;

      // Gently arpeggiate the warm acoustic chord
      chord.forEach((f, idx) => {
        playNote(f, now + idx * 0.14, 2.3, 0.018, 'triangle');
      });
      // Soft melody grace note on top
      if (chordStep % 2 === 1) {
        playNote(chord[3] * 2, now + 0.85, 1.4, 0.011, 'sine');
      }
      // Subtle cafe porcelain cup clink or steam whisper every 4 bars in Central Perk
      if (currentLocation === 'cafe' && chordStep % 4 === 0) {
        playNote(2480, now + 1.4, 0.12, 0.007, 'sine');
        playNote(3120, now + 1.46, 0.16, 0.005, 'sine');
      }
    }, 3200);
  }

  // Play Phoebe's iconic "Smelly Cat" acoustic guitar strumming (E - A - D - A)
  function playSmellyCatSong() {
    if (isMuted) return;
    const audio = ensureContext();
    if (!audio) return;
    const now = audio.currentTime;
    const progression = [
      [164.81, 246.94, 329.63, 415.30], // E major
      [220.00, 277.18, 329.63, 440.00], // A major
      [146.83, 220.00, 293.66, 369.99], // D major
      [220.00, 277.18, 329.63, 440.00]  // A major
    ];
    progression.forEach((chord, cIdx) => {
      const baseT = now + cIdx * 0.65;
      chord.forEach((freq, sIdx) => {
        playNote(freq, baseT + sIdx * 0.035, 0.95, 0.038, 'triangle');
      });
    });
  }

  // Rich 3D Prop & UI Micro Sound Effects
  function playSFX(type) {
    if (isMuted) return;
    const audio = ensureContext();
    if (!audio) return;
    const now = audio.currentTime;

    if (type === 'duck') {
      // Chandler's Yellow Rubber Duckie double squeak! 🐥
      [0, 0.24].forEach(offset => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = 'sawtooth';
        const filter = audio.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now + offset);
        filter.Q.setValueAtTime(4.5, now + offset);

        osc.frequency.setValueAtTime(780, now + offset);
        osc.frequency.exponentialRampToValueAtTime(1480, now + offset + 0.07);
        osc.frequency.exponentialRampToValueAtTime(690, now + offset + 0.18);

        gain.gain.setValueAtTime(0.001, now + offset);
        gain.gain.linearRampToValueAtTime(0.085, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.19);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audio.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.2);
      });
    } else if (type === 'espresso') {
      // Pressurized espresso steam hiss + porcelain cup clink ☕
      const bufSize = audio.sampleRate * 0.65;
      const buf = audio.createBuffer(1, bufSize, audio.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = audio.createBufferSource();
      noise.buffer = buf;
      const filter = audio.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2800, now);
      filter.Q.setValueAtTime(1.8, now);

      const gain = audio.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.065, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.62);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audio.destination);
      noise.start(now);
      // Cup clink
      playNote(2650, now + 0.12, 0.14, 0.03, 'sine');
      playNote(3380, now + 0.18, 0.18, 0.025, 'sine');
    } else if (type === 'shutter') {
      // Polaroid mechanical camera click + film eject whirr 📸
      playNote(1800, now, 0.04, 0.09, 'square');
      playNote(920, now + 0.045, 0.05, 0.08, 'triangle');
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now + 0.1);
      osc.frequency.linearRampToValueAtTime(390, now + 0.38);
      gain.gain.setValueAtTime(0.025, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(now + 0.1);
      osc.stop(now + 0.42);
    } else if (type === 'door') {
      // Wooden door latch & warm harmonic chime 🚪
      playNote(196, now, 0.18, 0.06, 'triangle');
      playNote(293.66, now + 0.07, 0.25, 0.05, 'triangle');
      playNote(392.00, now + 0.14, 0.45, 0.045, 'sine');
    } else if (type === 'guitar') {
      playSmellyCatSong();
    } else if (type === 'sitcom_laugh') {
      // Warm upbeat sitcom transition chime (Friends-style guitar riff!)
      const riff = [329.63, 369.99, 440.00, 493.88, 659.25];
      riff.forEach((f, i) => {
        playNote(f, now + i * 0.065, 0.55, 0.032, 'triangle');
      });
    } else if (type === 'pop') {
      // Subtle tactile miniature wooden pop
      playNote(520, now, 0.08, 0.035, 'sine');
      playNote(780, now + 0.025, 0.09, 0.025, 'sine');
    } else if (type === 'foosball') {
      // Rapid spin rattle + sharp marble ball bounce
      [120, 240, 180, 310, 480, 220].forEach((freq, i) => {
        playNote(freq, now + i * 0.045, 0.04, 0.04, 'triangle');
      });
      playNote(820, now + 0.30, 0.08, 0.05, 'sine');
      playNote(1100, now + 0.36, 0.12, 0.04, 'sine');
    } else if (type === 'cheesecake') {
      // Delicious creamy sweet ding & silver fork clink
      playNote(1318.51, now, 0.22, 0.04, 'sine'); // E6
      playNote(1661.22, now + 0.08, 0.35, 0.035, 'sine'); // G#6
      playNote(2093.00, now + 0.16, 0.45, 0.03, 'sine'); // C7
    } else if (type === 'bark') {
      // Playful Pat the Dog woof synth
      [320, 280, 240].forEach((f, i) => playNote(f, now + i * 0.04, 0.08, 0.06, 'sawtooth'));
      [340, 300, 250].forEach((f, i) => playNote(f, now + 0.18 + i * 0.04, 0.08, 0.06, 'sawtooth'));
    } else if (type === 'canoe') {
      // Gentle water splash / wooden paddle sweep
      [180, 220, 160, 280].forEach((f, i) => playNote(f, now + i * 0.08, 0.18, 0.035, 'sine'));
    } else if (type === 'cab_horn') {
      // Classic NYC Yellow Cab dual-tone horn (440 Hz + 350 Hz quick double tap)
      [0, 0.14].forEach(offset => {
        playNote(440, now + offset, 0.09, 0.07, 'sawtooth');
        playNote(350, now + offset, 0.09, 0.07, 'sawtooth');
      });
    } else if (type === 'pigeon') {
      // Soft gentle Manhattan pigeon coo (throaty warble descending 380 -> 330 Hz)
      [0, 0.12].forEach((offset, idx) => {
        const f = idx === 0 ? 380 : 330;
        playNote(f, now + offset, 0.16, 0.045, 'sine');
      });
    }
  }

  // Character Voice Profiles for English TTS
  const CHAR_VOICE_PROFILES = {
    rachel:   { gender: 'female', pitch: 1.14, rate: 1.03 },
    monica:   { gender: 'female', pitch: 1.06, rate: 1.07 },
    phoebe:   { gender: 'female', pitch: 1.20, rate: 0.96 },
    ross:     { gender: 'male',   pitch: 0.90, rate: 0.98 },
    chandler: { gender: 'male',   pitch: 0.98, rate: 1.05 },
    joey:     { gender: 'male',   pitch: 0.84, rate: 0.94 },
    gunther:  { gender: 'male',   pitch: 0.80, rate: 0.90 }
  };

  function pickVoice(gender) {
    if (!voices || !voices.length) refreshVoices();
    const enVoices = voices.filter(v => /^en(-|_)/i.test(v.lang));
    if (!enVoices.length) return voices[0] || null;

    const femaleNames = /samantha|victoria|karen|moira|tessa|fiona|allison|ava|susan|zira|female|google us english/i;
    const maleNames = /alex|daniel|fred|aaron|arthur|oliver|tom|david|mark|guy|male/i;

    if (gender === 'female') {
      return enVoices.find(v => femaleNames.test(v.name)) || enVoices[0];
    } else {
      return enVoices.find(v => maleNames.test(v.name)) || enVoices[enVoices.length - 1] || enVoices[0];
    }
  }

  function speakLine(charKey, text, force = false) {
    if (isMuted || (!unlocked && !force)) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!text) return;

    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/["“”]/g, '').trim();
      const utter = new SpeechSynthesisUtterance(cleanText);
      const profile = CHAR_VOICE_PROFILES[(charKey || 'rachel').toLowerCase()] || { gender: 'female', pitch: 1.0, rate: 1.0 };
      const chosenVoice = pickVoice(profile.gender);
      if (chosenVoice) utter.voice = chosenVoice;
      utter.lang = chosenVoice?.lang || 'en-US';
      utter.pitch = profile.pitch;
      utter.rate = profile.rate;
      utter.volume = 0.88;
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // Ignore TTS errors on restricted browsers
    }
  }

  function speakWord(word) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      const chosenVoice = pickVoice('female');
      if (chosenVoice) utter.voice = chosenVoice;
      utter.lang = 'en-US';
      utter.pitch = 1.05;
      utter.rate = 0.92;
      utter.volume = 0.95;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    ensureContext();
    startAmbientLoop();
    // Play a soft welcoming chord
    playSFX('pop');
  }

  function toggleMute() {
    unlocked = true;
    isMuted = !isMuted;
    const iconEl = document.getElementById('sound-icon');
    if (iconEl) iconEl.textContent = isMuted ? '🔇' : '🔊';
    if (isMuted) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      flash('🔇 已静音：环境音乐、角色配音与音效已关闭');
    } else {
      ensureContext();
      startAmbientLoop();
      playSFX('sitcom_laugh');
      if (currentSceneQuote) {
        speakLine(activeSpeakerKey || currentSceneQuote.character, currentSceneQuote.text, true);
      }
      flash('🔊 声音已开启：Lo-Fi 咖啡馆轻音乐 + 老友英文配音 + 微缩道具音效！');
    }
    return !isMuted;
  }

  return {
    unlock,
    toggleMute,
    playSFX,
    playSmellyCatSong,
    speakLine,
    speakWord,
    isMuted: () => isMuted
  };
})();

// ==================== POLAROID SNAPSHOT & CARD EXPORT ====================
function takePolaroidSnapshot() {
  SoundEngine.playSFX('shutter');
  // 1. Shutter Flash FX
  const flashEl = document.getElementById('shutter-flash');
  if (flashEl) {
    flashEl.classList.remove('hidden');
    requestAnimationFrame(() => flashEl.classList.add('active'));
    setTimeout(() => {
      flashEl.classList.remove('active');
      setTimeout(() => flashEl.classList.add('hidden'), 250);
    }, 280);
  }

  // 2. Hide 2D HTML overlays to capture clean 3D miniature diorama
  const labels = document.getElementById('labels-layer');
  const bubbles = document.getElementById('bubbles-layer');
  const ticker = document.getElementById('chat-ticker');
  const prevLabels = labels ? labels.style.display : '';
  const prevBubbles = bubbles ? bubbles.style.display : '';
  const prevTicker = ticker ? ticker.style.display : '';

  if (labels) labels.style.display = 'none';
  if (bubbles) bubbles.style.display = 'none';
  if (ticker) ticker.style.display = 'none';

  // Force high-quality synchronous frame render
  renderer.render(scene, camera);
  const dataUrl = renderer.domElement.toDataURL('image/png');

  if (labels) labels.style.display = prevLabels;
  if (bubbles) bubbles.style.display = prevBubbles;
  if (ticker) ticker.style.display = prevTicker;

  currentPolaroidDataUrl = dataUrl;

  // 3. Populate Polaroid metadata & quote
  const quote = currentSceneQuote || (allLines && allLines.length > 0
    ? allLines[Math.floor(Math.random() * allLines.length)]
    : { character: 'Friends', text: "I'll be there for you...", translation: "因为你也是这样陪着我" });
  currentPolaroidQuote = quote;

  const imgEl = document.getElementById('polaroid-img');
  if (imgEl) imgEl.src = dataUrl;

  const sealEl = document.getElementById('polaroid-seal');
  if (sealEl) {
    sealEl.textContent = currentLocation === 'monica' ? "MONICA'S APT 20" : "CENTRAL PERK";
  }

  const quoteEl = document.getElementById('polaroid-quote');
  if (quoteEl) {
    quoteEl.textContent = `"${quote.text}"`;
  }

  const transEl = document.getElementById('polaroid-trans');
  if (transEl) {
    transEl.textContent = quote.translation || quote.character;
  }

  const stampEl = document.getElementById('polaroid-stamp');
  if (stampEl) {
    const d = new Date();
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    stampEl.textContent = `NYC · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} · S01-S10`;
  }

  // Show Modal & Overlay
  closeAllPanels();
  document.getElementById('polaroid-modal')?.classList.remove('hidden');
  document.getElementById('panel-overlay')?.classList.remove('hidden');
  flash('📸 咔嚓！3D 微缩瞬间已拍立得定格');
}

function downloadPolaroidCard() {
  if (!currentPolaroidDataUrl) {
    flash('⚠️ 暂无拍摄内容');
    return;
  }

  const cardW = 1000;
  const cardH = 1250;
  const c = document.createElement('canvas');
  c.width = cardW;
  c.height = cardH;
  const ctx = c.getContext('2d');

  // Background creamy vintage card paper
  ctx.fillStyle = '#faf7f2';
  ctx.fillRect(0, 0, cardW, cardH);

  // Subtle paper inner border
  ctx.strokeStyle = '#e6ddcf';
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, cardW - 24, cardH - 24);

  // Draw 3D Photo
  const img = new Image();
  img.onload = () => {
    const photoX = 60;
    const photoY = 60;
    const photoW = 880;
    const photoH = 740;

    // Dark photo frame background
    ctx.fillStyle = '#1e1610';
    ctx.fillRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);

    // Cover crop the snapshot into 4:3 frame
    const imgAspect = img.width / img.height;
    const targetAspect = photoW / photoH;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (imgAspect > targetAspect) {
      sw = img.height * targetAspect;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / targetAspect;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

    // Badge Seal in Photo Top Right
    const sealText = currentLocation === 'monica' ? "MONICA'S APARTMENT · APT 20" : "CENTRAL PERK · GREENWICH VILLAGE";
    ctx.save();
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const textWidth = ctx.measureText(sealText).width;
    const sealW = textWidth + 32;
    const sealH = 38;
    const sealX = photoX + photoW - sealW - 20;
    const sealY = photoY + 20;
    ctx.fillStyle = 'rgba(28, 16, 10, 0.85)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(sealX, sealY, sealW, sealH, 8);
    else ctx.rect(sealX, sealY, sealW, sealH);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 209, 128, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ffd180';
    ctx.fillText(sealText, sealX + 16, sealY + 26);
    ctx.restore();

    // Polaroid Bottom Area Quote
    const quote = currentPolaroidQuote || { character: 'Friends', text: "I'll be there for you...", translation: "因为你也是这样陪着我" };

    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#26170f';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    const maxTextW = 840;
    let quoteStr = `"${quote.text}"`;
    if (ctx.measureText(quoteStr).width > maxTextW) {
      const words = quoteStr.split(' ');
      let line1 = '', line2 = '';
      for (const w of words) {
        if (ctx.measureText(line1 + w + ' ').width < maxTextW && !line2) {
          line1 += w + ' ';
        } else {
          line2 += w + ' ';
        }
      }
      ctx.fillText(line1.trim(), cardW / 2, 875);
      ctx.fillText(line2.trim(), cardW / 2, 915);
    } else {
      ctx.fillText(quoteStr, cardW / 2, 895);
    }

    // Chinese Translation
    if (quote.translation) {
      ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif';
      ctx.fillStyle = '#7a513d';
      ctx.fillText(quote.translation, cardW / 2, 960);
    }

    // Dashed Divider
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#d5c8b5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(70, 1030);
    ctx.lineTo(cardW - 70, 1030);
    ctx.stroke();
    ctx.setLineDash([]);

    // Bottom Footer Date Stamp
    const d = new Date();
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    const dateStamp = `NYC · MANHATTAN · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

    ctx.textAlign = 'left';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#a67c52';
    ctx.fillText(dateStamp, 70, 1110);

    // F·R·I·E·N·D·S Classic Logo with colored dots
    const letters = ['F', 'R', 'I', 'E', 'N', 'D', 'S'];
    const dotColors = ['#e85d5d', '#4a90e2', '#f5a623', '#e85d5d', '#4a90e2', '#f5a623'];
    ctx.font = '900 24px "Courier New", Courier, monospace';
    
    let totalLogoW = 0;
    letters.forEach((l, idx) => {
      totalLogoW += ctx.measureText(l).width + (idx < letters.length - 1 ? 16 : 0);
    });
    
    let drawX = (cardW - 70) - totalLogoW;
    ctx.textAlign = 'left';
    letters.forEach((l, idx) => {
      ctx.fillStyle = '#26170f';
      ctx.fillText(l, drawX, 1110);
      drawX += ctx.measureText(l).width;
      if (idx < dotColors.length) {
        ctx.fillStyle = dotColors[idx];
        ctx.beginPath();
        ctx.arc(drawX + 8, 1110 - 7, 4, 0, Math.PI * 2);
        ctx.fill();
        drawX += 16;
      }
    });

    ctx.restore();

    // Export to Blob & Auto Download
    c.toBlob(blob => {
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = `Friends_${currentLocation === 'monica' ? 'Monica_Apt' : 'Central_Perk'}_Polaroid_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      flash('💾 拍立得纪念卡片已成功保存为高清 PNG！');
    }, 'image/png');
  };
  img.src = currentPolaroidDataUrl;
}

function flash(msg) {
  const el = document.querySelector('.flash-msg');
  if (!el) return;
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2300);
}

// ==================== UI BINDINGS & BOOTSTRAP ====================
function bindUIEvents() {
  const panelOverlay = document.getElementById('panel-overlay');

  document.getElementById('scene-switch-btn')?.addEventListener('click', switchDioramaScene);
  document.getElementById('sound-toggle')?.addEventListener('click', () => SoundEngine.toggleMute());
  document.getElementById('time-toggle')?.addEventListener('click', () => {
    SoundEngine.playSFX('pop');
    cycleTimeOfDay();
  });
  document.getElementById('pixel-toggle')?.addEventListener('click', () => {
    SoundEngine.playSFX('pop');
    toggleRetroPixelMode();
  });

  // Unlock Web Audio & SpeechSynthesis on first user pointer interaction anywhere
  window.addEventListener('pointerdown', () => SoundEngine.unlock(), { once: true });

  // Zoom Slider & Step Buttons (远观微缩岛 <-> 放大看人物)
  const zoomSlider = document.getElementById('zoom-slider');
  zoomSlider?.addEventListener('input', e => {
    applyZoomSliderValue(parseInt(e.target.value));
  });
  document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
    const next = Math.min(100, parseInt(zoomSlider.value) + 18);
    zoomSlider.value = next;
    applyZoomSliderValue(next);
  });
  document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
    const next = Math.max(15, parseInt(zoomSlider.value) - 18);
    zoomSlider.value = next;
    applyZoomSliderValue(next);
  });

  // Scenario Chips & Custom Topic Form (Feature #4)
  document.querySelectorAll('.topic-chip').forEach(chip => {
    chip.addEventListener('click', () => triggerScenario(chip.dataset.scenario));
  });
  document.getElementById('custom-topic-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('custom-topic-input');
    if (input && input.value.trim()) {
      handleCustomUserTopic(input.value);
      input.value = '';
    }
  });

  document.getElementById('search-btn')?.addEventListener('click', () => {
    closeAllPanels();
    document.getElementById('search-overlay').classList.remove('hidden');
    panelOverlay.classList.remove('hidden');
    document.getElementById('search-input').focus();
  });
  document.getElementById('search-close')?.addEventListener('click', closeAllPanels);

  document.getElementById('vocab-btn')?.addEventListener('click', () => {
    closeAllPanels();
    renderVocab();
    document.getElementById('vocab-overlay').classList.remove('hidden');
    panelOverlay.classList.remove('hidden');
  });
  document.getElementById('vocab-close')?.addEventListener('click', closeAllPanels);
  document.getElementById('vocab-clear')?.addEventListener('click', () => {
    vocabWords.clear();
    saveVocab();
    renderVocab();
  });

  document.getElementById('ref-btn')?.addEventListener('click', () => {
    closeAllPanels();
    document.getElementById('ref-overlay').classList.remove('hidden');
    panelOverlay.classList.remove('hidden');
  });
  document.getElementById('ref-close')?.addEventListener('click', closeAllPanels);

  // Polaroid Snapshot & Download Controls
  document.getElementById('polaroid-btn')?.addEventListener('click', takePolaroidSnapshot);
  document.getElementById('polaroid-close')?.addEventListener('click', closeAllPanels);
  document.getElementById('polaroid-download')?.addEventListener('click', downloadPolaroidCard);
  document.getElementById('polaroid-retake')?.addEventListener('click', () => {
    closeAllPanels();
    setTimeout(takePolaroidSnapshot, 260);
  });

  panelOverlay?.addEventListener('click', closeAllPanels);
  document.getElementById('big-quote-close')?.addEventListener('click', closeDialogueCard);
  document.getElementById('big-quote')?.addEventListener('click', e => {
    if (e.target.id === 'big-quote') closeDialogueCard();
  });
  document.getElementById('bq-speak')?.addEventListener('click', () => {
    if (currentSceneQuote) {
      SoundEngine.speakLine(currentSceneQuote.character, currentSceneQuote.text, true);
    }
  });
  document.getElementById('bq-replay')?.addEventListener('click', () => {
    const q = currentSceneQuote;
    closeDialogueCard();
    playConversationScene(q);
  });

  document.getElementById('chat-ticker')?.addEventListener('click', () => {
    if (currentSceneQuote) openDialogueCard(currentSceneQuote);
  });

  document.querySelectorAll('.cam-btn[data-cam]').forEach(btn => {
    btn.addEventListener('click', () => {
      SoundEngine.playSFX('pop');
      setCameraPreset(btn.dataset.cam);
    });
  });

  document.querySelectorAll('.char-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      SoundEngine.playSFX('pop');
      focusCharacter(pill.dataset.char);
    });
  });

  // Collapsible Bottom Capsule Dock Controller
  const dockTabs = document.querySelectorAll('.dock-tab-btn[data-dock-tab]');
  const dockPanels = document.querySelectorAll('.dock-panel[data-panel]');
  const dockToggleAllBtn = document.getElementById('dock-toggle-all');
  const dockToggleIcon = document.getElementById('dock-toggle-icon');
  const dockToggleText = document.getElementById('dock-toggle-text');
  let dockAllExpanded = false;

  function syncDockToggleAllLabel() {
    const anyOpen = Array.from(dockPanels).some(p => !p.classList.contains('hidden'));
    const allOpen = Array.from(dockPanels).every(p => !p.classList.contains('hidden'));
    dockAllExpanded = allOpen;
    if (dockToggleAllBtn) dockToggleAllBtn.classList.toggle('active', anyOpen);
    if (dockToggleIcon) dockToggleIcon.textContent = anyOpen ? '▾' : '▴';
    if (dockToggleText) dockToggleText.textContent = anyOpen ? '收起面板' : '全部展开';
  }

  dockTabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.stopPropagation();
      SoundEngine.playSFX('pop');
      const targetKey = tab.dataset.dockTab;
      const targetPanel = document.querySelector(`.dock-panel[data-panel="${targetKey}"]`);
      if (!targetPanel) return;

      const isCurrentlyOpen = !targetPanel.classList.contains('hidden') && !dockAllExpanded;
      // Close all panels first, then open only the clicked one (unless toggling it off)
      dockPanels.forEach(p => p.classList.add('hidden'));
      dockTabs.forEach(t => t.classList.remove('active'));

      if (!isCurrentlyOpen) {
        targetPanel.classList.remove('hidden');
        tab.classList.add('active');
        if (targetKey === 'topic') {
          setTimeout(() => document.getElementById('custom-topic-input')?.focus(), 80);
        }
      }
      syncDockToggleAllLabel();
    });
  });

  dockToggleAllBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const anyOpen = Array.from(dockPanels).some(p => !p.classList.contains('hidden'));
    if (anyOpen) {
      // Collapse everything back into the minimalist capsule
      dockPanels.forEach(p => p.classList.add('hidden'));
      dockTabs.forEach(t => t.classList.remove('active'));
    } else {
      // Expand all three drawers
      dockPanels.forEach(p => p.classList.remove('hidden'));
      dockTabs.forEach(t => t.classList.add('active'));
    }
    syncDockToggleAllLabel();
  });

  // Clicking on the 3D canvas gently auto-collapses open single drawers so the view stays clean
  document.getElementById('voxel-canvas')?.addEventListener('pointerdown', () => {
    if (!dockAllExpanded) {
      dockPanels.forEach(p => p.classList.add('hidden'));
      dockTabs.forEach(t => t.classList.remove('active'));
      syncDockToggleAllLabel();
    }
  });

  document.getElementById('search-input')?.addEventListener('input', handleSearch);
  const seasonFilter = document.getElementById('season-filter');
  const episodeFilter = document.getElementById('episode-filter');
  [...new Set(allLines.map(l => l.season))].sort((a, b) => a - b).forEach(s => {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = `第 ${s} 季`;
    seasonFilter.appendChild(o);
  });
  seasonFilter?.addEventListener('change', () => {
    episodeFilter.innerHTML = '<option value="">全部集 (Episode)</option>';
    const s = seasonFilter.value;
    if (s) {
      [...new Set(allLines.filter(l => l.season === parseInt(s)).map(l => l.episode))].sort((a, b) => a - b).forEach(e => {
        const o = document.createElement('option');
        o.value = e;
        o.textContent = `第 ${e} 集`;
        episodeFilter.appendChild(o);
      });
    }
    handleSearch();
  });
  episodeFilter?.addEventListener('change', handleSearch);

  const hotContainer = document.getElementById('hot-searches');
  const qs = ['we were on a break', 'how you doin', 'pivot', 'smelly cat', 'lobster', 'unagi', "doesn't share food"];
  hotContainer.innerHTML = qs.map(q => `<button class="hot-tag" data-query="${q}">${q}</button>`).join('');
  hotContainer.querySelectorAll('.hot-tag').forEach(b => {
    b.addEventListener('click', () => {
      document.getElementById('search-input').value = b.dataset.query;
      handleSearch();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllPanels();
  });
}

async function init() {
  await loadData();
  buildSearchIndex();
  loadVocab();
  try {
    initThreeScene();
  } catch (err) {
    console.error('Failed to initialize 3D scene:', err);
  }
  try {
    bindUIEvents();
  } catch (err) {
    console.error('Failed to bind UI events:', err);
  }
  if (allLines.length > 0) {
    try {
      playConversationScene(allLines[0]);
    } catch (err) {
      console.error('Failed to play initial scene:', err);
    }
  }
}

init();
