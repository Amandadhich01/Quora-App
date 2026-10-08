@echo off
title ChatSphere (WhatsApp CRUD Clone)
echo ======================================================================
echo    Starting ChatSphere Web Application (Node.js / Express)
echo ======================================================================
echo.
echo Opening browser at http://localhost:8080 ...
cd /d "%~dp0"
timeout /t 2 >nul
start "" "http://localhost:8080/chats"
node index.js
pause
