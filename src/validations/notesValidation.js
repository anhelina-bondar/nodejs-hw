import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).integer().default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().optional().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};
const validateObjectId = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  } else {
    return helpers.message('Invalid MongoDB ObjectId');
  }
};
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(validateObjectId).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
  ...noteIdSchema,
};
