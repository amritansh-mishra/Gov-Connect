// Mock data - replace with database logic
const analyticsData = {
  citizenEngagement: { value: '75%', trend: '+5%' },
  projectCompletionRate: { value: '88%', trend: '+2%' },
  activeGrievances: { value: 142, trend: '-10' },
  budgetUtilization: { value: '65%', trend: '+7%' },
};

// @desc    Get analytics data
// @route   GET /api/analytics
// @access  Private
export const getAnalyticsData = (req, res) => {
  res.json(analyticsData);
};