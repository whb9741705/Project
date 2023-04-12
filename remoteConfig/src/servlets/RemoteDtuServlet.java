package servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import entity.RemoteDtu;
import services.RemoteDtudao;
import utils.JsonUtil;

/**
 * Servlet implementation class RemoteDtuServlet
 */
@WebServlet("/RemoteDtu")
public class RemoteDtuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoteDtuServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		RemoteDtudao remoteDtudao=new RemoteDtudao();
		String tns = req.getParameter("tns");
		String channel=req.getParameter("channel");
		//System.out.print("bbbbbbb"+tns+channel);
		List<RemoteDtu> list=remoteDtudao.GetDtuData(tns,channel);
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
