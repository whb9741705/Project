package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import entity.RemoteDtu;
import utils.GetConnection;

public class RemoteDtudao {
	public List<RemoteDtu> GetDtuData(String tns,String channel){
		List<RemoteDtu> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="select terminalNum from terminals where TNS ='"+tns+"'";
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			if(rs.next())
			{
			RemoteDtu remote=new RemoteDtu();
			remote.terminalNum = rs.getString("terminalNum");
			stmt.close();
			rs.close();
			sql="select * from dtuconfig where terminalNum ='"+remote.terminalNum+"'AND channelId='"+channel+"'";
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			if(rs.next())
			{
				if(rs.getString("IP")==null)
				{
					String a="null";
					remote.dtuIp=a;
					remote.dtuPort=a;
				}
				else {
				remote.dtuIp=rs.getString("IP");
				remote.dtuPort=rs.getString("Port");
				}

				stmt.close();
				rs.close();
			}
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
