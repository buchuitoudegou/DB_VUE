const mysql = require('mysql');
const uuid = require('node-uuid');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'wszdwlhw51868',
	database : 'yygl',
	port : 3306,
	multipleStatements: true
});
connection.connect(function(err){
	if(err)
		console.log("error" + err);
	else console.log("succeed connect");
});
module.exports.queryMedicine = async function (reqPath,type,reqData){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	if(type == "GET"){
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='all'){
				toSearch = "";
				break;
			}
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='name')
				toSearch += "name='" + arr[i+1] + "' and ";
			else if(arr[i]=='proDate')
				toSearch += "proDate='" + arr[i+1] +"' and ";
			else if(arr[i]=="shelfLife")
				toSearch += "shelfLife='" + arr[i+1] +"' and ";
			else if(arr[i]=="prescription")
				toSearch += "prescription='" + arr[i+1] +"' and ";
			else if(arr[i]=="buyingPrice")
				toSearch += "buyingPrice=" + arr[i+1] +" and ";
			else if(arr[i]=="price")
				toSearch += "price=" + arr[i+1] +" and ";
		}
	}
	else{
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='name')
				toSearch += "name='" + arr[i+1] + "' and ";
			else if(arr[i]=='proDate'){
				if((i == arr.length-2 && arr[i+1] == 'shelfLife') || i == arr.length - 1){
					toSearch += "proDate>='" + reqData.proDate.from + "' and " + "proDate<='" + reqData.proDate.to +"' and ";
				}
				else{
					toSearch += "proDate='" + arr[i+1] + "' and ";
				}
			}
			else if(arr[i]=="shelfLife"){
				if((i == arr.length-2 && arr[i+1] == 'proDate') || i == arr.length - 1){
					toSearch += "shelfLife>='" + reqData.shelfLife.from + "' and " + "shelfLife<='" + reqData.shelfLife.to +"' and ";
				}
				else{
					toSearch += "shelfLife='" + arr[i+1] + "' and ";
				}
			}
			else if(arr[i]=="prescription")
				toSearch += "prescription='" + arr[i+1] +"' and ";
			else if(arr[i]=="buyingPrice")
				toSearch += "buyingPrice=" + arr[i+1] +" and ";
			else if(arr[i]=="price")
				toSearch += "price=" + arr[i+1] +" and ";
		}
	}
	if(toSearch == ""){
		sqlQuery = "select * from medicine";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from medicine where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	console.log(sqlQuery);
	connection.query(sqlQuery,function(err,rows){
		console.log('rows length: ' + rows.length);
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = rows[i];
			tmp.mid = tmp.mid_;
			delete tmp.mid_;
			tmp = JSON.stringify(tmp);
			tmp = JSON.parse(tmp);
			var date = new Date(tmp.proDate);
			tmp.proDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay();
			date = new Date(tmp.shelfLife);
			tmp.shelfLife = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay();
			data.list[i] = tmp;
		}
		console.log(data);
		resolve(data);
	});
	});
}

module.exports.queryEmployee = async function(reqPath){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	for(var i = 0; i < arr.length; i++){
		if(arr[i]=='eid')
			toSearch += "eid='" + arr[i+1] + "' and ";
		else if(arr[i]=='name')
			toSearch += "name='" + arr[i+1] + "' and ";
		else if(arr[i]=='phone')
			toSearch += "phone='" + arr[i+1] +"' and ";
		else if(arr[i]=="address")
			toSearch += "address='" + arr[i+1] +"' and ";
		else if(arr[i]=="birth")
			toSearch += "birth='" + arr[i+1] +"' and ";
	}
	if(toSearch == ""){
		sqlQuery = "select * from employee";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from employee where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	connection.query(sqlQuery,function(err,rows){
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = JSON.stringify(rows[i]);
			tmp = JSON.parse(tmp);
			var date = new Date(tmp.birth);
			tmp.birth = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay();
			data.list[i] = tmp;
		}
		resolve(data);
	});
	});
}

module.exports.queryGuest = async function(reqPath){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	for(var i = 0; i < arr.length; i++){
		if(arr[i]=='gid')
			toSearch += "gid='" + arr[i+1] + "' and ";
		else if(arr[i]=='name')
			toSearch += "name='" + arr[i+1] + "' and ";
		else if(arr[i]=='phone')
			toSearch += "phone='" + arr[i+1] +"' and ";
	}
	if(toSearch == ""){
		sqlQuery = "select * from guest";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from guest where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	connection.query(sqlQuery,function(err,rows){
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = JSON.stringify(rows[i]);
			tmp = JSON.parse(tmp);
			data.list[i] = tmp;
		}
		resolve(data);
	});
	});
	
}

