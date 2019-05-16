/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Field from './Field';
import ValidationError from './../Exceptions/ValidationError';

/**
 * Subscribe-HR entity string field
 */
export default class BooleanField extends Field {

  /**
   * Validates field value
   * @param {mixed} value
   * @return {object}
   */
  validate(value) {
    if (value !== null && typeof value !== 'boolean') {
      const name = this.getName();
      const data = {};
      data[name] = 'Must be a boolean';
      throw new ValidationError(`Field ${this.getName()} must be a boolean.`, data);
    }
    return this;
  }
}
