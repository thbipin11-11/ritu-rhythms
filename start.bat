@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  echo Install Node.js 18 or newer, then run this file again.
  pause
  exit /b 1
)
start "Ritu Rhythms" cmd /k "node server.js"
timeout /t 2 >nul
start "" http://localhost:3000/
