package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import services.UserTerminal;

/**
 * Servlet implementation class InitTree
 */
@WebServlet("/User/UserAddTerminalEdit")
public class UserAddTerminalEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserAddTerminalEdit() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub	
		String terminalNum = request.getParameter("terminalNum");
		String RID = request.getParameter("RID");
		String TNS = request.getParameter("TNS");
		String User = request.getParameter("user");
		String Longitude = request.getParameter("Longitude");		
		String Latitude = request.getParameter("Latitude");
		String description = request.getParameter("description");
		String SCSW_Num = request.getParameter("SCSW_Num");
		String TerminalType = request.getParameter("TerminalType");
		boolean success[] = new UserTerminal().userAddTerminal(terminalNum,RID,TNS,User,Longitude,Latitude,description,SCSW_Num,TerminalType);
		JSONObject jsondata = new JSONObject();
		jsondata.put("success",success[0]);
		jsondata.put("tnssuccess",success[1]);
		String str = jsondata.toString();		
		//System.out.print(str);
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
