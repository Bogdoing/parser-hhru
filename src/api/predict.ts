import express from 'express';

const router = express.Router();

import predictController from '../controllers/predict';

const predict = new predictController()
// router.get('/', async (req, res) => {
//     //res.json(await testController.getAll())
//     //res.json(await testController.postAll()))
//     //res.json(await testController.getParserGit(req, res))
//     //res.json(await testController.getParserHH(req, res))
// });

router.get('/', async (req, res) => {
    res.json({'predictController' : 'OK'})
});

router.get('/hh', async (req, res) => {
    res.json(await predict.getHHAllPredict())
});

router.get('/git', async (req, res) => {
    res.json(await predict.getGitAllPredict())
});

router.get('/git/:lang', async (req, res) => {
    const lang = req.params.lang
    res.json(await predict.getGitLangPredict(lang))
});


router.get('/hh/:lang', async (req, res) => {
    const lang = req.params.lang
    res.json(await predict.getHHLangPredict(lang))
});

router.get('/hh/region/:region', async (req, res) => {
    const region = req.params.region
    res.json(await predict.getHHRegionPredict(region))
});

router.get('/hh/lang/:lang/region/:region', async (req, res) => {
    const lang = req.params.lang
    const region = req.params.region
    res.json(await predict.getHHLangRegionPredict(lang, region))
});


export default router;
