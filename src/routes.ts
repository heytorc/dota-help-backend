require('dotenv').config();

import { Router } from "express";

import AuthController from '@/controllers/AuthController';
import HeroesController from '@/controllers/HeroesController';

const routes = Router();

// Auth
routes.get("/auth/steam", AuthController.startAuth);
routes.get("/auth/steam/authenticate", AuthController.authenticated);

// Heroes
routes.get("/heroes", HeroesController.getHeroes);

export default routes;