export interface IFinance {
  fid: string,
  inOut: boolean,       // 支出或收入
  financeTime: string, // 流水时间
  count: number,       // 金额
  reason: string
}