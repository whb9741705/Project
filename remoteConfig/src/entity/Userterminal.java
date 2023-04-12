package entity;

import com.alibaba.fastjson.annotation.JSONField;

public class Userterminal {
	private String terminalNum;
	private String RID;
	private String TNS;
	private String User;
	private String TerminalType;
	private String IP;
	private String Port;
	private String isonline;
	private String description;
	private String Lantitude;
	private String Longitude;
	private String CSQ;
	private String ICCID;
	private String SCSW_Num;
	private int RowNumber;
	
	@JSONField(name = "description")
	public String getdescription() {
		return description;
	}

	public void setdescription(String description1) {
		this.description = description1;
	}
	
	@JSONField(name = "Lantitude")
	public String getLantitude() {
		return Lantitude;
	}

	public void setLantitude(String Lantitude1) {
		this.Lantitude = Lantitude1;
	}
	
	@JSONField(name = "Longitude")
	public String getLongitude() {
		return Longitude;
	}

	public void setLongitude(String Longitude1) {
		this.Longitude = Longitude1;
	}

	@JSONField(name = "CSQ")
	public String getCSQ() {
		return CSQ;
	}

	public void setCSQ(String CSQ1) {
		this.CSQ = CSQ1;
	}
	
	@JSONField(name = "ICCID")
	public String getICCID() {
		return Longitude;
	}

	public void setICCID(String ICCID1) {
		this.ICCID = ICCID1;
	}
	
	@JSONField(name = "SCSW_Num")
	public String getSCSW_Num() {
		return SCSW_Num;
	}

	public void setSCSW_Num(String SCSW_Num1) {
		this.SCSW_Num = SCSW_Num1;
	}
	@JSONField(name = "terminalNum")
	public String getterminalNum() {
		return terminalNum;
	}

	public void setterminalNum(String terminalNum1) {
		this.terminalNum = terminalNum1;
	}
	
	@JSONField(name = "RID")
	public String getRID() {
		return RID;
	}

	public void setRID(String RID1) {
		this.RID = RID1;
	}
	
	@JSONField(name = "TNS")
	public String getTNS() {
		return TNS;
	}

	public void setTNS(String TNS1) {
		this.TNS = TNS1;
	}
	
	@JSONField(name = "User")
	public String getUser() {
		return User;
	}

	public void setUser(String User1) {
		this.User = User1;
	}
	
	@JSONField(name = "TerminalType")
	public String getTerminalType() {
		return TerminalType;
	}

	public void setTerminalType(String TerminalType1) {
		this.TerminalType = TerminalType1;
	}
	
	@JSONField(name = "IP")
	public String getIP() {
		return IP;
	}

	public void setIP(String IP1) {
		this.IP = IP1;
	}
	
	@JSONField(name = "Port")
	public String getPort() {
		return Port;
	}

	public void setPort(String Port1) {
		this.Port = Port1;
	}
	
	@JSONField(name = "isonline")
	public String getisonline() {
		return isonline;
	}

	public void setisonline(String isonline1) {
		this.isonline = isonline1;
	}
	@JSONField(name = "RowNumber")
	public int getRowNumber() {
		return RowNumber;
	}

	public void setRowNumber(int rownumber) {
		this.RowNumber = rownumber;
	}
	
}
