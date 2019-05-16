/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

/**
 * Instance container.
 */
export default class Instance {
  /**
   * Create instance.
   * @param {string} [code] - instance code.
   * @param {EntityManager} [entityManager] - entity manager.
   * @param {User} [user] - user object.
   */
  constructor(code, entityManager, user) {
    this.setCode(code);
    this.setEntityManager(entityManager);
    this.setUser(user);
  }

  /**
   * Set instance code.
   * @param {string} [code] - instance code.
   */
  setCode(code) {
    this.code = code;
    return this;
  }

  /**
   * Get instance code.
   * @return {string}
   */
  getCode() {
    return this.code;
  }

  /**
   * Set entity manager.
   * @param {EntityManager} [entityManager] - entity manager.
   */
  setEntityManager(entityManager) {
    this.entityManager = entityManager;
    return this;
  }

  /**
   * Get entity manager.
   * @return {EntityManager}
   */
  getEntityManager() {
    return this.entityManager;
  }

  /**
   * Set user.
   * @param {User} [user] - user object.
   */
  setUser(user) {
    this.user = user;
    return this;
  }

  /**
   * Get user object.
   * @return {User}
   */
  getUser() {
    return this.user;
  }
}
