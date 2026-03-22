import Joi from 'joi';
import { User } from '../models/User.js';
import { signToken } from '../services/tokenService.js';

const authSchema = Joi.object({
  name: Joi.string().min(2).max(80),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export async function register(req, res) {
  const { error, value } = authSchema.keys({ name: Joi.string().required() }).validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const existing = await User.findOne({ email: value.email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create(value);
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}

export async function login(req, res) {
  const { error, value } = authSchema.fork(['name'], (schema) => schema.optional()).validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const user = await User.findOne({ email: value.email }).select('+password');
  if (!user || !(await user.comparePassword(value.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}

export async function profile(req, res) {
  res.json({ user: req.user });
}
