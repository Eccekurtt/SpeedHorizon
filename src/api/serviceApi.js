const express = require('express');
const router = express.Router();
const Service = require('./Service');

// Tüm servisleri listele
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Servisler listelenirken hata oluştu.' });
    }
});

// Yeni servis ekle
router.post('/', async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const newService = new Service({ name, description, price, category });
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: 'Servis eklenirken hata oluştu.' });
    }
});

// Belirli bir servisi getir
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servis bulunamadı.' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Servis getirilirken hata oluştu.' });
    }
});

// Servis güncelle
router.put('/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) return res.status(404).json({ message: 'Servis bulunamadı.' });
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: 'Servis güncellenirken hata oluştu.' });
    }
});

// Servis sil
router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Servis bulunamadı.' });
        res.json({ message: 'Servis silindi.' });
    } catch (err) {
        res.status(500).json({ message: 'Servis silinirken hata oluştu.' });
    }
});

module.exports = router; 