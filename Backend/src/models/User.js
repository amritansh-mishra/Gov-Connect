import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'department'], default: 'citizen' },
  department: { type: String, default: '' },
  deptCodeHash: { type: String, default: '' }, // For department users
  
  // Additional department-specific fields
  departmentName: { type: String, default: '' },
  contactPerson: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  description: { type: String, default: '' },
  employeeCount: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;


