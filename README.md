# Central Perk · 3D 咖啡馆微缩模型

受经典情景喜剧《老友记》中央咖啡馆与用户提供的微缩模型照片启发的原创 3D 网页场景。

## 如何运行

```bash
# 方法 1：Python
cd friends-cafe-3d
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000

# 方法 2：Node.js
cd friends-cafe-3d
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((r,s)=>{let f=path.join(__dirname,r.url==='/'?'/index.html':r.url.split('?')[0]);fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end('404')}else{s.writeHead(200);s.end(d)}})}).listen(8000,()=>console.log('http://localhost:8000'))"
```

## 操作方式

| 操作 | 桌面 | 手机 |
|------|------|------|
| 旋转视角 | 鼠标左键拖动 | 单指滑动 |
| 缩放 | 滚轮 | 双指捏合 |
| 平移 | 鼠标右键拖动 | 双指拖动 |
| 点击场景 | 沙发/吧台/舞台/壁炉 → 查看介绍卡片 | 同左 |
| 关闭卡片 | 按 Esc / 点 × 按钮 | 同左 |

## 视角预设

右上角面板提供：模型全景、正面视角、沙发近景、吧台视角、舞台视角、俯视图、重置视角。

同时也支持：开灯/关灯、自动旋转、全屏模式。

## 技术栈

- **Three.js 0.160**（ES Module，CDN unpkg）
- **OrbitControls**（同一版本）
- 所有几何体由代码生成（无外部 3D 模型文件）
- 程序化 CanvasTexture：砖墙、木纹、地毯、装饰画、霓虹招牌、菜单板
- ACESFilmicToneMapping + 真实阴影（PCFSoftShadowMap）
- Raycaster 点击交互

## 参考照片

`assets/reference-1.jpg` 和 `assets/reference-2.jpg` 是用户提供的微缩模型照片，仅作为设计参考存放于项目中。

## 风格化重建说明

当前模型属于风格化重建。单张或少量照片无法精确恢复被遮挡区域的完整三维信息，因此不可见部分（家具背面、吧台后方、墙体厚度等）根据整体咖啡馆风格进行了合理补全，以呈现一个完整的、可多角度观察的微缩模型场景。

## 文件结构

```
friends-cafe-3d/
├── index.html        # 入口 HTML + UI 面板
├── styles.css        # UI 样式
├── scene.js          # Three.js 完整 3D 场景
├── README.md
└── assets/
    ├── reference-1.jpg
    └── reference-2.jpg
```
