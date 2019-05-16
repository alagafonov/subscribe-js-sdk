/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Group from './Group';

/**
 * Manage Subscribe-HR entities, create, update delete and retrieve metadata.
 */
export default class User {
  /**
   * Create user object.
   * @param {Object} [props] - user parameters.
   */
  constructor(props) {
    this.setUserName(props.userName);
    this.setEmployeeId(props.employeeId);
    this.setGroup(new Group(props));
  }

  /**
   * Set username.
   * @param {string} [userName] - username.
   */
  setUserName(userName) {
    this.userName = userName;
    return this;
  }

  /**
   * Get username.
   * @return {string}
   */
  getUserName() {
    return this.userName;
  }

  /**
   * Set employee id.
   * @param {int} [employeeId] - employee id.
   */
  setEmployeeId(employeeId) {
    this.employeeId = employeeId;
    return this;
  }

  /**
   * Get employee id.
   * @return {int}
   */
  getEmployeeId() {
    return this.employeeId;
  }

  /**
   * Set user group.
   * @param {Group} [group] - user group.
   */
  setGroup(group) {
    this.group = group;
    return this;
  }

  /**
   * Get user group.
   * @return {Group}
   */
  getGroup() {
    return this.group;
  }
}
