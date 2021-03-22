const numText = ['', '一', '二', '三', '四', '五', '六', '七', '八'];
export const templeList = {
  errorCode: 0,
  data: [1, 2, 3, 4, 5, 6, 7, 8].map(id => ({
    id,
    name: `寺院名称寺院名称 ${numText[id]}`,
  })),
};

export const getAdmin = {
  errorCode: 0,
  data: {
    adminList: ['tom', 'jack', 'sunon'].map((name, index) => ({
      account: name,
      templeId: index + 1,
      cmsAccount: 'liqiang',
      name: 'name',
      templeId: 1,
      area: '华东1,华南',
      otherTempleIds: '5591,5642',
      bindTempleIds: '1,4,6',
    })),
    templeList: {
      tom: '1,4,5,6',
      jack: '2,4,5,6',
      sunon: '3,4,5,6',
    },
  },
};

export const updateAdmin = {
  errorCode: 0,
};

export const updateCms = {
  errorCode: 0,
};

export const updateAdminTempleBind = {
  errorCode: 0,
};

export const getArea = {
  msg: '',
  errorCode: 0,
  data: '华中,华南,华东1',
};

export const getAccountList = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 11,
      account: 'liqiang',
      name: '李强',
    },
    {
      id: 11,
      account: 'liqiang2',
      name: '李强2',
    },
  ],
};
