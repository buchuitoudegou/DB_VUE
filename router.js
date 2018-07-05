const express = require('express')
const router = express.Router()

router.get('/medicine/*', (req, res)=> {
  let data = {
    status: 'ok',
    list: [
      {
        mid: '12345678',
        name: 'shabi',
        proDate: '2018-01-01',
        shelfLife: '2018-10-10',
        prescription: 'y',
        buyingPrice: 10.0,
        price: 1.0
      },
      {
        mid: '19000000',
        name: 'djoddd',
        proDate: '2018-01-01',
        shelfLife: '2018-10-10',
        prescription: 'y',
        buyingPrice: 100.0,
        price: 1.0
      }
    ]
  };
  res.send(data)
  res.end()
});
// 范围查询
router.post('/medicine/*', (req, res)=>{
  console.log(req.body)
  let data = {
    status: 'ok',
    list: [
      {
        mid: '1000',
        name: 'fasdfaddd',
        proDate: '2018-01-01',
        shelfLife: '2018-10-10',
        prescription: 'y',
        buyingPrice: 100.0,
        price: 10000.0
      }
    ]
  }
  res.send(data)
  res.end()
})
router.get('/employee/*', (req, res)=>{
  let data = {
    status: 'ok',
    list: [
      {
        eid: '19191',
        name: 'lzk',
        birth: '1999-01-01',
        phone: '19087634522',
        address: 'shamaolu'
      }
    ]
  };
  res.send(data)
  res.end()
});
// 范围查询
router.post('/employee/*', (req, res)=>{
  console.log(req.body)
  let data = {
    status: 'ok',
    list: [
      {
        eid: '1adsfasd1',
        name: 'lzkdasf',
        birth: '1999-01-01',
        phone: '19087634522',
        address: 'shamsdfaolu'
      }
    ]
  }
  res.send(data)
  res.end()
})
router.get('/guest/*', (req, res)=>{
  let data = {
    status: 'ok',
    list: [
      {
        gid: '1999',
        name: 'lhw',
        phone: '19992346321'
      }
    ]
  };
  res.send(data)
  res.end()
});
router.get('/supplier/*', (req, res)=>{
  let data = {
    status: 'ok',
    list: [
      {
        sid: '177738',
        name: 'lhq',
        manager: 'lhw',
        phone: '18930263544',
        address: 'shachalu'
      }
    ]
  };
  res.send(data)
  res.end()
})
router.get('/purchase/*', (req, res)=>{
	let data = {
		status: 'ok',
		list: [
			{
				eid: '1921221',
				sid: '1200022',
				mid: '0090933',
				purchaseTime: '2019-01-01'
			}
		]
	}
	res.send(data)
	res.end()
})
// 进货登记
router.post('/purchase', (req, res)=>{
  console.log(req.body)
  res.send({status:'ok'})
  res.end()
})
// 范围查询
router.post('/purchase/*', (req, res)=>{
  console.log(req.body)
  res.send({status:'ok', list:[]})
})
router.get('/storage/*', (req, res)=>{
  let data = {
    status: 'ok',
    list: [
      {
        mid: '12121212',
        storeTime: '2018-09-01',
        reason: '进货'
      },
      {
        mid: '1212dasdf1',
        storeTime: '2019-09-01',
        reason: '退货'
      }
    ]
  }
  res.send(data)
  res.end()
})
// 范围查询
router.post('/storage/*', (req, res)=>{
  //console.log(req.body)
  let data = {
    status: 'ok',
    list: [
      {
        mid: '12121212',
        storeTime: '2018-09-01',
        reason: '进货'
      }
    ]
  }
  res.send(data)
  res.end()
})

router.get('/sale/*', (req, res)=>{
  let data = {
    status: 'ok',
    list: [
      {
        mid: 'eafawef',
        gid: '121212',
        sale: true, 
        saleTime: '2019-01-09',
        eid: 'adasddf'
      }
    ]
  }
  res.send(data)
  res.end()
})
// 范围查询
router.post('/sale/*', (req, res)=>{
  console.log(req.body)
  let data = {
    status: 'ok',
    list: [
      {
        mid: 'eafaw112@@ef',
        gid: 'dsfa12',
        sale: false, 
        saleTime: '2019-01-09',
        eid: 'adasddddf'
      },
      {
        mid: 'eafawef',
        gid: '121212',
        sale: true, 
        saleTime: '2019-01-09',
        eid: 'adasddf'
      }
    ]
  }
  res.send(data)
  res.end()
})
// 提交新的销售信息
router.post('/sale', (req, res)=>{
  console.log(req.body)
  res.send({status:'ok'})
  res.end()
})
router.get('/finance/*',(req, res)=>{
  let data = {
    status: 'ok',
    money: 100,
    list: [
      {
        fid: 'adfasdf',
        inOut: true,       // 支出或收入
        financeTime: '2019-01-01', // 流水时间
        count: 100,       // 金额
        reason: 'purchase'
      }
    ]
  }
  res.send(data)
  res.end()
})
// 范围查询
router.post('/finance/*', (req, res)=>{
  console.log(req.body)
  let data = {
    status: 'ok',
    money: 1000,
    list: [
      {
        fid: 'aasf1412df',
        inOut: false,       // 支出或收入
        financeTime: '2019-01-01', // 流水时间
        count: 1090,       // 金额
        reason: 'sale'
      }
    ]
  }
  res.send(data)
  res.end()
})
module.exports = router