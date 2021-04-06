CREATE USER   'proxyuser1'@'%'   IDENTIFIED WITH mysql_native_password BY 'user1';
CREATE USER   'proxyuser2'@'%'   IDENTIFIED WITH mysql_native_password BY 'user2';


REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'proxyuser1'@'%';
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'proxyuser2'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE ON romenext.* TO 'ROMENEXTPROXY'@'%';
GRANT PROXY ON 'ROMENEXTPROXY'@'%' TO 'proxyuser1'@'%';
GRANT PROXY ON 'ROMENEXTPROXY'@'%' TO 'proxyuser2'@'%';

