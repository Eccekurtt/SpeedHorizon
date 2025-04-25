'use client';

import { useState } from 'react';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ödeme işlemi simülasyonu
    alert('Ödeme işlemi başarıyla tamamlandı!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ödeme</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ödeme Yöntemi Seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ödeme Yöntemi
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`p-4 border rounded-lg text-center ${
                  paymentMethod === 'credit'
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-300'
                }`}
              >
                Kredi Kartı
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border rounded-lg text-center ${
                  paymentMethod === 'cash'
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-300'
                }`}
              >
                Nakit
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-4 border rounded-lg text-center ${
                  paymentMethod === 'transfer'
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-300'
                }`}
              >
                Havale/EFT
              </button>
            </div>
          </div>

          {/* Kredi Kartı Bilgileri */}
          {paymentMethod === 'credit' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kart Numarası
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-3 border rounded-lg"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Son Kullanma Tarihi
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="AA/YY"
                    className="w-full p-3 border rounded-lg"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full p-3 border rounded-lg"
                    maxLength={3}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taksit Seçenekleri
                </label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="1">Tek Çekim</option>
                  <option value="3">3 Taksit</option>
                  <option value="6">6 Taksit</option>
                  <option value="9">9 Taksit</option>
                  <option value="12">12 Taksit</option>
                </select>
              </div>
            </>
          )}

          {/* Havale/EFT Bilgileri */}
          {paymentMethod === 'transfer' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Banka Hesap Bilgileri</h3>
              <p className="text-sm text-gray-600">
                Banka: SpeedHorizon Bank<br />
                IBAN: TR12 3456 7890 1234 5678 9012 34<br />
                Hesap Sahibi: SpeedHorizon Motosiklet A.Ş.
              </p>
            </div>
          )}

          {/* Ödeme Butonu */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {paymentMethod === 'credit'
              ? 'Ödemeyi Tamamla'
              : paymentMethod === 'transfer'
              ? 'Ödeme Bildirimi Gönder'
              : 'Siparişi Onayla'}
          </button>
        </form>
      </div>
    </div>
  );
}  
