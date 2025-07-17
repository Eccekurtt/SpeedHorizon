require('dotenv').config();
require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Motorcycle = require('./Motorcycle');
const Scooter = require('./Scooter');
const SparePart = require('./SparePart');
const Accessory = require('./Accessory');
const User = require('./User');
const Appointment = require('./Appointment');
const Feedback = require('./Feedback');
const bcrypt = require('bcryptjs');
const Order = require('./Order');
const DiscountedProduct = require('./DiscountedProduct');
const CreditCard = require('./CreditCard');
const PriceList = require('./PriceList');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const corsOptions = {
  origin: [
    "https://speedhorizon.online",
    "http://localhost:3000"
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB bağlantısı
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/speedhorizon';
console.log('MONGODB_URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Basit test endpoint'i
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'API çalışıyor!' });
});

// FİLTRELİ MOTORCYCLE ENDPOINTİ
app.get('/api/motorcycles', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      minEngineSize,
      maxEngineSize,
      minPower,
      maxPower,
      q // arama
    } = req.query;

    // Filtre objesi oluştur
    const filter = {};

    if (category && category !== "Tümü") filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (minEngineSize || maxEngineSize) filter.engineSize = {};
    if (minEngineSize) filter.engineSize.$gte = Number(minEngineSize);
    if (maxEngineSize) filter.engineSize.$lte = Number(maxEngineSize);
    if (minPower || maxPower) filter.power = {};
    if (minPower) filter.power.$gte = Number(minPower);
    if (maxPower) filter.power.$lte = Number(maxPower);
    if (q) filter.name = { $regex: q, $options: "i" };

    const motorcycles = await Motorcycle.find(filter);
    res.json({ success: true, data: motorcycles });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Veritabanı hatası', error: err.message });
  }
});

// Belirli bir motosikleti ID ile getiren endpoint
app.get('/api/motorcycles/:id', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ success: false, message: 'Motosiklet bulunamadı.' });
    }
    res.json({ success: true, data: motorcycle });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Geçersiz ID formatı.' });
    }
    res.status(500).json({ success: false, message: 'Sunucu hatası', error: err.message });
  }
});

// Tüm scooterları dönen endpoint
app.get('/api/scooters', async (req, res) => {
  try {
    const scooters = await Scooter.find();
    res.json({ success: true, data: scooters });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Veritabanı hatası', error: err.message });
  }
});

// Belirli bir scooterı ID ile getiren endpoint
app.get('/api/scooters/:id', async (req, res) => {
  try {
    const scooter = await Scooter.findById(req.params.id);
    if (!scooter) {
      return res.status(404).json({ success: false, message: 'Scooter bulunamadı.' });
    }
    res.json({ success: true, data: scooter });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Geçersiz ID formatı.' });
    }
    res.status(500).json({ success: false, message: 'Sunucu hatası', error: err.message });
  }
});

