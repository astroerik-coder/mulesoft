"use client";

import { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import LabInfo from '@/components/LabInfo';
import { BookingRequest, BookingResponse } from '@/types/booking';
import { ENDPOINTS } from '@/config/api';
import BookingResult from '@/components/BookingResult';

export default function Home() {
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingSubmit = async (bookingData: BookingRequest) => {
    setIsLoading(true);
    setBookingResult(null);

    try {
      // URL del orquestador MuleSoft
      const response = await fetch(ENDPOINTS.RESERVAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result: BookingResponse = await response.json();
      
      if (response.ok) {
        setBookingResult({
          success: true,
          message: result.message || 'Reserva creada exitosamente',
          confirmationNumber: result.confirmationNumber,
          details: result.details
        });
      } else {
        setBookingResult({
          success: false,
          message: result.message || 'Error al procesar la reserva',
          error: result.error
        });
      }
    } catch (error) {
      setBookingResult({
        success: false,
        message: 'Error de conexión con el servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBooking = () => {
    setBookingResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Viajes 360
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema de Reservas Integrado - Orquestador MuleSoft
          </p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md inline-block">
            <p className="text-sm text-gray-500">
              <strong>Laboratorio:</strong> Orquestación de servicios con manejo de errores y compensación
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {!bookingResult ? (
            <BookingForm 
              onSubmit={handleBookingSubmit} 
              isLoading={isLoading} 
            />
          ) : (
            <BookingResult 
              result={bookingResult} 
              onNewBooking={handleNewBooking} 
            />
          )}
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <div className="border-t pt-8">
            <p>© 2025 Viajes 360 - Proyecto Laboratorio MuleSoft</p>
            <p className="text-sm mt-2">
              Frontend: Next.js | Orquestador: MuleSoft | Backend: Python Flask
            </p>
          </div>
        </footer>
      </div>
      
      {/* Componente de información del laboratorio */}
      <LabInfo />
    </div>
  );
}

