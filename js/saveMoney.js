$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail1 = "getmoneyctrl";
  var search = location.search;
  search = search.slice(1);
  // console.log(search);
  var serachArr = search.split("=");
  var pageid = serachArr[1];
  // console.log(pageid);
  //内容渲染
  var totalPage = 0;
  function contentRender(pageid) {
    $.ajax({
      type: "get",
      url: address(detail1),
      data: {
        pageid: pageid
      },
      dataType: "json",
      success: function (data) {
        $(".save_money ul").html(template("tpl", data));
        console.log(data);
       totalPage = Math.ceil(data.totalCount / data.pagesize);
        data.totalPage = totalPage;
        data.pageid = pageid ;
        $(".page_option").html(template("tpl1",data));
           $(".page_option").val(pageid);
      }
    })
  }
 contentRender(pageid);
$(".page_option").on("change",function () {
  pageid = $(this).val();
    location.href = "savemoney.html?pageid="+pageid;
  contentRender(pageid);
})
  $(".prev_page").on("click",function () {
      if(pageid > 1){
        pageid--;
        location.href = "savemoney.html?pageid="+pageid;
        contentRender(pageid);
      }
  })
  $(".next_page").on("click",function () {
      if(pageid < totalPage){
        pageid++;
        location.href = "savemoney.html?pageid="+pageid;
        contentRender(pageid);
      }
  })
})
