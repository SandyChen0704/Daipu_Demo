$(document).ready(function () {
    //alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();

    //新增按鈕
    $("#addbutton").click(function () {
        $("#dialog-addconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,//dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                //自訂button名稱
                "新增": function (e) {
                    var url = "ajax/ajaxCard";
                    var cnname = $("#addcnname").val();
                    var enname = $("#addenname").val();
                    var sex = $('input:radio:checked[name="addsex"]').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    ajaxobj.add();

                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {
                    $("#addform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    //搜尋按鈕
    $("#searchbutton").click(function () {
        $("#dialog-searchconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,//dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                //自訂button名稱
                "搜尋": function (e) {
                    var url = "ajax/ajaxCard";
                    //var data = $("#searchform").serialize();
                    var cnname = $("#secnname").val();
                    var enname = $("#seenname").val();
                    var sex = $('input:radio:checked[name="sesex"]').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    ajaxobj.search();

                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {

                    $("#searchform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    // 修改鈕
    $("#cardtable").on('click', '.btn-warning', function () {
        var modifyid = $(this).attr('id').substring(12);
        //alert("modifyid");
        $.ajax({
            url: "ajax/ajaxCard_modify_get.txt",//"welcome/ajaxCard",//
            type: "POST",
            data: ({'operate':'modified','id': modifyid}),
            dataType: 'json',
            success: function (response) {
                $("#mocnname").val(response[0].cnname);
                $("#moenname").val(response[0].enname);
                if (response[0].sex == 0) {
                    $("#modifyman").prop("checked", true);
                    $("#modifywoman").prop("checked", false);
                }
                else {
                    $("#modifyman").prop("checked", false);
                    $("#modifywoman").prop("checked", true);
                }
                $("#modifysid").val(modifyid);
                $("#dialog-modifyconfirm").dialog({
                    resizable: true,
                    height: $(window).height() * 0.4,//dialog視窗度
                    width: $(window).width() * 0.4,
                    modal: true,
                    buttons: {
                        //自訂button名稱
                        "修改": function (e) {
                            //$("#modifyform").submit();
                            var url = "ajax/ajaxCard";
                            var cnname = $("#mocnname").val();
                            var enname = $("#moenname").val();
                            var sex = $('input:radio:checked[name="mosex"]').val();
                            var ajaxobj = new AjaxObject(url, 'json');
                            ajaxobj.cnname = cnname;
                            ajaxobj.enname = enname;
                            ajaxobj.sex = sex;
                            ajaxobj.id = modifyid;
                            ajaxobj.modify();

                            e.preventDefault(); // avoid to execute the actual submit of the form.
                        },
                        "重新填寫": function () {
                            $("#modifyform")[0].reset();
                        },
                        "取消": function () {
                            $(this).dialog("close");
                        }
                    },
                    error: function (exception) { alert('Exeption:' + exception); }
                });
            }
        });
    })
    $("#cardtable").on('click', '.btn-danger', function () {
        var deleteid = $(this).attr('id').substring(12);
        var url = "ajax/ajaxCard";
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.id = deleteid;
        ajaxobj.delete();
    })

    //自適應視窗
    $(window).resize(function () {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.4;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.4;
        $("#dialog-confirm").dialog("option", "width", dWidth);
        $("#dialog-confirm").dialog("option", "height", dHeight);
    });
});
function refreshTable(data) {
    //var HTML = '';
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr></tr>");
        row.append($("<td></td>").html(item.cnname));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(strsex));
        row.append($("<td></td>").html('<button id="modifybutton' + item.s_sn + '"class="btn btn-warning" style="font-size:16px;font-weight:bold;">修改 <span class="glyphicon glyphicon-list-alt"></span></button>'));
        row.append($("<td></td>").html('<button id="deletebutton' + item.s_sn + '"class="btn btn-danger" style="font-size:16px;font-weight:bold;">刪除 <span class="glyphicon glyphicon-trash"></span></button>'));
        $("#cardtable").append(row);
        // HTML += '<tr><td>' + item.cnname + '</td><td>' + item.enname +'</td><td>' + strsex + 
        // '</td><td><button id="modifybutton'+ item.s_sn +
        // '"class="btn btn-warning" style="font-size:16px;font-weight:bold;">修改 <span class="glyphicon glyphicon-list-alt"></span></button></td><td><a id="deletebutton'
        // + item.s_sn+'"class="btn btn-danger" style="font-size:16px;font-weight:bold;">刪除 <span class="glyphicon glyphicon-trash"></span></button></td></tr>';
    });
    //$('#cardtable').append(HTML);
}
/**
 * 
 * @param string url 呼叫controller的url
 * @param string datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}
AjaxObject.prototype.getall = function () {
    $.ajax({
        type: "POST",
        url: "ajax/ajaxCard_get.txt",
        data: ({"operate":"get"}),
        dataType: "json",
        success: function (data) {
            refreshTable(data);
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });
}
AjaxObject.prototype.add = function () {
    $.ajax({
        type: "POST",
        url: this.url+"_add.txt",//'welcome/ajaxCard',//this.url,
        data: ({'operate':'add', 'cnname':this.cnname, 'enname':this.enname, 'sex':this.sex}),  // serializes the form's elements.
        dataType: this.datatype,
        success: function (response) {
            //alert(response);
            $("#dialog-addconfirm").dialog("close");
            refreshTable(response);
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });
}
AjaxObject.prototype.modify = function () {
    $.ajax({
        type: "POST",
        url: "ajax/ajaxCard_modify_response.txt",//this.url,
        data: ({'operate':'modifiedsub', 'cnname':this.cnname, 'enname':this.enname, 'sex':this.sex, 'id':this.id}),  // serializes the form's elements.
        dataType: this.datatype,
        success: function (response) {
            //alert(response);
            $("#dialog-modifyconfirm").dialog("close");
            refreshTable(response);
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });
}
AjaxObject.prototype.search = function () {
    $.ajax({
        type: "POST",
        url: this.url+"_search.txt",
        data: ({'operate':'search', 'cnname':this.cnname, 'enname':this.enname, 'sex':this.sex}),  // serializes the form's elements.
        dataType: this.datatype,
        success: function (response) {
            //alert(response);
            $("#dialog-searchconfirm").dialog("close");
            refreshTable(response);
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });
}
AjaxObject.prototype.delete = function () {
    $.ajax({
        type: "POST",
        url: this.url+"_delete.txt",
        data: ({'operate':'deleted','id': this.id}),
        dataType: this.datatype,
        success: function (response) {
            refreshTable(response);
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });
}


        //How to resize jquery ui dialog with browser
        //http://stackoverflow.com/questions/9879571/how-to-resize-jquery-ui-dialog-with-browser