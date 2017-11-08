$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail = "getmoneyctrlproduct";
  var search = location.search;
  search = search.slice(1);
  var searchArr = search.split("=");
  // console.log(searchArr);
  var productid = searchArr[1];
  $.ajax({
      type:"get",
      url:address(detail),
      data:{
        productid:productid
      },
    dataType:"json",
    success:function (data) {
      console.log(data);
      $(".save_content").html(template("tpl",data));
      $(".new_com").html(template("tpl1",data));
    }
    })
  
})
