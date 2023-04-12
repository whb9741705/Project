package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import entity.Users;
import utils.GetConnection;

public class Login {
	
	public Users checkLogin(String username,String password){
		
		Connection conn = GetConnection.getmysqlConnection();
		String sql = "select role from users where userName='"+username+"' "
				+ "and userPass='"+password+"'";
		//System.out.println(sql);
		Statement stmt = null;
		ResultSet rs = null;
		Users user = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				user = new Users();
				user.setRole(rs.getString("role"));
			}		
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			
			GetConnection.closeAll(stmt,rs,conn);
		}

		
		return user;
		
	}

}
