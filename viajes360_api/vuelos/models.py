from database import db

class ReservaVuelo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    destino = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(20), default="RESERVADO")
