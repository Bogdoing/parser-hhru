import express from 'express';

const router = express.Router();

import HHController from '../controllers/hh';

router.get('/', async (req, res) => {
    res.json(await HHController.getAll())
});

router.get('/data/:data', async (req, res) => {
    const data = req.params.data
    res.json(await HHController.getData(data))
});

router.get('/lang/:lang', async (req, res) => {
    const data = req.params.lang
    res.json(await HHController.getLang(data))
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


export default router;


