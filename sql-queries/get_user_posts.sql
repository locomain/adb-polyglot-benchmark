SELECT post.* FROM user u
LEFT JOIN post ON post.EMAIL = u.EMAIL
GROUP BY POST_ID