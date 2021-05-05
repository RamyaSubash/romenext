FROM jboss/wildfly

RUN mkdir -p /opt/jboss/els/romenext/img/cache
RUN mkdir -p /opt/jboss/els/romenext/admin/server
RUN mkdir -p /opt/jboss/els/romenext/admin/accounts
RUN mkdir -p /opt/jboss/els/romenext/admin/servers

COPY --chown=jboss:root ACCOUNTS.sec /opt/jboss/els/romenext/admin/accounts/
COPY --chown=jboss:root SERVER.sec /opt/jboss/els/romenext/admin/servers
RUN stat /opt/jboss/els/romenext/admin/accounts/ACCOUNTS.sec
RUN stat /opt/jboss/els/romenext/admin/servers/SERVER.sec
ADD els-romenext-rev2-api-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/
ADD els-romenext-rev3-web-admin-portal-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/
ADD els-romenext-rev3-web-portal-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/


CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
