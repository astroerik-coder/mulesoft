"use client";

import { useState } from 'react';
import { BookingRequest } from '@/types/booking';

interface BookingFormProps {
  onSubmit: (data: BookingRequest) => void;
  isLoading: boolean;
}

export default function BookingForm({ onSubmit, isLoading }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingRequest>({
    cliente: '',
    vuelo_destino: '',
    hotel_nombre: '',
    monto_total: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const destinos = [
    'Madrid', 'Barcelona', 'París', 'Londres', 'Roma', 'Berlín', 
    'Amsterdam', 'Lisboa', 'Viena', 'Praga'
  ];

  const hoteles = [
    'Hotel Central', 'Hotel Plaza', 'Hotel Europa', 'Hotel Imperial',
    'Hotel Royal', 'Hotel Metropolitan', 'Hotel Grand', 'Hotel Palace'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.cliente.trim()) {
      newErrors.cliente = 'El nombre del cliente es requerido';
    }

    if (!formData.vuelo_destino) {
      newErrors.vuelo_destino = 'Debe seleccionar un destino';
    }

    if (!formData.hotel_nombre) {
      newErrors.hotel_nombre = 'Debe seleccionar un hotel';
    }

    if (formData.monto_total <= 0) {
      newErrors.monto_total = 'El monto debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BookingRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error específico cuando el usuario comience a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Nueva Reserva
        </h2>
        <p className="text-gray-600">
          Complete el formulario para realizar una reserva de paquete de viaje
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Cliente */}
        <div>
          <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Cliente *
          </label>
          <input
            type="text"
            id="cliente"
            value={formData.cliente}
            onChange={(e) => handleInputChange('cliente', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.cliente ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: Ana Torres"
            disabled={isLoading}
          />
          {errors.cliente && (
            <p className="mt-1 text-sm text-red-600">{errors.cliente}</p>
          )}
        </div>

        {/* Campo Destino */}
        <div>
          <label htmlFor="destino" className="block text-sm font-medium text-gray-700 mb-2">
            Destino del Vuelo *
          </label>
          <select
            id="destino"
            value={formData.vuelo_destino}
            onChange={(e) => handleInputChange('vuelo_destino', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.vuelo_destino ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
          >
            <option value="">Seleccione un destino</option>
            {destinos.map((destino) => (
              <option key={destino} value={destino}>
                {destino}
              </option>
            ))}
          </select>
          {errors.vuelo_destino && (
            <p className="mt-1 text-sm text-red-600">{errors.vuelo_destino}</p>
          )}
        </div>

        {/* Campo Hotel */}
        <div>
          <label htmlFor="hotel" className="block text-sm font-medium text-gray-700 mb-2">
            Hotel *
          </label>
          <select
            id="hotel"
            value={formData.hotel_nombre}
            onChange={(e) => handleInputChange('hotel_nombre', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.hotel_nombre ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
          >
            <option value="">Seleccione un hotel</option>
            {hoteles.map((hotel) => (
              <option key={hotel} value={hotel}>
                {hotel}
              </option>
            ))}
          </select>
          {errors.hotel_nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.hotel_nombre}</p>
          )}
        </div>

        {/* Campo Monto */}
        <div>
          <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">
            Monto Total (€) *
          </label>
          <input
            type="number"
            id="monto"
            value={formData.monto_total || ''}
            onChange={(e) => handleInputChange('monto_total', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.monto_total ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="850.00"
            disabled={isLoading}
          />
          {errors.monto_total && (
            <p className="mt-1 text-sm text-red-600">{errors.monto_total}</p>
          )}
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Nota de prueba:</strong> Los montos superiores a €1000 activarán el escenario de error para demostrar la lógica de compensación del orquestador.
            </p>
          </div>
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando reserva...
              </div>
            ) : (
              'Realizar Reserva'
            )}
          </button>
        </div>
      </form>

      {/* Información adicional */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Proceso de Orquestación</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Reserva de vuelo en el servicio de aerolínea</li>
          <li>2. Reserva de hotel en el servicio de hoteles</li>
          <li>3. Procesamiento de pago</li>
          <li>4. Confirmación final (o compensación en caso de error)</li>
        </ol>
      </div>
    </div>
  );
}
