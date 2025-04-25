'use client';

import { useState } from 'react';
import CartItem from '@/src/components/CartItem';
import Link from 'next/link';

// Örnek sepet verileri
const initialCartItems = [
  {
    id: 1,
    name: 'SpeedMaster 650',
    price: 249999,
    quantity: 1,
  },
  {
    id: 2,
    name: 'RoadKing 1000',
    price: 399999,
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedPayment, setSelectedPayment] = useState('credit');

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const installmentOptions = [
    { months: 3, rate: 1.59 },
    { months: 6, rate: 1.79 },
    { months: 9, rate: 1.89 },
    { months: 12, rate: 1.99 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sepetim</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sepet Öğeleri */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Sepetiniz boş.{' '}
              <Link href="/motorcycles" className="text-blue-600 hover:underline">
                Alışverişe başlayın
              </Link>
            </p>
          )}
        </div>

        {/* Ödeme Özeti */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Ödeme Özeti</h2>
          
          {/* Ödeme Yöntemi */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Ödeme Yöntemi</h3>
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="credit">Kredi Kartı</option>
              <option value="cash">Nakit</option>
              <option value="transfer">Havale/EFT</option>
            </select>
          </div>

          {/* Taksit Seçenekleri */}
          {selectedPayment === 'credit' && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Taksit Seçenekleri</h3>
              <div className="space-y-2">
                {installmentOptions.map(option => {
                  const monthlyPayment = (total * (1 + option.rate / 100)) / option.months;
                  return (
                    <div
                      key={option.months}
                      className="flex justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <span>{option.months} Taksit</span>
                      <span className="font-medium">
                        {Math.round(monthlyPayment).toLocaleString('tr-TR')} TL/ay
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toplam */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Ara Toplam</span>
              <span>{total.toLocaleString('tr-TR')} TL</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>KDV (%18)</span>
              <span>{(total * 0.18).toLocaleString('tr-TR')} TL</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Toplam</span>
              <span>{(total * 1.18).toLocaleString('tr-TR')} TL</span>
            </div>
          </div>

          {/* Ödeme Butonu */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition"
            onClick={() => alert('Ödeme sayfasına yönlendiriliyorsunuz...')}
          >
            Ödemeyi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
} 
