package tgseminar.controller;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;

public class DeleteController extends Controller{

	@Override
	protected Navigation run() throws Exception {
		
		String id = request.getParameter("id");
		
		if(id == null || "".equals("id")) {
			response.setStatus(400);
			return null;
		}
		
		Key key = Datastore.createKey("ToDo", Integer.parseInt(id));
		Datastore.delete(key);
		
		return null;
	}

}
