$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail = "getmoneyctrl";
  var search = location.search;
  search = search.slice(1);
  var searchArr = search.split("=");
  var pageid = searchArr[1];
  console.log(pageid);
  var totalPage = 0;
  function render(pageid) {
    $.ajax({
      type:"get",
      url:address(detail),
      dataType:"json",
      data:{
        pageid:pageid
      },
      success:function (data) {
        $(".save_money ul").html(template("tpl",data));
        console.log(data);
       totalPage = Math.ceil(data.totalCount/data.pagesize);
        data.totalPage = totalPage;
        data.pageid = pageid;
        $(".page_option").html(template("tpl1",data));
        $('.page_option').val(pageid);
      }
    })
  }
render(pageid);
  $(".next_page").on("click",function () {
      if(pageid < totalPage){
        pageid++;
        location.href ="moneyctrl.html?pageid="+pageid;
        render(pageid);
      }
  });
  $(".prev_page").on("click",function () {
    if(pageid > 1){
      pageid--;
      location.href ="moneyctrl.html?pageid="+pageid;
      render(pageid);
    }
  });
  $(".page_option").on("change",function () {
    pageid = $(this).val();
    location.href ="moneyctrl.html?pageid="+pageid;
    render(pageid);
  })
})
