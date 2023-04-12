package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import entity.Users;
import utils.GetConnection;

public class UserInfo {
	public List<Users> loadList(String page, String rows) {
		int start = (Integer.parseInt(rows)) * (Integer.parseInt(page) - 1);
		String sql = "select userId,userName,userPass,description,role from users limit " + start + ',' + rows;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		List<Users> datalist = new ArrayList<>();
		try {
			conn = GetConnection.getmysqlConnection();
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Users user = new Users();
				user.setId(rs.getInt(1));
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setdescription(rs.getString(4));
				user.setRole(rs.getString(5));
				datalist.add(user);				
			}	

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, conn);
		}

		return datalist;
	}

	public int getTotal() {
		Connection conn = null;
		String sql = "select count(*) from users";
		Statement stmt = null;
		ResultSet rs = null;
		int total = 0;
		try {
			conn = GetConnection.getmysqlConnection();
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				total = rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, conn);
		}
		return total;
	}

	
}
