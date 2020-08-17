import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      item: {},
      status: -1,
      startTime: '',
      endTime: '',
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
    };
  },
  created() {
    const item = window.sessionStorage.getItem('sl-promo/seller-detail:item');

    if (!item) {
      MessageBox.alert('页面数据有误');
      return;
    }

    this.item = JSON.parse(item);
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = true;

      seeFetch('sl-promo/seller-detail/list', {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        status: this.status,
        startTime: this.startTime,
        endTime: this.endTime,
        userId: this.item.id,
      }).then(res => {
        this.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.total = res.data.total;
        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    currentChange(val) {
      this.currentPage = val;
      this.fetchList();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.fetchList();
    },
    search() {
      this.currentPage = 1;
      this.fetchList();
    },
    toBusiness() {
      // todo 没有业务员数据可以带过去
    },
  },
};
