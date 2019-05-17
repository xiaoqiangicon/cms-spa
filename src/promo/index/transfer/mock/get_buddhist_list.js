export default {
  errorCode: 0,
  msg: '',
  data: [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    name: `佛事名称${id}`,
    subdivides: [
      {
        id: 1,
        subdivideName: '选择项1',
      },
      {
        id: 2,
        subdivideName: '选择项2',
      },
      {
        id: 3,
        subdivideName: '选择项3',
      },
      {
        id: 4,
        subdivideName: '选择项4',
      }
    ],
  })),
};
