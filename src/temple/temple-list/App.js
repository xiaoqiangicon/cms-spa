import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import './fetch/index.js';
import QRCode from '../../../../pro-com/src/libs-es5/qrcode';
import Upload from '../../com/upload/Upload';

export default {
  name: 'APP',
  data() {
    return {
      loading: !0,
      name: '', // 寺院名称搜索，模糊搜索
      filterTest: '1', // 1 过滤测试寺院 0不过滤测试寺院
      status: 0, // 0 未认证 1 已认证
      tagId: '', // 标签筛选
      list: [], // 列表
      tagList: [], // 标签列表
      total: 0,
      pageSize: 25,
      pageNo: 1,
      detailDialogVisible: !1,
      detail: {},
      uploadRegister: [], // 宗教活动场所登记证
      uploadCooperate: [], // 寺院合作协议书
      uploadCover: [], // 寺院封面图
      uploadSeal: [], // 寺院印章图
      emptyPic:
        'http://imgs.zizaihome.com/a5b9e32f-d71f-460f-aa28-34b35876524a.jpg',
      managerDialogVisible: !1,
      managerList: [], // 管理员列表
      rightList: [
        {
          name: '义工模块权限',
          key: 'pw_volunteer',
        },
        {
          name: '群发消息权限',
          key: 'pw_sendmsg',
        },
        {
          name: '佛事管理权限',
          key: 'pw_ceremony',
        },
        {
          name: '佛事订单权限',
          key: 'pw_order',
        },
        {
          name: '供佛墙管理权限',
          key: 'pw_buddha_wall',
        },
        {
          name: '供佛墙自录数据权限',
          key: 'pw_buddha_wall_record',
        },
        {
          name: '供佛墙订单权限',
          key: 'pw_buddha_wall_order',
        },
        {
          name: '寺院微站管理权限',
          key: 'pw_website',
        },
        {
          name: '客流模块权限',
          key: 'pw_guest_traffic',
        },
        {
          name: '功德主权限',
          key: 'pw_merit_rank',
        },
        {
          name: '文章模块权限',
          key: 'pw_article',
        },
        {
          name: '善款中心权限',
          key: 'pw_money_center',
        },
        {
          name: '功德机权限',
          key: 'pw_merit_machine',
        },
        {
          name: '禅在订单权限',
          key: 'pw_chanzai_order',
        },
        {
          name: '实景礼佛权限',
          key: 'pw_vr_devote',
        },
        {
          name: '寺院月报权限',
          key: 'pw_temple_monthly_report',
        },
        {
          name: '分销推广',
          key: 'pw_promotion',
        },
        {
          name: '自在云协同',
          key: 'pw_office',
        },
      ], // 权限列表
      rightDialogVisible: !1,
      managerRightList: [], // 权限管理员列表
      checkboxList: [],
      unlockDialogVisible: !1, // 解冻
    };
  },
  components: {
    Upload,
  },
  watch: {
    name(newVal) {
      this.getList();
    },
  },
  created() {
    this.getList();
    this.getTagList();
  },
  methods: {
    getList() {
      let { tagId, filterTest, status, pageNo, pageSize, name } = this;
      seeFetch('/temple/list/list', {
        tagId,
        name,
        verify: status,
        isTest: parseInt(filterTest, 10),
        pageNo,
        pageSize,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
          this.total = res.data.total;
        } else {
          this.showError(res.msg);
        }
        this.loading = !1;
      });
    },
    getTagList() {
      seeFetch('/temple/list/tagList', {}).then(res => {
        if (res.success) {
          this.tagList = res.data;
        } else {
          this.showError(res.msg);
        }
      });
    },
    changeStatus(status) {
      this.pageNo = 1;
      this.status = status;
      this.loading = !0;
      this.getList();
    },
    changeVerify() {
      this.loading = !0;
      this.pageNo = 1;
      this.getList();
    },
    changeTag() {
      this.loading = !0;
      this.pageNo = 1;
      this.getList();
    },
    changeItemVerify(row) {
      seeFetch('/temple/list/auth', { id: row.id, verify: row.verify }).then(
        res => {
          if (res.success) {
            this.showSuccess();
          } else {
            this.showError(res.msg);
          }
        }
      );
    },
    changeItemTag(row) {
      seeFetch('/temple/list/update', {
        id: row.id,
        tagIds: row.tagList.join(','),
      }).then(res => {
        if (res.success) {
          this.showSuccess();
        } else {
          this.showError(res.msg);
        }
      });
    },
    showInviteManager(row) {
      seeFetch('/temple/list/managerList', { templeId: row.id }).then(res => {
        if (res.success) {
          this.managerDialogVisible = !0;
          this.managerList = res.data.list;
          setTimeout(() => {
            const { qrCodeBox } = this.$refs;
            qrCodeBox.innerHTML = '';
            // eslint-disable-next-line no-new
            new QRCode(qrCodeBox, {
              text: res.data.url,
              width: 100,
              height: 100,
            });
          }, 300);
        } else {
          this.showError(res.msg);
        }
      });
    },
    removeManager(item, key) {
      this.$confirm(`确定删除${item.nickName}管理员吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('/temple/list/delManager', { id: item.id }).then(res => {
          if (res.success) {
            this.showSuccess();
            this.managerList.splice(key, 1);
          } else {
            this.showError(res.msg);
          }
        });
      });
    },
    showDetail(row) {
      this.detail = row;
      (this.uploadRegister = row.placeNoPic ? [row.placeNoPic] : []), // 宗教活动场所登记证
        (this.uploadCooperate = row.certificatePic ? [row.certificatePic] : []), // 寺院合作协议书
        (this.uploadCover = row.yg_index_head_img
          ? [row.yg_index_head_img]
          : []), // 寺院封面图
        (this.uploadSeal = row.stamp ? [row.stamp] : []), // 寺院印章图
        (this.detailDialogVisible = !0);
    },
    saveDetail() {
      let {
        address,
        chanzai_latitude,
        chanzai_longitude,
        city,
        corporation,
        district,
        feature,
        id,
        introduce,
        mobile,
        name,
        placeNo,
        province,
      } = this.detail;
      let placeNoPic = this.uploadRegister[0] || '';
      let certificatePic = this.uploadCooperate[0] || '';
      let yg_index_head_img = this.uploadCover[0] || '';
      let stamp = this.uploadSeal[0] || '';

      seeFetch('/temple/list/templeUpdate', {
        address,
        chanzai_latitude,
        chanzai_longitude,
        city,
        corporation,
        district,
        feature,
        id,
        introduce,
        mobile,
        name,
        placeNo,
        province,
        placeNoPic,
        certificatePic,
        yg_index_head_img,
        stamp,
      }).then(res => {
        if (res.success) {
          this.detailDialogVisible = !1;
          this.showSuccess();
        } else {
          this.showError(res.msg);
        }
      });
    },
    close(row) {
      this.$confirm(`确定要删除${row.name}寺院吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('/temple/list/close', { templeId: row.id }).then(res => {
          if (res.success) {
            this.showSuccess();
            this.getList();
          } else {
            this.showError(res.msg);
          }
        });
      });
    },
    getUser(templeId, callback) {
      seeFetch('/temple/list/userList', { templeId }).then(res => {
        if (res.success) {
          this.managerRightList = res.data;
          callback(res);
        } else {
          this.showError(res.msg);
        }
      });
    },
    showRight(row) {
      let This = this;
      this.getUser(row.id, function(res) {
        This.rightDialogVisible = !0;
      });
    },
    saveRight() {
      let { managerRightList } = this;
      let params = [];
      managerRightList.forEach(item => {
        let managerItem = {};
        managerItem.id = item.id;
        // 先把所有权限置为0
        for (key in item) {
          if (key.indexOf('pw_') > -1) {
            managerItem[key] = 0;
          }
        }
        // 把选中的权限置为1
        item.rightList.forEach(right => {
          managerItem[right] = 1;
        });

        params.push(managerItem);
      });

      seeFetch('/temple/list/userPwSave', { data: params }).then(res => {
        if (res.success) {
          this.showSuccess();
          this.rightDialogVisible = !1;
        } else {
          this.showError();
        }
      });
    },
    setAllowOp(row) {
      this.$confirm(
        `确定要${row.allowOp ? '关闭' : '启动'}运营事件吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        let setAllowOp = row.allowOp ? 0 : 1;
        seeFetch('/temple/list/allowOp', {
          templeId: row.id,
          allowOp: setAllowOp,
        }).then(res => {
          if (res.success) {
            row.allowOp = setAllowOp;
            this.showSuccess();
          } else {
            this.showError(res.msg);
          }
        });
      });
    },
    showUnlock(row) {
      let This = this;
      this.getUser(row.id, function(res) {
        This.unlockDialogVisible = !0;
      });
    },
    unlock(manager) {
      this.$confirm(`确定解冻${manager.username}账号吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('/temple/list/unlock', { userName: manager.username }).then(
          res => {
            if (res.success) {
              this.showSuccess();
              this.unlockDialogVisible = !1;
            } else {
              this.showError(res.msg);
            }
          }
        );
      });
    },
    pageChange(page) {
      this.pageNo = page;
      this.getList();
    },
    showSuccess() {
      Notification({
        title: '提示',
        type: 'success',
        message: `更改成功`,
      });
    },
    showError(msg) {
      Notification({
        title: '提示',
        type: 'error',
        message: msg,
      });
    },
  },
};
