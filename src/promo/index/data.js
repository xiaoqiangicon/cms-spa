export const addProps = [
  // transfer
  { name: 'transferActiveName', full: !0, default: 'tableBuddhist' },
  { name: 'transferBuddhistId', full: !0, default: '' },
  { name: 'transferBuddhistName', full: !0, default: '' },
  { name: 'transferSubList', full: !0, default: [] },
  { name: 'transferSubId', full: !0, default: 0 },
  { name: 'transferTel', full: !0, default: '' },
  { name: 'transferOrderIds', full: !0, default: '' },
  {
    name: 'transferOrderDetail',
    full: !0,
    default: {
      buddhistName: '',
      subName: '',
      buyNum: '',
      price: '',
      transferPrice: '',
      addTime: '',
      orderId: '',
      orderNum: '',
      wxId: '',
      feedBackImg: [],
      ps: [],
    },
  },
  { name: 'dialogAddTransferBuddhistVisible', full: !0, default: !1 },

  // buddhist

  // fu
];

export default {};
