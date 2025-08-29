const feedbackList = [];

export function listFeedback(req, res) {
  res.json({ data: feedbackList });
}

export function createFeedback(req, res) {
  const { rating, comment, feedbackType } = req.body || {};
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating' });
  }
  const item = {
    id: Date.now().toString(36),
    rating,
    comment: comment || '',
    feedbackType: feedbackType || 'suggestion',
    userId: req.user?.id,
    createdAt: new Date().toISOString(),
  };
  feedbackList.push(item);
  res.status(201).json({ data: item });
}


