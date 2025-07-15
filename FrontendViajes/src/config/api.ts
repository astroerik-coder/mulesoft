// Configuración de URLs para el proyecto Viajes 360
export const API_CONFIG = {
  MULESOFT_ORCHESTRATOR: process.env.NEXT_PUBLIC_MULESOFT_URL || 'http://localhost:8081/api/v1',  
  MOCK_SERVICES: {
    BASE_URL: process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:5000/api',
    VUELOS: '/vuelos',
    HOTELES: '/hoteles', 
    PAGOS: '/pagos'
  }
};

export const ENDPOINTS = {
  // Endpoint del orquestador MuleSoft (endpoint correcto)
  RESERVAS: 'http://localhost:8081/reservar',
  
  // Para pruebas directas con servicios mock
  VUELOS_MOCK: `${API_CONFIG.MOCK_SERVICES.BASE_URL}${API_CONFIG.MOCK_SERVICES.VUELOS}`,
  HOTELES_MOCK: `${API_CONFIG.MOCK_SERVICES.BASE_URL}${API_CONFIG.MOCK_SERVICES.HOTELES}`,
  PAGOS_MOCK: `${API_CONFIG.MOCK_SERVICES.BASE_URL}${API_CONFIG.MOCK_SERVICES.PAGOS}`,
  
  // Endpoints para gestión de reservas (servicios mock)
  OBTENER_RESERVAS: `${API_CONFIG.MOCK_SERVICES.BASE_URL.replace('/api', '')}/api/reservas`,
  TRACKING: (reservaId: string) => `${API_CONFIG.MOCK_SERVICES.BASE_URL.replace('/api', '')}/api/tracking/${reservaId}`
};

// Configuración de headers para MuleSoft
export const MULESOFT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Función para crear el payload correctamente formateado para MuleSoft
export const createMuleSoftPayload = (bookingData: {
  cliente: string;
  vuelo_destino: string; 
  hotel_nombre: string;
  monto_total: number;
}) => {
  return {
    cliente: bookingData.cliente,
    vuelo_destino: bookingData.vuelo_destino,
    hotel_nombre: bookingData.hotel_nombre,
    monto_total: Number(bookingData.monto_total)
  };
};

// Función para validar el payload antes de enviarlo
export const validateMuleSoftPayload = (payload: Record<string, unknown>): boolean => {
  const requiredFields = ['cliente', 'vuelo_destino', 'hotel_nombre', 'monto_total'];
  
  for (const field of requiredFields) {
    if (!payload[field]) {
      console.error(`Campo requerido faltante: ${field}`);
      return false;
    }
  }
  
  if (typeof payload.monto_total !== 'number' || payload.monto_total <= 0) {
    console.error('monto_total debe ser un número positivo');
    return false;
  }
  
  return true;
};

// Función para enviar una petición de prueba a MuleSoft
export const testMuleSoftRequest = async () => {
  const testPayload = {
    cliente: "Diego Hidalgo",
    vuelo_destino: "Latacunga", 
    hotel_nombre: "Hotel Oro Verde",
    monto_total: 250.00
  };

  try {
    console.log('Enviando test payload:', testPayload);
    
    const response = await fetch('http://localhost:8081/reservar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testPayload)
    });


    const result = await response.text();    
    return { success: response.ok, status: response.status, body: result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const ENV_CONFIG = {
  development: {
    MULESOFT_URL: 'http://localhost:8081/',
    MOCK_API_URL: 'http://localhost:5000/api'
  },
};
