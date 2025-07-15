// Configuración de URLs para el proyecto Viajes 360

export const API_CONFIG = {
  // URL del orquestador MuleSoft
  // Ajustar según la configuración de tu entorno MuleSoft
  MULESOFT_ORCHESTRATOR: process.env.NEXT_PUBLIC_MULESOFT_URL || 'http://localhost:8081/api/v1',
  
  // URLs de servicios mock (Python Flask) - para testing directo
  MOCK_SERVICES: {
    BASE_URL: process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:5000/api',
    VUELOS: '/vuelos',
    HOTELES: '/hoteles', 
    PAGOS: '/pagos'
  }
};

export const ENDPOINTS = {
  // Endpoint principal del orquestador
  RESERVAS: `${API_CONFIG.MULESOFT_ORCHESTRATOR}/reservas`,
  
  // Para pruebas directas con servicios mock
  VUELOS_MOCK: `${API_CONFIG.MOCK_SERVICES.BASE_URL}${API_CONFIG.MOCK_SERVICES.VUELOS}`,
  HOTELES_MOCK: `${API_CONFIG.MOCK_SERVICES.BASE_URL}${API_CONFIG.MOCK_SERVICES.HOTELES}`,
  PAGOS_MOCK: `${API_CONFIG.MOCK_SERVICES.BASE_URL}${API_CONFIG.MOCK_SERVICES.PAGOS}`
};

// Configuración para diferentes entornos
export const ENV_CONFIG = {
  development: {
    MULESOFT_URL: 'http://localhost:8081/api/v1',
    MOCK_API_URL: 'http://localhost:5000/api'
  },
  production: {
    MULESOFT_URL: 'https://your-mulesoft-app.cloudhub.io/api/v1',
    MOCK_API_URL: 'https://your-mock-api.herokuapp.com/api'
  }
};
