package services;

import java.sql.Connection;
import java.sql.Statement;

import javax.swing.JOptionPane;

import java.math.BigInteger;

import entity.Users;
import java.sql.ResultSet;
import utils.GetConnection;

public class UserManage {
	public boolean userAdd(Users user){		
		
		Connection conn =null;
		Statement stmt = null;
		ResultSet rs = null;
		boolean flag = false;
		try {
			conn = GetConnection.getmysqlConnection();
			int userId_num = 0;
			String sql = "select count(*) from users order by userId";
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				userId_num = rs.getInt(1);
			}
			stmt.close();
			rs.close();
			int[] users = new int[userId_num];
			int user_id = 0;
			sql = "select userId from users order by userId";
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				users[user_id]=rs.getInt(1);
				user_id++;
			}
			stmt.close();
			rs.close();
			int userId = 0;
			if(users[0]!=1) {
				userId = 1;
			}else {
				for(int k=1;k<userId_num;k++) {
					if(users[k]!=(k+1)) {
						userId = k+1;
						break;
					}
				}
			}
			if(userId==0) {
				userId = userId_num+1;
			}
			String userId_Str = userId+"";
			if(userId_Str.length()<2) {
				userId_Str = "0" + userId_Str;
			}
			sql = "insert into users(userId,userName,userPass,description,role)"
					+ "values('"+userId+"','"+user.getUserName()+"','"+user.getPassword()+"','"+user.getdescription()+"','1')";

			stmt = conn.prepareStatement(sql);
			int i1 = stmt.executeUpdate(sql);
			//boolean flag1 = false;
			if(i1>0){
				flag = true;
			}
			stmt.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, conn);
		}
		
		return flag;
		
	}
	public String[] getUserChange(String num) {
		String[] user_info = new String[3];
		Connection con = GetConnection.getmysqlConnection();
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "select userPass,userId,description from users where userName='"+num+"'";		
		try{
			stmt = con.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				user_info[0] = rs.getString(1);
				user_info[1] = rs.getString(2);
				user_info[2] = rs.getString(3);
			}
			rs.close();
			stmt.close();
		}catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, con);
		}
		return user_info;
	}
	public boolean userEdit(String userId,String userName,String userpass,String description){
		boolean flag = false;
		Connection con = GetConnection.getmysqlConnection();
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "update users set userName = '"+userName+"',userPass = '"+userpass+"' ,description = '"+description+"'where userId ='"+userId+"'";		
		
		try {
			stmt = con.createStatement();
			int i1 = stmt.executeUpdate(sql);
			boolean flag1=false;
			if(i1>0)
				flag1=true;
			stmt.close();
			if(flag1)
				flag=true;
			stmt.close();
			GetConnection.closeAll(stmt, null, con);
		}catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, null, con);
		}
		
		return flag;
	}
	public boolean userDelete(String username){
		Connection conn =null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "delete from users where userName ='"+username+"'";		
		boolean flag = false;
		try {
			conn = GetConnection.getmysqlConnection();
			stmt = conn.prepareStatement(sql);
			int i = stmt.executeUpdate(sql);
			if(i>0){
				flag = true;
			}			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, null, conn);
		}
		
		return flag;
	}


}
