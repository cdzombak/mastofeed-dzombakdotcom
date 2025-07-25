import {LogLevel, Mastofeed} from 'mastofeed';
import env from 'env-var';
import {MASTODON_INSTANCE_URL} from '../utils/env.mjs';

const BLOG_ACCESS_TOKEN = env.get('BLOG_ACCESS_TOKEN').required().asString();

export const blogFeed = new Mastofeed({
  mastodon: {
    instanceUrl: MASTODON_INSTANCE_URL,
    accessToken: BLOG_ACCESS_TOKEN,
  },
  rss: {
    feedUrl: 'https://www.dzombak.com/blog/rss/',
    postDef: {
      id: { path: 'guid' },
      title: { path: 'title' },
      linkUrl: { path: 'link' },
    },
    maxSyncedItems: 25,
  },
  logging: {
    level: LogLevel.Debug,
    prefix: 'blog',
  },
});
