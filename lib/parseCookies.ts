import cookie from "cookie"
import { Request, Response } from 'express';

export function parseCookies(req:Request) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
};