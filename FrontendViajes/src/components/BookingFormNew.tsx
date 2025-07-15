"use client";

import { useState } from 'react';
import { BookingRequest } from '@/types/booking';

interface BookingFormProps {
  onSubmit: (data: BookingRequest) => void;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BookingRequest>({
    cliente: '',
    vuelo_destino: '',
    hotel_nombre: '',
    monto_total: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const destinos = [
    { value: 'Madrid', label: 'Madrid, España', icon: '🇪🇸' },
    { value: 'Barcelona', label: 'Barcelona, España', icon: '🇪🇸' },
    { value: 'París', label: 'París, Francia', icon: '🇫🇷' },
    { value: 'Roma', label: 'Roma, Italia', icon: '🇮🇹' },
    { value: 'Londres', label: 'Londres, Reino Unido', icon: '🇬🇧' },
    { value: 'Berlín', label: 'Berlín, Alemania', icon: '🇩🇪' },
    { value: 'Quito', label: 'Quito, Ecuador', icon: '🇪🇨' },
    { value: 'Latacunga', label: 'Latacunga, Ecuador', icon: '🇪🇨' },
    { value: 'Cuenca', label: 'Cuenca, Ecuador', icon: '🇪🇨' }
  ];

  const hoteles = [
    { value: 'Hotel Central', label: 'Hotel Central ⭐⭐⭐⭐', price: 150 },
    { value: 'Hotel Plaza', label: 'Hotel Plaza ⭐⭐⭐⭐⭐', price: 250 },
    { value: 'Hotel Europa', label: 'Hotel Europa ⭐⭐⭐', price: 100 },
    { value: 'Hotel Luxury', label: 'Hotel Luxury ⭐⭐⭐⭐⭐', price: 350 },
    { value: 'Hotel Boutique', label: 'Hotel Boutique ⭐⭐⭐⭐', price: 200 },
    { value: 'Hotel Oro Verde', label: 'Hotel Oro Verde ⭐⭐⭐⭐', price: 180 },
    { value: 'Hotel Alameda', label: 'Hotel Alameda ⭐⭐⭐', price: 120 }
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

    if (!formData.monto_total || formData.monto_total <= 0) {
      newErrors.monto_total = 'El monto debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Asegurar que los datos están en el formato correcto para MuleSoft
      const cleanData = {
        cliente: formData.cliente.trim(),
        vuelo_destino: formData.vuelo_destino,
        hotel_nombre: formData.hotel_nombre,
        monto_total: Number(formData.monto_total)
      };
      
      console.log('Datos enviados desde form:', cleanData);
      onSubmit(cleanData);
    }
  };

  const handleInputChange = (field: keyof BookingRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo actual
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-8 border border-black">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">Nueva Reserva</h2>
          <p className="text-gray-600">Complete los datos para crear su reserva de viaje</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cliente */}
          <div>
            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Nombre del Cliente
              </span>
            </label>
            <input
              id="cliente"
              type="text"
              value={formData.cliente}
              onChange={(e) => handleInputChange('cliente', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.cliente 
                  ? 'border-red-600' 
                  : 'border-black'
              } focus:outline-none`}
              placeholder="Ingrese el nombre completo"
              disabled={isLoading}
            />
            {errors.cliente && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.cliente}
              </p>
            )}
          </div>

          {/* Destino */}
          <div>
            <label htmlFor="destino" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destino del Vuelo
              </span>
            </label>
            <select
              id="destino"
              value={formData.vuelo_destino}
              onChange={(e) => handleInputChange('vuelo_destino', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.vuelo_destino 
                  ? 'border-red-600' 
                  : 'border-black'
              } focus:outline-none`}
              disabled={isLoading}
            >
              <option value="">Seleccione un destino</option>
              {destinos.map((destino) => (
                <option key={destino.value} value={destino.value}>
                  {destino.icon} {destino.label}
                </option>
              ))}
            </select>
            {errors.vuelo_destino && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.vuelo_destino}
              </p>
            )}
          </div>

          {/* Hotel */}
          <div>
            <label htmlFor="hotel" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hotel
              </span>
            </label>
            <select
              id="hotel"
              value={formData.hotel_nombre}
              onChange={(e) => handleInputChange('hotel_nombre', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.hotel_nombre 
                  ? 'border-red-600' 
                  : 'border-black'
              } focus:outline-none`}
              disabled={isLoading}
            >
              <option value="">Seleccione un hotel</option>
              {hoteles.map((hotel) => (
                <option key={hotel.value} value={hotel.value}>
                  {hotel.label} - €{hotel.price}/noche
                </option>
              ))}
            </select>
            {errors.hotel_nombre && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.hotel_nombre}
              </p>
            )}
          </div>

          {/* Monto */}
          <div>
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Monto Total (€)
              </span>
            </label>
            <div className="relative">
              <input
                id="monto"
                type="number"
                value={formData.monto_total || ''}
                onChange={(e) => handleInputChange('monto_total', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.monto_total 
                    ? 'border-red-600' 
                    : 'border-black'
                } focus:outline-none`}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                €
              </div>
            </div>
            {errors.monto_total && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.monto_total}
              </p>
            )}
            {formData.monto_total > 1000 && (
              <div className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-sm text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <strong>Nota:</strong> Montos superiores a €1000 activarán la lógica de error para demostrar la compensación automática.
                </p>
              </div>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando Reserva...
              </div>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Crear Reserva
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
