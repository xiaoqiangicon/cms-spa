export const getList = {
  msg: '成功',
  errorCode: 0,
  data: {
    deviceList: [
      {
        id: 1,
        typeStr: '客流摄像头',
        type: 'guest_ipc',
        templeName: '所属寺院名',
        deviceSerial: 'ASD5345',
        validateCode: 'CASDGH3474',
        name: '大门客流摄像头',
        status: 0,
        supportNetwork: 1,
        addTime: '2020-10-10 12:12',
      },
      {
        id: 2,
        typeStr: '网关',
        type: 'gate_way',
        templeName: '所属寺院名',
        deviceSerial: 'ASD5345',
        validateCode: 'CASDGH3474',
        name: '大雄宝殿烟幕报警网关',
        status: 0,
        supportNetwork: 1,
        addTime: '2020-10-10 12:12',
      },
    ],
    total: 2,
  },
};

export const del = {
  msg: '',
  result: 0,
};

export const update = {
  msg: '',
  result: 0,
};

export const edit = {
  msg: '成功',
  errorCode: 0,
  data: {
    id: 10,
  },
};

export const typeList = {
  msg: '成功',
  errorCode: 0,
  data: [
    {
      name: '客流摄像头',
      vaule: 'guest_ipc',
      supportNetwork: 1,
      needValidCode: 1,
    },
    {
      name: '客流摄像头2',
      vaule: 'guest_ipb',
      supportNetwork: 1,
      needValidCode: 1,
    },
    {
      name: '客流摄像头3',
      vaule: 'guest_ipd',
      supportNetwork: 1,
      needValidCode: 1,
    },
  ],
};

export const getTempleList = {
  msg: '',
  errorCode: 0,
  data: [
    {
      id: 6186,
      name: '重庆下岩寺',
    },
    {
      id: 8828,
      name: '本焕寺',
    },
  ],
};
