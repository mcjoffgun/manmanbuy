$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail = "getcategorybyid";
  var detail2 = "getproductlist"
  //获取地址栏参数
  var search = location.search;
  // console.log(search);?categoryid=0&category=%E7%94%B5%E8%A7%86
  search = search.slice(1);
  var searchArr = search.split("&");
  // console.log(searchArr);
  var obj = {};
  for (var i = 0; i < searchArr.length; i++) {
    //第一次循环i=0 ,categoryid=0,将其分成两个数组，取下标为0 的值，
    // 第二次循环 i=1，category=%E7%94%B5%E8%A7%86，将其分成两个数组，取下标为0的值
    var key = searchArr[i].split("=")[0];
    // console.log(key);
    //第一次循环i=0 ,categoryid=0,将其分成两个数组，取下标为1的值，
    // 第二次循环 i=1，category=%E7%94%B5%E8%A7%86，将其分成两个数组，取下标为1的值
    var value = decodeURI(searchArr[i].split("=")[1]);
    // console.log(value);
    //把属性名和值存储到对象中
    obj[key] = value;
  }
  // console.log(obj);
  var id = obj.categoryid;
  var category = obj.category;
  var pageid = obj.pageid;
  // console.log("hehe");
  // console.log(pageid);
  //发送ajax请求来获取列表信息
  $.ajax({
    type: "get",
    url: address(detail),
    dataType: "json",
    data: {
      categoryid: id
    },
    success: function (data) {
      $(".mmb_nav").html(template("tpl", data));
    }
  })
  //获取列表详细信息
  //先将总页数置为0
  var totalPage = 0;
function render(pageid) {
  $.ajax({
    type: "get",
    url: address(detail2),
    dataType: "json",
    data: {
      categoryid: id,
      category: category,
      pageid: pageid
    },
    success: function (data) {
      console.log(data);
      $(".product_list").html(template("tpl1", data));
     totalPage = Math.ceil(data.totalCount / data.pagesize);
      // 给data添加属性
      data.totalPage = totalPage;
      data.pageid = pageid;
      // console.log(pageid);
      // console.log(data);
      $(".page_option").html(template("tpl2",data));
      $(".page_option").val(pageid);
    }
  })
}
  render(pageid);
  // console.log(pageid);
  $(".prev_page a").on("click",function () {
    if(pageid > 1){
        // console.log(pageid);
        pageid--;
        location.href = "productlist.html?categoryid="+id+"&category="+ category+"&pageid="+pageid;
        render(pageid);
      }
  })
  $(".next_page a").on("click",function () {
    console.log(totalPage);
    if(pageid < totalPage){
      console.log(11);
      pageid++;
      location.href = "productlist.html?categoryid="+id+"&category="+ category+"&pageid="+pageid;
      render(pageid);
    }
  })
  //select值改变实现
  $(".page_option").on("change",function () {
     pageid = $(this).val();
    location.href = "productlist.html?categoryid="+id+" &category="+ category+"&pageid="+pageid;
    render(pageid);
  })
})
