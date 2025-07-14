# 🚀 SERVICIOS MOCK PARA MULESOFT - VIAJES 360

## 📊 RESUMEN

Estos son los **servicios mock** que debes consumir desde MuleSoft para crear el orquestador del proyecto "Viajes 360".

**Servidor corriendo en**: `http://127.0.0.1:5000`

---

## 🎯 SERVICIOS MOCK DISPONIBLES

### ✈️ **1. SERVICIO DE AEROLÍNEA**

#### **Reservar Vuelo**
```
POST http://127.0.0.1:5000/api/vuelos/reservar
Content-Type: application/json

{
    "cliente": "Ana Torres",
    "vuelo_destino": "Madrid"
}
```

**Respuesta Exitosa (200):**
```json
{
    "mensaje": "Vuelo reservado",
    "reserva_id": 1
}
```

#### **Cancelar Vuelo**
```
POST http://127.0.0.1:5000/api/vuelos/cancelar
Content-Type: application/json

{
    "reserva_id": 1
}
```

**Respuesta Exitosa (200):**
```json
{
    "mensaje": "Vuelo cancelado"
}
```

**Respuesta Error (404):**
```json
{
    "error": "Reserva no encontrada"
}
```

---

### 🏨 **2. SERVICIO DE HOTEL**

#### **Reservar Hotel**
```
POST http://127.0.0.1:5000/api/hoteles/reservar
Content-Type: application/json

{
    "cliente": "Ana Torres",
    "hotel_nombre": "Hotel Central"
}
```

**Respuesta Exitosa (200):**
```json
{
    "mensaje": "Hotel reservado",
    "reserva_id": 1
}
```

#### **Cancelar Hotel**
```
POST http://127.0.0.1:5000/api/hoteles/cancelar
Content-Type: application/json

{
    "reserva_id": 1
}
```

**Respuesta Exitosa (200):**
```json
{
    "mensaje": "Hotel cancelado"
}
```

**Respuesta Error (404):**
```json
{
    "error": "Reserva no encontrada"
}
```

---

### 💳 **3. SERVICIO DE PAGOS**

#### **Procesar Pago**
```
POST http://127.0.0.1:5000/api/pagos/procesar
Content-Type: application/json

{
    "cliente": "Ana Torres",
    "monto_total": 850.00
}
```

**Respuesta Exitosa (200) - monto ≤ 1000:**
```json
{
    "mensaje": "Pago procesado",
    "pago_id": 1
}
```

**Respuesta Error (500) - monto > 1000:**
```json
{
    "error": "Monto demasiado alto. Pago rechazado."
}
```

---

## 🔧 **CONFIGURACIÓN PARA MULESOFT**

### **Información de Conexión:**
- **Host**: `127.0.0.1`
- **Puerto**: `5000`
- **Protocolo**: `HTTP`
- **Content-Type**: `application/json`

### **Endpoints para HTTP Request Connector:**
- Aerolínea Reservar: `/api/vuelos/reservar`
- Aerolínea Cancelar: `/api/vuelos/cancelar`
- Hotel Reservar: `/api/hoteles/reservar`
- Hotel Cancelar: `/api/hoteles/cancelar`
- Pagos Procesar: `/api/pagos/procesar`

---

## 🎯 **FLUJO DEL ORQUESTADOR EN MULESOFT**

### **JSON de Entrada (desde API REST):**
```json
{
    "cliente": "Ana Torres",
    "vuelo_destino": "Madrid",
    "hotel_nombre": "Hotel Central",
    "monto_total": 850.00
}
```

### **Secuencia de Llamadas:**

1. **🔄 Transform Message**: Mapear datos para el servicio de vuelos
   ```
   {
       "cliente": payload.cliente,
       "vuelo_destino": payload.vuelo_destino
   }
   ```

2. **✈️ HTTP Request**: Llamar a `/api/vuelos/reservar`
   - **Variable**: `vuelo_reserva_id` = response.reserva_id

3. **🔄 Transform Message**: Mapear datos para el servicio de hoteles
   ```
   {
       "cliente": payload.cliente,
       "hotel_nombre": payload.hotel_nombre
   }
   ```

4. **🏨 HTTP Request**: Llamar a `/api/hoteles/reservar`
   - **Variable**: `hotel_reserva_id` = response.reserva_id

5. **🔄 Transform Message**: Mapear datos para el servicio de pagos
   ```
   {
       "cliente": payload.cliente,
       "monto_total": payload.monto_total
   }
   ```

6. **💳 HTTP Request**: Llamar a `/api/pagos/procesar`

### **Manejo de Errores (On Error Propagate):**

Si el pago falla, ejecutar compensación:

1. **🔄 Transform Message**: Preparar cancelación de hotel
   ```
   {
       "reserva_id": vars.hotel_reserva_id
   }
   ```

2. **🏨 HTTP Request**: Llamar a `/api/hoteles/cancelar`

3. **🔄 Transform Message**: Preparar cancelación de vuelo
   ```
   {
       "reserva_id": vars.vuelo_reserva_id
   }
   ```

4. **✈️ HTTP Request**: Llamar a `/api/vuelos/cancelar`

5. **📤 Set Payload**: Respuesta de error
   ```json
   {
       "error": "Transacción revertida. Pago rechazado.",
       "code": 500
   }
   ```

---

## 🧪 **CASOS DE PRUEBA**

### **✅ CASO EXITOSO:**
```json
{
    "cliente": "Ana Torres",
    "vuelo_destino": "Madrid",
    "hotel_nombre": "Hotel Central",
    "monto_total": 850.00
}
```
**Resultado**: Todo se reserva correctamente

### **❌ CASO CON ERROR (Compensación):**
```json
{
    "cliente": "Carlos Mendez",
    "vuelo_destino": "París",
    "hotel_nombre": "Hotel Luxury",
    "monto_total": 1500.00
}
```
**Resultado**: Error en pago → Cancelación automática de vuelo y hotel

---

## 📋 **CHECKLIST PARA MULESOFT**

- [ ] Crear proyecto MuleSoft nuevo
- [ ] Configurar API Kit Router con endpoint POST
- [ ] Implementar flujo principal con HTTP Request connectors
- [ ] Configurar variables para IDs de reserva
- [ ] Implementar On Error Propagate para compensación
- [ ] Configurar Transform Message components
- [ ] Probar caso exitoso
- [ ] Probar caso de error con compensación
- [ ] Documentar la arquitectura

---

## 🚀 **LISTO PARA USAR**

Los servicios mock están corriendo y listos para ser consumidos por MuleSoft. 

**Comando para iniciar los servicios:**
```bash
cd "c:\Users\dieho\Documents\viajes360_api"
python app.py
```

**Verificar que funcionen:**
```bash
python test_api.py
```

¡Ahora puedes crear tu orquestador en MuleSoft! 🎉
