/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFecth from 'see-fetch';

seeFecth.config('hardware/hardwareManage/edit', {
  method: ['post'],
  stringify: [!0],
  url: ['/device/edit/', '/src/hardware/hardware_manage/mock/edit'],
});
