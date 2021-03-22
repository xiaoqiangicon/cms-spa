/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFecth from 'see-fetch';

const post = res => {
  res.data.deviceList.forEach(item => {
    if (item.status === 0) {
      item.statusStr = '在线';
    } else if (item.status === 1) {
      item.statusStr = '未部署';
    } else {
      item.statusStr = '不支持';
    }
  });
};

seeFecth.config('hardware/hardwareManage/getList', {
  method: ['post'],
  stringify: [!0],
  post: [post, post, post],
  url: ['/device/list/', '/src/hardware/hardware_manage/mock/getList'],
});
