var JCDEQ = {};

var seleqbh = "";
var seletype = "";
var seleqname = "";
var queryData = null;

//chartoption
var chartop = null;


//预警阀值
var yjfzsetting = null;
var lastmax = null;
var lastmin = null;
var yjfzid = null;
var lvbo = "1";
var yjfznum = 0;
var displaymode = "spline";


JCDEQ.GetEQTree = function (etype,eqbh) {
	         var iconCls = "yl"
	         if(etype=="GNSS"){
	        	 iconCls ="wy";
	         }
	         
             
             if(etype=="GNSS")
            	 {
            	 treedata =[{"id":eqbh,"text":etype,"iconCls":iconCls,"state":"open","level":"1","eqtype":etype,"gkpos":null}]
            	 }
             else
            	 {
            	 treedata =[{"id":eqbh,"text":etype,"iconCls":iconCls,"state":"open","level":"1","eqtype":etype,"gkpos":null},
                     {"id":eqbh,"text":"电池电压","iconCls":iconCls,"state":"open","level":"1","eqtype":"电压","gkpos":null}]
          
            	 }
                       
             $('#eqtree').tree({
                data: treedata,
                checkbox: false,
                onSelect: function (node) {
                    if (node) {
                        seleqbh = node.id;
                        seletype = node.eqtype;
                        seleqname = node.text;


                        //根据仪器设备类型获取不同页面的分部视图
                        JCDEQ.InitLayout();
                    }
                },
                onLoadSuccess: function (node, data) {

                    //默认选中第一个节点
                    var rt = $('#eqtree').tree('getRoot');
                    if (rt) {
                        var tnode = {};
                        var fun = function (node) {
                            var ttn;
                            if (node.level == 1) {
                                return node;
                            } else {
                                return null;;
                            }
                        }
                        tnode = fun(rt);
                        if (tnode) {
                            var node = $('#eqtree').tree('find', tnode.id);
                            $('#eqtree').tree('select', node.target);
                        }
                    }
                }
            });

};


//获取仪器的最后预警时间和预警阀值信息
JCDEQ.GetLastYJFZ = function () {

    $.ajax({
        type: 'GET',
        url: '../Sensor/GetLastYJFZ',
        async: false,
        cache: false,
        data: { eqbh: seleqbh },
        success: function (result) {
        	var result= eval("(" + result + ")");
            $("#txtstartime").val(result['stime']);
            $("#txtendtime").val(result['etime']);
            $("#yjtime").val(result['yjtime']);
            $("#yjfz").val(result['yjfazhi']);
            yjfzsetting = result['yjfzsetting'];  
            //console.log(Math.sqrt(Math.pow(yjfzsetting[0],2)+Math.pow(yjfzsetting[1],2)));
        }
    });
};


//初始化时间
JCDEQ.InitTime = function () {
    //时间默认值 参数天数
    var st = getBeforeDate(7);
    alert(st);
    var et = CurentTime();

    $("#txtstartime").val(st);
    $("#txtendtime").val(et);
};

//查询按钮事件
function btnserarch() {
	
	displaymode = $("input[name='connectmode']:checked").val();
   // console.log(seletype);
    if (seletype == "雨量") {
        JCDEQ.SetChartDataYL();
        JCDEQ.InitGridYL();
    }   
    else if (seletype == "GPS位移" || seletype=="GNSS") {
        JCDEQ.SetChartDataGPSWY();
        JCDEQ.InitGridGPSWY();
    } else if (seletype == "倾斜"){
    	JCDEQ.SetChartDataQX();
        JCDEQ.InitGridQX();
    } else if (seletype == "深孔测斜"){
    	JCDEQ.SetChartDataSKCX();
        JCDEQ.InitGridSKCX();
    }else if (seletype == "沉降"){    	
        JCDEQ.SetChartDataCJ();
        JCDEQ.InitGridCJ();
    }else if (seletype == "加速度传感器"){    	
    	JCDEQ.SetChartDataJSD();
        JCDEQ.InitGridJSD();
    }
    else {       
        JCDEQ.SetChartDataCommon();
        JCDEQ.InitGridCommon();
        
    }
};

