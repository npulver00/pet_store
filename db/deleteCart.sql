-- delete from cart_items where user_id =$1 and product_id = $2
-- delete from cart_items where product_id = $1 

-- delete from cart_items where userid = $1;
-- select * from products

-- update cart_items set quantity = (
--  case when quantity >1
--  then(quantity - 1)
--  else 1 end 
-- ) where product_id = 2

DO $$
DECLARE
   product_idd integer := $1;
   qty integer := (SELECT quantity FROM cart_items WHERE product_id = product_idd);
BEGIN
    IF qty <2 THEN
        DELETE FROM cart_items where product_id = product_idd;
    ELSE 
        UPDATE cart_items SET quantity = (quantity -1)
         WHERE product_id = product_idd;
  END IF;
END $$;