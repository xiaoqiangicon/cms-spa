import { Notification } from 'element-ui';
import request from '../../request';
import { handleListReqParams, handleListReqResponse } from './utils';

export default {
  name: 'App',
  data() {
    return {
      search: '',
      type: 0,
      filterGroup: 0,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
      groupList: [],

      dialogVisible: false,
      detailItem: {},
    };
  },
  created() {
    this.fetchList();
    this.fetchGroupList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      request({
        url: '/funtop/getPullList',
        method: 'post',
        data: handleListReqParams({
          search: this.search,
          type: this.type,
          groupId: this.filterGroup,
          page: this.currentPage,
        }),
      }).then(res => {
        handleListReqResponse(res);

        this.loading = !1;
        this.totalCount = res.data.count;
        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    fetchGroupList() {
      request({
        url: '/funtop/getGroupList',
        method: 'post',
        data: {},
      }).then(res => {
        this.groupList = (res.data && res.data.list) || [];
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    addToLibrary({ row: item }, type) {
      request({
        url: '/funtop/getGroupList',
        method: 'post',
        data: {
          id: item.id,
          type,
        },
      }).then(res => {
        Notification({
          title: '提示',
          message: '添加成功',
        });

        this.fetchList();
      });
    },
    showDetail({ row: item }) {
      this.detailItem = item;
      this.dialogVisible = true;
    },
  },
};
