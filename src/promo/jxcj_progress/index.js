import { formatDate } from '../../utils/date';
import upload from '../../../../pro-com/src/upload';
import { checkItemValid } from './utils';
import { makeUploadImageOptions } from '../../configs/upload';
import { fetchList, delItem, updateItem, finishItem } from './api';

const defaultListQuery = {
  pageNo: 1,
  pageSize: 10,
};
const defaultItem = {
  id: null,
  name: null,
  headImg: null,
  content: null, // 进展内容
  pic: '', // 进展图片或者视频，多个用逗号隔开
  num: null, // 装藏数量
};
export default {
  name: 'JxcjProgress',
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    },
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      item: Object.assign({}, defaultItem),
      isUpdate: false,

      uploadInitialized: false,
    };
  },
  created() {
    this.getList();
  },
  updated() {
    // mounted 中 this.$refs.imageUpload 是 undefined
    const { imageUpload, avatarUpload } = this.$refs;

    if (imageUpload && !this.uploadInitialized) {
      this.uploadInitialized = true;
      upload(
        makeUploadImageOptions({
          el: imageUpload,
          multiple: true,
          done: url => {
            if (url) {
              if (this.item.pic) this.item.pic += ',' + url;
              else this.item.pic = url;
            }
          },
        })
      );
      upload(
        makeUploadImageOptions({
          el: avatarUpload,
          done: url => {
            if (url) {
              this.item.headImg = url;
            }
          },
        })
      );
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNo = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isUpdate = false;
      this.item = Object.assign({}, defaultItem);
    },
    switchStatus(value, row) {
      finishItem({ id: row.id, finish: value }).then(response => {
        this.$message({
          type: 'success',
          message: `${value ? '装藏' : '取消'}成功!`,
        });
        row.isFinish = value;
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isUpdate = true;
      this.item = Object.assign({}, row);
    },
    handleDialogConfirm() {
      const checkResult = checkItemValid(this.item);

      if (typeof checkResult === 'string') {
        this.$alert(checkResult);
        return;
      }

      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        updateItem(checkResult).then(response => {
          this.$message({
            message: `${this.isUpdate ? '更新' : '添加'}成功！`,
            type: 'success',
          });
          this.dialogVisible = false;
          this.getList();
        });
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该条目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        delItem({ id: row.id }).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    delImage(index) {
      const arr = this.item.pic.split(',');
      arr.splice(index, 1);
      this.item.pic = arr.join(',');
    },
  },
};
