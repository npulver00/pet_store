/*auth0 table */

create table if not exists users(
    id serial,
    name varchar(50) not null,
    email varchar(50) not null,
    picture text,
    auth0_id text
);