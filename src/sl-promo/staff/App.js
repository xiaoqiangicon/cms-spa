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
    };
  },
  created() {
    this.fetchBusinessList();
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
    detailBusiness(item) {},
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
  },
};
