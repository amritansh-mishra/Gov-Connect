// Mock data - replace with database logic
const departments = [
  { id: '1', name: 'Public Works Department', head: 'Mr. Sharma', employeeCount: 120, budget: '₹50M' },
  { id: '2', name: 'Health & Sanitation', head: 'Dr. Verma', employeeCount: 85, budget: '₹35M' },
  { id: '3', name: 'Transport Authority', head: 'Ms. Gupta', employeeCount: 150, budget: '₹70M' },
];

// @desc    List all departments
// @route   GET /api/departments
// @access  Private
export const listDepartments = (req, res) => {
  res.json(departments);
};

// @desc    Get a single department by ID
// @route   GET /api/departments/:id
// @access  Private
export const getDepartmentById = (req, res) => {
  const department = departments.find(d => d.id === req.params.id);
  if (department) {
    res.json(department);
  } else {
    res.status(404).json({ message: 'Department not found' });
  }
};