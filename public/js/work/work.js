/**
 * Created by lyy on 2017/6/8.
 */
var viewFontSize = 180;
function addFontSize() {
    viewFontSize += 2 ;
    //$('#V_order').css({fontSize:viewFontSize+ "px",marginTop:viewFontSize*2 + "px"});
    $('#V_segment').css({fontSize:viewFontSize + "px",marginTop:"-" + viewFontSize + "px"});
}
function subtractFontSize() {
    viewFontSize -= 2 ;
    //$('#V_order').css({fontSize:viewFontSize + "px",marginTop:viewFontSize*2 + "px"});
    $('#V_segment').css({fontSize:viewFontSize + "px",marginTop:"-" + viewFontSize + "px"});
}
function getOrderInfo(order) {
    $('#V_order').text(order);
    $('#V_segment').text("查询中……");
    $.ajax({
        url: '/getOrderInfo' ,
        type: 'get',
        data: {
            order:order
        },
        success: function (res) {
            $('#orderInput').val("");
            $('#V_segment').text(res.segment);
            $('#V_post').text(res.post);
        },
        error: function (e) {
            $('#orderInput').val("");
            $('#V_segment').text(e.toString());
        }
    });
}
$(function () {
    $('#V_segment').css({fontSize:viewFontSize + "px",marginTop:"-" + viewFontSize + "px"});
    $('#addFontSize').bind("click",addFontSize) ;
    $('#subtractFontSize').bind("click",subtractFontSize) ;
    $('#orderInput').bind('keydown',function(event){
        if(event.keyCode == "13")
        {
            getOrderInfo($('#orderInput').val());
        }
    });
});