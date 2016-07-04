create table m_user (
  id tinyint,
  username varchar(32),
  password varchar(32),
  nick varchar(40),
  avatar varchar(256),
  intro varchar(140),
  state tinyint,
  last_login_time datetime,
  register_time datetime,
  remark varchar(40)
)

create table m_article (
  id smallint,
  user_id tinyint,
  content text,
  last_modify_time datetime,
  publish_time datetime,
  type varchar(20),
  tag varchar(40)
)

create table m_comment (
  id int,
  user_id tinyint,
  article_id smallint,
  last_modify_time datetime,
  publish_time datetime,
  content text
)

create table m_resource (
  id smallint,
  user_id tinyint,
  article_id smallint,
  upload_time datetime,
  url varchar(256),
  type varchar(20)
)


