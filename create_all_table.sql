use yygl;
create table medicine(
mid_ char(8) not null,
name varchar(40) not null,
prescription char(1),
proDate date,
shelfLife date,
buyingPrice float,
price float,
primary key(mid_));

create table employee(
eid char(8) not null,
name varchar(40) not null,
phone varchar(20),
address varchar(40),
birth date,
primary key(eid)); 

create table guest(
gid char(8) not null,
name varchar(40) not null,
phone varchar(20),
primary key(gid));

create table supplier(
sid char(8) not null,
name varchar(40) not null,
phone varchar(20),
address varchar(40),
manager varchar(20),
primary key(sid));

create table purchase(
mid_ char(8) not null,
sid char(8) not null,
eid char(8) not null,
purchaseTime date not null,
primary key(mid_,purchaseTime),
foreign key(mid_) references medicine(mid_),
foreign key(sid) references supplier(sid),
foreign key(eid) references employee(eid));

create table storage(
mid_ char(8) not null,
reason varchar(20) not null,
storeTime date not null,
primary key(mid_,storeTime),
foreign key(mid_) references medicine(mid_));

create table sale(
mid_ char(8) not null,
gid char(8) not null,
eid char(8) not null,
sale smallint not null,
saleTime date not null,
primary key(mid_,sale),
foreign key(mid_) references medicine(mid_),
foreign key(gid) references guest(gid),
foreign key(eid) references employee(eid));

create table finance(
fid char(8),
count float,
financeTime date not null,
inOut_ boolean not null,
reason varchar(40),
primary key(fid));

/*如果对某些表范围查询较为频繁，取消注释对应建立索引语句*/
/*create index DateIndex on medicine(proDate)*/
