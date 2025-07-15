"use client";

import { useState } from 'react';
import BookingForm from '@/components/BookingFormNew';
import BookingResult from '@/components/BookingResult';
import TrackingStepper from '@/components/TrackingStepper';
import ReservasManager from '@/components/ReservasManager';
import { BookingRequest, BookingResponse } from '@/types/booking';
import { ENDPOINTS, MULESOFT_HEADERS, createMuleSoftPayload, validateMuleSoftPayload } from '@/config/api';

export default function Home() {
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showReservas, setShowReservas] = useState(false);
  const [currentReservaId, setCurrentReservaId] = useState<string>('');

  const handleBookingSubmit = async (bookingData: BookingRequest) => {
    setIsLoading(true);
    setBookingResult(null);
    setShowTracking(true);
    
    // Generar un ID de reserva temporal para el tracking
    const reservaId = `RES-${Date.now()}`;
    setCurrentReservaId(reservaId);

    try {
      // Simular el proceso de tracking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Enviando datos a MuleSoft:', ENDPOINTS.RESERVAS);
      console.log('Datos originales:', bookingData);
      
      // Crear payload correctamente formateado
      const payload = createMuleSoftPayload(bookingData);
      console.log('Payload formateado:', payload);
      console.log('Payload JSON string:', JSON.stringify(payload));
      console.log('Headers que se enviarán:', MULESOFT_HEADERS);
      
      // Validar payload antes de enviarlo
      if (!validateMuleSoftPayload(payload)) {
        setBookingResult({
          success: false,
          message: 'Error en el formato de datos',
          error: 'Los datos no están en el formato correcto para MuleSoft'
        });
        setIsLoading(false);
        setTimeout(() => setShowTracking(false), 3000);
        return;
      }
      
      // URL del orquestador MuleSoft
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        mode: 'cors' as RequestMode,
        credentials: 'same-origin' as RequestCredentials
      };
      
      console.log('Request options:', requestOptions);
      console.log('Request body type:', typeof requestOptions.body);
      console.log('Request body content:', requestOptions.body);
      
      const response = await fetch(ENDPOINTS.RESERVAS, requestOptions);

      console.log('Respuesta del servidor:', response.status, response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      let result;
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      try {
        result = JSON.parse(responseText);
        console.log('Datos de respuesta parseados:', result);
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError);
        result = { error: `Error del servidor: ${response.status} - ${responseText}` };
      }
      
      if (response.ok) {
        setBookingResult({
          success: true,
          message: result.message || 'Reserva creada exitosamente',
          confirmationNumber: result.confirmationNumber || result.numero_confirmacion || `CONF-${Date.now()}`,
          details: result.details || result.detalles
        });
      } else {
        setBookingResult({
          success: false,
          message: result.message || result.error || 'Error al procesar la reserva',
          error: result.error || result.message || `Error ${response.status}: ${response.statusText}`
        });
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setBookingResult({
        success: false,
        message: 'Error de conexión con el servidor MuleSoft',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setIsLoading(false);
      // Mantener el tracking visible hasta que se complete
      setTimeout(() => setShowTracking(false), 3000);
    }
  };

  const handleNewBooking = () => {
    setBookingResult(null);
    setShowTracking(false);
    setCurrentReservaId('');
  };

  const handleTrackingComplete = () => {
    setShowTracking(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-black mb-4">
            Viajes 360
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            Sistema de Reservas Integrado con Orquestación MuleSoft
          </p>
          <div className="flex items-center justify-center space-x-4">
            
          </div>
        </header>

        {/* Barra de navegación */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 border border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowReservas(true)}
                  className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Ver Reservas</span>
                </button>
               
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-black rounded-full shadow-sm border border-gray-300"></div>
                  <span className="font-medium">Frontend: Next.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-black rounded-full shadow-sm border border-gray-300"></div>
                  <span className="font-medium">Orquestador: MuleSoft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-black rounded-full shadow-sm border border-gray-300"></div>
                  <span className="font-medium">Backend: Python Flask</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mostrar tracking si está activo */}
          {showTracking && (
            <div className="mb-8">
              <TrackingStepper 
                reservaId={currentReservaId}
                isProcessing={isLoading}
                onTrackingComplete={handleTrackingComplete}
              />
            </div>
          )}

          {/* Mostrar formulario o resultado */}
          {!bookingResult ? (
            <div className="bg-white rounded-lg shadow-md p-6 border border-black">
              <BookingForm 
                onSubmit={handleBookingSubmit} 
                isLoading={isLoading} 
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 border border-black">
              <BookingResult 
                result={bookingResult} 
                onNewBooking={handleNewBooking} 
              />
            </div>
          )}
        </div>


      </div>
      
      {/* Modal de gestión de reservas */}
      {showReservas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 border border-black max-w-4xl w-full max-h-[90vh] overflow-auto">
            <ReservasManager 
              onClose={() => setShowReservas(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

