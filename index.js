import Instance from './lib/Instance';
import EntityManager from './lib/EntityManager';
import User from './lib/User';
import ApiClient from './lib/Api/Client';

const getEntityManager = (parameters) => {
  return new EntityManager(
    new ApiClient(
      {
        accessToken: parameters.apiToken,
        instanceCode: parameters.instanceCode,
        securityGroup: parameters.securityGroup
      },
      parameters.apiUrl
    )
  );
};

const getInstance = (parameters) => {
  return new Instance(parameters.instanceCode, getEntityManager(parameters), new User(parameters));
};

module.exports = {
  getInstance,
  getEntityManager
};
