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

      seeFetch('sl-promo/project/list', {
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
        'sl-promo/project-detail:item',
        JSON.stringify(item.row)
      );
      this.$store.state.slPromoProjectDetail.initAction = '';
      this.$router.push('/sl-promo/project-detail');
    },
    toData(item) {
      window.sessionStorage.setItem(
        'sl-promo/project-detail:item',
        JSON.stringify(item.row)
      );
      this.$store.state.slPromoProjectDetail.initAction = 'tabSale';
      this.$router.push('/sl-promo/project-detail');
    },
    changeOffline(value, { row: item }) {
      seeFetch('sl-promo/project/offline', {
        id: item.id,
        status: value ? 0 : 1,
      }).then(res => {
        if (!res.success) {
          Notification.error({
            title: '提示',
            message: res.message || '操作失败',
          });
          return;
        }

        // eslint-disable-next-line no-param-reassign
        item.offline = value ? 0 : 1;

        Notification.success({
          title: '提示',
          message: '修改成功',
        });
      });
    },
  },
};
