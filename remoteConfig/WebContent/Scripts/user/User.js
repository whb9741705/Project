var User = {};

User.InitGrid = function () {
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
        url: '../User/LoadList',
        //queryParams: queryData,
        pageNumber: 1, //默认显示第几页 
        pageSize: 15,
        pageList: [15, 30, 50],
        remoteSort: false,
        singleSelect: true,  //是否单选
        pagination: true,  //分页控件
        rownumbers: true,  //行号
        columns: [[
          { field: 'userName', title: '用户名', align: 'center', width: 50 },
          { field: 'password', title: '密码', align: 'center', width: 50 },
          { field: 'description', title: '备注', align: 'center', width: 100 }, 
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
	//console.log("row="+row["userName"]);
    var e = '<a  title="编辑" href="javascript:;" onclick="member_edit(\'' + row["userName"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a> ';
    var d = '<a  title="删除" href="javascript:;" onclick="member_del(\'' + row["userName"] + '\')" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a> ';
    if(row["stationNum"]){
    	//if(row["stationNum"].search("JD") != -1) {e='<p style="color:#C0C0C0;">不可更改';d='</p>';}
    	//if(row["stationNum"] == "0") {e='<p style="color:#C0C0C0;">不可更改';d='</p>';}
    	//if(row["stationNum"] == "0028-GX") {e='<p style="color:#C0C0C0;">不可更改';d='</p>';}
    }
    return e + d;
}

// 添加信息
function member_add() {
    layer_show("添加用户", "../User/AddIndex.html", '500', '300');
}

// 编辑信息
function member_edit(userName) {
    layer_show("编辑用户", "../User/EditIndex.html?userName=" + userName, '500', '300');
}

function member_del(username) {
    layer.confirm('确定要删除该用户吗？删除之后有关该用户的所有信息又会被清除，包括传感器信息、终端信息、预警信息等。', {
        btn: ['确定', '取消']
    }, function (r) {
        if (r) {
            $.ajax({
                type: "POST",
                async: false,
                cache: false,
                url: '../User/UserDel',
                data: { username: username },
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


