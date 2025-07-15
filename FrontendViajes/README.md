# Viajes 360 - Frontend

Frontend desarrollado en Next.js para el sistema de reservas "Viajes 360" que demuestra orquestación de servicios con MuleSoft.

## 🎯 Descripción del Proyecto

Este frontend es parte del laboratorio de **Orquestador de Reservas "Viajes 360"** que implementa:

- **Orquestación de servicios** con MuleSoft
- **Manejo de errores** y lógica de compensación
- **Servicios mock** para aerolínea, hotel y pagos
- **Interfaz de usuario** moderna y responsiva

## 🏗️ Arquitectura

```
Frontend (Next.js) → Orquestador (MuleSoft) → Servicios Mock (Python Flask)
```

### Flujo de Orquestación

1. **Reservar Vuelo**: Llamada al servicio de aerolínea
2. **Reservar Hotel**: Llamada al servicio de hoteles  
3. **Procesar Pago**: Llamada al servicio de pagos
4. **Confirmación/Compensación**: Respuesta final o rollback

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Servicios backend ejecutándose (MuleSoft + Python Flask)

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env.local`:

```env
# URL del orquestador MuleSoft
NEXT_PUBLIC_MULESOFT_URL=http://localhost:8081/api/v1

# URL de servicios mock (para pruebas directas)
NEXT_PUBLIC_MOCK_API_URL=http://localhost:5000/api
```

### Configuración de API

Editar `src/config/api.ts` para ajustar las URLs según tu entorno:

```typescript
export const API_CONFIG = {
  MULESOFT_ORCHESTRATOR: 'http://localhost:8081/api/v1',
  MOCK_SERVICES: {
    BASE_URL: 'http://localhost:5000/api'
  }
};
```

## 🧪 Casos de Prueba

### Caso Exitoso
- Monto ≤ €1000
- Todos los servicios responden correctamente
- Se genera número de confirmación

### Caso de Error (Compensación)
- Monto > €1000 
- El servicio de pagos falla intencionalmente
- Se ejecuta lógica de compensación:
  - Cancela reserva de vuelo
  - Cancela reserva de hotel
  - Retorna error 500

## 📁 Estructura del Proyecto

```
src/
├── app/
│   └── page.tsx              # Página principal
├── components/
│   ├── BookingForm.tsx       # Formulario de reserva
│   └── BookingResult.tsx     # Resultados de reserva
├── types/
│   └── booking.ts            # Tipos TypeScript
├── config/
│   └── api.ts               # Configuración de APIs
└── styles/
    └── globals.css          # Estilos globales
```

## 🎨 Características de la UI

- **Responsive Design**: Adaptable a móviles y desktop
- **Validación de Formularios**: Validación en tiempo real
- **Estados de Carga**: Indicadores visuales durante el procesamiento
- **Manejo de Errores**: Visualización clara de errores y compensaciones
- **Tema Moderno**: Diseño con Tailwind CSS

## 🔗 Integración con MuleSoft

### Endpoint Principal
```
POST /api/v1/reservas
```

### Formato de Petición
```json
{
  "cliente": "Ana Torres",
  "vuelo_destino": "Madrid", 
  "hotel_nombre": "Hotel Central",
  "monto_total": 850.00
}
```

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Reserva creada exitosamente",
  "confirmationNumber": "VJ360-2025-001",
  "details": {
    "vuelo": { "id": "VL001", "destino": "Madrid", "estado": "Confirmado" },
    "hotel": { "id": "HT001", "nombre": "Hotel Central", "estado": "Confirmado" },
    "pago": { "id": "PG001", "monto": 850.00, "estado": "Procesado" }
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Transacción revertida por fallo en el pago",
  "error": "Monto superior al límite permitido"
}
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **React Hooks**: Manejo de estado
- **Fetch API**: Comunicación HTTP

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
npm run type-check   # Verificación de tipos
```

## 🔍 Debugging

### Logs de Red
- Abrir DevTools → Network para ver peticiones HTTP
- Verificar respuestas del orquestador MuleSoft

### Estados de la Aplicación
- Usar React DevTools para inspeccionar el estado
- Console.log en `handleBookingSubmit` para debugging

## 📚 Documentación Adicional

- [Documentación MuleSoft](../viajes360_api/MULESOFT_SPECIFICATION.md)
- [Servicios Mock](../viajes360_api/README.md)
- [Especificación del Laboratorio](../viajes360_api/DOCUMENTACION_MULESOFT.md)

## 🤝 Contribución

Este es un proyecto educativo para demostrar conceptos de orquestación con MuleSoft. Las contribuciones son bienvenidas para mejorar la experiencia de aprendizaje.

---

**Proyecto:** Laboratorio Orquestador de Reservas "Viajes 360"  
**Tecnologías:** Next.js + MuleSoft + Python Flask  
**Autor:** [Tu Nombre]  
**Año:** 2025
