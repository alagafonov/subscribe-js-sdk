/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

/**
 * Subscribe-HR group class
 */
export default class Group {
  /**
   * Create user object.
   * @param {Object} [props] - user parameters.
   */
  constructor(props) {
    this.setId(props.securityGroup);
    this.setEssGroup(props.essGroup);
  }

  /**
   * Set group id.
   * @param {int} [groupId] - group id.
   */
  setId(groupId) {
    this.groupId = groupId;
    return this;
  }

  /**
   * Get group id.
   * @return {int}
   */
  getId() {
    return this.groupId;
  }

  /**
   * Set ess group.
   * @param {bool} [essGroup] - ess group flag.
   */
  setEssGroup(essGroup) {
    this.essGroup = essGroup;
    return this;
  }

  /**
   * Get ess group.
   * @return {bool}
   */
  getEssGroup() {
    return this.essGroup;
  }
}
