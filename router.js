const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const model = require('./model');


router.get('/medicine/*', async(req, res)=> {
  var data = await model.queryMedicine(req.path,'GET');
  res.send(data);
  res.end();
});
router.post('/medicine/*', async(req, res)=> {
  console.log(req.body)
  var data = await model.queryMedicine(req.path,'POST',req.body);
  res.send(data);
  res.end();
});
router.get('/employee/*', async(req, res)=>{
  var data = await model.queryEmployee(req.path);
  res.send(data);
  res.end();
});


router.get('/guest/*', async(req, res)=>{
  var data = await model.queryGuest(req.path);
  res.send(data);
  res.end();
});


router.get('/supplier/*', async(req, res)=>{
  var data = await model.querySupplier(req.path);
  res.send(data);
  res.end();
});


router.get('/purchase/*', async(req, res)=>{
  var data = await model.queryPurchase(req.path,'GET',req.body);
  res.send(data);
  res.end();
});
router.post('/purchase',async(req, res)=>{
 console.log(req.body)
  var data = await model.insertPurchase(req.body);
  res.send(data);
  res.end();
});
router.post('/purchase/*',async(req, res)=>{
 
  var data = await model.queryPurchase(req.path,'POST',req.body);
  res.send(data);
  res.end();
});

router.get('/storage/*',async(req,res)=>{
  var data = await model.queryStorage(req.path,'GET',req.body);
  res.send(data);
  res.end();
});

router.get('/sale/*',async(req,res)=>{
  model.queryStorage(req.path,"post",req.body).then(function(data){
    res.send(data);
    res.end();
  })
  .catch(function(data){
    res.send(data);
    res.end();   
  });
});

router.get('/finance/*',async(req,res)=>{
  model.queryFinance(req.path,"post",req.body).then(function(data){
    res.send(data);
    res.end();
  })
  .catch(function(data){
    res.send(data);
    res.end();   
  });
});

router.post('/sale/', async(req,res)=>{
  //console.log(222222);
  var params=[req.body.mid,req.body.gid,req.body.eid,req.body.sale,req.body.saleTime,req.body.saleTime];
  model.insertData("sale", params).then(function(data){
    //console.log(333333);
    res.send(JSON.stringify(data));
    res.end();
  })
  .catch(function(data){
    res.send(JSON.stringify(data));
    res.end();   
  });
});

router.post('/sale/*',async(req,res)=>{
  model.querySale(req.path,"post",req.body).then(function(data){
    res.send(data);
    res.end();
  })
  .catch(function(data){
    res.send(data);
    res.end();   
  });
});


router.post('/finance/*', async(req,res)=>{
  model.queryFinance(req.path,"post",req.body).then(function(data){
    res.send(data);
    res.end();
  })
  .catch(function(data){
    res.send(data);
    res.end();   
  });
});
module.exports = router