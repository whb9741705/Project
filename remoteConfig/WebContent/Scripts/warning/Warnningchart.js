var Warnningchart = {};

function formatShowCell(value) {
    return "<span title='" + value + "'>" + value + "</span>";
}

Warnningchart.InitGrid = function () {
	
    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 730,
        nowrap: true,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit: false, //自动大小  
        url: '../Warningchart/InitWarningList',
        //queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
        	{field: 'ZName', title: '灾害点名称', width:70, formatter:formatShowCell},
        	{field: 'DName', title: '监测点名称', width: 40, formatter:formatShowCell},
        	{field: 'EName', title: '仪器名称', width: 40, formatter:formatShowCell},
        	{field: 'EType', title: '仪器类型', width: 30},
        	{field: 'Unit', title: '监测单位', width: 30},
        	{field: 'BlueAlert', title: '蓝色预警值', width: 30},
        	{field: 'Yellowlert', title: '黄色预警值', width: 30},
        	{field: 'OrangeAlert', title: '橙色预警值', width: 30},
        	{field: 'RedAlert', title: '红色预警值', width: 30},
        	{field: 'PhoneNum', title: '报警短信电话(主)', width: 40},
        	{field: 'PhoneNum1', title: '报警短信电话(从)', width: 80},
        	{field: 'sensorNum', title: '编辑', width: 20, align:'center', formatter:formatOper}        
          
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

Warnningchart.LoadGrid = function (node){

	 var queryData = {
		    	num:  node.num,	
		        txt:  node.text, 		    
		    };
	
    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 730,
        nowrap: true,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit: false, //自动大小  
        url: '../Warningchart/LoadWarningList',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
        	{field: 'ZName', title: '灾害点名称', width:50, formatter:formatShowCell},
        	{field: 'DName', title: '监测点名称', width: 50, formatter:formatShowCell},
        	{field: 'EName', title: '仪器名称', width: 50, formatter:formatShowCell},
        	{field: 'EType', title: '仪器类型', width: 50},
        	{field: 'Unit', title: '监测单位', width: 50},
        	{field: 'BlueAlert', title: '蓝色预警值', width: 50},
        	{field: 'Yellowlert', title: '黄色预警值', width: 50},
        	{field: 'OrangeAlert', title: '橙色预警值', width: 50},
        	{field: 'RedAlert', title: '红色预警值', width: 50},
        	{field: 'PhoneNum', title: '报警短信电话(主)', width: 50},
        	{field: 'PhoneNum1', title: '报警短信电话(从)', width: 50},
        	{field: 'sensorNum', title: '编辑', width: 50, align:'center', formatter:formatOper}        
          
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

}

function exportexcel() {
	queryData = {
		eqbh: "warningchart",	
	};
	
    var url = "../Sensor/ExportSensorData";
    $.ajax({
        type: "POST",
        data: queryData,
        url: url,  
        success: function (filename) {
            if (filename != "") {
                var downUrl = '../Sensor/DownLoadFile?file=' + filename;
                window.location = downUrl;
            } else {
                alert("暂无数据可供导出!");
            }
        }
    });
}
// 格式化 操作单元格,设置编辑和删除按钮
function formatOper(value, row, index) {	
	//var rowData = $("#list_data").jqGrid('getRowData',row["ID"]);
    var e = '<a  title="编辑" href="javascript:;" onclick="warnning_edit(\'' + value + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a> ';
    //var d = '<a  title="删除" href="javascript:;" onclick="member_del(\'' + row["ID"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a> ';
    return e ;
}

// 添加信息
function member_add() {
    layer_show("添加责任人", "../Warningchart/AddIndex", '', '630');
}

// 编辑信息
function warnning_edit(sensornum) {
	//console.log("warnning_edit");
	var url = "sensorNum=" + escape(sensornum) ;
    layer_show("编辑预警信息", "../WarningSet/EditWarnningList.html?" + url, '800', '700');
}

function member_del(id) {
    layer.confirm('确定要删除该责任人吗？', {
        btn: ['确定', '取消']
    }, function (r) {
        if (r) {
            $.ajax({
                type: "POST",
                async: false,
                cache: false,
                url: '../Warningchart/Del',
                data: { ID: id },
                dataType: "json",
                success: function (data) {
                    if (data.success) {
                        layer.alert('删除成功');
                        RePerson.InitGrid();
                    } else {
                        layer.alert('删除失败');
                    }
                }
            });
        }
    });
   
}


