import '@/config/yup';
import * as yup from 'yup';

describe('Tests in yup.ts config file', () => {
  test('Error messages should be correctly configured with setLocale()', () => {
    expect(yup.defaultLocale).toEqual({
      mixed: {
        default: 'This field is invalid.',
        required: 'This field is required.',
        oneOf: 'The value must be one of the following: ${values}.',
        notOneOf: 'The value must not be one of the following: ${values}.',
        defined: 'This field must be defined.',
        notNull: 'This field cannot be null.',
        notType: 'The value must be a ${type}.',
      },
      string: {
        length: 'The field must be exactly ${length} characters long.',
        min: 'The field must be at least ${min} characters long.',
        max: 'The field must be at most ${max} characters long.',
        matches: 'The value must match the following pattern: "${regex}".',
        email: 'Please enter a valid email address.',
        url: 'Please enter a valid URL.',
        uuid: 'Please enter a valid UUID.',
        trim: 'The value must not contain leading or trailing spaces.',
        lowercase: 'The value must be in lowercase.',
        uppercase: 'The value must be in uppercase.',
        datetime: expect.any(String),
        datetime_offset: expect.any(String),
        datetime_precision: expect.any(String),
      },
      number: {
        min: 'The value must be greater than or equal to ${min}.',
        max: 'The value must be less than or equal to ${max}.',
        lessThan: 'The value must be less than ${less}.',
        moreThan: 'The value must be more than ${more}.',
        positive: 'The value must be a positive number.',
        negative: 'The value must be a negative number.',
        integer: 'The value must be an integer.',
      },
      date: {
        min: 'The date must be later than or equal to ${min}.',
        max: 'The date must be earlier than or equal to ${max}.',
      },
      array: {
        min: 'The array must have at least ${min} items.',
        max: 'The array must have at most ${max} items.',
        length: 'The array must have exactly ${length} items.',
      },
      boolean: {
        isValue: 'The value must be ${value}.',
      },
      object: {
        noUnknown: 'The object contains keys that are not allowed: ${unknown}.',
      },
      tuple: {
        notType: expect.any(Function),
      },
    });
  });
});
