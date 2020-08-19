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
        listState: [],
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
          this.setting.listState = res.data.map(() => ({
            loading: false,
            loading2: false,
          }));
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
      const state = this.setting.listState[this.editSalePriceIndex];
      const originalPrice = parseFloat(item.salePrice) || 0;
      const editPrice = this.editSalePrice.trim();
      const inputPrice = parseFloat(editPrice);

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

      state.loading = true;
      this.resetInputSalePrice();
      seeFetch('sl-business-promo/project-detail/updateSelection', {
        subdivideList: [
          {
            id: item.id,
            sellMoney: inputPrice,
          },
        ],
      }).then(res => {
        if (!res.success) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        item.salePrice = inputPrice;
        state.loading = false;
        Message.success('保存成功');
      });
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
      const state = this.setting.listState[this.editSellerProfitIndex];
      const originalPrice = parseFloat(item.sellerProfit) || 0;
      const editPrice = this.editSellerProfit.trim();
      const inputPrice = parseFloat(editPrice);

      // 没有零售价
      if (!item.salePrice) {
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

      const totalProfit = item.salePrice - item.channelPrice;
      // 不大于总利润
      if (inputPrice - totalProfit > 0) {
        this.resetInputSellerProfit();
        Message.warning(`不能大于${totalProfit}元`);
        return;
      }

      state.loading2 = true;
      this.resetInputSellerProfit();
      seeFetch('sl-business-promo/project-detail/updateSelection', {
        subdivideList: [
          {
            id: item.id,
            retailMoney: inputPrice,
          },
        ],
      }).then(res => {
        if (!res.success) {
          Notification.error({
            title: '提示',
            message: res.message,
          });
          return;
        }

        item.sellerProfit = inputPrice;
        state.loading2 = false;
        Message.success('保存成功');
      });
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
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        status: this.status,
        startTime: this.startTime,
        endTime: this.endTime,
        keyword: this.keyword,
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
      this.$router.push(`/sl-business-promo/seller-detail/${item.row.id}`);
    },
  },
};
