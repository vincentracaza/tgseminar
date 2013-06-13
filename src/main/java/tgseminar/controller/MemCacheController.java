package tgseminar.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;
import org.slim3.repackaged.org.json.JSONObject;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.memcache.Expiration;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class MemCacheController extends Controller{

	@Override
	protected Navigation run() throws Exception {
		User user = UserServiceFactory.getUserService().getCurrentUser();
		String createdBy = user.getEmail();
		
		List<Entity> entities = Memcache.get(createdBy);
		
		if (entities == null) {
			entities = Datastore.query("ToDo").filter("createdBy", FilterOperator.EQUAL, createdBy).sort("createdAt", SortDirection.DESCENDING).asList();
		} else {
			System.out.println("Hit!");
		}
		
		List<Map<String, Object>> listOfEntityMap = 
				new ArrayList<Map<String, Object>>();

		for (Entity result: entities) {
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			map.put("id", result.getKey().getId());
			map.put("createdBy", result.getProperty("createdBy"));
			map.put("createdAt",result.getProperty("createdAt"));
			
			listOfEntityMap.add(map);
		}
		
		entities = Datastore.query("ToDo").filter("createdBy", FilterOperator.EQUAL, createdBy).sort("createdAt", SortDirection.DESCENDING).asList();
		Memcache.put(createdBy, entities, Expiration.byDeltaSeconds(60));
		
		String json = JSONObject.valueToString(listOfEntityMap);
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		response.getWriter().println(json);
		response.flushBuffer();
		return null;
	}

}
