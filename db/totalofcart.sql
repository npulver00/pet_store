-- select sum(price) from cart_items

-- select sum(price * 1.09) from cart_items

select sum(round((price * 1.07), 2)) from cart_items