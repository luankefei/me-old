
use mysql;
CREATE USER sunken IDENTIFIED BY '1q@W3e$R';
GRANT ALL privileges on *.* to sunken;
flush privileges;
SELECT host, user from user;

CREATE DATABASE me;
use me;
