package services;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.QuerySendDetailsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.QuerySendDetailsResponse;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.dysmsapi.transform.v20170525.SendSmsResponseUnmarshaller;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.FormatType;
import com.aliyuncs.http.HttpResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;

import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import utils.GetConnection;

/**
 * Created on 17/6/7.
 * 短信API产品的DEMO程序,工程中包含了一个SmsDemo类，直接通过
 * 执行main函数即可体验短信产品API功能(只需要将AK替换成开通了云通信-短信产品功能的AK即可)
 * 工程依赖了2个jar包(存放在工程的libs目录下)
 * 1:aliyun-java-sdk-core.jar
 * 2:aliyun-java-sdk-dysmsapi.jar
 *
 * 备注:Demo工程编码采用UTF-8
 * 国际短信发送请勿参照此DEMO
 */
public class Sendmessage {

    //产品名称:云通信短信API产品,开发者无需替换
    static final String product = "Dysmsapi";
    //产品域名,开发者无需替换
    static final String domain = "dysmsapi.aliyuncs.com";

    // TODO 此处需要替换成开发者自己的AK(在阿里云访问控制台寻找)
    static final String accessKeyId = "LTAIV72m3e8EXVzO";
    static final String accessKeySecret = "VUty482qm7MbVR6lmIRCMijNM5tmx4";

    public static SendSmsResponse sendSms(String PhoneNumber,String[] messagecontent) throws ClientException {

        //可自助调整超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");
         
        //初始化acsClient,暂不支持region化
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
        IAcsClient acsClient = new DefaultAcsClient(profile);

        //组装请求对象-具体描述见控制台-文档部分内容
        SendSmsRequest request = new SendSmsRequest();
        //必填:待发送手机号
        request.setPhoneNumbers(PhoneNumber);
        //System.out.println(PhoneNumber);
        //必填:短信签名-可在短信控制台中找到 如果不是用户本人签名要企业的执照
        request.setSignName("刘娜");
        //必填:短信模板-可在短信控制台中找到
        request.setTemplateCode("SMS_152505480");
        //message content里面的内容为 year,month,day,hour,minute,type,level,sensor,number
        //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
        request.setTemplateParam("{\"location\":\""+messagecontent[0]+"\",\"type\":\""+messagecontent[1]+"\",\"number\":\""+messagecontent[2]+"\"}");
       
        //选填-上行短信扩展码(无特殊需求用户请忽略此字段)
        //request.setSmsUpExtendCode("90997");

        //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
        //request.setOutId("yourOutId");

        //hint 此处可能会抛出异常，注意catch
        SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);

