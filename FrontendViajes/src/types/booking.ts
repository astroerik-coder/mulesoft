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
