```sql
SELECT
r.id,
cast(avg(rat.rating) as decimal(10,1)) as avg_rating,
count(rat.rating) as total_reviews
FROM restaurants r
INNER JOIN addresses a on r.id = a.restaurant_id
INNER JOIN files f on r.id = f.restaurant_id
LEFT JOIN ratings rat on r.id = rat.restaurant_id
WHERE f.type = 'list'
AND (
        select
        cast(avg(rat.rating) as decimal(10,1)) as avg_rating
        from restaurants res
        left join ratings rat on r.id = rat.restaurant_id
        where res.id = r.id
        group by r.id
    ) > 2.8
GROUP BY r.id, f.id, a.id
ORDER BY avg_rating desc;
```
