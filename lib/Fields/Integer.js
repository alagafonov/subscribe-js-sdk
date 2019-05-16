/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Field from './Field';
import ValidationError from './../Exceptions/ValidationError';

/**
 * Subscribe-HR entity string field
 */
export default class Integer extends Field {

  /**
   * Validates field value
   * @param {mixed} value
   * @return {object}
   */
  validate(value) {
    if (value !== null && value !== parseInt(value, 10)) {
      const name = this.getName();
      const data = {};
      data[name] = 'Must be an integer';
      throw new ValidationError(`Field ${this.getName()} must be an integer.`, data);
    }
    return this;
  }
}