// Tüm yedek parçaları dönen endpoint
app.get('/api/spareparts', async (req, res) => {
  try {
    const spareParts = await SparePart.find();
    res.json({ success: true, data: spareParts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Veritabanı hatası', error: err.message });
  }
});

// Tüm aksesuarları dönen endpoint
app.get('/api/accessories', async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json({ success: true, data: accessories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Veritabanı hatası', error: err.message });
  }
});

// Tüm fiyat listesini dönen endpoint
app.get('/api/pricelist', async (req, res) => {
  try {
    const prices = await PriceList.find();
    res.json({ success: true, data: prices });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Veritabanı hatası', error: err.message });
  }
});

// Yeni fiyat ekleyen endpoint (opsiyonel, admin için)
app.post('/api/pricelist', async (req, res) => {
  try {
    const price = new PriceList(req.body);
    await price.save();
    res.json({ success: true, data: price });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Üye ol (register) endpointi
app.post('/api/register', async (req, res) => {
  console.log('Gelen body:', req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log('Eksik alan hatası!');
      return res.status(400).json({ success: false, message: 'Tüm alanlar zorunlu.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Bu e-posta ile zaten bir kullanıcı var.');
      return res.status(409).json({ success: false, message: 'Bu e-posta ile zaten bir kullanıcı var.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log('Kayıt başarılı!');
    res.json({ success: true, message: 'Kayıt başarılı!' });
  } catch (err) {
    console.log('Kayıt sırasında hata:', err.message);
    res.status(500).json({ success: false, message: 'Kayıt sırasında hata oluştu.', error: err.message });
  }
});

// Giriş yap (login) endpointi
app.post('/api/login', async (req, res) => {
  console.log('Giriş isteği body:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Eksik alan hatası!');
      return res.status(400).json({ success: false, message: 'E-posta ve şifre zorunludur.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Kullanıcı bulunamadı:', email);
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı veya şifre hatalı.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Hatalı şifre:', email);
      return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı veya şifre hatalı.' });
    }

    console.log('Giriş başarılı:', email);
    // Güvenlik için şifreyi yanıtta göndermeyin
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    res.json({ success: true, message: 'Giriş başarılı!', user: userResponse });

  } catch (err) {
    console.log('Giriş sırasında hata:', err.message);
    res.status(500).json({ success: false, message: 'Giriş sırasında bir hata oluştu.', error: err.message });
  }
});

// Randevu oluşturma endpointi
app.post('/api/appointments', async (req, res) => {
  console.log('Randevu isteği body:', req.body);
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    console.log('Randevu başarıyla oluşturuldu.');
    res.status(201).json({ success: true, message: 'Randevunuz başarıyla oluşturuldu.', data: appointment });
  } catch (err) {
    console.error('Randevu oluşturma hatası:', err.message);
    res.status(400).json({ success: false, message: 'Randevu oluşturulurken bir hata oluştu.', error: err.message });
  }
});

// Belirli bir kullanıcıyı ID ile getiren endpoint
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Şifre alanını dışarıda bırakarak kullanıcıyı bul
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Kullanıcı getirme hatası:', err.message);
    // ID formatı yanlışsa CastError oluşur
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Geçersiz kullanıcı ID formatı.' });
    }
    res.status(500).json({ success: false, message: 'Sunucu hatası oluştu.', error: err.message });
  }
});

// #region Sepet API Endpointleri

// Kullanıcının sepetini getir
app.get('/api/users/:id/cart', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    // Sepetteki ürünlerin detaylarını kendi modellerinden çek
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        const product = await mongoose.model(item.productModel).findById(item.productId);
        if (product) {
          // Frontend'in doğru çalışması için productModel'i yanıta eklemek zorunludur.
          return {
            ...product.toObject(),
            quantity: item.quantity,
            productModel: item.productModel,
          };
        }
        return null;
      })
    );

    // Sepette bulunamayan ürünleri filtrele
    const cartItems = populatedCart.filter(item => item !== null);

    res.json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sepet getirilirken hata oluştu.', error: error.message });
  }
});

// Sepete ürün ekle/güncelle
app.post('/api/users/:id/cart', async (req, res) => {
  try {
    const { productId, productModel, quantity = 1 } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    const product = await mongoose.model(productModel).findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Ürün bulunamadı.' });
    }

    const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (cartItemIndex > -1) {
      // Ürün sepette varsa, miktarını güncelle
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Ürün sepette yoksa, yeni ürün olarak ekle
      user.cart.push({ productId, productModel, quantity });
    }

    await user.save();
    res.json({ success: true, message: 'Ürün sepete eklendi.', data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ürün sepete eklenirken hata oluştu.', error: error.message });
  }
});

// Sepetten ürünü sil
app.delete('/api/users/:id/cart/:productId', async (req, res) => {
  try {
    const { id: userId, productId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.json({ success: true, message: 'Ürün sepetten çıkarıldı.', data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ürün sepetten çıkarılırken hata oluştu.', error: error.message });
  }
});

// Sepetteki ürün miktarını güncelle
app.put('/api/users/:id/cart/:productId/quantity', async (req, res) => {
  try {
    const { id: userId, productId } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Geçersiz miktar.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Ürün sepetinizde bulunamadı.' });
    }

    cartItem.quantity = quantity;
    await user.save();
    
    res.json({ success: true, message: 'Ürün miktarı güncellendi.', data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ürün miktarı güncellenirken hata oluştu.', error: error.message });
  }
});

// Sepeti tamamen temizle
app.delete('/api/users/:id/cart/clear', async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    user.cart = [];
    await user.save();
    
    res.json({ success: true, message: 'Sepet başarıyla temizlendi.', data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sepet temizlenirken hata oluştu.', error: error.message });
  }
});

// #endregion

// #region Favori API Endpointleri

// Kullanıcının favorilerini getir
app.get('/api/users/:id/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    // Favorilerdeki ürünlerin detaylarını kendi modellerinden çek
    const populatedFavorites = await Promise.all(
      user.favorites.map(async (item) => {
        const product = await mongoose.model(item.productModel).findById(item.productId);
        if (product) {
          return {
            ...product.toObject(),
            productModel: item.productModel,
          };
        }
        return null;
      })
    );

    // Favorilerde bulunamayan ürünleri filtrele
    const favoriteItems = populatedFavorites.filter(item => item !== null);

    res.json({ success: true, data: favoriteItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Favoriler getirilirken hata oluştu.', error: error.message });
  }
});

// Favorilere ürün ekle
app.post('/api/users/:id/favorites', async (req, res) => {
  try {
    const { productId, productModel } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    const product = await mongoose.model(productModel).findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Ürün bulunamadı.' });
    }

    // Ürün zaten favorilerde mi kontrol et
    const existingFavorite = user.favorites.find(
      item => item.productId.toString() === productId && item.productModel === productModel
    );

    if (existingFavorite) {
      return res.status(400).json({ success: false, message: 'Ürün zaten favorilerinizde.' });
    }

    user.favorites.push({ productId, productModel });
    await user.save();
    
    res.json({ success: true, message: 'Ürün favorilere eklendi.', data: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ürün favorilere eklenirken hata oluştu.', error: error.message });
  }
});

// Favorilerden ürün çıkar
app.delete('/api/users/:id/favorites/:productId', async (req, res) => {
  try {
    const { id: userId, productId } = req.params;
    const { productModel } = req.query;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    user.favorites = user.favorites.filter(
      item => !(item.productId.toString() === productId && item.productModel === productModel)
    );

    await user.save();
    res.json({ success: true, message: 'Ürün favorilerden çıkarıldı.', data: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ürün favorilerden çıkarılırken hata oluştu.', error: error.message });
  }
});

// #endregion

// Geri bildirim oluşturma endpointi
app.post('/api/feedback', async (req, res) => {
  console.log('Geri bildirim isteği body:', req.body);
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    console.log('Geri bildirim başarıyla oluşturuldu.');
    res.status(201).json({ success: true, message: 'Geri bildiriminiz için teşekkür ederiz.', data: feedback });
  } catch (err) {
    console.error('Geri bildirim oluşturma hatası:', err.message);
    res.status(400).json({ success: false, message: 'Geri bildirim gönderilirken bir hata oluştu.', error: err.message });
  }
});

// Kullanıcının siparişlerini getiren endpoint
app.get('/api/orders', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ success: false, message: 'Kullanıcı ID gerekli.' });
  try {
    const orders = await Order.find({ user: userId });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Siparişler alınamadı.', error: err.message });
  }
});

// Yeni sipariş ekleyen endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Stok azaltma işlemi
    if (order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        const { productId, productModel, quantity } = item;
        if (productId && productModel && quantity) {
          const Model = mongoose.model(productModel);
          await Model.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
        }
      }
    }

    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Sipariş eklenemedi.', error: err.message });
  }
});

