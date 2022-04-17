```sql
SELECT
r.id, r.comment, r.rating,
to_char(r."createdAt", 'Mon dd, yyyy') as date,
client.name as client
FROM ratings r
INNER JOIN users client on client.id = r.client_id
WHERE r.restaurant_id = [:restaurant_id];
```