JCDEQ.InitLayout = function () {

    var requrl = '../Sensor/PartCommon.html';
    if (seletype == "雨量") {
        requrl = '../Sensor/PartYL.html';
    }
    else if (seletype == "GPS位移" || seletype=="GNSS" ) {
        requrl = '../Sensor/PartGPSWY.html';
    }
    else if (seletype == "倾斜") {
    	requrl = '../Sensor/PartQX.html';
    }
    else if (seletype == "深孔测斜")
    {
    	requrl = '../Sensor/PartSKCX.html';
    }
    else if(seletype == "加速度传感器"){
    	requrl = '../Sensor/PartJSD.html';
    }
    else {
        requrl = '../Sensor/PartCommon.html';
    }
    

    $.ajax({
        type: "POST",
        url: requrl,
        async: false,
        success: function (data) {
            //获取分部视图的页面内容替换到 conright div中
            $('.conright').html(data);

            //显示预警阀值  切换gps位移 降雨量
            JCDEQ.InitiCheck();

            //查询开始 结束时间 预警时间
            JCDEQ.GetLastYJFZ();
            
            if (seletype == "雨量") {
                JCDEQ.InitYL();
            }
            
            else if (seletype == "GPS位移"|| seletype=="GNSS" ) {
                JCDEQ.InitGPSWY();
            }
            else if (seletype == "倾斜") {
                JCDEQ.InitQX();
            }
            else if (seletype == "深孔测斜") {
                JCDEQ.InitSKCX();
            }
            else if (seletype == "沉降") {
                JCDEQ.InitCJ();
            }
            else if(seletype == "加速度传感器"){
            	JCDEQ.InitJSD();
            } 
            else {
                JCDEQ.InitCommon();
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

};



//初始化界面
JCDEQ.InitYL = function () {
	
    JCDEQ.InitChartOptionCommon();
    JCDEQ.SetChartDataYL();
    JCDEQ.InitGridYL();

};

JCDEQ.InitJSD = function(){
	JCDEQ.InitChartOptionCommon();
    JCDEQ.SetChartDataJSD();
    JCDEQ.InitGridJSD();
}

JCDEQ.InitGPSWY = function () {

    JCDEQ.InitChartOptionCommon();
    JCDEQ.SetChartDataGPSWY();
    JCDEQ.InitGridGPSWY();

};
JCDEQ.InitQX = function () {

    JCDEQ.InitChartOptionCommon();
    JCDEQ.SetChartDataQX();
    JCDEQ.InitGridQX();

};
JCDEQ.InitSKCX = function () {

    JCDEQ.InitChartOptionCommon();
    JCDEQ.SetChartDataSKCX();
    JCDEQ.InitGridSKCX();

};

JCDEQ.InitCJ = function(){
	JCDEQ.InitChartOptionCommon();
    JCDEQ.SetChartDataCJ();
    JCDEQ.InitGridCJ();
};

JCDEQ.InitCommon = function () {  
	JCDEQ.InitChartOptionCommon();
	JCDEQ.SetChartDataCommon();
	JCDEQ.InitGridCommon();    
};


//初始化ChartOption
JCDEQ.InitChartOptionCommon = function () {
    chartop = {
        chart: {
            renderTo: 'chart',
            zoomType: 'x'
        },
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        title: {
            text: '',
            y: 20,//竖直方向偏移
            style: {
                fontFamily: 'Microsoft YaHei',
                //fontWeight: 'bold',
                fontSize: '14px'
            }
        },
        lang: {
            noData: ""
        },
        credits: {
            enabled: false
        }, exporting: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            maxZoom: 24 * 3600000, // fourteen days
            title: {
                text: null
            },
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%m-%d',
                year: '%Y'
            }
        },
        yAxis: {
            opposite: false,//显示到左边 默认显示到右边
            offset: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            shared: true,
            formatter: tipformatter,
            positioner: function (labelWidth, labelHeight, point) {
                return { x: point.plotX, y: point.plotY + 10 };
            }
        },
        legend: {
            enabled: true,
            align: 'right',
            y: 20,
            layout: 'horizontal',
            verticalAlign: 'top'
        },
       
        series: []
    }
    var chart1 = new Highcharts.Chart(chartop);
    $("#btnchartzoomin").show();
    $("#btnchartzoomout").hide();



};

JCDEQ.SetChartDataCJ = function () {

    var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示

    //查询参数
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        interval: $("input[name='interval']:checked").val(), //显示间隔
        lvbo: lvbo
    };

    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadCommonChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {    
        	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":displaymode
        	}]
            chartop.series = series
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';
            //chartop.subtitle.useHTML = true;
            //chartop.subtitle.align = 'left';
            //chartop.subtitle.text= 'and put <button id="b2">Other button</button> here ';
    		
           
            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {

                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            
            var chart = new Highcharts.Chart(chartop);
            chart.hideLoading();//隐藏加载提示
        }
    });


};

//Chart赋值
JCDEQ.SetChartDataCommon = function () {

    var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示

    //查询参数
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        interval: $("input[name='interval']:checked").val(), //显示间隔
        lvbo: lvbo
    };

    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadCommonChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {    
        	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":displaymode
        	}]
            chartop.series = series
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';
           
            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {

                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            
            var chart = new Highcharts.Chart(chartop);
            chart.hideLoading();//隐藏加载提示
        }
    });


};

JCDEQ.SetChartDataSKCX = function(){
	var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示

    //查询参数
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        skcxlx: $("input[name='skcxlx']:checked").val() ,//深孔测斜x/y
        interval: $("input[name='interval']:checked").val(), //显示间隔
        lvbo: lvbo
    };

    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadSKCXChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {    
        	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":displaymode
        	}]
            chartop.series = series
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';
           
            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {

                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            
            var chart = new Highcharts.Chart(chartop);
            chart.hideLoading();//隐藏加载提示
        }
    });
	
};

JCDEQ.SetChartDataYL = function () {

    var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示


    //查询参数
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        jyzb: $("input[name='jyzb']:checked").val(), //降雨指标
        
    };
    //雨量
    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadYLChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {
        	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":"column"
        	}]
            chartop.series = series;
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';
            //chartop.xAxis.labels.formatter= function(){return this.values;}
            
            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {

                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            var chart = new Highcharts.Chart(chartop);;
            chart.hideLoading();//隐藏加载提示
        }
    });

};

JCDEQ.SetChartDataJSD = function(){
	
    var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示
    //查询参数   
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        wyzb: $("input[name='jx']:checked").val(), //加速度指标
        interval: $("input[name='interval']:checked").val(), //显示间隔
        lvbo: lvbo
    };
   
    //倾斜
    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadJSDChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {
         	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":displaymode
        	}]
            chartop.series = series;
            //chartop.series = data.data;
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';
            
            
            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {
                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            var chart = new Highcharts.Chart(chartop);;
            chart.hideLoading();//隐藏加载提示
        }
    });

};
JCDEQ.SetChartDataQX = function () {

    var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示
    //查询参数   
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        wyzb: $("input[name='qx']:checked").val(), //倾斜指标
        interval: $("input[name='interval']:checked").val(), //显示间隔
        lvbo: lvbo
    };
   
    //倾斜
    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadQXChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {
         	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":displaymode
        	}]
            chartop.series = series;
            //chartop.series = data.data;
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';
            
            
            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {
                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            var chart = new Highcharts.Chart(chartop);;
            chart.hideLoading();//隐藏加载提示
        }
    });
};
JCDEQ.SetChartDataGPSWY = function () {

    var chart = $('#chart').highcharts();
    chart.showLoading('正在获取....');//显示加载提示
    //查询参数
    queryData = {
        st: $("#txtstartime").val(),
        et: $("#txtendtime").val(),
        eqbh: seleqbh,
        eqtype: seletype,
        eqname: seleqname,
        wyzb: $("input[name='gps']:checked").val(), //位移指标
        interval: $("input[name='interval']:checked").val() //显示间隔
    };
    //GPS
    $.ajax({
        type: 'POST',
        url: '../Sensor/LoadGPSWYChartData',
        async: true,
        cache: false,
        data: queryData,
        dataType: "json",
        success: function (data) {
        	
         	var length = data.data[0].data.length;
        	var list=data.data[0].data;
        	var alldata1=[];
        	for(i = 0;i<length;i++){
        		time = list[i][0];
        		data1 = list[i][1];
        		var someDate = new Date(Date.parse(time));  
                var tms=Date.UTC(someDate.getFullYear(), someDate.getMonth(), someDate.getDate(), someDate.getHours(),someDate.getMinutes());  
                alldata1.push([tms,data1]);       	
        	}
        	//console.log(data.data);
        	//console.log(alldata1);
        	var series =[{
        		name:'data',
        		data:alldata1,
        		"type":displaymode
        	}]
            chartop.series = series;
            //chartop.series = data.data;
            chartop.title.text = seleqname + '监测数据曲线图';
            chartop.yAxis.title.text = seletype + '(' + GetEqUnit(seletype) + ')';

            //设置曲线y轴的最大值和最小值
            if (data.maxvalue != "" && data.minvalue != "") {

                chartop.yAxis.min = data.minvalue;
                chartop.yAxis.max = data.maxvalue;
            }
            var chart = new Highcharts.Chart(chartop);
            
            chart.hideLoading();//隐藏加载提示
        }
    });
};

