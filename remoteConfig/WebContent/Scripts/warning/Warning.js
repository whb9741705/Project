var Warning = {};

//在资源导航界面初始化预警记录信息表格
Warning.loadWarningList = function(jcdbh){
   
    var queryData = { jcdbh: jcdbh };

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 820,
        nowrap: true,
        striped: true,
        border: true,
        autoRowHeight: false, //自动行高
        autoRowWidth: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit:false, //自动大小  
        url: '../Warning/GetWarningList',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
          { field: 'ZName', title: '灾害点名称', width: 50, formatter:formatShowCell },
          { field: 'DName', title: '监测点名称', width: 50, formatter:formatShowCell },
          { field: 'EName', title: '仪器名称', width: 50, formatter:formatShowCell },
          { field: 'EType', title: '仪器类型', width: 30, align: 'center' },
          { field: 'alarmForm', title: '预警方式', width: 40, align: 'center'},
          { field: 'alarmTime', title: '预警时间', width: 80, align: 'center' },
          { field: 'alarmReason', title: '预警原因', width: 200, align: 'center' },
          { field: 'alarmPhone', title: '预警电话', width: 100, align: 'center' },
          { field: 'alarmState', title: '预警级别', width: 30, align: 'center' },
          { field: 'ifSendSms', title: '是否发送短信', width: 50, align: 'center' },
          { field: 'ifDeal', title: '处理状态', width: 30, align: 'center', formatter: formatDeal},
          { field: 'sensorNum', title: '操作', width: 30, align: 'center', formatter: formatOperation }           
        ]]
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
            handler: function () { exportexcel(); }
        }]
    });
	
};

//地图上的预警记录信息显示
Warning.loadWarningList1 = function(sensorNO){
	   
    var queryData = { sensorNO: sensorNO };

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 820,
        nowrap: true,
        striped: true,
        border: true,
        autoRowHeight: false, //自动行高
        autoRowWidth: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit:false, //自动大小  
        url: '../Warning/GetWarningList1',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
          { field: 'ZName', title: '灾害点名称', width: 50, formatter:formatShowCell },
          { field: 'DName', title: '监测点名称', width: 50, formatter:formatShowCell },
          { field: 'EName', title: '仪器名称', width: 50, formatter:formatShowCell },
          { field: 'EType', title: '仪器类型', width: 30, align: 'center' },
          { field: 'alarmForm', title: '预警方式', width: 40, align: 'center'},
          { field: 'alarmTime', title: '预警时间', width: 80, align: 'center' },
          { field: 'alarmReason', title: '预警原因', width: 200, align: 'center' },
          { field: 'alarmPhone', title: '预警电话', width: 100, align: 'center' },
          { field: 'alarmState', title: '预警级别', width: 30, align: 'center' },
          { field: 'ifDeal', title: '处理状态', width: 30, align: 'center', formatter: formatDeal},
          { field: 'sensorNum', title: '操作', width: 30, align: 'center', formatter: formatOperation }           
        ]]
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
            handler: function () { exportexcel(); }
        }]
    });
	
};


//在资源导航界面当用户点击树形结构时的预警记录信息
Warning.loadWarningListbyNode = function(node){

    
    var queryData = { num : node.num };

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 800,
        nowrap: true,
        striped: true,
        border: true,
        autoRowHeight: false, //自动行高
        autoRowWidth: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit:false, //自动大小  
        url: '../Warning/GetWarningListByNode',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
            { field: 'ZName', title: '灾害点名称', width: 50, formatter:formatShowCell },
            { field: 'DName', title: '监测点名称', width: 50, formatter:formatShowCell },
            { field: 'EName', title: '仪器名称', width: 50, formatter:formatShowCell },
            { field: 'EType', title: '仪器类型', width: 30, align: 'center' },
            { field: 'alarmForm', title: '预警方式', width: 40, align: 'center'},
            { field: 'alarmTime', title: '预警时间', width: 80, align: 'center' },
            { field: 'alarmReason', title: '预警原因', width: 200, align: 'center' },
            { field: 'alarmPhone', title: '预警电话', width: 100, align: 'center' },
            { field: 'alarmState', title: '预警级别', width: 30, align: 'center' },
            { field: 'ifSendSms', title: '是否发送短信', width: 50, align: 'center' },
            { field: 'ifDeal', title: '处理状态', width: 30, align: 'center', formatter: formatDeal},
            { field: 'sensorNum', title: '操作', width: 30, align: 'center', formatter: formatOperation }           
          ]]
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
            handler: function () { exportexcel(); }
        }]
    });
    
};



