SELECT * FROM post
LEFT JOIN comment c on post.POST_ID = c.POST_ID
LEFT JOIN comment_likes cl on c.EMAIL = cl.COM_EMAIL and c.COMMENT_ID = cl.COMMENT_ID