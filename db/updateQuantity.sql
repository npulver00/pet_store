-- update cart_items set quantity = $1 where id = $2

update cart_items set quantity = $1, price = $2 where id = $3

returning *;
