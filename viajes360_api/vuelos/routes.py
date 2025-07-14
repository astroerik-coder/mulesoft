from flask import Blueprint, request, jsonify
from .models import ReservaVuelo
from database import db

vuelos_bp = Blueprint('vuelos', __name__)

@vuelos_bp.route('/reservar', methods=['POST'])
def reservar_vuelo():
    data = request.json
    reserva = ReservaVuelo(cliente=data['cliente'], destino=data['vuelo_destino'])
    db.session.add(reserva)
    db.session.commit()
    return jsonify({"mensaje": "Vuelo reservado", "reserva_id": reserva.id}), 200

@vuelos_bp.route('/cancelar', methods=['POST'])
def cancelar_vuelo():
    reserva_id = request.json.get("reserva_id")
    reserva = ReservaVuelo.query.get(reserva_id)
    if reserva:
        reserva.estado = "CANCELADO"
        db.session.commit()
        return jsonify({"mensaje": "Vuelo cancelado"}), 200
    return jsonify({"error": "Reserva no encontrada"}), 404