module.exports.querySupplier = async function(reqPath){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	for(var i = 0; i < arr.length; i++){
		if(arr[i]=='sid')
			toSearch += "sid='" + arr[i+1] + "' and ";
		else if(arr[i]=='name')
			toSearch += "name='" + arr[i+1] + "' and ";
		else if(arr[i]=='phone')
			toSearch += "phone='" + arr[i+1] +"' and ";
		else if(arr[i]=="address")
			toSearch += "address='" + arr[i+1] +"' and ";
		else if(arr[i]=="manager")
			toSearch += "manager='" + arr[i+1] +"' and ";
	}
	if(toSearch == ""){
		sqlQuery = "select * from supplier";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from supplier where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	connection.query(sqlQuery,function(err,rows){
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = JSON.stringify(rows[i]);
			tmp = JSON.parse(tmp);
			data.list[i] = tmp;
		}
		resolve(data);
	});
	});
}

module.exports.queryPurchase = async function(reqPath,type,reqData){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	if(type == "POST"){
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='sid')
				toSearch += "sid='" + arr[i+1] + "' and ";
			else if(arr[i]=='eid')
				toSearch += "eid='" + arr[i+1] +"' and ";
			else if(arr[i]=="purchaseTime"){
				if(i == arr.length -1)
					toSearch += "purchaseTime>='" + reqData.purchaseTime.from + "' and " + "purchaseTime<='" + reqData.purchaseTime.to +"' and ";
				else toSearch += "purchaseTime='" + arr[i+1] +"' and ";
			}
		}
	}
	else{
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='sid')
				toSearch += "sid='" + arr[i+1] + "' and ";
			else if(arr[i]=='eid')
				toSearch += "eid='" + arr[i+1] +"' and ";
			else if(arr[i]=="purchaseTime")
				toSearch += "purchaseTime='" + arr[i+1] +"' and ";
		}
	}
	if(toSearch == ""){
		sqlQuery = "select * from purchase";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from purchase where " + toSearch;
	}
	var data = {
	status: 'ok',
	list: []
	}
	connection.query(sqlQuery,function(err,rows){
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = JSON.stringify(rows[i]);
			tmp = JSON.parse(tmp);
			var date = new Date(tmp.purchaseTime);
			tmp.purchaseTime = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay();
			data.list[i] = tmp;
		}
		resolve(data);
	});
	});
}

module.exports.insertPurchase = async function(reqData){
	return new Promise(function(resolve,reject){
		var paramList = [];
		var uid = uuid.v1();
		paramList.push(reqData.mid);
		paramList.push(reqData.sid);
		paramList.push(reqData.eid);
		paramList.push(reqData.purchaseTime);
		paramList.push(reqData.mid);
		paramList.push('purchase');
		paramList.push(reqData.purchaseTime);
		paramList.push(reqData.purchaseTime);
		paramList.push('purchase');
		//paramList.push(reqData.mid);
		var sqlQuery = "insert into purchase(mid_, sid, eid, purchaseTime) values(?,?,?,?);insert into storage(mid_, reason, storeTime) value(?,?,?);";
		sqlQuery += "insert into finance (fid,count,financeTime,inout_,reason) select '"+uid.substr(0,8)+"', -1*buyingPrice,?,0,? from medicine where medicine.mid_="+reqData.mid;
		console.log(sqlQuery);
		console.log(paramList);
		connection.query(sqlQuery,paramList, function(err,rows){
			let data = {};
			if(err){
				data.status = 'failed';
				resolve(data)
				console.log(err);
			}
			else {
				data.status = 'ok'
				resolve(data)
			}
		});
		/*
		new Promise((resolve, reject)=> {
			connection.query(sqlQuery,paramList, function(err,rows){
			let data = {};
			if(err){
				data.status = 'failed';
				reject(data)
				console.log(err);
			}
			else {
				resolve('ok')
			}
			});
		}).then(()=>{
			return new Promise((resolve, reject)=>{
				connection.query(sqlQuery,paramList, function(err,rows){
				let data = {};
				if(err){
					data.status = 'failed';
					// reject(data)
					console.log(err);
				}
				else {
					resolve('ok')
				}
				});
			})
		})*/
	});
}

