'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function MotorcyclesPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Tümü',
    'Adventure',
    'Hyper Naked',
    'Off Road',
    'Sport Heritage',
    'Sport Touring',
    'Supersport'
  ];

  const motorcycles = [
    {
      id: 'mt-09',
      name: 'MT-09',
      category: 'Hyper Naked',
      price: 485000,
      image: '/motorcycles/mt-09/1.jpg',
      new: true,
      popular: true
    },
    {
      id: 'r1',
      name: 'R1',
      category: 'Supersport',
      price: 850000,
      image: '/motorcycles/r1/1.jpg',
      new: false,
      popular: true
    },
    {
      id: 'tracer-9-gt',
      name: 'Tracer 9 GT',
      category: 'Sport Touring',
      price: 545000,
      image: '/motorcycles/tracer-9-gt/1.jpg',
      new: true,
      popular: false
    },
    {
      id: 'tenere-700',
      name: 'Tenere 700',
      category: 'Adventure',
      price: 495000,
      image: '/motorcycles/tenere-700/1.jpg',
      new: false,
      popular: true
    },
    {
      id: 'xsr900',
      name: 'XSR900',
      category: 'Sport Heritage',
      price: 515000,
      image: '/motorcycles/xsr900/1.jpg',
      new: false,
      popular: false
    },
    {
      id: 'yz450f',
      name: 'YZ450F',
      category: 'Off Road',
      price: 385000,
      image: '/motorcycles/yz450f/1.jpg',
      new: true,
      popular: false
    }
  ];

  const filteredMotorcycles = 
    activeCategory === 'Tümü' 
      ? motorcycles 
      : motorcycles.filter(moto => moto.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <div className="bg-black text-white relative h-[40vh] min-h-[320px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <div className="absolute inset-0 bg-[url('/motorcycles-hero.jpg')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-5xl font-bold mb-4">Motor Modelleri</h1>
          <p className="text-lg mb-8">
            SpeedHorizon motosikletleri, tutkunun ve mühendisliğin mükemmel birleşimidir. Her model, sürücüsüne benzersiz bir deneyim sunmak için tasarlanmıştır. Seçkin tasarım, güçlü performans ve üstün kalite standartlarıyla üretilen motosikletlerimiz, her sürüşü bir maceraya dönüştürür.
          </p>
        </div>
      </div>

      {/* Category navigation */}
      <div className="sticky top-16 bg-white border-b border-gray-200 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Category tabs for desktop */}
            <div className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                    activeCategory === category
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile dropdo */}
            <div className="md:hidden w-full">
              <button
                className="flex items-center justify-between w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>{activeCategory}</span>
                <ChevronDownIcon className="h-5 w-5" />
              </button>
              {showFilters && (
                <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setActiveCategory(category);
                        setShowFilters(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters button */}
            <button className="text-gray-500 hover:text-gray-700 flex items-center">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Filtreler</span>
            </button>
          </div>
        </div>
      </div>

      {/* Motorcycles grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMotorcycles.map((motorcycle) => (
            <Link 
              key={motorcycle.id} 
              href={`/motorcycles/${motorcycle.id}`}
              className="group"
            >
              <div className="bg-gray-100 overflow-hidden aspect-w-16 aspect-h-9 rounded-lg relative">
                {/* Burada gerçek bir resim olmalı */}
                <div className="w-full h-56 bg-gray-200 group-hover:scale-105 transition-transform duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {motorcycle.new && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Yeni</span>
                  )}
                  {motorcycle.popular && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Popüler</span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                    {motorcycle.name}
                  </h3>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {motorcycle.category}
                  </span>
                </div>
                <p className="mt-2 font-medium text-lg">
                  {motorcycle.price.toLocaleString('tr-TR')} TL
                </p>
                <div className="mt-3 text-blue-600 text-sm font-medium group-hover:underline">
                  Detayları Görüntüle
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hayalinizdeki Motosikleti Bulamadınız mı?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            SpeedHorizon bayilerinde daha fazla model bulabilirsiniz. Size en yakın bayimizi ziyaret edin
            veya bir temsilci ile görüşün.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/dealers" className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors">
              Bayi Bulun
            </Link>
            <Link href="/contact" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 font-medium hover:bg-gray-50 transition-colors">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
