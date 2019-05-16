/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import * as _ from 'lodash';
import StringField from './Fields/StringField';
import Email from './Fields/Email';
import Enum from './Fields/Enum';
import EnumMulti from './Fields/EnumMulti';
import BooleanField from './Fields/BooleanField';
import Integer from './Fields/Integer';
import Numeric from './Fields/Numeric';
import Key from './Fields/Key';
import DateField from './Fields/DateField';
import DateTime from './Fields/DateTime';
import Attachment from './Fields/Attachment';

/**
 * Subscribe-HR entity
 */
export default class Entity {

  /**
   * Create entity and load metadata
   * @param {object} metadata
   */
  constructor(metadata) {
    this.loadMetadata(metadata);
  }

  /**
   * Load entity metadata
   * @param {object} metadata
   */
  loadMetadata(metadata) {
    this.name = metadata.Name;
    this.label = metadata.Label;
    this.childEntity = metadata.ChildEntity;
    this.parentEntityName = metadata.ParentEntityName;
    this.childEntityNames = metadata.ChildEntityNames;
    this.allowEditSecurityGroups = metadata.AllowEditSecurityGroups;
    this.allowViewSecurityGroups = metadata.AllowViewSecurityGroups;
    this.allowCreateSecurityGroups = metadata.AllowCreateSecurityGroups;
    this.allowDeleteSecurityGroups = metadata.AllowDeleteSecurityGroups;
    this.essAllowEditSecurityGroups = metadata.EssAllowEditSecurityGroups;
    this.essAllowViewSecurityGroups = metadata.EssAllowViewSecurityGroups;
    this.essAllowCreateSecurityGroups = metadata.EssAllowCreateSecurityGroups;
    this.essAllowDeleteSecurityGroups = metadata.EssAllowDeleteSecurityGroups;
    this.fields = {};
    this.fieldsByLabelLookup = null;
    this.fieldsBySearchLabelLookup = null;
    for (let i = 0; i < metadata.Fields.length; i += 1) {
      this.createField(metadata.Fields[i].Name, metadata.Fields[i]);
    }
  }

  /**
   * Create new field from metadata
   * @param {string} name
   * @param {object} metadata
   */
  createField(name, metadata) {
    let field = null;
    if (metadata.TypeName === 'email') {
      field = new Email(metadata);
    } else if (metadata.TypeName === 'attachment') {
      field = new Attachment(metadata);
    } else if (metadata.TypeName === 'key') {
      field = new Key(metadata);
    } else if (metadata.TypeName === 'enum') {
      field = new Enum(metadata);
    } else if (metadata.TypeName === 'enumMulti') {
      field = new EnumMulti(metadata);
    } else if (metadata.TypeName === 'boolean') {
      field = new BooleanField(metadata);
    } else if (metadata.TypeName === 'integer') {
      field = new Integer(metadata);
    } else if (metadata.TypeName === 'numeric') {
      field = new Numeric(metadata);
    } else if (metadata.TypeName === 'date') {
      field = new DateField(metadata);
    } else if (metadata.TypeName === 'dateTime') {
      field = new DateTime(metadata);
    } else {
      field = new StringField(metadata);
    }
    this.fields[name] = field;
  }

  /**
   * Groups that can edit
   * @return {array}
   */
  getAllowEditSecurityGroups() {
    return this.allowEditSecurityGroups;
  }

  /**
   * Groups that can view
   * @return {array}
   */
  getAllowViewSecurityGroups() {
    return this.allowViewSecurityGroups;
  }

  /**
   * Groups that can create
   * @return {array}
   */
  getAllowCreateSecurityGroups() {
    return this.allowCreateSecurityGroups;
  }

  /**
   * Groups that can delete
   * @return {array}
   */
  getAllowDeleteSecurityGroups() {
    return this.allowDeleteSecurityGroups;
  }

  /**
   * Ess groups that can edit
   * @return {array}
   */
  getEssAllowEditSecurityGroups() {
    return this.essAllowEditSecurityGroups;
  }

