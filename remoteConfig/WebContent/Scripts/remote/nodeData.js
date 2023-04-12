$(function () {
	//node = window.parent.node;
	//window.alert(node.terminalNum);
	//node = remoteDetail.basic(node.tns)[0];
     //   window.alert(node.terminalNum);
    //if (node.terminalNum) {
        
   //} else {
        
    //}
    
    
    //系统时间
    Date.prototype.format = function (fmt) {
        var o = {
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds() //秒
        };
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    document.getElementById('systemtime').value = (new Date()).format('hh:mm:ss');
    setInterval("document.getElementById('systemtime').value = (new Date()).format('hh:mm:ss');", 1000);
    // 在线状态
    //console.log(node.svr);
    if (node.isOnline == "1") {
	 
        $("#isonline")[0].innerHTML = "在线";
        $("#isonline").css("color","green");
    } else {
        $("#isonline")[0].innerHTML = "离线";
    }
    var ssvr=node.svr;
    if(ssvr)
    {var a=ssvr.split("-");
    if (a[0]=="CR120") {
		$("#dtutype")[0].innerHTML = "遥测终端("+a[2]+")";
    } else if(a[0]=="CR680"){
        $("#dtutype")[0].innerHTML = "预警广播终端";
    }}
    
    // 设备基本信息
    basicFill = function (node) {
	if(node.lantitude.length>8)
	{$("#Lantitude")[0].innerHTML = "经度: "+node.lantitude.substring(0,8);	}
	else
	{$("#Lantitude")[0].innerHTML = "经度: "+node.lantitude;}
	if(node.lantitude.length>8)
	{$("#Longitude")[0].innerHTML = "纬度: "+node.longitude.substring(0,8);	}
	else
	{$("#Longitude")[0].innerHTML = "纬度: "+node.longitude;}
        
    	
    	$("#terminalNum")[0].innerHTML = "设备编号: "+node.terminalNum;
    	$("#description")[0].innerHTML = "备注: "+node.description;
    	$("#SVR")[0].innerHTML = "版本: "+node.svr;
    	$("#voltage")[0].innerHTML = "电压: "+node.voltage+" V";
    	//$("#rid")[0].innerHTML = node.rid;
        //$("#svr")[0].innerHTML = "软件版本：" + node.svr +"<i class='layui-icon layui-icon-refresh' style='margin-left:10px'></i>";
        $(".layui-icon-refresh").on("click",function(){
            Control.svr();
        })
        //其它平台参数
        var dms = $("#dms input");
        dms.each(function () {
            $(this).attr("checked", false);
        })
        $(dms[parseInt(node.dms) - 1]).attr("checked", true);
    }
    basicFill(node);
});