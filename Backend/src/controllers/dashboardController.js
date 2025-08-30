// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboardData = async (req, res) => {
  const { name } = req.user;
  // In a real app, you'd fetch this data from your database
  const dashboardData = {
    userName: name,
    stats: {
      totalEmployees: { value: 1247, change: '+12%' },
      activeDepartments: { value: 8, change: '+1' },
      documentsProcessed: { value: 432, change: '+8%' },
      efficiencyRate: { value: '94.2%', change: '+2.1%' },
    },
    recentActivity: [
      { id: 1, user: 'Amit Singh', action: 'submitted feedback for', target: 'Road Construction at Sector 15', time: '2m ago' },
      { id: 2, user: 'Priya Sharma', action: 'updated the status of', target: 'Public Park Renovation', time: '1h ago' },
      { id: 3, user: 'Admin', action: 'approved a new project:', target: 'City-wide Wi-Fi Installation', time: '3h ago' },
    ],
    projectStatus: {
      active: 75,
      completed: 50,
      upcoming: 25,
    },
  };

  res.json(dashboardData);
};