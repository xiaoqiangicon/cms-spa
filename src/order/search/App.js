import './fetch';
import seeFetch from 'see-fetch';
import Upload from '../../com/upload/Upload';
import { Notification } from 'element-ui';
import VideoPlayer from './VideoPlayer';

export default {
  name: 'App',
  data() {
    return {
      searchType: 1,
      search: '',
      status: 0,
      date: ['', ''],
      formatDate: ['', ''],
      loading: !1,
      list: [],
      imgNail:
        '?imageMogr/v2/thumbnail/!100x100r/gravity/center/crop/!60x60/strip',

      playerVisible: !1,
      videoPlayerSrc:
        'http://imgs.zizaihome.com/6e33a93e-8457-4e9c-8dd1-62e993c7ca83.mp4',

      dialogVisble: !1,
      detail: {},
      isModify: !1,
      cloneDetail: {
        pos: [],
        isCryptonymWish: 0,
        isCryptonymBuy: 0,
      },
      updateLoading: !1,

      refundVisible: !1,
      content: '',
      uploadImages: [],
      isRefunding: false,
    };
  },
  components: {
    Upload,
    VideoPlayer,
  },
  watch: {
    dialogVisble(newVal) {
      if (!newVal) {
        this.dialogVisble = !1;
      }
    },
    refundVisible(newVal) {
      if (!newVal) {
        this.content = '';
        this.uploadImages = [];
      }
    },
  },
  created() {
    // this.getList();
  },
  methods: {
    getList() {
      this.loading = !0;
      let url = '',
        zzhNum = '',
        phone = '',
        orderNo = '',
        logisticsOrder = '';
      switch (this.searchType) {
        case 1:
          url = 'order/search/order';
          orderNo = this.search;
          zzhNum = '';
          (phone = ''), (logisticsOrder = '');
          break;
        case 2:
          url = 'order/search/zzhNum';
          orderNo = '';
          zzhNum = this.search;
          (phone = ''), (logisticsOrder = '');
          break;
        case 3:
          url = 'order/search/phone';
          orderNo = '';
          zzhNum = '';
          (phone = this.search), (logisticsOrder = '');
          break;
        case 4:
          url = 'order/search/logisticsOrder';
          orderNo = '';
          zzhNum = '';
          (phone = ''), (logisticsOrder = this.search);
          break;
      }
      console.log(this.searchType, url);
      seeFetch(url, {
        startTime: this.formatDate[0],
        endTime: this.formatDate[1],
        finishType: this.status,
        orderNo,
        zzhNum,
        phone,
        logisticsOrder,
      }).then(res => {
        if (res.success) {
          if (res.data.orderList) {
            this.list = res.data.orderList;
          } else {
            if (res.data.orderNo) {
              this.list = res.data;
            } else if (res.data.length) {
              this.list = res.data;
            } else {
              this.list = [];
            }
          }
        } else {
        }
        this.loading = !1;
      });
    },
    refresh() {
      this.getList();
    },
    changeSearchType() {
      if (this.searchType !== 2 && this.searchType !== 3) {
        this.date = ['', ''];
        this.formatDate = ['', ''];
      }
    },
    onChangeDatePicker() {
      const { date } = this;
      this.formatDate = date.map(item => this.formatTime(`${item}`));
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
    hidePlayer() {
      this.playerVisible = !1;
    },
    showDetail(row) {
      this.cloneDetail.pos = JSON.stringify(row.posiscript);
      this.cloneDetail.isCryptonymWish = row.isCryptonymWish;
      this.cloneDetail.isCryptonymBuy = row.isCryptonymBuy;
      this.dialogVisble = !0;
      this.detail = row;
    },
    modify() {
      this.isModify = !0;
    },
    saveModify() {
      this.updateLoading = !0;
      seeFetch('order/search/updateOrder', {
        orderId: this.detail.orderNo,
        isCryptonymWish: this.detail.isCryptonymWish,
        isCryptonymBuy: this.detail.isCryptonymBuy,
        posiscript: this.detail.posiscript,
      }).then(res => {
        if (res.success) {
          Notification({
            title: '提示',
            message: `修改成功`,
          });
          this.isModify = !1;
        } else {
          Notification({
            title: '提示',
            message: `修改失败`,
          });
        }
        this.updateLoading = !1;
      });
    },
    cancelModify() {
      this.detail.posiscript = JSON.parse(this.cloneDetail.pos);
      this.detail.isCryptonymBuy = this.cloneDetail.isCryptonymBuy;
      this.detail.isCryptonymWish = this.cloneDetail.isCryptonymWish;
      this.isModify = !1;
      this.$forceUpdate();
    },
    clickRefundBtn() {
      this.refundVisible = !0;
      this.dialogVisble = !1;
    },
    refund() {
      if (this.isRefunding) return;
      this.isRefunding = true;
      seeFetch('order/search/refund', {
        orderId: this.detail.orderNo,
        content: this.content,
        imgs: this.uploadImages.join(','),
      }).then(res => {
        if (res.success) {
          this.refundVisible = !1;
          this.getList();
          this.content = '';
          this.uploadImages = [];
        } else {
          alert('出错了');
        }
        this.isRefunding = false;
      });
    },
    setOvertimeOrder() {
      this.$confirm('确定要设为超时未处理订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('setOvertime', { orderNo: this.detail.orderNo }).then(res => {
          if (res.success) {
            window.location.reload();
          } else {
            alert('接口出错，请联系开发人员');
          }
        });
      });
    },
    onClickPlayVideo(video) {
      this.videoPlayerSrc = video;
      console.log(video);
      this.playerVisible = !0;
    },
  },
};
