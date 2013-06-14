package tgseminar.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;

import org.junit.Test;
import org.slim3.datastore.Datastore;
import org.slim3.tester.ControllerTestCase;
import org.slim3.tester.TestEnvironment;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.apphosting.api.ApiProxy;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

public class UpdateControllerTest extends ControllerTestCase {
	
	@Test
	public void respond400IfIdNotSpecified() throws NullPointerException, IllegalArgumentException, IOException, ServletException {
//		tester.param("id", "1");
		tester.param("title", "To-Do #1");
		tester.start("/Update");
		
		// assert response from server is 400
		assertThat(tester.response.getStatus(), is(400));
	}
	
	@Test
	public void respons400IfIdNotNumericValue() throws NullPointerException, IllegalArgumentException, IOException, ServletException {
		tester.param("id", 1);
		tester.start("/Update");
		tester.param("title", "To-Do #1");
		
		assertThat(tester.response.getStatus(), is(400));
	}
	
	@Test
	public void response400IfTitleIsBlank() throws NullPointerException, IllegalArgumentException, IOException, ServletException {
		tester.param("id", 1);
		tester.start("/Update");
//		tester.param("title", "");
		
		assertThat(tester.response.getStatus(), is(400));
	}
	
	@Test
	public void respons404IfEntityIsNotExist() throws NullPointerException, IllegalArgumentException, IOException, ServletException {
		tester.param("id", 3);
		tester.param("title", "To-Do 3 modified");
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(), is(404));
	}
	
	@Test
	public void response403IfLoggedInUserIsDifferent() throws NullPointerException, IllegalArgumentException, IOException, ServletException {
		tester.param("id", "2");
		tester.param("title", "To-Do 2 modified");		
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(), is(403));
	}
	
	@Test
	public void response200IfUpdateCorrectly() throws NullPointerException, IllegalArgumentException, IOException, ServletException {
		String modifiedTitle = "To-Do 1 modified";
		
		tester.param("id", "1");
		tester.param("title", "To-Do 1 modified");		
		tester.start("/Update");
		
		Key key = Datastore.createKey("ToDo", 1);
		Entity entity = Datastore.get(key);
		assertThat((String)entity.getProperty("title"), is(modifiedTitle));
//		assertThat(tester.response.getStatus(), is(200));
	}
	
	@Test
	public void Test200 () throws NullPointerException, IllegalArgumentException, IOException, ServletException {
		
		tester.param("id", "1");
		tester.param("title", "To-Do 1 modified");		
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(), is(200));
	}

	@Override
	public void setUp() throws Exception {
	
		super.setUp();
		
		TestEnvironment environment = (TestEnvironment) ApiProxy.getCurrentEnvironment();
		environment.setEmail("loginuser@example.com");
		
		Entity entity1 = new Entity(Datastore.createKey("ToDo", 1));
		entity1.setProperty("title", "To-Do #1");
		entity1.setProperty("createdBy", "loginuser@example.com");
		entity1.setProperty("cretedAt", new Date());
		
		Entity entity2 = new Entity(Datastore.createKey("ToDo", 2));
		entity2.setProperty("title", "To-Do #2");
		entity2.setProperty("createdBy", "loginuser2@example.com");
		entity2.setProperty("cretedAt", new Date());
		
		Datastore.put(entity1, entity2);
		
	}
	
	

}