$(function () {   

    //表单提交
    $('#query_button').click(function () {
        Warning.InitWarningGrid();
        $('#query_button').mouseleave()
    });

});

function formatDeal(value){
	
	var e = "";
	if (value == "no"){
		e = '<font style="color:red;">未处理</font>';
	}else if (value == "yes"){
		e = '<font style="color:blue;">已处理</font>';
	}
	return e;
}

function formatOperation(value, row, index) {	
	
    var e = '<a  title="设置" href="javascript:;" onclick="operate_alarminfo(\'' + value + '\',\'' + row.alarmTime + '\',\''+ index +'\')" '
        + ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont"> &#xe60c;</i></a> ';

    return e;
};

function operate_alarminfo(sensornum,alarmtime,index){
	var title = sensornum + '-预警操作';
    var url = "sensorNum=" + escape(sensornum) + "&alarmTime=" + escape(alarmtime) + "&index=" + escape(index);
   
    layer_show(title, './operation_alarminfo.html?' + url, '600', '500');
};



Warning.InitWarningRecord = function (tybh) {
    var queryData = {
      tybh:tybh
    };
    var grid = [
             
              { field: 'ZName', title: '灾害点名称', width: 170, align: 'center' },
          
              { field: 'WTime', title: '预警时间', width: 170, align: 'center' },
              { field: 'WNum', title: '预警原因', width: 200 }
    ];
    $(function () {
        grid = $('#list_data').datagrid({
            title: '',
            iconCls: 'icon-view', //图标
            loadMsg: "数据加载中，请稍后......",
            width: 'auto',
            height: 400,
            nowrap: true,
            striped: true,
            border: true,
            collapsible: false, //是否可折叠
            fitColumns: true,
            scrollbarSize: 0,
            fit: true, //自动大小  
            url: '/Warning/LoadRecordList',
            queryParams: queryData,
            pageNumber: 1, //默认显示第几页 
            pageSize: 15,
            pageList: [15, 30, 50],
            remoteSort: true,
            singleSelect: true,  //是否单选
            pagination: true,  //分页控件
            rownumbers: true,  //行号
            columns: [grid]
        });

        //设置分页控件
        var p = $('#list_data').datagrid('getPager');
        $(p).pagination({
            beforePageText: '第',
            afterPageText: '页     共{pages}页',
            displayMsg: '当前显示{from}-{to}条记录  共{total}条记录'
          
        });
    });
};

