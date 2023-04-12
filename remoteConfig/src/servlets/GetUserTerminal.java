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
import entity.Userterminal;

/**
 * Servlet implementation class InitTree
 */
@WebServlet("/User/GetUserTerminal")
public class GetUserTerminal extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUserTerminal() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub				
		String num = request.getParameter("jcdbh");	
		String ter = request.getParameter("terminal");	
		String tnss = request.getParameter("tnss");	
		String page = request.getParameter("page");
		String rows = request.getParameter("rows");	
		//System.out.println(num+ter+tnss);
		List<Userterminal> data = new UserTerminal().getUserTerminal(num,ter,tnss,page,rows);	
		int total = new UserTerminal().totalGrid(num);
		
		JSONObject jsonResult= JsonUtil.toJsonString(total, data);
		String str = jsonResult.toString();
		//System.out.print(str);
		data = null;
		jsonResult = null;
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
