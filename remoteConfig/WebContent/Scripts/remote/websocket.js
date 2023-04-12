var ws = new WebSocket("ws://47.108.113.24:8086")
// var ws = new WebSocket("ws://localhost:5257")8086
// var ws = new WebSocket("ws://47.98.214.12:5257")
var Control = {}
const tns = node.tns
const records = new Array;
ws.onopen = function () {
    // Web Socket 已连接上，使用 send() 方法发送数据
    ws.send("NO:" + tns + ":END" + "\r\n")
    records.push("连接成功！\n")
    renderReceiveArea()
}
ws.onerror = function () {
    records.push("连接错误！\n")
    renderReceiveArea()
}
ws.onclose = function () {
	records.push("连接断开！\n")
    renderReceiveArea()
}

// 将后台返回的消息提示框显示
ws.onmessage = function (evt) {
    var [res, flag] = evt.data.split("$")
    console.log(evt.data)
    var ss=res.split(",");
    if(ss[0]=="rrpc"&&ss[1]=="getimei")
            {
			const Params = {
				type: 'object',
				"imei":ss[2],
				};
			layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(Params)));
            form.render();
            });
            }
    else  {
	aa=res.split(":");
	if(aa[0]=="<SZY")
	{
		console.log(aa[1])
		var bb=aa[1].split(">");
			console.log(bb[0])
			const Params = {
				type: 'object',
				"rtunum":bb[0],
				};
			layui.use('form', function () {
            var form = layui.form;
            form.val("rtuParams", JSON.parse(JSON.stringify(Params)));
            form.render();
            });
			}
	
	}
            
    if (flag && flag.trim() === '1') {//
        records.push("接收消息（" + getTime() +"）\n"+ res + "\n已解析\n\n")
        if(res.substring(0,4)=="<CSP"){
			//var a=res.split(":");
			var channel=res.substring(5,7);
			//window.alert("channel"+channel,tns);
    		channelFill(tns,channel);
		}
		else if(res.substring(0,4)=="<CSM"){
			//var a=res.split(":");
			var channel=res.substring(5,7);
			//window.alert("channel"+channel,tns);
    		csmFill(tns,channel);
		}
		else if(res.substring(0,6)=="config"){
			channel=res.substring(8,9);
			dtuFill(tns,channel);
			}
		else if(res.substring(0,4)=="rrpc"){
			var str=res.split(",");
			if(str[1]=="location")
			{
				basicdetailFill(tns);
			}
			else if(str[1]=="getcsq")
			{
			 const Params = {
				type: 'object',
				"csq":str[2],
				};
			layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(Params)));
            form.render();
            });
            }
            else if(str[1]=="geticcid")
            {
			const Params = {
				type: 'object',
				"iccid":str[2],
				};
			layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(Params)));
            form.render();
            });
            }
            /*else if(str[1]=="getimei")
            {console.log(str[2]);
			const Params = {
				type: 'object',
				"imei":str[2],
				};
			layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(Params)));
            form.render();
            });
            }*/
		}
		else
		{
			//var a=res.split(":");
			//var channel=res.substring(5,7);
			//window.alert("channel"+channel,tns);
    		basicdetailFill(tns);
		}
    }
    else {
        //basicdetailFill(tns);
        records.push("接收消息（" + getTime() +"）\n"+ res + "\n未解析\n\n")
    }
    renderReceiveArea()
}
basicdetailFill = function (tns) {
		
        var basicParams = remoteDetail.basic(tns);
        //console.log(basicParams[0]);
    	layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(basicParams[0])));
            form.render();
        });
        var  ridnum=document.getElementById("rid");
	    // console.log(ridnum.value)
	     if(ridnum.value=="")
	     {
	         ridnum.setAttribute("placeholder","null");
	    }
    }
channelFill = function (tns,channel) {

        var channelParams = remoteDetail.channel(tns,channel);
        //var count = Object.keys(channelParams[0]).length;
        //console.log(count);
       // if(count<7)
     //   {
	//		document.getElementById("analogg").reset();
	//		$("#csp").prop("checked",true);
	//	}
        
        if(channel=="01"||channel=="02")
        {
			layui.use('form', function () {
            var form = layui.form;
            $('input[name=pcsps]').prop('checked', false);
			$('input[name=pcspp3]').prop('checked', false);
            form.render('radio');
            form.val("pulsechannelParams", JSON.parse(JSON.stringify(channelParams[0])));
            form.render();
        });
		}
        else if(channel=="07")
        {
			layui.use('form', function () {
            var form = layui.form;
            $('input[name=csp_j]').prop('checked', false);
            form.render('radio');
            form.val("relaychannelParams", JSON.parse(JSON.stringify(channelParams[0])));
            form.render();
        });
		}
        else
		{	
			layui.use('form', function () {
            var form = layui.form;
            $('input[name=csps]').prop('checked', false);
			$('input[name=cspt]').prop('checked', false);
			$('input[name=cspp3]').prop('checked', false);
            form.render('radio');
            form.val("analogchannelParams", JSON.parse(JSON.stringify(channelParams[0])));
            form.render();
        });
		}
    }
