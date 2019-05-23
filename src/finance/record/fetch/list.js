import seeFetch from 'see-fetch';
import { itemsMap } from '../constant';

const requestKeys = {
  page: 'pageNum',
};

const responseRefactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      key: 'id',
      recordName: 'title',
      incomeFromId: 'templeId',
      incomeFrom: 'templeName',
      relatedItemId: 'type',
      income: 'money',
      incomeTime: 'getDate',
      editUser: 'managerName',
    },
  ],
};

const preHandle = req => {
  req.pageSize = 10;
};

/* eslint-disable no-param-reassign */
const postHandle = res => {
  if (res.data && res.data.length) {
    res.data.forEach(item => {
      item.relatedItem = itemsMap[item.relatedItemId] || '未知类型';
    });
  }
};

seeFetch.config('finance/record/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/manualRecord/list',
    '/finance/record/mock/list1',
    '/finance/record/mock/list',
  ],
  requestKeys: [requestKeys, requestKeys],
  responseRefactor: [responseRefactor, responseRefactor],
  preHandle: [preHandle, preHandle],
  postHandle: [postHandle, postHandle],
});
