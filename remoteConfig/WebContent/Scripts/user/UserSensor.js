var UserSensor = {};

UserSensor.InitGrid = function (jcdbh) {
    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 600,
        nowrap: true,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit: false, //自动大小  
        url: '../User/GetUserTerminal',
        queryParams: {jcdbh: jcdbh},
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
         { field: 'terminalNum', title: '终端编号', width: 50 },
          { field: 'RID', title: 'RID', width: 50 },
          { field: 'TNS', title: 'TNS', width: 50 },   
          { field: 'User', title: '用户', width: 50 },
          { field: 'TerminalType', title: '设备类型', width: 50 },
          { field: 'description', title: '备注', width: 50 },
          { field: 'id', title: '操作', width: 50, align: 'center', formatter: formatOper }
          
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

function exportexcel() {
    var url = "../Reperson/Export";
    $.ajax({
        type: "POST",
        url: url,  
        success: function (filename) {
            if (filename != "") {
                var downUrl = '/FileUpload/DownloadFile?file=' + filename;
                window.location = downUrl;
            } else {
                alert("暂无数据可供导出!");
            }
        }
    });
}
// 格式化 操作单元格,设置编辑和删除按钮
function formatOper(value, row, index) {
	console.log("row="+row["sensorNum"]);
    var e = '<a  title="编辑" href="javascript:;" onclick="usersensor_edit(\'' + row["sensorNum"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a> ';
    var d = '<a  title="删除" href="javascript:;" onclick="usersensor_del(\'' + row["sensorNum"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a> ';
    if(row["sensorName"]){
    	if(row["sensorName"].search("JD") != -1) {e='<p style="color:#C0C0C0;">不可更改';d='</p>';}
    }
    
    return e + d;
}

// 添加信息
function sensorNum_add() {
    layer_show("添加设备", "../User/AddsensorNum.html", '900', '900');
}


// 编辑信息
function usersensor_edit(sensorNum) {
    layer_show("编辑传感器", "../User/EditUserSensor.html?sensorNum=" + sensorNum, '700', '700');
}

function usersensor_del(sensorNum) {
    layer.confirm('确定要删除该传感器信息吗？', {
        btn: ['确定', '取消']
    }, function (r) {
        if (r) {
            $.ajax({
                type: "POST",
                async: false,
                cache: false,
                url: '../User/UserSensorDel',
                data: { sensorNum: sensorNum },
                dataType: "json",
                success: function (data) {
                    if (data.success) {
                        layer.alert('删除成功');
                        $('#list_data').datagrid('reload');
                    } else {
                        layer.alert('删除失败');
                    }
                }
            });
        }
    });
   
};

UserSensor.InitGridterminal = function(jcdbh){

    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 600,
        nowrap: true,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit: false, //自动大小  
        url: '../User/GetUserTerminal',
        queryParams: {jcdbh: jcdbh},
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
         { field: 'terminalNum', title: '终端编号', width: 50 },
          { field: 'RID', title: 'RID', width: 50 },
          { field: 'TNS', title: 'TNS', width: 50 },   
          { field: 'User', title: '用户', width: 50 },
          { field: 'TerminalType', title: '设备类型', width: 50 },
          { field: 'description', title: '备注', width: 50 },
          { field: 'id', title: '操作', width: 50, align: 'center', formatter: formatOper }
          
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
function formatOperterminal(value, row, index) {
	//console.log("row="+row["sensorNum"]);
    var e = '<a  title="编辑" href="javascript:;" onclick="userterminal_edit(\'' + row["terminalNum"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a> ';
    var d = '<a  title="删除" href="javascript:;" onclick="userterminal_del(\'' + row["terminalNum"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a> ';
    
    return e + d;
};

//编辑信息
function userterminal_edit(sensorNum) {
 layer_show("编辑终端", "../User/EditUserTerminal.html?sensorNum=" + sensorNum, '700', '700');
}

function userterminal_del(sensorNum) {
 layer.confirm('确定要删除该终端信息吗？删除之后有关该终端的所有信息又会被清除，包括传感器信息、预警信息等。', {
     btn: ['确定', '取消']
 }, function (r) {
     if (r) {
         $.ajax({
             type: "POST",
             async: false,
             cache: false,
             url: '../User/UserTerminalDel',
             data: { sensorNum: sensorNum },
             dataType: "json",
             success: function (data) {
                 if (data.success) {
                     layer.alert('删除成功');
                     $('#list_data').datagrid('reload');
                 } else {
                     layer.alert('删除失败');
                 }
             }
         });
     }
 });

};
