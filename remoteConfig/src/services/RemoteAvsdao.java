package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import utils.GetConnection;
import entity.RemoteAvs;

public class RemoteAvsdao {
	public List<RemoteAvs> GetAvsData(String terminalNum){
		List<RemoteAvs> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="SELECT * FROM term_cr120_para_avs_config WHERE terminalNum=\""+terminalNum+"\"";
		Statement stmt = null;
		ResultSet rs = null;
		try{
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				RemoteAvs remote=new RemoteAvs();
				remote.terminalNum = rs.getString("terminalNum");
				
				remote.avs1s = rs.getString("AVS_01_S");
				remote.avs1a = rs.getString("AVS_01_A");
				remote.avs1h = rs.getString("AVS_01_H");
				remote.avs1l = rs.getString("AVS_01_L");
				
				remote.avs2s = rs.getString("AVS_02_S");
				remote.avs2a = rs.getString("AVS_02_A");
				remote.avs2h = rs.getString("AVS_02_H");
				remote.avs2l = rs.getString("AVS_02_L");
				
				remote.avs3s = rs.getString("AVS_03_S");
				remote.avs3a = rs.getString("AVS_03_A");
				remote.avs3h = rs.getString("AVS_03_H");
				remote.avs3l = rs.getString("AVS_03_L");
				
				remote.avs4s = rs.getString("AVS_04_S");
				remote.avs4a = rs.getString("AVS_04_A");
				remote.avs4h = rs.getString("AVS_04_H");
				remote.avs4l = rs.getString("AVS_04_L");
				
				remote.avs5s = rs.getString("AVS_05_S");
				remote.avs5a = rs.getString("AVS_05_A");
				remote.avs5h = rs.getString("AVS_05_H");
				remote.avs5l = rs.getString("AVS_05_L");
				
				remote.avs6s = rs.getString("AVS_06_S");
				remote.avs6a = rs.getString("AVS_06_A");
				remote.avs6h = rs.getString("AVS_06_H");
				remote.avs6l = rs.getString("AVS_06_L");
				
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
