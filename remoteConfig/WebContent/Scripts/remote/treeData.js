$(function() {
    tree = function(data) {
        layui.use(['tree', 'jquery'], function() {
            var tree = layui.tree;
            var $ = layui.jquery;
            //渲染
            var inst1 = tree.render({
                elem: '#deviceTree',
                data: data,
                showLine: false,
                click: function(obj) {
                    node = obj.data;
                    node= remoteDetail.basic(node.tns)[0];
                    $(obj.elem).siblings().find(".layui-tree-txt").removeClass("tree-node-checked tree-node-checked:hover");
                    $(obj.elem).find(".layui-tree-txt").addClass("tree-node-checked tree-node-checked:hover");
                    //window.alert(node.svr);
                    var a=node.svr;
                    if(a){
						if(a[0]=='V')
						{
							$("#content_index").attr("src", "config.html");//"config.html");//在这里
						}
						else 
						{
							var ssvr=a.split("-");
						
						if(ssvr[0]=="CR120")
						{
							if(ssvr[2].substring(0,3)=="BAS")
							{
								$("#content_index").attr("src", "config120bas.html");
							}
							else if(ssvr[2].substring(0,3)=="MQT")
							{
								$("#content_index").attr("src", "config120mqt.html");
							}
							else
							{
								$("#content_index").attr("src", "config.html");
							}
						}
						else if(ssvr[0]=="CR680")
						{
							$("#content_index").attr("src", "config680.html");
						}
						else {
							$("#content_index").attr("src", "config.html");//在这里
						}
						}
					}
					else{
						$("#content_index").attr("src", "config.html");//在这里
					}
                    //if(node.svr=="1"){window.alert("aaaa");}
                }
            });
        });
        // 节点左侧小圆点显示在线状态
        $(function() {
            var txt = $(".layui-tree-txt");
            for (var i = 0; i < data.length; i++) {
                if (data[i].isOnline === "1") {
                    $(txt[i]).before('<span class="layui-badge-dot" style="margin:-1px -12px 0px;background-color:#3de46c"></span>');
                } else {
                    $(txt[i]).before('<span class="layui-badge-dot" style="margin:-1px -12px 0px;background-color:rgb(255,255,255,0.5)"></span>');
                }
            }
        });
    };
    // 初始化导航树
    var basic = remoteDetail.basic()
	//console.log(basic)
    
    // 左侧导航标签切换筛选条件
    $(".tree-type-btn").on("click",function() {
        $(this).siblings().removeClass("tree-type-btn-checked");
        $(this).addClass("tree-type-btn-checked")
        for (var i = 0; i < basic.length; i++) {
                basic[i].title = basic[i].terminalNum;
            }
        if ($(this).index() === 0) {
            for (var i = 0; i < basic.length; i++) {
                basic[i].title = basic[i].terminalNum;
            }
        } else if ($(this).index() === 1) {
            for (var i = 0; i < basic.length; i++) {
                basic[i].title = basic[i].tns;
            }
            $("#deviceTree").css("padding-left","30px");
        }
        $("#search").val("");
        tree(basic);
    });
	$("#tab-terminalNum").click()
    // 搜索框筛选
    $("#search").on("keyup", function() {
        var input = $(this).val().toUpperCase();
        var result = $.extend(true, [], basic);
        regexp = new RegExp(input, "i");
        for (var i = 0; i < result.length; i++) {
            if (!regexp.test(result[i].title)) {
                result.splice(i, 1);
                i--;
            }
        }
        tree(result);
        $(function() {
            $(".layui-tree-txt").each(function(index, item) {
                var str = $(item).html().replace(input, "<span>" + input + "</span>");
                $(item).html(str);
            })
        })
    })
	tree(basic)
})