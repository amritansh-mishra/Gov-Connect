// In-memory for simplicity
const projects = [
  {
    id: 'p1',
    name: 'Smart City Initiative',
    department: 'urban',
    status: 'active',
    category: 'infrastructure',
    progress: 75,
    fundsUsed: 7.5,
    totalFunds: 10,
    transparencyScore: 90,
  },
  {
    id: 'p2',
    name: 'Clean Rivers Project',
    department: 'health',
    status: 'active',
    category: 'sanitation',
    progress: 50,
    fundsUsed: 2.5,
    totalFunds: 5,
    transparencyScore: 80,
  },
  {
    id: 'p3',
    name: 'New School Construction',
    department: 'education',
    status: 'upcoming',
    category: 'infrastructure',
    progress: 0,
    fundsUsed: 0,
    totalFunds: 8,
    transparencyScore: 95,
  },
  {
    id: 'p4',
    name: 'Public Transport Upgrade',
    department: 'transport',
    status: 'completed',
    category: 'transport',
    progress: 100,
    fundsUsed: 12,
    totalFunds: 12,
    transparencyScore: 88,
  },
];

export function listProjects(req, res) {
  res.json(projects);
}


