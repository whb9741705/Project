package servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import entity.RemoteVoltage;
import services.RemoteVoltagedao;
import utils.JsonUtil;

@WebServlet("/RemoteVoltage")
public class RemoteVoltageServlet extends HttpServlet {

	/**
	 * 
	 */
	 private static final long serialVersionUID = 1L;
	 public RemoteVoltageServlet () {
	        super();
	        // TODO Auto-generated constructor stub
	    }
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// TODO Auto-generated method stub
		RemoteVoltagedao remoteVoltagedao=new RemoteVoltagedao();
		String tns = req.getParameter("tns");
		String starttime = req.getParameter("st");
		String endtime = req.getParameter("et");
		String user = req.getParameter("user");
		List<List<Object>> list=remoteVoltagedao.GetVoltageData(tns,starttime,endtime);
	    JSONObject jsonResult = new JSONObject(); 
	    jsonResult.put("type","voltage");
	    jsonResult.put("name","电量");
	    jsonResult.put("data",list);
	    resp.setCharacterEncoding("UTF-8");
	    String str = jsonResult.toString();
	    System.out.print(str);
	    list = null;
	    jsonResult=null;
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
