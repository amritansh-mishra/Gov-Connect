// Mock data - replace with database logic
const events = [
  { id: '1', title: 'Republic Day Parade', date: '2025-01-26', type: 'Holiday' },
  { id: '2', title: 'Budget Submission Deadline', date: '2025-03-10', type: 'Deadline' },
  { id: '3', title: 'Inter-Departmental Sports Meet', date: '2025-02-15', type: 'Event' },
];

// @desc    Get all calendar events
// @route   GET /api/calendar
// @access  Private
export const getCalendarEvents = (req, res) => {
  res.json(events);
};