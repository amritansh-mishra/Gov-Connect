// Mock data - replace with database logic
const documents = [
  { id: '1', name: 'Annual Budget Report 2023', type: 'Report', department: 'Finance', uploadDate: '2023-03-15', uploadedBy: 'Emily Rodriguez', size: '5.2 MB', downloads: 234 },
  { id: '2', name: 'Road Tender Notice Q2 2024', type: 'Tender', department: 'Public Works Department', uploadDate: '2024-04-01', uploadedBy: 'Ravi Kumar', size: '1.1 MB', downloads: 112 },
  { id: '3', name: 'City Health Initiative Blueprint', type: 'Blueprint', department: 'Health & Sanitation', uploadDate: '2023-11-20', uploadedBy: 'Sunita Devi', size: '3.5 MB', downloads: 189 },
];

// @desc    List all documents
// @route   GET /api/documents
// @access  Private
export const listDocuments = (req, res) => {
  res.json(documents);
};

// @desc    Get a single document by ID
// @route   GET /api/documents/:id
// @access  Private
export const getDocumentById = (req, res) => {
  const document = documents.find(d => d.id === req.params.id);
  if (document) {
    res.json(document);
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
};