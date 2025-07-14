from database import db

class ReservaHotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    hotel_nombre = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(20), default="RESERVADO")
