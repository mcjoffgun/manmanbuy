$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail = "getproduct";
  var detail2 = "getproductcom";
  var search = location.search;
  search = search.slice(1);
  var searchArr = search.split("=");
  var productId = searchArr[1];
  // console.log(productId);
  $.ajax({
    type: "get",
    url: address(detail),
    dataType:"json",
    data:{
      productid:productId
    },
    success:function (data) {
//用拼接和截取字符串的形式将data.result[0].productName截取出来渲染
      var brandName = data.result[0].productName;
      brandName = brandName.split("");
     brandName = brandName[0]+brandName[1];
      data.result[0].brandName = brandName;
      var cateName = data.result[0].productName;
      // 将其转换为数组
      cateName = cateName.split("");
      // console.log(cateName);
      var finalName = cateName[cateName.length-1]
      var firstName = cateName[cateName.length - 2];
      var totalName = firstName + finalName;
      // console.log(totalName);
      data.result[0].totalName = totalName;
      console.log(data);
      $(".mmb_nav").html(template("tpl1",data));
    //  填充第二个
      $(".cate_details_wrapper").html(template("tpl2",data));
      //填充第三个
      $(".cate_shop").html(template("tpl3",data));
    }
  });
  //网友评价
  $.ajax({
    type:"get",
    url:address(detail2),
    data:{
      productid:productId,
    },
    dataType:"json",
    success:function (data) {
      console.log(data);
      $(".comment_details_wrapper").html(template("tpl4",data));
    }
  })
})