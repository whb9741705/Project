package entity;

import com.alibaba.fastjson.annotation.JSONField;

public class Users {

	private String role;
	private String userName;
	private String password;
	private int id;
	private String description;
	
	@JSONField(name = "description")
	public String getdescription() {
		return description;
	}

	public void setdescription(String description1) {
		this.description = description1;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
