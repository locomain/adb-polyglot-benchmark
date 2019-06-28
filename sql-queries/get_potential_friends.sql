CREATE PROCEDURE getTop5PotentialFriends (my_email VARCHAR(255))
 BEGIN
   WITH friendslist as
   ((SELECT DISTINCT user_1_email as email,
             user_2_email as friend_email
     FROM users_friends)
    UNION
    (SELECT DISTINCT  user_2_email as email,
              user_1_email as friend
     FROM users_friends))
   SELECT m.email, f.friend_email, COUNT(*) as Mutual
   FROM friendslist m
   INNER JOIN friendslist f ON f.email = m.friend_email
   WHERE m.email = my_email
     AND NOT f.friend_email = m.email
     AND NOT f.friend_email = f.email
   GROUP BY m.email, f.friend_email
   ORDER BY Mutual DESC
   LIMIT 5;
 END;

CALL GetTop5PotentialFriends('A.Acosta@hotmail.com');
