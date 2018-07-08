var mysql = require('mysql');
var uuid = require('node-uuid');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ljm31456',
  port     :  '3306',
  database : 'yygl',
  multipleStatements: true
});

connection.connect();
connection.query("create table if not exists medicine(\
mid_ char(8) not null,\
name varchar(40) not null,\
prescription char(1),\
proDate date,\
shelfLife date,\
buyingPrice float,\
price float,\
primary key(mid_));\
\
create table if not exists employee(\
eid char(8) not null,\
name varchar(40) not null,\
phone varchar(20),\
address varchar(40),\
birth date,\
primary key(eid)); \
\
create table if not exists guest(\
gid char(8) not null,\
name varchar(40) not null,\
phone varchar(20),\
primary key(gid));\
\
create table if not exists supplier(\
sid char(8) not null,\
name varchar(40) not null,\
phone varchar(20),\
address varchar(40),\
manager varchar(20),\
primary key(sid));\
\
create table if not exists purchase(\
mid_ char(8) not null,\
sid char(8) not null,\
eid char(8) not null,\
purchaseTime date not null,\
primary key(mid_),\
foreign key(mid_) references medicine(mid_),\
foreign key(sid) references supplier(sid),\
foreign key(eid) references employee(eid));\
\
create table if not exists storage(\
mid_ char(8) not null,\
reason boolean not null,\
storeTime date not null,\
primary key(mid_,storeTime),\
foreign key(mid_) references medicine(mid_));\
\
create table if not exists sale(\
mid_ char(8) not null,\
gid char(8) not null,\
eid char(8) not null,\
sale boolean not null,\
saleTime date not null,\
primary key(mid_,sale),\
foreign key(mid_) references medicine(mid_),\
foreign key(gid) references guest(gid),\
foreign key(eid) references employee(eid));\
\
create table if not exists finance(\
fid char(8),\
count float,\
financeTime date not null,\
inOut_ boolean not null,\
reason varchar(40),\
primary key(fid));");



function insertData(table, addSqlParams)
{
  var uid = uuid.v1();
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
    var addSql = "INSERT INTO sale(mid_, gid, eid, sale, saletime) VALUES(?,?,?,?,?)";
  }
  else if(table=="finance")
  {
    var addSql = "INSERT INTO finance(fid, count, financeTime, inOut_, reason) VALUES('"+uid.substr(0,8)+"',?,?,?,?)";
  }

  connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     return;
    }        

    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);        
    console.log('INSERT ID:',result);        
    console.log('-----------------------------------------------------------------\n\n');  
  });
  return uid.substr(0,8);
}

function deleteData(table, data)
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
    var delSql ="DELETE FROM storage where mid_='"+data[0]+"' and storeTime = '"+data[1]+"'";
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

function deleteData2(table, stat)
{
  var delSql ="DELETE FROM "+table+"where "+ stat;
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

var sqlQuery = "insert into purchase values('11111111','11111111','11111111','11111111');insert into storage values('11111111','11111111','11111111');";

var i =0;
for(i=0;i<100;i++)
{
  var a= Math.random()*10;
  var mid_ = insertData("medicine", ["medicine"+i, i%2, new Date("2018-07-04 21:00:0"+i%10), new Date("2019-07-04 21:00:0"+i%10), a, a+Math.random()*2]);  
  var b= Math.random()*10;
  var eid = insertData("employee", ["employee"+i, Math.round(Math.random()*100000000000),"address"+i,new Date("1998-01-01 00:0"+ Math.round(Math.random()*10))]);
  var gid = insertData("guest", ["guest"+i, Math.round(Math.random()*100000000000)]); 
  var sid = insertData("supplier",["sid","person"+i,Math.round(Math.random()*100000000000),"address"+i,"manager"+i]);  
  insertData("purchase",[mid_,sid,eid,new Date("2018-08-04 21:00:0"+i%10)]);
  insertData("storage",[mid_,i%2,new Date("2018-08-04 21:00:0"+i%10)]);
  insertData("sale",[mid_,gid,eid,i%2,new Date("2018-08-05 21:00:0"+i%10)]);
  insertData("finance",[10,new Date("2018-08-05 21:00:0"+i%10),i%2,"reason"+i]);
}


//insertData("guest", ["LJM", "13729861023"]);
//deleteData("guest","fba30890");