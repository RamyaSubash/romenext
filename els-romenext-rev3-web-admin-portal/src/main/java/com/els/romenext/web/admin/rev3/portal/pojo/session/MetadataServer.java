package com.els.romenext.web.admin.rev3.portal.pojo.session;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.general.date.RomeNextDateUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;

public class MetadataServer {

	private Integer index;	
	private String boxname;		
	private String schema;
	
	private MetadataServerSchema schemaObject;	// this will load shema version information 
	
	private String username;
	private String pw;	
	private String ip;
	private int port;
	
	private String localFile;
	
	private boolean connectable = false;
	private boolean schemaConnectable = false;
	private boolean repoConnectable = false;
	
	
	private Map<MetadataServerStatusEnum, Object> status;
	
	private String dbType;
	private String dbVersion;
	private String os;
	private long uptime;
	private String innodb;
	
	public String getInnodb() {
		return innodb;
	}

	public void setInnodb(String innodb) {
		this.innodb = innodb;
	}

	private Date lastUsed = null;
	
//	private List<MysqlMetadataServer> metadatas = new ArrayList<>();
	private Map<Long, MysqlMetadataServer> metadata = new HashMap<>();
	 
	// store the metadata server groups that were found
	private Map<BaseGroupEnum, Boolean> baseGroups;
	

	private String oldHash;
	
	public static MetadataServer build( JSONObject json ) {
		
		if( json == null ) {
			return null;
		}
		
		MetadataServer s = new MetadataServer();
		
		if( json.has("boxname") ) {
			s.setBoxname( json.getString("boxname"));
		}
		
		if( json.has("schema") ) {
			s.setSchema( json.getString("schema"));
			
			MetadataServerSchema schema = new MetadataServerSchema();
			schema.setName( json.getString("schema"));
			s.setSchemaObject( schema );
			
		}
		if( json.has("username") ) {
			s.setUsername( json.getString("username"));
		}
		if( json.has("ip") ) {
			s.setIp( json.getString("ip"));
		}
		if( json.has("port") ) {
			s.setPort( json.getInt("port"));
		}
		if( json.has("dbType") ) {
			s.setDbType( json.getString("dbType"));
		}
		if( json.has("dbVersion") ) {
			s.setDbVersion( json.getString("dbVersion"));
		}
		if( json.has("os") ) {
			s.setOs( json.getString("os"));
		}
		if( json.has("pw")) {
			s.setPw( json.getString("pw") );
		}
		
		if( json.has("innodb")) {
			s.setInnodb(json.getString("innodb") );
		}
		s.setOldHash( s.getHash() );
		
		
		if( json.has("lastUsed") ) {
			String dateString = json.getString( "lastUsed" );
			
			if( dateString != null ) {
				Date formatDate_long = RomeNextDateUtils.formatDate_long( dateString );
				
				s.setLastUsed( formatDate_long );
			}
		}
		
		return s;
		
	}
	
	public JSONObject buildJson() {
		JSONObject json = new JSONObject();
		
		json.put("boxname", this.getBoxname() );
		json.put("schema", this.getSchema() );
		json.put("username", this.getUsername() );
		json.put("ip", this.getIp() );
		json.put("port", this.getPort() );
		json.put("dbType", this.getDbType() );
		json.put("dbVersion", this.getDbVersion() );
		json.put("os", this.getOs() );
		json.put("pw",  this.getPw() );
		json.put("innodb", this.getInnodb());
		
		if( this.getLastUsed() != null ) {
			
			Date lastUsed2 = this.getLastUsed();
			
			String date = RomeNextDateUtils.formatToRomeDate_long( lastUsed2 );
			
			json.put("lastUsed",  date );			
		}
		
		return json;
	}

	public MetadataServer() {
		
		// init the status
		this.status = new HashMap<>();
		
		for( MetadataServerStatusEnum e : MetadataServerStatusEnum.values() ) {
			this.status.put( e,  false );	
		} 

	}
	
	
	
	
	public Date getLastUsed() {
		return lastUsed;
	}

