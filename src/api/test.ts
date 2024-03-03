import express from 'express';

const router = express.Router();

import testController from '../controllers/test';


// router.get('/', async (req, res) => {
//     //res.json(await testController.getAll())
//     //res.json(await testController.postAll()))
//     //res.json(await testController.getParserGit(req, res))
//     //res.json(await testController.getParserHH(req, res))
// });

router.get('/', async (req, res) => {
    res.json(await testController.getAll())
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    res.json(await testController.getById(id))
});

router.get('/lang/:lang', async (req, res) => {
    const lang = req.params.lang
    res.json(await testController.getByLang(lang))
});

router.get('/date/:date', async (req, res) => {
    const date = req.params.date;
    res.json(await testController.getByDate(date))
});

router.get('/post/hh', async (req, res) => {
    res.json(await testController.postAllHH())
});

router.get('/post/git', async (req, res) => {
    res.json(await testController.postAllGit())
});

export default router;
