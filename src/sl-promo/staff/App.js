import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

const defaultBusinessItem = {
  id: 0,
  name: '',
  phone: '',
  password: '',
};

export default {
  name: 'App',
  data() {
    return {
      tabName: 'business',
      businessItem: { ...defaultBusinessItem },
      business: {
        list: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: false,
        keyword: '',
        sort: 0,
      },
      businessDialogVisible: false,
      // 所有业务员
      allBusiness: [],
      seller: {
        list: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: false,
        keyword: '',
        sort: 0,
        status: 0,
        businessId: 0,
      },
    };
  },
  created() {
    this.fetchBusinessList();
    this.fetchAllBusiness();
    this.fetchSellerList();

    const { initAction, initActionData } = this.$store.state.slPromoStaff;

    // 查看某个业务员的销售员列表
    if (initAction === 'sellersOfBusiness') {
      setTimeout(() => {
        this.seller.businessId = initActionData.id;
        this.seller.status = 0;
        this.seller.sort = 0;
        this.seller.keyword = '';
        this.tabName = 'seller';
        this.sellerSearch();
      }, 500);
    }

    // 重置
    this.$store.state.slPromoStaff.initAction = '';
    this.$store.state.slPromoStaff.initActionData = null;
  },
  methods: {
    fetchBusinessList() {
      this.business.loading = true;

      seeFetch('sl-promo/staff/businessList', {
        pageNum: this.business.currentPage,
        pageSize: this.business.pageSize,
        keyword: this.business.keyword,
        sort: this.business.sort,
      }).then(res => {
        this.business.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.business.total = res.data.total;
        this.business.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    businessCurrentChange(val) {
      this.business.currentPage = val;
      this.fetchBusinessList();
    },
    businessSizeChange(val) {
      this.business.pageSize = val;
      this.fetchBusinessList();
    },
    businessSearch() {
      this.business.currentPage = 1;
      this.fetchBusinessList();
    },
    addBusiness() {
      this.businessItem = { ...defaultBusinessItem };
      this.businessDialogVisible = true;
    },
    editBusiness(item) {
      Object.keys(defaultBusinessItem).forEach(key => {
        this.businessItem[key] = item.row[key] || defaultBusinessItem[key];
      });
      this.businessDialogVisible = true;
    },
    detailBusiness(item) {
      this.$router.push(`/sl-promo/business-detail/${item.row.id}`);
    },
    delBusiness(item) {
      this.$confirm(
        `你确定要删除业务员 ${item.row.name} 吗？<br/><br/><span class="gray">删除后当前业务员旗下的销售员会与此业务员解除绑定。销售员同时所属的推广专题不可访问，销售员已产生的数据不受影响。<br/><br/><span class="red">请谨慎操作！</span></span>`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        seeFetch('sl-promo/staff/delBusiness', { id: item.row.id }).then(
          res => {
            if (!res.success) {
              Notification.error({
                title: '提示',
                message: res.message,
              });
              return;
            }

            Notification.success({
              title: '提示',
              message: '删除成功',
            });

            this.fetchBusinessList();
          }
        );
      });
    },
    handleBusinessDialogConfirm() {
      const { name, phone, password } = this.businessItem;

      let error;
      if (!name) error = '姓名不能为空';
      else if (phone.length !== 11) error = '手机号码须是11位数字';
      else if (password.length < 6) error = '密码至少要6位';

      if (error) {
        Notification.error({
          title: '提示',
          message: error,
        });
        return;
      }

      seeFetch('sl-promo/staff/updateBusiness', this.businessItem).then(res => {
        if (!res.success) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification.success({
          title: '提示',
          message: `${this.businessItem.id ? '更新' : '添加'}成功`,
        });
        this.businessDialogVisible = false;
        this.fetchBusinessList();
      });
    },
    toSellers(item) {
      this.seller.businessId = item.row.id;
      this.seller.status = 0;
      this.seller.sort = 0;
      this.seller.keyword = '';
      this.tabName = 'seller';
      this.sellerSearch();
    },
    fetchAllBusiness() {
      seeFetch('sl-promo/staff/businessList', {
        pageNum: 1,
        pageSize: 10000,
        keyword: '',
        sort: 0,
      }).then(res => {
        if (res.data && res.data.list) {
          this.allBusiness = res.data.list;
        }
      });
    },
    fetchSellerList() {
      this.seller.loading = true;

      seeFetch('sl-promo/staff/sellerList', {
        pageNum: this.seller.currentPage,
        pageSize: this.seller.pageSize,
        keyword: this.seller.keyword,
        sort: this.seller.sort,
        status: this.seller.status,
        businessId: this.seller.businessId,
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
    detailSeller(item) {
      this.$router.push(`/sl-promo/seller-detail/${item.row.id}`);
    },
    blockSeller(item) {
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
        seeFetch('sl-promo/staff/updateSeller', {
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

          this.fetchSellerList();
        });
      });
    },
    unblockSeller(item) {
      this.$confirm(`你确定取消限制销售员 ${item.row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('sl-promo/staff/updateSeller', {
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

          this.fetchSellerList();
        });
      });
    },
  },
};
