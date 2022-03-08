import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { provinces, citys } from '../../util/data';

export default {
  name: 'APP',
  data() {
    return {
      list: [],
      detail: '',
      type: '',
      typeList: [
        {
          name: '全部',
          value: 0,
        },
        {
          name: '皈依',
          value: 1,
        },
        {
          name: '佛事（功德箱）',
          value: 2,
        },
        {
          name: '直播',
          value: 3,
        },
        {
          name: '微供奉',
          value: 4,
        },
        {
          name: '文章打赏',
          value: 5,
        },
        {
          name: '实景礼佛',
          value: 6,
        },
        {
          name: '日行一善',
          value: 9,
        },
      ],
      provinceJson: '', // 选择省份
      cityJson: '', // 选择城市
      registerDate: [],
      paySuccessDate: [],
      payMoneyDate: [],
      startAppDate: [],
      showAddUserId: false, // 是否显示添加用户
      provinces, // 省份列表
      citys, // 城市列表
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      seeFetch('user/group/list', {}).then(res => {
        if (res.success) {
          this.list = res.data;
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    refresh() {
      if (this.detail.userList.length) {
        this.showAddUserId = !0;
      }
      this.provinceJson = this.detail.provinceJson;
      this.cityJson = this.detail.cityJson;
      this.detail.ruleJson.forEach(rule => {
        if (rule.ruleName === 'paySuccess')
          this.paySuccessDate = [rule.startDate || '', rule.endDate || ''];
        if (rule.ruleName === 'payMoney')
          this.payMoneyDate = [rule.startDate || '', rule.endDate || ''];
        if (rule.ruleName === 'startApp')
          this.startAppDate = [rule.startDate || '', rule.endDate || ''];
      });
      this.registerDate = [
        this.detail.registerTimeStart || '',
        this.detail.registerTimeEnd || '',
      ];
      if (this.detail.registerTime > 0) this.detail.registerType = 0;
      else if (this.detail.startDate) this.detail.registerType = 1;
      else this.detail.registerType = -1;
    },
    create() {
      this.detail = {
        userType: 0,
        ruleType: 2,
        registerTime: '',
        ruleJson: [],
        registerType: -1, // 注册时间选择最近还是时间段
        userList: [], // 筛选用户
      };
      this.cityJson = '';
      this.provinceJson = '';
    },
    addProvinceFil() {
      this.provinceJson = {
        symbol: 1,
        provinceList: [],
        province: '',
      };
    },
    addCityFil() {
      this.cityJson = {
        symbol: 1,
        cityList: [],
        city: '',
      };
    },
    delAddressFil(json) {
      this[json] = '';
    },
    changeType(item) {
      if (item.type !== 2) {
        item.contentId = '';
      }
    },
    addRegiTimeFil() {
      this.detail.registerTime = '';
      this.detail.registerType = 0;
    },
    delRegiTimeFil() {
      this.detail.registerTime = '';
      this.detail.registerTimeEnd = '';
      this.detail.registerTimeStart = '';
      this.detail.registerType = -1;
    },
    addFill(item) {
      let canAdd = true;
      this.detail.ruleJson.forEach(rule => {
        if (rule.ruleName === item) canAdd = false;
      });
      canAdd &&
        this.detail.ruleJson.push({
          days: '',
          type: 0,
          contentId: '',
          symbol: 1,
          number: '',
          number2: '',
          ruleName: item,
          dateType: 1,
        });
    },
    delFil(item) {
      this.detail.ruleJson =
        this.detail.ruleJson &&
        this.detail.ruleJson.filter(rule => {
          return rule.ruleName !== item;
        });
    },
    addUserFil() {
      this.showAddUserId = !0;
      let canAdd = true;
      this.detail.userList.forEach(user => {
        if (!user.id) {
          canAdd = false;
        }
      });
      if (!canAdd) {
        this.showMessage('请先填写已有的输入框');
        return;
      }
      this.detail.userList.push({ id: '' });
    },
    delUserFil() {
      this.showAddUserId = !1;
      this.detail.userList = [];
    },
    del() {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('user/group/del', { id: this.detail.id }).then(res => {
          if (res.success) {
            window.location.reload();
            Notification({
              title: '提示',
              message: '保存失败',
            });
          } else {
            Notification({
              title: '提示',
              message: '删除失败',
            });
          }
        });
      });
    },
    onChangeDatePicker(item) {
      const { startAppDate, payMoneyDate, paySuccessDate, registerDate } = this;
      if (item.ruleName) {
        this.paySuccessDate = paySuccessDate.map(date =>
          this.formatTime(`${date}`)
        );
        this.payMoneyDate = payMoneyDate.map(date =>
          this.formatTime(`${date}`)
        );
        this.startAppDate = startAppDate.map(date =>
          this.formatTime(`${date}`)
        );
        item.startDate =
          item.ruleName === 'paySuccess'
            ? paySuccessDate[0]
            : item.ruleName === 'payMoney'
            ? payMoneyDate[0]
            : item.ruleName === 'startApp'
            ? startAppDate[0]
            : '';
        item.endDate =
          item.ruleName === 'paySuccess'
            ? paySuccessDate[1]
            : item.ruleName === 'payMoney'
            ? payMoneyDate[1]
            : item.ruleName === 'startApp'
            ? startAppDate[1]
            : '';
        item.days = 0;
      } else {
        this.registerDate = registerDate.map(date =>
          this.formatTime(`${date}`)
        );
        this.detail.registerTimeStart = registerDate[0];
        this.detail.registerTimeEnd = registerDate[1];
      }
    },
    getContent() {
      let verifyed = true;
      if (!this.detail.name) {
        this.showMessage('请输入名称');
        return;
      }

      if (this.provinceJson) {
        if (this.provinceJson.provinceList.length) {
          this.provinceJson.province = this.provinceJson.provinceList.join(',');
        } else {
          this.provinceJson = '';
        }
        this.detail.provinceJson = this.provinceJson;
      }

      if (this.cityJson) {
        if (this.cityJson.cityList.length) {
          this.cityJson.city = this.cityJson.cityList.join(',');
        } else {
          this.cityJson = '';
        }
        this.detail.cityJson = this.cityJson;
      }

      if (this.detail.registerType === 0) {
        if (!this.detail.registerTime) {
          this.showMessage('请输入注册时间');
          return;
        }
        this.detail.registerTimeStart = '';
        this.detail.registerTimeEnd = '';
      }
      if (this.detail.registerType === 1) {
        if (!this.detail.registerTimeStart) {
          this.showMessage('请输入注册时间段');
          return;
        }
        this.detail.registerTime = '';
      }

      this.detail.ruleJson.forEach(rule => {
        if (!rule.number && rule.ruleName !== 'startApp') {
          this.showMessage(`请在${rule.ruleNameText}第三个输入框输入数字`);
          verifyed = false;
        }
        if (
          rule.symbol === 4 &&
          !rule.number2 &&
          rule.ruleName !== 'startApp'
        ) {
          this.showMessage(`请在${rule.ruleNameText}第四个输入框输入数字`);
          verifyed = false;
        }
        if (rule.dateType === 1 && !rule.days) {
          this.showMessage(`请在${rule.ruleNameText}第六个输入框输入数字`);
          verifyed = false;
        }
        if (rule.dateType === 0 && !rule.startDate) {
          console.log(rule, 'rule');
          this.showMessage(`请选择${rule.ruleName}的时间段`);
          verifyed = false;
        }
      });

      if (this.detail.userList.length) {
        let default_userId = '';

        this.detail.userList.forEach(user => {
          if (user.id) {
            default_userId += user.id;
          }
        });
        this.detail.default_userId = default_userId;
      } else {
        this.detail.default_userId = '';
      }

      return verifyed;
    },
    showMessage(msg) {
      Notification({
        title: '提示',
        message: msg,
      });
    },
    save() {
      let isVerifyed = this.getContent();
      if (!isVerifyed) return;

      console.log(this.detail, '运行了');
      delete this.detail.userList;
      delete this.detail.registerType;
      seeFetch('user/group/save', this.detail).then(res => {
        if (res.success) {
          window.location.reload();
          Notification({
            title: '提示',
            message: '保存失败',
          });
        } else {
          Notification({
            title: '提示',
            message: '删除失败',
          });
        }
      });
    },
    formatTime(timeStr) {
      if (!timeStr) return;
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
  },
};
