@echo off
echo Iniciando Frontend Viajes 360...
echo.

REM Navegar al directorio correcto
cd /d "C:\Users\dieho\Documents\Viajes\FrontendViajes\viajes360-frontend"

echo Directorio actual: %CD%
echo.

REM Verificar que existe package.json
if exist package.json (
    echo ✓ package.json encontrado
) else (
    echo ✗ package.json no encontrado
    pause
    exit /b 1
)

echo.
echo Ejecutando servidor de desarrollo...
echo El frontend estará disponible en: http://localhost:3000
echo.

REM Intentar diferentes métodos para ejecutar el servidor
echo Método 1: npm run dev
npm run dev

if %ERRORLEVEL% neq 0 (
    echo.
    echo Método 1 falló, intentando método 2: npx next dev
    npx next dev
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo Método 2 falló, intentando método 3: node_modules\.bin\next dev
    node_modules\.bin\next dev
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo Todos los métodos fallaron. Por favor revisa la instalación.
    echo.
    echo Comandos para reinstalar:
    echo 1. npm install
    echo 2. npm run dev
    pause
)

pause
