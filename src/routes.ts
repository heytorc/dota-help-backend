require('dotenv').config();

import { Router } from "express";
const SteamAuth = require("node-steam-openid");

const host = `${process.env.HOST}:${process.env.PORT}`;

const steam = new SteamAuth({
  realm: host, // Site name displayed to users on logon
  returnUrl: `${host}/auth/steam/authenticate`, // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

console.log('host', host);

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

    res.sendFile(`${__dirname}/pages/close.html`);
  } catch (error) {
    console.error(error);
  }
});

export default routes;