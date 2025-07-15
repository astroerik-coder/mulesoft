from flask import Flask, jsonify, request
from config import Config
from database import db
from flask_cors import CORS
import time
import random

# Importar rutas
from vuelos.routes import vuelos_bp
from hoteles.routes import hoteles_bp
from pagos.routes import pagos_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)  # Habilitar CORS para el frontend

# Registrar blueprints
app.register_blueprint(vuelos_bp, url_prefix='/api/vuelos')
app.register_blueprint(hoteles_bp, url_prefix='/api/hoteles')
app.register_blueprint(pagos_bp, url_prefix='/api/pagos')

@app.route('/')
def index():
    return {
        'message': 'API Viajes360 - Servicios Mock para MuleSoft',
        'version': '1.0.0',
        'servicios_mock': {
            'aerolinea': '/api/vuelos',
            'hotel': '/api/hoteles',
            'pagos': '/api/pagos'
        },
        'endpoints_adicionales': {
            'reservas': '/api/reservas',
            'tracking': '/api/tracking'
        },
        'nota': 'El orquestador se implementa en MuleSoft'
    }

@app.route('/api/reservas', methods=['GET'])
def obtener_reservas():
    """Obtener todas las reservas del sistema"""
    from vuelos.models import ReservaVuelo
    from hoteles.models import ReservaHotel
    from pagos.models import Pago
    
    try:
        # Obtener todas las reservas
        vuelos = ReservaVuelo.query.all()
        hoteles = ReservaHotel.query.all()
        pagos = Pago.query.all()
        
        # Formatear respuesta
        reservas = []
        
        # Agrupar reservas por cliente
        clientes_reservas = {}
        
        for vuelo in vuelos:
            if vuelo.cliente not in clientes_reservas:
                clientes_reservas[vuelo.cliente] = {
                    'cliente': vuelo.cliente,
                    'reservas': [],
                    'total_gastado': 0
                }
            
            reserva = {
                'id': f'RES-{vuelo.id}',
                'tipo': 'vuelo',
                'destino': vuelo.destino,
                'estado': vuelo.estado,
                'fecha_creacion': '2025-01-14',  # Simulado
                'detalles': {
                    'vuelo_id': vuelo.id,
                    'destino': vuelo.destino
                }
            }
            clientes_reservas[vuelo.cliente]['reservas'].append(reserva)
        
        for hotel in hoteles:
            if hotel.cliente not in clientes_reservas:
                clientes_reservas[hotel.cliente] = {
                    'cliente': hotel.cliente,
                    'reservas': [],
                    'total_gastado': 0
                }
            
            reserva = {
                'id': f'RES-H-{hotel.id}',
                'tipo': 'hotel',
                'hotel_nombre': hotel.hotel_nombre,
                'estado': hotel.estado,
                'fecha_creacion': '2025-01-14',
                'detalles': {
                    'hotel_id': hotel.id,
                    'nombre': hotel.hotel_nombre
                }
            }
            clientes_reservas[hotel.cliente]['reservas'].append(reserva)
        
        for pago in pagos:
            if pago.cliente not in clientes_reservas:
                clientes_reservas[pago.cliente] = {
                    'cliente': pago.cliente,
                    'reservas': [],
                    'total_gastado': 0
                }
            
            clientes_reservas[pago.cliente]['total_gastado'] += pago.monto
            
            # Agregar info de pago a la reserva correspondiente
            for reserva in clientes_reservas[pago.cliente]['reservas']:
                if 'pago' not in reserva['detalles']:
                    reserva['detalles']['pago'] = {
                        'id': pago.id,
                        'monto': pago.monto,
                        'estado': pago.estado
                    }
                    break
        
        return jsonify({
            'success': True,
            'reservas': list(clientes_reservas.values()),
            'total_clientes': len(clientes_reservas),
            'total_reservas': len(vuelos) + len(hoteles)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/tracking/<reserva_id>', methods=['GET'])
def tracking_reserva(reserva_id):
    """Obtener el tracking de una reserva específica"""
    import random
    
    # Simulación de tracking
    estados_tracking = [
        {
            'paso': 1,
            'titulo': 'Reserva Iniciada',
            'descripcion': 'Procesando solicitud de reserva',
            'estado': 'completado',
            'timestamp': '2025-01-14T10:00:00Z'
        },
        {
            'paso': 2,
            'titulo': 'Reserva de Vuelo',
            'descripcion': 'Confirmando disponibilidad de vuelo',
            'estado': 'completado',
            'timestamp': '2025-01-14T10:01:00Z'
        },
        {
            'paso': 3,
            'titulo': 'Reserva de Hotel',
            'descripcion': 'Confirmando disponibilidad de hotel',
            'estado': 'completado',
            'timestamp': '2025-01-14T10:02:00Z'
        },
        {
            'paso': 4,
            'titulo': 'Procesamiento de Pago',
            'descripcion': 'Verificando método de pago',
            'estado': 'en_proceso' if random.random() > 0.5 else 'completado',
            'timestamp': '2025-01-14T10:03:00Z'
        },
        {
            'paso': 5,
            'titulo': 'Confirmación Final',
            'descripcion': 'Generando confirmación de reserva',
            'estado': 'pendiente',
            'timestamp': None
        }
    ]
    
    return jsonify({
        'success': True,
        'reserva_id': reserva_id,
        'tracking': estados_tracking,
        'estado_actual': 'en_proceso',
        'progreso': 75
    })

@app.route('/api/reservas/crear', methods=['POST'])
def crear_reserva_completa():
    """Crear una reserva completa (simula la orquestación)"""
    try:
        data = request.json
        cliente = data.get('cliente')
        vuelo_destino = data.get('vuelo_destino')
        hotel_nombre = data.get('hotel_nombre')
        monto_total = data.get('monto_total')
        
        # Validar datos
        if not all([cliente, vuelo_destino, hotel_nombre, monto_total]):
            return jsonify({
                'success': False,
                'message': 'Faltan datos requeridos'
            }), 400
        
        # Simular el proceso de orquestación
        resultado = {
            'success': True,
            'message': 'Reserva procesada exitosamente',
            'confirmationNumber': f'CONF-{int(time.time())}',
            'details': {}
        }
        
        # Paso 1: Reservar vuelo
        from vuelos.models import ReservaVuelo
        vuelo = ReservaVuelo(cliente=cliente, destino=vuelo_destino)
        db.session.add(vuelo)
        db.session.flush()  # Para obtener el ID sin commit
        
        resultado['details']['vuelo'] = {
            'id': str(vuelo.id),
            'destino': vuelo_destino,
            'estado': 'RESERVADO',
            'mensaje': 'Vuelo reservado exitosamente'
        }
        
        # Paso 2: Reservar hotel
        from hoteles.models import ReservaHotel
        hotel = ReservaHotel(cliente=cliente, hotel_nombre=hotel_nombre)
        db.session.add(hotel)
        db.session.flush()
        
        resultado['details']['hotel'] = {
            'id': str(hotel.id),
            'nombre': hotel_nombre,
            'estado': 'RESERVADO',
            'mensaje': 'Hotel reservado exitosamente'
        }
        
        # Paso 3: Procesar pago
        from pagos.models import Pago
        if monto_total > 1000:
            # Simular error de pago - activar compensación
            # Cancelar reservas anteriores
            vuelo.estado = 'CANCELADO'
            hotel.estado = 'CANCELADO'
            db.session.commit()
            
            return jsonify({
                'success': False,
                'message': 'Pago rechazado. Transacción revertida.',
                'error': 'Monto demasiado alto',
                'details': {
                    'vuelo': {
                        'id': str(vuelo.id),
                        'estado': 'CANCELADO',
                        'mensaje': 'Vuelo cancelado por falla en pago'
                    },
                    'hotel': {
                        'id': str(hotel.id),
                        'estado': 'CANCELADO',
                        'mensaje': 'Hotel cancelado por falla en pago'
                    },
                    'pago': {
                        'error': 'Monto demasiado alto. Pago rechazado.',
                        'monto': monto_total
                    }
                }
            }), 500
        else:
            # Pago exitoso
            pago = Pago(cliente=cliente, monto=monto_total)
            db.session.add(pago)
            db.session.commit()
            
            resultado['details']['pago'] = {
                'id': str(pago.id),
                'monto': monto_total,
                'estado': 'PAGADO',
                'mensaje': 'Pago procesado exitosamente'
            }
            
            return jsonify(resultado), 200
            
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Error interno del servidor',
            'error': str(e)
        }), 500

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
