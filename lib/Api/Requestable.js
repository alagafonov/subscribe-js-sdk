/**
 * @file
 * @copyright  2017 Subscribe-HR
 */

import axios from 'axios';
import debug from 'debug';

import ResponseError from './../Exceptions/ResponseError';

const log = debug('subscribe-hr:request');

const METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
function methodHasNoBody(method) {
  return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
}

function callbackErrorOrThrow(cb, path) {
  return function handler(object) {
    let error;
    if (Object.prototype.hasOwnProperty.call(object, 'config')) {
      const {response: {status, statusText}, config: {method, url}} = object;
      const message = (`${status} error making request ${method} ${url}: "${statusText}"`);
      error = new ResponseError(message, path, object);
      log(`${message} ${JSON.stringify(object.data)}`);
    } else {
      error = object;
    }
    if (cb) {
      log('going to error callback');
      cb(error);
    } else {
      log('throwing error');
      throw error;
    }
  };
}

/**
 * Requestable wraps the logic for making http requests to the API
 */
export default class Requestable {
   /**
    * Authentication information for Subscribe-HR API
    * @typedef {Object} Requestable.auth
    * @prop {string} [accessToken] - Subscribe-HR access token
    * @prop {string} [instanceCode] - Subscribe-HR unique instance code
    * @prop {string} [securityGroup] - Security group to use
    */
   /**
    * Initialize the http internals or use internal hook into Subscribe-HR platform if used with v8.
    * @param {Requestable.auth} [auth] - authentication information, if not provided
                                         assuming that we are using internal hook up
    * @param {string} [apiBase=https://api.subscribe-hr.com] - the base API URL
    * @param {string} [version=v1] - the accept header for the requests
    */
  constructor(auth, apiBase, version) {
    this.auth = auth;
    this.apiBase = apiBase || 'https://api.subscribe-hr.com';
    this.version = version || 'v1';
    if (auth.token) {
      this.authorizationHeader = `Bearer ${auth.token}`;
    }
  }

   /**
    * Compute the URL to use to make a request.
    * @private
    * @param {string} path - either a URL relative to the API base or an absolute URL
    * @return {string} - the URL to use
    */
  getURL(path) {
    let url = path;
    if (path.indexOf('//') === -1) {
      url = `${this.apiBase}/${this.version}${path}`;
    }
    return url;
  }

   /**
    * Compute the headers required for an API request.
    * @private
    * @return {Object} - the headers to use in the request
    */
  getRequestHeaders() {
    const headers = {
      Authorization: `Bearer ${this.auth.accessToken}`,
      'x-subscribehr-company': this.auth.instanceCode,
      'x-subscribehr-security-group': this.auth.securityGroup,
    };
    return headers;
  }

   /**
    * A function that receives the result of the API request.
    * @callback Requestable.callback
    * @param {Requestable.Error} error - the error returned by the API or `null`
    * @param {(Object|true)} result - the data returned by the API or `true` if the API returns `204 No Content`
    * @param {Object} request - the raw {@linkcode https://github.com/mzabriskie/axios#response-schema Response}
    */
   /**
    * Make a request.
    * @param {string} method - the method for the request (GET, PUT, POST, DELETE)
    * @param {string} path - the path for the request
    * @param {*} [data] - the data to send to the server. For HTTP methods that don't have a body the data
    *                   will be sent as query parameters
    * @param {Requestable.callback} [cb] - the callback for the request
    * @param {boolean} [raw=false] - if the request should be sent as raw. If this is a falsy value then the
    *                              request will be made as JSON
    * @return {Promise} - the Promise for the http request
    */
  request(method, path, data, cb, raw) {
    const url = this.getURL(path);
    const headers = this.getRequestHeaders();
    let queryParams = {};
    let requestData = data;
    if (data && (typeof data === 'object') && methodHasNoBody(method)) {
      queryParams = data;
      requestData = undefined;
    }
    const config = {
      url,
      method,
      headers,
      params: queryParams,
      data: requestData,
      responseType: raw ? 'text' : 'json',
    };

    log(`${config.method} to ${config.url}`);
    const requestPromise = axios(config).catch(callbackErrorOrThrow(cb, path));

    if (cb) {
      requestPromise.then((response) => {
        if (response.data && Object.keys(response.data).length > 0) {
          // When data has results.
          cb(null, response.data, response);
        } else if (config.method !== 'GET' && Object.keys(response.data).length < 1) {
          // True when successful submit a request and receive a empty object.
          cb(null, (response.status < 300), response);
        } else {
          cb(null, response.data, response);
        }
      });
    }

    return requestPromise;
  }
}
