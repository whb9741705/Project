
/**
 * 关闭弹出框口
 */
function layer_close() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

/**
 * validForm验证
 */
function validForm() {
    $(".registerform").Validform({
        tiptype: function (msg, o, cssctl) {
            //msg：提示信息;
            //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），
            //type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
            //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;

            if (!o.obj.is("form")) {//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                var objtip = o.obj.parents("td").find(".Validform_checktip");
                cssctl(objtip, o.type);
                objtip.text(msg);
                var infoObj = o.obj.parents("td").find(".info");
                if (o.type == 2 || o.type == 4) {
                    infoObj.fadeOut(200);
                } else {
                    if (infoObj.is(":visible")) { return; }
                    var left = o.obj.offset().left,
                        top = o.obj.offset().top;

                    infoObj.css({
                        left: left + 10,
                        top: top - 45
                    }).show().animate({
                        top: top - 35
                    }, 200);
                }
            }
        },
        datatype: {//传入自定义datatype类型 小数
            "f": /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/
        },
        ajaxPost: true,
        callback: function (data) {
            if (data.success) {
                var index = parent.layer.getFrameIndex(window.name);
                parent.$('.btn-success').click();
                parent.layer.close(index);
            }
        }
    });
}

/****************  上传与删除图片部分  ******************/

/**
 * 添加界面的上传与删除图片部分
 */
function uploadImg(UpLoadController, DeleteFileController, filepathlist, hidfilepathlist, filepath, UploadType, filePicker, fileList) {
    var $list = $(fileList);
    // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,
    // 缩略图大小
    thumbnailWidth = 90 * ratio,
    thumbnailHeight = 90 * ratio;

    //文件列表
    var jsonData = {
        fileList: []
    };

    // Web Uploader实例
    var uploader;
    uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,

        disableGlobalDnd: true,
        // swf文件路径
        swf: applicationPath + '/lib/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: applicationPath + UpLoadController,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: filePicker,

        //只允许选择图片
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        compress: {
            width: 1200,
            height: 1200,

            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 90,

            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,

            // 是否允许裁剪。
            crop: false,

            // 是否保留头部meta信息。
            preserveHeaders: true,

            // 如果发现压缩后文件大小比原来还大，则使用原来图片
            // 此属性可能会影响图片自动纠正功能
            noCompressIfLarger: false,

            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: 0
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $(
                '<div id="' + file.id + '" class="cp_img">' +
                    '<img>' +
                '<div class="cp_img_jian"></div></div>'
                ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $list.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);

        }, thumbnailWidth, thumbnailHeight);
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        $('#' + file.id).addClass('upload-state-done');
        $(filepathlist).append(response.filePath);
        $(hidfilepathlist).val($(filepathlist).html());

        var fileEvent = {
            queueId: file.id,
            filePath: response.filePath
        };
        jsonData.fileList.push(fileEvent)

    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    //所有文件上传完毕
    uploader.on("uploadFinished", function () {
        //提交表单

    });

    ////开始上传
    //$("#ctlBtn").click(function () {
    //    uploader.upload();

    //});

    //显示删除按钮
    $(".cp_img").live("mouseover", function () {
        $(this).children(".cp_img_jian").css('display', 'block');
    });
    //隐藏删除按钮
    $(".cp_img").live("mouseout", function () {
        $(this).children(".cp_img_jian").css('display', 'none');
    });
    //执行删除方法
    $list.on("click", ".cp_img_jian", function () {
        var $ele = $(this);
        try {
            var id = $ele.parent().attr("id");
            if (UploadType == "add") {
                var deletefile = {};
                $.each(jsonData.fileList, function (index, item) {
                    if (item && item.queueId === id) {
                        uploader.removeFile(uploader.getFile(id));
                        deletefile = jsonData.fileList.splice(index, 1)[0];
                        var pathlist = $(filepathlist).html().replace(deletefile.filePath, "");

                        $(filepathlist).html(pathlist);
                        $(hidfilepathlist).val($(filepathlist).html());

                        $.post(applicationPath + DeleteFileController, { 'filePathName': deletefile.filePath, 'filePath': $(filepath).val() }, function (returndata) {

                            $ele.parent().remove();
                        });
                        return;
                    }
                });
            }
            else {
                var iscon = id.indexOf("WU_FILE");
                if (iscon > -1) {
                    var deletefile = {};
                    $.each(jsonData.fileList, function (index, item) {
                        if (item && item.queueId === id) {
                            uploader.removeFile(uploader.getFile(id));
                            deletefile = jsonData.fileList.splice(index, 1)[0];
                            var pathlist = $(filepathlist.html().replace(deletefile.filePath, ""));

                            $(filepathlist).html(pathlist);
                            $(hidfilepathlist).val($(filepathlist).html());

                            $.post(applicationPath + DeleteFileController, { 'filePathName': deletefile.filePath, 'filePath': $(filepath).val() }, function (returndata) {
                                $ele.parent().remove();
                            });
                            return;
                        }
                    });
                }
                else {
                    //上次已经上传过的图片
                    var pathlist = $(filepathlist).html().replace(id + ";", "");

                    $(filepathlist).html(pathlist);
                    $(hidfilepathlist).val($(filepathlist).html());

                    $.post(applicationPath + DeleteFileController, { 'filePathName': id, 'filePath': $(filepath).val() }, function (returndata) {
                        $ele.parent().remove();
                    });
                }
            }

        } catch (e) {


        }
    });
}

