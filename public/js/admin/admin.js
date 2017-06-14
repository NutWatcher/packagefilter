/**
 * Created by lyy on 2017/6/8.
 */
function doUpload(event) {
    event.stopPropagation();
    var formData = new FormData($( "#uploadPackageFile" )[0]);
    console.log(formData);
    $.ajax({
        url: '/admin/uploadPackageFile' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            getTaskList();
        },
        error: function (e) {
            alert(e.toString());
        }
    });
}
function getTaskList() {
    $('#taskList').find('tbody').children().remove() ;
    $.ajax({
        url: '/admin/taskList' ,
        type: 'get',
        success: function (res) {
            if (res.success != false) {
                var taskList = res.taskList;
                for (var i = 0; i < taskList.length; i++) {
                    var str = "<td>" + taskList[i].name + "</td>";
                    str += "<td>" + new Date(taskList[i].create_time).toLocaleString() + "</td>";
                    str += "<td>" + taskList[i].num + "</td>";
                    str += "<td>" + taskList[i].status + "</td>";
                    /*if (taskList[i].status = "准备导入") {
                        str += `<td><button class="btn btn-warning" >导入</button></td>`;
                    }*/
                    $('#taskList').find('tbody').append("<tr>" + str + "</tr>");
                }
            } else {
                alert(res.msg);
            }
        },
        error: function (e) {
            alert(e.toString());
        }
    });
}
$(function () {
    getTaskList();
    $('#Btn_uploadPackageFile').bind("click",doUpload) ;
});