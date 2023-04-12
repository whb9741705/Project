package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import utils.GetConnection;
import entity.RemoteChannel;
import com.google.common.base.Strings; 

public class RemoteChanneldao {
	public String nulltoempty(String s)
	{
		String a="";
		if (s==null)
			return a;
		else
			return s;
	}
	public List<RemoteChannel> GetChannelall(String terminalNum)
	{
		List<RemoteChannel> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="select * from term_cr120_para_csp_config where terminalNum ='"+terminalNum+"'";
		Statement stmt = null;
		ResultSet rs = null;
		//System.out.print(sql);
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			//sql="SELECT * FROM term_cr120_para_csp_config WHERE terminalNum='"+remote.terminalNum+"' AND channel_id='"+channel+"'";
			while(rs.next())
			{
				RemoteChannel remote=new RemoteChannel();
				String channel=rs.getString("channel_id");
				remote.csp=channel;
				remote.csps=nulltoempty(rs.getString("CSP_S"));
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
	
	
	public List<RemoteChannel> GetChannelData(String terminalNum,String channel){
		List<RemoteChannel> datalist = new ArrayList<>();
		Connection conn = GetConnection.getmysqlConnection();
		String sql="SELECT * FROM term_cr120_para_csp_config WHERE terminalNum='"+terminalNum+"' AND channel_id='"+channel+"'";
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery(sql);
			RemoteChannel remote=new RemoteChannel();
			remote.terminalNum = terminalNum;
			while(rs.next())
			{
				if(channel.equals("1")||channel.equals("2")) {
					remote.csp_pulse=channel;
					remote.pcsps=nulltoempty(rs.getString("CSP_S"));
					remote.pcspa=nulltoempty(rs.getString("CSP_A"));
					if(rs.getString("CSP_A")==null)
					{
						remote.pcspp12="";
					}
					else{remote.pcspp12=rs.getString("CSP_A").substring(0,2);}
					remote.pcspp3=nulltoempty(rs.getString("CSP_P"));
					remote.pcspk=nulltoempty(rs.getString("CSP_K"));
					remote.pcspb=nulltoempty(rs.getString("CSP_B"));
					datalist.add(remote);
				}
				else if(channel.equals("7"))
				{
					remote.csp_j=nulltoempty(rs.getString("CSP_S"));
					remote.cspa_j=nulltoempty(rs.getString("CSP_A"));
					remote.connect=nulltoempty(rs.getString("CSP_K").substring(1,3)+":"+rs.getString("CSP_K").substring(3,5)+":"+rs.getString("CSP_K").substring(5,7));
					remote.disconnect=nulltoempty(rs.getString("CSP_B").substring(1,3)+":"+rs.getString("CSP_B").substring(3,5)+":"+rs.getString("CSP_B").substring(5,7));
					datalist.add(remote);
				}
				else
				{
					remote.csp=channel;
					remote.csps=nulltoempty(rs.getString("CSP_S"));
					if(rs.getString("CSP_A")==null)
					{
						remote.cspp12="";remote.cspa="";
					}
					else{
						remote.cspa=rs.getString("CSP_A");
						remote.cspp12=rs.getString("CSP_A").substring(0,2);
					}
					remote.cspt=nulltoempty(rs.getString("CSP_T"));
					remote.cspp3=nulltoempty(rs.getString("CSP_P"));
					remote.cspk=nulltoempty(rs.getString("CSP_K"));
					remote.cspb=nulltoempty(rs.getString("CSP_B"));
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
