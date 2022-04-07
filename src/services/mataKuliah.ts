/* eslint-disable no-console */
import { removeWindowClass } from '@app/utils/helpers';
import intance from '@app/utils/axios';
/* import axios from 'axios'; */

export const getAll = async () => {
  intance.get('http://localhost:3000/v1/mataKuliahs/').then((res) => {});
};
