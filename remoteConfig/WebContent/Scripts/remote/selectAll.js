layui.use(['form', 'jquery'], function() {
    var form = layui.form;
    var $ = layui.jquery;
    var child = $("#channel [lay-filter='checkOne']");
    var checkAll = $("#channel [lay-filter='checkAll']")[0];
    var allinput = $("#channel .layui-input-inline input");

    form.on('checkbox(checkAll)', function(data) {
        child.each(function(index, item) {
            item.checked = data.elem.checked;
        });
        allinput.each(function(index, item) {
            item.disabled = !checkAll.checked;
        })
        form.render('checkbox');
    });
    form.on('checkbox(checkOne)', function(data) {
        var checked = $("#channel [lay-filter='checkOne']:checked");
        console.log(checked.length);
        if (checked.length === child.length) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
        $(this).siblings(".layui-inline").find("input,option").not(".layui-unselect").each(function(index, item) {
            item.disabled = !data.elem.checked;
        });
        form.render('checkbox');
    });


});