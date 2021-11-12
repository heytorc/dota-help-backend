require('dotenv').config();

import { steamAPI, dotaImagesAPI } from 'services/axios';

const handleHeroes = async () => {
  try {
    const { data: { result: { heroes = [] } } } = await steamAPI.get(`/IEconDOTA2_${process.env.DOTA_APP_ID}/GetHeroes/v1`);

    return heroes;
  } catch (error) {
    throw new Error("error to get heroes");
  }
};

const handleHeroImage = async (heroName: string, size: 'small' | 'large' | 'full' | 'vert') => {
  const sizeObject = {
    'small': 'sb',
    'large': 'lg',
    'full': 'full',
    'vert': 'vert'
  }

  const realHeroName = heroName.split('npc_dota_hero_')[1] || heroName;

  const { data } = await dotaImagesAPI.get(`/heroes/${realHeroName}_${sizeObject[size]}.png`);

  return data;
};

export { handleHeroes, handleHeroImage };