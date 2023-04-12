package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import utils.GetConnection;
import entity.RemoteVoltage;

public class RemoteVoltagedao {
	public List<List<Object>> GetVoltageData(String tns,String st,String et){
		List<List<Object>> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="select batteryVolt,DATE_FORMAT(CollectionTime,'%Y-%m-%d %H:%i:%s'),id "
				+ "from term_volt where TNS='"+tns+"'and CollectionTime>='" + st
				+ "' and CollectionTime<='" + et + "' ORDER BY id ";	
		System.out.print(sql);
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				List<Object>list=new ArrayList<>();
				list.add(rs.getString(1));
				list.add(rs.getString(2));
				datalist.add(list);
			}
			
//		List<Object> vlist = new ArrayList<>();
//		List<Object> tlist = new ArrayList<>();
//		try{
//			stmt = conn.prepareStatement(sql);
//			rs = stmt.executeQuery(sql);
//			while (rs.next()) {
//				vlist.add(rs.getString(1));
//				tlist.add(rs.getString(2));
//				/*if(rs.getString(2).compareTo(x)>=0)
//				{
//					vlist.add(rs.getString(1));
//					tlist.add(rs.getString(2));
//				}
//				else
//				{
//					vlist.add("");
//					tlist.add(x);
//				}*/
//			}
//			datalist.add(tlist);
//			datalist.add(vlist);
		}
		catch (Exception e) {
			e.printStackTrace();
		} finally {
			GetConnection.closeAll(stmt, rs, conn);
		}

		return datalist;
	}
		

}
