import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).integer().default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ),
    search: Joi.string().allow(''),
  }),
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ),
  }),
};
const validateObjectId = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  } else {
    return helpers.message('Invalid ID');
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
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ),
  }).min(1),
  ...noteIdSchema,
};
// {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     content: {
//       type: String,
//       required: false,
//       trim: true,
//       default: '',
//     },
//     tag: {
//       type: String,
//       required: false,
//       enum: [
//         'Work',
//         'Personal',
//         'Meeting',
//         'Shopping',
//         'Ideas',
//         'Travel',
//         'Finance',
//         'Health',
//         'Important',
//         'Todo',
//       ],
//       default: 'Todo',
//     },
//   },
