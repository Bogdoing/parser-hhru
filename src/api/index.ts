import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import test from './test'
import parser from './parser'
import hh from './hh'
import git from './git'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/test', test);
router.use('/parser', parser);
router.use('/hh', hh);
router.use('/git', git);

export default router;
