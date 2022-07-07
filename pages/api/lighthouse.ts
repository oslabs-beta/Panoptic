const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const User = require('../../models/loginModel.ts');
const Cookies = require('cookies');
import dbConnect from '../../lib/dbConnect';
import { LHData, LHOptions, MongoUser } from '../../types';
import { Request, Response } from 'express';


function isValidUrl(string) {
  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  if (matchpattern.test(string) && string.includes('www')) return true;
  return false;
}

export default async function lighthouseRequest(req: Request, res: Response):Promise<void> {
  await dbConnect();
  const cookies = new Cookies(req, res);
  let url:string = req.body.url;
  const reponame:string | null = req.body.reponame || null;
  const lastCommit:string | null = req.body.commit || null;
  const platform:string = req.body.platform ? req.body.platform : 'desktop';
  if(url[url.length - 1] !== '/') url = url.concat('/');

  if(url.slice(0, 8) !== 'https://' && url.slice(0,7) !== 'http://') {
    for(let i = 0; i < url.length; i++) {
      if(url[i] === 'w' && url[i+3] === '.') {
        url = 'https://'.concat(url.slice(i, url.length - 1));
        break;
      };
    };
  };
  try {
    if (!isValidUrl(url)){
      throw new Error('Please enter a valid url, format should be https://www.[website].com')
    }
  }
  catch (err){
    console.log("Error: Invalid url", err);
  };
  const googleUrl = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?strategy=MOBILE&url=' + url + '&key=AIzaSyCWNar-IbOaQT1WX_zfAjUxG01x7xErbSc&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO';
  const getGoogleReport = async () => {
    const response = await fetch(googleUrl, {
      headers: {
        Referer: 'https://web.dev/measure/?url=' + url
      },
    })
      .then(response => response.json())
      return response;
  }

  let runnerResult = await getGoogleReport();
  
  const scores: LHData = {
    performance: Math.ceil(runnerResult.lighthouseResult.categories.performance.score * 100),
    accessibility: Math.ceil(
      runnerResult.lighthouseResult.categories.accessibility.score * 100
    ),
    bestPractices: Math.ceil(
      runnerResult.lighthouseResult.categories['best-practices'].score * 100
    ),
    seo: Math.ceil(runnerResult.lighthouseResult.categories.seo.score * 100),
    performanceMetrics: {
      'first-contentful-paint': {
        title: runnerResult.lighthouseResult.audits['first-contentful-paint'].title,
        description:
          runnerResult.lighthouseResult.audits['first-contentful-paint'].description,
        score: runnerResult.lighthouseResult.audits['first-contentful-paint'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['first-contentful-paint'].displayValue,
      },
      'speed-index': {
        title: runnerResult.lighthouseResult.audits['speed-index'].title,
        description: runnerResult.lighthouseResult.audits['speed-index'].description,
        score: runnerResult.lighthouseResult.audits['speed-index'].score,
        displayValue: runnerResult.lighthouseResult.audits['speed-index'].displayValue,
      },
      'largest-contentful-paint': {
        title:
          runnerResult.lighthouseResult.audits['largest-contentful-paint-element'].title,
        description:
          runnerResult.lighthouseResult.audits['largest-contentful-paint'].description,
        score: runnerResult.lighthouseResult.audits['largest-contentful-paint'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['largest-contentful-paint'].displayValue,
      },
      'time-to-interactive': {
        title: runnerResult.lighthouseResult.audits['interactive'].title,
        description: runnerResult.lighthouseResult.audits['interactive'].description,
        score: runnerResult.lighthouseResult.audits['interactive'].score,
        displayValue: runnerResult.lighthouseResult.audits['interactive'].displayValue,
      },
      'total-blocking-time': {
        title: runnerResult.lighthouseResult.audits['total-blocking-time'].title,
        description: runnerResult.lighthouseResult.audits['total-blocking-time'].description,
        score: runnerResult.lighthouseResult.audits['total-blocking-time'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['total-blocking-time'].displayValue,
      },
      'cumulative-layout-shift': {
        title: runnerResult.lighthouseResult.audits['cumulative-layout-shift'].title,
        description:
          runnerResult.lighthouseResult.audits['cumulative-layout-shift'].description,
        score: runnerResult.lighthouseResult.audits['cumulative-layout-shift'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
      },
      'modern-image-formats': {
        title: runnerResult.lighthouseResult.audits['modern-image-formats'].title,
        description:
          runnerResult.lighthouseResult.audits['modern-image-formats'].description,
        score: runnerResult.lighthouseResult.audits['modern-image-formats'].score,
        displayValue:
          Math.max(
            runnerResult.lighthouseResult.audits['modern-image-formats'].numericValue / 1000
          ) + ' S',
      },
      'unused-javascript': {
        title: runnerResult.lighthouseResult.audits['unused-javascript'].title,
        description: runnerResult.lighthouseResult.audits['unused-javascript'].description,
        score: runnerResult.lighthouseResult.audits['unused-javascript'].score,
        displayValue:
          Math.max(
            runnerResult.lighthouseResult.audits['unused-javascript'].numericValue / 1000
          ) + ' S',
      },
      'minified-javascript': {
        title: runnerResult.lighthouseResult.audits['unminified-javascript'].title,
        description:
          runnerResult.lighthouseResult.audits['unminified-javascript'].description,
        score: runnerResult.lighthouseResult.audits['unminified-javascript'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['unminified-javascript'].scoreDisplayMode,
      },
      'minified-css': {
        title: runnerResult.lighthouseResult.audits['unminified-css'].title,
        description: runnerResult.lighthouseResult.audits['unminified-css'].description,
        score: runnerResult.lighthouseResult.audits['unminified-css'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['unminified-css'].scoreDisplayMode,
      },
      'preload-lcp-image': {
        title: runnerResult.lighthouseResult.audits['preload-lcp-image'].title,
        description: runnerResult.lighthouseResult.audits['preload-lcp-image'].description,
        score: runnerResult.lighthouseResult.audits['preload-lcp-image'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['preload-lcp-image'].scoreDisplayMode,
      },
      'uses-long-cache-ttl': {
        title: runnerResult.lighthouseResult.audits['uses-long-cache-ttl'].title,
        description: runnerResult.lighthouseResult.audits['uses-long-cache-ttl'].description,
        score: runnerResult.lighthouseResult.audits['uses-long-cache-ttl'].score,
        displayValue:
          runnerResult.lighthouseResult.audits['uses-long-cache-ttl'].displayValue,
      },
    },
    accessibilityMetrics: {
      'button-name': {
        title: runnerResult.lighthouseResult.audits['button-name'].title,
        description: runnerResult.lighthouseResult.audits['button-name'].description,
        score: runnerResult.lighthouseResult.audits['button-name'].score,
        displayMode: runnerResult.lighthouseResult.audits['button-name'].scoreDisplayMode,
      },
      bypass: {
        title: runnerResult.lighthouseResult.audits['bypass'].title,
        description: runnerResult.lighthouseResult.audits['bypass'].description,
        score: runnerResult.lighthouseResult.audits['bypass'].score,
        displayMode: runnerResult.lighthouseResult.audits['bypass'].scoreDisplayMode,
      },
      'link-name': {
        title: runnerResult.lighthouseResult.audits['link-name'].title,
        description: runnerResult.lighthouseResult.audits['link-name'].description,
        score: runnerResult.lighthouseResult.audits['link-name'].score,
        displayMode: runnerResult.lighthouseResult.audits['link-name'].scoreDisplayMode,
      },
    },
    bestPracticesMetrics: {
      doctype: {
        title: runnerResult.lighthouseResult.audits['doctype'].title,
        description: runnerResult.lighthouseResult.audits['doctype'].description,
        score: runnerResult.lighthouseResult.audits['doctype'].score,
        displayMode: runnerResult.lighthouseResult.audits['doctype'].scoreDisplayMode,
      },
      'is-on-https': {
        title: runnerResult.lighthouseResult.audits['is-on-https'].title,
        description: runnerResult.lighthouseResult.audits['is-on-https'].description,
        score: runnerResult.lighthouseResult.audits['is-on-https'].score,
        displayMode: runnerResult.lighthouseResult.audits['is-on-https'].scoreDisplayMode,
      },
      deprecations: {
        title: runnerResult.lighthouseResult.audits['deprecations'].title,
        description: runnerResult.lighthouseResult.audits['deprecations'].description,
        score: runnerResult.lighthouseResult.audits['deprecations'].score,
        displayMode: runnerResult.lighthouseResult.audits['deprecations'].scoreDisplayMode,
      },
      'geolocation-on-start': {
        title: runnerResult.lighthouseResult.audits['geolocation-on-start'].title,
        description:
          runnerResult.lighthouseResult.audits['geolocation-on-start'].description,
        score: runnerResult.lighthouseResult.audits['geolocation-on-start'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['geolocation-on-start'].scoreDisplayMode,
      },
      'notification-on-start': {
        title: runnerResult.lighthouseResult.audits['notification-on-start'].title,
        description:
          runnerResult.lighthouseResult.audits['notification-on-start'].description,
        score: runnerResult.lighthouseResult.audits['notification-on-start'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['notification-on-start'].scoreDisplayMode,
      },
      'image-size-responsive': {
        title: runnerResult.lighthouseResult.audits['image-size-responsive'].title,
        description:
          runnerResult.lighthouseResult.audits['image-size-responsive'].description,
        score: runnerResult.lighthouseResult.audits['image-size-responsive'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['image-size-responsive'].scoreDisplayMode,
      },
      'image-aspect-ratio': {
        title: runnerResult.lighthouseResult.audits['image-aspect-ratio'].title,
        description: runnerResult.lighthouseResult.audits['image-aspect-ratio'].description,
        score: runnerResult.lighthouseResult.audits['image-aspect-ratio'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['image-aspect-ratio'].scoreDisplayMode,
      },
      'password-inputs-can-be-pasted-into': {
        title:
          runnerResult.lighthouseResult.audits['password-inputs-can-be-pasted-into'].title,
        description:
          runnerResult.lighthouseResult.audits['password-inputs-can-be-pasted-into']
            .description,
        score:
          runnerResult.lighthouseResult.audits['password-inputs-can-be-pasted-into'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['password-inputs-can-be-pasted-into']
            .scoreDisplayMode,
      },
      'errors-in-console': {
        title: runnerResult.lighthouseResult.audits['errors-in-console'].title,
        description: runnerResult.lighthouseResult.audits['errors-in-console'].description,
        score: runnerResult.lighthouseResult.audits['errors-in-console'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['errors-in-console'].scoreDisplayMode,
      },
    },
    seoMetrics: {
      viewport: {
        title: runnerResult.lighthouseResult.audits['viewport'].title,
        description: runnerResult.lighthouseResult.audits['viewport'].description,
        score: runnerResult.lighthouseResult.audits['viewport'].score,
        displayMode: runnerResult.lighthouseResult.audits['viewport'].scoreDisplayMode,
      },
      'document-title': {
        title: runnerResult.lighthouseResult.audits['document-title'].title,
        description: runnerResult.lighthouseResult.audits['document-title'].description,
        score: runnerResult.lighthouseResult.audits['document-title'].score,
        displayMode: runnerResult.lighthouseResult.audits['document-title'].scoreDisplayMode,
      },
      'link-name': {
        title: runnerResult.lighthouseResult.audits['link-name'].title,
        description: runnerResult.lighthouseResult.audits['link-name'].description,
        score: runnerResult.lighthouseResult.audits['link-name'].score,
        displayMode: runnerResult.lighthouseResult.audits['link-name'].scoreDisplayMode,
      },
      'http-status-code': {
        title: runnerResult.lighthouseResult.audits['http-status-code'].title,
        description: runnerResult.lighthouseResult.audits['http-status-code'].description,
        score: runnerResult.lighthouseResult.audits['http-status-code'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['http-status-code'].scoreDisplayMode,
      },
      'meta-description': {
        title: runnerResult.lighthouseResult.audits['meta-description'].title,
        description: runnerResult.lighthouseResult.audits['meta-description'].description,
        score: runnerResult.lighthouseResult.audits['meta-description'].score,
        displayMode:
          runnerResult.lighthouseResult.audits['meta-description'].scoreDisplayMode,
      },
      'image-alt': {
        title: runnerResult.lighthouseResult.audits['image-alt'].title,
        description: runnerResult.lighthouseResult.audits['image-alt'].description,
        score: runnerResult.lighthouseResult.audits['image-alt'].score,
        displayMode: runnerResult.lighthouseResult.audits['image-alt'].scoreDisplayMode,
      },
    },
  };

  const id:string = cookies.get('userId');
  type currentUser = MongoUser;
  let currentUser;
  if (id) {

    currentUser = await User.findOne({ _id: id });
    const currentdate:Date = new Date();
    const datetime:string =
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

    if(!currentUser.endpoints[url]) {
      currentUser.endpoints[url] = {};
    };
    if(!currentUser.endpoints[url][platform]) {
      currentUser.endpoints[url][platform] = {};
    };
    currentUser.endpoints[url][platform][datetime] = {
      metrics: scores,
    };
    if(reponame) {
      console.log('davis test: ', reponame)
      if(!currentUser.github.repos[reponame]) {
        currentUser.github.repos[reponame] = {
          repoEndpoints: [],
          lastCommit: lastCommit,
        };
      };
      if(!currentUser.github.repos[reponame].repoEndpoints.includes(url)) {
        currentUser.github.repos[reponame].repoEndpoints.push(url);
      };
      currentUser.github.repos[reponame].lastCommit = lastCommit;
    };
  };

  await currentUser.markModified('endpoints');
  await currentUser.save();

  res.status(200).json(scores);
};
