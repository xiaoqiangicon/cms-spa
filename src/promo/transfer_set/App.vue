<template>
  <div class="container">
    <el-card class="header">
      <div class="f-s-18 mg-b-10">
        {{ buddhistName }}
      </div>
      <div class="gray">
        <span class="mg-r-10">佛事ID：{{ buddhistId }}</span
        >|
        <span class="mg-l-10">佛事状态：{{ isEnd ? '已结束' : '进行中' }}</span>
      </div>
      <el-button
        style="position: absolute; bottom: 40px;right: 40px;"
        type="primary"
        @click="save"
      >
        保 存
      </el-button>
    </el-card>
    <div class="body">
      <div class="aside card">
        <div class="clearfix head">
          <span class="f-s-18">寺院列表</span>
          <el-button
            class="fl-right"
            size="small"
            type="primary"
            @click="dialogAddVisible = true"
          >
            添加寺院
          </el-button>
        </div>
        <div class="list">
          <div
            v-for="item in transferTempleList"
            :key="item.id"
            v-if="!item.isDel"
            class="item"
            :class="{ active: item.id === templeId }"
            @click="changeTemple(item.id)"
          >
            <div class="id">
              {{ item.id }}
            </div>
            <div class="name">
              {{ item.name }}
            </div>
            <div class="opt">
              <el-button
                size="mini"
                icon="el-icon-delete"
                circle
                @click="delTemple(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <el-card class="main">
        <el-table
          ref="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="tableSelectable"
          />
          <el-table-column prop="name" label="选择项名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.isZizaijiaCommodity && scope.row.isOrder"
                class="item"
                effect="dark"
                content="佛事被标记为自营佛事且已存在历史订单，不可勾选和修改"
                placement="top-start"
              >
                <i class="el-icon-info" style="color: #FAAD14;" />
              </el-tooltip>
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格（元）">
            <template slot-scope="scope">
              {{
                scope.row.price > 0
                  ? scope.row.price
                  : scope.row.price === 0
                  ? '无需支付'
                  : '随喜'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="transferRate" label="转单比例">
            <template slot="header">
              转单比例
              <el-tooltip
                class="item"
                effect="dark"
                content="转单比例和转单金额是互斥关系，若填写了其中一个则其“填写项”为不可填写状态。"
                placement="top-start"
              >
                <i class="el-icon-info" style="color: #409eff;" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-input
                v-model.number="scope.row.transferRate"
                :disabled="!scope.row.selected || scope.row.price <= 0"
                style="width: 80px;"
                placeholder=""
              />
              <span slot="suffix" class="mg-l-5">%</span>
            </template>
          </el-table-column>
          <el-table-column prop="transferPrice" label="转单金额（元）">
            <template slot-scope="scope">
              <el-input
                v-model.number="scope.row.transferPrice"
                :disabled="!scope.row.selected || scope.row.price <= 0"
                style="width: 80px;"
                placeholder=""
              />
            </template>
          </el-table-column>
          <el-table-column label="打印机设置" :align="'center'">
            <template slot-scope="scope">
              <span @click="setPrint(scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column label="转单是否生效">
            <template slot-scope="item">
              <el-switch
                :value="!!item.row.takeEffect"
                active-text="是"
                inactive-text="否"
                :disabled="!item.row.selected || item.row.price <= 0"
                @change="value => changeTakeEffect(value, item)"
              />
            </template>
          </el-table-column>
          <el-table-column v-if="0" label="分享福币（%）">
            <template slot="header">
              分享福币（%）
              <el-tooltip
                class="item"
                effect="dark"
                content="设置福币分成：用户分享当前佛事后，从分享链接支付的订单会按设置的比例的福币给他。"
                placement="top-start"
              >
                <i class="el-icon-info" style="color: #409eff;" />
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <div
                v-if="scope.row.price !== 0"
                style="cursor: pointer;"
                @click="handleClickEditFuBiPercent(scope.row)"
              >
                {{
                  subList.find(subItem => subItem.id === scope.row.id)
                    .shareFuBiPercent
                }}%
                <i style="color: #409EFF;" class="el-icon-edit" />
              </div>
              <div v-else>
                -
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- DialogEditFuBi -->
    <el-dialog
      :title="curSubItem.name"
      :visible.sync="dialogEditFuBiVisible"
      :before-close="
        () => {
          dialogEditFuBiVisible = !1;
        }
      "
    >
      <div>
        <span class="mg-r-5">分享福币</span>
        <el-input
          v-model.number="tempCurSubItem.shareFuBiPercent"
          style="width: 100px;"
          placeholder=""
        />
        <span class="mg-l-5">%</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFuBiSet">保 存</el-button>
      </span>
    </el-dialog>
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
        <el-form-item label="选择项：" v-if="printerId !== null">
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
          label="印章效果(顶部)："
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
            <el-radio
              class="seal-radio"
              :label="4"
              v-model="currentSubItem.sealType"
            >
              <div class="seal-radio-wrap">
                <div class="seal3-img">
                  <img
                    class="seal3"
                    src="https://pic.zizaihome.com/fe82f688-4472-4cb1-a895-19acdfa81997.png"
                    alt=""
                  />
                </div>
                <span class="strong">三宝印</span>
              </div>
            </el-radio>
          </div>
        </el-form-item>
        <el-form-item
          label="印章效果(底部)："
          v-if="printerId !== null && currentSubItem.printerType === 1"
        >
          <div style="display: flex;">
            <el-radio
              class="seal-radio"
              :label="1"
              v-model="currentSubItem.sealTypeBottom"
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
              v-model="currentSubItem.sealTypeBottom"
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
              v-model="currentSubItem.sealTypeBottom"
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
            <el-radio
              class="seal-radio"
              :label="4"
              v-model="currentSubItem.sealTypeBottom"
            >
              <div class="seal-radio-wrap">
                <div class="seal3-img">
                  <img
                    class="seal3"
                    src="https://pic.zizaihome.com/fe82f688-4472-4cb1-a895-19acdfa81997.png"
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
    <!-- DialogAdd -->
    <Add
      :visible="dialogAddVisible"
      :temple-list="templeList"
      @updateVisible="updateDialogAddVisible"
      @save="addTemple"
    />
  </div>
</template>

<script>
import clone from 'clone';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch/index';
import { setTimeout } from 'timers';
import Add from './Add';

export default {
  name: 'App',
  components: {
    Add,
  },
  data() {
    return {
      buddhistId: null,
      buddhistName: null,
      promotionPercent: null,
      subList: [], // {id, name, conversionSubdivide, isConversion, isOrder, isZizaijiaCommodity, price, shareFuBiPercent}
      isEnd: null,

      dialogEditFuBiVisible: !1,
      dialogAddVisible: !1,

      curSubItem: {}, // id name price shareFuBiPercent
      tempCurSubItem: {}, // id name price shareFuBiPercent

      templeList: [],
      transferTempleList: [],

      templeId: 1,

      tableData: [],

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
        subList,
        isEnd,
        promotionPercent,
      } = JSON.parse(
        window.sessionStorage.getItem('promo/index/transfer/item')
      );

      this.buddhistId = buddhistId;
      this.buddhistName = buddhistName;
      this.subList = subList;
      this.isEnd = isEnd;
      this.promotionPercent = promotionPercent;

      this.getTempleList();
      this.getTransferTempleList(() => {
        const { transferTempleList } = this;
        console.log('init', transferTempleList);
        if (transferTempleList.length) {
          this.templeId = transferTempleList[0].id;
          this.tableData = transferTempleList[0].subList;
          this.updateTableSelected();
        }
      });
    },
    getTempleList() {
      seeFetch('promo/transfer_set/getTempleList', {}).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.templeList = res.data;
      });
    },
    getTransferTempleList(cb) {
      const { buddhistId } = this;
      seeFetch('promo/transfer_set/getTransferTempleList', { buddhistId }).then(
        res => {
          if (!res.success) {
            Notification({
              type: 'error',
              title: '提示',
              message: res.message,
            });
            return;
          }
          this.transferTempleList = res.data.map(item =>
            this.createHandleData(item)
          );
          if (cb) cb();
        }
      );
    },
    tableSelectable() {
      // eslint-disable-line
      // if (row.price <= 0) return false;

      // if (row.isZizaijiaCommodity && row.isOrder) return false;

      return true;
    },
    // 将服务器数据转化为表格形式数据
    // 本地 subList {id, name, conversionSubdivide, isConversion, isOrder, isZizaijiaCommodity, price}
    // 服务器 subList {id, name, price, transferPrice, transferRate, shareFuBiPercent}
    createHandleData(item) {
      const { subList } = this;

      const res = { ...item };
      res.subList = clone(subList.filter(sub => sub.conversionSubdivide));

      /* eslint-disable no-param-reassign */
      res.subList.forEach(sub => {
        const findSub = item.subList.find(itemSub => itemSub.id === sub.id);
        if (findSub) {
          sub.selected = true;

          // 赋值服务器字段 并设置为选中状态
          const { transferPrice, transferRate } = findSub;
          sub.transferPrice = transferPrice;
          sub.transferRate = transferRate;

          sub.takeEffect = findSub.takeEffect;

          // 服务器已设置打印机
          // this.printerId = findSub.printerId || '';
          sub.printerId = findSub.printerId || '';
          sub.printerType = findSub.printerType || 1;
          sub.sealType = findSub.sealType || 2;
          sub.sealTypeBottom = findSub.sealTypeBottom || 3;
          sub.qrcodePrint = findSub.qrcode_print || 1;
          sub.fontType = findSub.fontType || 0;
          sub.continuousPrintNum = findSub.continuousPrintNum || 1;
          sub.isPrintMobile = findSub.isPrintMobile || 0;
        } else {
          sub.selected = false;

          // 补全字段
          sub.transferPrice = 0;
          sub.transferRate = 0;
          sub.takeEffect = 0;
          // 补齐设置打印机
          sub.printerId = '';
          sub.printerType = 1;
          sub.sealType = 2;
          sub.sealTypeBottom = 3;
          sub.qrcodePrint = 1;
          sub.fontType = 0;
          sub.continuousPrintNum = 1;
          sub.isPrintMobile = 0;
        }
      });
      return res;
    },
    updateTableSelected() {
      this.tableData.forEach(item => {
        if (item.selected) {
          setTimeout(() => {
            this.$refs.table.toggleRowSelection(item, true);
          });
        }
      });
    },
    updateDialogAddVisible(val) {
      this.dialogAddVisible = val;
    },
    handleSelectionChange(selectedAry) {
      const { templeId } = this;

      const index = this.transferTempleList.findIndex(
        item => item.id === templeId
      );
      this.transferTempleList[index].subList.forEach(sub => {
        if (selectedAry.find(item => item.id === sub.id)) {
          sub.selected = true;
        } else {
          sub.selected = false;
        }
      });
    },
    handleClickEditFuBiPercent(rowData) {
      const curSubItem = this.subList.find(item => item.id === rowData.id);
      this.curSubItem = curSubItem;
      this.tempCurSubItem = { ...curSubItem };
      this.dialogEditFuBiVisible = !0;
    },
    submitFuBiSet() {
      const promotionPercent = this.promotionPercent || 0;
      const { id: subId } = this.tempCurSubItem;
      let shareFuBiPercent = this.tempCurSubItem.shareFuBiPercent || 0;

      if (promotionPercent + shareFuBiPercent > 100) {
        Notification({
          type: 'warning',
          title: '提示',
          message: `福币分成比例不可超过${100 - promotionPercent}`,
        });
        return;
      }

      if (!shareFuBiPercent) {
        // 设置为 0 或不填 提示 为不设置分成
        Notification({
          type: 'info',
          title: '提示',
          message: '设置为0或不填将保存为不设置分成',
        });
        shareFuBiPercent = 0;
      }

      seeFetch('promo/transfer_set_/update_sub_set', {
        subId,
        shareFuBiPercent,
      }).then(res => {
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

        this.curSubItem.shareFuBiPercent = shareFuBiPercent;
        this.dialogEditFuBiVisible = !1;
        this.curSubItem.takeEffect = 0;
      });
    },
    // 设置打印机
    setPrint(row) {
      this.currentSubItem = row;
      this.cloneCurrentSubItem = { ...row };
      console.log(this.currentSubItem, 'setprint');
      this.printerDialogVisible = !0;
      // 获取打印机列表
      seeFetch('promo/transfer_set/getPrinterList', {
        templeId: this.templeId,
      }).then(res => {
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
      this.currentSubItem.sealTypeBottom = this.cloneCurrentSubItem.sealTypeBottom;
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
    // 生成上传数据
    // 处理本地的transferTempleList [{id, subList: [{}]}] 数据并上传
    // 本地 subList {id, name, price, transferPrice, transferRate}
    // 服务器 subList {id, transferPrice, transferRate}
    createSubmitData() {
      const { buddhistId, transferTempleList } = this;
      const params = { buddhistId };

      let error = '';

      params.transferTempleList = clone(transferTempleList);
      params.transferTempleList = params.transferTempleList.map(
        (item, templeIndex) => {
          const res = { id: item.id, subList: [], isDel: item.isDel ? 1 : 0 };
          item.subList.forEach((sub, selectionIndex) => {
            if (sub.selected && sub.price > 0 && !item.isDel) {
              const newItem = {
                id: sub.id,
                transferPrice: sub.price <= 0 ? 0 : sub.transferPrice,
                transferRate: sub.transferRate,
                isDel: 0,

                printerId: sub.printerId,
                printerType: sub.printerType,
                sealType: sub.sealType,
                sealTypeBottom: sub.sealTypeBottom,
                qrcodePrint: sub.qrcodePrint,
                fontType: sub.fontType,
                continuousPrintNum: sub.continuousPrintNum,
                isPrintMobile: sub.isPrintMobile,
              };

              res.subList.push(newItem);

              if (error) return;

              const templeSequence = templeIndex + 1;
              const selectionSequence = selectionIndex + 1;
              const errorPrefix = `第${templeSequence}个寺院第${selectionSequence}个选择项`;

              if (!newItem.transferPrice) newItem.transferPrice = 0;
              if (!newItem.transferRate) newItem.transferRate = 0;

              if (newItem.transferPrice && newItem.transferRate) {
                error = `${errorPrefix}转单比例和转单金额只能设置一项`;
              } else if (newItem.transferRate && newItem.transferRate > 100) {
                error = `${errorPrefix}转单比例不能超过100%`;
              } else if (
                newItem.transferPrice &&
                newItem.transferPrice > sub.price
              ) {
                error = `${errorPrefix}转单金额不能超过价格`;
              }
            } else if (!sub.selected && sub.price > 0 && !item.isDel) {
              const newItem = {
                id: sub.id,
                isDel: 1,

                printerId: sub.printerId,
                printerType: sub.printerType,
                sealType: sub.sealType,
                sealTypeBottom: sub.sealTypeBottom,
                qrcodePrint: sub.qrcodePrint,
                fontType: sub.fontType,
                continuousPrintNum: sub.continuousPrintNum,
                isPrintMobile: sub.isPrintMobile,
              };
              res.subList.push(newItem);
            } else if (item.isDel) {
              const newItem = {
                id: sub.id,
                isDel: 1,

                printerId: sub.printerId,
                printerType: sub.printerType,
                sealType: sub.sealType,
                sealTypeBottom: sub.sealTypeBottom,
                qrcodePrint: sub.qrcodePrint,
                fontType: sub.fontType,
                continuousPrintNum: sub.continuousPrintNum,
                isPrintMobile: sub.isPrintMobile,
              };
              res.subList.push(newItem);
            }
          });
          return res;
        }
      );

      if (error) {
        Notification({
          type: 'warning',
          title: '提示',
          message: error,
        });
        return null;
      }
      return params;
    },
    save() {
      const params = this.createSubmitData();
      if (!params) return;
      console.log('params', params);
      seeFetch('promo/transfer_set/update_transfer_set', params).then(res => {
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

        // 立即请求后台接口偶尔会出现错误数据
        setTimeout(() => {
          this.init();
        }, 1000);
      });
    },
    changeTemple(id) {
      this.templeId = id;
      this.tableData = this.transferTempleList.find(
        item => item.id === id
      ).subList;
      this.updateTableSelected();
    },
    addTemple(id) {
      if (this.transferTempleList.find(item => item.id === id)) {
        this.$message({
          message: '此寺院已在转单寺院列表内',
          type: 'warning',
        });
        this.templeId = id;
        this.tableData = this.transferTempleList.find(
          item => item.id === id
        ).subList;
      } else {
        const index = this.templeList.findIndex(item => item.id === id);
        const { name } = this.templeList[index];
        const handleData = this.createHandleData({ id, name, subList: [] });
        this.transferTempleList.push(handleData);
        this.templeId = id;
        this.tableData = handleData.subList;
        this.updateTableSelected();
      }
    },
    delTemple(id) {
      this.$confirm('此操作将删除选中寺院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const index = this.transferTempleList.findIndex(
            item => item.id === id
          );
          console.log(this.transferTempleList[index]);
          // this.transferTempleList.splice(index, 1);
          this.transferTempleList[index].isDel = !0;
          this.$forceUpdate();
        })
        .catch(() => {});
    },
    changeTakeEffect(value, { row: item }) {
      seeFetch('promo/transfer_set/takeEffect', {
        selectionId: item.id,
        templeId: this.templeId,
        checked: value ? 1 : 0,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message || '操作失败',
          });
          return;
        }

        // eslint-disable-next-line no-param-reassign
        item.takeEffect = value ? 1 : 0;

        Notification({
          title: '提示',
          message: '修改成功',
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
