/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Field from './Field';
import ValidationError from './../Exceptions/ValidationError';

/**
 * Subscribe-HR entity string field
 */
export default class StringField extends Field {

  /**
   * Validates field value
   * @param {mixed} value
   * @return {object}
   */
  validate(value) {
    if (value !== null && typeof value !== 'string') {
      const name = this.getName();
      const data = {};
      data[name] = 'Must be a string';
      throw new ValidationError(`Field ${this.getName()} must be a string.`, data);
    }
    return this;
  }
}
