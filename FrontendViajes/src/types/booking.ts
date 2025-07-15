export interface BookingRequest {
  cliente: string;
  vuelo_destino: string;
  hotel_nombre: string;
  monto_total: number;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  confirmationNumber?: string;
  details?: BookingDetails;
  error?: string;
}

export interface BookingDetails {
  vuelo?: {
    id: string;
    destino: string;
    estado: string;
  };
  hotel?: {
    id: string;
    nombre: string;
    estado: string;
  };
  pago?: {
    id: string;
    monto: number;
    estado: string;
  };
}

export interface ServiceResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export interface Reserva {
  id: string;
  tipo: string;
  destino?: string;
  hotel_nombre?: string;
  estado: string;
  fecha_creacion: string;
  detalles: {
    vuelo_id?: number;
    hotel_id?: number;
    pago?: {
      id: number;
      monto: number;
      estado: string;
    };
  };
}

export interface ClienteReserva {
  cliente: string;
  reservas: Reserva[];
  total_gastado: number;
}

export interface ReservasResponse {
  success: boolean;
  reservas: ClienteReserva[];
  total_clientes: number;
  total_reservas: number;
  error?: string;
}

export interface TrackingStep {
  paso: number;
  titulo: string;
  descripcion: string;
  estado: 'completado' | 'en_proceso' | 'pendiente' | 'error';
  timestamp: string | null;
}

export interface TrackingResponse {
  success: boolean;
  reserva_id: string;
  tracking: TrackingStep[];
  estado_actual: string;
  progreso: number;
}

export interface BookingProcess {
  currentStep: number;
  totalSteps: number;
  steps: TrackingStep[];
  isProcessing: boolean;
}