//Grid表格赋值
JCDEQ.InitGridCommon = function () {

    if (seletype == "断线仪") {
        //查询参数
        queryData = {
            st: $("#txtstartime").val(),
            et: $("#txtendtime").val(),
            eqbh: seleqbh,
            eqtype: seletype,
            eqname: seleqname
        };
    }
    var title1 = '监测值(' + GetEqUnit(seletype) + ')';
    var columns = [{ field: 'RData', title: title1, width: 160 }];
    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 760,
        height: 'auto',
        nowrap: false,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        fit: true, //自动大小   
        url: '../Sensor/LoadCommonGridData',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        frozenColumns: [[//冻结列
          { field: 'ID', title: '编号', hidden: true },
          { field: 'RTime', title: '监测时间', width: 160 }
        ]],
        columns: [columns],
        onLoadSuccess: function (data) {
            if (data.rows.length == 0) {
                //var body = $(this).data().datagrid.dc.body2;
                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
            }
            else {
                $('#list_data').datagrid("selectRow", 0);
            }
        }
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
            iconCls: 'icon-export',
            text: '导出Excel',
            handler: function () { exportexcel(queryData); }
        }]
    });

};

JCDEQ.InitGridCJ = function(){

	 var columns = [{ field: 'RData', title: '监测值(mm)', width: 80 },
		 			{ field: 'DData', title: '变化量(mm)', width: 80 }
		 ];	
	    grid = $('#list_data').datagrid({
	        title: '',
	        iconCls: 'icon-view', //图标
	        loadMsg: "数据加载中，请稍后......",
	        width: 760,
	        height: 'auto',
	        nowrap: false,
	        striped: true,
	        border: true,
	        collapsible: false, //是否可折叠
	        fitColumns: true,
	        fit: true, //自动大小   
	        url: '../Sensor/LoadCJGridData',
	        queryParams: queryData,
	        pageNumber: 1, //默认显示第几页 
	        pageSize: 30,
	        pageList: [30, 50, 100],
	        remoteSort: false,
	        singleSelect: true,  //是否单选
	        pagination: true,  //分页控件
	        rownumbers: true,  //行号
	        frozenColumns: [[//冻结列
	          { field: 'ID', title: '编号', hidden: true },
	          { field: 'RTime', title: '监测时间', width: 160 }
	        ]],
	        columns: [columns],
	        onLoadSuccess: function (data) {
	            if (data.rows.length == 0) {
	                //var body = $(this).data().datagrid.dc.body2;
	                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
	            }
	            else {
	                $('#list_data').datagrid("selectRow", 0);
	            }
	        }
	    });

	    //设置分页控件
	    var p = $('#list_data').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '页     共{pages}页',
	        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
	        buttons: [{
	            iconCls: 'icon-export',
	            text: '导出Excel',
	            handler: function () { exportexcel(queryData); }
	        }]
	    });

};

JCDEQ.InitGridSKCX = function(){	
	 var columns = [{ field: 'RDatax', title: '△x(mm)', width: 80 },
		 			{ field: 'RDatay', title: '△y(mm)', width: 80 }
		 ];
	    grid = $('#list_data').datagrid({
	        title: '',
	        iconCls: 'icon-view', //图标
	        loadMsg: "数据加载中，请稍后......",
	        width: 760,
	        height: 'auto',
	        nowrap: false,
	        striped: true,
	        border: true,
	        collapsible: false, //是否可折叠
	        fitColumns: true,
	        fit: true, //自动大小   
	        url: '../Sensor/LoadSKCXGridData',
	        queryParams: queryData,
	        pageNumber: 1, //默认显示第几页 
	        pageSize: 30,
	        pageList: [30, 50, 100],
	        remoteSort: false,
	        singleSelect: true,  //是否单选
	        pagination: true,  //分页控件
	        rownumbers: true,  //行号
	        frozenColumns: [[//冻结列
	          { field: 'ID', title: '编号', hidden: true },
	          { field: 'RTime', title: '监测时间', width: 160 }
	        ]],
	        columns: [columns],
	        onLoadSuccess: function (data) {
	            if (data.rows.length == 0) {
	                //var body = $(this).data().datagrid.dc.body2;
	                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
	            }
	            else {
	                $('#list_data').datagrid("selectRow", 0);
	            }
	        }
	    });

	    //设置分页控件
	    var p = $('#list_data').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '页     共{pages}页',
	        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
	        buttons: [{
	            iconCls: 'icon-export',
	            text: '导出Excel',
	            handler: function () { exportexcel(queryData); }
	        }]
	    });
};

JCDEQ.InitGridYL = function () {

	var query_interval_input=$("input[name='jyzb']:checked").val();
	var query_interval="监测值(mm/5分钟)";
	if(query_interval_input=="0")  query_interval="监测值(mm/5分钟)";
	else if(query_interval_input=="0.5") query_interval="监测值(mm/30分钟)";
	else if(query_interval_input=="1") query_interval="监测值(mm/1小时)";
	else if(query_interval_input=="3") query_interval="监测值(mm/3小时)";
	else if(query_interval_input=="6") query_interval="监测值(mm/6小时)";
	else if(query_interval_input=="12") query_interval="监测值(mm/12小时)";
	else if(query_interval_input=="24") query_interval="监测值(mm/24小时)";
    var columns = [{ field: 'RData', title: query_interval, width: 160 }];      

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 760,
        height: 'auto',
        nowrap: false,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        fit: true, //自动大小   
        url: '../Sensor/LoadYLGridData',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        frozenColumns: [[//冻结列
          { field: 'ID', title: '编号', hidden: true },
          { field: 'RTime', title: '监测时间', width: 160 }
        ]],
        columns: [columns],
        onLoadSuccess: function (data) {
            if (data.rows.length == 0) {
                //var body = $(this).data().datagrid.dc.body2;
                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
            }
            else {
                $('#list_data').datagrid("selectRow", 0);
            }
        }
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
            iconCls: 'icon-export',
            text: '导出Excel',
            handler: function () { exportexcel(queryData); }
        }]
    });

};

