'use client';

import { useCart } from '@/src/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { XCircleIcon, ShoppingCartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CartPage() {
  const { cart, loading, removeFromCart, cartCount, updateQuantity, clearCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      await updateQuantity(productId, newQuantity);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Sepetiniz yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCartIcon className="w-24 h-24 mx-auto text-gray-300" />
        <h2 className="mt-6 text-2xl font-bold text-gray-800">Sepetiniz boş</h2>
        <p className="mt-2 text-gray-500">Görünüşe göre henüz bir ürün eklemediniz.</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim ({cartCount} ürün)</h1>
      <div className="bg-white shadow-lg rounded-lg">
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="flex items-center p-6 border-b border-gray-200">
              <div className="w-24 h-24 relative rounded-md overflow-hidden mr-6">
                 <Image
                  src={item.images?.[0] || '/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-gray-500 text-sm">Adet:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={updatingItems.has(item._id) || item.quantity <= 1}
                      className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">
                      {updatingItems.has(item._id) ? '...' : item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      disabled={updatingItems.has(item._id)}
                      className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-blue-600 font-bold text-lg mt-2">
                  {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                disabled={updatingItems.has(item._id)}
                className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                title="Sepetten Çıkar"
              >
                <XCircleIcon className="w-7 h-7" />
              </button>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center font-semibold">
            <span className="text-xl text-gray-800">Ara Toplam</span>
            <span className="text-2xl text-gray-900">
              {subtotal.toLocaleString('tr-TR')} TL
            </span>
          </div>
          <div className="mt-6 space-y-3">
            <Link
              href="/payment"
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Ödemeye Geç
            </Link>
            <button
              onClick={() => {
                if (window.confirm('Sepetinizi temizlemek istediğinizden emin misiniz?')) {
                  clearCart();
                }
              }}
              disabled={cart.length === 0}
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Sepeti Temizle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
