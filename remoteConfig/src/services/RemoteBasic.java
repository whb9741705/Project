package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import entity.Remote;
import utils.GetConnection;

public class RemoteBasic {
	public String GetRole(String user){
		String role = "";
		Connection conn = GetConnection.getmysqlConnection();
		String sql="SELECT role FROM users where userName='"+user+"'";
		Statement stmt = null;
		ResultSet rs = null;
		try{
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			rs.next();
			role = rs.getString("role");
		}
		catch (Exception e) {
			e.printStackTrace();
		} finally {
			GetConnection.closeAll(stmt, rs, conn);
		}
		return role;
	};
	public List<Remote> GetAllData(String user){
		List<Remote> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String role = GetRole(user);
		String sql = "";String sql1 = "";
		if(role.equals("0")) {
			sql="select * from terminals";
		}else {
			sql="select * from terminals where User ='"+user+"' ";
		}
		Statement stmt = null;
		ResultSet rs = null;
		try{
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Remote remote=new Remote();
				//remote.setRid(rs.getString("RID"));
				//remote.setIp(rs.getString("IP"));
				//remote.setPort(rs.getString("Port"));
				remote.setTerminalNum(rs.getString("terminalNum"));
				//remote.setSvr(rs.getString("SVR"));
				remote.setIsOnline(rs.getString("isOnline"));
				remote.setTns(rs.getString("TNS"));
				//remote.setDescription(rs.getString("description"));
				String a=rs.getString("Longitude");
				String b=rs.getString("Lantitude");
				if(a.length()>10)
				{remote.setLongitude(a.substring(0, 10));}
				else{remote.setLongitude(a);}
				if(b.length()>10){
				remote.setLantitude(b.substring(0,10));}
				else {remote.setLantitude(b);}
				datalist.add(remote);
				//System.out.print(rs.getString("terminalNum"));
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, conn);
		}
		//System.out.print(datalist.get(1).getterminalNum());
		return datalist;
	};
	public List<Remote> GetNodeData(String tns){
		List<Remote> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql;
		if(tns.length()<=12) {
		sql="SELECT * FROM terminals where TNS = '"+tns+"' ";}
		else {
			sql="SELECT * FROM terminals where terminalNum = '"+tns+"' ";
		}
		//System.out.println(tns);
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while(rs.next())
			{
			Remote remote=new Remote();
			String terminalNum =rs.getString("terminalNum");
			//System.out.println(terminalNum);
			remote.setTerminalNum(terminalNum);
			//if(rs.getString("RID").equals("")) {remote.setRid("null");}
			//else{remote.setRid(rs.getString("RID"));}
			remote.setRid(rs.getString("RID"));
			remote.setTns(rs.getString("TNS"));
			remote.setLongitude(rs.getString("Longitude"));
			remote.setLantitude(rs.getString("Lantitude"));
			remote.setIsOnline(rs.getString("isOnline"));
			remote.setDescription(rs.getString("description"));
			//remote.setSvr(rs.getString("SVR"));
			stmt.close();
			rs.close();
			sql="select * from term_cr120_para_basic_config where terminalNum='"+terminalNum+"'";
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			if(rs.next())
			{remote.setCst(rs.getString("CST"));
			remote.setDate(rs.getString("Date"));
			remote.setTime(rs.getString("Time"));
			if(rs.getString("WMS")!=null)
			{remote.setWms1(rs.getString("WMS").substring(0, 1));
			remote.setWms2(rs.getString("WMS").substring(1, 2));}
			remote.setDms(rs.getString("DMS"));
			remote.setSvr(rs.getString("SVR"));
			}
			sql="select batteryVolt,MAX(id) from term_volt where TNS='"+tns+"'";
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			//System.out.print(sql);
			if(rs.next())
			{
				remote.setVoltage(rs.getString(1));
			}
			//System.out.print(remote.getVoltage());
			datalist.add(remote);
			}
			
		}
		catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, conn);
		}
		return datalist;
	}
		

}
