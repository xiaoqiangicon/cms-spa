import seeFetch from 'see-fetch';

const postHandle = (res, req) => {
  res.data.dataList.forEach(item => {
    if (item.evaluation == 0) item.evaluation = '全部';
    if (item.evaluation == 1) item.evaluation = '好评';
    if (item.evaluation == 2) item.evaluation = '满意';
    if (item.evaluation == 3) item.evaluation = '差评';
    if (!item.reply) item.reply = '无';
    if (!item.content) item.content = '无';
    if (!item.labelRecordList.length) item.labelRecordList = ['无'];
  });
};
seeFetch.config('temple/comment/getList', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/evaluation/getEvaluationList',
    '/src/temple/comment/mock/get_list',
    '/src/temple/comment/mock/get_list',
  ],
  postHandle: [postHandle, postHandle],
});