//初始化表格
Warning.InitWarningGrid = function () {
	
    var queryData = {
    	sensorNum:$('#sensorNum_query').val(),
        sensorList: $('#sensorList option:selected').val(), 
        warningLevel: $('#warningLevel option:selected').val(),
        startTime: $('#startTime').val(),            
        endTime: $('#endTime').val(),              
        warningType: $('#warningType option:selected').val(),
        warningWay: $('#warningWay option:selected').val()
    };
    //console.log(queryData);
    var grid = [];
    
    //实时预警    
    var realGrid = [
    	{ field: 'ZName', title: '灾害点名称', width: 50, formatter:formatShowCell },
    	{ field: 'DName', title: '监测点名称', width: 50, formatter:formatShowCell },
    	{ field: 'EName', title: '仪器名称', width: 50, formatter:formatShowCell },
    	{ field: 'EType', title: '仪器类型', width: 30, align: 'center' },
    	{ field: 'alarmForm', title: '预警方式', width: 40, align: 'center'},
    	{ field: 'alarmTime', title: '预警时间', width: 80, align: 'center' },
    	{ field: 'alarmReason', title: '预警原因', width: 200, align: 'center' },
    	{ field: 'alarmPhone', title: '预警电话', width: 130, align: 'center' },
    	{ field: 'alarmState', title: '预警级别', width: 30, align: 'center' },
    	{ field: 'ifSendSms', title: '是否发送短信', width: 50, align: 'center' },
    	{ field: 'sensorNum', title: '操作', width: 30, align: 'center', formatter: formatOperation }           
    ];
   
    //历史预警
    var hisGrid = [
        { field: 'ZName', title: '灾害点名称', width: 50, formatter:formatShowCell },
        { field: 'DName', title: '监测点名称', width: 50, formatter:formatShowCell },
        { field: 'EName', title: '仪器名称', width: 50, formatter:formatShowCell },
        { field: 'EType', title: '仪器类型', width: 30, align: 'center' },
        { field: 'alarmForm', title: '预警方式', width: 40, align: 'center'},
        { field: 'alarmTime', title: '预警时间', width: 80, align: 'center' },
        { field: 'alarmReason', title: '预警原因', width: 200, align: 'center' },
        { field: 'alarmPhone', title: '预警电话', width: 100, align: 'center' },
        { field: 'alarmState', title: '预警级别', width: 30, align: 'center' }, 
        { field: 'ifSendSms', title: '是否发送短信', width: 50, align: 'center' },
        { field: 'dealTime', title: '处理时间', width: 140, align: 'center' },
        { field: 'dealReason', title: '解除原因', width: 140, align: 'center' }
    ]

    if (queryData.warningType == "1") {
        grid = hisGrid;
    } else {
        grid = realGrid;
    }

    $(function () {
        grid = $('#list_data').datagrid({
            title: '',
            iconCls: 'icon-view', //图标
            loadMsg: "数据加载中，请稍后......",
            width: 'auto',
            height: 800,
            nowrap: true,
            striped: true,
            border: true,
            collapsible: false, //是否可折叠
            fitColumns: true,
            scrollbarSize: 0,
            fit: true, //自动大小  
            url: '../Warning/GetWarningListByQuery',
            queryParams: queryData,
            pageNumber: 1, //默认显示第几页 
            pageSize: 30,
            pageList: [30, 50, 100],
            remoteSort: true,
            singleSelect: true,  //是否单选
            pagination: true,  //分页控件
            rownumbers: true,  //行号
            columns: [grid]
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
                handler: function () { exportexcel(); }
            }]
        });
    });
};

function exportexcel()
{
	layer_show('预警历史下载', '../Warning/exportwarning.html', '500', '450');
};

//初始下拉框
Warning.initDropdownItems = function (id, stype, val) {
    $.post('/Warning/GetXzqhItems2Json', { stype: stype, val: val }, function (res) {
        $("#" + id + " option:gt(0)").remove();
        $.each(res, function (i, item) {
            $('#' + id).append($('<option></option>').val(item.Value).text(item.Text));
        });
    });
};

//监测数据
function formatEq(value, row, index) {
    var e = '<a  title="监测数据" href="javascript:;" onclick="eq_detail_show(\'' + row.ZName + '\',\'' + row.ZhdID + '\')" ' +
        ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe64f;</i></a> ';
    return e;
};
//预警方式
function formatWarnWay(value, row, index) {

    var e = "";
    if (value == "1") {
        e = '单值预警'
    }
    else if (value == "2") {
        e = '综合预警'
    }
    else {
        e = '权重预警'
    }


    return e;
};

//人工复核
function formatRgfh(value, row, index) {
  
    var e = "";
    if (value == "True")
    {
         e = '<div class="check-box"><input type="checkbox" id="checkbox-disabled-checked"  checked="checked" disabled></div>'
    }
    else {
        e = '<div class="check-box"><input type="checkbox" id="checkbox-disabled-checked"   disabled></div>'
    }
  

    return e;
};

