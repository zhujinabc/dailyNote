/**
 * request 网络请求工具
 */
import axios from 'axios';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const myAxios = axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: {'x-csrf-token': getCsrfToken('csrfToken')}
});

function getCsrfToken(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

function addCsrfToken(params) {
  const csrfToken = getCsrfToken('csrfToken');
  //return { ...params, 'x-csrf-token': csrfToken };
  return { ...params};
}

function handleResponse(status, msg) {
  let res = true;
  if (parseInt(status, 10) === 200) {
    res = true;
  } else if(parseInt(status) === 401){
    window.location.href = '/users/login';
  } else {
    notification.error({
      message: `请求错误 ${status}`,
      description: msg || codeMessage[status],
    });
    res = false;
  }
  return res;
}

const noBodyMethod = ['get', 'delete', 'head'];
async function buildRequest(method, url, params) {
  const param =
    noBodyMethod.indexOf(method) >= 0
      ? {
          params,
        }
      : params;
  return myAxios[method](url, param)
    .then(response => {
      const res = handleResponse(response.status);
      if (res) {
        // 检测自控 code res不为 true 则 response.data 为 null
        if (handleResponse(response.data.code === 0 ? 200 : response.data.code, response.data.msg)) {
          return response.data.data;
        }
        throw new Error(`self error code ${JSON.stringify(response.data)}`);
      }
      return false;
    })
    .catch(error => {
      let message = '';
      if (Object.prototype.hasOwnProperty.call(error, 'response')) {
        handleResponse((error.response && error.response.status) || error.code === 0 ? 200 : error.code);
        message = error.message;
      } else {
        message = error.message;
      }
      throw new Error(message);
    });
}

export const get = (url, params = {}) => buildRequest('get', url, addCsrfToken(params));

export const post = (url, params = {}) => buildRequest('post', url, addCsrfToken(params));

export const put = (url, params = {}) => buildRequest('put', url, addCsrfToken(params));

export const del = (url, params = {}) => buildRequest('delete', url, addCsrfToken(params));
