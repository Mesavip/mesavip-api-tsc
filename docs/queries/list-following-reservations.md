```sql
SELECT
r.id,
r.canceled,
restaurants.name as restaurant,
restaurants.id as restaurant_id,
to_char(r.date, 'dd') as day,
to_char(r.date, 'Month') as month,
to_char(r.time, 'HH24:MI AM') as time,
concat_ws(' - ',a.cidade, a.estado) as city,
concat_ws(', ', a.logradouro, a.numero, a.complemento) as address,
cast(avg(rat.rating) as decimal(10,1)) as avg_rating
FROM reservations r
INNER JOIN users u on u.id = r.client_id
INNER JOIN restaurants on restaurants.id = r.restaurant_id
INNER JOIN addresses a on restaurants.id = a.restaurant_id
INNER JOIN ratings rat on restaurants.id = rat.restaurant_id
WHERE u.id = [:user_id]
AND concat(r.date,' ', r.time)::timestamp > now()
GROUP BY restaurants.id, r.id, a.id, r.date, r. time
ORDER BY r.date, r.time;
```
