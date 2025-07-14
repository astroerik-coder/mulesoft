from flask import Blueprint, request, jsonify
from .models import Pago
from database import db

pagos_bp = Blueprint('pagos', __name__)

@pagos_bp.route('/procesar', methods=['POST'])
def procesar_pago():
    data = request.json
    monto = data['monto_total']
    if monto > 1000:
        return jsonify({"error": "Monto demasiado alto. Pago rechazado."}), 500
    pago = Pago(cliente=data['cliente'], monto=monto)
    db.session.add(pago)
    db.session.commit()
    return jsonify({"mensaje": "Pago procesado", "pago_id": pago.id}), 200
