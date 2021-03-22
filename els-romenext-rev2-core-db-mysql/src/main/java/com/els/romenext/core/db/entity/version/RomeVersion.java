package com.els.romenext.core.db.entity.version;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries ({
	@NamedQuery(name="RomeVersion.findByMajorMinorRev", query="SELECT ni FROM RomeVersion ni WHERE ni.major = :major and ni.minor = :minor and ni.rev = :rev"),
	@NamedQuery(name="RomeVersion.findLatestVersion", query="SELECT ni FROM RomeVersion ni order by ni.id DESC")
})

/**
 * Note that this should be expecting builds in the format
 * 
 * <MAJOR>.<MINOR>.<REV>.<TAG>.<BUILD>
 * 
 * Where <TAG> is optional, and can be a string
 * Where <BUILD> is optional, and is a number
 * 
 * @author jlee
 *
 */
@Entity
@Table(name = "els_romenext_version")
public class RomeVersion {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="major")
	private Long major;
	
	@Column(name="minor")
	private Long minor;
	
	@Column(name="rev")
	private Long rev;
	
	@Column(name="tag")
	private String tag;

	@Column(name="build")
	private Long build;
	
	@Column(name="latest_sql_file")
	private String latestSqlFile;
	
	@Column(name="changes")
	private String changes;
	
	@Column(name="description")
	private String description;
	
	@Column(name="created_date")
	private Date createdDate;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMajor() {
		return major;
	}

	public void setMajor(Long major) {
		this.major = major;
	}

	public Long getMinor() {
		return minor;
	}

	public void setMinor(Long minor) {
		this.minor = minor;
	}

	public Long getRev() {
		return rev;
	}

	public void setRev(Long rev) {
		this.rev = rev;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Long getBuild() {
		return build;
	}

	public void setBuild(Long build) {
		this.build = build;
	}

	public String getLatestSqlFile() {
		return latestSqlFile;
	}

	public void setLatestSqlFile(String latestSqlFile) {
		this.latestSqlFile = latestSqlFile;
	}

	public String getChanges() {
		return changes;
	}

	public void setChanges(String changes) {
		this.changes = changes;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	
	
}
