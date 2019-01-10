select p.name, p.price, p.image, c.quantity, p.id as product_id, c.id as cart_id
from products p
join cart_items c
on c.product_id = p.id
join users u
on  u.auth0_id = c.user_id
where c.user_id = $1