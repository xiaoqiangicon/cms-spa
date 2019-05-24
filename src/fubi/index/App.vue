<template>
  <div class="container">
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="奖品列表">
          <div class="filter">
            <span class="mg-r-10">类型</span>
            <el-select
              v-model="typeId"
              placeholder="请选择"
              size="small"
              @change="handleChangeType"
              filterable
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="handleClickEditType">编辑类型</el-button>
            <el-button class="fl-right" type="primary" size="small" @click="handleClickAdd">添加奖品</el-button>
          </div>
          <div class="table">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="排序">
                <template slot-scope="scope">
                  <div style="cursor:pointer;" @click="handleClickRowSort(scope.row)">
                    {{scope.row.sort}}
                    <i style="color: #409EFF;" class="el-icon-edit"></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="标题"/>
              <el-table-column label="类型">
                <template slot-scope="scope">
                  <div style="cursor:pointer;" @click="handleClickRowType(scope.row)">
                    {{
                    typeList.find(item => item.id === scope.row.typeId) ?
                    typeList.find(item => item.id === scope.row.typeId).name :
                    ''
                    }}
                    <i
                      style="color: #409EFF;"
                      class="el-icon-edit"
                    ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="fuBiMoney" label="兑换福币（元）"/>
              <el-table-column prop="exchangeTimes" label="兑换次数" align="center"/>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" size="small" @click="handleClickRowDelete(scope.row)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="text-align: right; margin-top: 20px;"
              layout="total, prev, pager, next, sizes, jumper"
              :page-size="pagination.pageSize"
              :current-page="pagination.page"
              :total="pagination.total"
              @size-change="onSizeChange"
              @current-change="onCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- dialogEditRowType -->
    <el-dialog
      title="修改类型"
      :visible.sync="dialogEditRowType"
      :before-close="()=>{dialogEditRowType=!1;}"
    >
      <el-select v-model="tempRow.typeId" placeholder="请选择" size="small" filterable>
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRowType">保 存</el-button>
      </span>
    </el-dialog>
    <!-- dialogEditType -->
    <el-dialog title="编辑类型" :visible.sync="dialogEditType" :before-close="()=>{dialogEditType=!1;}">
      <el-table :data="typeList" style="width: 100%">
        <el-table-column label="排序">
          <template slot-scope="scope">
            <div style="cursor:pointer;" @click="handleClickTypeRowSort(scope.row)">
              {{scope.row.sort}}
              <i style="color: #409EFF;" class="el-icon-edit"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型名称">
          <template slot-scope="scope">
            <div style="cursor:pointer;" @click="handleClickTypeRowTypeName(scope.row)">
              {{scope.row.name}}
              <i style="color: #409EFF;" class="el-icon-edit"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="handleClickTypeRowDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- dialogAdd -->
    <el-dialog title="添加奖品" :visible.sync="dialogAdd" :before-close="()=>{dialogAdd=!1;}">
      <div class="row">
        <span class="title">佛事名称</span>：
        <el-select v-model="tempAdd.buddhistId" placeholder="请选择佛事" size="small" filterable>
          <el-option
            v-for="item in buddhistList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="row">
        <span class="title">类型</span>：
        <el-select v-model="tempAdd.typeId" placeholder="请选择类型" size="small" filterable>
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="row">
        <span class="title">排序</span>：
        <el-input style="width: 200px;" v-model.number="tempAdd.sort" placeholder="请输入排序"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = !1">取 消</el-button>
        <el-button type="primary" @click="saveAdd">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'fubiIndex',
  data() {
    return {
      typeList: [],
      tempType: [],

      typeId: 0,
      tableData: [],
      curRow: {}, // 引用类型
      tempRow: {},
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      buddhistList: [],
      tempAdd: {
        buddhistId: '',
        typeId: '',
        sort: '',
      },

      dialogEditType: !1,
      dialogAdd: !1,
      dialogEditRowType: !1,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getTypeList().then(() => {
        this.getList();
      });
      this.getBuddhistList();
    },
    getTypeList() {
      return seeFetch('fubi/index/get_type_list', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.typeList = res.data;
        return res.data;
      });
    },
    getList() {
      const { typeId } = this;
      const { page, pageSize } = this.pagination;
      seeFetch('fubi/index/get_list', {
        typeId,
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
      });
    },
    refresh() {
      this.pagination.page = 1;
      this.getList();
    },
    getBuddhistList() {
      seeFetch('fubi/index/get_buddhist_list', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.buddhistList = res.data;
      });
    },
    handleChangeType() {
      this.refresh();
    },
    handleClickEditType() {
      this.dialogEditType = !0;
    },
    handleClickAdd() {
      this.tempAdd = {
        buddhistId: '',
        typeId: '',
        sort: '',
      };
      this.dialogAdd = !0;
    },
    handleClickRowSort(rowData) {
      const { id, typeId } = rowData;

      this.$prompt('请填写新的序号', '修改序号', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入数字',
      })
        .then(({ value: sort }) => {
          seeFetch('fubi/index/update', { id, sort, typeId }).then(res => {
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
              message: '修改成功',
            });

            rowData.sort = sort;
          });
        })
        .catch(() => {
          console.log('出错');
        });
    },
    handleClickRowType(rowData) {
      this.curRow = rowData;
      this.tempRow = { ...rowData };
      this.dialogEditRowType = !0;
    },
    saveRowType() {
      const { id, sort, typeId } = this.tempRow;

      seeFetch('fubi/index/update', { id, sort, typeId }).then(res => {
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
          message: '修改成功',
        });

        this.curRow.typeId = typeId;
        this.dialogEditRowType = !1;
      });
    },
    handleClickRowDelete(rowData) {
      const { id } = rowData;
      this.$confirm('此操作将删除当前奖品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('fubi/index/delete', { id }).then(res => {
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
              message: '删除成功',
            });

            this.getList();
          });
        })
        .catch(() => {});
    },
    handleClickTypeRowSort(rowData) {
      const { id, name, sort } = rowData;

      this.$prompt('请填写新的序号', '修改序号', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入数字',
      })
        .then(({ value: sort }) => {
          seeFetch('fubi/index/update_type', { id, name, sort }).then(res => {
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
              message: '修改成功',
            });

            rowData.sort = sort;
          });
        })
        .catch(() => {
          console.log('出错');
        });
    },
    handleClickTypeRowTypeName(rowData) {
      const { id, name, sort } = rowData;

      this.$prompt('请填写新的类型名称', '修改类型名称', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputPattern: /^\S+$/,
        inputErrorMessage: '请输入非空字符',
      })
        .then(({ value: name }) => {
          seeFetch('fubi/index/update_type', { id, name, sort }).then(res => {
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
              message: '修改成功',
            });

            rowData.name = name;
          });
        })
        .catch(() => {
          console.log('出错');
        });
    },
    handleClickTypeRowDelete(rowData) {
      const { id } = rowData;
      this.$confirm('此操作将删除当前类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('fubi/index/delete_type', { id }).then(res => {
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
              message: '删除成功',
            });

            const findIndex = this.typeList.findIndex(item => item.id === id);
            this.typeList.splice(findIndex, 1);
          });
        })
        .catch(() => {});
    },
    saveAdd() {
      const { buddhistId, typeId } = this.tempAdd;
      let { sort } = this.tempAdd;

      if (!buddhistId) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '请选择佛事',
        });
        return;
      }

      if (!typeId) {
        Notification({
          type: 'warning',
          title: '提示',
          message: '请选择类型',
        });
        return;
      }

      if (!sort) sort = 0;

      seeFetch('fubi/index/update', { buddhistId, typeId, sort }).then(res => {
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
          message: '添加成功',
        });

        this.refresh();
        this.getBuddhistList();
        this.dialogAdd = !1;
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
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
.filter {
  padding: 30px 10px;
}
.row {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  .title {
    flex-basis: 100px;
  }
}
</style>

