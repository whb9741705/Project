package servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import entity.RemoteCSM;
import services.RemoteCSMdao;
import utils.JsonUtil;

@WebServlet("/RemoteCSM")
public class RemoteCSMServlet extends HttpServlet {

	/**
	 * 
	 */
	 private static final long serialVersionUID = 1L;
	 public RemoteCSMServlet () {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// TODO Auto-generated method stub
		RemoteCSMdao remoteChanneldao=new RemoteCSMdao();
		String tns = req.getParameter("tns");
		String channel=req.getParameter("channel");List<RemoteCSM> list;
		if(channel.equals("?"))
		{list=remoteChanneldao.GetChannelall(tns);
		//System.out.print("aaaa"+str);
		}
		else {
		list=remoteChanneldao.GetCSMData(tns,channel);}
		int total  = list.size();
		JSONObject object = JsonUtil.toJsonString(total, list);
		String str = object.toString();
		//System.out.print("aaaa"+str);
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
