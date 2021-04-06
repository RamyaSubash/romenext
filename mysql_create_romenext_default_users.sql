create user 'ROMENEXTADM'@'localhost' identified with mysql_native_password by 'supermanADM';
create user 'ROMENEXTADM'@'%' identified with mysql_native_password by 'supermanADM';

grant all privileges on *.* to 'ROMENEXTADM'@'localhost' WITH GRANT OPTION;
grant all privileges on *.* to 'ROMENEXTADM'@'%'WITH GRANT OPTION;

grant proxy on ''@'' to 'ROMENEXTADM'@'localhost' with grant option;
grant proxy on ''@'' to 'ROMENEXTADM'@'%' with grant option;


CREATE USER 'ROMENEXTAdmin'@'%' IDENTIFIED BY 'supermanAdmin';
GRANT ALL PRIVILEGES ON *.* TO 'ROMENEXTAdmin'@'%' WITH GRANT OPTION;

CREATE USER 'ROMENEXTConfig'@'%' IDENTIFIED BY 'supermanConfig';
GRANT ALL PRIVILEGES ON *.* TO 'ROMENEXTConfig'@'%' WITH GRANT OPTION;

CREATE USER 'ROMENEXTR'@'%' IDENTIFIED BY 'supermanRead'; 
GRANT SELECT ON *.* TO 'ROMENEXTR'@'%';

CREATE USER 'ROMENEXTRW'@'%' IDENTIFIED BY 'supermanRW';
GRANT SELECT, INSERT ON *.* TO 'ROMENEXTRW'@'%';

CREATE USER 'ROMENEXTRWU'@'%' IDENTIFIED BY 'supermanRWU';
GRANT SELECT, INSERT, UPDATE ON *.* TO 'ROMENEXTRWU'@'%';

CREATE USER 'ROMENEXTRWUX'@'%' IDENTIFIED BY 'supermanRWUX';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'ROMENEXTRWUX'@'%';

CREATE USER 'ROMENEXTPROXY'@'%' IDENTIFIED BY 'supermanproxy';  
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'ROMENEXTPROXY'@'%';






