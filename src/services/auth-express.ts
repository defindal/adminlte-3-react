/* eslint-disable no-console */
import {removeWindowClass} from '@app/utils/helpers';
import intance from '@app/utils/axios';
/* import axios from 'axios'; */

export const login = async (myEmail: string, myPassword: string) => {
  intance
    .post('http://localhost:3001/v1/auth/login', {
      email: myEmail,
      password: myPassword
    })
    .then((res) => {
      const accessToken = res.data.tokens.access.token;
      console.log(accessToken);
      localStorage.setItem('token', accessToken);

      removeWindowClass('login-page');
      removeWindowClass('hold-transition');
      return accessToken;
    });
};

export const register = async () => {
  const token = '';
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};
