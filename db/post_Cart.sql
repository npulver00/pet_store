-- select * from products where id = $1; 





insert into cart_items(user_id, product_id)
values(${auth0_id}, ${product_id});

-- select * 
-- from products p
-- join cart_items c
-- on c.product_id = p.id
-- join users u
-- on  u.auth0_id = c.user_id