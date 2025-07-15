# 🔧 Troubleshooting - Problema npm en Frontend Viajes 360

## Problema Detectado

npm está buscando `package.json` en el directorio padre incorrecto (`C:\Users\dieho\Documents\Viajes\`) en lugar del directorio actual del proyecto.

## ✅ Soluciones Paso a Paso

### Solución 1: Verificar Directorio Actual

```powershell
# 1. Abrir PowerShell/Terminal
# 2. Navegar al directorio correcto
cd "C:\Users\dieho\Documents\Viajes\FrontendViajes\viajes360-frontend"

# 3. Verificar que estás en el directorio correcto
ls package.json
# Debería mostrar el archivo package.json

# 4. Intentar ejecutar
npm run dev
```

### Solución 2: Usar el Script Batch

```batch
# Ejecutar el archivo batch creado
start-frontend.bat
```

### Solución 3: Métodos Alternativos

```powershell
# Método A: Con npx
npx next dev

# Método B: Ejecutar directamente
.\node_modules\.bin\next dev

# Método C: Con PowerShell específico
& npm run dev

# Método D: Con ruta completa
npm --prefix "C:\Users\dieho\Documents\Viajes\FrontendViajes\viajes360-frontend" run dev
```

### Solución 4: Reinstalar Dependencias

```powershell
# 1. Eliminar node_modules y package-lock.json
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force

# 2. Limpiar caché de npm
npm cache clean --force

# 3. Reinstalar
npm install

# 4. Ejecutar
npm run dev
```

### Solución 5: Usar Yarn como Alternativa

```powershell
# 1. Instalar yarn (si no está instalado)
npm install -g yarn

# 2. Instalar dependencias con yarn
yarn install

# 3. Ejecutar con yarn
yarn dev
```

## 🚀 Métodos de Ejecución Manual

Si npm continúa fallando, puedes ejecutar Next.js manualmente:

### Método 1: Node.js Directo
```powershell
node node_modules\next\dist\bin\next dev
```

### Método 2: Con Script Personalizado

Crear archivo `run-dev.js`:
```javascript
const { spawn } = require('child_process');
const path = require('path');

const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next');
const child = spawn(nextPath, ['dev'], { 
    stdio: 'inherit',
    cwd: __dirname 
});

child.on('close', (code) => {
    console.log(`Proceso terminado con código ${code}`);
});
```

Ejecutar: `node run-dev.js`

## 📝 Verificaciones Importantes

### 1. Verificar Estructura del Proyecto
```
viajes360-frontend/
├── package.json ✓
├── next.config.ts ✓
├── src/
│   ├── app/
│   │   └── page.tsx ✓
│   ├── components/ ✓
│   └── types/ ✓
└── node_modules/ ✓
```

### 2. Verificar package.json
```json
{
  "name": "viajes360-frontend",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

### 3. Verificar Variables de Entorno
```env
# .env.local (opcional)
NEXT_PUBLIC_MULESOFT_URL=http://localhost:8081/api/v1
NEXT_PUBLIC_MOCK_API_URL=http://localhost:5000/api
```

## 🆘 Si Nada Funciona

### Plan B: Usar Visual Studio Code

```powershell
# 1. Abrir VS Code en el directorio del proyecto
code "C:\Users\dieho\Documents\Viajes\FrontendViajes\viajes360-frontend"

# 2. Abrir terminal integrado de VS Code (Ctrl + `)

# 3. El terminal de VS Code debería estar en el directorio correcto

# 4. Ejecutar npm run dev desde el terminal de VS Code
```

### Plan C: Recrear Proyecto

Si todo falla, el código fuente está intacto. Puedes:

1. Crear nuevo proyecto Next.js: `npx create-next-app@latest new-viajes360`
2. Copiar archivos `src/` del proyecto actual al nuevo
3. Copiar `package.json` personalizado
4. Ejecutar `npm install` en el nuevo proyecto

## 📞 Estado Actual

- ✅ **Código fuente**: Completamente funcional
- ✅ **Estructura**: Correcta
- ✅ **Dependencias**: Instaladas
- ❌ **npm run dev**: Problema de directorio
- ✅ **Alternativas**: Múltiples opciones disponibles

## 🎯 Resultado Esperado

Una vez resuelto, deberías ver:

```
> viajes360-frontend@0.1.0 dev
> next dev --turbopack

  ▲ Next.js 15.3.5
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

Y el frontend estará disponible en `http://localhost:3000` con toda la funcionalidad del laboratorio "Viajes 360".
