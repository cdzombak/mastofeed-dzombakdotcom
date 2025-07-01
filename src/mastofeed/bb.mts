import {Mastofeed} from 'mastofeed';
import env from 'env-var';
import { MASTODON_INSTANCE_URL, LOG_LEVEL } from '../utils/env.mjs';

const BB_ACCESS_TOKEN = env.get('BB_ACCESS_TOKEN').required().asString();

export const bbFeed = new Mastofeed({
  mastodon: {
    instanceUrl: MASTODON_INSTANCE_URL,
    accessToken: BB_ACCESS_TOKEN,
  },
  rss: {
    feedUrl: 'https://www.dzombak.com/feeds/pictures-birdbuddy.rss.xml',
    postDef: {
      id: { path: 'guid' },
      title: { path: 'title' },
      description: { path: 'content' },
      linkUrl: { path: 'link' },
      category: { path: 'category' },
    },
    maxSyncedItems: 25,
  },
  logging: {
    level: LOG_LEVEL,
    prefix: 'bb',
  },
});
