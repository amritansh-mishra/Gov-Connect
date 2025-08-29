import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username, role: user.role, department: user.department }, JWT_SECRET, { expiresIn: '2h' });
};

export const register = async (req, res) => {
  const { 
    username, 
    email, 
    password, 
    role = 'citizen', 
    department = '', 
    deptCode = '',
    departmentName = '',
    contactPerson = '',
    phoneNumber = '',
    address = '',
    description = '',
    employeeCount = 0,
    budget = 0
  } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  const userExists = await User.findOne({ $or: [{ username }, { email }] }).lean();
  if (userExists) {
    return res.status(409).json({ error: 'User with that username or email already exists' });
  }

  let deptCodeHash = '';
  if (role === 'department') {
    if (!department || !deptCode) {
      return res.status(400).json({ error: 'Department and department access code are required for department users' });
    }
    if (deptCode.length < 6) { // Example: minimum 6 characters for department code
      return res.status(400).json({ error: 'Department access code must be at least 6 characters long' });
    }
    deptCodeHash = await bcrypt.hash(deptCode, 10);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    passwordHash,
    role,
    department: role === 'department' ? department : '',
    deptCodeHash,
    departmentName: role === 'department' ? departmentName : '',
    contactPerson: role === 'department' ? contactPerson : '',
    phoneNumber: role === 'department' ? phoneNumber : '',
    address: role === 'department' ? address : '',
    description: role === 'department' ? description : '',
    employeeCount: role === 'department' ? employeeCount : 0,
    budget: role === 'department' ? budget : 0
  });

  const token = generateToken(newUser);
  res.status(201).json({ 
    token, 
    user: { 
      id: newUser._id, 
      username: newUser.username, 
      email: newUser.email, 
      role: newUser.role, 
      department: newUser.department,
      departmentName: newUser.departmentName,
      contactPerson: newUser.contactPerson,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address,
      description: newUser.description,
      employeeCount: newUser.employeeCount,
      budget: newUser.budget
    } 
  });
};

export const login = async (req, res) => {
  const { username, password, deptCode = '' } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (user.role === 'department') {
    if (!deptCode) {
      return res.status(400).json({ error: 'Department access code is required for department login' });
    }
    const isDeptCodeValid = await bcrypt.compare(deptCode, user.deptCodeHash);
    if (!isDeptCodeValid) {
      return res.status(401).json({ error: 'Invalid department access code' });
    }
  }

  const token = generateToken(user);
  res.json({ 
    token, 
    user: { 
      id: user._id, 
      username: user.username, 
      email: user.email, 
      role: user.role, 
      department: user.department,
      departmentName: user.departmentName,
      contactPerson: user.contactPerson,
      phoneNumber: user.phoneNumber,
      address: user.address,
      description: user.description,
      employeeCount: user.employeeCount,
      budget: user.budget
    } 
  });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ 
    user: { 
      id: user._id.toString(), 
      username: user.username, 
      email: user.email, 
      role: user.role, 
      department: user.department,
      departmentName: user.departmentName,
      contactPerson: user.contactPerson,
      phoneNumber: user.phoneNumber,
      address: user.address,
      description: user.description,
      employeeCount: user.employeeCount,
      budget: user.budget
    } 
  });
};


