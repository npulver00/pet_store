insert into shipping_address(auth0_id,  address, city, state, zip, name, primary_address)
values(${auth0_id}, ${address}, ${city}, ${state}, ${zip},${name}, ${primary_address})
returning *;