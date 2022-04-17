```sql
SELECT *
FROM reservations
WHERE id = [:reservation_id]
AND canceled IS NULL
AND concat(date, ' ',time)::timestamp + interval '1 hour' < now()
```
