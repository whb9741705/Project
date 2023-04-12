package servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.JsonUtil;
import com.alibaba.fastjson.JSONObject;

import entity.Remote;
import services.RemoteBasic;


@WebServlet("/RemoteBasic")
public class RemoteBasicServlet extends HttpServlet {

	/**
	 * 
	 */
	 private static final long serialVersionUID = 1L;
	 public RemoteBasicServlet () {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// TODO Auto-generated method stub
		RemoteBasic remoteBasic=new RemoteBasic();
		String tns = req.getParameter("tns");
		String user = req.getParameter("user");
		List<Remote> list;
		if(tns == null) {
			list=remoteBasic.GetAllData(user);
		}
		else {
			list=remoteBasic.GetNodeData(tns);
		}
		int total  = list.size();
		JSONObject object = JsonUtil.toJsonString(total, list);
		String str = object.toString();
		list = null;
		object = null;
		//System.out.print("bbb"+str);
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
