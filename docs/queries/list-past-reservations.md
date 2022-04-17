```sql
SELECT
r.id,
r.rated,
rat.rating,
restaurants.name as restaurant,
restaurants.id as restaurant_id,
to_char(r.date, 'dd') as day,
to_char(r.date, 'Month') as month,
to_char(r.time, 'HH24:MI AM') as time,
cast(avg(rat.rating) as decimal(10,1)) as avg_rating
FROM reservations r
INNER JOIN users u on u.id = r.client_id
INNER JOIN restaurants on restaurants.id = r.restaurant_id
LEFT JOIN ratings rat on r.id = rat.reservation_id
WHERE u.id = [:user_id]
AND r.canceled is null
AND concat(r.date,' ', r.time)::timestamp < now()
GROUP BY restaurants.id, r.id, r.date, r. time, rat.id
ORDER BY r.date, r.time;
```
