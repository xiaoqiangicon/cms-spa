export const temples = {
  success: !0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    name: `temple-${id}`,
  })),
};

export const temples1 = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    temple_name: `temple-${id}`,
  })),
};

export const stat = {
  success: !0,
  toHandleCount: 12,
  toReplyCount: 23,
};

export const stat1 = {
  errorCode: 0,
  pick_up_sum: 12,
  question_sum: 23,
};

export const list = {
  success: !0,
  totalCount: 99,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    time: '2017-01-01 01:01:01',
    templeId: id * 10,
    templeName: `templeName${id}`,
    type: id % 2 ? (id % 2) + 1 : (id % 6) + 1,
    isQuestion: id % 2,
    amount: id * 100,
    gotReceipt: id % 2,
    question: 'question',
    answer: 'answer',
    feedbackImages: [
      '/sample/image1.jpg',
      '/sample/image2.jpg',
      '/sample/image3.jpg',
      '/sample/image4.jpg',
    ],
    receiptImages: [
      '/sample/image1.jpg',
      '/sample/image2.jpg',
      '/sample/image3.jpg',
      '/sample/image4.jpg',
    ],
  })),
};

export const list1 = {
  errorCode: 0,
  pageSum: 10,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
    id,
    add_time: '2017-01-01 01:01:01',
    temple_id: id * 10,
    temple_name: `templeName${id}`,
    type: id % 2 ? (id % 2) + 1 : (id % 6) + 1,
    is_question: id % 2,
    price: id * 100,
    is_express_receipt: id % 2,
    remarks: 'question',
    answer: 'answer',
    picList: [
      '/sample/image1.jpg',
      '/sample/image2.jpg',
      '/sample/image3.jpg',
      '/sample/image4.jpg',
    ],
    feedBackPicList: [
      '/sample/image1.jpg',
      '/sample/image2.jpg',
      '/sample/image3.jpg',
      '/sample/image4.jpg',
    ],
  })),
};

export const updateGotReceipt = { success: !0 };
export const updateGotReceipt1 = { errorCode: 0 };
export const makeDone = { success: !0 };
export const makeDone1 = { errorCode: 0 };
export const makeQuestion = { success: !0 };
export const makeQuestion1 = { errorCode: 0 };
