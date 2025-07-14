import requests
import json

# URL base de la API
BASE_URL = "http://127.0.0.1:5000"

def test_api():
    print("🚀 Probando API Viajes360")
    print("=" * 50)
    
    # 1. Probar endpoint principal
    print("\n1. Probando endpoint principal...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Respuesta: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # 2. Probar reserva de vuelo
    print("\n2. Probando reserva de vuelo...")
    vuelo_data = {
        "cliente": "Juan Pérez",
        "vuelo_destino": "Madrid"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/vuelos/reservar", json=vuelo_data)
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Respuesta: {result}")
        vuelo_reserva_id = result.get("reserva_id")
    except Exception as e:
        print(f"Error: {e}")
        vuelo_reserva_id = None
    
    # 3. Probar reserva de hotel
    print("\n3. Probando reserva de hotel...")
    hotel_data = {
        "cliente": "María García",
        "hotel_nombre": "Hotel Barcelona Plaza"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/hoteles/reservar", json=hotel_data)
        print(f"Status: {response.status_code}")
        result = response.json()
        print(f"Respuesta: {result}")
        hotel_reserva_id = result.get("reserva_id")
    except Exception as e:
        print(f"Error: {e}")
        hotel_reserva_id = None
    
    # 4. Probar procesamiento de pago (exitoso)
    print("\n4. Probando pago exitoso...")
    pago_data = {
        "cliente": "Carlos López",
        "monto_total": 500.0
    }
    try:
        response = requests.post(f"{BASE_URL}/api/pagos/procesar", json=pago_data)
        print(f"Status: {response.status_code}")
        print(f"Respuesta: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # 5. Probar procesamiento de pago (fallido por monto alto)
    print("\n5. Probando pago fallido (monto alto)...")
    pago_alto_data = {
        "cliente": "Ana Rodríguez",
        "monto_total": 1500.0
    }
    try:
        response = requests.post(f"{BASE_URL}/api/pagos/procesar", json=pago_alto_data)
        print(f"Status: {response.status_code}")
        print(f"Respuesta: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # 6. Probar cancelación de vuelo
    if vuelo_reserva_id:
        print(f"\n6. Probando cancelación de vuelo (ID: {vuelo_reserva_id})...")
        cancelar_data = {
            "reserva_id": vuelo_reserva_id
        }
        try:
            response = requests.post(f"{BASE_URL}/api/vuelos/cancelar", json=cancelar_data)
            print(f"Status: {response.status_code}")
            print(f"Respuesta: {response.json()}")
        except Exception as e:
            print(f"Error: {e}")
    
    # 7. Probar cancelación de hotel
    if hotel_reserva_id:
        print(f"\n7. Probando cancelación de hotel (ID: {hotel_reserva_id})...")
        cancelar_data = {
            "reserva_id": hotel_reserva_id
        }
        try:
            response = requests.post(f"{BASE_URL}/api/hoteles/cancelar", json=cancelar_data)
            print(f"Status: {response.status_code}")
            print(f"Respuesta: {response.json()}")
        except Exception as e:
            print(f"Error: {e}")
    
    print("\n" + "=" * 50)
    print("✅ Pruebas completadas")

if __name__ == "__main__":
    test_api()
