/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFecth from 'see-fetch';

const preHandle = req => {
  req.verify = 1;
  req.isTest = 1;
  req.tagId = 0;
};

seeFecth.config('hardware/hardwareManage/getTempleList', {
  method: ['post'],
  stringify: [!0],
  preHandle: [preHandle, preHandle],
  url: ['/temple/list/', '/src/hardware/hardware_manage/mock/getTempleList'],
});
