export const get_component = {
  msg: '',
  errorCode: 0,
  data: {
    tagList: [
      {
        id: 1,
        name: 'namename',
        pic: '',
        linkUlr: '',
        detail: '',
        status: 0,
        topicId: 34,
        addTime: '2020-07023 18:54:28',
        componentJSON: [1, 2],
      },
    ],
    componentList: [
      {
        id: 1,
        name: '测试',
        type: 1,
        dataList: [
          {
            contentId: 11,
            label: '标签-1',
            detail: '1234123412',
            pic: '',
            btnName: 'fasdf',
            name: 'dfasdg',
          },
          {
            contentId: 12,
            label: '标签-23',
            detail: '1234123412',
            pic: '',
            btnName: 'fasdf',
            name: 'dfasdg',
          },
        ],
      },
      {
        id: 2,
        name: '测试2',
        type: 2,
        dataList: [
          {
            contentId: 21,
            label: '标签-2',
            detail: '1234123412',
            pic:
              'https://pic.zizaihome.com/9aa0e3ae-cfd0-11ea-bc71-00163e060b31.png',
            btnName: 'fasdf',
            name: 'dfasdg',
          },
        ],
      },
      {
        id: 3,
        name: '测试2',
        type: 3,
        dataList: [
          {
            contentId: 31,
            label: '标签-2',
            detail: '1234123412',
            pic: '',
            btnName: 'fasdf',
            name: 'dfasdg',
          },
        ],
      },
    ],
  },
};

export const add_tag = {
  msg: '',
  errorCode: 0,
  data: { id: 1 },
};

export const add_component = {
  msg: '',
  errorCode: 0,
  data: '',
};

export const add_component_tag = {
  msg: '',
  errorCode: 0,
  data: '',
};

export const del_component = {
  msg: '',
  errorCode: 0,
  data: '',
};
