```sql
SELECT rating, comment, to_char("createdAt", 'DD/MM/YYYY') as date
FROM ratings
WHERE reservation_id = [:reservation_id]
```
