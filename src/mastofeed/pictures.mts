import { Mastofeed } from 'mastofeed';
import env from 'env-var';
import { MASTODON_INSTANCE_URL, LOG_LEVEL } from '../utils/env.mjs';

const PICTURES_ACCESS_TOKEN = env.get('PICTURES_ACCESS_TOKEN').required().asString();

export const picturesFeed = new Mastofeed({
  mastodon: {
    instanceUrl: MASTODON_INSTANCE_URL,
    accessToken: PICTURES_ACCESS_TOKEN,
  },
  rss: {
    feedUrl: 'https://www.dzombak.com/feeds/pictures.rss.xml',
    postDef: {
      id: { path: 'guid' },
      title: { path: 'title' },
      description: { path: 'content', transforms: [] },
      linkUrl: { path: 'link' },
      category: { path: 'category' },
    },
    maxSyncedItems: 2,
  },
  logging: {
    level: LOG_LEVEL,
    prefix: 'pictures',
  },
});
