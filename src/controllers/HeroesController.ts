import { Request, Response } from 'express';
import { handleHeroes } from '@/providers/HeroesProvider';

const getHeroes = async (request: Request, response: Response) => {
  try {
    console.log('searching heroes...');
    const heroes = await handleHeroes();

    response.status(200).json(heroes);
  } catch (error: any) {
    response.status(500).json(error.message);
  }
};

export default { getHeroes };