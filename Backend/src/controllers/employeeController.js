// Mock data - replace with database logic
const employees = [
  { id: '1', name: 'Ravi Kumar', department: 'Public Works Department', role: 'Senior Engineer', email: 'ravi.k@gov.in' },
  { id: '2', name: 'Sunita Devi', department: 'Health & Sanitation', role: 'Medical Officer', email: 'sunita.d@gov.in' },
  { id: '3', name: 'Arjun Mehra', department: 'Transport Authority', role: 'Traffic Inspector', email: 'arjun.m@gov.in' },
];

// @desc    List all employees
// @route   GET /api/employees
// @access  Private
export const listEmployees = (req, res) => {
  res.json(employees);
};

// @desc    Get a single employee by ID
// @route   GET /api/employees/:id
// @access  Private
export const getEmployeeById = (req, res) => {
  const employee = employees.find(e => e.id === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};