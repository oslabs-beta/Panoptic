const lighthouse = require('lighthouse');
// const chromeLauncher = require('chrome-launcher');
import { LHData, LHOptions } from '../../types';
import express, { Request, Response } from 'express';
// import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';
import { URL } from 'url';

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    const puppeteer = require('puppeteer-core');
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

export default async function lighthouseRequest(
  req: Request,
  res: Response
): Promise<void> {
  // const chrome: any = await puppeteer.launch({
  //   // args: chromium.args,
  //   // executablePath: await chromium.executablePath,
  //   // process.env.NODE_ENV !== 'development'
  //   //   ? await chromium.executablePath
  //   //   : '/bin/chromium',
  //   headless: true,
  //   // ignoreDefaultArgs: ['--disable-extensions'],
  // });

  const chrome = await getBrowserInstance();

  console.log(chrome.wsEndpoint());
  // const { port } = new URL(browser.wsEndpoint());

  let chromePort;
  if (chrome) {
    const { port } = new URL(chrome.wsEndpoint());
    chromePort = new URL(chrome.wsEndpoint()).port;
  }
  console.log(chromePort);

  const options: LHOptions = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chromePort,
  };

  const url = req.body;
  const runnerResult = await lighthouse(url, options);

  // await chrome.kill();

  await chrome.close();
  // grab all the info to return to the front-end
  const scores: LHData = {
    performance: Math.ceil(runnerResult.lhr.categories.performance.score * 100),
    accessibility: Math.ceil(
      runnerResult.lhr.categories.accessibility.score * 100
    ),
    bestPractices: Math.ceil(
      runnerResult.lhr.categories['best-practices'].score * 100
    ),
    seo: Math.ceil(runnerResult.lhr.categories.seo.score * 100),
    performanceMetrics: {
      'first-contentful-paint': {
        title: runnerResult.lhr.audits['first-contentful-paint'].title,
        description:
          runnerResult.lhr.audits['first-contentful-paint'].description,
        score: runnerResult.lhr.audits['first-contentful-paint'].score,
        displayValue:
          runnerResult.lhr.audits['first-contentful-paint'].displayValue,
      },
      'speed-index': {
        title: runnerResult.lhr.audits['speed-index'].title,
        description: runnerResult.lhr.audits['speed-index'].description,
        score: runnerResult.lhr.audits['speed-index'].score,
        displayValue: runnerResult.lhr.audits['speed-index'].displayValue,
      },
      'largest-contentful-paint': {
        title:
          runnerResult.lhr.audits['largest-contentful-paint-element'].title,
        description:
          runnerResult.lhr.audits['largest-contentful-paint'].description,
        score: runnerResult.lhr.audits['largest-contentful-paint'].score,
        displayValue:
          runnerResult.lhr.audits['largest-contentful-paint'].displayValue,
      },
      'time-to-interactive': {
        title: runnerResult.lhr.audits['interactive'].title,
        description: runnerResult.lhr.audits['interactive'].description,
        score: runnerResult.lhr.audits['interactive'].score,
        displayValue: runnerResult.lhr.audits['interactive'].displayValue,
      },
      'total-blocking-time': {
        title: runnerResult.lhr.audits['total-blocking-time'].title,
        description: runnerResult.lhr.audits['total-blocking-time'].description,
        score: runnerResult.lhr.audits['total-blocking-time'].score,
        displayValue:
          runnerResult.lhr.audits['total-blocking-time'].displayValue,
      },
      'cumulative-layout-shift': {
        title: runnerResult.lhr.audits['cumulative-layout-shift'].title,
        description:
          runnerResult.lhr.audits['cumulative-layout-shift'].description,
        score: runnerResult.lhr.audits['cumulative-layout-shift'].score,
        displayValue:
          runnerResult.lhr.audits['cumulative-layout-shift'].displayValue,
      },
      'modern-image-formats': {
        title: runnerResult.lhr.audits['modern-image-formats'].title,
        description:
          runnerResult.lhr.audits['modern-image-formats'].description,
        score: runnerResult.lhr.audits['modern-image-formats'].score,
        displayValue:
          Math.max(
            runnerResult.lhr.audits['modern-image-formats'].numericValue / 1000
          ) + ' S',
      },
      'unused-javascript': {
        title: runnerResult.lhr.audits['unused-javascript'].title,
        description: runnerResult.lhr.audits['unused-javascript'].description,
        score: runnerResult.lhr.audits['unused-javascript'].score,
        displayValue:
          Math.max(
            runnerResult.lhr.audits['unused-javascript'].numericValue / 1000
          ) + ' S',
      },
      'minified-javascript': {
        title: runnerResult.lhr.audits['unminified-javascript'].title,
        description:
          runnerResult.lhr.audits['unminified-javascript'].description,
        score: runnerResult.lhr.audits['unminified-javascript'].score,
        displayValue:
          runnerResult.lhr.audits['unminified-javascript'].scoreDisplayMode,
      },
      'minified-css': {
        title: runnerResult.lhr.audits['unminified-css'].title,
        description: runnerResult.lhr.audits['unminified-css'].description,
        score: runnerResult.lhr.audits['unminified-css'].score,
        displayValue:
          runnerResult.lhr.audits['unminified-css'].scoreDisplayMode,
      },
      'preload-lcp-image': {
        title: runnerResult.lhr.audits['preload-lcp-image'].title,
        description: runnerResult.lhr.audits['preload-lcp-image'].description,
        score: runnerResult.lhr.audits['preload-lcp-image'].score,
        displayValue:
          runnerResult.lhr.audits['preload-lcp-image'].scoreDisplayMode,
      },
      'uses-long-cache-ttl': {
        title: runnerResult.lhr.audits['uses-long-cache-ttl'].title,
        description: runnerResult.lhr.audits['uses-long-cache-ttl'].description,
        score: runnerResult.lhr.audits['uses-long-cache-ttl'].score,
        displayValue:
          runnerResult.lhr.audits['uses-long-cache-ttl'].displayValue,
      },
    },
    accessibilityMetrics: {
      'button-name': {
        title: runnerResult.lhr.audits['button-name'].title,
        description: runnerResult.lhr.audits['button-name'].description,
        score: runnerResult.lhr.audits['button-name'].score,
        displayMode: runnerResult.lhr.audits['button-name'].scoreDisplayMode,
      },
      bypass: {
        title: runnerResult.lhr.audits['bypass'].title,
        description: runnerResult.lhr.audits['bypass'].description,
        score: runnerResult.lhr.audits['bypass'].score,
        displayMode: runnerResult.lhr.audits['bypass'].scoreDisplayMode,
      },
      'link-name': {
        title: runnerResult.lhr.audits['link-name'].title,
        description: runnerResult.lhr.audits['link-name'].description,
        score: runnerResult.lhr.audits['link-name'].score,
        displayMode: runnerResult.lhr.audits['link-name'].scoreDisplayMode,
      },
    },
    bestPracticesMetrics: {
      doctype: {
        title: runnerResult.lhr.audits['doctype'].title,
        description: runnerResult.lhr.audits['doctype'].description,
        score: runnerResult.lhr.audits['doctype'].score,
        displayMode: runnerResult.lhr.audits['doctype'].scoreDisplayMode,
      },
      'is-on-https': {
        title: runnerResult.lhr.audits['is-on-https'].title,
        description: runnerResult.lhr.audits['is-on-https'].description,
        score: runnerResult.lhr.audits['is-on-https'].score,
        displayMode: runnerResult.lhr.audits['is-on-https'].scoreDisplayMode,
      },
      deprecations: {
        title: runnerResult.lhr.audits['deprecations'].title,
        description: runnerResult.lhr.audits['deprecations'].description,
        score: runnerResult.lhr.audits['deprecations'].score,
        displayMode: runnerResult.lhr.audits['deprecations'].scoreDisplayMode,
      },
      'geolocation-on-start': {
        title: runnerResult.lhr.audits['geolocation-on-start'].title,
        description:
          runnerResult.lhr.audits['geolocation-on-start'].description,
        score: runnerResult.lhr.audits['geolocation-on-start'].score,
        displayMode:
          runnerResult.lhr.audits['geolocation-on-start'].scoreDisplayMode,
      },
      'notification-on-start': {
        title: runnerResult.lhr.audits['notification-on-start'].title,
        description:
          runnerResult.lhr.audits['notification-on-start'].description,
        score: runnerResult.lhr.audits['notification-on-start'].score,
        displayMode:
          runnerResult.lhr.audits['notification-on-start'].scoreDisplayMode,
      },
      'image-size-responsive': {
        title: runnerResult.lhr.audits['image-size-responsive'].title,
        description:
          runnerResult.lhr.audits['image-size-responsive'].description,
        score: runnerResult.lhr.audits['image-size-responsive'].score,
        displayMode:
          runnerResult.lhr.audits['image-size-responsive'].scoreDisplayMode,
      },
      'image-aspect-ratio': {
        title: runnerResult.lhr.audits['image-aspect-ratio'].title,
        description: runnerResult.lhr.audits['image-aspect-ratio'].description,
        score: runnerResult.lhr.audits['image-aspect-ratio'].score,
        displayMode:
          runnerResult.lhr.audits['image-aspect-ratio'].scoreDisplayMode,
      },
      'password-inputs-can-be-pasted-into': {
        title:
          runnerResult.lhr.audits['password-inputs-can-be-pasted-into'].title,
        description:
          runnerResult.lhr.audits['password-inputs-can-be-pasted-into']
            .description,
        score:
          runnerResult.lhr.audits['password-inputs-can-be-pasted-into'].score,
        displayMode:
          runnerResult.lhr.audits['password-inputs-can-be-pasted-into']
            .scoreDisplayMode,
      },
      'errors-in-console': {
        title: runnerResult.lhr.audits['errors-in-console'].title,
        description: runnerResult.lhr.audits['errors-in-console'].description,
        score: runnerResult.lhr.audits['errors-in-console'].score,
        displayMode:
          runnerResult.lhr.audits['errors-in-console'].scoreDisplayMode,
      },
    },
    seoMetrics: {
      viewport: {
        title: runnerResult.lhr.audits['viewport'].title,
        description: runnerResult.lhr.audits['viewport'].description,
        score: runnerResult.lhr.audits['viewport'].score,
        displayMode: runnerResult.lhr.audits['viewport'].scoreDisplayMode,
      },
      'document-title': {
        title: runnerResult.lhr.audits['document-title'].title,
        description: runnerResult.lhr.audits['document-title'].description,
        score: runnerResult.lhr.audits['document-title'].score,
        displayMode: runnerResult.lhr.audits['document-title'].scoreDisplayMode,
      },
      'link-name': {
        title: runnerResult.lhr.audits['link-name'].title,
        description: runnerResult.lhr.audits['link-name'].description,
        score: runnerResult.lhr.audits['link-name'].score,
        displayMode: runnerResult.lhr.audits['link-name'].scoreDisplayMode,
      },
      'http-status-code': {
        title: runnerResult.lhr.audits['http-status-code'].title,
        description: runnerResult.lhr.audits['http-status-code'].description,
        score: runnerResult.lhr.audits['http-status-code'].score,
        displayMode:
          runnerResult.lhr.audits['http-status-code'].scoreDisplayMode,
      },
      'meta-description': {
        title: runnerResult.lhr.audits['meta-description'].title,
        description: runnerResult.lhr.audits['meta-description'].description,
        score: runnerResult.lhr.audits['meta-description'].score,
        displayMode:
          runnerResult.lhr.audits['meta-description'].scoreDisplayMode,
      },
      'image-alt': {
        title: runnerResult.lhr.audits['image-alt'].title,
        description: runnerResult.lhr.audits['image-alt'].description,
        score: runnerResult.lhr.audits['image-alt'].score,
        displayMode: runnerResult.lhr.audits['image-alt'].scoreDisplayMode,
      },
    },
  };
  res.status(200).json(scores);
}