module.exports.queryStorage = async function(reqPath,type,reqData){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	if(type == "GET"){
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='all'){
				toSearch = "";
				break;
			}
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='reason')
				toSearch += "reason='" + arr[i+1] + "' and ";
			else if(arr[i]=='storeTime')
				toSearch += "storeTime='" + arr[i+1] +"' and ";
		}
	}
	else{
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='reason')
				toSearch += "reason='" + arr[i+1] + "' and ";
			else if(arr[i]=='storeTime'){
				if(i == arr.length - 1){
					toSearch += "storeTime>='" + reqData.storeTime.from + "' and " + "storeTime<='" + reqData.storeTime.to +"' and ";
				}
				else{
					toSearch += "storeTime='" + arr[i+1] + "' and ";
				}
			}
		}
	}
	if(toSearch == ""){
		sqlQuery = "select * from storage";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from storage where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	console.log(sqlQuery);
	connection.query(sqlQuery,function(err,rows){
		console.log('rows length: ' + rows.length);
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = rows[i];
			tmp.mid = tmp.mid_;
			delete tmp.mid_;
			tmp = JSON.stringify(tmp);
			tmp = JSON.parse(tmp);
			var date = new Date(tmp.storeTime);
			tmp.storeTime = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay();
			data.list[i] = tmp;
		}
		console.log(data);
		resolve(data);
	});
	});	
}

module.exports.insertData = async function (table, addSqlParams)
{
	return new Promise(function (resolve, reject){
	  var uid = uuid.v1();
	  //console.log("table: " + table);
	  if(table=="medicine")
	  {

	    var addSql = "INSERT INTO medicine(mid_, name, prescription, proDate, shelfLife, buyingPrice, price) VALUES('"
	    +uid.substr(0,8)+"',?,?,?,?,?,?)";
	    
	  }
	  else if(table=="employee")
	  {
	    var addSql = "INSERT INTO employee(eid, name, phone, address, birth) VALUES('"
	    +uid.substr(0,8)+"',?,?,?,?)";     
	  }
	  else if(table=="guest")
	  {
	    var addSql = "INSERT INTO guest(gid, name, phone) VALUES('"+uid.substr(0,8)+"',?,?)";  
	  }
	  else if(table=="supplier")
	  {
	    var addSql = "INSERT INTO supplier(sid, name, phone, address, manager) VALUES('"+uid.substr(0,8)+"',?,?,?,?)";
	  }
	  else if(table=="purchase")
	  {
	    var addSql = "INSERT INTO purchase(mid_, sid, eid, purchaseTime) VALUES(?,?,?,?)";
	  }
	  else if(table=="storage")
	  {
	    var addSql = "INSERT INTO storage(mid_, reason, storeTime) VALUES(?,?,?)";
	  }
	  else if(table=="sale")
	  {
	    var addSql = "INSERT INTO sale(mid_, gid, eid, sale, saletime) VALUES(?,?,?,?,?);";
	    addSql+="insert into finance (fid,count,financeTime,inout_,reason) select '"+uid.substr(0,8)+"', Price,?,1,'sell' from medicine where medicine.mid_='"+addSqlParams[0]+"'";
	  }
	  else if(table=="finance")
	  {
	    var addSql = "INSERT INTO finance(fid, count, financeTime, inOut_, reason) VALUES('"+uid.substr(0,8)+"',?,?,?,?)";
	  }	  
	  console.log(addSql);
    connection.query(addSql,addSqlParams,function (err, result) {
	    var post_data = {
	      status : 'ok',
	      mes: 'insert successfully!'
	    };
      if(err){
       //console.log('[INSERT ERROR] - ',err.message);
			post_data.status = 'failed';
			console.log(err);
      }        

      //console.log('--------------------------INSERT----------------------------');
      //console.log('INSERT ID:',result.insertId);        
      //console.log('INSERT ID:',result);        
      //console.log('-----------------------------------------------------------------\n\n');  
      console.log(post_data);
      resolve(post_data);
    });
  });
}


module.exports.deleteData = function(table, data)
{
	if(table=="medicine")
	{
	  var delSql ="DELETE FROM medicine where mid_='"+data+"'";
	}
	else if(table=="employee")
	{
	  var delSql ="DELETE FROM employee where eid='"+data+"'";  
	}
	else if(table=="guest")
	{
	  var delSql ="DELETE FROM guest where gid='"+data+"'";  
	}
	else if(table=="supplier")
	{
	  var delSql ="DELETE FROM supplier where sid='"+data+"'";
	}
	else if(table=="purchase")
	{
	  var delSql ="DELETE FROM purchase where mid_='"+data+"'";
	}
	else if(table=="storage")
	{
	  var delSql ="DELETE FROM store where mid_='"+data[0]+"' and storeTime = '"+data[1]+"'";
	}
	else if(table=="sale")
	{
	  var delSql ="DELETE FROM sale where mid_='"+data[0]+"' and sale = '"+data[1]+"'";
	}
	else if(table=="finance")
	{
	  var delSql ="DELETE FROM finance where fid='"+data+"'";
	}
  connection.query(delSql,function (err, result) {
      if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
      }        

     console.log('--------------------------DELETE----------------------------');
     console.log('DELETE affectedRows',result.affectedRows);
     console.log('-----------------------------------------------------------------\n\n');  
  });
}


