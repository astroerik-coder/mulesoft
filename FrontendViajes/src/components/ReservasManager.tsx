"use client";

import { useState, useEffect } from 'react';
import { ClienteReserva, ReservasResponse } from '@/types/booking';
import { ENDPOINTS } from '@/config/api';

interface ReservasManagerProps {
  onClose: () => void;
}

const ReservasManager: React.FC<ReservasManagerProps> = ({ onClose }) => {
  const [reservas, setReservas] = useState<ClienteReserva[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(ENDPOINTS.OBTENER_RESERVAS);
      const data: ReservasResponse = await response.json();
      
      if (data.success) {
        setReservas(data.reservas);
      } else {
        setError(data.error || 'Error al cargar las reservas');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 border border-black">
          <div className="text-center">
            <div className="text-black text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-black mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex space-x-4">
              <button
                onClick={fetchReservas}
                className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                Reintentar
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 border border-black"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 border border-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando reservas...</p>
          </div>
        </div>
      </div>
    );
  }

  const clienteActual = reservas.find(c => c.cliente === selectedCliente);

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-black">
        <h2 className="text-xl font-bold text-black">Gestor de Reservas</h2>
        <button 
          onClick={onClose}
          className="text-black hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex h-[calc(90vh-8rem)]">
        {/* Sidebar - Lista de Clientes */}
        <div className="w-1/3 bg-white border-r border-black overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-black mb-4">Clientes</h3>
            <div className="space-y-2">
              {reservas.map((cliente) => (
                <div
                  key={cliente.cliente}
                  onClick={() => setSelectedCliente(cliente.cliente)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCliente === cliente.cliente
                      ? 'bg-gray-100 border-black border-2'
                      : 'bg-white hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-black">{cliente.cliente}</h4>
                      <p className="text-sm text-gray-500">{cliente.reservas.length} reservas</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-black">€{cliente.total_gastado.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Detalles de Reservas */}
        <div className="flex-1 overflow-y-auto">
          {!clienteActual ? (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-medium mb-2">Seleccione un Cliente</h4>
                <p className="text-gray-400">Escoja un cliente de la lista para ver sus reservas</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-black">{clienteActual.cliente}</h3>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-black">
                    Total: €{clienteActual.total_gastado.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {clienteActual.reservas.map(reserva => (
                  <div key={reserva.id} className="bg-white p-4 rounded-lg border border-black">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-black">Reserva #{reserva.id}</h4>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reserva.estado === 'completada' ? 'bg-gray-100 text-black' :
                          reserva.estado === 'en_proceso' ? 'bg-gray-200 text-black' :
                          reserva.estado === 'error' ? 'bg-gray-300 text-black' :
                          'bg-gray-100 text-black'
                        }`}>
                          {reserva.estado}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p><strong>Fecha:</strong> {new Date(reserva.fecha_creacion).toLocaleString()}</p>
                      {reserva.destino && <p><strong>Destino:</strong> {reserva.destino}</p>}
                      {reserva.hotel_nombre && <p><strong>Hotel:</strong> {reserva.hotel_nombre}</p>}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        {reserva.detalles.pago && (
                          <span className="font-medium">
                            €{reserva.detalles.pago.monto.toFixed(2)}
                          </span>
                        )}
                        <button 
                          className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                          onClick={() => alert(`Detalles completos para reserva ${reserva.id}`)}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-black">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total: {reservas.reduce((acc, c) => acc + c.reservas.length, 0)} reservas
          </div>
          <button
            onClick={fetchReservas}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservasManager;
