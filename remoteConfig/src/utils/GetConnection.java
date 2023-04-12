package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class GetConnection{

	public static Connection getmysqlConnection() {
		Connection conn =null;
		try {
			String url ="jdbc:mysql://47.108.113.24:6003/terminal_config?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8&useSSL=false";//"jdbc:mysql://120.77.47.148:3306/ss_db_test"; //"jdbc:mysql://127.0.0.1:3306/guanqu";//连接本地数据库Guanqu
			String driverName = "com.mysql.cj.jdbc.Driver";
			
			String username = "root";  
			String password ="sua07f18";// "sua07f18"; 
			Class.forName(driverName);//注册驱动
			conn = DriverManager.getConnection(url, username, password);//获取连接
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;

	}
	public static Connection getsqlConnection() {
		
		
		Connection conn = null;
		String url = "jdbc:sqlserver://222.18.54.65:5255;DatabaseName=gloconnrts3";
		String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		String username = "sa";
		String password = "sua07f18";
		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			conn = DriverManager.getConnection(url, username,password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;
	}
	
	
	public static void main(String[] args) throws SQLException {
       Connection conn = GetConnection.getsqlConnection();
        String sql = "select top 1 positionx,positiony,positionz,createdate from xb_perioddata where deviceno"
        		+ "= '"+"GDA10531'";
	    //System.out.println(sql);
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery();
			while(rs.next()){
				System.out.println(rs.getString(1)+","+
			      rs.getString(2)+","+rs.getString(3)+","+rs.getString(4));
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			GetConnection.closeAll(stmt, rs, conn);
		}
	}

	public static void closeAll(Statement stmt, ResultSet rs, Connection conn) {
		if(stmt!=null){
			try {
				stmt.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(rs!=null){
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(conn!=null){
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
}
