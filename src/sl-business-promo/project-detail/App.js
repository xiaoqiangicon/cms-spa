import seeFetch from 'see-fetch';
import { Message, Notification, MessageBox } from 'element-ui';
import './fetch';

const numberRegExp = /^[\d.]+$/;

export default {
  name: 'App',
  data() {
    return {
      foShiItem: {},
      tabName: 'setting',
      setting: {
        // 选择项
        list: [],
        loading: false,
      },
      // 是否显示编辑选择项
      showEditSalePrice: false,
      // 当前编辑选择项的索引
      editSalePriceIndex: -1,
      // 当前编辑选择项的 model
      editSalePrice: '',
      // 当前编辑选择项的 item
      editSalePriceItem: null,
      // 是否显示编辑选择项
      showEditSellerProfit: false,
      // 当前编辑选择项的索引
      editSellerProfitIndex: -1,
      // 当前编辑选择项的 model
      editSellerProfit: '',
      // 当前编辑选择项的 item
      editSellerProfitItem: null,
      sale: {
        status: -1,
        keyword: '',
        startTime: '',
        endTime: '',
        list: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: false,
      },
    };
  },
  created() {
    const foShiItem = window.sessionStorage.getItem(
      'sl-business-promo/project-detail:item'
    );

    if (!foShiItem) {
      MessageBox.alert('页面数据有误');
      return;
    }

    this.foShiItem = JSON.parse(foShiItem);

    this.fetchSelections();
    this.fetchSaleList();

    const { initAction } = this.$store.state.slBusinessPromoProjectDetail;

    // 先查看数据
    if (initAction === 'tabSale') {
      setTimeout(() => {
        this.tabName = 'sale';
      }, 500);
    }

    // 重置
    this.$store.state.slBusinessPromoProjectDetail.initAction = '';
    this.$store.state.slBusinessPromoProjectDetail.initActionData = null;
  },
  methods: {
    fetchSelections() {
      this.setting.loading = true;
      seeFetch('sl-business-promo/project-detail/selections', {
        commodityId: this.foShiItem.id,
      }).then(res => {
        this.setting.loading = false;
        if (res.data) {
          this.setting.list = res.data;
        }
      });
    },
    updateSelection(item) {
      // 以结束，则不能更新
      if (this.foShiItem.status === 1) return;

      // 等待上一个blur操作
      setTimeout(() => {
        this.editSalePriceItem = item.row;
        this.editSalePrice = `${item.row.salePrice || ''}`;
        this.showEditSalePrice = true;
        this.editSalePriceIndex = item.$index;

        setTimeout(() => {
          this.$refs[`editInput${item.$index}`].focus();
        }, 300);
      }, 100);
    },
    // 不知为何 @change 事件不生效，只能用 @blur
    blurSalePrice() {
      const item = this.setting.list[this.editSalePriceIndex];
      const originalPrice = parseFloat(item.salePrice) || 0;
      const editPrice = this.editSalePrice.trim();
      const inputPrice = parseFloat(editPrice);

      const sellerProfit = item.sellerProfit || 0;

      if (Number.isNaN(inputPrice) || !numberRegExp.test(editPrice)) {
        Message.warning('请输入数字');
        this.resetInputSalePrice();
        return;
      }
      // 两个相等
      if (Math.abs(inputPrice - originalPrice) < Number.EPSILON) {
        this.resetInputSalePrice();
        return;
      }

      // 不小于渠道价
      if (inputPrice - item.channelPrice < 0) {
        this.resetInputSalePrice();
        Message.warning('不能小于渠道价');
        return;
      }
      if (inputPrice - item.channelPrice < sellerProfit) {
        this.resetInputSalePrice();
        Message.warning('零售价不能小于 渠道价+销售员提成金额');
        return;
      }

      this.resetInputSalePrice();
      item.salePrice = inputPrice;
      item.salePriceChanged = true;
    },
    resetInputSalePrice() {
      this.editSalePriceItem = null;
      this.editSalePrice = '';
      this.showEditSalePrice = false;
      this.editSalePriceIndex = -1;
    },
    updateSelection2(item) {
      // 以结束，则不能更新
      if (this.foShiItem.status === 1) return;

      // 等待上一个blur操作
      setTimeout(() => {
        this.editSellerProfitItem = item.row;
        this.editSellerProfit = `${item.row.sellerProfit || ''}`;
        this.showEditSellerProfit = true;
        this.editSellerProfitIndex = item.$index;

        setTimeout(() => {
          this.$refs[`secondEditInput${item.$index}`].focus();
        }, 300);
      }, 100);
    },
    // 不知为何 @change 事件不生效，只能用 @blur
    blurSellerProfit() {
      const item = this.setting.list[this.editSellerProfitIndex];
      const originalPrice = parseFloat(item.sellerProfit) || 0;
      const editPrice = this.editSellerProfit.trim();
      const inputPrice = parseFloat(editPrice);

      const salePrice = item.salePrice;

      // 没有零售价
      if (!salePrice) {
        this.resetInputSellerProfit();
        Message.warning('请先设置零售价');
        return;
      }
      if (Number.isNaN(inputPrice) || !numberRegExp.test(editPrice)) {
        Message.warning('请输入数字');
        this.resetInputSellerProfit();
        return;
      }
      // 两个相等
      if (Math.abs(inputPrice - originalPrice) < Number.EPSILON) {
        this.resetInputSellerProfit();
        return;
      }

      const totalProfit = salePrice - item.channelPrice;
      // 不大于总利润
      if (inputPrice - totalProfit > 0) {
        this.resetInputSellerProfit();
        Message.warning(`不能大于${totalProfit}元`);
        return;
      }

      this.resetInputSellerProfit();
      item.sellerProfit = inputPrice;
      item.sellerProfitChanged = true;
    },
    resetInputSellerProfit() {
      this.editSellerProfitItem = null;
      this.editSellerProfit = '';
      this.showEditSellerProfit = false;
      this.editSellerProfitIndex = -1;
    },
    fetchSaleList() {
      this.sale.loading = true;

      seeFetch('sl-business-promo/project-detail/saleList', {
        pageNum: this.sale.currentPage,
        pageSize: this.sale.pageSize,
        status: this.sale.status,
        startTime: this.sale.startTime,
        endTime: this.sale.endTime,
        keyword: this.sale.keyword,
        commodityId: this.foShiItem.id,
      }).then(res => {
        this.sale.loading = !1;

        if (!res.success || !res.data) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.sale.total = res.data.total;
        this.sale.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    saleCurrentChange(val) {
      this.sale.currentPage = val;
      this.fetchSaleList();
    },
    saleSizeChange(val) {
      this.sale.pageSize = val;
      this.fetchSaleList();
    },
    saleSearch() {
      this.sale.currentPage = 1;
      this.fetchSaleList();
    },
    toSeller(item) {
      this.$router.push(
        `/sl-business-promo/seller-detail/${item.row.sellerUserId}`
      );
    },
    saveSettings() {
      if (this.setting.loading) return;

      let error;
      this.setting.list.forEach(item => {
        if (error) return;

        if (item.costPrice && !item.salePrice) {
          error = `选择项（${item.name}）的零售价未设置，不能保存`;
        }
      });

      if (error) {
        Message.warning(error);
        return;
      }

      this.setting.loading = true;
      seeFetch('sl-business-promo/project-detail/updateSelection', {
        subdivideList: this.setting.list.map(item => ({
          id: item.id,
          sellMoney: item.sellerProfit || 0,
          retailMoney: item.salePrice,
          companyMoney: item.companyMoney,
        })),
      }).then(res => {
        this.setting.loading = false;

        if (!res.success) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        Notification.success({
          title: '提示',
          message: '保存成功',
        });
        // 保存数据
        this.setting.list = this.setting.list.map(item => ({
          ...item,
          sellerProfitChanged: false,
          salePriceChanged: false,
        }));
      });
    },
  },
};
