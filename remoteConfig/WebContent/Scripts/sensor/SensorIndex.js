var SensorIndex = {};
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var root = localhostPaht + projectName;


//初始下拉框
/*SensorIndex.initDropdownItems = function (id, stype, val) {
    $.post('/Warning/GetXzqhItems2Json', { stype: stype, val: val }, function (res) {
        $("#" + id + " option:gt(0)").remove();
        $.each(res, function (i, item) {
            $('#' + id).append($('<option></option>').val(item.Value).text(item.Text));
        });
    });
};*/

//初始化表格 点击树形导航时实现的功能
SensorIndex.LoadGrid = function(node) {

    var queryData = {
        num: node.num,
        country: node.text
    };

    $(function() {
        grid = $('#list_data').datagrid({
            title: '',
            iconCls: 'icon-view', //图标
            loadMsg: "数据加载中，请稍后......",
            width: 'auto',
            height: 820,
            nowrap: true,
            striped: true,
            border: true,
            collapsible: false, //是否可折叠
            fitColumns: true,
            scrollbarSize: 0,
            fit: false, //自动大小
            autoRowHeight: false, //自动行高
            autoRowWidth: true,
            url: '../Sensor/LoadList',
            queryParams: queryData,
            pageNumber: 1, //默认显示第几页
            pageSize: 30,
            pageList: [30, 50, 100],
            remoteSort: true,
            singleSelect: true, //是否单选
            pagination: true, //分页控件
            rownumbers: true, //行号
            columns: [
                [
                    { field: 'DName', title: '监测终端', width: 100, formatter: formatShowCell },
                    { field: 'EName', title: '闸控设备', width: 150, formatter: formatShowCell },
                    { field: 'EType', title: '监测类型', width: 70, align: 'center' },
                    { field: 'power', title: '电池电量', width: 70, align: 'center' },
                    { field: 'RunState', title: '仪器状态', width: 70, align: 'center' },
                    { field: 'rData', title: '实时数据', width: 200, align: 'center' },
                    { field: 'rTime', title: '采集时间', width: 115, align: 'center' },
                    { field: 'jcsj', title: '历史数据', width: 60, align: 'center', formatter: formatMinioData }
                ]
            ]
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
                    handler: function() { exportexcel(queryData, "excel_1"); }
                },
                {
                    iconCls: 'icon-export',
                    text: '导出Excel(仅当前页)',
                    handler: function() { exportexcel(queryData, "excel_11", $('#list_data').datagrid('options').pageNumber, $('#list_data').datagrid('options').pageSize); }
                }
            ]
        });
    });
    //var rows = $('#list_data').datagrid('getRows');
    //console.log(rows);



};

function exportexcel(queryData, num, page, rows) {
    var url = "../Sensor/ExportSensorData";
    var type = "eqbh";
    queryData[type] = num;
    if (num == "excel_11" || num == "excel_00") {
        queryData["page"] = page;
        queryData["rows"] = rows;
    }
    console.log(queryData);
    $.ajax({
        type: "POST",
        url: url,
        data: queryData,
        success: function(filename) {
            if (filename != "") {
                var downUrl = '../Sensor/DownLoadFile?file=' + filename;
                window.location.href = downUrl;
            } else {
                alert("暂无数据可供导出!");
            }
        }
    });


}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}
//仪器详细信息
function formatEqDetail(value, row, index) {
    var e = '<a  title="详细信息" href="javascript:;" onclick="eq_detail_show(\'' + value + '\',\'' + row.EName + '\')" ' +
        ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe616;</i></a> ';
    return e;
}

//电池电量
function formatPower(value, row, index) {
    var e = "";

    if (value >= 0) {
        e = '<a href="#battery-full"><i class="fa fa-battery-full"></i> </a>';
    } else {
        e = '<a href="#battery-quarter"><i class="fa fa-battery-quarter"></i> </a>';
    }
    return e;
}
//地图定位
function formatMapPos(value, row, index) {
    var e = '<a  title="地图位置" href="javascript:;"onclick="eq_mappos_show(\'' + row.jcsj + '\',\'' + row.EName + '\',\'' + row.DName + '\',\'' + row.ZName + '\',\'' + row.EQBH + '\',\'' + row.EType + '\')" ' +
        ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6c9;</i></a> ';
    return e;
}

function eq_detail_show(eqbh, ename) {
    layer.open({
        title: "详细信息",
        type: 2,
        area: ['850px', '750px'],
        maxmin: true,
        content: ['../Sensor/details.html?EQBH=' + eqbh, 'yes']
    });
}

