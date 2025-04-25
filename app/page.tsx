import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import styles from './page.module.css'
//commit

export default function Home() {
  const categories = [
    {
      title: 'Motor Modelleri',
      href: '/motorcycles',
      description: 'En yeni ve güçlü motosiklet modelleri',
      image: '/motorcycle.jpg',
    },
    {
      title: 'Scooter Modelleri',
      href: '/scooters',
      description: 'Şehir içi ulaşım için ideal scooter seçenekleri',
      image: '/scooter.jpg',
    },
    {
      title: 'Yedek Parçalar',
      href: '/spare-parts',
      description: 'Orijinal yedek parça garantisi',
      image: '/spare-parts.jpg',
    },
    {
      title: 'Aksesuarlar',
      href: '/accessories',
      description: 'Sürüş deneyiminizi zenginleştirin',
      image: '/accessories.jpg',
    },
  ]

  const featuredModels = [
    {
      name: 'MT-09',
      category: 'Hyper Naked',
      image: '/mt09.jpg',
      href: '/motorcycles/mt-09',
    },
    {
      name: 'R1',
      category: 'Supersport',
      image: '/r1.jpg',
      href: '/motorcycles/r1',
    },
    {
      name: 'Tracer 9 GT',
      category: 'Sport Touring',
      image: '/tracer9.jpg',
      href: '/motorcycles/tracer-9-gt',
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section - Full width slider */}
      <div className={styles.heroSection}>
        <div className={styles.heroGradient} />
        <div className={styles.heroBackground} />
        <div className="relative z-20 h-full container mx-auto flex flex-col justify-center items-start px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            OTOMATİKLEŞTİRİLMİŞ<br />MANUEL ŞANZIMAN
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-2xl">
            Sportif sürüşü yeni bir boyuta taşıyoruz!
          </p>
          <div className="w-full max-w-xl mb-8">
            <SearchBar />
          </div>
          <Link
            href="/motorcycles"
            className="bg-blue-600 text-white px-8 py-4 text-lg font-medium hover:bg-blue-700 transition"
          >
            Keşfet
          </Link>
        </div>
      </div>

      {/* SPEEDHORIZON'U KEŞFET */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">SPEEDHORIZON&apos;U KEŞFEDİN</h2>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group block overflow-hidden"
            >
              <div className={styles.categoryCard}>
                <div className={`${styles.categoryCardOverlay} group-hover:bg-black/50`} />
                <div className={`${styles.categoryCardBg} group-hover:scale-105`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/80">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Models */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ÖNE ÇIKAN MODELLER</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredModels.map((model) => (
              <Link
                key={model.name}
                href={model.href}
                className="group"
              >
                <div className="bg-white overflow-hidden">
                  <div className={styles.modelCard}>
                    <div className={`${styles.modelCardBg} group-hover:scale-110`} />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-gray-500">{model.category}</span>
                    <h3 className="text-2xl font-bold mt-1 group-hover:text-blue-600 transition-colors">
                      {model.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SPEEDHORIZON'DAN DAHA FAZLA BİLGİ ALIN */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">SPEEDHORIZON&apos;DAN DAHA FAZLA BİLGİ ALIN</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/price-list" className="bg-blue-600 text-white p-8 text-center hover:bg-blue-700 transition">
            <h3 className="text-xl font-semibold mb-2">FİYAT LİSTESİ</h3>
          </Link>
          <Link href="/dark-side" className="bg-black text-white p-8 text-center hover:bg-gray-900 transition">
            <h3 className="text-xl font-semibold mb-2">THE DARK SIDE OF JAPAN</h3>
          </Link>
          <Link href="/neo-dual-battery" className="bg-gray-800 text-white p-8 text-center hover:bg-gray-700 transition">
            <h3 className="text-xl font-semibold mb-2">NEO&apos;S ÇİFT BATARYALI</h3>
          </Link>
          <Link href="/corporate" className="bg-gray-700 text-white p-8 text-center hover:bg-gray-600 transition">
            <h3 className="text-xl font-semibold mb-2">KURUMSAL</h3>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            SpeedHorizon olarak size tüm ürün ve hizmetlerimizlerimizle kaliteli bir deneyim yaşatmayı amaçlıyoruz.
            İster daha hızlı YARIŞMAK, ister sürüş tutkusunu HİSSETMEK, ister en akıllı şekilde HAREKET ETMEK isteyin,
            size en iyi çözümü sunmaya hazırız.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Güvenli Ödeme</h3>
            <p className="text-gray-600">
              Kredi kartı veya nakit ödeme seçenekleriyle güvenli alışveriş
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Servis Ağı</h3>
            <p className="text-gray-600">
              Türkiye genelinde yaygın bayi ve servis ağı
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Taksit İmkanı</h3>
            <p className="text-gray-600">
              Uygun taksit seçenekleriyle motosiklet sahibi olun
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
