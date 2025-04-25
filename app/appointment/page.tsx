'use client';

import { useState } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

const serviceTypes = [
  { id: 'maintenance', name: 'Periyodik Bakım', duration: '1 saat' },
  { id: 'repair', name: 'Arıza/Tamir', duration: '2+ saat' },
  { id: 'inspection', name: 'Kontrol/Muayene', duration: '30 dakika' },
  { id: 'modification', name: 'Modifikasyon', duration: '3+ saat' },
];

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: '',
    vehicleModel: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // randevu oluştur
    toast.success('Randevunuz başarıyla oluşturuldu. Onay e-postası gönderildi.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      serviceType: '',
      vehicleModel: '',
      notes: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Servis Randevusu</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.serviceType === service.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setFormData({ ...formData, serviceType: service.id })}
            >
              <h3 className="font-medium text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-500">Süre: {service.duration}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon Numaranız
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motosiklet Modeliniz
              </label>
              <input
                type="text"
                required
                value={formData.vehicleModel}
                onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Randevu Tarihi
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <CalendarIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Randevu Saati
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Saat seçin</option>
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <ClockIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notlar / Açıklamalar
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Varsa eklemek istediğiniz notları yazabilirsiniz..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Randevu Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
