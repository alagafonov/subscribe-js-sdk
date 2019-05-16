/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Requestable from './Requestable';

/**
 * Entity contains functionality to create, query, and modify Subscribe-HR entities.
 * Also provides access to entity metadata.
 */
export default class Entity extends Requestable {

  /**
   * Get entity metadata
   * @param {string} entityName - Subscribe-HR entity name
   * @param {Requestable.callback} cb - will receive the project information
   * @return {Promise} - the promise for the http request
   */
  getMetadata(entityName, cb) {
    return this.request('GET', `/entities/${entityName}/meta`, null, cb);
  }

  /**
   * Get entity metadata
   * @param {string} entityName - Subscribe-HR entity name
   * @param {Requestable.callback} cb - will receive the project information
   * @param {string} query - condition
   * @param {string} sort - sorting
   * @param {array} fields - entity fields to fetch
   * @param {int} records - records per page
   * @param {int} page - page to fetch
   * @return {Promise} - the promise for the http request
   */
  getAll(entityName, cb, fields, query, sort, records, page) {
    return this.request('GET', `/entities/${entityName}`, {
      fields,
      query,
      sort,
      records,
      page
    }, cb);
  }

  /**
   * Get entity
   * @param {Entity} entity - Subscribe-HR entity
   * @param {Requestable.callback} cb - will receive the project information
   * @return {Promise} - the promise for the http request
   */
  getOne(entityName, id, cb) {
    return this.request('GET', `/entities/${entityName}/${id}`, null, cb);
  }

  /**
   * Create new entity
   * @param {Entity} entity - Subscribe-HR entity
   * @param {object} data - entity data
   * @param {Requestable.callback} cb - will receive the project information
   * @return {Promise} - the promise for the http request
   */
  create(entityName, data, cb) {
    return this.request('POST', `/entities/${entityName}`, data, cb);
  }

  /**
   * Update existing entity
   * @param {Entity} entity - Subscribe-HR entity
   * @param {object} data - entity data
   * @param {Requestable.callback} cb - will receive the project information
   * @return {Promise} - the promise for the http request
   */
  update(entityName, id, data, cb) {
    return this.request('PATCH', `/entities/${entityName}/${id}`, data, cb);
  }

  /**
   * Delete entity
   * @param {Entity} entity - Subscribe-HR entity
   * @param {Requestable.callback} cb - will receive the project information
   * @return {Promise} - the promise for the http request
   */
  delete(entityName, id, cb) {
    return this.request('DELETE', `/entities/${entityName}/${id}`, null, cb);
  }
}
