var mapIndex = {};

var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;







mapIndex.searchMarker=function(node){
	var sensorNumber=node.num;
	if((sensorNumber.indexOf("1_JD_"))>-1){
		var a=sensorNumber.split("_");
		console.log(a[2]);
		sensorNumber="0878-GX-1AA000"+a[2];
	}

	console.log(sensorNumber);
	 var length=0;
	 searchMarker=new Array();
	$.ajax({
	      type: "GET",
	      url: root+"/map/MapLoadList",
	      dataType: "json",
	      async:false,
	      success: function (result) {
	     length=result.total;
	      	for(var k=0;k<length&&result.rows[k].sensorNum!==sensorNumber;k++);
	      	searchMarker=result.rows[k];
	      }

	});
	return searchMarker;
};


mapIndex.map_Marker=function(node){//页面跳转
	var sensorNumber=node;
	console.log(sensorNumber);
	 var length=0;
	 searchMarker=new Array();
	$.ajax({
	      type: "GET",
	      url: root+"/map/MapLoadList",
	      dataType: "json",
	      async:false,
	      success: function (result) {
	     length=result.total;
	      	for(var k=0;k<length&&result.rows[k].sensorNum!==sensorNumber;k++);
	      	searchMarker=result.rows[k];
	      }

	});
	return searchMarker;
};

mapIndex.getdata=function(){  
	  var length=0;
      var Inglats=new String("],");
	$.ajax({
	      type: "GET",
	      url: root+"/map/MapLoadList",
	      dataType: "json",
	      async:false,
	      success: function (result) {
	    	  length=result.total;
	    	  console.log("I am here");
	      	console.log("length="+length);
	      	for(var k=0;k<length;k++)
	      	{
	      		Inglats=Inglats.concat("[",result.rows[k].longtitude,",",result.rows[k].latitude,"],");
	      	}
	      	var num=Inglats.length;
	      	Inglats=Inglats.substr(0,num-1)
	      	Inglats=Inglats.concat(",[");
	      	//console.log(Inglats);
	      }

	});
		return Inglats;
};



mapIndex.getDetail=function(){
	var length=0;
	detail=new Array();
	$.ajax({
	      type: "GET",
	      url: root+"/map/MapLoadList",
	      dataType: "json",
	      async:false,
	      success: function (result) {
	     length=result.total;
	     console.log(result);
	     detail=result;
	      	for(var k=0;k<length;k++)
	      	{
	      		
	      	}
	      	
	      }
	
	});
	
return detail;
	
	
};

mapIndex.findSensor=function(node){
	var queryData={node:node};
	NO=new Array();
	$.ajax({
	      type: "POST",
	      url: root+"/map/MapfindSensors",
	      data: queryData,
	      async:false,
	      success: function (result) {
	     
	     NO=result;
	      	
	      	
	      }
	
	});
	return NO;
	
};

mapIndex.updateGNSSofLFTB=function(){
	$.ajax({
		  type: "GET",
	      url: root+"/map/updateGNSSofLFTB",
	      async:false,
	      success: function () {
	     console.log("云南GNSS数据更新完毕");
	     
	      	
	      	
	      }
	
	});
	
}


