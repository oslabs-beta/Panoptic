const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
import type { NextApiRequest, NextApiResponse } from 'next';
import express, { Request, Response, NextFunction } from 'express';

export default async function lighthouseRequest(req: Request, res: Response) {
  // creates headless chrome browser to test metrics
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
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
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
  };
  console.log(scores);
  res.status(200).json(scores);
}