JCDEQ.InitGridJSD = function() {
	
    var columns = [
    	{ field: 'JX', title: 'X(g)', align: 'center', width: 60 },
        { field: 'JY', title: 'Y(g)', align: 'center', width: 60 },
        { field: 'JZ', title: 'Z(g)', align: 'center', width: 60 }];

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 760,
        height: 'auto',
        nowrap: false,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        fit: true, //自动大小   
        url: '../Sensor/LoadJSDGridData',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        frozenColumns: [[//冻结列
          { field: 'ID', title: '编号', hidden: true },
          { field: 'JTime', title: '监测时间', width: 160 }
        ]],
        columns: [columns],
        onLoadSuccess: function (data) {
        	//console.log(data);
            if (data.rows.length == 0) {
                //var body = $(this).data().datagrid.dc.body2;
                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
            }
            else {
                $('#list_data').datagrid("selectRow", 0);
            }
        }
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
            iconCls: 'icon-export',
            text: '导出Excel',
            handler: function () { exportexcel(queryData); }
        }]
    });


};

JCDEQ.InitGridQX = function () {
	
    var columns = [
    	{ field: 'QX', title: 'X(°)', align: 'center', width: 60 },
        { field: 'QY', title: 'Y(°)', align: 'center', width: 60 },
        { field: 'QDX', title: '△X(°)', align: 'center', width: 60 },
        { field: 'QDY', title: '△Y(°)', align: 'center', width: 60 },
        { field: 'QDXY', title: '△XY(°)', align: 'center', width: 60 }];

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 760,
        height: 'auto',
        nowrap: false,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        fit: true, //自动大小   
        url: '../Sensor/LoadQXGridData',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        frozenColumns: [[//冻结列
          { field: 'ID', title: '编号', hidden: true },
          { field: 'QTime', title: '监测时间', width: 160 }
        ]],
        columns: [columns],
        onLoadSuccess: function (data) {
        	//console.log(data);
            if (data.rows.length == 0) {
                //var body = $(this).data().datagrid.dc.body2;
                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
            }
            else {
                $('#list_data').datagrid("selectRow", 0);
            }
        }
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
            iconCls: 'icon-export',
            text: '导出Excel',
            handler: function () { exportexcel(queryData); }
        }]
    });

};

JCDEQ.InitGridGPSWY = function () {


    var columns = [
    	{ field: 'X', title: 'X(mm)', align: 'center', width: 37.5 },
        { field: 'Y', title: 'Y(mm)', align: 'center', width: 37.5 },
        { field: 'H', title: 'H(mm)', align: 'center', width: 37.5 },
        { field: 'DX', title: '△X(mm)', align: 'center', width: 37.5 },
        { field: 'DY', title: '△Y(mm)', align: 'center', width: 37.5 },
        { field: 'DH', title: '△H(mm)', align: 'center', width: 37.5 },
        { field: 'DXY', title: '△XY(mm)', align: 'center', width: 37.5 },
        { field: 'DXYH', title: '△XYH(mm)', align: 'center', width: 37.5 }];

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 760,
        height: 'auto',
        nowrap: false,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        fit: true, //自动大小   
        url: '../Sensor/LoadGPSWYGridData',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        frozenColumns: [[//冻结列
          { field: 'ID', title: '编号', hidden: true },
          { field: 'Time', title: '监测时间', width: 160 }
        ]],
        columns: [columns],
        onLoadSuccess: function (data) {
            if (data.rows.length == 0) {
                //var body = $(this).data().datagrid.dc.body2;
                //body.find('table tbody').append('<tr><td style="height: 25px; text-align: center;" colspan="6">没有数据</td></tr>');
            }
            else {
                $('#list_data').datagrid("selectRow", 0);
            }
        }
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
            iconCls: 'icon-export',
            text: '导出Excel',
            handler: function () { exportexcel(queryData); }
        }]
    });

};

//初始化icheck控件
JCDEQ.InitiCheck = function () {
    $('.skin-minimal input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%'
    });

    //gps位移指标切换 降雨量指标切换事件
    $('.rightdown input').on('ifChecked', function (event) {
    	
    	displaymode = $("input[name='connectmode']:checked").val();
    	var x = document.getElementById("chkyjfz");
    	x.checked = false;
        $("#btnchartzoomin").show();
        $("#btnchartzoomout").hide();
        if (seletype == "雨量") {
            JCDEQ.SetChartDataYL();
            JCDEQ.InitGridYL();
        }        
        else if (seletype == "GPS位移" || seletype=="GNSS") {
            JCDEQ.SetChartDataGPSWY();
            JCDEQ.InitGridGPSWY();
        } else if (seletype == "倾斜"){
        	JCDEQ.SetChartDataQX();
            JCDEQ.InitGridQX();
        } else if (seletype == "深孔测斜"){
        	JCDEQ.SetChartDataSKCX();
            JCDEQ.InitGridSKCX();
        }else if (seletype == "沉降"){    	
            JCDEQ.SetChartDataCJ();
            JCDEQ.InitGridCJ();
        }else if (seletype == "加速度传感器"){    	
        	JCDEQ.SetChartDataJSD();
            JCDEQ.InitGridJSD();
        }
        else {
            if (seletype == "断线仪") {
                JCDEQ.InitGridCommon();
            }
            else {

                JCDEQ.SetChartDataCommon();
                JCDEQ.InitGridCommon();
            }
        }
                  
        
    });

}



function exportexcel(queryData) {       
	var url = "../Sensor/ExportSensorData";
    $.ajax({
        type: "POST",
        url: url,
        data: queryData,
        success: function (filename) {
        	if (filename != "") {
                var downUrl = '../Sensor/DownLoadFile?file=' + filename;
                window.location.href = downUrl;            	
            } else {
                alert("暂无数据可供导出!");
            }
        }
    });
     

}


