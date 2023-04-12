
var Control = {};
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;


var timer = null;
var gatenum=null;
var control=null;
//var ws = new WebSocket("ws://121.40.165.18:8800");
var ws = new WebSocket("ws://39.102.148.186:5260");
console.log(ws.readyState);
ws.onopen = function()
{
 // Web Socket 已连接上，使用 send() 方法发送数据
 console.log("chenggong");
};
ws.onmessage = function (evt) 
{ 
 var received_msg = evt.data;
 console.log("数据已接收...");
 HuiFang.Funtishi(received_msg);
};



Control.Kaizha = function () {

    	                   
    	                	    gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
    	                	    control="NO:"+gatenum+":C:008:A:001:END"+"\r\n";
    	                	    if(ws.readyState!=1)
    	                    	{alert("连接失败！");}
    	                	    else
    	                	    {
    	                	    	ws.send(control);
    	                	    	document.getElementById("btn_kaizha").disabled=true;
    	                	    	document.getElementById("btn_kaizha").style.backgroundColor="silver";
    	                	    	kaiduflag=false; 	    	
    	                	    }
    	                	    
    	                    

};
Control.Guanzha = function () {

    	                    
    	                	gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
	                	    control="NO:"+gatenum+":C:008:A:002:END"+"\r\n";
	                	    if(ws.readyState!=1)
	                    	{alert("连接失败！");}
	                	    else{ws.send(control);
	                	    kaiduflag=false;
	                	    }   
    	                	//document.getElementById("btn_kaizha").disabled=false;
    	                	    
    	                    

};
Control.Stop = function () {
         


    	                	gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
	                	    control="NO:"+gatenum+":C:008:A:000:END"+"\r\n";
	                	    if(ws.readyState!=1){alert("连接失败！");}
	                	    else
	                	    {ws.send(control);
	                	    document.getElementById("btn_kaizha").disabled=false;
    	                	document.getElementById("btn_guanzha").disabled=false;
    	                	document.getElementById("btn_kaizha").style.backgroundColor="green";
    	                	
    	                	}

    

};
Control.OpenVideo = function () {

    	                	    console.log("开启摄像头");
    	                	    gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
    	                	    control="NO:"+gatenum+":C:00A:A:001:END"+"\r\n";
    	                	    if(ws.readyState!=1){alert("连接失败！");}
    	                	    else{ws.send(control);}

    	                	   /* var minute = document.getElementById("minute");
    	                	    var second = document.getElementById("second");
    	                	    document.getElementById("camerastatus").innerText="视频设备开启中";
    	                	    minute.innerText="00";
    	                	    second.innerText="00";
    	                	    clearInterval(timer);
    	                	    var Minute = 0;
    	                	    var Second = 0;
    	                	    //document.getElementById("btn_kaizha").disabled=true;
    	                	    timer = setInterval(function(){
    	                			Second++;
    	                			if(Second > 59){
    	                				Second = 0;
    	                				Minute++;
    	                			}
    	                 
    	                			
    	                			if(Second < 10){
    	                				second.innerText = "0" + Second;
    	                			}else{
    	                				second.innerText = Second;
    	                			}
    	                 
    	                			
    	                			if(Minute < 10){
    	                				minute.innerText = "0" + Minute;
    	                			}else{
    	                				minute.innerText = Minute;
    	                			}
    	                			if(Minute==10){
    	                				clearInterval(timer);
    	                				minute.innerText="00";
    	    	                	    second.innerText="00";
    	    	                	    alert("视频设备已关闭！");
    	                			}
    	                			if(Minute==0&&Second>50)
    	                				{
    	                				document.getElementById("camerastatus").innerText="视频设备已开启";
    	                				}
    	                		},1000)*/
    	                  
};
Control.CloseVideo = function () {

    	                	    gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
    	                	    control="NO:"+gatenum+":C:00A:A:000:END"+"\r\n";
    	                	    if(ws.readyState!=1){alert("连接失败！");}
    	                	    else{ws.send(control);}
    	                	    var Src="../Video/"+gatenum+".jpg";
    	                	    $('#picvi').html("<img id='picture' style='width:100%;height:730px; margin:auto;' src='"+Src+"'>");
    	                	    /*clearInterval(timer);
    	                	    var minute = document.getElementById("minute");
    	                	    var second = document.getElementById("second");
    	                	    minute.innerText="00";
    	                	    second.innerText="00"; 
    	                	    document.getElementById("camerastatus").innerText="视频设备已关闭";*/
    	                	    //document.getElementById("btn_kaizha").disabled=true;
    	                   
};
Control.Kaidu = function () {

    	                    	
    	                	    var percent=$('#Percent').val();
    	                	    var petext=$("#Percent").find("option:selected").text().split("(")[0];
    	                	    console.log(petext);
    	                	    document.getElementById("aim").style.height=percent;
    	                	    document.getElementById("aim").innerText=petext;
    	                	    	percent=percent.split("%")[0];
    	                	    	percent =pad(percent,3);
    	                	    	gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
        	                	    control="NO:"+gatenum+":C:008:B:"+percent+":END"+"\r\n";
        	                	    console.log(control);
        	                	    
        	                	    if(ws.readyState!=1){alert("连接失败！");}
        	                	    else{ws.send(control);kaiduflag=true;}


};

Control.KaiduM = function () {

    	                    
    	                		var kaiduzhi=$('#opts').val();
    	                		var kaidutext=$("#opts").find("option:selected").text().split("(")[0];
    	                			document.getElementById("aim").style.width=kaiduzhi;
	    	                	    document.getElementById("aimval").innerText=kaidutext;
    	                			var percent=kaiduzhi.split("%")[0];
    	                	    	percent =pad(percent,3);
    	                	    	gatenum=(document.getElementById("Pnum").innerText).substring(3,13)+"01";
    	                	    	control="NO:"+gatenum+":C:008:B:"+percent+":END"+"\r\n";
        	                	    console.log(control);
        	                	    if(ws.readyState!=1){alert("连接失败！");}
        	                	    else{ws.send(control);kaiduflag=true;}
    	                		

};
/*字符串补0 */
function pad(num, n) {
  var len = num.toString().length;
  while(len < n) {
    num = "0" + num;
    len++;
  }
  return num;
};
function writeCurrentDate() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
            
   var week;
   month = month + 1;
   if (month < 10) month = "0" + month;
   if (date < 10) date = "0" + date;
   if (hour < 10) hour = "0" + hour;
   if (minu < 10) minu = "0" + minu;
   if (sec < 10) sec = "0" + sec;
   
 
   var time = "";
   time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
   return time;

 };

 var HuiFang={
		 m_tishi :null,//全局变量 判断是否存在div,
		 //提示div 等待2秒自动关闭
		 Funtishi: function (content, url) {
		 if (HuiFang.m_tishi == null) {
		 HuiFang.m_tishi = '<div class="xiaoxikuang none" id="app_tishi" style="z-index:9999;left: 15%;width:70%;position: fixed;background:none;bottom:10%;"> <p class="app_tishi" style="background: none repeat scroll 0 0 #506AA5; border-radius: 30px;color: #fff; margin: 0 auto;padding: 1.5em;text-align: center;width: 70%;opacity: 0.8; font-family:Microsoft YaHei;letter-spacing: 1px;font-size: 5em;"></p></div>';
		 $(document.body).append(HuiFang.m_tishi);
		 }
		 $("#app_tishi").show();
		 $(".app_tishi").html(content);
		 if (url) {
		 window.setTimeout("location.href='" + url + "'", 1500);
		 } else {
		 setTimeout('$("#app_tishi").fadeOut()', 1500);
		 }
		 },
		 }