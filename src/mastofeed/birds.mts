import {Mastofeed} from 'mastofeed';
import env from 'env-var';
import { MASTODON_INSTANCE_URL, LOG_LEVEL } from '../utils/env.mjs';
import {DateTransform} from './transform.mts.js';

const BIRDS_ACCESS_TOKEN = env.get('BIRDS_ACCESS_TOKEN').required().asString();

export const birdsFeed = new Mastofeed({
  mastodon: {
    instanceUrl: MASTODON_INSTANCE_URL,
    accessToken: BIRDS_ACCESS_TOKEN,
  },
  rss: {
    feedUrl: 'https://www.dzombak.com/feeds/birds.rss.xml',
    postDef: {
      id: { path: 'guid' },
      // the kicker renders immediately above the title, separated by a single newline
      kicker: { path: 'pubDate', transforms: [new DateTransform()] },
      title: { path: 'title' },
      description: { path: 'content' },
      linkUrl: { path: 'link' },
    },
    maxSyncedItems: 25,
  },
  logging: {
    level: LOG_LEVEL,
    prefix: 'birds',
  },
});
