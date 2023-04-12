var Email = {};

Email.LoadZHD = function (id) {

    $('#txt_zhdlist').combotree({
        url: '/WarningSet/GetZhdList?id=' + id,
        multiple: true
    });
};

Email.InitGrid = function () {

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
        url: '/WarningSet/LoadEmail',
        pageNumber: 1, //默认显示第几页 
        pageSize: 20,
        pageList: [20, 30, 60],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
            { field: 'RecName', title: '接收人', width: 40 },
            { field: 'RecEmail', title: 'Email地址', width: 120 },
            { field: 'IsRec', title: '自动接收', width: 60, align: 'center', formatter: formatisrec }
            
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
        }]
    });
};


//是否自动接收
function formatisrec(value, row, index) {
    var e = '<i class="Hui-iconfont">&#xe6dd;</i> ';
    if (value == "True") {

        e = '<i class="Hui-iconfont">&#xe6a8;</i> ';
    }

    return e;
}


/**
 * 弹出添加界面
 */
function newData() {
    layer_show("添加", "/WarningSet/AddEmail", '', '450');
}
function check() {
    var result = "";
    var tels = $('#txt_zhdlist').combogrid("getValues");
    $.each(tels, function (i, v) {
        result +=  v + ",";
    });
    result = result.substring(0, result.length - 1);
    $('#txt_zhdlist1').val(result);


    return true;
}

/**
 * 弹出修改界面
 */
function editData() {
    var row = $('#list_data').datagrid('getSelected');
    if (row) {
        layer_show("编辑", "/WarningSet/EditEmail?id=" + row.ID, '', '450');
    }
    else {
        layer.alert('请选择要编辑的记录!');
    }
}

/**
 * 删除数据
 */
function destroyData() {
    var row = $('#list_data').datagrid('getSelected');
    if (row) {
        layer.confirm('确定要删除此记录吗？', {
            btn: ['确定', '取消']
        }, function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    async: false,
                    cache: false,
                    url: '/WarningSet/DeleteEmail',
                    data: { id: row.ID },
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
        layer.alert('请选择要删除的灾害点!');
    }
}