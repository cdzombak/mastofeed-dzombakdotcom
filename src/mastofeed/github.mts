import {LogLevel, Mastofeed} from 'mastofeed';
import env from 'env-var';
import {MASTODON_INSTANCE_URL} from '../utils/env.mjs';

const GITHUB_ACCESS_TOKEN = env.get('GITHUB_ACCESS_TOKEN').required().asString();

export const githubFeed = new Mastofeed({
  mastodon: {
    instanceUrl: MASTODON_INSTANCE_URL,
    accessToken: GITHUB_ACCESS_TOKEN,
  },
  rss: {
    feedUrl: 'https://www.dzombak.com/feeds/github-cdzombak.atom',
    postDef: {
      id: { path: 'guid' },
      title: { path: 'title' },
      linkUrl: { path: 'link' },
      description: { path: 'content' },
    },
    maxSyncedItems: 25,
  },
  logging: {
    level: LogLevel.Debug,
    prefix: 'bookmarks',
  },
});
