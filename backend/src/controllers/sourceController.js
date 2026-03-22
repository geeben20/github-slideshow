import Joi from 'joi';
import { Source } from '../models/Source.js';

const schema = Joi.object({
  name: Joi.string().required(),
  rssUrl: Joi.string().uri().allow('', null),
  apiEndpoint: Joi.string().uri().allow('', null),
  category: Joi.string().required(),
  region: Joi.string().default('global'),
  isActive: Joi.boolean().default(true)
});

export async function getSources(req, res) {
  const items = await Source.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function createSource(req, res) {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const source = await Source.create(value);
  res.status(201).json(source);
}

export async function deleteSource(req, res) {
  await Source.findByIdAndDelete(req.params.id);
  res.status(204).send();
}
