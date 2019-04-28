import { fixedFloat } from '../../util';

export const makeTotal = data => {
  /* eslint-disable no-param-reassign */
  // 总金额
  let totalAmount = 0;
  // 增值服务费
  let totalIncreaseCharge = 0;
  // 渠道服务费
  let totalChannelCharge = 0;
  // 渠道服务费补贴
  let totalChannelSubsidy = 0;
  // 功能服务费
  let totalFunctionCharge = 0;
  // 推广员奖励金
  let totalPromoterReward = 0;
  // 实际提现金额
  let realTakeAmount = 0;

  data.dateItems.forEach(dateItem => {
    const dates = dateItem.date.split('-');

    dateItem.year = parseInt(dates[0], 10);
    dateItem.month = parseInt(dates[1], 10);

    dateItem.orders.forEach(order => {
      totalAmount += order.amount || 0;
      totalIncreaseCharge += order.increaseCharge || 0;
      totalChannelCharge += order.channelCharge || 0;
      totalChannelSubsidy += order.channelSubsidy || 0;
      totalFunctionCharge += order.functionCharge || 0;
      totalPromoterReward += order.promoterReward || 0;
    });
  });

  totalAmount = fixedFloat(totalAmount);
  totalIncreaseCharge = fixedFloat(totalIncreaseCharge);
  totalChannelCharge = fixedFloat(totalChannelCharge);
  totalChannelSubsidy = fixedFloat(totalChannelSubsidy);
  totalFunctionCharge = fixedFloat(totalFunctionCharge);
  totalPromoterReward = fixedFloat(totalPromoterReward);

  realTakeAmount = fixedFloat(
    totalAmount -
      totalIncreaseCharge -
      totalChannelCharge +
      totalChannelSubsidy -
      totalFunctionCharge -
      totalPromoterReward -
      (data.platformSupport || 0) -
      (data.specialCharge || 0)
  );

  data.totalAmount = totalAmount;
  data.totalIncreaseCharge = totalIncreaseCharge;
  data.totalChannelCharge = totalChannelCharge;
  data.totalChannelSubsidy = totalChannelSubsidy;
  data.totalFunctionCharge = totalFunctionCharge;
  data.totalPromoterReward = totalPromoterReward;
  data.realTakeAmount = realTakeAmount;
};

export default {};
