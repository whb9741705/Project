package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.Users;
import services.Login;

/**
 * Servlet implementation class CheckLogin
 */
@WebServlet("/CheckLogin")
public class CheckLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CheckLogin() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	  
		// TODO Auto-generated method stub
		/*
		  Cookie cookie = new Cookie("username",uname);
		   cookie.setMaxAge(3600*24*3);//设置其生命周期
		   response.addCookie(cookie);
		   Cookie cookie1 = new Cookie("password",upwd);
		   cookie1.setMaxAge(3600*24*3);//设置其生命周期
		   response.addCookie(cookie1);
		   Cookie cookie2 = new Cookie("stationNum",user.getStationNum());
		   //System.out.println(user.getStationNum());
		   cookie2.setMaxAge(3600*24*3);//设置其生命周期
		   response.addCookie(cookie2);
		   Cookie cookie3 = new Cookie("role", user.getRole());
		   cookie3.setMaxAge(3600*24*3);//设置其生命周期
		   response.addCookie(cookie3);
		   cookie = null;
		   cookie1 =null;
		   cookie2=null;
		   cookie3 = null;
		   PrintWriter out = response.getWriter();
		   out.append("success");
		   out.flush();
		   out.close();
		 * 
		 */
	   String username = request.getParameter("username");
	   String password = request.getParameter("password");
	   String ifrem = request.getParameter("ifrem");	   
	   Login login = new Login();
	   Users user = login.checkLogin(username, password);
	   boolean state = false;
	   if(true) {
//	   if(user!=null) {
		   state = true;
		   if(ifrem.equals("true")) {//记住cookie
			   Cookie cookie = new Cookie("username",username);
			   cookie.setMaxAge(3600*24*3);//设置其生命周期
			   response.addCookie(cookie);
			   Cookie cookie1 = new Cookie("password",password);
			   cookie1.setMaxAge(3600*24*3);//设置其生命周期
			   response.addCookie(cookie1);
			   
			   Cookie cookie3 = new Cookie("role", user.getRole());
			   cookie3.setMaxAge(3600*24*3);//设置其生命周期
			   response.addCookie(cookie3);
			   cookie = null;
			   cookie1 =null;
			   cookie3 = null;
		   }else {
			   Cookie cookie = new Cookie("username",username);
			   cookie.setMaxAge(3600);//设置其生命周期
			   response.addCookie(cookie);
			   Cookie cookie1 = new Cookie("password",password);
			   cookie1.setMaxAge(3600);//设置其生命周期
			   response.addCookie(cookie1);
			   
			   Cookie cookie3 = new Cookie("role", user.getRole());
			   cookie3.setMaxAge(3600);//设置其生命周期
			   response.addCookie(cookie3);
			   cookie = null;
			   cookie1 =null;
			   cookie3 = null;
		   }
	   }
	  /* Cookie[] cookies = request.getCookies(); 	  
	   if(user!=null) {
		   state = true;
		   if (null==cookies) { 
			   if(ifrem.equals("true")) {//记住cookie
				   Cookie cookie = new Cookie("username",username);
				   cookie.setMaxAge(3600*24*3);//设置其生命周期
				   cookie.setPath("/");
				   response.addCookie(cookie);
				   Cookie cookie1 = new Cookie("password",password);
				   cookie1.setMaxAge(3600*24*3);//设置其生命周期
				   cookie1.setPath("/");
				   response.addCookie(cookie1);
				   Cookie cookie2 = new Cookie("stationNum",user.getStationNum());
				   cookie2.setPath("/");
				   cookie2.setMaxAge(3600*24*3);//设置其生命周期
				   response.addCookie(cookie2);
				   Cookie cookie3 = new Cookie("role", user.getRole());
				   cookie3.setPath("/");
				   cookie3.setMaxAge(3600*24*3);//设置其生命周期
				   response.addCookie(cookie3);
				   cookie = null;
				   cookie1 =null;
				   cookie2=null;
				   cookie3 = null;
				   
			   }else {
				   Cookie cookie = new Cookie("username",username);
				   cookie.setPath("/");
				   cookie.setMaxAge(3600);//记住一小时
				   response.addCookie(cookie);
				   Cookie cookie1 = new Cookie("password",password);
				   cookie1.setPath("/");
				   cookie1.setMaxAge(3600);//记住一小时
				   response.addCookie(cookie1);
				   Cookie cookie2 = new Cookie("stationNum",user.getStationNum());
				   cookie2.setPath("/");
				   cookie2.setMaxAge(3600);//记住一小时
				   response.addCookie(cookie2);
				   Cookie cookie3 = new Cookie("role", user.getRole());
				   cookie3.setPath("/");
				   cookie3.setMaxAge(3600);//记住一小时
				   response.addCookie(cookie3);
				   cookie = null;
				   cookie1 =null;
				   cookie2=null;
				   cookie3 = null;
				   
			   }
		   }else { 			  
			   if(ifrem.equals("true")) {//记住cookie
				   for(Cookie cookie : cookies){  
	                   if(cookie.getName().equals("username")){
	                       cookie.setValue(username); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600*24*3);// 设置为30min  
	                       response.addCookie(cookie);	                       
	                   } 
	                   if(cookie.getName().equals("password")){  
	                       cookie.setValue(password); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600*24*3);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   if(cookie.getName().equals("stationNum")){  
	                       cookie.setValue(user.getStationNum()); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600*24*3);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   if(cookie.getName().equals("role")){  
	                       cookie.setValue(user.getRole()); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600*24*3);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   
	               }  
			   }else {
				   for(Cookie cookie : cookies){  
	                   if(cookie.getName().equals("username")){  
	                       cookie.setValue(username); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   if(cookie.getName().equals("password")){  
	                       cookie.setValue(password); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   if(cookie.getName().equals("stationNum")){  
	                       cookie.setValue(user.getStationNum());
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   if(cookie.getName().equals("role")){  
	                       cookie.setValue(user.getRole()); 
	                       cookie.setPath("/");
	                       cookie.setMaxAge(3600);// 设置为30min  
	                       response.addCookie(cookie);    
	                   } 
	                   
	               } 				   
			   }
			   
			  
		   }
		   
	   }*/
	   PrintWriter out = response.getWriter();
	   out.append(state+"");
	   out.flush();
	   out.close();
	   
	
	 
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
