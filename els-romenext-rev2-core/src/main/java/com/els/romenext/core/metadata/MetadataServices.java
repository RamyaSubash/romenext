package com.els.romenext.core.metadata;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.MetadataRepoContainerDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.entity.metadata.TMetadata;
import com.els.romenext.core.entity.metadata.TRepo;

public class MetadataServices {

	public String namespace = null;
	
	public MetadataServices( String namespace ) {
		this.namespace = namespace;
	}
	
	public List<MetadataRepoContainer> getAllMetadataRepos() {
		
		MetadataRepoContainerDao dao = new MetadataRepoContainerDao( this.namespace );
		
		
		List<MetadataRepoContainer> all = dao.getAll();
		
//		dao.getEntityManagerUtil().closeEntityManager();
		
		return all;
		
	}
	
	public MetadataContainer getMetadataContainerById(Long id) {
		
		if (id == null) {
			return null;
		}
		
		MetadataContainerDao dao = new MetadataContainerDao( this.namespace );
		MetadataContainer metadataContainer = dao.get(id);
		
//		dao.getEntityManagerUtil().closeEntityManager();
		
		return metadataContainer;
		
	}
	
	public MetadataRepoContainer getMetadataRepoContainerById(Long id) {
		
		MetadataRepoContainerDao dao = new MetadataRepoContainerDao( this.namespace );
		
		MetadataRepoContainer metadataRepoContainer = dao.get(id);
		
//		dao.getEntityManagerUtil().closeEntityManager();
		
		return metadataRepoContainer;
	}
	
	public MetadataRepoContainer getMetadataRepoContainerByName(String name) {
		
		MetadataRepoContainerDao dao = new MetadataRepoContainerDao();
		
		List<MetadataRepoContainer> result = dao.findByName(name);
		
		if (result == null || result.size() != 1) {
			return null;
		}
		
		return result.get(0);
	}
	
	public List<TMetadata> getAllMetadata() {
		
		MetadataContainerDao cdao = new MetadataContainerDao();
		MetadataRepoContainerDao dao = new MetadataRepoContainerDao();
		
		
		List<MetadataContainer> metadatas = cdao.getAll();
		List<MetadataRepoContainer> repos = dao.getAll();
		
		
		
		Map<Long, TMetadata> map = new HashMap<Long, TMetadata>();
		
		
		for( MetadataContainer c : metadatas ) {
			TMetadata tempMeta = new TMetadata();
			tempMeta.id = c.getId();
			tempMeta.name = c.getName();
			tempMeta.repos = new ArrayList<TRepo>();
			
			map.put(tempMeta.id,  tempMeta );
		}
		
		for( MetadataRepoContainer r : repos ) {
			TRepo newRepo  = new TRepo();
			
			newRepo.id = r.getId();
			newRepo.name = r.getName();
			
			TMetadata metadata = map.get( r.getMetadata().getId() );			
			metadata.repos.add( newRepo );
			map.put( r.getMetadata().getId(),  metadata );
				
		}
		
//		cdao.getEntityManagerUtil().closeEntityManager();
//		dao.getEntityManagerUtil().closeEntityManager();
		
		return new ArrayList<TMetadata>( map.values() );
	}
	
	public MetadataContainer createNewMetadata( String name ) {
		
		if (StringUtils.isBlank(name)) {
			return null;
		}
		
		MetadataContainerDao cdao = new MetadataContainerDao();
		
		MetadataContainer c = new MetadataContainer();
		
		c.setName( name );
		
		cdao.getTransaction().begin();
		cdao.insert( c );
		cdao.getTransaction().commit();
		
		cdao.getEntityManagerUtil().getSession().refresh( c );
		
//		cdao.getEntityManagerUtil().closeEntityManager();
		
		return c;
		
		
	}
	
	public MetadataRepoContainer createNewMetadataRepository(String name, MetadataContainer metadata, String ip, String username, String password) {
		
		if (StringUtils.isBlank(name) || metadata == null || StringUtils.isBlank(ip) || StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
			return null;
		}
	
		MetadataRepoContainerDao mrdao = new MetadataRepoContainerDao();
		MetadataRepoContainer repo = new MetadataRepoContainer();
		
		repo.setName(name);
		repo.setMetadata(metadata);
		repo.setIp(ip);
		repo.setUsername(username);
		repo.setPassword(password);
		Date currentDate = new Date();
		repo.setCreatedDate(currentDate);
		repo.setModifiedDate(currentDate);
		
		try {
			mrdao.getTransaction().begin();
			mrdao.insert(repo);
			mrdao.getTransaction().commit();
		} catch (Exception e) {
			mrdao.getTransaction().rollback();
			return null;
		}
				
		mrdao.getEntityManagerUtil().getSession().refresh(repo);
//		mrdao.getEntityManagerUtil().closeEntityManager();
		
		return repo;
		
	}
	
	public MetadataRepoContainer createNewMetadataRepository( Long metadataid, String name ) {
		
		if( metadataid <= 0 ) {
			return null;
		}
		
		MetadataRepoContainerDao rdao = new MetadataRepoContainerDao();
		MetadataContainerDao cdao = new MetadataContainerDao();
		
		MetadataContainer metadata = cdao.get( metadataid );
		
		if( metadata == null ) {
			return null;
		}
		
		MetadataRepoContainer r = new MetadataRepoContainer();
		
		r.setMetadata( metadata );
		r.setName( name );
		
		rdao.getTransaction().begin();
		rdao.insert( r );
		rdao.getTransaction().commit();
		
		rdao.getEntityManagerUtil().getSession().refresh( r );
		
//		rdao.getEntityManagerUtil().closeEntityManager();
//		cdao.getEntityManagerUtil().closeEntityManager();
		
		return r;
	}

    public TMetadata getMetadataByToken (String token) {
    	
    	if (StringUtils.isEmpty(token)) {
    		return null;
    	}
    	
		MetadataContainerDao dao = new MetadataContainerDao();
		List<MetadataContainer> metadatas = dao.findByToken(token);
		if (metadatas == null | metadatas.size() != 1) {
			return null;
		}
		MetadataContainer metadata = metadatas.get(0);	
//		dao.getEntityManagerUtil().closeEntityManager();
		
		TMetadata md = new TMetadata();
		md.id = metadata.getId();
		md.name = metadata.getName();

		// TODO: Get all repos with the metadata
		
		return md;
    	
    }
    
	public List<MetadataRepoContainer> getReposByMetadata( MetadataContainer metadata ) {
		
		if(metadata == null) {
			return null;
		}
		
		MetadataRepoContainerDao rDao = new MetadataRepoContainerDao();
		return rDao.findByMetadataContainer(metadata);
		
	}
	
}
