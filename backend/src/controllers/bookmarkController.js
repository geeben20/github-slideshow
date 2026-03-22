import { User } from '../models/User.js';

export async function toggleBookmark(req, res) {
  const user = await User.findById(req.user.id);
  const existing = user.bookmarks.some((bookmark) => bookmark.toString() === req.params.articleId);
  user.bookmarks = existing
    ? user.bookmarks.filter((bookmark) => bookmark.toString() !== req.params.articleId)
    : [...user.bookmarks, req.params.articleId];
  await user.save();
  await user.populate('bookmarks');
  res.json({ bookmarks: user.bookmarks });
}

export async function getBookmarks(req, res) {
  const user = await User.findById(req.user.id).populate('bookmarks');
  res.json(user.bookmarks);
}
