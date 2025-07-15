"use client";

import { BookingResponse } from '@/types/booking';

interface BookingResultProps {
  result: BookingResponse;
  onNewBooking: () => void;
}

export default function BookingResult({ result, onNewBooking }: BookingResultProps) {
  const { success, message, confirmationNumber, details, error } = result;

  return (
    <div className={`rounded-xl shadow-xl p-8 ${
      success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
    }`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          success ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {success ? (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${
          success ? 'text-green-900' : 'text-red-900'
        }`}>
          {success ? '¡Reserva Confirmada!' : 'Error en la Reserva'}
        </h2>
        <p className={`text-lg ${
          success ? 'text-green-700' : 'text-red-700'
        }`}>
          {message}
        </p>
      </div>

      {/* Número de confirmación */}
      {success && confirmationNumber && (
        <div className="mb-8 p-6 bg-white rounded-lg border border-green-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Número de Confirmación
            </h3>
            <p className="text-2xl font-mono font-bold text-green-600 bg-green-50 py-3 px-6 rounded-lg inline-block">
              {confirmationNumber}
            </p>
          </div>
        </div>
      )}

      {/* Detalles de la reserva exitosa */}
      {success && details && (
        <div className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Detalles de la Reserva
          </h3>
          
          {details.vuelo && (
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <h4 className="font-semibold text-gray-900">Vuelo</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {details.vuelo.id}</p>
                <p><strong>Destino:</strong> {details.vuelo.destino}</p>
                <p><strong>Estado:</strong> 
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {details.vuelo.estado}
                  </span>
                </p>
              </div>
            </div>
          )}

          {details.hotel && (
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <h4 className="font-semibold text-gray-900">Hotel</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {details.hotel.id}</p>
                <p><strong>Nombre:</strong> {details.hotel.nombre}</p>
                <p><strong>Estado:</strong> 
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {details.hotel.estado}
                  </span>
                </p>
              </div>
            </div>
          )}

          {details.pago && (
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                <h4 className="font-semibold text-gray-900">Pago</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {details.pago.id}</p>
                <p><strong>Monto:</strong> €{details.pago.monto.toFixed(2)}</p>
                <p><strong>Estado:</strong> 
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {details.pago.estado}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Información de error */}
      {!success && (
        <div className="mb-8 p-6 bg-white rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-3">
            Información del Error
          </h3>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-800 mb-2">
              <strong>Detalles:</strong> {error || 'Error no especificado'}
            </p>
            <div className="mt-4">
              <h4 className="font-medium text-red-900 mb-2">Proceso de Compensación Ejecutado:</h4>
              <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                <li>Cancelación de reserva de vuelo</li>
                <li>Cancelación de reserva de hotel</li>
                <li>Reversa de transacción</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Información técnica */}
      <div className={`mb-8 p-4 rounded-lg border ${
        success ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'
      }`}>
        <h4 className={`font-medium mb-2 ${
          success ? 'text-blue-900' : 'text-yellow-900'
        }`}>
          {success ? 'Orquestación Exitosa' : 'Manejo de Errores Activado'}
        </h4>
        <p className={`text-sm ${
          success ? 'text-blue-800' : 'text-yellow-800'
        }`}>
          {success 
            ? 'Todos los servicios se ejecutaron correctamente en secuencia: Aerolínea → Hotel → Pagos'
            : 'El orquestador MuleSoft ejecutó la lógica de compensación para revertir las transacciones parciales.'
          }
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onNewBooking}
          className="px-8 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-200"
        >
          Nueva Reserva
        </button>
        {success && (
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-300"
          >
            Imprimir Confirmación
          </button>
        )}
      </div>

      {/* Notas adicionales */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Esta demostración muestra la orquestación de servicios con MuleSoft
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
            <span>Frontend: Next.js</span>
            <span>•</span>
            <span>Orquestador: MuleSoft</span>
            <span>•</span>
            <span>Servicios Mock: Python Flask</span>
          </div>
        </div>
      </div>
    </div>
  );
}
