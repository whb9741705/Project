package servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import entity.RemoteAvs;
import services.RemoteAvsdao;
import utils.JsonUtil;

@WebServlet("/RemoteAvs")
public class RemoteAvsServlet extends HttpServlet {

	/**
	 * 
	 */
	 private static final long serialVersionUID = 1L;
	 public RemoteAvsServlet () {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// TODO Auto-generated method stub
		RemoteAvsdao remoteAvsdao=new RemoteAvsdao();
		String terminalNum = req.getParameter("terminalNum");
		List<RemoteAvs> list=remoteAvsdao.GetAvsData(terminalNum);
		int total  = list.size();
		JSONObject object = JsonUtil.toJsonString(total, list);
		String str = object.toString();
		list = null;
		object = null;
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(str);
		resp.getWriter().flush();
		resp.getWriter().close();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}
	
	

}
