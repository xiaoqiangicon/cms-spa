/* eslint-disable no-param-reassign, prefer-destructuring, no-nested-ternary */
import seeFetch from 'see-fetch';

const statusTexts = [
  '',
  '申请提现',
  '提现完成',
  '已撤回',
  '待上传收据',
  '已上传收据',
  '已拒绝收据',
];

const req = {
  page: 'pageNumber',
  status: 'type',
  gotReceipt: 'expressReceipt',
};

const pre = params => ({
  ...params,
  pageNumber: params.pageNumber - 1,
  pageSize: 10,
});

const refactor = {
  data: [
    {
      time: 'add_time',
      templeId: 'temple_id',
      templeName: 'temple_name',
      isQuestion: 'is_question',
      amount: 'price',
      gotReceipt: 'is_express_receipt',
      question: 'remarks',
      feedbackImages: 'picList',
      receiptImages: 'feedBackPicList',
      specialTakeCount: 'specialPickUpCnt',
      isSpecial: 'isSpecialPickUp',
    },
  ],
};

const whetherShowFeedbackImages = item =>
  item.isQuestion === 0 &&
  [2, 4, 5, 6].indexOf(item.type) > -1 &&
  item.feedbackImages &&
  item.feedbackImages.length;
const whetherShowReceiptImages = item =>
  item.isQuestion === 0 &&
  [2, 5, 6].indexOf(item.type) > -1 &&
  item.receiptImages &&
  item.receiptImages.length;

const post = res => {
  res.totalCount = (res.pageSum || 1) * 10;
  if (res.data)
    res.data.forEach(item => {
      // 疑问订单
      if (item.isQuestion) {
        item.statusText = item.type === 2 ? '已回复疑问' : '有疑问';
      } else {
        item.statusText = statusTexts[item.type];
      }

      if (!item.reward) item.reward = 0;
      item.amount = (item.amount - item.reward).toFixed(2);

      item.showFeedbackImages = whetherShowFeedbackImages(item);
      item.showReceiptImages = whetherShowReceiptImages(item);

      item.typeText = item.isSpecial ? '特殊提现' : '正常提现';
    });
};

const localPost = res => {
  res.data.forEach(item => {
    // 疑问订单
    if (item.isQuestion) {
      item.statusText = item.type === 2 ? '已回复疑问' : '有疑问';
    } else {
      item.statusText = statusTexts[item.type];
    }

    item.showFeedbackImages = whetherShowFeedbackImages(item);
    item.showReceiptImages = whetherShowReceiptImages(item);
  });
};

seeFetch.config('finance/pending/list', {
  method: ['post'],
  stringify: [!0],
  url: [
    '/finance/getPickUpList',
    '/finance/pending/mock/list1',
    '/finance/pending/mock/list',
  ],
  req: [req, req],
  pre: [pre, pre],
  refactor: [refactor, refactor],
  post: [post, post, localPost],
});
