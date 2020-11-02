/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFecth from 'see-fetch';

seeFecth.config('hardware/hardwareManage/del', {
  method: ['post'],
  stringify: [!0],
  url: ['/device/del/', '/src/hardware/hardware_manage/mock/del'],
});
