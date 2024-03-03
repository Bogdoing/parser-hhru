import express from 'express';

const router = express.Router();

import GitController from '../controllers/git';

router.get('/', async (req, res) => {
    res.json(await GitController.getAll())
});

router.get('/data/:data', async (req, res) => {
    const data = req.params.data
    res.json(await GitController.getData(data))
});

router.get('/lang/:lang', async (req, res) => {
    const lang = req.params.lang
    res.json(await GitController.getLang(lang))
});

router.get('/dataLang/:data/:lang', async (req, res) => {
    const data = req.params.data
    const lang = req.params.lang
    res.json(await GitController.getDataLang(data, lang))
});


export default router;


