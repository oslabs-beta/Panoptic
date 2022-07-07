const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
import { LHData, LHOptions } from '../../types';
import express, { Request, Response } from 'express';
const User = require('../../models/loginModel.ts');
import dbConnect from '../../lib/dbConnect';

export default async function lighthouseRequest(
  req: Request,
  res: Response
): Promise<void> {
  await dbConnect();
  // https://www.google.com/
  // https://www.hulu.com/
  const { url, email, platform } = req.body;
  const googleUrl =
    'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?strategy=MOBILE&url=' +
    url +
    '&key=AIzaSyCWNar-IbOaQT1WX_zfAjUxG01x7xErbSc&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO';

  const response = await fetch(googleUrl, {
    headers: {
      Referer: 'https://web.dev/measure/?url=' + url,
    },
  }).then((response) => response.json());
  console.log(
    'response ===' + response.lighthouseResult.categories.performance.score
  );
  // grab all the info to return to the front-end
  const scores: LHData = {
    performance: Math.ceil(
      response.lighthouseResult.categories.performance.score * 100
    ),
    accessibility: Math.ceil(
      response.lighthouseResult.categories.accessibility.score * 100
    ),
    bestPractices: Math.ceil(
      response.lighthouseResult.categories['best-practices'].score * 100
    ),
    seo: Math.ceil(response.lighthouseResult.categories.seo.score * 100),
    performanceMetrics: {
      'first-contentful-paint': {
        title: response.lighthouseResult.audits['first-contentful-paint'].title,
        description:
          response.lighthouseResult.audits['first-contentful-paint']
            .description,
        score: response.lighthouseResult.audits['first-contentful-paint'].score,
        displayValue:
          response.lighthouseResult.audits['first-contentful-paint']
            .displayValue,
      },
      'speed-index': {
        title: response.lighthouseResult.audits['speed-index'].title,
        description:
          response.lighthouseResult.audits['speed-index'].description,
        score: response.lighthouseResult.audits['speed-index'].score,
        displayValue:
          response.lighthouseResult.audits['speed-index'].displayValue,
      },
      'largest-contentful-paint': {
        title:
          response.lighthouseResult.audits['largest-contentful-paint-element']
            .title,
        description:
          response.lighthouseResult.audits['largest-contentful-paint']
            .description,
        score:
          response.lighthouseResult.audits['largest-contentful-paint'].score,
        displayValue:
          response.lighthouseResult.audits['largest-contentful-paint']
            .displayValue,
      },
      'time-to-interactive': {
        title: response.lighthouseResult.audits['interactive'].title,
        description:
          response.lighthouseResult.audits['interactive'].description,
        score: response.lighthouseResult.audits['interactive'].score,
        displayValue:
          response.lighthouseResult.audits['interactive'].displayValue,
      },
      'total-blocking-time': {
        title: response.lighthouseResult.audits['total-blocking-time'].title,
        description:
          response.lighthouseResult.audits['total-blocking-time'].description,
        score: response.lighthouseResult.audits['total-blocking-time'].score,
        displayValue:
          response.lighthouseResult.audits['total-blocking-time'].displayValue,
      },
      'cumulative-layout-shift': {
        title:
          response.lighthouseResult.audits['cumulative-layout-shift'].title,
        description:
          response.lighthouseResult.audits['cumulative-layout-shift']
            .description,
        score:
          response.lighthouseResult.audits['cumulative-layout-shift'].score,
        displayValue:
          response.lighthouseResult.audits['cumulative-layout-shift']
            .displayValue,
      },
      'modern-image-formats': {
        title: response.lighthouseResult.audits['modern-image-formats'].title,
        description:
          response.lighthouseResult.audits['modern-image-formats'].description,
        score: response.lighthouseResult.audits['modern-image-formats'].score,
        displayValue:
          Math.max(
            response.lighthouseResult.audits['modern-image-formats']
              .numericValue / 1000
          ) + ' S',
      },
      'unused-javascript': {
        title: response.lighthouseResult.audits['unused-javascript'].title,
        description:
          response.lighthouseResult.audits['unused-javascript'].description,
        score: response.lighthouseResult.audits['unused-javascript'].score,
        displayValue:
          Math.max(
            response.lighthouseResult.audits['unused-javascript'].numericValue /
              1000
          ) + ' S',
      },
      'minified-javascript': {
        title: response.lighthouseResult.audits['unminified-javascript'].title,
        description:
          response.lighthouseResult.audits['unminified-javascript'].description,
        score: response.lighthouseResult.audits['unminified-javascript'].score,
        displayValue:
          response.lighthouseResult.audits['unminified-javascript']
            .scoreDisplayMode,
      },
      'minified-css': {
        title: response.lighthouseResult.audits['unminified-css'].title,
        description:
          response.lighthouseResult.audits['unminified-css'].description,
        score: response.lighthouseResult.audits['unminified-css'].score,
        displayValue:
          response.lighthouseResult.audits['unminified-css'].scoreDisplayMode,
      },
      'preload-lcp-image': {
        title: response.lighthouseResult.audits['preload-lcp-image'].title,
        description:
          response.lighthouseResult.audits['preload-lcp-image'].description,
        score: response.lighthouseResult.audits['preload-lcp-image'].score,
        displayValue:
          response.lighthouseResult.audits['preload-lcp-image']
            .scoreDisplayMode,
      },
      'uses-long-cache-ttl': {
        title: response.lighthouseResult.audits['uses-long-cache-ttl'].title,
        description:
          response.lighthouseResult.audits['uses-long-cache-ttl'].description,
        score: response.lighthouseResult.audits['uses-long-cache-ttl'].score,
        displayValue:
          response.lighthouseResult.audits['uses-long-cache-ttl'].displayValue,
      },
    },
    accessibilityMetrics: {
      'button-name': {
        title: response.lighthouseResult.audits['button-name'].title,
        description:
          response.lighthouseResult.audits['button-name'].description,
        score: response.lighthouseResult.audits['button-name'].score,
        displayMode:
          response.lighthouseResult.audits['button-name'].scoreDisplayMode,
      },
      bypass: {
        title: response.lighthouseResult.audits['bypass'].title,
        description: response.lighthouseResult.audits['bypass'].description,
        score: response.lighthouseResult.audits['bypass'].score,
        displayMode:
          response.lighthouseResult.audits['bypass'].scoreDisplayMode,
      },
      'link-name': {
        title: response.lighthouseResult.audits['link-name'].title,
        description: response.lighthouseResult.audits['link-name'].description,
        score: response.lighthouseResult.audits['link-name'].score,
        displayMode:
          response.lighthouseResult.audits['link-name'].scoreDisplayMode,
      },
    },
    bestPracticesMetrics: {
      doctype: {
        title: response.lighthouseResult.audits['doctype'].title,
        description: response.lighthouseResult.audits['doctype'].description,
        score: response.lighthouseResult.audits['doctype'].score,
        displayMode:
          response.lighthouseResult.audits['doctype'].scoreDisplayMode,
      },
      'is-on-https': {
        title: response.lighthouseResult.audits['is-on-https'].title,
        description:
          response.lighthouseResult.audits['is-on-https'].description,
        score: response.lighthouseResult.audits['is-on-https'].score,
        displayMode:
          response.lighthouseResult.audits['is-on-https'].scoreDisplayMode,
      },
      deprecations: {
        title: response.lighthouseResult.audits['deprecations'].title,
        description:
          response.lighthouseResult.audits['deprecations'].description,
        score: response.lighthouseResult.audits['deprecations'].score,
        displayMode:
          response.lighthouseResult.audits['deprecations'].scoreDisplayMode,
      },
      'geolocation-on-start': {
        title: response.lighthouseResult.audits['geolocation-on-start'].title,
        description:
          response.lighthouseResult.audits['geolocation-on-start'].description,
        score: response.lighthouseResult.audits['geolocation-on-start'].score,
        displayMode:
          response.lighthouseResult.audits['geolocation-on-start']
            .scoreDisplayMode,
      },
      'notification-on-start': {
        title: response.lighthouseResult.audits['notification-on-start'].title,
        description:
          response.lighthouseResult.audits['notification-on-start'].description,
        score: response.lighthouseResult.audits['notification-on-start'].score,
        displayMode:
          response.lighthouseResult.audits['notification-on-start']
            .scoreDisplayMode,
      },
      'image-size-responsive': {
        title: response.lighthouseResult.audits['image-size-responsive'].title,
        description:
          response.lighthouseResult.audits['image-size-responsive'].description,
        score: response.lighthouseResult.audits['image-size-responsive'].score,
        displayMode:
          response.lighthouseResult.audits['image-size-responsive']
            .scoreDisplayMode,
      },
      'image-aspect-ratio': {
        title: response.lighthouseResult.audits['image-aspect-ratio'].title,
        description:
          response.lighthouseResult.audits['image-aspect-ratio'].description,
        score: response.lighthouseResult.audits['image-aspect-ratio'].score,
        displayMode:
          response.lighthouseResult.audits['image-aspect-ratio']
            .scoreDisplayMode,
      },
      'password-inputs-can-be-pasted-into': {
        title:
          response.lighthouseResult.audits['password-inputs-can-be-pasted-into']
            .title,
        description:
          response.lighthouseResult.audits['password-inputs-can-be-pasted-into']
            .description,
        score:
          response.lighthouseResult.audits['password-inputs-can-be-pasted-into']
            .score,
        displayMode:
          response.lighthouseResult.audits['password-inputs-can-be-pasted-into']
            .scoreDisplayMode,
      },
      'errors-in-console': {
        title: response.lighthouseResult.audits['errors-in-console'].title,
        description:
          response.lighthouseResult.audits['errors-in-console'].description,
        score: response.lighthouseResult.audits['errors-in-console'].score,
        displayMode:
          response.lighthouseResult.audits['errors-in-console']
            .scoreDisplayMode,
      },
    },
    seoMetrics: {
      viewport: {
        title: response.lighthouseResult.audits['viewport'].title,
        description: response.lighthouseResult.audits['viewport'].description,
        score: response.lighthouseResult.audits['viewport'].score,
        displayMode:
          response.lighthouseResult.audits['viewport'].scoreDisplayMode,
      },
      'document-title': {
        title: response.lighthouseResult.audits['document-title'].title,
        description:
          response.lighthouseResult.audits['document-title'].description,
        score: response.lighthouseResult.audits['document-title'].score,
        displayMode:
          response.lighthouseResult.audits['document-title'].scoreDisplayMode,
      },
      'link-name': {
        title: response.lighthouseResult.audits['link-name'].title,
        description: response.lighthouseResult.audits['link-name'].description,
        score: response.lighthouseResult.audits['link-name'].score,
        displayMode:
          response.lighthouseResult.audits['link-name'].scoreDisplayMode,
      },
      'http-status-code': {
        title: response.lighthouseResult.audits['http-status-code'].title,
        description:
          response.lighthouseResult.audits['http-status-code'].description,
        score: response.lighthouseResult.audits['http-status-code'].score,
        displayMode:
          response.lighthouseResult.audits['http-status-code'].scoreDisplayMode,
      },
      'meta-description': {
        title: response.lighthouseResult.audits['meta-description'].title,
        description:
          response.lighthouseResult.audits['meta-description'].description,
        score: response.lighthouseResult.audits['meta-description'].score,
        displayMode:
          response.lighthouseResult.audits['meta-description'].scoreDisplayMode,
      },
      'image-alt': {
        title: response.lighthouseResult.audits['image-alt'].title,
        description: response.lighthouseResult.audits['image-alt'].description,
        score: response.lighthouseResult.audits['image-alt'].score,
        displayMode:
          response.lighthouseResult.audits['image-alt'].scoreDisplayMode,
      },
    },
  };
  const currentUser = await User.findOne({ email: email });
  const currentdate: Date = new Date();
  const datetime: string =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    '@' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();

  if (!currentUser.endpoints[url]) {
    currentUser.endpoints[url] = {};
  }
  if (!currentUser.endpoints[url][platform]) {
    currentUser.endpoints[url][platform] = {};
  }
  currentUser.endpoints[url][platform][datetime] = {
    metrics: scores,
  };
  await currentUser.markModified('endpoints');
  await currentUser.save();

  res.status(200).json(scores);
}
