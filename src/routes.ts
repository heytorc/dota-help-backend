require('dotenv').config();

import { Router } from "express";
const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
  realm: process.env.HOST, // Site name displayed to users on logon
  returnUrl: `${process.env.HOST}/auth/steam/authenticate`, // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

const routes = Router();

routes.get("/auth/steam", async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  return res.redirect(redirectUrl);
});

routes.get("/auth/steam/authenticate", async (req, res) => {
  try {
    const user = await steam.authenticate(req);

    const io = req.app.locals.io;

    io.emit('Backend:UserAuthenticated', user);

    res.sendFile('./pages/close.html');
  } catch (error) {
    console.error(error);
  }
});

export default routes;