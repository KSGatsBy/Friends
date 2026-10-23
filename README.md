# Friends · Central Perk

## 这是什么
一个横屏打开就能待着的老友记咖啡馆。
没有任务、没有进度条、没有"学英语"的压迫感。
暖光、咖啡蒸汽、六个老朋友坐在沙发上聊天，台词气泡随机飘出来。
你可以点他们玩，可以搜一句台词，也可以就开着它当背景页。

## 设计原则
- 氛围第一：打开就像走进 Central Perk，而不是打开一个 App
- 审美优先：配色、光影、动效都服务于"温暖松弛"
- 学习是彩蛋，不是功能：搜索、生词本藏在角落，想用才用
- 纯前端：无后端，一个文件夹双击就能跑

## 技术栈
- HTML + Tailwind CSS（CDN）+ 原生 JavaScript
- CSS 动画实现所有动效
- 数据：data/friends_lines.json
- 数据存储：localStorage
- 搜索：FlexSearch（CDN）

## 文件结构
Friends/
├── index.html
├── app.js
├── styles.css
├── data/
│   └── friends_lines.json
└── README.md

## 场景构成
- 横屏咖啡馆：橙色沙发、木桌、咖啡杯、砖墙、吊灯
- 沙发上六个主角：Ross、Rachel、Monica、Chandler、Joey、Phoebe
- 背景随时间变化：白天 → 黄昏 → 夜晚，灯光渐亮

## 动效
- 咖啡杯蒸汽缓缓上升
- 吊灯轻微摇曳
- 主角头顶对话气泡自动轮播，3 秒切换
- 窗外天色渐变

## 交互
- 点任意主角 → 他/她说一句经典台词
- 点咖啡杯 → 蒸汽加强
- 右上角小图标 → 展开搜索（彩蛋功能）
- 点单词 → 显示释义（后续）

## 内容
台词数据来自老友记全十季，每条带：季集、时间戳、角色、台词原文、上下文。

## 主角台词
- Ross: "We were on a break!"
- Joey: "How you doin'?"
- Chandler: "Could I BE any more...?"
- Phoebe: "Smelly cat, smelly cat..."
- Monica: "I know!"
- Rachel: "You're over me? When were you... under me?"

## 待做
- [x] 主场景布局 + 六主角座位
- [x] 对话气泡自动轮播
- [x] 蒸汽/灯光动画
- [x] 点击角色互动
- [x] 搜索入口（低调）
- [x] 时间/天气变化
- [ ] 真实全十季台词数据导入
- [ ] 点词查释义
- [ ] 收藏台词
- [ ] 部署到 GitHub Pages