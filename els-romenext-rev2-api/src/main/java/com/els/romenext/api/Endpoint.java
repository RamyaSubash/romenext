package com.els.romenext.api;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

//@Path("/Endpoint")
//@Consumes({ "application/json" })
//@Produces({ "application/json" })
@ApplicationPath("/")
public class Endpoint extends Application {
	
	private Set<Object> singletons = new HashSet<Object>();
	private Set<Class<?>> empty = new HashSet<Class<?>>();

	public Endpoint() {
		
//		singletons.add( new OnboardingStatus() );
//		singletons.add( new Tokens() );
//		singletons.add( new Membership() );
//		singletons.add( new Assets() );
//		singletons.add( new CredentialData() );
//		singletons.add( new DataForAddCard() );
//		singletons.add( new UpdateLoyaltyProduct() );
//		singletons.add( new SyncCardStore() );	
	}

	@Override
	public Set<Class<?>> getClasses() {
		return empty;
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
 
//    @GET
//    @Path("/books")
//    public Collection<Book> getBooks() {
//    ...
//    }
// 
//    @GET
//    @Path("/book/{isbn}")
//    public Book getBook(@PathParam("isbn") String id) {
//    ...
//    }
// 
//    @PUT
//    @Path("/book/{isbn}")
//    public Book addBook(@PathParam("isbn") String id, @QueryParam("title") String title) {
//    ...
//    }
// 
//    @POST
//    @Path("/book/{isbn}")
//    public Book updateBook(@PathParam("isbn") String id, String title) {
//    ...
//    }
// 
//    @DELETE
//    @Path("/book/{isbn}")
//    public Book removeBook(@PathParam("isbn") String id) {
//    ...
//    }
}