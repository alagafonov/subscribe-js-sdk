/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Field from './Field';
import ValidationError from './../Exceptions/ValidationError';

/**
 * Subscribe-HR entity string field
 */
export default class Numeric extends Field {

  /**
   * Validates field value
   * @param {mixed} value
   * @return {object}
   */
  validate(value) {
    if (value !== null && typeof value !== 'number') {
      const name = this.getName();
      const data = {};
      data[name] = 'Must be a number';
      throw new ValidationError(`Field ${this.getName()} must be a number.`, data);
    }
    return this;
  }
}
