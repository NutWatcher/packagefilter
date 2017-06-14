/**
 * Created by lyy on 2017/6/8.
 */
function addSegment(event) {
    event.stopPropagation();
    event.preventDefault()
    $.ajax({
        url: '/admin/addSegment' ,
        type: 'POST',
        data: {
            startPost: $('#startPost').val(),
            endPost: $('#endPost').val(),
            segmentValue: $('#segmentValue').val()
        },
        success: function (res) {
            if (res.success == true){
                getSegmentList();
                alert("成功");
            }
            else{
                alert(res.msg);
            }
        },
        error: function (e) {
            alert(e.toString());
        }
    });
}
function deleteSegment(id) {
    //alert(id);
    $.ajax({
        url: '/admin/deleteSegment' ,
        type: 'POST',
        data: {
            id:id
        },
        success: function (res) {
            if (res.success == true){
                getSegmentList();
                alert("成功");
            }
            else{
                alert(res.msg);
            }
        },
        error: function (e) {
            alert(e.toString());
        }
    });
}
function getSegmentList() {
    $('#segmentList').find('tbody').children().remove() ;
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
                    str += `<td><button  onClick="deleteSegment(`+segmentList[i].id+`)" class="btn btn-danger" >删除</button></td>`;
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
    getSegmentList();
    $('#Btn_addSegment').bind("click",addSegment) ;
 //   $('#addSegmentModal').modal('show');
});