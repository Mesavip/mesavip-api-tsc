```sql
SELECT to_char(h.hour, 'HH24:MI') as hour
FROM hours h
WHERE h.hour NOT IN
(
    SELECT r.time
    FROM reservations r
    INNER JOIN restaurants on r.restaurant_id = restaurants.id
    WHERE r.restaurant_id = [:restaurant_id]
    AND r.date = '2021-06-21'
    GROUP BY r.time, restaurants.tables_amount
    HAVING count(r.time) = restaurants.tables_amount
)
AND h.hour > now()::time
AND h.hour >= [:opening_hour]
AND h.hour <= [:closing_hour]
ORDER BY h.hour;
```
