"use client";

import { useState, useEffect, useCallback } from 'react';
import { TrackingStep, TrackingResponse } from '@/types/booking';
import { ENDPOINTS } from '@/config/api';

interface TrackingStepperProps {
  reservaId: string;
  isProcessing: boolean;
  onTrackingComplete?: () => void;
}

const TrackingStepper: React.FC<TrackingStepperProps> = ({ 
  reservaId, 
  isProcessing, 
  onTrackingComplete 
}) => {
  const [tracking, setTracking] = useState<TrackingResponse | null>(null);

  const fetchTracking = useCallback(async () => {
    try {
      const response = await fetch(ENDPOINTS.TRACKING(reservaId));
      const data: TrackingResponse = await response.json();
      
      if (data.success) {
        setTracking(data);
        
        // Si todos los pasos están completados, llamar callback
        const allCompleted = data.tracking.every(step => step.estado === 'completado');
        if (allCompleted && onTrackingComplete) {
          onTrackingComplete();
        }
      }
    } catch (error) {
      console.error('Error fetching tracking:', error);
    }
  }, [reservaId, onTrackingComplete]);

  useEffect(() => {
    if (isProcessing) {
      fetchTracking();
      const interval = setInterval(fetchTracking, 2000); // Actualizar cada 2 segundos
      return () => clearInterval(interval);
    }
  }, [isProcessing, fetchTracking]);

  const getStepIcon = (step: TrackingStep, index: number) => {
    switch (step.estado) {
      case 'completado':
        return (
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'en_proceso':
        return (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            {index + 1}
          </div>
        );
    }
  };

  if (!tracking) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <span className="ml-2 text-gray-600">Cargando tracking...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-black">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-black">Seguimiento de Reserva</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{reservaId}</span>
          {isProcessing ? (
            <span className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full animate-pulse">
              En proceso
            </span>
          ) : (
            <span className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full">
              Completado
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex bg-gray-200 rounded">
          <div 
            style={{ 
              width: `${tracking.progreso}%`,
              transition: 'width 1s ease-in-out'
            }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black">
          </div>
        </div>
        <div className="text-right text-xs text-gray-500">{tracking.progreso}%</div>
      </div>
      
      <div className="mt-6">
        {tracking.tracking.map((step, index) => (
          <div key={step.paso} className="relative">
            <div className="flex items-center mb-2">
              {getStepIcon(step, index)}
              <div className="ml-4 flex-1">
                <div className="font-medium text-black">{step.titulo}</div>
                <div className="text-sm text-gray-500">{step.descripcion}</div>
              </div>
              <div className="text-xs font-mono text-gray-400">
                {step.timestamp}
              </div>
            </div>
            
            {index < tracking.tracking.length - 1 && (
              <div className="ml-4 pl-4 border-l-2 border-dashed pb-6 border-gray-300">
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingStepper;