// 仪器地图定位(昌鹏修改  2016.4.5)
function eq_mappos_show(title, ename, dname, zname, eqbh, etype) {
    /*
    if (!x) {
        layer.msg('坐标异常,无法进行定位!', { icon: 0, time: 1000 });
        return;
    }
    if (!y) {
        layer.msg('坐标异常,无法进行定位!', { icon: 0, time: 1000 });
        return;
    }
    if (x == "null" || y == "null") {
        layer.msg('坐标异常,无法进行定位!', { icon: 0, time: 1000 });
        return;
    }
    layer.open({
        title: zname,
        type: 2,
        area: ['750px', '700px'],
        content: ['../Sensor/ShowEqPosOnMap?x=' + x + '&y=' + y, 'no']
    });
*/


    console.log(zname); //雨量滑坡监测(0028-GX-1A)
    console.log(dname); //香樟坪1号(01)
    console.log(ename); //1号点(003)
    zname = zname.split("("); //0028-GX-1A)
    dname = dname.split("("); //01)
    ename = ename.split("("); //003)

    zname = zname[1];
    dname = dname[1];
    ename = ename[1];

    zname = zname.split(")");
    dname = dname.split(")");
    ename = ename.split(")");
    zname = zname[0];
    dname = dname[0];
    ename = ename[0];
    console.log(zname); //0028-GX-1A
    console.log(dname); //01
    console.log(ename); //003
    window.location.href = "../Home/Index.html?zname=" + zname + "&dname=" + dname + "&ename=" + ename;
}

// 设备图片
function formatEqPic(value, row, index) {
    var e = '<a  title="设备图片" href="javascript:;" onclick="eq_pic_show(\'' + row.EQBH + '\')" ' +
        ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe685;</i></a> ';
    return e;
}

// 点击列表中的查看图片图标,进入图片展示界面 (昌鹏修改  2016.4.5)
function eq_pic_show(eqbh) {
    layer_show("设备图片", root + "/Sensor/ShowEqPic.html?eqbh=" + eqbh, '860', '660');
}

//// 显示单张仪器图片(昌鹏修改  2016.4.5)
//function show_eq_pic(index,eqbh) {
//    $.post("/Sensor/GetEqPicData2Json", { eqbh: eqbh }, function (data) {
//        layer.photos({
//            photos: {
//                "title": "相册", //相册标题
//                "id": 123, //相册id
//                "start": index, //初始显示的图片序号，默认0
//                "data": data//相册包含的图片，数组格式
//            }
//        });
//    });
//}

// 监测数据
function formatMinioData(value, row, index) {
    var e = '<a  title="监测数据" href="javascript:;" onclick="eq_datadetail_show(\'' + row.jcsj + '\',\'' + row.EName + '\',\'' + row.DName + '\',\'' + row.EQBH + '\',\'' + row.EType + '\')" ' +
        ' class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe61c;</i></a> ';
    return e;
}

// 监测数据显示
function eq_datadetail_show(title, ename, dname, eqbh, etype) {
    if (etype == 'GNSS') {
        title = ename;
    } else {
        dname = dname.split("(", 1);
        ename = ename.split("(", 1);
        title = dname + "," + ename + " (" + title + ")";
    }
    if (etype == '视频' || etype == '显示屏' || etype == '广播站') {
        layer.msg('该仪器没有监测数据!', { icon: 0, time: 1300 });
    } else {
        layer_show(title, "../Sensor/JCDEQDataDetail.html?etype=" + etype + "&eqbh=" + eqbh, '1040', '700');
    }
}


SensorIndex.LoadGridByJCDBH = function(jcdbh) {
    var queryData = { jcdbh: jcdbh };
    var name = 'Amy';
    console.log(name + ' is my friend');
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
        fit: false, //自动大小  
        url: '../Sensor/GetSensorListByJCDBH',
        queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: true,
        singleSelect: true, //是否单选
        pagination: true, //分页控件
        rownumbers: true, //行号
        columns: [
            [

                { field: 'DName', title: '监测终端', width: 100, formatter: formatShowCell },
                { field: 'EName', title: '闸控设备', width: 150, formatter: formatShowCell },
                { field: 'EType', title: '监测类型', width: 70, align: 'center' },
                { field: 'power', title: '电池电量', width: 70, align: 'center' },
                { field: 'RunState', title: '仪器状态', width: 70, align: 'center' },
                { field: 'rData', title: '实时数据', width: 200, align: 'center' },
                { field: 'rTime', title: '采集时间', width: 115, align: 'center' },
                { field: 'jcsj', title: '历史数据', width: 60, align: 'center', formatter: formatMinioData }
            ]
        ]
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
                iconCls: 'icon-export',
                text: '导出Excel(完整)',
                handler: function() { exportexcel(queryData, "excel_0"); }
            },
            {
                iconCls: 'icon-export',
                text: '导出Excel(仅当前页)',
                handler: function() { exportexcel(queryData, "excel_00", $('#list_data').datagrid('options').pageNumber, $('#list_data').datagrid('options').pageSize); }
            }
        ]
    });

    //var s = window.location.href;
    //var index = s.indexOf("?");
    //window.location.href = s.substring(0, index);
};

function formatShowCell(value) {
    return "<span title='" + value + "'>" + value + "</span>";
};