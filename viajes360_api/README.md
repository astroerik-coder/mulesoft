# Servicios Mock para MuleSoft - Viajes360

Servicios mock para el proyecto de orquestación "Viajes 360" en MuleSoft.

## Estructura del Proyecto

```
viajes360_api/
├── app.py                          # Punto de entrada principal
├── config.py                       # Configuración general
├── database.py                     # Inicialización de SQLAlchemy
├── requirements.txt
│
├── vuelos/                         # Servicio Mock de Aerolínea
│   ├── __init__.py
│   ├── models.py                   # Modelo ReservaVuelo
│   ├── routes.py                   # Rutas: reservar, cancelar
│
├── hoteles/                        # Servicio Mock de Hotel
│   ├── __init__.py
│   ├── models.py                   # Modelo ReservaHotel
│   ├── routes.py                   # Rutas: reservar, cancelar
│
├── pagos/                          # Servicio Mock de Pago
│   ├── __init__.py
│   ├── models.py                   # Modelo Pago
│   ├── routes.py                   # Ruta: procesar_pago
│
├── SERVICIOS_MOCK_MULESOFT.md      # Documentación para MuleSoft
└── README.md
```

## Servicios Mock

- **Vuelos**: Gestión de reservas de vuelos (reservar/cancelar)
- **Hoteles**: Gestión de reservas de hoteles (reservar/cancelar)
- **Pagos**: Procesamiento de pagos (falla si monto > 1000)

## Instalación

```bash
pip install -r requirements.txt
```

## Uso

```bash
python app.py
```

El servidor estará disponible en: `http://127.0.0.1:5000`

## Para MuleSoft

Estos servicios están listos para ser consumidos por tu orquestador MuleSoft. 

Ver documentación completa en: `SERVICIOS_MOCK_MULESOFT.md`

## Endpoints Disponibles

- `POST /api/vuelos/reservar` - Reservar vuelo
- `POST /api/vuelos/cancelar` - Cancelar vuelo
- `POST /api/hoteles/reservar` - Reservar hotel  
- `POST /api/hoteles/cancelar` - Cancelar hotel
- `POST /api/pagos/procesar` - Procesar pago

## Pruebas

```bash
python test_api.py
```
