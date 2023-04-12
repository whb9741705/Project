package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import utils.GetConnection;
import entity.RemoteCSM;
import entity.RemoteChannel;


public class RemoteCSMdao {
	public String nulltoempty(String s)
	{
		String a="";
		if (s==null)
			return a;
		else
			return s;
	}
	
	public List<RemoteCSM> GetChannelall(String terminalNum)
	{
		List<RemoteCSM> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="select * from term_cr120_para_csm_config where terminalNum ='"+terminalNum+"'";
		Statement stmt = null;
		ResultSet rs = null;
		//System.out.print(sql);
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			//sql="SELECT * FROM term_cr120_para_csp_config WHERE terminalNum='"+remote.terminalNum+"' AND channel_id='"+channel+"'";
			while(rs.next())
			{
				RemoteCSM remote=new RemoteCSM();
				String channel=rs.getString("channel_id");
				remote.csm=channel;
				remote.csms=nulltoempty(rs.getString("CSM_S"));
				//if(rs.getString("CSP_S")==null)
				//System.out.print("cccc"+cha[x-1]);
				datalist.add(remote);
			}
		}
		catch(Exception e)
		{e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, conn);
		}

		return datalist;
	}
	
	public List<RemoteCSM> GetCSMData(String tns,String channel){
		List<RemoteCSM> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="select terminalNum from terminals where TNS ='"+tns+"'";
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			if(rs.next())
			{
				RemoteCSM remote=new RemoteCSM();
				remote.terminalNum = rs.getString("terminalNum");
				stmt.close();
				rs.close();
				remote.csm=channel;
				//System.out.println("terminalNum"+remote.terminalNum+":"+remote.channel_id);
				sql="SELECT * FROM term_cr120_para_csm_config WHERE terminalNum='"+remote.terminalNum+"' AND channel_id='"+remote.csm+"'";
				stmt = conn.prepareStatement(sql);
				rs = stmt.executeQuery(sql);
				while(rs.next())
				{
					remote.csms=nulltoempty(rs.getString("CSM_S"));
					if(rs.getString("CSM_A")==null)
					{
						remote.csma="";remote.csma12_="";
					}
					else {
						remote.csma=rs.getString("CSM_A");
						remote.csma12_=rs.getString("CSM_A").substring(0,2);
					}
					if(rs.getString("CSM_P_0")==null)
					{
						remote.csmp0_1="";remote.csmp0_2="";
					}
					else {
						remote.csmp0_1=rs.getString("CSM_P_0").substring(0,1);
						remote.csmp0_2=rs.getString("CSM_P_0").substring(1,2);
					}
					if(rs.getString("CSM_P_1")==null)
					{
						remote.csmp1_1="";remote.csmp1_2="";
					}
					else {
						remote.csmp1_1=rs.getString("CSM_P_1").substring(0,1);
						remote.csmp1_2=rs.getString("CSM_P_1").substring(1,2);
					}
					if(rs.getString("CSM_P_2")==null)
					{
						remote.csmp2_1="";remote.csmp2_2="";
					}
					else {
						remote.csmp2_1=rs.getString("CSM_P_2").substring(0,1);
						remote.csmp2_2=rs.getString("CSM_P_2").substring(1,2);
					}
					remote.csmb=nulltoempty(rs.getString("CSM_B"));
					remote.csmm=nulltoempty(rs.getString("CSM_M"));
					remote.csmr=nulltoempty(rs.getString("CSM_R"));
					remote.csmn=nulltoempty(rs.getString("CSM_N"));
					datalist.add(remote);
				}
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
