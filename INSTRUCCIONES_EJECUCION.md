# Guía de Ejecución - Proyecto Viajes 360

Este documento proporciona instrucciones paso a paso para ejecutar el proyecto completo del laboratorio "Viajes 360".

## 📋 Prerrequisitos

- **Node.js 18+** (para el frontend Next.js)
- **Python 3.8+** (para los servicios mock)
- **MuleSoft Anypoint Studio** (para el orquestador)
- **Git** (para clonar el repositorio)

## 🚀 Pasos de Instalación y Ejecución

### 1. Servicios Mock (Backend Python Flask)

```bash
# Navegar al directorio de la API
cd viajes360_api

# Crear entorno virtual (recomendado)
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar los servicios mock
python app.py
```

**Verificación:** Los servicios estarán disponibles en `http://localhost:5000`

### 2. Orquestador MuleSoft

```bash
# 1. Abrir MuleSoft Anypoint Studio
# 2. Importar/crear el proyecto de orquestación
# 3. Configurar los conectores HTTP para llamar a los servicios mock
# 4. Implementar la lógica de orquestación según la especificación
# 5. Ejecutar el proyecto MuleSoft
```

**Configuración de endpoints en MuleSoft:**
- Servicios Mock: `http://localhost:5000/api/`
- Endpoint del orquestador: `http://localhost:8081/api/v1/reservas`

### 3. Frontend Next.js

```bash
# Navegar al directorio del frontend
cd FrontendViajes/viajes360-frontend

# Instalar dependencias
npm install

# Crear archivo de configuración (opcional)
cp .env.example .env.local
# Editar .env.local si es necesario

# Ejecutar en modo desarrollo
npm run dev
```

**Verificación:** La aplicación estará disponible en `http://localhost:3000`

## 🔧 Configuración de URLs

### Configuración por Defecto

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend Next.js | http://localhost:3000 | 3000 |
| Orquestador MuleSoft | http://localhost:8081/api/v1 | 8081 |
| Servicios Mock Python | http://localhost:5000/api | 5000 |

### Variables de Entorno Frontend

Editar `FrontendViajes/viajes360-frontend/.env.local`:

```env
NEXT_PUBLIC_MULESOFT_URL=http://localhost:8081/api/v1
NEXT_PUBLIC_MOCK_API_URL=http://localhost:5000/api
```

## 🧪 Casos de Prueba

### Caso 1: Reserva Exitosa

**Datos de prueba:**
```json
{
  "cliente": "Ana Torres",
  "vuelo_destino": "Madrid",
  "hotel_nombre": "Hotel Central",
  "monto_total": 850.00
}
```

**Resultado esperado:**
- Status 200 OK
- Número de confirmación generado
- Todos los servicios ejecutados correctamente

### Caso 2: Error y Compensación

**Datos de prueba:**
```json
{
  "cliente": "Juan Pérez",
  "vuelo_destino": "Barcelona", 
  "hotel_nombre": "Hotel Plaza",
  "monto_total": 1200.00
}
```

**Resultado esperado:**
- Status 500 Internal Server Error
- Mensaje de error claro
- Compensación ejecutada (rollback de vuelo y hotel)

## 🛠️ Troubleshooting

### Problema: Frontend no conecta con MuleSoft

**Solución:**
1. Verificar que MuleSoft esté ejecutándose en el puerto 8081
2. Comprobar configuración CORS en MuleSoft
3. Verificar URL en `src/config/api.ts`

### Problema: Servicios Mock no responden

**Solución:**
1. Verificar que Python Flask esté ejecutándose
2. Comprobar puerto 5000 no esté ocupado
3. Revisar logs de la consola Python

### Problema: Error de CORS

**Solución en MuleSoft:**
```xml
<http:response-builder>
    <http:headers>
        <![CDATA[#[{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }]]]>
    </http:headers>
</http:response-builder>
```

## 📊 Monitoreo y Logs

### Logs del Frontend
```bash
# En el directorio del frontend
npm run dev
# Los logs aparecerán en la consola y en el navegador (DevTools)
```

### Logs de MuleSoft
- Revisar console de Anypoint Studio
- Verificar logs en la carpeta `logs/` del proyecto

### Logs de Python Flask
```bash
# Los logs aparecen en la consola donde se ejecutó app.py
python app.py
```

## 🔍 Verificación del Flujo Completo

1. **Iniciar servicios en orden:**
   - Servicios Mock (Puerto 5000)
   - Orquestador MuleSoft (Puerto 8081)
   - Frontend Next.js (Puerto 3000)

2. **Probar casos de éxito y error:**
   - Reserva con monto ≤ €1000 (éxito)
   - Reserva con monto > €1000 (error + compensación)

3. **Verificar respuestas:**
   - Status codes correctos
   - Mensajes apropiados
   - Números de confirmación
   - Lógica de compensación

## 📚 Recursos Adicionales

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación MuleSoft](https://docs.mulesoft.com/)
- [Documentación Flask](https://flask.palletsprojects.com/)
- [Especificación del Laboratorio](../viajes360_api/README.md)

---

**¡Importante!** Asegúrate de ejecutar todos los servicios en el orden especificado para que el flujo completo funcione correctamente.
