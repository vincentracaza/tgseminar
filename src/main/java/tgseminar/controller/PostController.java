package tgseminar.controller;

import java.util.Date;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class PostController extends Controller{

	@Override
	protected Navigation run() throws Exception {
		String title = super.request.getParameter("title");
		if (title == null || "".equals(title)) {
			super.response.setStatus(400);
			return null;
		}
		
		User user = UserServiceFactory.getUserService().getCurrentUser();
		String createdBy = user.getEmail();
		
		Date createdAt = new Date();
		
		Entity entity = new Entity("ToDo");
		entity.setProperty("title", title);
		entity.setProperty("createdBy", createdBy);
		entity.setProperty("createdAt", createdAt);
		
		Datastore.put(entity);
		
		super.response.setStatus(201);
		
		return null;
	}

}
