<template>
  <div class="container">
    <el-card class="header">
      <div class="f-s-18 mg-b-10">
        {{ buddhistName }}
      </div>
      <div class="gray">
        <div>
          <span class="mg-r-10">佛事ID：{{ buddhistId }}</span
          >|
          <span class="mg-l-10"
            >佛事状态：{{ isEnd ? '已结束' : '进行中' }}</span
          >
        </div>
        <div class="tip fl-left mg-t-20 mg-r-20">
          组合订单：是用于APP“超度”和“祈福”模块的订单自动调度到寺院的功能。其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励
        </div>
        <div class="tip fl-left mg-t-20" style="min-height: 82px;">
          可绑定手动转单规格，下单后可自行在转单列表手动转单
        </div>
      </div>
    </el-card>
    <div class="body">
      <div class="aside card">
        <div class="clearfix head">
          <span class="f-s-18">选择项列表</span>
          <el-button
            class="fl-right"
            size="small"
            type="primary"
            @click="addDialogVisible = true"
          >
            添加组合项
          </el-button>
        </div>
        <div class="list">
          <div
            v-for="item in mergeSubList"
            :key="item.id"
            class="item"
            :class="{ active: item.id === subId }"
            @click="changeSub(item.id)"
          >
            <div class="id">
              {{ item.id }}
            </div>
            <div class="name">
              {{ item.name }}
            </div>
            <div class="opt">
              <el-tooltip
                v-if="item.isOrder && item.isZizaijiaCommodity"
                effect="dark"
                content="选择项被标记为自营佛事且有历史订单，不可删除"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  icon="el-icon-warning"
                  style="color: #FAAD14;"
                  circle
                />
              </el-tooltip>
              <el-button
                v-else
                size="mini"
                icon="el-icon-delete"
                circle
                @click="delSub(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <el-card class="main">
        <div class="head">
          <span class="f-s-18">选择项详情</span>
          <div class="fl-right">
            <el-button type="primary" @click="add">
              添 加
            </el-button>
            <el-button type="primary" @click="save">
              保 存
            </el-button>
          </div>
        </div>
        <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="name" label="寺院名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.templeId"
                placeholder="请选择"
                size="small"
                filterable
                @change="handleChangeRowTemple(scope)"
              >
                <el-option
                  v-for="item in transferTempleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="佛事名称">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.buddhistId"
                placeholder="请选择"
                size="small"
                filterable
                @change="handleChangeRowBuddhist(scope)"
              >
                <el-option
                  v-for="item in scope.row.buddhistSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="transferRate" label="选择项">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.subId"
                placeholder="请选择"
                size="small"
                filterable
              >
                <el-option
                  v-for="item in scope.row.subSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="transferPrice" label="转单价格（元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="打印机设置" :align="'center'">
            <template slot-scope="scope">
              <span @click="setPrint(scope.row)">设置</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 打印机设置 -->
    <el-dialog
      title="小票打印设置"
      :visible="printerDialogVisible"
      :show-close="false"
      width="600px"
    >
      <el-form label-width="130px" size="medium">
        <el-form-item label="选择打印机：">
          <el-select
            v-model="printerId"
            placeholder="请选择"
            style="width: 250px;"
            @change="onChangeSelectPrinter"
          >
            <el-option
              v-for="(item, index) in printerList"
              :key="index"
              :label="item.address"
              :value="item.id"
              :disabled="!item.online"
              v-if="item.type === 1"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择项：" v-if="printerId !== null && !1">
          <el-checkbox-group
            v-model="isSelectGuiGe"
            @change="onChangePrinterSelectGuiGe"
          >
            <el-checkbox
              v-for="(item, index) in [1]"
              :label="index"
              :key="index"
              >{{ currentSubItem.name || '未命名选择项' }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="打印联数："
          v-if="printerId !== null && currentSubItem.printerType === 0"
        >
          <el-select
            v-model="currentSubItem.continuousPrintNum"
            placeholder="请选择"
            style="width: 250px;"
          >
            <el-option
              v-for="n in 5"
              :key="n"
              :label="n + '联'"
              :value="n"
              :disabled="n === 1 && currentSubItem.qrcodePrint === 2"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 隔联打印需打印联数 > 1 -->
        <el-form-item
          label="二维码："
          v-if="printerId !== null && currentSubItem.printerType === 0"
        >
          <el-radio v-model="currentSubItem.qrcodePrint" :label="1"
            >全部打印</el-radio
          >
          <el-radio
            v-model="currentSubItem.qrcodePrint"
            :label="2"
            :disabled="currentSubItem.continuousPrintNum === 1"
            >隔联打印</el-radio
          >
          <el-radio v-model="currentSubItem.qrcodePrint" :label="3"
            >不打印</el-radio
          >
          <p class="mg-b-0">
            二维码使用于内部工作流程处理，假如要把小票给客户，请选择“隔联打印”，可以打出无二维码的一联，将该联给客户。
          </p>
        </el-form-item>
        <el-form-item
          label="电话号码："
          v-if="printerId !== null && currentSubItem.printerType === 0"
        >
          <el-radio v-model="currentSubItem.isPrintMobile" :label="1"
            >打印</el-radio
          >
          <el-radio v-model="currentSubItem.isPrintMobile" :label="0"
            >不打印</el-radio
          >
          <p class="mg-b-0">
            如果不希望透露功德主的联系方式，可以选择不打印电话号码。
          </p>
        </el-form-item>
        <el-form-item
          label="二维码："
          v-if="printerId !== null && currentSubItem.printerType === 1"
        >
          <el-radio v-model="currentSubItem.qrcodePrint" :label="1"
            >打印</el-radio
          >
          <el-radio v-model="currentSubItem.qrcodePrint" :label="2"
            >不打印</el-radio
          >
          <p class="mg-b-0">
            二维码适用于扫码对此订单进行拍照或者拍摄视频，为用户进行反馈。
          </p>
        </el-form-item>
        <el-form-item
          label="印章效果："
          v-if="printerId !== null && currentSubItem.printerType === 1"
        >
          <div style="display: flex;">
            <el-radio
              class="seal-radio"
              :label="1"
              v-model="currentSubItem.sealType"
            >
              <div class="seal-radio-wrap">
                <div class="seal1-img">
                  <img
                    class="seal1"
                    src="https://pic.zizaihome.com/3bc20e17-64cd-4b4a-a9da-67e490271447.png"
                    alt=""
                  />
                </div>
                <span class="strong">不打印</span>
              </div>
            </el-radio>
            <el-radio
              class="seal-radio"
              :label="2"
              v-model="currentSubItem.sealType"
            >
              <div class="seal-radio-wrap">
                <div class="seal2-img">
                  <img
                    class="seal2"
                    src="https://pic.zizaihome.com/9c4ac595-24cb-4d4e-9525-f4cc1e96bfc9.png"
                    alt=""
                  />
                </div>
                <span class="strong">万字印</span>
              </div>
            </el-radio>
            <el-radio
              class="seal-radio"
              :label="3"
              v-model="currentSubItem.sealType"
            >
              <div class="seal-radio-wrap">
                <div class="seal3-img">
                  <img
                    class="seal3"
                    src="https://pic.zizaihome.com/bbf60ebf-06ba-475a-9274-5a982deabe66.png"
                    alt=""
                  />
                </div>
                <span class="strong">三宝印</span>
              </div>
            </el-radio>
          </div>
        </el-form-item>
        <el-form-item
          label="打印字体："
          v-if="printerId !== null && currentSubItem.printerType === 1"
        >
          <el-select
            v-model="currentSubItem.fontType"
            placeholder="请选择"
            style="width: 250px;"
          >
            <el-option :label="'默认字体'" :value="0"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePrinterDialogCancel">取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handlePrinterDialogConfirm"
          >好 的</el-button
        >
      </span>
    </el-dialog>
    <Add
      :visible="addDialogVisible"
      :sub-list="subList"
      @updateVisible="updateDialogVisible"
      @save="addMergeSub"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch/index';
import Add from './Add';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      loading: !0,

      buddhistId: null,
      buddhistName: null,
      buddhistStatus: null,
      subList: [], // 佛事的选择项数据 {id, name, conversionSubdivide, isConversion, isOrder, isZizaijiaCommodity, price}
      isEnd: null,
      addDialogVisible: !1,

      mergeSubList: [],
      transferTempleList: [], // 可设置的寺院列表数据
      templeBuddhistMap: {}, // {templeId: []}寺院 佛事 的 map , 每次请求数据后存储到本地, 优化请求

      subId: null, // 当前选中的组合项
      tableData: [], // {templeId, buddhistSelecte, buddhistId, subSelect, subId, price}

      // 打印机设置
      printerDialogVisible: !1,
      printerId: '',
      printerList: [],
      currentSubItem: {}, // 点击设置打印机时的行
      cloneCurrentSubItem: {}, // 复制的选中行

      currentPrinterItem: {},
      isSelectGuiGe: !0, // 是否选中规格，默认选中
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const {
        buddhistId,
        buddhistName,
        buddhistStatus,
        subList,
        isEnd,
      } = JSON.parse(
        window.sessionStorage.getItem('promo/index/transfer/item')
      );
      this.buddhistId = buddhistId;
      this.buddhistName = buddhistName;
      this.buddhistStatus = buddhistStatus;
      this.subList = subList;
      this.isEnd = isEnd;

      this.getTempleList(() => {
        this.getMergeSubList();
      });
    },
    getTempleList(cb) {
      seeFetch('promo/merge_set/getTempleList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.transferTempleList = res.data;
        if (cb) cb();
      });
    },
    getMergeSubList() {
      const { buddhistId } = this;
      seeFetch('promo/merge_set/getMergeSubList', { buddhistId }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }
        this.mergeSubList = res.data;
        if (this.mergeSubList.length) {
          this.subId = this.mergeSubList[0].id;
          this.createTableData(this.subId, tableData => {
            this.tableData = tableData;
          });
        } else {
          this.loading = !1;
        }
      });
    },
    getBuddhistList(templeId) {
      return seeFetch('promo/merge_set/getBuddhistList', {
        id: templeId,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return null;
        }
        this.templeBuddhistMap[templeId] = res.data;
        /* eslint-disable */
        console.log('单条数据获取结束');
        return res.data;
      });
    },
    createTableData(curSubId, cb) {
      this.loading = !0;

      // 根据当前选中的选择项 从服务器获取转单寺院列表 从服务器请求寺院对应的佛事列表
      const origin = this.mergeSubList.find(item => item.id === curSubId);
      const promiseAry = [];

      origin.subList.forEach(
        ({
          templeId,
          buddhistId,
          subId,
          price,
          printerId,
          printerType = 1,
          sealType = 1,
          fontType = 0,
          qrcode_print,
          continuousPrintNum = 1,
          isPrintMobile = 0,
        }) => {
          const resItem = {
            templeId,
            buddhistId,
            subId,
            price,
            buddhistSelect: [],
            subSelect: [],

            printerId: printerId || '',
            printerType,
            sealType,
            fontType,
            qrcodePrint: qrcode_print || 1,
            continuousPrintNum,
            isPrintMobile,
          };

          const getData = new Promise(resolve => {
            if (this.templeBuddhistMap[templeId] === undefined) {
              resolve(this.getBuddhistList(templeId));
            } else {
              resolve(this.templeBuddhistMap[templeId]);
            }
          });

          const handleData = () =>
            getData.then(data => {
              resItem.buddhistSelect = data;
              // 本地模拟数据的时候这里报错会导致下边的语句不执行, 因此添加判断语句
              const findItem = data.find(item => item.id === buddhistId);
              if (findItem) {
                resItem.subSelect = findItem.subList;
              }
              return resItem;
            });

          promiseAry.push(handleData());
        }
      );

      Promise.all(promiseAry).then(res => {
        /* eslint-disable */
        console.log('全部执行结束');
        console.log(res);
        this.loading = !1;
        cb(res);
      });
    },
    createSubmitData() {
      // 将当前的 tableData 转化为 submitData
      const { tableData, subId: curSubId } = this;
      const params = { subId: curSubId, mergeList: [] };
      tableData.forEach(
        ({
          templeId,
          buddhistId,
          subId,
          price,
          subSelect,
          printerId = 0,
          printerType,
          sealType,
          qrcodePrint,
          fontType,
          continuousPrintNum,
          isPrintMobile,
        }) => {
          if (templeId) {
            let name = '';
            subSelect.forEach(item => {
              if (item.id === subId) {
                name = item.name;
                return;
              }
            });
            params.mergeList.push({
              templeId,
              commodityId: buddhistId,
              subdivideId: subId,
              price: parseFloat(price),
              name,
              // 打印机参数
              printerId: printerId || 0,
              printerType,
              sealType,
              qrcode_print: qrcodePrint,
              fontType,
              continuousPrintNum,
              isPrintMobile,
            });
          }
        }
      );

      return params;
    },
    updateDialogVisible(val) {
      this.addDialogVisible = val;
    },
    handleChangeRowTemple(scope) {
      const { templeId } = scope.row;

      // 重置 佛事 id 与选择项 id
      scope.row.buddhistId = '';
      scope.row.subId = '';

      // 获取寺院对应的佛事下拉数据
      const getData = new Promise((resolve, reject) => {
        if (this.templeBuddhistMap[templeId] === undefined) {
          this.getBuddhistList(templeId).then(data => resolve(data));
        } else {
          resolve(this.templeBuddhistMap[templeId]);
        }
      });

      getData.then(data => {
        scope.row.buddhistSelect = data;
        return data;
      });

      // 改变寺院时，重置打印机
      console.log('change', this.cloneCurrentSubItem);
      this.currentSubItem.printerId = this.cloneCurrentSubItem.printerId;
      this.currentSubItem.printerType = this.cloneCurrentSubItem.printerType;
      this.currentSubItem.sealType = this.cloneCurrentSubItem.sealType;
      this.currentSubItem.fontType = this.cloneCurrentSubItem.fontType;
      this.currentSubItem.qrcodePrint = this.cloneCurrentSubItem.qrcodePrint;
      this.currentSubItem.continuousPrintNum = this.cloneCurrentSubItem.continuousPrintNum;
      this.currentSubItem.isPrintMobile = this.cloneCurrentSubItem.isPrintMobile;
    },
    handleChangeRowBuddhist(scope) {
      const { buddhistId, buddhistSelect } = scope.row;
      scope.row.subSelect = buddhistSelect.find(
        item => item.id === buddhistId
      ).subList;
    },
    add() {
      this.tableData.push({
        templeId: '',
        buddhistId: '',
        subId: '',
        buddhistSelect: [],
        subSelect: [],
        price: '',
      });
    },
    save() {
      if (!this.subId) {
        Notification({
          type: 'error',
          title: '提示',
          message: '您当前还未选中任何组合项哦',
        });
        return;
      }

      const params = this.createSubmitData();
      console.log(params);

      seeFetch('promo/merge_set/update', params).then(res => {
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
          message: '保存成功',
        });
        this.init();
      });
    },
    changeSub(id) {
      this.subId = id;
      this.createTableData(id, res => {
        this.tableData = res;
      });
    },
    addMergeSub(id) {
      if (this.mergeSubList.find(item => item.id === id)) {
        this.$message({
          message: '此选择项已在选择项列表内',
          type: 'warning',
        });
        this.subId = id;
        this.createTableData(id, res => {
          this.tableData = res;
        });
      } else {
        const subData = this.subList.find(item => item.id === id);
        const { name, isOrder, isZizaijiaCommodity } = subData;

        this.mergeSubList.push({
          id,
          name,
          isOrder,
          isZizaijiaCommodity,
          subList: [],
        });
        this.subId = id;
        this.createTableData(id, res => {
          this.tableData = res;
        });
      }
    },
    delSub(id) {
      this.$confirm('此操作将删除选中的组合项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('promo/merge_set/delete', { id }).then(res => {
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
            this.init();
          });
        })
        .catch(() => {});
    },
    // 设置打印机
    setPrint(row) {
      const { templeId } = row;
      this.currentSubItem = row;
      this.cloneCurrentSubItem = { ...row };
      console.log(this.currentSubItem, 'setprint');
      this.printerDialogVisible = !0;

      // 获取打印机列表
      seeFetch('promo/transfer_set/getPrinterList', { templeId }).then(res => {
        this.printerList = res.data;
        this.printerId = this.currentSubItem.printerId;
      });
    },
    onChangeSelectPrinter() {
      this.printerList.forEach(item => {
        if (item.id === this.printerId) {
          this.currentPrinterItem = item;
          this.currentSubItem.printerId = item.id;
          this.currentSubItem.printerType = item.type;
        }
      });

      console.log(this.printerId, this.currentPrinterItem, 'current printer');
    },
    onChangePrinterSelectGuiGe() {},
    handlePrinterDialogCancel() {
      this.currentSubItem.printerId = this.cloneCurrentSubItem.printerId;
      this.currentSubItem.printerType = this.cloneCurrentSubItem.printerType;
      this.currentSubItem.sealType = this.cloneCurrentSubItem.sealType;
      this.currentSubItem.fontType = this.cloneCurrentSubItem.fontType;
      this.currentSubItem.qrcodePrint = this.cloneCurrentSubItem.qrcodePrint;
      this.currentSubItem.continuousPrintNum = this.cloneCurrentSubItem.continuousPrintNum;
      this.currentSubItem.isPrintMobile = this.cloneCurrentSubItem.isPrintMobile;
      this.printerDialogVisible = !1;
    },
    handlePrinterDialogConfirm() {
      if (!this.isSelectGuiGe) {
        this.handlePrinterDialogCancel();
        return;
      }
      const params = this.createSubmitData();
      console.log('params', params, this.transferTempleList);
      this.printerDialogVisible = !1;
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  width: 600px;
  padding: 20px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
}
.gray {
  color: #aeafae;
}
.card {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.container {
  width: 100%;
  padding: 40px 20px;

  .header {
    margin-bottom: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .body {
    display: flex;
    .aside {
      flex: 1;
      .head {
        height: 52px;
        line-height: 32px;
        padding-bottom: 20px;
        border-bottom: 2px solid #ebeef5;
      }
      .list {
        margin-top: 20px;

        .item {
          display: flex;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          border-radius: 4px;
          margin-bottom: 10px;
          &.active {
            background: #409eff;
          }
          .id {
            flex-basis: 60px;
            padding-left: 10px;
            text-align: left;
          }
          .name {
            flex-grow: 1;
          }
          .opt {
            margin-right: 5px;
          }
        }
      }
    }
    .main {
      flex: 3;
      margin-left: 20px;

      .head {
        height: 52px;
        line-height: 32px;
        padding-bottom: 20px;
        border-bottom: 2px solid #ebeef5;
      }
    }
  }
}
.seal-radio {
  display: flex;
  align-items: center;
  .seal1 {
    height: 50px;
    margin-bottom: 10px;
  }
  .seal3,
  .seal2 {
    width: 50px;
    margin-bottom: 10px;
  }
}
</style>
