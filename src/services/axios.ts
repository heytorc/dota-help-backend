require('dotenv').config();

import axios from 'axios';

const steamAPI = axios.create({
  baseURL: process.env.STEAM_API_URL,
  params: {
    key: process.env.STEAM_API_KEY,
    language: process.env.STEAM_LANGUAGE
  }
});

const dotaImagesAPI = axios.create({
  baseURL: process.env.DOTA_IMAGES_API
});

export { steamAPI, dotaImagesAPI };