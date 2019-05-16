/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import * as _ from 'lodash';
import moment from 'moment';
import Field from './Field';
import ValidationError from './../Exceptions/ValidationError';

/**
 * Subscribe-HR entity string field
 */
export default class DateField extends Field {

  /**
   * Validates field value
   * @param {mixed} value
   * @return {object}
   */
  validate(value) {
    if (value !== null && !_.isDate(value)) {
      const name = this.getName();
      const data = {};
      data[name] = 'Must be a date';
      throw new ValidationError(`Field ${this.getName()} must be a date.`, data);
    }
    return this;
  }

  /**
   * Return date representation as string
   */
  getStringValue() {
    const value = this.getValue();
    return value === null ? null : moment(value).format('YYYY-MM-DD');
  }

  /**
   * Parse string date into object
   */
  setFromString(value) {
    this.set(moment(value).toDate());
  }
}