// Genel arama endpoint'i
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Arama sorgusu boş olamaz.' });
    }

    const searchQuery = { $regex: q, $options: 'i' }; // 'i' for case-insensitive

    const searchTasks = [
      Motorcycle.find({ $or: [{ name: searchQuery }, { description: searchQuery }] }).lean().exec(),
      Scooter.find({ $or: [{ name: searchQuery }, { description: searchQuery }] }).lean().exec(),
      SparePart.find({ $or: [{ name: searchQuery }, { description: searchQuery }] }).lean().exec(),
      Accessory.find({ $or: [{ name: searchQuery }, { description: searchQuery }] }).lean().exec(),
    ];

    const [motorcycles, scooters, spareParts, accessories] = await Promise.all(searchTasks);
    
    // Her bir ürüne hangi kategoriye ait olduğunu belirtmek için bir 'type' alanı ekleyelim.
    // Bu, frontend'de doğru linkleri oluşturmak için kullanışlı olacaktır.
    const results = [
      ...motorcycles.map(item => ({ ...item, type: 'motorcycle', href: `/motorcycles/${item._id}` })),
      ...scooters.map(item => ({ ...item, type: 'scooter', href: `/scooters/${item._id}` })),
      ...spareParts.map(item => ({ ...item, type: 'spare-part', href: `/spare-parts` })), // ID'ye göre detay sayfası varsayılmadı
      ...accessories.map(item => ({ ...item, type: 'accessory', href: `/accessories` })), // ID'ye göre detay sayfası varsayılmadı
    ];

    res.json({ success: true, data: results });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Arama sırasında bir hata oluştu.', error: error.message });
  }
});

// İndirimli ürünler endpoint'i
app.get('/api/discounted-products', async (req, res) => {
  try {
    const discountedProducts = await DiscountedProduct.find({});
    res.json(discountedProducts);
  } catch {
    res.status(500).json({ error: 'İndirimli ürünler alınamadı.' });
  }
});

// Kredi kartı bilgisini kaydeden endpoint
app.post('/api/creditcards', async (req, res) => {
  try {
    const { user, cardNumber, expiry, cvc } = req.body;
    if (!user || !cardNumber || !expiry || !cvc) {
      return res.status(400).json({ success: false, message: 'Tüm alanlar zorunludur.' });
    }
    const card = new CreditCard({ user, cardNumber, expiry, cvc });
    await card.save();
    res.json({ success: true, data: card });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Kart kaydedilemedi.', error: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Böyle bir endpoint yok.' });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
}); 