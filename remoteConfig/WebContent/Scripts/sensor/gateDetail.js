var gateDetail = {};
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;
gateDetail.getallbytime = function(){
	var length=0;
	var gateDetail=new Array();
	var gate=null;
	var timer=null;
	timer = setInterval(function(){
	$.ajax({
		type: "GET",
		url: "../sensor/GateLoadInfo",
		dataType: "json",
		async:false,
		success: function (result) {
			var Pnum = document.getElementById("Pnum");
			var strArr = Pnum.innerText.split("：");
			var StatusCode="";
			length=result.total;
	      	gateDetail=result.rows;
	      	console.log(gateDetail);
	      	for(i=0;i<length;i++){
 				if(gateDetail[i].gateNum==strArr[1])
 					{StatusCode=gateDetail[i].statusCode;
 					document.getElementById("now").style.height=gateDetail[i].openDegreeStatus+"%";
 					//$("#kaidu").html($("#kaidu").innerText+"("+gateDetailM[i].openDegreeStatus+"%"+")");
 					$("#controltime").html("上次控制时间:"+gateDetail[i].contrTime);
 					$("#Status").html(gateDetail[i].status);
 					$.cookie("percent",gateDetail[i].openDegreeStatus+"%");
   				 if(gateDetail[i].status=="离线")
   					 {document.getElementById("statusimg").src="../Content/images/unnomal.png";}
   				 else
   					 {document.getElementById("statusimg").src="../Content/images/nomal.png";}}
 			}
 			Status(StatusCode);
 			$("#list_data").datagrid("reload");
	      	
		}

	});
  	console.log(length);
	return gateDetail;
	},2000)
};


gateDetail.getall = function(){
	var length=0;
	var gateDetail=new Array();
	var gate=null;
	$.ajax({
		type: "GET",
		url: "../sensor/GateLoadInfo",
		dataType: "json",
		async:false,
		success: function (result) {
			var Pnum = document.getElementById("Pnum");
			var strArr = Pnum.innerText.split("：");
			var StatusCode="";
			length=result.total;
	      	gateDetail=result.rows;
	      	console.log(gateDetail);
	      	for(i=0;i<length;i++){
 				if(gateDetail[i].gateNum==strArr[1])
 					{
 						StatusCode=gateDetail[i].statusCode;
 						document.getElementById("picture").src=gateDetail[i].picture;
 						
 					}
 			}
 			Status(StatusCode);
		}

	});
	//console.log(queryData);
  	console.log(length);
	return gateDetail;
};
function Status(statu){
	switch(statu.charAt(0))
		{
	case '0':document.getElementById("img04").src="../Content/images/nomal.png";break;
	case '1':document.getElementById("img04").src="../Content/images/unnomal.png";break;	
		}
	switch(statu.charAt(1))
	{
	case '1':
	{
		document.getElementById("img01").src="../Content/images/unnomal.png";
		document.getElementById("img02").src="../Content/images/nomal.png";
		break;
	}
	case '2':
	{
		document.getElementById("img01").src="../Content/images/nomal.png";
		document.getElementById("img02").src="../Content/images/unnomal.png";
		break;
	}	
	case '0':
	{
		document.getElementById("img01").src="../Content/images/nomal.png";
		document.getElementById("img02").src="../Content/images/nomal.png";
		break;
	}
	}
	
};
gateDetail.getallbytimeM = function(){
	//var queryData = {GateNum:GateNum};
	var length=0;
	var gateDetailM=new Array();
	var gate=null;
	var timer=null;
	timer = setInterval(function(){
	$.ajax({
		type: "GET",
		url: "../sensor/GateLoadInfo",
		dataType: "json",
		async:false,
		success: function (result) {
			var Pnum = document.getElementById("Pnum");
			var strArr = Pnum.innerText.split("：");
			var StatusCode="";
			length=result.total;
	      	gateDetailM=result.rows;
	      	console.log(gateDetailM);
	      	for(i=0;i<length;i++){
 				if(gateDetailM[i].gateNum==strArr[1])
 					{
 						document.getElementById("now").style.width=gateDetailM[i].openDegreeStatus+"%";
 						StatusCode=gateDetailM[i].statusCode;
 						$("#controltime").html(gateDetailM[i].contrTime);
 						$("#Status").html(gateDetailM[i].status);
 						//$("#kaidu").html($("#kaidu").innerText+"("+gateDetailM[i].openDegreeStatus+"%"+")");
 						$.cookie("percent",gateDetailM[i].openDegreeStatus+"%");
 					}
 			}
 			StatusM(StatusCode);
 			$("#list_data").datagrid("reload");
		}

	});
  	console.log(length);
	return gateDetailM;
	},2000)
};


gateDetail.getallM = function(){
	//var queryData = {GateNum:GateNum};
	var length=0;
	var gateDetailM=new Array();
	var gate=null;
	$.ajax({
		type: "GET",
		url: "../sensor/GateLoadInfo",
		dataType: "json",
		async:false,
		success: function (result) {
			var Pnum = document.getElementById("Pnum");
			var strArr = Pnum.innerText.split("：");
			var StatusCode="";
			length=result.total;
	      	gateDetailM=result.rows;
	      	console.log(gateDetailM);
	      	for(i=0;i<length;i++){
 				if(gateDetailM[i].gateNum==strArr[1])
 					{
 						StatusCode=gateDetailM[i].statusCode;
 						document.getElementById("picture").src=gateDetailM[i].picture;
 						
 					}
 			}
 			//Status(StatusCode);
 			StatusM(StatusCode);
		}

	});
	//console.log(queryData);
  	console.log(length);
	return gateDetailM;
};

function StatusM(statu){
	switch(statu.charAt(0))
		{
	case '0':{
		switch(statu.charAt(1))
		{
		case '1':
		{
			document.getElementById("zhuangtai").innerText="上限位";
			document.getElementById("zhuangtai").style.color="red";
			break;
		}
		case '2':
		{
			document.getElementById("zhuangtai").innerText="下限位";
			document.getElementById("zhuangtai").style.color="red";
			break;
		}	
		case '0':
		{
			switch(statu.charAt(2))
			{
			case '0':{document.getElementById("zhuangtai").innerText="正常";
			document.getElementById("zhuangtai").style.color="black";break;}
			case '1':{document.getElementById("zhuangtai").innerText="开闸中";
			document.getElementById("zhuangtai").style.color="black";break;}
			case '2':{document.getElementById("zhuangtai").innerText="关闸中";
			document.getElementById("zhuangtai").style.color="black";break;}			
			}
			break;	
		}
		
		}
		break;
		
	}
	case '1':{
	document.getElementById("zhuangtai").innerText="故障";
	document.getElementById("zhuangtai").style.color="red";
	break;}
		}

	
};
function siltationPrevent() {
    layer_show("添加时间", "../Sensor/PreventSiltation.html", '', '300');
}