import Cookies from 'js-cookie';

export const getAccessToken = () => {
  return Cookies.get('accessToken'); 
};

export const saveAccessToken = (token) => {
  Cookies.set('accessToken', token, { expires: 14 });
};

export const clearAccessToken = () => {
  Cookies.remove('accessToken'); 
};