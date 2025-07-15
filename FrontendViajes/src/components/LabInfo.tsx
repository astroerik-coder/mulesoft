"use client";

import { useState } from 'react';

export default function LabInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón de información */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Información del Laboratorio"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>

      {/* Modal de información */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Información del Laboratorio
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Contenido */}
              <div className="space-y-6">
                {/* Objetivo */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    🎯 Objetivo del Laboratorio
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Diseñar, implementar y defender un flujo de orquestación en MuleSoft que gestione 
                    un proceso de negocio de reserva de viajes con capacidad de coordinación de servicios 
                    y gestión de errores de forma centralizada aplicando lógica de compensación (rollback).
                  </p>
                </div>

                {/* Proceso */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    🔄 Proceso de Orquestación
                  </h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li><strong>Reservar Vuelo:</strong> Llamada al servicio de &quot;Aerolínea&quot;</li>
                    <li><strong>Reservar Hotel:</strong> Llamada al servicio de &quot;Hoteles&quot;</li>
                    <li><strong>Procesar Pago:</strong> Llamada al servicio de &quot;Pagos&quot;</li>
                    <li><strong>Responder al Cliente:</strong> Confirmación o error con compensación</li>
                  </ol>
                </div>

                {/* Gestión de Errores */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    ⚠️ Gestión de Excepciones
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 mb-2">
                      <strong>Trigger de Error:</strong> Monto superior a €1000
                    </p>
                    <p className="text-red-700 mb-3">
                      <strong>Lógica de Compensación:</strong>
                    </p>
                    <ul className="list-disc list-inside text-red-600 space-y-1">
                      <li>Cancelar la reserva del vuelo</li>
                      <li>Cancelar la reserva del hotel</li>
                      <li>Responder con error 500 y mensaje claro</li>
                    </ul>
                  </div>
                </div>

                {/* Arquitectura */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    🏗️ Arquitectura del Sistema
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <div className="bg-white px-3 py-2 rounded border border-blue-300">
                        <strong>Frontend (Next.js)</strong>
                      </div>
                      <div className="text-blue-600">↓</div>
                      <div className="bg-white px-3 py-2 rounded border border-blue-300">
                        <strong>Orquestador (MuleSoft)</strong>
                      </div>
                      <div className="text-blue-600">↓</div>
                      <div className="flex justify-center space-x-2">
                        <div className="bg-white px-2 py-1 rounded border border-blue-300 text-sm">
                          Aerolínea
                        </div>
                        <div className="bg-white px-2 py-1 rounded border border-blue-300 text-sm">
                          Hoteles
                        </div>
                        <div className="bg-white px-2 py-1 rounded border border-blue-300 text-sm">
                          Pagos
                        </div>
                      </div>
                      <div className="text-xs text-blue-600">Servicios Mock (Python Flask)</div>
                    </div>
                  </div>
                </div>

                {/* Casos de Prueba */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    🧪 Casos de Prueba
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">✅ Caso Exitoso</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Monto ≤ €1000</li>
                        <li>• Todos los servicios responden OK</li>
                        <li>• Se genera confirmación</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-2">❌ Caso de Error</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Monto &gt; €1000</li>
                        <li>• Fallo en servicio de pagos</li>
                        <li>• Compensación automática</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tecnologías */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    🛠️ Tecnologías Utilizadas
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Frontend</div>
                      <div className="text-sm text-gray-600">Next.js</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Orquestador</div>
                      <div className="text-sm text-gray-600">MuleSoft</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Servicios Mock</div>
                      <div className="text-sm text-gray-600">Python Flask</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Base de Datos</div>
                      <div className="text-sm text-gray-600">SQLite</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Laboratorio de Orquestación con MuleSoft - Viajes 360
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Proyecto educativo para demostrar conceptos de integración y manejo de errores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
