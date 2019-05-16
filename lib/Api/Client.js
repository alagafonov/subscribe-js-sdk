/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Entity from './Entity';
import User from './User';

/**
 * GitHub encapsulates the functionality to create various API wrapper objects.
 */
export default class Client {
  /**
  * Authentication information for Subscribe-HR API.
  * @typedef {Object} Requestable.auth
  * @prop {string} [accessToken] - Subscribe-HR access token
  * @prop {string} [instanceCode] - Subscribe-HR unique instance code
  * @prop {string} [securityGroup] - Security group to use
  */
  /**
  * Create Subscribe-HR client.
  * @param {Requestable.auth} [auth] - authentication information, if not provided
                                        assuming that we are using internal hook up
  * @param {string} [apiBase=https://api.subscribe-hr.com] - the base API URL
  */
  constructor(auth, apiBase = 'https://api.subscribe-hr.com') {
    this.auth = auth || {};
    this.apiBase = apiBase;
    this.entityEndPoint = undefined;
    this.userEndPoint = undefined;
  }

  /**
   * Create a new entity end point handler.
   * @return {Entity}
   */
  getEntity() {
    if (!this.entityEndPoint) {
      this.entityEndPoint = new Entity(this.auth, this.apiBase);
    }
    return this.entityEndPoint;
  }

  /**
   * Create a new user end point handler.
   * @return {User}
   */
  getUser() {
    if (!this.userEndPoint) {
      this.userEndPoint = new User(this.auth, this.apiBase);
    }
    return this.userEndPoint;
  }
}
