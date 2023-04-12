package servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import entity.RemoteChannel;
import services.RemoteChanneldao;
import utils.JsonUtil;

@WebServlet("/RemoteChannel")
public class RemoteChannelServlet extends HttpServlet {

	/**
	 * 
	 */
	 private static final long serialVersionUID = 1L;
	 public RemoteChannelServlet () {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// TODO Auto-generated method stub
		RemoteChanneldao remoteChanneldao=new RemoteChanneldao();
		String tns = req.getParameter("tns");String str;
		String channel=req.getParameter("channel");List<RemoteChannel> list;
		//System.out.print(channel);
		if(channel.equals("?"))
		{list=remoteChanneldao.GetChannelall(tns);
		//System.out.print("aaaa"+str);
		}
		else {
			list=remoteChanneldao.GetChannelData(tns,channel);}
		int total  = list.size();
		JSONObject object = JsonUtil.toJsonString(total, list);
		str = object.toString();
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
