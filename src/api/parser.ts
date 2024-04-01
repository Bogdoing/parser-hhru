import express from 'express';

const router = express.Router();

import parserController from '../controllers/parser';

router.get('/', async (req, res) => {
    res.json( { msg: 'parserController - OK' } )
});

router.get('/hh', async (req, res) => {
    const resHH = await parserController.getParserHH()
    //console.log(resHH)
    res.json(resHH)
});

router.get('/git', async (req, res) => {
    const resGit = await parserController.getParserGit()
    //console.log(resGit)
    res.json(resGit)
});

export default router;


