/**
 * Created by lyy on 2017/6/8.
 */
function doUpload(event) {
    alert(1);
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
function getSegmentList() {
    $.ajax({
        url: '/admin/segmentList' ,
        type: 'get',
        success: function (res) {
            if (res.success != false) {
                var segmentList = res.segmentList;
                for (var i = 0; i < segmentList.length; i++) {
                    var str = "<td>" + segmentList[i].start + "</td>";
                    str += "<td>" + segmentList[i].end + "</td>";
                    str += "<td>" + segmentList[i].value + "</td>";
                    str += `<td><button class="btn btn-danger" >删除</button></td>`;
                    $('#segmentList').find('tbody').append("<tr>" + str + "</tr>");
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
    $('#segmentList').find('tbody').children().remove() ;
    getSegmentList();
    $('#Btn_uploadPackageFile').bind("click",doUpload) ;
});