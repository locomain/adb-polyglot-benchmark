SELECT location.* FROM user u
   INNER JOIN (
       SELECT * FROM location l
       GROUP BY l.EMAIL
       ORDER BY DATE DESC
   ) location ON location.EMAIL = u.EMAIL
LIMIT 1000;