```sql
SELECT
r.name, r.about, r.phone, r.site,
r.culinary,
json_build_object('bairro', a.bairro, 'cidade', a.cidade, 'estado', a.estado, 'cep', a.cep, 'logradouro', a.logradouro, 'numero', a.numero, 'complemento', a.complemento) as address,
concat_ws(' - ', to_char(r.opening_hour, 'HH24:MI'), to_char(r.closing_hour, 'HH24:MI')) as operation_hours,
cast(avg(rat.rating) as decimal(10,1)) as avg_rating,
count(rat.rating) as total_reviews
FROM restaurants r
INNER JOIN addresses a on r.id = a.restaurant_id
INNER JOIN ratings rat on r.id = rat.restaurant_id
WHERE r.id = [ :restaurant_id ]
GROUP BY r.id, a.id;
```
