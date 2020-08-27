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
      showEditChannelPrice: false,
      // 当前编辑选择项的索引
      editChannelPriceIndex: -1,
      // 当前编辑选择项的 model
      editChannelPrice: '',
      // 当前编辑选择项的 item
      editChannelPriceItem: null,
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
      'sl-promo/project-detail:item'
    );

    if (!foShiItem) {
      MessageBox.alert('页面数据有误');
      return;
    }

    this.foShiItem = JSON.parse(foShiItem);

    this.fetchSelections();
    this.fetchSaleList();

    const { initAction } = this.$store.state.slPromoProjectDetail;

    // 先查看数据
    if (initAction === 'tabSale') {
      setTimeout(() => {
        this.tabName = 'sale';
      }, 500);
    }

    // 重置
    this.$store.state.slPromoProjectDetail.initAction = '';
    this.$store.state.slPromoProjectDetail.initActionData = null;
  },
  methods: {
    fetchSelections() {
      this.setting.loading = true;
      seeFetch('sl-promo/project-detail/selections', {
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
        this.editChannelPriceItem = item.row;
        this.editChannelPrice = `${item.row.channelPrice || ''}`;
        this.showEditChannelPrice = true;
        this.editChannelPriceIndex = item.$index;

        setTimeout(() => {
          this.$refs[`editInput${item.$index}`].focus();
        }, 300);
      }, 100);
    },
    // 不知为何 @change 事件不生效，只能用 @blur
    blurChannelPrice() {
      const item = this.setting.list[this.editChannelPriceIndex];
      const originalPrice = parseFloat(item.channelPrice) || 0;
      const editPrice = this.editChannelPrice.trim();
      const inputPrice = parseFloat(editPrice);

      if (Number.isNaN(inputPrice) || !numberRegExp.test(editPrice)) {
        Message.warning('请输入数字');
        this.resetInputChannelPrice();
        return;
      }
      // 两个相等
      if (Math.abs(inputPrice - originalPrice) < Number.EPSILON) {
        this.resetInputChannelPrice();
        return;
      }

      // 不小于成本价
      if (inputPrice - item.costPrice < 0) {
        this.resetInputChannelPrice();
        Message.warning('不能小于供应价');
        return;
      }

      this.resetInputChannelPrice();
      item.channelPrice = inputPrice;
      item.channelPriceChanged = true;
    },
    resetInputChannelPrice() {
      this.editChannelPriceItem = null;
      this.editChannelPrice = '';
      this.showEditChannelPrice = false;
      this.editChannelPriceIndex = -1;
    },
    fetchSaleList() {
      this.sale.loading = true;

      seeFetch('sl-promo/project-detail/saleList', {
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
    toBusiness(item) {
      this.$router.push(`/sl-promo/business-detail/${item.row.businessUserId}`);
    },
    toSeller(item) {
      this.$router.push(`/sl-promo/seller-detail/${item.row.sellerUserId}`);
    },
    changeOffline(value) {
      seeFetch('sl-promo/project-detail/offline', {
        id: this.foShiItem.id,
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
        this.foShiItem.offline = value ? 0 : 1;

        // 更新缓存数据
        window.sessionStorage.setItem(
          'sl-promo/project-detail:item',
          JSON.stringify(this.foShiItem)
        );

        Notification.success({
          title: '提示',
          message: '修改成功',
        });
      });
    },
    saveSettings() {
      if (this.setting.loading) return;

      let error;
      this.setting.list.forEach(item => {
        if (error) return;

        if (item.costPrice && !item.channelPrice) {
          error = `选择项（${item.name}）的渠道价未设置，不能保存`;
        }
      });

      if (error) {
        Message.warning(error);
        return;
      }

      this.setting.loading = true;
      seeFetch('sl-promo/project-detail/updateSelection', {
        subdivideList: this.setting.list.map(item => ({
          id: item.id,
          companyMoney: item.channelPrice,
          sellMoney: item.sellMoney,
          retailMoney: item.retailMoney,
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
          channelPriceChanged: false,
        }));
      });
    },
  },
};
