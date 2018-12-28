insert into products(image, name, price)
values(${image}, ${name}, ${price})
returning *;