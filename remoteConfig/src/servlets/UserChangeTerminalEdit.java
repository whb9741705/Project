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
@WebServlet("/User/UserChangeTerminalEdit")
public class UserChangeTerminalEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserChangeTerminalEdit() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub	
		String terminalNum0 = request.getParameter("terminalNum0");
		String terminalNum = request.getParameter("terminalNum");		
		String user = request.getParameter("user");
		String RID = request.getParameter("RID");
		String TNS = request.getParameter("TNS");
		String TerminalType = request.getParameter("TerminalType");
		String SCSW_Num = request.getParameter("SCSW_Num");
		String description = request.getParameter("description");	
		String Longitude = request.getParameter("Longitude");
		String Latitude = request.getParameter("Latitude");
		//System.out.print(Longitude+Latitude);
		boolean[] success = new UserTerminal().userTerminalEdit(terminalNum0,terminalNum,user,RID,TNS,TerminalType,SCSW_Num,description,Longitude,Latitude);
		JSONObject jsondata = new JSONObject();
		jsondata.put("success",success[0]);
		jsondata.put("tnssuccess",success[1]);
		String str = jsondata.toString();
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
