import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      id: 0,
      item: {},
      status: -1,
      startTime: '',
      endTime: '',
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      preLoading: true,
    };
  },
  created() {
    const id = this.$route.params.id;

    if (!id) {
      MessageBox.alert('页面数据有误');
      return;
    }

    this.id = id;
    seeFetch('sl-promo/seller-detail/detail', { sellerUserId: id }).then(
      res => {
        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.item = res.data;
        this.preLoading = false;
        this.fetchList();
      }
    );
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
      this.$router.push(
        `/sl-promo/business-detail/${this.item.businessUserId}`
      );
    },
  },
};