csmFill = function (tns,channel) {
        var csmParams = remoteDetail.CSM(tns,channel);
    	layui.use('form', function () {
            var form = layui.form;
             $('input[name=csms]').prop('checked', false);
			$('input[name=csmp0_1]').prop('checked', false);
			$('input[name=csmp0_2]').prop('checked', false);
			$('input[name=csmp1_1]').prop('checked', false);
			$('input[name=csmp1_2]').prop('checked', false);
			$('input[name=csmp2_1]').prop('checked', false);
			$('input[name=csmp2_2]').prop('checked', false);
            form.render('radio');
            form.val("modubusParams", JSON.parse(JSON.stringify(csmParams[0])));
            form.render();
        });
    }
dtudetailFill = function (tns) {
        var basicParams = remoteDetail.basic(tns);
 
    	layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(basicParams[0])));
            form.render();
        });
        var  ipnum=document.getElementById("dtuIp");
        var  portnum=document.getElementById("dtuPort");
	     if(ipnum.value=="")
	     {
			$(" #dtuIp").val("");
	         ipnum.setAttribute("placeholder","null");
	    }
	    if(portnum.value=="")
	     {
			$(" #dtuPort").val("");
	         portnum.setAttribute("placeholder","null");
	    }
    }
Control.send = function (command) {
    if (ws.readyState !== 1) {
      records.push("websocket连接已断开！\n")
	}
    else if (command.trim() !== '') {
        let cmd = "NO:" + tns + ":" + command + ":END" + "\r\n"
        console.log(cmd)
        ws.send(cmd)
        records.push("发送消息（" + getTime() +"）\n" +command + "\r\n\n")
    }
    renderReceiveArea()
}
renderReceiveArea = function () {
    const receiveArea = $('#receiveArea')
    // 更新接受框内容
    let result = records.join("")
    receiveArea.val(result)
    // 保持接受框滚动在底部
    receiveArea[0].scrollTop = receiveArea[0].scrollHeight
}
Control.rtunumRead = function () {
    Control.send("SZY")
}
Control.rtunumWrite = function (rtu) {
    Control.send("SZY:" +rtu);
}
Control.locationRead = function () {
    Control.send("rrpc:getlocation")
}
Control.locationWrite = function (rid) {
    Control.send("rrpc:getlocation")
}
Control.ridRead = function () {
    Control.send("RID")
}
Control.ridWrite = function (rid) {
    Control.send("RID:" + rid)
}
Control.tnsRead = function () {
    Control.send("TNS")
}
Control.tnsWrite = function (tns) {
    Control.send("TNS:" + tns)
}
Control.cstRead = function () {
    Control.send("CST")
}
Control.cstWrite = function (cst) {
    cst = cst.split(":")
    Control.send("CST:H:" + cst[0] + ":M:" + cst[1] + ":S:" + cst[2])
}
Control.dateRead = function () {
    Control.send("DATE")
}
Control.dateWrite = function (date) {
    Control.send("DATE:" + date)
}
Control.timeRead = function () {
    Control.send("TIME")
}
Control.timeWrite = function (time) {
    Control.send("TIME:" + time)
}
Control.svrRead = function () {
    Control.send("SVR")
}
Control.systemtimeWrite = function (systemtime) {
    Control.send("TIME:" + systemtime)
}
Control.wmsRead = function () {
    Control.send("WMS")
}
Control.wmsWrite = function (wms1,wms2) {
    Control.send("WMS:" + wms1 + wms2)
}
Control.dmsRead = function () {
    Control.send("DMS")
}
Control.dmsWrite = function (dms) {
    Control.send("DMS:" + dms)
}
Control.voiceRead = function () {
    Control.send("PAS")
}
Control.voiceWrite = function (params,a) {
	//!!!!!!!!!!1
	//var a=$('input[name="01"]:checked ').val();
	//var p;
	//console.log(a1)
	//if(a=="on"){
		//p=$URL.decode(params.voicedata1);//str2gbk('你好123');
		//p=new TextDecoder('gbk').decode(params.voicedata1)//ch2Unicdoe(params.voicedata1);
		//var p2=$URL.decode(params.voicedata1);+p2
		//Control.send("PAS:01:" + p+":");}
		Control.send("PAS:"+a+":" + params);
	/*var str=a.split(";");
	if(str[0]=="on"){Control.send("PAS:01:" + toGbkBytes(params.voicedata1));}
	if(str[1]=="on"){Control.send("PAS:02:" + toGbkBytes(params.voicedata2));}
	if(str[2]=="on"){Control.send("PAS:03:" + toGbkBytes(params.voicedata3));}
	if(str[3]=="on"){Control.send("PAS:04:" + toGbkBytes(params.voicedata4));}
	if(str[4]=="on"){Control.send("PAS:05:" + toGbkBytes(params.voicedata5));}
	if(str[5]=="on"){Control.send("PAS:06:" + toGbkBytes(params.voicedata6));}
	if(str[6]=="on"){Control.send("PAS:07:" + toGbkBytes(params.voicedata7));}
	if(str[7]=="on"){Control.send("PAS:08:" + toGbkBytes(params.voicedata8));}
	if(str[8]=="on"){Control.send("PAS:09:" + toGbkBytes(params.voicedata9));}*/
}
Control.avsRead = function () {
    Control.send("AVS")
}
Control.avsWrite = function (params,a) {
	//!!!!!!!!!!1
	//var a=$('input[name="01"]:checked ').val();
	//var p;
	//console.log(a1)
	//if(a=="on"){
		//p=$URL.decode(params.voicedata1);//str2gbk('你好123');
		//p=new TextDecoder('gbk').decode(params.voicedata1)//ch2Unicdoe(params.voicedata1);
		//var p2=$URL.decode(params.voicedata1);+p2
		//Control.send("PAS:01:" + p+":");}
	console.log(a);
	var str=a.split(";");console.log(str[0]);console.log(str[1]);console.log(str[2]);console.log(str[3]);
	if(str[0]=="on"){Control.send("AVS:01:" + params.avs01_1+":"+params.avs01_2+":"+params.avs01_3+":"+params.avs01_4+":&");}
	if(str[1]=="on"){Control.send("AVS:02:" + params.avs02_1+":"+params.avs02_2+":"+params.avs02_3+":"+params.avs02_4+":&");}
	if(str[2]=="on"){Control.send("AVS:03:" + params.avs03_1+":"+params.avs03_2+":"+params.avs03_3+":"+params.avs03_4+":&");}
	if(str[3]=="on"){Control.send("AVS:04:" + params.avs04_1+":"+params.avs04_2+":"+params.avs04_3+":"+params.avs04_4+":&");}
	if(str[4]=="on"){Control.send("AVS:05:" + params.avs05_1+":"+params.avs05_2+":"+params.avs05_3+":"+params.avs05_4+":&");}
	
}
Control.locationRead = function () {
    Control.send("rrpc:getlocation")
}
Control.csqRead = function () {
    Control.send("rrpc:getcsq")
}
Control.iccidRead = function () {
    Control.send("rrpc:geticcid")
}
Control.imeiRead = function () {
    Control.send("rrpc:getimei")
}
Control.dtuWrite = function (params) {
    //Control.send("config," + params.id + "," + params.protocol + "," + params.ping + "," + params.ip + "," + params.port + "," + params.uid)
    if(params.dtuchannel=="1"||params.dtuchannel=="2"||params.dtuchannel=="3")
    {Control.send("config:"+params.dtuchannel+",tcp"+",0000,300,"+params.dtuIp+","+params.dtuPort+","+"1")
    }else if(params.dtuchannel=="4"||params.dtuchannel=="5")  {
	Control.send("config:"+params.dtuchannel+",udp"+",0000,300,"+params.dtuIp+","+params.dtuPort+","+"2")
	}
	else if(params.dtuchannel=="6"||params.dtuchannel=="7")  {//config,1,mqtt,30,1800,180.97.80.55,1883,,,1,/company/service/,/company/device/,0,1,1
	Control.send("config:"+params.dtuchannel+",mqtt"+",300,1800,"+params.dtuIp+","+params.dtuPort+","+params.mqttadmin+","+params.mqttpassword+",1,,"+params.mqttmessage+",1,0,2,"+params.mqttclientID+",1,tcp,"+"2")
	}
}
Control.dtuReceive = function (params) {
    //Control.send("config," + params.id + "," + params.protocol + "," + params.ping + "," + params.ip + "," + params.port + "," + params.uid)
    Control.send("config:0,1,0,0,0,30,0,1,25,normal,1234567890,25,0")
	//config,0,1,0,0,0,100,0,1,500,normal,1234567890,50,1
	setTimeout( function(){
		Control.send("rrpc:reboot")
	}, 500 );
}
Control.dtuRead= function (channel) {
    //Control.send("config," + params.id + "," + params.protocol + "," + params.ping + "," + params.ip + "," + params.port + "," + params.uid)
    //Control.send("config,0,1,0,0,0,30,0,1,25,normal,1234567890,25,0")
	//config,0,1,0,0,0,100,0,1,500,normal,1234567890,50,1
	
	dtuFill(tns,channel);
}

