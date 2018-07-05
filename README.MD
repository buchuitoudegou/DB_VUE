# DB VUE PROJECT
## 依赖安装
1. yarn 包管理程序
2. nodejs 暂时没有版本要求.
服务端开发的同学可以打开router.js和app.js, 里面给出了返回信息的格式。注意看api的设计。
## 功能模块
### 基本信息查询
1. 信息
	+ 药品信息
		+ id
		+ 名字/种类
		+ 是否处方药
		+ 生产日期
		+ 保质期
		+ 进货价格
		+ 出售价格
	+ 员工信息
		+ id
		+ 姓名
		+ 出生日期
		+ 电话
		+ 家庭住址
	+ 客户信息
		+ id
		+ 姓名
		+ 电话
	+ 供应商信息
		+ id
		+ 名字
		+ 电话
		+ 地址
		+ 负责人
2. 功能
	+ 可以按字段筛选，范围筛选。
	+ 对某个字段进行排序。
	+ 多条件筛选

### 进货管理模块
1. 信息
	+ 经手员工id
	+ 供应商id
	+ 药品id
	+ 进货时间
2. 功能
	+ 登记新入库的货物
	+ 查询进货管理

### 库存管理模块
1. 信息
	+ 药品id
	+ 入库时间
	+ 进货/退货
2. 功能
	+ 盘点库存
	+ 条件查询库存

### 销售管理模块
1. 信息
	+ 药品id
	+ 客户id
	+ 销售/退货
	+ 销售时间/退货时间
	+ 经手员工id
2. 功能
	+ 销售登记
	+ 条件查询销售状况
	+ 退货登记

### 财务统计
1. 信息
	+ 流水单号
	+ 财务支出/财务进账
	+ 流水时间
	+ 金额
	+ 原因（进货，销售，退货）
2. 功能
	+ 年/月/日财务统计
	+ 利润/亏损计算

### 系统维护
开发人员还没想好怎么维护

## 关于API的设计
1. 基本信息的查询
	1. GET: /api/{表名}/all——返回这个基本信息的所有内容。例：/api/medicine
	2. GET: /api/{表名}/{字段名}/{筛选信息}/...——通过字段信息筛选返回符合条件的信息。例：/api/medicine/proDate/20180101/price/10 返回生产日期为18年10月10日，且价格为10元的药品
	3. POST: /api/{表名}/.../{日期字段}/, request-data: {{日期字段1}:{from:[日期], to:[日期]}}，返回一个时间段内的产品信息。例：api/medicine/name/lzk/shelfLife/porDate request-data: {proDate:{from:'20180101', to:'20180909'}, shelfLife:{from:'20180101', to:'20180918'}}返回生产日期1月1日到9月9日，且保质期从1月1日到9月18日的叫lzk的产品
2. 进货信息查询
	1. GET: /api/purchase/all 返回所有进货信息
	2. GET: /api/purchase/{字段名}/{筛选信息}/...单值查询
	3. POST: /api/purchase/purchaseTime...返回一个时间段内的进货信息。例: api/purchase/eid/1999/purchaseTime, request-data: {purchaseTime:{from:'20180101', to:'20180901'}}, 返回经手员工id为1999且进货日期从18年1月1日到9月1日的进货信息
	4. POST: /api/purchase 提交新的进货登记。request-data:{eid:{经手员工id}, sid:{供应商id},mid:{药品id}, purchaseTime:{进货时间}}。返回{status: {failed/ok}}。（注意进货之后财务和库存模块增加相应的记录）
3. 库存信息查询
	1. GET: /api/storage/all 返回所有库存信息 
	2. GET: /api/storage/{字段名}/{筛选信息} 和基本信息查询一致
	3. POST: /api/storage/.../{日期字段}, 和基本信息的范围查询一致。request-data: {{日期字段}:{from:'{日期}', to: {日期}}}
4. 销售信息查询
	1. GET: /api/sale/all 返回所有销售信息
	2. GET: /api/sale/{字段名}/{筛选信息} 和基本信息查询一致
	3. POST: /api/sale/.../{日期字段} 范围查询。request-data: {{日期字段}:{from:'{日期}', to: {日期}}}
	4. POST: /api/sale 提交新的销售记录。request-data:{ mid: {药品id}, gid: {客户id}, sale: {退货/进货},saleTime: {销售时间},eid: {经手员工id}}
5. 财务信息查询
	1. GET: /api/finance/all 返回财务信息
	2. GET: /api/finance/{字段名}/{筛选信息} 和基本信息查询一致
	3. POST: /api/finance/.../financeTime, request-data: {financeTime:{from:{日期},to:{日期}}}
	4. <strong>注意，财务信息返回格式和其他模块信息不同，多加了一个亏损/盈利计算(数值)</strong>