//手动报警
function formatSdbj(value, row, index) {
    var a = '<a  title="广播报警" href="javascript:;" onclick="gb_warn(' + index + ')" class="ml-5 mr-5" ' +
        'style="text-decoration: none"><i class="Hui-iconfont">&#xe62f;</i></a> ';

    var b = '<a  title="短信报警" href="javascript:;" onclick="dx_warn(\'' + index + '\')" class="ml-5 mr-5" ' +
        'style="text-decoration: none"><i class="Hui-iconfont">&#xe68a;</i></a> ';

    var c = '<a  title="LED报警" href="javascript:;" onclick="led_warn(\'' + index + '\')" class="ml-5 mr-5" ' +
        ' style="text-decoration: none"><i class="Hui-iconfont">&#xe64c;</i></a> ';

    return a + b + c;
};

//解除预警
function formatSet(value, row, index) {
    var e = '<a  title="设置" href="javascript:;" onclick="relieve_warn(\'' + index + '\')" '
        + ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont"> &#xe63c;</i></a> ';

    return e;
};

/*监测数据曲线显示*/
function eq_detail_show(title, id) {
    //layer_show(title, "/EQInfo/ZHDEQDataDetail?zhdbh=" + id, '1040', '630');
    layer_show(title, "/Sensor/ZHDEQDataDetail?zhdbh=" + id, '1040', '630');
};

/*广播报警*/
function gb_warn(index) {

    var rows = $('#list_data').datagrid('getRows');
    var row = rows[index];
    if (row) {
        var title = "—" + row.ZName + "—" + row.WLevel;
        var url = '/Warning/OpenOperWindown?win=gb&Zhdid=' +
            row.ZhdID + "&ZhdName=" + escape(row.ZName) +
            "&WL=" + escape(row.WLevel) + "&WNum=" + escape(row.WNum);

        layer_show('广播预警' + title, url, '480', '320');
    }
};

/*短信报警*/
function dx_warn(index) {

    var rows = $('#list_data').datagrid('getRows');
    var row = rows[index];
    if (row) {
        var title = "—" + row.ZName + "—" + row.WLevel;
        var url = '/Warning/OpenOperWindown?win=dx&Zhdid=' +
            row.ZhdID + "&ZhdName=" + escape(row.ZName) +
            "&WL=" + escape(row.WLevel) + "&WNum=" + escape(row.WNum);

        layer_show('短信预警' + title, url, '500', '350');
    }
};

/*LED报警*/
function led_warn(index) {

    var rows = $('#list_data').datagrid('getRows');
    var row = rows[index];
    if (row) {
        var title = row.ZName + '-LED预警';
        var url = "&Zhdid=" + row.ZhdID + "&ZhdName=" +
            escape(row.ZName) + "&WNum=" + escape(row.WNum) +
            "&wtime=" + escape(row.WTime) + "&wwether=" + escape(row.WWether);

        layer_show(title, '/Warning/OpenLedOperWindown?win=led' + url, '500', '350');
    }
};

/*解除报警*/
function relieve_warn(index) {
    var rows = $('#list_data').datagrid('getRows');
    var row = rows[index];
    //alert(row.ID);
    if (row) {
        var title = row.ZName + '-解除预警';
        var url = "id=" + row.ID + "&ZhdName=" +
            escape(row.ZName) + "&WNum=" + escape(row.WNum) +
            "&wtime=" + escape(row.WTime) + "&wwether=" + escape(row.WWether);
     
        layer_show(title, '/Warning/OpenRelieveWarningWindown?' + url, '500', '350');
    }
};

function Refresh() {
    $('#list_data').datagrid('reload');
};


//尺寸变化适应窗口
Warning.mapResize = function () {
    //$("#content").height($(document).height() - 100);

};

function formatShowCell(value) {
    return "<span title='" + value + "'>" + value + "</span>";
}