  /**
   * Ess groups that can view
   * @return {array}
   */
  getEssAllowViewSecurityGroups() {
    return this.essAllowViewSecurityGroups;
  }

  /**
   * Ess groups that can create
   * @return {array}
   */
  getEssAllowCreateSecurityGroups() {
    return this.essAllowCreateSecurityGroups;
  }

  /**
   * Ess groups that can delete
   * @return {array}
   */
  getEssAllowDeleteSecurityGroups() {
    return this.essAllowDeleteSecurityGroups;
  }

  /**
   * Can view entity
   * @param {User} [user] - user object.
   * @return {bool}
   */
  canView(user) {
    return _.includes(this.getGroups(user, 'View'), user.getGroup().getId());
  }

  /**
   * Can create entity
   * @param {User} [user] - user object.
   * @return {bool}
   */
  canCreate(user) {
    return _.includes(this.getGroups(user, 'Create'), user.getGroup().getId());
  }

  /**
   * Can update entity
   * @param {User} [user] - user object.
   * @return {bool}
   */
  canEdit(user) {
    return _.includes(this.getGroups(user, 'Edit'), user.getGroup().getId());
  }

  /**
   * Can delete entity
   * @param {User} [user] - user object.
   * @return {bool}
   */
  canDelete(user) {
    return _.includes(this.getGroups(user, 'Delete'), user.getGroup().getId());
  }

  /**
   * Check if user can view this field
   * @param {string} [name] - field name.
   * @param {User} [user] - user object.
   * @return {bool}
   */
  canViewField(name, user = null) {
    const field = this.getField(name);
    if (field === null) {
      return false;
    }
    if (user === null || name === 'Id' || name === 'CreatedBy' || name === 'CreatedDate' ||
        name === 'LastModifiedBy' || name === 'LastModifiedDate') {
      return true;
    }
    return _.includes(this.getFieldGroups(field, user, 'View'), user.getGroup().getId());
  }

  /**
   * Check if user can edit this field
   * @param {string} [name] - field name.
   * @param {User} [user] - user object.
   * @return {bool}
   */
  canEditField(name, user = null) {
    const field = this.getField(name);
    if (field === null) {
      return false;
    }
    if (user === null) {
      return true;
    }
    if (name === 'Id' || name === 'CreatedBy' || name === 'CreatedDate' ||
        name === 'LastModifiedBy' || name === 'LastModifiedDate') {
      return false;
    }
    return _.includes(this.getFieldGroups(field, user, 'Edit'), user.getGroup().getId());
  }

  /**
   * Get groups that are allowed to perform action of type on a field
   * @param {Field} [field] - field object.
   * @param {User} [user] - user object.
   * @param {string} [type] - action type.
   */
  getFieldGroups(field, user = null, type = 'View') {
    const group = user.getGroup();
    if (group.getEssGroup()) {
      const recordEmployeeId = this.getEssEmployeeId();
      if (recordEmployeeId !== null && recordEmployeeId !== user.getEmployeeId()) {
        return field[`getEssAllow${type}SecurityGroups`]();
      }
    }
    return field[`getAllow${type}SecurityGroups`]();
  }

  /**
   * Get groups that are allowed to perform action of type on current entity
   * @param {User} [user] - user object.
   * @param {string} [type] - action type.
   */
  getGroups(user, type = 'View') {
    const group = user.getGroup();
    if (group.getEssGroup() && this.getName() !== 'Employee') {
      const recordEmployeeId = this.getEssEmployeeId();
      if (recordEmployeeId !== null && recordEmployeeId !== user.getEmployeeId()) {
        return this[`getEssAllow${type}SecurityGroups`]();
      }
    }
    return this[`getAllow${type}SecurityGroups`]();
  }

  /**
   * Returns field by name
   * @param {string} name
   * @return {Field}
   */
  getField(name) {
    if (this.hasField(name)) {
      return this.fields[name];
    }
    return null;
  }

  /**
   * Returns true if field exists
   * @param {string} name
   * @return {boolean}
   */
  hasField(name) {
    return Object.prototype.hasOwnProperty.call(this.fields, name);
  }