	public void setLastUsed(Date lastUsed) {
		this.lastUsed = lastUsed;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getLocalFile() {
		return localFile;
	}

	public void setLocalFile(String localFile) {
		this.localFile = localFile;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getBoxname() {
		return boxname;
	}

	public void setBoxname(String boxname) {
		this.boxname = boxname;
	}
 			
	public boolean isConnectable() {
		return connectable;
	}

	public void setConnectable(boolean connectable) {
		this.connectable = connectable;
	}

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}
			
	public String getSchema() {
		return schema;
	}

	public void setSchema(String schema) {
		this.schema = schema;
	}
			
	public String getHash() {
		
//		return DigestUtils.md5Hex( this.getBoxname() + this.getIp() + Integer.toString( this.getPort() )  + this.getUsername() + this.getSchema());
//		return DigestUtils.md5Hex( this.getIp() + Integer.toString( this.getPort() )  + this.getUsername() + this.getSchema());
		return DigestUtils.md5Hex( this.getIp() + Integer.toString( this.getPort() ) );
	}
	
    public String getNewHash() {
		return DigestUtils.md5Hex( this.getIp() + Integer.toString( this.getPort() ) );
		
	}
	
	
	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public String getDbVersion() {
		return dbVersion;
	}

	public void setDbVersion(String dbVersion) {
		this.dbVersion = dbVersion;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}
		
	public long getUptime() {
		return uptime;
	}

	public void setUptime(long uptime) {
		this.uptime = uptime;
	}
	
	public String getUptimeInMinutes() {
		if( this.uptime > 0 ) {
			Long u = Long.valueOf( uptime / 60 );
			
			return u.toString();
		}
		return "n/a";
	}
	
	public String getUptimeInHours() {
		if( this.uptime > 0 ) {
			Long u = Long.valueOf( uptime / 60 / 60  );
			
			return u.toString();
		}
		return "n/a";
	} 
	
	public String getOldHash() {
		return oldHash;
	}

	public void setOldHash(String oldHash) {
		this.oldHash = oldHash;
	}
	
	public String getCondensedInfo() {
		if( StringUtils.isNotEmpty( dbType ) ) {
			
			return this.getDbType() + ":" + this.getDbVersion();			
		}
		
		return "UNKNOWN";
	}
	
	
	public boolean isRepoConnectable() {
		return repoConnectable;
	}

	public void setRepoConnectable(boolean repoConnectable) {
		this.repoConnectable = repoConnectable;
	}
	

	public boolean isSchemaConnectable() {
		return schemaConnectable;
	}

	public void setSchemaConnectable(boolean schemaConnectable) {
		this.schemaConnectable = schemaConnectable;
	}
			
	public Map<Long, MysqlMetadataServer> getMetadata() {
		return metadata;
	}

	public void setMetadata(Map<Long, MysqlMetadataServer> metadata) {
		this.metadata = metadata;
	}

	public void addMetadata( MysqlMetadataServer metadata ) {
		
		if( this.getMetadata() == null ) {
			this.setMetadata( new HashMap<>() );
		}
		Map<Long,MysqlMetadataServer> cur = this.getMetadata();
		cur.put( metadata.getId(), metadata );
		this.setMetadata( cur );
	}
	
	
	
	public void addRepo( MysqlRepositoryServer repo ) {
		
		if( repo.getMetadataId() == null ) {
			return;
		}
		
		if( this.getMetadata() == null ) {
			this.setMetadata( new HashMap<>() );
		}
		Map<Long,MysqlMetadataServer> cur = this.getMetadata();
		
		MysqlMetadataServer toAssign = cur.get(repo.getMetadataId() );
		
		if( toAssign == null ) {
			return;
		}
		
		toAssign.addRepo( repo );
		
		cur.put( repo.getMetadataId(), toAssign);
		
		this.setMetadata( cur );
	}
	
	

	public Map<MetadataServerStatusEnum, Object> getStatus() {
		return status;
	}

	public void setStatus(Map<MetadataServerStatusEnum, Object> status) {
		this.status = status;
	}
	
	public void setStatus( MetadataServerStatusEnum s, Object value ) {
		
		if( this.status == null ) {
			status = new HashMap<>();
		}
		
		status.put( s,  value );
	}
	
	
	public MetadataServerSchema getSchemaObject() {
		return schemaObject;
	}

	public void setSchemaObject(MetadataServerSchema schemaObject) {
		this.schemaObject = schemaObject;
	}

	public Map<BaseGroupEnum, Boolean> getBaseGroups() {
		return baseGroups;
	}

	public void setBaseGroups(Map<BaseGroupEnum, Boolean> baseGroups) {
		this.baseGroups = baseGroups;
	}
	
	public void setBaseGroups( BaseGroupEnum e, Boolean value ) {
		if( this.baseGroups == null ) {
			this.baseGroups = new HashMap<>();
		}
		
		this.baseGroups.put( e,  value );
	}
	
	public boolean getGroupStatus() {
		if( this.baseGroups == null ) {
			return false;
		}
		
		for( Boolean b : this.baseGroups.values() ) {
			if( !b ) {
				return false;
			}
		}
		
		return true;
	}

	@Override
	public String toString() {
		return "MetadataServer [index=" + index + ", boxname=" + boxname + ", schema=" + schema + ", username="
				+ username + ", pw=" + pw + ", ip=" + ip + ", port=" + port + ", localFile=" + localFile
				+ ", connectable=" + connectable + ", dbType=" + dbType + ", dbVersion=" + dbVersion + ",innodb = "+innodb +", os=" + os
				+ ", uptime=" + getUptimeInMinutes() + "uptime Hours=" + getUptimeInHours() + "metadata= "+ metadata  +"]";
	}
	
	
}
