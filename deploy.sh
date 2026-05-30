#!/bin/bash
# deploy.sh — Script de deploy do Workspace Chat
# Uso: bash deploy.sh
# Deve ser executado no servidor (ns2.srdee.com.br) como root

set -e

APP_DIR="/home/._default_hostname/domains/ano.srdee.com.br/workspace-chat/workspace-chat"
SERVICE="ano-workspace"

echo "=== Deploy Workspace Chat ==="
echo ""

# 1. Pull
echo "[1/4] Atualizando código..."
cd "$APP_DIR"
git pull origin master

# 2. Install backend deps
echo "[2/4] Instalando dependências do backend..."
cd "$APP_DIR/server"
npm install --production

# 3. Build frontend (se houver alterações)
echo "[3/4] Build do frontend..."
cd "$APP_DIR/client"
npm install --production
npm run build

# 4. Restart
echo "[4/4] Reiniciando serviço..."
systemctl restart "$SERVICE"

echo ""
echo "=== Deploy concluído ==="
systemctl status "$SERVICE" --no-pager -l | head -5
