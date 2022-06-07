import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import './fetch/index.js';
import SetDialog from './SetDialog.vue';
import { setProps } from './data';
const computedProps = {};

setProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.buddhistVerify.set[name];
      },
      set(value) {
        this.$store.state.buddhistVerify.set[name] = value;
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.buddhistVerify.set[name];
    };
  }
});

export default {
  name: 'APP',
  data() {
    return {
      loading: !0,
      status: 1,
      isTest: 0,
      isFinish: 0,
      commodityId: '',
      content: '',
      templeId: '',
      templeList: [],
      commodityList: [],
      list: [],
      pageNo: 0,
      pageSize: 20,
      total: 0,
      managerDialog: !1,
      managerList: [],
      subdivideList: [], // 管理员可操作规格列表
      setManagerLoading: false,
    };
  },
  computed: {
    ...computedProps,
  },
  components: {
    SetDialog,
  },
  created() {
    this.getList();
    this.getTempleList();
    this.getCommodityList();
  },
  watch: {
    managerDialog(newVal) {
      if (newVal) {
        seeFetch('/buddhist/verify/commodityManagerList', {
          commodityId: this.id,
        }).then(res => {
          if (res.success) {
            this.managerList = res.data;
            this.managerList.forEach(manager => {
              manager.subIdList = [];
              if (manager.subList) {
                manager.subList.forEach(item => {
                  manager.subIdList.push(item.id);
                });
              }
            });
          } else {
            this.showMsg(res.msg, 'error');
          }
        });
        seeFetch('/buddhist/verify/commoditySubdivideList', {
          commodityId: this.id,
        }).then(res => {
          if (res.success) {
            this.subdivideList = res.data;
          } else {
            this.showMsg(res.msg, 'error');
          }
        });
      }
    },
  },
  methods: {
    getList() {
      this.loading = !0;
      let {
        status,
        isTest,
        isFinish,
        commodityId,
        content,
        pageNo,
        pageSize,
        templeId,
      } = this;
      seeFetch('/buddhist/verify/cacheList', {
        status,
        isTest,
        isFinish,
        commodityId,
        templeId,
        content,
        pageNumber: pageNo,
        pageSize,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
          this.total = res.data.count;
        } else {
          this.showMsg(res.msg, 'error');
        }
        this.loading = !1;
      });
    },
    getTempleList() {
      seeFetch('/buddhist/verify/templeNameList', {
        verify: -1,
        isTest: 0,
        tagId: 0,
      }).then(res => {
        if (res.success) {
          this.templeList = res.data;
        } else {
          this.showMsg(res.msg, 'error');
        }
      });
    },
    getCommodityList() {
      seeFetch('/buddhist/verify/commodityNameList', {
        templeId: this.templeId || 0,
      }).then(res => {
        if (res.success) {
          this.commodityList = res.data.list;
        } else {
          this.showMsg(res.msg, 'error');
        }
      });
    },
    changeStatus(status) {
      this.status = status;
      this.getList();
    },
    changeCommodity() {
      this.pageNumber = 1;
      this.getList();
    },
    changeTemple() {
      this.pageNumber = 1;
      this.getCommodityList();
      this.getList();
    },
    changeItemStatus(row, status) {
      if (status === 0) {
        seeFetch('/buddhist/verify/auth', { id: row.id, status: status }).then(
          res => {
            if (res.success) {
              this.showMsg('更新成功');
              this.getList();
              this.showManagerDialog(row);
            } else {
              this.showMsg('出错了~', 'error');
            }
          }
        );
      } else if (status === 1) {
        this.$prompt('请输入打回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          seeFetch('/buddhist/verify/auth', {
            id: row.id,
            status: 2,
            content: value,
          }).then(res => {
            if (res.success) {
              this.showMsg('更新成功');
              this.getList();
            } else {
              this.showMsg('出错了~', 'error');
            }
          });
        });
      } else if (status === 2) {
        this.$confirm('确定要设置成未审核吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          seeFetch('/buddhist/verify/auth', { id: row.id, status: 1 }).then(
            res => {
              if (res.success) {
                this.showMsg('更新成功');
                this.getList();
              } else {
                this.showMsg('出错了~', 'error');
              }
            }
          );
        });
      }
    },
    showManagerDialog(item) {
      this.id = item.id;
      this.managerDialog = !0;
    },
    toWxDetail(row) {
      window.open(
        `https://wx.zizaihome.com/commodity/commodityAuth?commodityId=${row.id}`
      );
    },
    showSub(item) {
      if (!item.isManager || !item.subList.length) {
        item.subIdList = [];
        this.subdivideList.forEach(subdivide => {
          item.subIdList.push(subdivide.id);
        });
        item.checkAll = !0;
      }
      let rawShowSub = item.showSub;
      this.managerList.forEach(manager => {
        manager.showSub = !1;
      });
      item.isManager = 1;
      item.showSub = !rawShowSub;

      this.$forceUpdate();
    },
    changeSubList(item) {
      if (!item.subIdList.length) item.isManager = 0;
      else item.isManager = 1;
      this.$forceUpdate();
    },
    handleCheckAllChange(item) {
      if (item.checkAll) {
        item.subIdList = [];
        this.subdivideList.forEach(subdivide => {
          item.subIdList.push(subdivide.id);
        });
      } else {
        item.subIdList = [];
      }

      item.isIndeterminate = false;
      item.isManager = item.checkAll ? 1 : 0;
      this.$forceUpdate();
    },
    saveManagerSet() {
      if (this.setManagerLoading) return;
      this.setManagerLoading = !0;

      let managerList = this.managerList.filter(
        manager => manager.isManager === 1
      );

      // 选择规格的时候选择的是id，这个时候要转换成选中的对象。
      managerList.forEach(manager => {
        manager.subList = this.subdivideList.filter(subdivide => {
          return manager.subIdList.indexOf(subdivide.id) > -1;
        });
      });

      seeFetch('/buddhist/verify/setCommodityManager', {
        commodityId: this.id,
        list: managerList,
      }).then(res => {
        if (res.success) {
          this.managerDialog = false;
          this.showMsg('保存成功');
          this.getList();
        }
        this.setManagerLoading = false;
      });
    },
    showSet(item) {
      setProps.forEach(({ name }) => {
        this.$store.state.buddhistVerify.set[name] = item[name];
      });
      this.$store.state.buddhistVerify.set.setDialog = !0;
    },
    pageChange(page) {
      this.pageNo = page;
      this.getList();
    },
    showMsg(msg, type) {
      Notification({
        title: '提示',
        type: type || 'success',
        message: msg,
      });
    },
  },
};