        return sendSmsResponse;
    }
    
    public static SendSmsResponse sendSms1_manyparams(String PhoneNumber,String[] messagecontent) throws ClientException {

        //可自助调整超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");
         
        //初始化acsClient,暂不支持region化
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
        IAcsClient acsClient = new DefaultAcsClient(profile);

        //组装请求对象-具体描述见控制台-文档部分内容
        SendSmsRequest request = new SendSmsRequest();
        //必填:待发送手机号
        request.setPhoneNumbers(PhoneNumber);
        //System.out.println(PhoneNumber);
        //必填:短信签名-可在短信控制台中找到 如果不是用户本人签名要企业的执照
        request.setSignName("刘娜");
        //必填:短信模板-可在短信控制台中找到
        request.setTemplateCode("SMS_163432753");
        //message content里面的内容为 year,month,day,hour,minute,type,level,sensor,number
        //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
        request.setTemplateParam("{\"location\":\""+messagecontent[0]+"\",\"type\":\""+messagecontent[1]+"\",\"num1\":\""+messagecontent[2]+"\",\"num2\":\""+messagecontent[3]+"\",\"num3\":\""+messagecontent[4]+"\",\"num4\":\""+messagecontent[5]+"\"}");
       
        //选填-上行短信扩展码(无特殊需求用户请忽略此字段)
        //request.setSmsUpExtendCode("90997");

        //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
        //request.setOutId("yourOutId");

        //hint 此处可能会抛出异常，注意catch
        SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);

        return sendSmsResponse;
    }

    public static SendSmsResponse sendSms_wrong(String[] messagecontent) throws ClientException {

        //可自助调整超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");
         
        //初始化acsClient,暂不支持region化
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
        IAcsClient acsClient = new DefaultAcsClient(profile);

        //组装请求对象-具体描述见控制台-文档部分内容
        SendSmsRequest request = new SendSmsRequest();
        //必填:待发送手机号
        request.setPhoneNumbers("18080819142");
        //System.out.println(PhoneNumber);
        //必填:短信签名-可在短信控制台中找到 如果不是用户本人签名要企业的执照
        request.setSignName("刘娜");
        //必填:短信模板-可在短信控制台中找到
        request.setTemplateCode("SMS_163432788");
        //message content里面的内容为 year,month,day,hour,minute,type,level,sensor,number
        //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
        request.setTemplateParam("{\"message\":\""+messagecontent[0]+"\",\"type\":\""+messagecontent[1]+"\",\"location\":\""+messagecontent[2]+"\"}");
        //选填-上行短信扩展码(无特殊需求用户请忽略此字段)
        //request.setSmsUpExtendCode("90997");

        //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
        //request.setOutId("yourOutId");

        //hint 此处可能会抛出异常，注意catch
        SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);

        return sendSmsResponse;
    }
    
    public boolean warning_test(String num) {
    	boolean i = false;
    	Connection con = GetConnection.getmysqlConnection();
    	Statement stmt = null;
    	ResultSet rs = null;
    	String sql = "select sensorNum,DName,EName,sensorType,blueAlertValue,yellowAlertValue,orangeAlertValue,redAlertValue,sensorUnit,alarmNumber from `alertvalues` where sensorNum = '"+num+"'";
    	try {
    		stmt = con.prepareStatement(sql);
    		rs = stmt.executeQuery(sql);
    		while(rs.next()) {
    			if(num.equals(rs.getString(1))) {	   				
    				String location = rs.getString(2)+"的"+rs.getString(3)+"("+num+")";
    				if(num.length()>=11)
    					location = rs.getString(2)+"的"+rs.getString(3)+"("+num.substring(10)+")";
    				if(location.length()>20) location=location.substring(0, 20);
    				String type = rs.getString(4);
    				String phonenum = rs.getString(10);
    				if(!rs.getString(9).contains(",")) {
    					String number = rs.getString(5)+";"+rs.getString(6)+";"+rs.getString(7)+";"+rs.getString(8)+"("+rs.getString(9)+")";
    					if(number.length()>20) number=number.substring(0, 20);
    					String[] content = {location,type,number};
        				SendSmsResponse response = sendSms(phonenum,content);
        				System.out.println("短信接口返回的数据为----------------");
        		        System.out.println("Code=" + response.getCode());
        		        System.out.println("Message=" + response.getMessage());
        		        System.out.println("RequestId=" + response.getRequestId());
        		        System.out.println("BizId=" + response.getBizId());
        		        if(!response.getMessage().equals("OK")) {
        		        	String message = response.getMessage();
        		        	if(response.getMessage().length()>20)
        		        		message = response.getMessage().substring(0, 20);
        		        	System.out.println(message);
        		        	String[] content1 = {message,type,location};
        		        	SendSmsResponse response1 = sendSms_wrong(content1);
        		        	System.out.println("报错短信接口返回的数据为----------------");
            		        System.out.println("Code=" + response1.getCode());
            		        System.out.println("Message=" + response1.getMessage());
            		        System.out.println("RequestId=" + response1.getRequestId());
            		        System.out.println("BizId=" + response1.getBizId());
        		        }else {
        		        	i=true;
        		        }
    				}
    				else {
    					String num1 = rs.getString(5);
    					String num2 = rs.getString(6);
    					String num3 = rs.getString(7);
    					String num4 = rs.getString(8)+"("+rs.getString(9)+")";
    					if(num1.length()>20) num1=num1.substring(0, 20);
    					if(num2.length()>20) num2=num2.substring(0, 20);
    					if(num3.length()>20) num3=num3.substring(0, 20);
    					if(num4.length()>20) num4=num4.substring(0, 20);
    					String[] content = {location,type,num1,num2,num3,num4};
    					SendSmsResponse response = sendSms1_manyparams(phonenum,content);
    					System.out.println("短信接口返回的数据为----------------");
        		        System.out.println("Code=" + response.getCode());
        		        System.out.println("Message=" + response.getMessage());
        		        System.out.println("RequestId=" + response.getRequestId());
        		        System.out.println("BizId=" + response.getBizId());
        		        if(!response.getMessage().equals("OK")) {
        		        	String message = response.getMessage();
        		        	if(response.getMessage().length()>20)
        		        		message = response.getMessage().substring(0, 20);
        		        	System.out.println(message);
        		        	String[] content1 = {message,type,location};
        		        	SendSmsResponse response1 = sendSms_wrong(content1);
        		        	System.out.println("报错短信接口返回的数据为----------------");
            		        System.out.println("Code=" + response1.getCode());
            		        System.out.println("Message=" + response1.getMessage());
            		        System.out.println("RequestId=" + response1.getRequestId());
            		        System.out.println("BizId=" + response1.getBizId());
        		        }else {
        		        	i=true;
        		        }
    				}   			
    		        
    			}
    			
    		}
    		GetConnection.closeAll(stmt, rs, con);
    	}catch (Exception e) {
			e.printStackTrace();
		} finally {

			GetConnection.closeAll(stmt, rs, con);
		}
    	
    	return i;
    }

    public static void main(String[] args) throws ClientException, InterruptedException {

        System.out.println("Send message!");
        

    }
}
