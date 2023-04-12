package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.List;


import services.UserTerminal;
import utils.JsonUtil;

/**
 * Servlet implementation class InitTree
 */
@WebServlet("/User/GetUserTerminalChange")
public class GetUserTerminalChange extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUserTerminalChange() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub				
		String num = request.getParameter("terminalNum");
		
		String[] data = new UserTerminal().getUserTerminalChange(num);
		JSONObject jsondata = new JSONObject();
		jsondata.put("terminalNum0", data[0]);
		jsondata.put("terminalNum", data[1]);
		jsondata.put("user", data[2]);
		jsondata.put("RID", data[3]);
		jsondata.put("TNS", data[4]);
		jsondata.put("TerminalType", data[5]);
		jsondata.put("SCSW_Num", data[6]);
		jsondata.put("description", data[7]);
		jsondata.put("Longitude", data[8]);
		jsondata.put("Latitude", data[9]);
	    String str = jsondata.toString();	
	    //System.out.print(str);
	    jsondata = null;
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(str);
		response.getWriter().flush();
		response.getWriter().close();		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
