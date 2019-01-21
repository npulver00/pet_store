DO $$
DECLARE
   product_idd integer := $1;
   qty integer := (SELECT quantity FROM cart_items WHERE product_id = product_idd);
BEGIN
    IF qty <2 THEN
        DELETE FROM cart_items where product_id = product_idd;
    ELSE 
        UPDATE cart_items 
        SET quantity = (quantity -1),
         price = ROUND(((qty - 1) * price / qty), 2) 
         WHERE product_id = product_idd;
     
  END IF;
END $$;