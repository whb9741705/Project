var RePerson = {};

RePerson.InitGrid = function () {
    grid = $('#list_data').datagrid({
        title: '',
        iconCls: 'icon-view', //图标
        loadMsg: "数据加载中，请稍后......",
        width: 'auto',
        height: 'auto',
        nowrap: false,
        striped: true,
        border: true,
        collapsible: false, //是否可折叠
        fitColumns: true,
        scrollbarSize: 0,
        fit: true, //自动大小  
        url: '../RePerson/LoadList',
        //queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 30,
        pageList: [30, 50, 100],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
          { field: 'SNum', title: '站点编号', width: 50 },
          { field: 'SName', title: '站点名', width: 50 },
          { field: 'RName', title: '姓名', width: 50 },
          { field: 'RPhone', title: '手机号码', width: 60 },
          { field: 'RAddress', title: '地址', width: 120 },
          { field: 'RPart', title: '单位', width: 100 },
          { field: 'RPartTel', title: '单位电话', width: 50 },
          { field: 'Remark', title: '备注', width: 100 },
          { field: 'ID', title: '操作', width: 80, align: 'center', formatter: formatOper }
          
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
    var e = '<a  title="编辑" href="javascript:;" onclick="member_edit(\'' + row["ID"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a> ';
    var d = '<a  title="删除" href="javascript:;" onclick="member_del(\'' + row["ID"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a> ';
    return e + d;
}

// 添加信息
function member_add() {
    layer_show("添加责任人", "../RePerson/AddIndex", '', '630');
}

// 编辑信息
function member_edit(id) {
    layer_show("编辑责任人", "../RePerson/EditIndex?id=" + id, '', '560');
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
                url: '../RePerson/Del',
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


