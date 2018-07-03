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

module.exports = router