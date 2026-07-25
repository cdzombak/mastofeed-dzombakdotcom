import {LogLevel, Mastofeed} from 'mastofeed';
import env from 'env-var';
import {MASTODON_INSTANCE_URL} from '../utils/env.mjs';
import {TrimTransform} from "./transform.mts.js";

const BOOKMARKS_ACCESS_TOKEN = env.get('BOOKMARKS_ACCESS_TOKEN').required().asString();

export const bookmarksFeed = new Mastofeed({
  mastodon: {
    instanceUrl: MASTODON_INSTANCE_URL,
    accessToken: BOOKMARKS_ACCESS_TOKEN,
  },
  rss: {
    feedUrl: 'https://www.dzombak.com/feeds/bookmarks.rss.xml',
    postDef: {
      id: { path: 'guid' },
      title: { path: 'title', transforms: [new TrimTransform()] },
      description: { path: 'content' },
      linkUrl: { path: 'link' },
    },
    maxSyncedItems: 25,
  },
  logging: {
    level: LogLevel.Debug,
    prefix: 'bookmarks',
  },
});
