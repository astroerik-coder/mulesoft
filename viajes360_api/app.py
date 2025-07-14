from flask import Flask
from config import Config
from database import db

# Importar rutas
from vuelos.routes import vuelos_bp
from hoteles.routes import hoteles_bp
from pagos.routes import pagos_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

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
        'nota': 'El orquestador se implementa en MuleSoft'
    }

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
