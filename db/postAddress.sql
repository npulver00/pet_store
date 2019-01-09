insert into shipping_address(auth0_id,  address, city, state, zip, name)
values(${auth0_id}, ${address}, ${city}, ${state}, ${zip},${name})
returning *;