/*auth0 table */

create table if not exists users(
    id serial,
    username varchar(50) not null,
    email varchar(50) not null,
    picture text,
    auth0_id text unique
);


create table if not exists products(
    id serial,
    name varchar(80),
    price decimal,
    image text,
    species text,
    category text,
    feature text
)
create table if not exists shipping_address(
    id serial,
    auth0_id text,
    name text,
    address text,
    city text,
    state text,
    zip integer,
    primary_address boolean
)

create table if not exists cart_items(
    id serial,
    user_id text,
    product_id integer,
    quantity integer default 1,
    price decimal
)
select p.name, p.price, p.image, c.quantity, p.id as product_id, c.id as cart_id, p.price as price
from products p
join cart_items c
on c.product_id = p.id
join users u
on  u.auth0_id = c.user_id
where c.user_id = $1


