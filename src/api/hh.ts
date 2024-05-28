import express from 'express';

const router = express.Router();

import HHController from '../controllers/hh';

router.get('/', async (req, res) => {
    res.json(await HHController.getAll())
});

router.get('/allData', async (req, res) => {
    res.json(await HHController.getAllData())
});

router.get('/allLang', async (req, res) => {
    res.json(await HHController.getAllLang())
});

router.get('/allRegion', async (req, res) => {
    res.json(await HHController.getAllRegion())
});

router.get('/data/:data', async (req, res) => {
    const data = req.params.data
    res.json(await HHController.getData(data))
});

router.get('/lang/:lang', async (req, res) => {
    const data = req.params.lang
    res.json(await HHController.getLang(data))
});

router.get('/region/:region', async (req, res) => {
    const data = req.params.region
    res.json(await HHController.getRegion(data))
});

router.get('/langRegion/:lang/:region', async (req, res) => {
    const lang = req.params.lang
    const region = req.params.region
    res.json(await HHController.getLangRegion(lang, region))
});

router.get('/langData/:lang/:data', async (req, res) => {
    const lang = req.params.lang
    const data = req.params.data
    res.json(await HHController.getLangData(lang, data))
});

router.get('/dataRegion/:data/:region', async (req, res) => {
    ///device-management/managed-devices?region=USA&brand=XYZ
    const data = req.params.data
    const region = req.params.region
    res.json(await HHController.getDataRegion(data, region))
});


export default router;


