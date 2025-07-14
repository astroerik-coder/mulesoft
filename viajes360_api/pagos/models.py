from database import db

class Pago(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    monto = db.Column(db.Float, nullable=False)
    estado = db.Column(db.String(20), default="PAGADO")
