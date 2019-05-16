/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

/**
 * Subscribe-HR entity field base class
 */
export default class Field {

  /**
   * Create entity and load metadata
   * @param {object} metadata
   */
  constructor(metadata) {
    this.loadMetadata(metadata);
    this.setDefault();
  }

  /**
   * Load entity metadata
   * @param {object} metadata
   */
  loadMetadata(metadata) {
    this.type = metadata.Type;
    this.typeName = metadata.TypeName;
    this.name = metadata.Name;
    this.label = metadata.Label;
    this.allowEditSecurityGroups = metadata.AllowEditSecurityGroups;
    this.allowViewSecurityGroups = metadata.AllowViewSecurityGroups;
    this.essAllowEditSecurityGroups = metadata.EssAllowEditSecurityGroups;
    this.essAllowViewSecurityGroups = metadata.EssAllowViewSecurityGroups;
  }

  /**
   * Sets default field value
   * @return {object}
   */
  setDefault() {
    this.value = null;
    return this;
  }

  /**
   * Returns field value
   * @return {mixed}
   */
  getValue() {
    return this.value;
  }

  /**
   * Returns field label
   * @return {string}
   */
  getLabel() {
    return this.label;
  }

  /**
   * Returns field search label
   * @return {string}
   */
  getSearchLabel() {
    return this.getLabel().replace(/^(.)|\s+(.)/g, ($1) => {
      return $1.toUpperCase();
    }).replace(/ /g, '');
  }

  /**
   * Returns field type
   * @return {int}
   */
  getType() {
    return this.type;
  }

  /**
   * Returns field name
   * @return {string}
   */
  getName() {
    return this.name;
  }

  /**
   * Returns field name
   * @return {string}
   */
  getTypeName() {
    return this.typeName;
  }

  /**
   * Returns security groups that are allowed to edit this field
   * @return {array}
   */
  getAllowEditSecurityGroups() {
    return this.allowEditSecurityGroups;
  }

  /**
   * Returns security groups that are allowed to view this field
   * @return {array}
   */
  getAllowViewSecurityGroups() {
    return this.allowViewSecurityGroups;
  }

  /**
   * Returns ess security groups that are allowed to edit this field
   * @return {array}
   */
  getEssAllowEditSecurityGroups() {
    return this.essAllowEditSecurityGroups;
  }

  /**
   * Returns ess security groups that are allowed to view this field
   * @return {array}
   */
  getEssAllowViewSecurityGroups() {
    return this.essAllowViewSecurityGroups;
  }

  /**
   * Validates field value
   * @param {mixed} value
   * @return {object}
   */
  validate(value) {
    return this;
  }

  /**
   * Sets field value
   * @param {mixed} value
   * @return {object}
   */
  set(value) {
    this.validate(value);
    this.value = value;
    return this;
  }

  /**
   * Return field value representation as string
   */
  getStringValue() {
    const value = this.getValue();
    return value === null ? null : String(value);
  }
}
