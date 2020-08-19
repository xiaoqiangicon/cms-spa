import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      tabName: 'passed',
      verify: {
        status: 1,
        list: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: false,
      },
      passed: {
        status: 0,
        list: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: false,
        keyword: '',
        sort: 0,
      },
      // 待审核总数
      unVerifyTotal: 0,
    };
  },
  created() {
    this.fetchVerifyList();
    this.fetchPassedList();
  },
  methods: {
    fetchVerifyList() {
      this.verify.loading = true;

      seeFetch('sl-business-promo/seller/list', {
        pageNum: this.verify.currentPage,
        pageSize: this.verify.pageSize,
        status: this.verify.status,
      }).then(res => {
        this.verify.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.verify.total = res.data.total;
        this.verify.list = res.data.list;

        if (this.verify.status === 1) this.unVerifyTotal = this.verify.total;

        window.scrollTo(0, 0);
      });
    },
    verifyCurrentChange(val) {
      this.verify.currentPage = val;
      this.fetchVerifyList();
    },
    verifySizeChange(val) {
      this.verify.pageSize = val;
      this.fetchVerifyList();
    },
    verifySearch() {
      this.verify.currentPage = 1;
      this.fetchVerifyList();
    },
    fetchPassedList() {
      this.passed.loading = true;

      seeFetch('sl-business-promo/seller/list', {
        pageNum: this.passed.currentPage,
        pageSize: this.passed.pageSize,
        status: this.passed.status,
        keyword: this.passed.keyword,
        sort: this.passed.sort,
      }).then(res => {
        this.passed.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.passed.total = res.data.total;
        this.passed.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    passedCurrentChange(val) {
      this.passed.currentPage = val;
      this.fetchPassedList();
    },
    passedSizeChange(val) {
      this.passed.pageSize = val;
      this.fetchPassedList();
    },
    passedSearch() {
      this.passed.currentPage = 1;
      this.fetchPassedList();
    },
    pass(item) {
      this.$confirm(`你确定同意推广员 ${item.row.name} 加入吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('sl-business-promo/seller/update', {
          id: item.row.id,
          status: 0,
        }).then(res => {
          if (!res.success) {
            Notification.error({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification.success({
            title: '提示',
            message: '通过成功',
          });

          this.fetchVerifyList();
        });
      });
    },
    reject(item) {
      this.$prompt(`你确定要拒绝推广员 ${item.row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '拒绝原因不能为空',
      }).then(({ value }) => {
        seeFetch('sl-business-promo/seller/update', {
          id: item.row.id,
          status: 3,
          reason: value,
        }).then(res => {
          if (!res.success) {
            Notification.error({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification.success({
            title: '提示',
            message: '通过成功',
          });

          this.fetchVerifyList();
        });
      });
    },
    detail(item) {
      this.$router.push(`/sl-business-promo/seller-detail/${item.row.id}`);
    },
    block(item) {
      this.$confirm(
        `你确定限制销售员 ${item.row.name} 吗？<br/><br/><span class="gray">禁止后不影响之前推广的分成结算，也可取消禁用；已推广的链接若产生新的订单将不再对其进行结算。</span>`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        seeFetch('sl-business-promo/seller/update', {
          id: item.row.id,
          status: 2,
        }).then(res => {
          if (!res.success) {
            Notification.error({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification.success({
            title: '提示',
            message: '限制成功',
          });

          this.fetchPassedList();
        });
      });
    },
    unblock(item) {
      this.$confirm(`你确定取消限制销售员 ${item.row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('sl-business-promo/seller/update', {
          id: item.row.id,
          status: 0,
        }).then(res => {
          if (!res.success) {
            Notification.error({
              title: '提示',
              message: res.message,
            });
            return;
          }

          Notification.success({
            title: '提示',
            message: '取消限制成功',
          });

          this.fetchPassedList();
        });
      });
    },
  },
};