function tipformatter() {
    //%m-%d
    if (seletype != "雨量") {
        return '' + Highcharts.dateFormat('时间：%m-%d %H:%M', this.x) + '<br>监测值：' + this.y + GetEqUnit(seletype);
    } else {
        var yl = $("input[name='jyzb']:checked").val();
        var d = parseInt(this.x) + yl * 3600 * 1000;
        if (yl == 24) {
            return '' + Highcharts.dateFormat('时间：%m-%d', this.x) + " 到 " + Highcharts.dateFormat('%m-%d', d) + '<br>监测值：' + this.y + "mm";
        } else {
            return '' + Highcharts.dateFormat('时间：%m-%d', this.x) + "(" + Highcharts.dateFormat('%H:%M', this.x) + " 到 " + Highcharts.dateFormat('%H:%M', d) + ")" + '<br>监测值：' + this.y + "mm";
        }
    }
};

JCDEQ.ClearResult = function () {

    chartop.series = [];
    chartop.title.text = "";
    var chart = new Highcharts.Chart(chartop);
    $('#warnfazhi input').iCheck('uncheck');
};

//显示列表
JCDEQ.ShowTable = function () {
	$('#list_data').datagrid('resize', {
		width: 716,
		height: 390
	});
        
	
	$(".chartcontainer").hide();
	$(".tablecontainer").show();
	$("#btnshowtable").hide();
	$("#btnshowchart").show();
	$("#btnchartzoomin").hide();
	$("#btnchartzoomout").hide();
	$(".checklvbo").hide();
	$(".checkyjfz").hide();
    
};

//显示曲线
JCDEQ.ShowChart = function () {

    $(".tablecontainer").hide();

    if (seletype == "倾斜" || seletype == "GNSS") {
        $(".chartcontainer").height(360);
        $(".highcharts-container").height(360);

    } else {
        $(".chartcontainer").height(380);
        $(".highcharts-container").height(380);
    }
    lvbo = "1";
    btnserarch();
    $(".tablecontainer").hide();
    $(".chartcontainer").show();
    $("#btnshowtable").show();
    $("#btnshowchart").hide();
    $("#btnchartzoomin").show();
    $("#btnchartzoomout").hide();
    $(".checklvbo").show();
    $(".checkyjfz").show();
    
    var yjfzchk = document.getElementById("chkyjfz");
    var lbochk = document.getElementById("chklb");
    yjfzchk.checked = false;
    lbochk.checked = true;

};
JCDEQ.ChartZoomIn = function(){

    $(".tablecontainer").hide();

    if (seletype == "倾斜" || seletype == "GNSS") {
        $(".chartcontainer").height(360);
        $(".highcharts-container").height(360);

    } else {
        $(".chartcontainer").height(380);
        $(".highcharts-container").height(380);
    }
    
    $(".tablecontainer").hide();
    $(".chartcontainer").show();
    $("#btnshowtable").show();
    $("#btnshowchart").hide();
    $("#btnchartzoomin").hide();
    $("#btnchartzoomout").show();
    $(".checklvbo").show();
    $(".checkyjfz").show();
    
    var chart = $('#chart').highcharts();
    var extremes = chart.yAxis[0].getExtremes();

    var chartmax = extremes.dataMax;
    var chartmin = extremes.dataMin;        
    var plotvaluemin = chartmin - (chartmax - chartmin)*3;
    var plotvaluemax = chartmax + (chartmax - chartmin)*2;
    chart.yAxis[0].addPlotLine({             //在Y轴上增加
    	color: 'grey',
        width: 1,
        value: plotvaluemin,  //y轴显示位置
        id: "plotline-zoom1", 
        
     });
    chart.yAxis[0].addPlotLine({             //在Y轴上增加
    	color: 'grey',
        width: 1,
        value: plotvaluemax,  //y轴显示位置
        id: "plotline-zoom2", 
        
     });
     
     //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
     yAxis = chart.yAxis[0];
     yAxis.options.startOnTick = false;
     yAxis.options.endOnTick = false;
     chart.yAxis[0].setExtremes(plotvaluemin, plotvaluemax);
     

};

JCDEQ.ChartZoomOut = function(){

    $(".tablecontainer").hide();

    if (seletype == "倾斜" || seletype == "GNSS") {
        $(".chartcontainer").height(360);
        $(".highcharts-container").height(360);

    } else {
        $(".chartcontainer").height(380);
        $(".highcharts-container").height(380);
    }
    btnserarch();
    $(".tablecontainer").hide();
    $(".chartcontainer").show();
    $("#btnshowtable").show();
    $("#btnshowchart").hide();
    $("#btnchartzoomin").show();
    $("#btnchartzoomout").hide();
    $(".checklvbo").show();
    $(".checkyjfz").show();
                   
    var chart = $('#chart').highcharts();
    chart.yAxis[0].removePlotLine("plotline-zoom1");
    chart.yAxis[0].removePlotLine("plotline-zoom2");
    
    yAxis = chart.yAxis[0];
    yAxis.options.startOnTick = true;
    yAxis.options.endOnTick = true;
    var extremes = chart.yAxis[0].getExtremes();
    chart.yAxis[0].setExtremes(0, extremes.dataMax);
    
};

JCDEQ.lvboclick = function() {	
	var x = document.getElementById("chklb");

	if (x.checked){
		//console.log("checked");
		lvbo = "1";
	}else{
		//console.log("unchecked");
		lvbo = "0";
	}
	btnserarch();
	$(".tablecontainer").hide();
    $(".chartcontainer").show();
    $("#btnshowtable").show();
    $("#btnshowchart").hide();
    $("#btnchartzoomin").show();
    $("#btnchartzoomout").hide();
    $(".checklvbo").show();
    $(".checkyjfz").show();
    var yjfzchk = document.getElementById("chkyjfz");
    yjfzchk.checked = false;
};

//显示预警阀值checkbox事件
JCDEQ.yjfzclick = function() {
	var x = document.getElementById("chkyjfz");
	if ( x.checked ){		
        //显示预警阀值(添加 移除 highchart基准线)
        JCDEQ.ShowYJFZ();
	}else{
		JCDEQ.RemoveYJFZ();
	}
    
    

};

