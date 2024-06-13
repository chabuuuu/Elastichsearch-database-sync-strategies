
DROP TABLE IF EXISTS employee;

CREATE TABLE employee(
  id serial primary key ,
  name varchar(150),
  email varchar(50) not null unique ,
  salary bigint,
  city varchar(150),
  last_update TIMESTAMP
);


insert into employee(name, email, salary, city, last_update)
values ('jon', 'jon@mail.com', 70000, 'SBY', CURRENT_TIMESTAMP);

insert into employee(name, email, salary, city, last_update)
values ('wick', 'wick@mail.com', 80000, 'JKT', CURRENT_TIMESTAMP);

insert into employee(name, email, salary, city, last_update)
values ('mat', 'mat@mail.com', 70000, 'SBY', CURRENT_TIMESTAMP);

insert into employee(name, email, salary, city, last_update)
values ('sapii', 'sapii@mail.com', 60000, 'SBY', CURRENT_TIMESTAMP);

insert into employee(name, email, salary, city, last_update)
values ('deno', 'deno@mail.com', 90000, 'JKT', CURRENT_TIMESTAMP);