  /**
   * Returns field by name
   * @param {string} name
   * @return {Field}
   */
  getFieldByLabel(label) {
    if (this.hasFieldLabel(label)) {
      return this.fieldsByLabelLookup[label];
    }
    return null;
  }

  /**
   * Returns true if field label exists
   * @param {string} label
   * @return {boolean}
   */
  hasFieldLabel(label) {
    this.createFieldsByLabelLookup();
    return Object.prototype.hasOwnProperty.call(this.fieldsByLabelLookup, label);
  }

  /**
   * Returns field by search label
   * @param {string} name
   * @return {Field}
   */
  getFieldBySearchLabel(label) {
    if (this.hasFieldSearchLabel(label)) {
      return this.fieldsBySearchLabelLookup[label];
    }
    return null;
  }

  /**
   * Returns true if field search label exists
   * @param {string} label
   * @return {boolean}
   */
  hasFieldSearchLabel(label) {
    this.createFieldsBySearchLabelLookup();
    return Object.prototype.hasOwnProperty.call(this.fieldsBySearchLabelLookup, label);
  }

  /**
   * Returns all fields
   * @return {object}
   */
  getAllFields() {
    return this.fields;
  }

  /**
   * Returns all field name
   * @return {array}
   */
  getAllFieldNames() {
    return Object.keys(this.fields);
  }

  /**
   * Returns entity name
   * @return {string}
   */
  getName() {
    return this.name;
  }

  /**
   * Returns entity label
   * @return {string}
   */
  getLabel() {
    return this.label;
  }

  /**
   * Returns parent entity name
   * @return {string}
   */
  getParentEntityName() {
    return this.parentEntityName;
  }

  /**
   * Return list of child entity names.
   * @return {array}
   */
  getChildEntityNames() {
    return this.childEntityNames;
  }

  /**
   * Returns entity data
   * @return {object}
   */
  getValue() {
    return _.reduce(this.getAllFields(), (result, field) => {
      return {...result, [field.getName()]: field.getValue()};
    }, {});
  }

  /**
   * Returns entity data
   * @return {object}
   */
  getDataSourceValue() {
    return _.reduce(this.getAllFields(), (result, field) => {
      const type = field.getTypeName();
      let value = field.getValue();
      if (type === 'date' || type === 'dateTime') {
        value = field.getStringValue();
      }
      return {...result, [field.getName()]: value};
    }, {});
  }

  /**
   * Returns parent entity name
   * @param {object} - data to load
   * @return {Entity}
   */
  load(data) {
    _.each(this.getAllFields(), (field) => {
      const fieldName = field.getName();
      if (_.has(data, fieldName)) {
        const type = field.getTypeName();
        if (type === 'date' || type === 'dateTime') {
          field.setFromString(data[fieldName]);
        } else {
          field.set(data[fieldName]);
        }
      }
    });
    return this;
  }

  /**
   * @private
   * Get Employee Id if this object is employee or relates to employee.
   */
  getEssEmployeeId() {
    let recordEmployeeId = null;
    if (this.getName() === 'Employee') {
      recordEmployeeId = this.getField('Id').getValue();
    } else if (this.getParentEntityName() === 'Employee') {
      recordEmployeeId = this.getField('__ParentId').getValue();
    }
    return recordEmployeeId;
  }

  /**
   * @private
   * Creates lookup to find fields by labels
   */
  createFieldsByLabelLookup = () => {
    if (this.fieldsByLabelLookup === null) {
      this.fieldsByLabelLookup = this.getAllFieldNames().reduce((result, fieldName) => {
        return {...result, [this.fields[fieldName].getLabel()]: this.fields[fieldName]};
      }, {});
    }
  };

  /**
   * @private
   * Creates lookup to find fields by search labels
   */
  createFieldsBySearchLabelLookup = () => {
    if (this.fieldsBySearchLabelLookup === null) {
      this.fieldsBySearchLabelLookup = this.getAllFieldNames().reduce((result, fieldName) => {
        return {...result, [this.fields[fieldName].getSearchLabel()]: this.fields[fieldName]};
      }, {});
    }
  };
}
