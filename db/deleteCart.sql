-- delete from cart_items where user_id =$1 and product_id = $2
delete from cart_items where product_id = $1 and quantity = $2

-- delete from cart_items where userid = $1;
-- select * from products
