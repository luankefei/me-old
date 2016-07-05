show tables;
DROP TABLE m_user;
DROP TABLE m_article;
DROP TABLE m_comment;
DROP TABLE m_resource;

CREATE TABLE m_user (
  id tinyint NOT NULL AUTO_INCREMENT,
  username varchar(32),
  password varchar(32),
  nick varchar(40),
  avatar varchar(256),
  intro varchar(140),
  state tinyint,
  last_login_time datetime,
  register_time datetime,
  remark varchar(40),
  PRIMARY KEY (id)
);

CREATE TABLE m_article (
  id smallint NOT NULL AUTO_INCREMENT,
  user_id tinyint,
  content text,
  last_modify_time datetime,
  publish_time datetime,
  type varchar(20),
  tag varchar(40),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES m_user(id)
);

CREATE TABLE m_comment (
  id int NOT NULL AUTO_INCREMENT,
  user_id tinyint,
  article_id smallint,
  last_modify_time datetime,
  publish_time datetime,
  content text,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES m_user(id),
  FOREIGN KEY (article_id) REFERENCES m_article(id)
);

CREATE TABLE m_resource (
  id smallint NOT NULL AUTO_INCREMENT,
  user_id tinyint,
  article_id smallint,
  upload_time datetime,
  url varchar(256),
  type varchar(20),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES m_user(id),
  FOREIGN KEY (article_id) REFERENCES m_article(id)
);
