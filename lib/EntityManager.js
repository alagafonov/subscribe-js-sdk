/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import * as _ from 'lodash';
import Client from './Api/Client';
import Entity from './Entity';
import EntitySettings from './Entities/EntitySettings';

/**
 * Manage Subscribe-HR entities, create, update delete and retrieve metadata.
 */
export default class EntityManager {
  /**
   * Create Subscribe-HR entity manager.
   * @param {Client} [apiClient] - Subscribe-HR API client.
   * @param {User} [user] - user object.
   */
  constructor(apiClient, user = null) {
    this.apiClient = apiClient;
    this.user = user;
    this.metaCache = {};
  }

  /**
   * Create a new entity end point handler.
   * @return {Promise}
   */
  getNewEntity(entityName) {
    const entity = this.getNewEntityFromCache(entityName);
    if (entity !== null) {
      return new Promise((resolve, reject) => {
        resolve(entity);
      });
    }
    // Make api call otherwise to fetch it.
    const requestPromise = this.apiClient.getEntity().getMetadata(entityName);
    return requestPromise.then((response) => {
      if (response.data) {
        this.metaCache[entityName] = response.data.data;
        return new Entity(response.data.data);
      }
      return null;
    });
  }

  /**
   * Create new entity from cache.
   * @return {Entity}
   */
  getNewEntityFromCache(entityName) {
    // Check if metadata is already in the cache.
    if (Object.prototype.hasOwnProperty.call(this.metaCache, entityName)) {
      return new Entity(this.metaCache[entityName]);
    }
    return null;
  }

  /**
   * Create a new entity end point handler.
   * @return {Promise}
   */
  getEntityList(entityName, fields, query, sort, records, page) {
    return this.getNewEntity(entityName).then(() => {
      return this.getApiClient().getEntity().getAll(entityName, null, fields, query, sort, records, page).then(
        (response) => {
          if (response.data) {
            return _.map(response.data.data, (item) => {
              return this.getNewEntityFromCache(entityName).load(item);
            });
          }
          return null;
        });
    });
  }

  /**
   * Get entity settings.
   * @return {Promise}
   */
  getEntitySettings(entityName) {
    const requestPromise = this.apiClient.getUser().getEntitySettings(entityName);
    return requestPromise.then((response) => {
      if (response.data) {
        return new EntitySettings().load(response.data.data);
      }
      return null;
    });
  }

  /**
   * Update entity settings.
   * @return {Promise}
   */
  updateEntitySettings(entityName, settings) {
    const requestPromise =
      this.apiClient.getUser().updateEntitySettings(entityName, JSON.stringify(settings.getValue()));
    return requestPromise.then((response) => {
      if (response.data) {
        return new EntitySettings().load(response.data.data);
      }
      return null;
    });
  }

  /**
   * Create entity.
   * @return {Promise}
   */
  create(entity) {
    const entityName = entity.getName();
    return this.getNewEntity(entityName).then(() => {
      return this.getApiClient().getEntity().create(entityName,
        JSON.stringify(entity.getDataSourceValue())).then((response) => {
          if (response.data) {
            return this.getNewEntityFromCache(entityName).load(response.data.data);
          }
          return null;
        });
    });
  }

  /**
   * Update entity.
   * @return {Promise}
   */
  update(entity) {
    const entityName = entity.getName();
    return this.getNewEntity(entityName).then(() => {
      return this.getApiClient().getEntity().update(entityName, entity.getField('Id').getValue(),
        JSON.stringify(entity.getDataSourceValue())).then((response) => {
          if (response.data) {
            return this.getNewEntityFromCache(entityName).load(response.data.data);
          }
          return null;
        });
    });
  }

  /**
   * @return {Client}
   */
  getApiClient() {
    return this.apiClient;
  }
}