//显示预警阀值
JCDEQ.ShowYJFZ = function () {
		
    if (yjfzsetting.length > 0) {//
        if (seletype == "雨量") {
            //获取当前选中的降雨指标
            var wyzb = $("input[name='jyzb']:checked").val();//GPS位移指标
            var warning_num = yjfzsetting[0];
            if (wyzb==0){          	
                warning_num = yjfzsetting[0];	
                var chart = $('#chart').highcharts();
                yjfzid = "plotline-" + wyzb;
                yjfznum = 1;
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });

                 var extremes = chart.yAxis[0].getExtremes();

                 lastmax = extremes.max;
                 lastmin = extremes.min;
                 //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                 if (warning_num > extremes.max) {
                	 yAxis = chart.yAxis[0];
                     yAxis.options.startOnTick = false;
                     yAxis.options.endOnTick = false;
                     chart.yAxis[0].setExtremes(lastmin, warning_num);
                 }else if(warning_num < extremes.min){
                	 yAxis = chart.yAxis[0];
                     yAxis.options.startOnTick = false;
                     yAxis.options.endOnTick = false;
                     chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                 } 
            
            	
            }else{
            	yjfzid = null;
            	yjfznum = 0;
            	layer.msg("暂无预警阀值配置!");
            }            
        }
    	else if (seletype == "GPS位移" || seletype == "GNSS") {
            //获取当前选中的降雨指标
            var wyzb = $("input[name='gps']:checked").val();//GPS位移指标
            var warning_num = yjfzsetting[0];
            if (wyzb=="X"||wyzb=="Y"){
            	yjfzid = null;
            	yjfznum = 0;
            	layer.msg("暂无预警阀值配置!");
            }else{
            	if (wyzb=="DX") {
                	warning_num = yjfzsetting[0];	
                }else if (wyzb=="DY") {
                	warning_num = yjfzsetting[1];	
                }else if (wyzb=="DH") {
                	warning_num = yjfzsetting[2];	
                }else if (wyzb=="DXY") {
                	warning_num = Math.sqrt(Math.pow(yjfzsetting[0],2)+Math.pow(yjfzsetting[1],2));	
                }else if (wyzb=="DXYH") {
                	warning_num = Math.sqrt(Math.pow(yjfzsetting[0],2)+Math.pow(yjfzsetting[1],2)+Math.pow(yjfzsetting[2],2));	
                }
                
                var chart = $('#chart').highcharts();
                var extremes = chart.yAxis[0].getExtremes();

                lastmax = extremes.max;
                lastmin = extremes.min;
                //console.log(extremes.dataMax);
                //console.log(extremes.dataMin);
                if(extremes.dataMax>=0 && extremes.dataMin>=0){
                	yjfznum = 1;
                	yjfzid = "plotline-" + wyzb;
                	warning_num = Math.abs(warning_num);
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                  //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                    if (warning_num > extremes.max) {
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(lastmin, warning_num);
                    }else if(warning_num < extremes.min){
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                    } 
                }else if(extremes.dataMax<=0 && extremes.dataMin<=0){
                	//console.log("都小于0");
                	yjfznum = 1;
                	yjfzid = "plotline-" + wyzb;
                	warning_num = -1 * (Math.abs(warning_num));
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                  //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                    if (warning_num > extremes.max) {
                   	 	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(lastmin, warning_num);
                    }else if(warning_num < extremes.min){
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                    } 
                }else{
                	yjfznum = 2;
                	yjfzid = "plotline-" + wyzb +"&1";
                	warning_num = Math.abs(warning_num);
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值(正)",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                    yjfzid = "plotline-" + wyzb +"&2";
                	warning_num = -1 * (Math.abs(warning_num));
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值(负)",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                  //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                    if ((Math.abs(warning_num)) > extremes.max && (-1* (Math.abs(warning_num))) < extremes.min) {
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes((-1* (Math.abs(warning_num))), Math.abs(warning_num));
                    }else if ((Math.abs(warning_num)) > extremes.max) {
                   	 	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(lastmin, warning_num);
                    }else if((-1* (Math.abs(warning_num))) < extremes.min){
                   	 	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                    } 
                }
                
                 
                 
            }            
        }
    	else if (seletype == "加速度传感器"){
            //获取当前选中的降雨指标
            var wyzb = $("input[name='jx']:checked").val();//GPS位移指标
            var warning_num = yjfzsetting[0];
        	if (wyzb=="X") {
            	warning_num = yjfzsetting[0];	
            }else if (wyzb=="Y") {
            	warning_num = yjfzsetting[1];	
            }else if (wyzb=="Z") {
            	warning_num = yjfzsetting[2];//Math.sqrt(Math.pow(yjfzsetting[0],2)+Math.pow(yjfzsetting[1],2));	
            }            
        	var chart = $('#chart').highcharts();
            var extremes = chart.yAxis[0].getExtremes();

            lastmax = extremes.max;
            lastmin = extremes.min;
            if(extremes.dataMax>=0 && extremes.dataMin>=0){
            	yjfznum = 1;
            	yjfzid = "plotline-" + wyzb;
            	warning_num = Math.abs(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if (warning_num > extremes.max) {
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if(warning_num < extremes.min){
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }else if(extremes.dataMax<=0 && extremes.dataMin<=0){
            	yjfznum = 1;
            	yjfzid = "plotline-" + wyzb;
            	warning_num = -1 * (Math.abs(warning_num));
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if (warning_num > extremes.max) {
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if(warning_num < extremes.min){
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }else{
            	yjfznum = 2;
            	yjfzid = "plotline-" + wyzb +"&1";
            	warning_num = Math.abs(warning_num);
            	//console.log(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值(正)",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
                yjfzid = "plotline-" + wyzb +"&2";
            	warning_num = -1 * (Math.abs(warning_num));
            	//console.log(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值(负)",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if ((Math.abs(warning_num)) > extremes.max && (-1* (Math.abs(warning_num))) < extremes.min) {
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes((-1* (Math.abs(warning_num))), Math.abs(warning_num));
                }else if ((Math.abs(warning_num)) > extremes.max) {
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if((-1* (Math.abs(warning_num))) < extremes.min){
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }
        
            

        
    	}
        else if (seletype == "倾斜") {
            //获取当前选中的降雨指标
            var wyzb = $("input[name='qx']:checked").val();//GPS位移指标
            var warning_num = yjfzsetting[0];
            if(wyzb=="QX"||wyzb=="QY"){
            	yjfzid = null;
            	layer.msg("暂无预警阀值配置!");
            }else{
            	if (wyzb=="QDX") {
                	warning_num = yjfzsetting[0];	
                }else if (wyzb=="QDY") {
                	warning_num = yjfzsetting[1];	
                }else if (wyzb=="QDXY") {
                	warning_num = yjfzsetting[2];//Math.sqrt(Math.pow(yjfzsetting[0],2)+Math.pow(yjfzsetting[1],2));	
                }            
            	var chart = $('#chart').highcharts();
                var extremes = chart.yAxis[0].getExtremes();

                lastmax = extremes.max;
                lastmin = extremes.min;
                if(extremes.dataMax>=0 && extremes.dataMin>=0){
                	yjfznum = 1;
                	yjfzid = "plotline-" + wyzb;
                	warning_num = Math.abs(warning_num);
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                  //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                    if (warning_num > extremes.max) {
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(lastmin, warning_num);
                    }else if(warning_num < extremes.min){
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                    } 
                }else if(extremes.dataMax<=0 && extremes.dataMin<=0){
                	yjfznum = 1;
                	yjfzid = "plotline-" + wyzb;
                	warning_num = -1 * (Math.abs(warning_num));
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                  //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                    if (warning_num > extremes.max) {
                   	 	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(lastmin, warning_num);
                    }else if(warning_num < extremes.min){
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                    } 
                }else{
                	yjfznum = 2;
                	yjfzid = "plotline-" + wyzb +"&1";
                	warning_num = Math.abs(warning_num);
                	//console.log(warning_num);
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值(正)",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                    yjfzid = "plotline-" + wyzb +"&2";
                	warning_num = -1 * (Math.abs(warning_num));
                	//console.log(warning_num);
                    chart.yAxis[0].addPlotLine({             //在Y轴上增加
                    	color: 'red',
                        width: 2,
                        value: warning_num,  //y轴显示位置
                        id: yjfzid,
                        label: {
                            text: "蓝色预警阈值(负)",     //标签的内容
                            align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                            x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                        }
                     });
                  //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                    if ((Math.abs(warning_num)) > extremes.max && (-1* (Math.abs(warning_num))) < extremes.min) {
                    	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes((-1* (Math.abs(warning_num))), Math.abs(warning_num));
                    }else if ((Math.abs(warning_num)) > extremes.max) {
                   	 	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(lastmin, warning_num);
                    }else if((-1* (Math.abs(warning_num))) < extremes.min){
                   	 	yAxis = chart.yAxis[0];
                        yAxis.options.startOnTick = false;
                        yAxis.options.endOnTick = false;
                        chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                    } 
                }
            }
            

        }
        else if (seletype == "深孔测斜") {
            //获取当前选中的降雨指标
            var wyzb = $("input[name='skcxlx']:checked").val();//GPS位移指标
            var warning_num = yjfzsetting[0];

        	if (wyzb=="x") {
            	warning_num = yjfzsetting[0];	
            }else if (wyzb=="y") {
            	warning_num = yjfzsetting[1];	
            }
        	
        	var chart = $('#chart').highcharts();
            var extremes = chart.yAxis[0].getExtremes();

            lastmax = extremes.max;
            lastmin = extremes.min;
            if(extremes.dataMax>=0 && extremes.dataMin>=0){
            	yjfznum = 1;
            	yjfzid = "plotline-" + wyzb;
            	warning_num = Math.abs(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if (warning_num > extremes.max) {
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if(warning_num < extremes.min){
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }else if(extremes.dataMax<=0 && extremes.dataMin<=0){
            	yjfznum = 1;
            	yjfzid = "plotline-" + wyzb;
            	warning_num = -1 * (Math.abs(warning_num));
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if (warning_num > extremes.max) {
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if(warning_num < extremes.min){
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }else{
            	yjfznum = 2;
            	yjfzid = "plotline-" + wyzb +"&1";
            	warning_num = Math.abs(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值(正)",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
                yjfzid = "plotline-" + wyzb +"&2";
            	warning_num = -1 * (Math.abs(warning_num));
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值(负)",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if ((Math.abs(warning_num)) > extremes.max && (-1* (Math.abs(warning_num))) < extremes.min) {
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes((-1* (Math.abs(warning_num))), Math.abs(warning_num));
                }else if ((Math.abs(warning_num)) > extremes.max) {
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if((-1* (Math.abs(warning_num))) < extremes.min){
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }                   
        }
        else {
            //获取当前选中的降雨指标   
            var warning_num = yjfzsetting[0];       	
            var chart = $('#chart').highcharts();
            var extremes = chart.yAxis[0].getExtremes();

            lastmax = extremes.max;
            lastmin = extremes.min;
            if(extremes.dataMax>=0 && extremes.dataMin>=0){
            	yjfznum = 1;
            	yjfzid = "plotline-" + wyzb;
            	warning_num = Math.abs(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if (warning_num > extremes.max) {
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if(warning_num < extremes.min){
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }else if(extremes.dataMax<=0 && extremes.dataMin<=0){
            	yjfznum = 1;
            	yjfzid = "plotline-" + wyzb;
            	warning_num = -1 * (Math.abs(warning_num));
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if (warning_num > extremes.max) {
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if(warning_num < extremes.min){
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }else{
            	yjfznum = 2;
            	yjfzid = "plotline-" + wyzb +"&1";
            	warning_num = Math.abs(warning_num);
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值(正)",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
                yjfzid = "plotline-" + wyzb +"&2";
            	warning_num = -1 * (Math.abs(warning_num));
                chart.yAxis[0].addPlotLine({             //在Y轴上增加
                	color: 'red',
                    width: 2,
                    value: warning_num,  //y轴显示位置
                    id: yjfzid,
                    label: {
                        text: "蓝色预警阈值(负)",     //标签的内容
                        align: 'right',                //标签的水平位置，水平居左,默认是水平居中center
                        x: 10                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                    }
                 });
              //设置y轴极限值，必须在加完标识线之后，否则不显示标识线
                if ((Math.abs(warning_num)) > extremes.max && (-1* (Math.abs(warning_num))) < extremes.min) {
                	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes((-1* (Math.abs(warning_num))), Math.abs(warning_num));
                }else if ((Math.abs(warning_num)) > extremes.max) {
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(lastmin, warning_num);
                }else if((-1* (Math.abs(warning_num))) < extremes.min){
               	 	yAxis = chart.yAxis[0];
                    yAxis.options.startOnTick = false;
                    yAxis.options.endOnTick = false;
                    chart.yAxis[0].setExtremes(warning_num, lastmax, true ,true);
                } 
            }                    
        }
    }
    else {
    	yjfzid = null;
        layer.msg("暂无预警阀值配置!");
    }
};

//移除预警阀值
JCDEQ.RemoveYJFZ = function () {
	if(yjfzid!=null){
    	if(yjfznum==1){
    		var chart = $('#chart').highcharts();
        	//console.log(yjfzid);
        	chart.yAxis[0].removePlotLine(yjfzid);
        	yAxis = chart.yAxis[0];
            yAxis.options.startOnTick = true;
            yAxis.options.endOnTick = true;
            if (lastmax) {

                chart.yAxis[0].setExtremes(lastmin, lastmax);
            }
            else {

                var extremes = chart.yAxis[0].getExtremes();
                chart.yAxis[0].setExtremes(0, extremes.dataMax);
            }
    	}else if(yjfznum==2){
    		yjfzid = yjfzid.split("&",1);
    		var chart = $('#chart').highcharts();
        	//console.log(yjfzid);
        	chart.yAxis[0].removePlotLine(yjfzid+"&1");
        	chart.yAxis[0].removePlotLine(yjfzid+"&2");
        	yAxis = chart.yAxis[0];
            yAxis.options.startOnTick = true;
            yAxis.options.endOnTick = true;
            if (lastmax) {

                chart.yAxis[0].setExtremes(lastmin, lastmax);
            }
            else {

                var extremes = chart.yAxis[0].getExtremes();
                chart.yAxis[0].setExtremes(0, extremes.dataMax);
            }
    	}
   
    }    
        
};

//降雨量指标改变,改变预警阀值
JCDEQ.ChangeYJFZ = function () {

    if ($("#chkyjfz").is(":checked")) {
        JCDEQ.RemoveYJFZ();
        JCDEQ.ShowYJFZ();
    }
};



function getMaxValue(a, b, c, d) {
    return a > b ? (a > c ? (a > d ? a : d) : (c > d ? c : d)) : (b > c ? (b > d ? b : d) : (c > d ? c : d));
}
//返回颜色值
function retcolor(li) {
    if (li == "1")
        return "#f70617";
    else if (li == "2")
        return "#f79406";
    else if (li == "3")
        return "#f4f706";
    else
        return "#0617f7";
}
//返回预警阀值
function retvalue(li) {
    if (li == "1")
        return $('#hosfz').val();
    else if (li == "2")
        return $('#csfz').val();
    else if (li == "3")
        return $('#hsfz').val();
    else
        return $('#lsfz').val();
}

function GetEqUnit(type) {

    if (type == "雨量") {
        return "mm";
    }
    else if(type=="加速度传感器"){
    	return "g";
    }
    else if (type == "倾斜"){
    	return "°";
    }
    else if (type == "次声") {
        return "V";
    }
    else if (type == "地声") {
        return "V";
    }
    else if (type == "泥位"||type=="激光位移") {
        return "m";
    }
    else if (type == "土压力") {
        return "Pa";
    }
    else if (type == "地下水位"||type=="水位"||type=="雷达水位") {
        return "m";
    }
    else if (type == "水温"||type=="温度") {
        return "℃";
    }
    else if (type == "渗压计") {
        return "Pa";
    }else if(type=="电压") {
    	return "V";
    }else if(type=="风速"){
    	return "m/s";
    }else if(type=="湿度"){
        return "%";	
    }else if(type=="深孔测斜"){
    	return "mm";
    }else if(type=="静力水准"){
    	return "m";
    }else if(type=="沉降"){
    	return "mm";
    }else if (type == "瞬时流量") {
        return "m³/s";
    }else if (type == "流速"||type=="雷达流速") {
        return "m/s";
    }else if (type == "累计流量") {
        return "m³";
    }
    else {
        return "mm";
    }
};

function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day;

    //if (hh < 10)
    //    clock += "0";

    //clock += hh + ":";
    //if (mm < 10) clock += '0';
    //clock += mm;
    return (clock);
};
function CurentPreTime() {


    var dt = new Date();
    var y = (dt.getMonth() == 0) ? (dt.getFullYear() - 1) : dt.getFullYear();
    var m = (dt.getMonth() == 0) ? 11 : dt.getMonth() - 1;
    var preM = getDayOfMonth(y, m);
    var d = (preM < dt.getDate()) ? preM : dt.getDate();
    // return new Date(y, m, d);  


    var now = new Date(y, m, d)

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = dt.getHours();            //时
    var mm = dt.getMinutes();          //分

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day;

    //if (hh < 10)
    //    clock += "0";

    //clock += hh + ":";
    //if (mm < 10) clock += '0';
    //clock += mm;
    return (clock);
};
function getDayOfMonth(y, Mm) {
    /// <summary>  
    /// 计算当前月一共多少天  
    ///create by 长江 20121225  
    /// </summary>  
    /// <returns type="Number" />  
    /// <param name="y" type="Number">  
    ///     年,若为空则为当前时间  
    /// </param>  
    /// <param name="Mm" type="Number">  
    ///     月,0开始,若为空则为当前时间  
    /// </param>  
    if (typeof y == 'undefined') { y = (new Date()).getFullYear(); }
    if (typeof Mm == 'undefined') { Mm = (new Date()).getMonth(); }
    var Feb = (y % 4 == 0) ? 29 : 28;
    var aM = new Array(31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    return aM[Mm];
};
function getDateOfNextMonth(dt) {

    if (typeof dt == 'undefined') { dt = (new Date()); }
    var y = (dt.getMonth() == 11) ? (dt.getFullYear() + 1) : dt.getFullYear();
    var m = (dt.getMonth() == 11) ? 0 : dt.getMonth() + 1;
    var preM = Date.getDayOfMonth(y, m);
    var d = (preM < dt.getDate()) ? preM : dt.getDate();
    return new Date(y, m, d);
};
function getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
        if (mon > 1) {
            mon = mon - 1;
        }
        else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
};


