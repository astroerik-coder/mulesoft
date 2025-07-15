"use client";

import { BookingResponse } from '@/types/booking';

interface BookingResultProps {
  result: BookingResponse;
  onNewBooking: () => void;
}

export default function BookingResult({ result, onNewBooking }: BookingResultProps) {
  const { success, message, confirmationNumber, details, error } = result;

  return (
    <div className={`rounded-lg shadow-md p-8 bg-white border ${
      success ? 'border-black' : 'border-gray-700'
    }`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          success ? 'bg-gray-100' : 'bg-gray-100'
        }`}>
          {success ? (
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </div>
        <h2 className="text-3xl font-bold mb-2 text-black">
          {success ? '¡Reserva Confirmada!' : 'Error en la Reserva'}
        </h2>
        <p className="text-lg text-gray-700">
          {message}
        </p>
      </div>

      {/* Número de confirmación */}
      {success && confirmationNumber && (
        <div className="mb-8 p-6 bg-white rounded-lg border border-black">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Número de Confirmación
            </h3>
            <p className="text-2xl font-mono font-bold text-black bg-gray-50 py-3 px-6 rounded-lg inline-block">
              {confirmationNumber}
            </p>
          </div>
        </div>
      )}

      {/* Detalles de la reserva exitosa */}
      {success && details && (
        <div className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-black mb-4">
            Detalles de la Reserva
          </h3>
          
          {details.vuelo && (
            <div className="bg-white p-4 rounded-lg border border-black">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <h4 className="font-semibold text-gray-900">Vuelo</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {details.vuelo.id}</p>
                <p><strong>Destino:</strong> {details.vuelo.destino}</p>
                <p><strong>Estado:</strong> 
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-black rounded-full text-xs">
                    {details.vuelo.estado}
                  </span>
                </p>
              </div>
            </div>
          )}

          {details.hotel && (
            <div className="bg-white p-4 rounded-lg border border-black">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <h4 className="font-semibold text-gray-900">Hotel</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {details.hotel.id}</p>
                <p><strong>Nombre:</strong> {details.hotel.nombre}</p>
                <p><strong>Estado:</strong> 
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-black rounded-full text-xs">
                    {details.hotel.estado}
                  </span>
                </p>
              </div>
            </div>
          )}

          {details.pago && (
            <div className="bg-white p-4 rounded-lg border border-black">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                <h4 className="font-semibold text-gray-900">Pago</h4>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> {details.pago.id}</p>
                <p><strong>Monto:</strong> €{details.pago.monto}</p>
                <p><strong>Estado:</strong> 
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-black rounded-full text-xs">
                    {details.pago.estado}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error details */}
      {!success && error && (
        <div className="mb-8 p-6 bg-white rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Detalles del Error
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 font-mono text-sm whitespace-pre-wrap">
            {error}
          </div>
          <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Si el error persiste, comuníquese con soporte técnico para asistencia.
            </p>
          </div>
        </div>
      )}

      {/* Botón */}
      <div className="text-center">
        <button
          onClick={onNewBooking}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-800 transform hover:scale-105 shadow-md"
        >
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Realizar Otra Reserva
          </span>
        </button>
      </div>
    </div>
  );
}
