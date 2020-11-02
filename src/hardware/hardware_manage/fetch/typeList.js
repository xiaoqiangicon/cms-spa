/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFecth from 'see-fetch';

seeFecth.config('hardware/hardwareManage/typeList', {
  method: ['post'],
  stringify: [!0],
  url: ['/device/typeList/', '/src/hardware/hardware_manage/mock/typeList'],
});
