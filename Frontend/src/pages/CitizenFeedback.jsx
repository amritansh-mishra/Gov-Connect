import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { submitFeedback } from '../api';

const CitizenFeedback = () => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackType, setFeedbackType] = useState('suggestion'); // suggestion, complaint, praise
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitSuccess(false);
    setIsSubmitting(true);

    if (rating === 0) {
      setError(t('selectStarRating'));
      setIsSubmitting(false);
      return;
    }
    try {
      await submitFeedback({ rating, comment, feedbackType });
      setSubmitSuccess(true);
      setRating(0);
      setComment('');
      setFeedbackType('suggestion');
    } catch (err) {
      setError((t('feedbackSubmitError') || 'Failed to submit feedback') + ' ' + (err.message || ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-text mb-6">{t('citizenFeedback')}</h1>

        <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmitFeedback} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{t('error')}!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{t('success')}!</strong>
                <span className="block sm:inline"> {t('feedbackSubmitted')}</span>
              </div>
            )}

            {/* Star Rating */}
            <div>
              <label className="block text-lg font-medium text-text mb-3">{t('starRating')}</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer ${star <= rating ? 'text-accent fill-current' : 'text-gray-600'}`}
                    size={32}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </div>

            {/* Comment Box */}
            <div>
              <label htmlFor="comment" className="block text-lg font-medium text-text mb-3">{t('yourComment')}</label>
              <textarea
                id="comment"
                rows="4"
                className="w-full p-3 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-background text-text placeholder-lightText"
                placeholder={t('shareYourFeedback')}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            {/* Feedback Type Tags */}
            <div>
              <label className="block text-lg font-medium text-text mb-3">{t('feedbackType')}</label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setFeedbackType('suggestion')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${feedbackType === 'suggestion' ? 'bg-primary text-white' : 'bg-gray-700 text-lightText hover:bg-gray-600'}`}
                >
                  {t('suggestion')}
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('complaint')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${feedbackType === 'complaint' ? 'bg-red-500 text-white' : 'bg-gray-700 text-lightText hover:bg-gray-600'}`}
                >
                  {t('complaint')}
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType('praise')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${feedbackType === 'praise' ? 'bg-secondary text-white' : 'bg-gray-700 text-lightText hover:bg-gray-600'}`}
                >
                  {t('praise')}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('submittingFeedback') : t('submitFeedback')}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CitizenFeedback;
