var Sensor = {};

//var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
//var pathName = window.document.location.pathname;
//var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
//var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
//var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
//var root = localhostPaht + projectName;


/****************  后台管理部分  ******************/

/**
 * 绑定数据列表
 */
Sensor.InitGrid = function () {
    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 760,
        height: 'auto',
        nowrap: true,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        fit: true, //自动大小
        url: '../Sensor/LoadData',
        pageNumber: 1, //默认显示第几页 
        pageSize: 20,
        pageList: [20, 30, 60],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
            { field: 'ZName', title: '灾害点名称', width: 100 },
            { field: 'Dname', title: '监测点名称', width: 100 },
            { field: 'EName', title: '仪器名称', width: 100 },
            { field: 'EType', title: '仪器类型', width: 50 },
            { field: 'Estate', title: '仪器状态', width: 50 },
            { field: 'Tmission', title: '协议类型', width: 50 },
            { field: 'SImID', title: 'SIM卡号', width: 90 },
            { field: 'X', title: '经度', width: 90 },
            { field: 'Y', title: '纬度', width: 90 }
        ]]
    });

    //设置分页控件
    var p = $('#list_data').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '页     共{pages}页',
        displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
        buttons: [{
            iconCls: 'icon-add',
            text: '添加',
            handler: function () { newData(); }
        }, {
            iconCls: 'icon-edit',
            text: '修改',
            handler: function () { editData() }
        }, {
            iconCls: 'icon-remove',
            text: '删除',
            handler: function () { destroyData() }
        }, {
            iconCls: 'icon-export',
            text: '导出Excel',
            handler: function () { exportexcel(); }
        }]
    });
};

function exportexcel() {
    var url = "../Sensor/ExportALL";
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
/**
 * 弹出添加界面
 */
function newData() {
    layer_show("添加", "../Sensor/AddSensorPage", '', '840');
}

/**
 * 弹出修改界面
 */
function editData() {
    var row = $('#list_data').datagrid('getSelected');
    if (row) {
        layer_show("编辑", "../Sensor/EditSensorPage?EQBH=" + row.EQBH, '', '840');
    }
    else {
        layer.alert('请选择要编辑的监测仪器!');
    }
}

/**
 * 删除数据
 */
function destroyData() {
    var row = $('#list_data').datagrid('getSelected');
    if (row) {
        layer.confirm('确定要删除此监测仪器吗？', {
            btn: ['确定', '取消']
        }, function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    async: false,
                    cache: false,
                    url: '../Sensor/Delete',
                    data: { eqbh: row.EQBH },
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
    }
    else {
        layer.alert('请选择要删除的监测仪器!');
    }
}

/**
 * 灾害点控件改变事件
 */
function ZhdChange() {
    $("#sel_tybh").change(function () {
        var value = $(this).children('option:selected').val();
        if (value == '') {
            $('#sel_jcdbh').empty();
            $('#sel_jcdbh').append("<option value=''>--请选择--</option>");
        } else
            BindJCDList(value);
    });
}

/**
 * 绑定灾害点下拉框
 */
function BindZHDList() {
    $("#sel_tybh").empty();
    $.ajax({
        type: "GET",
        url: '../Disaster/GetZHD',
        async: false,
        success: function (msg) { //请求成功时调用的函数
            $("#sel_tybh").append("<option value='' selected='selected'>--请选择--</option>");
            $.each(msg.data, function (i, v) {
                $("#sel_tybh").append("<option value='" + v.TYBH + "'>" + v.ZName + "</option>");
            });
        }
    });
}

/**
 * 绑定监测点下拉框
 */
function BindJCDList(val) {
    $("#sel_jcdbh").empty();
    $.ajax({
        type: "GET",
        url: '../Monit/GetJCD',
        data: { tybh: val },
        async: false,
        success: function (msg) { //请求成功时调用的函数
            $("#sel_jcdbh").append("<option value='' selected='selected'>--请选择--</option>");
            $.each(msg.data, function (i, v) {
                $("#sel_jcdbh").append("<option value='" + v.JCDBH + "'>" + v.Dname + "</option>");
            });
        }
    });
}

/**
 * 修改页面时为select控件绑定值
 */
function BindSelect(value, id) {
    $(id + ' option').each(
        function () {
            $(this).removeAttr("selected");
            var aa = $(this).val();
            if (value == "True" || value == "False")
                value = value.toLowerCase();
            if ($(this).val() == value) {
                $(this).attr("selected", true);
            }
        }
    );

    if (id == "#sel_tybh") {
        $(id).trigger("change");
    }
}