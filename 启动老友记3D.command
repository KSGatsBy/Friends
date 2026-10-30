#!/bin/bash
cd "$(dirname "$0")"

PORT=8080
# 如果 8080 端口已被占用，自动顺延寻找可用端口
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; do
  PORT=$((PORT + 1))
done

echo "===================================================="
echo " ☕ 正在启动《老友记》3D 微缩剧场 (Central Perk & Monica's Apt)"
echo " 🌐 访问地址: http://localhost:$PORT"
echo " 💡 关闭此终端窗口即可停止运行"
echo "===================================================="

# 延迟 1 秒自动在默认浏览器打开
(sleep 1 && open "http://localhost:$PORT") &

# 启动本地静态服务器
python3 -m http.server $PORT
