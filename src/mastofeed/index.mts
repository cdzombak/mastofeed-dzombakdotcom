import { Mastofeed } from 'mastofeed';
import { picturesFeed } from './pictures.mjs';
import { bbFeed } from './bb.mjs';
import { bookmarksFeed } from './bookmarks.mjs';
import { blogFeed } from './blog.mjs';

const allFeeds: Mastofeed[] = [
  picturesFeed,
  bbFeed,
  bookmarksFeed,
  blogFeed,
];

export async function syncAllFeeds(): Promise<void> {
  console.log(`Syncing ${allFeeds.length} feeds...`);
  for (const feed of allFeeds) {
    try {
      await feed.sync();
    } catch (err) {
      console.error(`Error syncing feed '${feed.rssFeedUrl}': ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`);
    }
  }
  console.log(`Done syncing ${allFeeds.length} feeds.`);
}
