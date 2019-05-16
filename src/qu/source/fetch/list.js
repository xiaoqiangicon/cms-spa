/* eslint-disable no-param-reassign, prefer-destructuring */
import seeFetch from 'see-fetch';
import '../../../com/refactor/slice';

const frequencyTexts = ['只出现1次', '每天出现1次'];

const req = {
  page: 'pageNum',
};

const pre = params => ({
  ...params,
  pageNum: params.pageNum - 1,
  pageSize: 10,
});

const refactor = {
  totalCount: 'data.count',
  data: 'data.list',
  _data: [
    {
      cover: 'pic',
      text: 'title',
      frequency: 'appearType',
      startDate: 'startDate|slice!0!10',
      endDate: 'endDate|slice!0!10',
      redirect: 'jumpType',
      link: 'jumpUrl',
      shareImageType: 'sharePicType',
      entryId: 'wishTypeId',
    },
  ],
};

const post = res => {
  if (res.data)
    res.data.forEach(item => {
      item.frequencyText = frequencyTexts[item.frequency - 1];
    });
};

const localPost = res => {
  res.data.forEach(item => {
    item.frequencyText = frequencyTexts[item.frequency - 1];
  });
};

seeFetch.config('qu/source/list', {
  method: ['post'],
  stringify: [!0],
  url: ['/wish/wishAdList', '/qu/source/mock/list1', '/qu/source/mock/list'],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
