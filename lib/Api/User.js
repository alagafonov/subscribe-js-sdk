/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Requestable from './Requestable';

/**
 * Entity contains functionality to create, query, and modify Subscribe-HR entities.
 * Also provides access to entity metadata.
 */
export default class User extends Requestable {

   /**
    * Get user settings
    * @param {Requestable.callback} cb - will receive the project information
    * @return {Promise} - the promise for the http request
    */
  getSettings(cb) {
    return this.request('GET', '/user/settings', null, cb);
  }

  /**
   * Get user entity settings
   * @param {Requestable.callback} cb - will receive the project information
   * @param {string} entityName - entity name to get settings for
   * @return {Promise} - the promise for the http request
   */
  getEntitySettings(entityName, cb) {
    return this.request('GET', `/user/settings/entities/${entityName}`, null, cb);
  }

  /**
   * Update user entity settings
   * @param {Requestable.callback} cb - will receive the project information
   * @param {string} entityName - entity name to get settings for
   * @param {json} settings - entity settings
   * @return {Promise} - the promise for the http request
   */
  updateEntitySettings(entityName, settings, cb) {
    return this.request('POST', `/user/settings/entities/${entityName}`, settings, cb);
  }
}