module.exports.querySale = async function(reqPath,type,reqData){
	console.log(type);
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	if(type == "GET"){
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='all'){
				toSearch = "";
				break;
			}
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='gid')
				toSearch += "gid='" + arr[i+1] + "' and ";
			else if(arr[i]=='eid')
				toSearch += "eid='" + arr[i+1] +"' and ";
			else if(arr[i]=='sale'&&i!=1)
			{
				console.log(i);
				toSearch += "sale='" + arr[i+1] +"' and ";
			}
			else if(arr[i]=='saleTime')
				toSearch += "saleTime='" + arr[i+1] +"' and ";
		}
	}
	else{
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='mid')
				toSearch += "mid_='" + arr[i+1] + "' and ";
			else if(arr[i]=='gid')
				toSearch += "gid='" + arr[i+1] + "' and ";
			else if(arr[i]=='eid')
				toSearch += "eid='" + arr[i+1] +"' and ";
			else if(arr[i]=='sale'&&i!=1)
			{
				console.log(i);
				toSearch += "sale='" + arr[i+1] +"' and ";
			}
			else if(arr[i]=='saleTime'){
				if(i == arr.length - 1){
					toSearch += "saleTime>='" + reqData.saleTime.from + "' and " + "saleTime<='" + reqData.saleTime.to +"' and ";
				}
				else{
					toSearch += "saleTime='" + arr[i+1] + "' and ";
				}
			}
		}
	}
	if(toSearch == ""){
		sqlQuery = "select * from sale";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from sale where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	console.log(sqlQuery);
	connection.query(sqlQuery,function(err,rows){
		console.log('rows length: ' + rows.length);
		if(err){
			data.status = 'failed';
			throw err;
		}
		for(var i = 0;i < rows.length; i++){
			var tmp = rows[i];
			tmp.mid = tmp.mid_;
			delete tmp.mid_;
			tmp = JSON.stringify(tmp);
			tmp = JSON.parse(tmp);
			var date = new Date(tmp.saleTime);
			tmp.saleTime = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +(date.getDay()+5);
			//console.log(tmp);
			data.list[i] = tmp;
		}
		console.log(data);
		resolve(data);
	});
	});	
}

module.exports.queryFinance = async function(reqPath,type,reqData){
	return new Promise(function(resolve,reject){
	var arr = reqPath.split('/');
	var toSearch = "";
	var sqlQuery = "";
	if(type == "GET"){
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='all'){
				toSearch = "";
				break;
			}
			if(arr[i]=='fid')
				toSearch += "fid='" + arr[i+1] + "' and ";
			else if(arr[i]=='count')
				toSearch += "count='" + arr[i+1] + "' and ";
			else if(arr[i]=='financeTime')
				toSearch += "financeTime='" + arr[i+1] +"' and ";
		}
	}
	else{
		for(var i = 0; i < arr.length; i++){
			if(arr[i]=='fid')
				toSearch += "fid='" + arr[i+1] + "' and ";
			else if(arr[i]=='count')
				toSearch += "count='" + arr[i+1] + "' and ";
			else if(arr[i]=='financeTime'){
				if(i == arr.length - 1){
					toSearch += "financeTime>='" + reqData.financeTime.from + "' and " + "financeTime<='" + reqData.financeTime.to +"' and ";
				}
				else{
					toSearch += "financeTime='" + arr[i+1] + "' and ";
				}
			}
		}
	}
	if(toSearch == ""){
		sqlQuery = "select * from finance";
	}
	else{
		toSearch = toSearch.substr(0,toSearch.length-5) + ";";
		sqlQuery = "select * from finance where " + toSearch;
	}
	var data = {
		status: 'ok',
		list: []
	};
	console.log(sqlQuery);
	connection.query(sqlQuery,function(err,rows){
		console.log('rows length: ' + rows.length);
		if(err){
			data.status = 'failed';
			throw err;
		}
		var sum = 0;
		for(var i = 0;i < rows.length; i++){
			sum += rows[i].count;
			tmp = JSON.stringify(rows[i]);
			tmp = JSON.parse(tmp);
			var date = new Date(tmp.financeTime);
			tmp.financeTime = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDay()+5);
			//console.log(tmp);
			data.list[i] = tmp;
		}
		data.money = sum;
		console.log(data);
		resolve(data);
	});
	});	
}