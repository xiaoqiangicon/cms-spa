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
          this.setting.listState = res.data.map(() => ({ loading: false }));
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
      const state = this.setting.listState[this.editChannelPriceIndex];
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

      state.loading = true;
      this.resetInputChannelPrice();
      seeFetch('sl-promo/project-detail/updateSelection', {
        subdivideList: [
          {
            id: item.id,
            companyMoney: inputPrice,
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

        item.channelPrice = inputPrice;
        state.loading = false;
      });
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
    toBusiness(item) {
      // todo 没有业务员数据可以带过去
    },
    toSeller(item) {
      // todo 没有销售员数据可以带过去
    },
    changeOnline(value) {
      seeFetch('sl-promo/project-detail/online', {
        id: this.foShiItem.id,
        status: value ? 1 : 0,
      }).then(res => {
        if (!res.success) {
          Notification.error({
            title: '提示',
            message: res.message || '操作失败',
          });
          return;
        }

        // eslint-disable-next-line no-param-reassign
        this.foShiItem.online = value ? 1 : 0;

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
  },
};
