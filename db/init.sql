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
    category text
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

insert into products(name, price, image, species, category)
values('Authority Grain Free Adult Dog Food-Chicken & Pea', 10.99, 'https://s7d2.scene7.com/is/image/PetSmart/AuthorityPackagingUpdates_BrandShop_0002_5221181_5279180_DryDog?$PB1001$', 'Dog', 'dogfood' )

insert into products(name, price, image, species, category)
values('Natures Variety Instinct Grain Free Dog Food', 59.99, 'https://s7d2.scene7.com/is/image/PetSmart/5248197?$sclp-prd-main_large$', 'Dog', 'dogfood' )

insert into products(name, price, image, species, category)
values('BLUE Wilderness Adult Dog Food Grain Free, Natural Chicken', 17.99, 'https://s7d2.scene7.com/is/image/PetSmart/5149891?$sclp-prd-main_large$', 'Dog', 'dogfood' )

insert into products(name, price, image, species, category)
values('BLUE Wilderness Indoor Adult Cat Food Grain Free, Natural Chicken', 12.99, 'https://s7d2.scene7.com/is/image/PetSmart/5173159?$sclp-prd-main_large$', 'Cat', 'catfood' )

insert into products(name, price, image, species, category)
values('Authority Indoor Adult Cat Food Chicken & Rice', 11.99, 'https://s7d2.scene7.com/is/image/PetSmart/5279238?$sclp-prd-main_small$', 'Cat', 'catfood' )

insert into products(name, price, image, species, category)
values('Purina Beyond Natural Cat Food-Grain Free, Ocean Whitefish & Egg', 16.90, 'https://s7d2.scene7.com/is/image/PetSmart/5238111?$sclp-prd-main_small$', 'Cat', 'catfood' )


insert into products(name, price, image, species, category)
values('Top Paw Owl Flattie Dog Toy Crinkle', 3.99, 'https://s7d2.scene7.com/is/image/PetSmart/5285317?$sclp-prd-main_large$', 'Dog', 'dogtoys' )

insert into products(name, price, image, species, category)
values('Top Paw Owl Flattie Dog Toy Crinkle', 3.99, 'https://s7d2.scene7.com/is/image/PetSmart/5285317?$sclp-prd-main_large$', 'Dog', 'dogtoys' )

insert into products(name, price, image, species, category)
values('Top Paw Sloth Flattie Dog Toy Crinkle', 5.99, 'https://s7d2.scene7.com/is/image/PetSmart/5285320?$sclp-prd-main_large$', 'Dog', 'dogtoys' )

insert into products(name, price, image, species, category)
values('Petstages Tower of Tracks Cat Toy', 19.99, 'https://s7d2.scene7.com/is/image/PetSmart/5256989?$sclp-prd-main_small$', 'Cat', 'cattoys' )

insert into products(name, price, image, species, category)
values('Kong Refillables Beaver Cat Toy-Catnip', 2.69, 'https://s7d2.scene7.com/is/image/PetSmart/5151130?$sclp-prd-main_small$', 'Cat', 'cattoys' )

insert into products(name, price, image, species, category)
values('Great Choice Feather Tailed Mouse Teaser Cat Toy', 4.99, 'https://s7d2.scene7.com/is/image/PetSmart/5193711?$sclp-prd-main_small$', 'Cat', 'cattoys' )
;