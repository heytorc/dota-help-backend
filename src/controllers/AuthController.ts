require('dotenv').config();

import { Request, Response } from 'express';
const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
  realm: process.env.HOST, // Site name displayed to users on logon
  returnUrl: `${process.env.HOST}:${process.env.PORT}/auth/steam/authenticate`, // Your return route
  // returnUrl: `${process.env.HOST}/auth/steam/authenticate`, // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

const startAuth = async (req: Request, res: Response) => {
  const redirectUrl = await steam.getRedirectUrl();

  return res.redirect(redirectUrl);
}

const authenticated = async (req: Request, res: Response) => {
  try {
    const user = await steam.authenticate(req);

    const io = req.app.locals.io;

    io.emit('Backend:UserAuthenticated', user);

    res.send('<script>window.close()</script>');
    res.status(200);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message })
  }
}

export default { startAuth, authenticated }