dtuFill= function (tns,channel) {
	const Params = {
				type: 'object',
				"dtuIp":"","dtuPort":"","mqttadmin":"","mqttpassword":"",
				"mqttmessage":"","mqttclientID":"",
				};
	layui.use('form', function () {
    	var form = layui.form;
        form.val("basicParams", JSON.parse(JSON.stringify(Params)));
        form.render();
        });
        var dtuParams = remoteDetail.dtu(tns,channel);
    	layui.use('form', function () {
            var form = layui.form;
            form.val("basicParams", JSON.parse(JSON.stringify(dtuParams[0])));
            form.render();
        });
    }

Control.channelRead = function (channel) {
    Control.send("CSP:"+channel)
}
Control.analogWrite = function (params) {
    Control.send("CSP:" + params.csp + ":S:" + params.csps + ":A:" + params.cspa + ":T:" + params.cspt + ":P:" + params.cspp12 + params.cspp3 + ":K:" + params.cspk + ":B:" + params.cspb)
}
Control.pulseWrite = function (params) {
    Control.send("CSP:" + params.csp_pulse + ":S:" + params.pcsps + ":A:" + params.pcspa + ":T:2:P:" + params.pcspp12 + params.pcspp3 + ":K:" + params.pcspk + ":B:" + params.pcspb)
}
Control.relayWrite = function (params) {
    Control.send("CSP:07" + ":S:"+params.csp_j + ":A:" + params.cspa_j + ":T:A:P:***" + ":K:+" + params.connect.substring(0, 2) + params.connect.substring(3, 5) + params.connect.substring(6, 8) + ".0:B:+" + params.disconnect.substring(0, 2) + params.disconnect.substring(3, 5) + params.disconnect.substring(6, 8) + ".0")
}
Control.csmRead = function (channel) {
    Control.send("CSM:" + channel)
}
Control.csmWrite = function (params) {
	Control.send("CSM:" + params.csm + ":S:" + params.csms + ":A:" + params.csma + ":P:" + params.csmp0_1 + params.csmp0_2 + "|" + params.csmp1_1 + params.csmp1_2 + "|" + params.csmp2_1 + params.csmp2_2 + "|" + "00" + "|" + "00" + ":B:" + params.csmb + ":M:" + params.csmm + ":R:" + params.csmr + ":N:" + params.csmn)
}
Control.jizhiRead = function (channel) {
    Control.send("CSP:"+channel)
}
Control.jizhiWrite = function (params) {
	var a=parseInt (params.csm)+7;
    if(a<10){a="0"+a;}
    Control.send("CSP:"+a+":S:"+params.jizhiadd+":A:"+params.csma+":T:A:P:***"+":K:" + params.jizhi + ":B:" + params.jizhi)
}
getTime = function(){
	var myDate = new Date()	//创建Date对象
    var Y = myDate.getFullYear()   //获取当前完整年份
    var M = myDate.getMonth() + 1  //获取当前月份
    var D = myDate.getDate()   //获取当前日1-31
    var H = myDate.getHours()  //获取当前小时
    var i = myDate.getMinutes()    //获取当前分钟
    var s = myDate.getSeconds()    //获取当前秒数
    if(M < 10){
        M = '0' + M
    }
    if(D < 10){
        D = '0' + D
    }
    if(H < 10){
        H = '0' + H
    }
    if(i < 10){
        i = '0' + i
    }
    if(s < 10){
        s = '0' +s
    }
    return Y+'-'+M+'-'+D+' '+H+':'+i+':'+s
}