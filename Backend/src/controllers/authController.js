import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, name: user.username, role: user.role, department: user.department }, JWT_SECRET, { expiresIn: '2h' });
};

const formatUserResponse = (user) => {
  // Return a plain object to avoid sending sensitive fields like password hashes
  return {
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
    budget: user.budget,
  };
};

export const register = async (req, res) => {
  const {
    fullName,
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

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  const userExists = await User.findOne({ $or: [{ username: fullName }, { email }] }).lean();
  if (userExists) {
    return res.status(409).json({ error: 'User with that username or email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userData = {
    username: fullName,
    email,
    passwordHash,
    role,
  };

  if (role === 'department') {
    if (!department || !deptCode) {
      return res.status(400).json({ error: 'Department and department access code are required for department users' });
    }
    if (deptCode.length < 6) { // Example: minimum 6 characters for department code
      return res.status(400).json({ error: 'Department access code must be at least 6 characters long' });
    }
    userData.deptCodeHash = await bcrypt.hash(deptCode, 10);
    userData.department = department;
    userData.departmentName = departmentName;
    userData.contactPerson = contactPerson;
    userData.phoneNumber = phoneNumber;
    userData.address = address;
    userData.description = description;
    userData.employeeCount = employeeCount;
    userData.budget = budget;
  }

  const newUser = await User.create(userData);

  const token = generateToken(newUser);
  res.status(201).json({ token, user: formatUserResponse(newUser) });
};

export const login = async (req, res) => {
  const { username, password, deptCode = '' } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await User.findOne({ $or: [{ email: username }, { username: username }] });
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
  res.json({ token, user: formatUserResponse(user) });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: formatUserResponse(user) });
};
