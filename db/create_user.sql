insert into users (username, email, picture, auth0_id)
values($1,$2,$3,$4)
returning *;