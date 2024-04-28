import { Request, Response } from 'express';
import LikesModel from '../models/Likes';
import AbstractController from './AbstractController';

class LikesController extends AbstractController {
  constructor() {
    super(new LikesModel());
  }
}

export default LikesController;