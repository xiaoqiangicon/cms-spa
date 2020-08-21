import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification, Message, MessageBox } from 'element-ui';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,

      tableData: [],

      pagination: {
        page: 1,
        total: 0,
        pageSize: 20,
      },

      dialogRemindVisible: !1,
      linkDialogVisible: !1,
      // 所有的销售员
      allSellers: [],
      // 当前激活的销售员
      activeSellers: [],
      // 当前链接的专题Id
      linkTopicId: 0,
      linkTopicLink: '',
      // 正在加载已激活的销售员
      linkDialogLoading: false,
      // 自身加密的Id
      selfId: '',
    };
  },
  created() {
    this.getList();

    seeFetch('sl-business-promo/topic/allSellers').then(res => {
      if (res.data && res.data.list) {
        this.selfId = res.data.ssbid;
        this.allSellers = res.data.list;
      }
    });
  },
  methods: {
    refresh() {
      this.pagination.page = 1;
      this.getList();
    },
    getList() {
      this.loading = !0;

      const { page, pageSize } = this.pagination;
      seeFetch('sl-business-promo/topic/getList', {
        page,
        pageSize,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.pagination.total = res.data.total;
        this.tableData = res.data.list;

        this.loading = !1;
      });
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },
    handleClickCreate() {
      this.$router.push(`/sl-business-promo/topicCreate/0`);
    },
    handleClickEdit(rowData) {
      const { id } = rowData;
      // window.sessionStorage['sl-business-promo/topic/item'] = JSON.stringify(rowData);
      this.$router.push(`/sl-business-promo/topicEdit/${id}`);
    },
    handleClickStatistic(rowData) {
      const { id } = rowData;

      this.$router.push(`/sl-business-promo/topicStatistic/${id}`);
    },
    handleClickEditCom(rowData) {
      const { id, title } = rowData;

      this.$router.push(`/sl-business-promo/topicEditComponent/${id}/${title}`);
    },
    handleClickDelete(rowData) {
      this.$confirm('此操作将删除选中专题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const { id } = rowData;
          seeFetch('sl-business-promo/topic/delete', { id }).then(res => {
            if (!res.success) {
              Notification({
                type: 'error',
                title: '提示',
                message: res.message,
              });
              return;
            }

            Notification({
              type: 'success',
              title: '提示',
              message: '删除成功',
            });

            this.getList();
          });
        })
        .catch(() => {});
    },
    handleLink(item) {
      this.linkTopicId = item.id;
      this.linkTopicLink = item.link;
      this.activeSellers = [];
      this.linkDialogVisible = true;
      this.linkDialogLoading = true;

      seeFetch('sl-business-promo/topic/activeSellers').then(res => {
        if (res.data && res.data.list) {
          this.activeSellers = res.data.list;
        }
        this.linkDialogLoading = false;
      });
    },
    addSeller() {
      this.activeSellers.push({ sellerId: null, id: 0, name: '' });
    },
    saveSeller(item) {
      if (!item.sellerId) {
        Message.error('请先选择一个销售员');
        return;
      }

      if (this.activeSellers.find(i => i.id === item.sellerId)) {
        Message.error('销售员已经添加');
        return;
      }

      seeFetch('sl-business-promo/topic/updateSeller', {
        topicId: this.linkTopicId,
        sellerId: item.sellerId,
      }).then(res => {
        if (!res.success) {
          Notification.error({ title: '提示', message: res.message });
          return;
        }
        item.id = item.sellerId;
        item.name = this.allSellers.find(i => i.id === item.sellerId).name;
      });
    },
    delSeller(item) {
      this.$confirm(`你确定删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('sl-business-promo/topic/updateSeller', {
          topicId: this.linkTopicId,
          sellerId: item.sellerId,
          status: -1,
        }).then(res => {
          if (!res.success) {
            Notification.error({ title: '提示', message: res.message });
            return;
          }
          this.activeSellers = this.activeSellers.filter(i => i.id !== item.id);
        });
      });
    },
    showLink(item) {
      const originalItem = this.allSellers.find(i => i.id === item.id);

      if (!originalItem) {
        Notification.error('找不到销售员数据，请联系开发者');
        return;
      }

      const link = `${this.linkTopicLink}${
        this.linkTopicLink.indexOf('?') > -1 ? '&' : '?'
      }gp_businessUserId=${this.selfId}&gp_sellerUserId=${originalItem.sid}`;
      const toolLink = 'http://tool.zizaisweet.cn/#/link/qr-code';
      MessageBox.alert(
        `${link}<br/><br/><a href="${toolLink}" target="_blank" class="blue">点击这里生成二维码</a>`,
        `${item.name}专题链接`,
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
    showSelfLink() {
      const link = `${this.linkTopicLink}${
        this.linkTopicLink.indexOf('?') > -1 ? '&' : '?'
      }gp_businessUserId=${this.selfId}&gp_sellerUserId=`;
      const toolLink = 'http://tool.zizaisweet.cn/#/link/qr-code';
      MessageBox.alert(
        `${link}<br/><br/><a href="${toolLink}" target="_blank" class="blue">点击这里生成二维码</a>`,
        '专题链接',
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
  },
};
