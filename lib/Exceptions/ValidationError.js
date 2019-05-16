/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

/**
 * The error structure for field validation
 */
export default class ValidationError extends Error {
   /**
    * Construct a new ResponseError
    * @param {string} message - an message to return instead of the the default error message
    * @param {object} data - additional data
    */
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}
