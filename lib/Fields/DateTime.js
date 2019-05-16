/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import DateField from './DateField';
import ValidationError from './../Exceptions/ValidationError';

/**
 * Subscribe-HR entity datetime field
 */
export default class DateTime extends DateField {
  /**
   * Return datetime representation as string
   */
  getStringValue() {
    const value = this.getValue();
    return value === null ? null : moment(value).toISOString();
  }
}
