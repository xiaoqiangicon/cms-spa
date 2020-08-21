import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      tabName: 'business',
      business: {
        list: [],
        loading: false,
        startTime: '',
        endTime: '',
      },
      // 所有业务员
      allBusiness: [],
      seller: {
        list: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: false,
        businessUserId: 0,
        sellerUserName: '',
        startTime: '',
        endTime: '',
      },
    };
  },
  created() {
    this.fetchBusinessList();
    this.fetchAllBusiness();
    this.fetchSellerList();
  },
  methods: {
    fetchBusinessList() {
      this.business.loading = true;

      seeFetch('sl-promo/finance/businessList', {
        startTime: this.business.startTime,
        endTime: this.business.endTime,
      }).then(res => {
        this.business.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.business.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    businessSearch() {
      this.fetchBusinessList();
    },
    fetchAllBusiness() {
      seeFetch('sl-promo/finance/allBusiness', {
        pageNum: 1,
        pageSize: 10000,
      }).then(res => {
        if (res.data && res.data.list) {
          this.allBusiness = res.data.list;
        }
      });
    },
    fetchSellerList() {
      this.seller.loading = true;

      seeFetch('sl-promo/finance/sellerList', {
        pageNum: this.seller.currentPage,
        pageSize: this.seller.pageSize,
        businessUserId: this.seller.businessUserId,
        sellerUserName: this.seller.sellerUserName,
        startTime: this.seller.startTime,
        endTime: this.seller.endTime,
      }).then(res => {
        this.seller.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.seller.total = res.data.total;
        this.seller.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    sellerCurrentChange(val) {
      this.seller.currentPage = val;
      this.fetchSellerList();
    },
    sellerSizeChange(val) {
      this.seller.pageSize = val;
      this.fetchSellerList();
    },
    sellerSearch() {
      this.seller.currentPage = 1;
      this.fetchSellerList();
    },
  },
};
