package tgseminar.controller;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class UpdateController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		String idString = request.getParameter("id");
		if (idString == null || "".equals(idString)) {
			response.setStatus(400);
			return null;
		}
		
		int id;

		try {
			id = Integer.parseInt(idString);
		} catch(NumberFormatException e) {
			response.setStatus(400);
			return null;
		}
		
		String title = request.getParameter("title");
		if (title == null || "".equals(title)) {
			response.setStatus(400);
			return null;
		}
		return null;
	}

}
