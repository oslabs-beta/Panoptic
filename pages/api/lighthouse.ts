const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const mongoose = require('mongoose');
const User = require('../../models/loginModel.ts');
const Cookies = require('cookies');
import type { NextApiRequest, NextApiResponse } from 'next';
import express, { Request, Response, NextFunction } from 'express';

export default async function lighthouseRequest(req: Request, res: Response) {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.tuf6p.mongodb.net/Panoptic?retryWrites=true&w=majority');
  const cookies = new Cookies(req, res);
  // creates headless chrome browser to test metrics
  const chrome = await chromeLauncher.launch({ chromeFlags: [
    '--no-first-run',
    '--headless',
    '--disable-gpu',
    '--no-sandbox'
  ]
});
  // options that will be passed into lighthouse
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  console.log(req.body);
  // url argument being passed from front-end
  const url = req.body;
  // making the call to lighthouse
  const runnerResult = await lighthouse(url, options);

  // `.report` is the HTML report as a string
  // this will be used to find all other smaller metrics beyond the first four
  // json parse info so we can navigate the object
  const reportHtml = await runnerResult.report;
  const parsedData = JSON.parse(reportHtml);

  // close the headless chrome browser
  await chrome.kill();

  interface data {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  }
  // grab all the info to return to the front-end
  const scores: data = {
    performance: Math.ceil(runnerResult.lhr.categories.performance.score * 100),
    accessibility: Math.ceil(runnerResult.lhr.categories.accessibility.score * 100),
    bestPractices: Math.ceil(runnerResult.lhr.categories['best-practices'].score * 100),
    seo: Math.ceil(runnerResult.lhr.categories.seo.score * 100),
  };
  console.log(scores);
  const id = cookies.get('userId');
  let currentUser;
  if (id) {
    currentUser = await User.findOne({"_id": id});
    const currentdate = new Date(); 
    const datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/" 
      + currentdate.getFullYear() + "@"  
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();
    if(!currentUser.endpoints[url]) {
      currentUser.endpoints[url] = {};
    }
    currentUser.endpoints[url][datetime] = {
      metrics: {
        performance: Math.ceil(runnerResult.lhr.categories.performance.score * 100),
        accessibility: Math.ceil(runnerResult.lhr.categories.accessibility.score * 100),
        bestPractices: Math.ceil(runnerResult.lhr.categories['best-practices'].score * 100),
        seo: Math.ceil(runnerResult.lhr.categories.seo.score * 100),
      }
    };
  }
  console.log('current user cookie', currentUser);
  
  // overwrite the old user object with the new user object
  await currentUser.markModified('endpoints');
  await currentUser.save();
 
  // close the mongoose connection and send response back
  await mongoose.connection.close();
  res.status(200).json(scores);
};
