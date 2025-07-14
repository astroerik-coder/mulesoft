from flask import Blueprint, request, jsonify
from .models import ReservaHotel
from database import db

hoteles_bp = Blueprint('hoteles', __name__)

@hoteles_bp.route('/reservar', methods=['POST'])
def reservar_hotel():
    data = request.json
    reserva = ReservaHotel(cliente=data['cliente'], hotel_nombre=data['hotel_nombre'])
    db.session.add(reserva)
    db.session.commit()
    return jsonify({"mensaje": "Hotel reservado", "reserva_id": reserva.id}), 200

@hoteles_bp.route('/cancelar', methods=['POST'])
def cancelar_hotel():
    reserva_id = request.json.get("reserva_id")
    reserva = ReservaHotel.query.get(reserva_id)
    if reserva:
        reserva.estado = "CANCELADO"
        db.session.commit()
        return jsonify({"mensaje": "Hotel cancelado"}), 200
    return jsonify({"error": "Reserva no encontrada"}), 404
