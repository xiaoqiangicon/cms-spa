import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      keyword: '',
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      loading: false,
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = true;

      seeFetch('sl-business-promo/project/list', {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
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
    toManage(item) {
      window.sessionStorage.setItem(
        'sl-business-promo/project-detail:item',
        JSON.stringify(item.row)
      );
      this.$store.state.slBusinessPromoProjectDetail.initAction = '';
      this.$router.push('/sl-business-promo/project-detail');
    },
    toData(item) {
      window.sessionStorage.setItem(
        'sl-business-promo/project-detail:item',
        JSON.stringify(item.row)
      );
      this.$store.state.slBusinessPromoProjectDetail.initAction = 'tabSale';
      this.$router.push('/sl-business-promo/project-detail');
    },
  },
};
