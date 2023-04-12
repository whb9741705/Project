package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import entity.Users;
import services.UserManage;

/**
 * Servlet implementation class AddUser
 */
@WebServlet("/User/Add")
public class AddUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		String description = request.getParameter("description");
		Users user = new Users();
		user.setUserName(userName);
		user.setPassword(password);
		user.setdescription(description);
		UserManage manage  = new UserManage();
		boolean  flag = manage.userAdd(user);
		JSONObject jsondata = new JSONObject();
		jsondata.put("success",flag);
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
