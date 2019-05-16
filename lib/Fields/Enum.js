/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import Field from './Field';

/**
 * Subscribe-HR entity email field
 */
export default class Enum extends Field {

  /**
   * Load entity metadata
   * @param {object} metadata
   */
  loadMetadata(metadata) {
    super.loadMetadata(metadata);
    this.options = metadata.Options;
    this.optionsLookup = null;
    this.optionLabelsLookup = null;
  }

  /**
   * Returns list of available options
   * @return {array}
   */
  getOptions() {
    return this.options;
  }

  /**
   * Checks if option value exists
   * @return {bool}
   */
  hasOption(name) {
    this.createOptionsLookup();
    if (Object.prototype.hasOwnProperty.call(this.optionsLookup, name)) {
      return true;
    }
    return false;
  }

  /**
   * Checks if option label exists
   * @return {bool}
   */
  hasOptionLabel(label) {
    this.createOptionLabelsLookup();
    if (Object.prototype.hasOwnProperty.call(this.optionLabelsLookup, label)) {
      return true;
    }
    return false;
  }

  /**
   * Returns option value by label
   * @return {string}
   */
  getOptionValue(label) {
    if (this.hasOptionLabel(label)) {
      return this.optionLabelsLookup[label];
    }
    return null;
  }

  /**
   * Returns option label by value
   * @return {string}
   */
  getOptionLabel(name) {
    if (this.hasOption(name)) {
      return this.optionsLookup[name];
    }
    return null;
  }

  /**
   * Returns list of all option labels
   * @return {array}
   */
  getAllOptionLabels() {
    return this.options.map((option) => {
      return option.Text;
    });
  }

  /**
   * @private
   * Creates lookup for options
   */
  createOptionsLookup = () => {
    if (this.optionsLookup === null) {
      this.optionsLookup = this.options.reduce((result, option) => {
        return {...result, [option.Value]: option.Text};
      }, {});
    }
  };

  /**
   * @private
   * Creates lookup for options
   */
  createOptionLabelsLookup = () => {
    if (this.optionLabelsLookup === null) {
      this.optionLabelsLookup = this.options.reduce((result, option) => {
        return {...result, [option.Text]: option.Value};
      }, {});
    }
  };
}
