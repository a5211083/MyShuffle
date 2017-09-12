// MyShuffle:一个专门处理排序的小工具。感谢并参考了http://blog.csdn.net/csr0312/article/details/48155633的方法

var MyShuffle = new Object();
//list：排序的对象；updown:升序1降序-1
MyShuffle.Upper=function(list,object,updown,isnum){
    var items = $(list).find("li").get();    //获取所有待排序li装入数组items  
    if(typeof isnum=="undefined"||isnum==false){
      isnum=false;
      items.sort(function(a,b)                //调用JavaScript内置函数sort  
      {  
        var elementone = $(a).attr(object);  
        var elementtwo = $(b).attr(object);  
        if(elementone < elementtwo) return -updown;   
        if(elementone > elementtwo) return updown;  
        return 0;  
      });  
    }else{
      items.sort(function(a,b)                //调用JavaScript内置函数sort  
      {  
        var elementone = $(a).attr(object),
        elementone= Number(elementone);  
        var elementtwo = $(b).attr(object),
        elementtwo= Number(elementtwo);  
        if(elementone < elementtwo) return -updown;   
        if(elementone > elementtwo) return updown;  
        return 0;  
      });
    }
    var ul = $(list);  
    $.each(items,function(i,li)       
    //通过遍历每一个数组元素，填充无序列表  
    {  
      ul.append(li);  
    });  
}

// 点击筛选符合条目的清单
// link:点击的筛选按钮，list:点击排序的ul清单，names:筛选的属性名,match:选择器的匹配方式，如^$*

MyShuffle.seleter=function(link,list,names,match){
    link.click(function(){
    $(this).parent().addClass("focus").siblings().removeClass("focus");

    if($(this).attr(names)==undefined){
      list.find("li").show().addClass("show"+names);
    }else{

      if(typeof match=="undefined"){
        match=' ';
      }
      var $name = $(this).attr(names),
      $nameseleter = "li["+names+match+"='"+$name+"']";
      list.find("li").hide().removeClass("show"+names),
      list.find($nameseleter).show().addClass("show"+names);
      // 报错信息
      var err = list.find($nameseleter).eq(0).attr(names);
      if(typeof err=="undefined"){
        alert("没有查询到符合要求的对象");
      }
    }
  })
}

// 数值比较条件筛选函数
MyShuffle.condition=function(link,list,names){
    link.click(function(){
    $(this).parent().addClass("focus").siblings().removeClass("focus");
     if($(this).attr(names)==undefined){
      list.find("li").show().addClass("show"+names);
    }else{
      var $name = $(this).attr(names);
      var $array = $name.split(",");
      var items = $(list).find("li");
      items.show().addClass("show"+names);
      if(Number($array[0])=="undefined"){
        return false;
      };
      $.each(items,function(i,item){
        var $thisname = Number(items.eq(i).attr(names));
        if(Number($array[1])<$thisname){
          items.eq(i).hide().removeClass("show"+names);
        }
        else if(Number($array[0])>$thisname){
          items.eq(i).hide().removeClass("show"+names);
        }
      })
       // 报错信息
      var err = $(list).find("li").is(':visible');
      if(err==false){
        alert("没有查询到符合要求的对象");
      }
    }
  })
}

