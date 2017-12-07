/*轮播图*/       
// function roastpic(){ 
//     var imgList=document.getElementById('img').getElementsByTagName('li');
//     var list=document.getElementById('index').getElementsByTagName('li');
//     var pict = document.getElementById('pict');
//     var prev = document.getElementById('prev');
//     var next = document.getElementById('next');
//     var index=0;
//     var interval = 3000;
//     var timer;
//     function moveImg(list,index) {   
//             for(var i=0;i<list.length;i++){
//                 if(list[i].className=='opa-on'){
//                     list[i].className='';
//                 }
//             }
//             list[index].className='opa-on';
//     }
//     function moveIndex(list,num){
//             for(var i=0;i<list.length;i++){
//                 if(list[i].className=='on'){
//                     list[i].className='';
//                 }
//             }
//             list[num].className='on'; 
//     }
//     for(var i=0;i<list.length;i++){
//             list[i].index=i;
//             list[i].onmouseover= function () {
//                 var clickIndex=parseInt(this.index);
//                 index=clickIndex;
//                 moveImg(imgList,index);
//                 moveIndex(list,index);
//                 clearInterval(timer);            
//             };           
//     }
//     var nextMove=function(){
//             index+=1;
//             if(index>=list.length){
//                 index=0;
//             }
//             moveImg(imgList,index);
//             moveIndex(list,index);
//     };
//     var play=function(){
//             timer=setInterval(function(){
//                 nextMove();
//             }, interval);
//     };
//     next.onclick = function () {
//               nextMove();     
//       }
//     prev.onclick = function () {
//             index-=1;
//             if(index<0){
//                 index=list.length-1;
//             }
//             moveImg(imgList,index);
//             moveIndex(list,index);
//     }
//     pict.onmouseout= function () {
//                 play();
//             }
//     pict.onmouseover=function(){
//           clearInterval(timer);
//     }
//     play();
// }




/*加载函数*/
// function addLoadEvent(func) {
//   var oldonload = window.onload;
//   if (typeof window.onload != 'function') {
//     window.onload = func;
//   } else {
//     window.onload = function() {
//       oldonload();
//       func();
//     }
//   }
// }

// addLoadEvent(roastpic);



// 评论
$(function(){
   //点击评论按钮 
   var $box1=$('.text-box1');    
   var timer;           
        $box1.on('click', '.btn', function(){           
           if($(this).hasClass('btn-off')){
             if($(this).parent().find('.comment').hasClass('a')){
               $(this).parent().find('.comment').removeClass('a');
             }
           } 
           else{          
           var $commentList = $(this).parents('.art').find('#list');
           var $textarea = $(this).parent().find('.comment');
           var $commentBox = $("<div></div>");
           var $html ='';
           $html +=
             '<div class="user">' +
             '<img class="head" src="../images/user2.jpg"/>' +
             '<span class="user-name">Halfboiled-潮</span>' +
             '</div>' +
             '<div class="content">' +
             '<div class="main">' +
             '<p class="txt">'+ $textarea.val() + '</p>' +
             '<span class="time1">' + formateDate(new Date()) + '</span>' +
             '</div>' +
             '<div class="info clearfix">' +
             '<a class="praise" href="javascript:;">赞</a>' +
             '</div>'+
             '<div class="praises-total" total="0" style="display: none;"></div>' +
             '<div class="comment-list"></div>' +
             '<div class="text-box">' +
             '<textarea class="comment" autocomplete="off">评论…</textarea>' +
             '<button class="btn">回 复</button>' +
             '<span class="word"><span class="length">0</span>/140</span>' +
             '</div>' +
             '</div>'
           $commentBox.addClass('box clearfix');
           $commentBox.attr('user','self');
           $commentBox.html($html);              
           $commentList.prepend($commentBox);              
           $textarea.val('');
           $textarea.blur();
           //格式化日期
           function formateDate(date) {
               var y = date.getFullYear();
               var m = date.getMonth() + 1;
               var d = date.getDate();
               var h = date.getHours();
               var mi = date.getMinutes();
               m = m > 9 ? m : '0' + m;
               return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
           }
         }           
        });
        //评论获取焦点
        $box1.on('focus', '.comment', function(){
          $(this).parents('.text-box1').addClass('text-box-on');
          if($(this).val() == '来说两句吧...'){
             $(this).val('');
             $(this).parent().find('.btn').addClass('btn-off');
          }          
        });        
        //评论失去焦点       
        $box1.on('blur', '.comment', function(){              
            if($(this).val() == ''){
               $(this).addClass('a');
               timer = setTimeout(function () {
                  $('.a').parent('.text-box1').removeClass('text-box-on');
                  $('.a').val('来说两句吧...'); 
               }, 200);  
            }                   
        });
        //评论按键事件
        $box1.on('keyup', '.comment', function(){
            var $val = $(this).val(); 
            if ($val.length <=0 || $val.length > 140) {
                $(this).parent().find('.btn').addClass('btn-off');
            }
            else {
                $(this).parent().find('.btn').removeClass('btn-off');
            }
            $(this).parent().find('.word').html($val.length + '/140');            
        });
   // 回复别人的评论
   var $boxs=$('.box');   
   $boxs.each(function(){
        //点击回复按钮               
        $boxs.unbind('click').on('click', '.btn', function(){           
           if($(this).hasClass('btn-off')){
             if($(this).parent().find('.comment').hasClass('a')){
               $(this).parent().find('.comment').removeClass('a');
             }
           } 
           else{          
           var $commentList = $(this).parents('.box').find('.comment-list');
           var $textarea = $(this).parents('.box').find('.comment');
           var $commentBox = $("<div></div>");
           var $html ='';
           $html +=
             '<img class="myhead" src="../images/user2.jpg"/>' +
             '<div class="comment-content">' +
             '<p class="comment-text"><span class="user-name1">我：</span>' + $textarea.val() + '</p>' +
             '<p class="comment-time">' +
             formateDate(new Date()) +
             '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>' +
             '<a href="javascript:;" class="comment-operate">删除</a>' +
             '</p>' +
             '</div>'
           $commentBox.addClass('comment-box clearfix');
           $commentBox.attr('user','self');
           $commentBox.html($html);              
           $commentList.append($commentBox);              
           $textarea.val('');
           $textarea.blur();
           //格式化日期
           function formateDate(date) {
               var y = date.getFullYear();
               var m = date.getMonth() + 1;
               var d = date.getDate();
               var h = date.getHours();
               var mi = date.getMinutes();
               m = m > 9 ? m : '0' + m;
               return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
           }
         }           
        });
       // 点赞
       $boxs.on('click', '.praise', function(){
          var $txt = $(this).html();
          var $praisesTotal = $(this).parents('.box').find('.praises-total');
          var $oldTotal = parseInt($praisesTotal.attr('total'));
          var $newTotal;        
          if ($txt == '赞') {
            $newTotal = $oldTotal + 1;
            $praisesTotal.attr('total', $newTotal);
            if($newTotal == 1){
               $praisesTotal.html('我觉得很赞');
            }
            else{
               $praisesTotal.html('我和' + $oldTotal + '个人觉得很赞');
            }
            $(this).html('取消赞');
          }
          else {
            $newTotal = $oldTotal - 1;
            $praisesTotal.attr('total', $newTotal);
            if($newTotal == 0){
              $praisesTotal.html('');
            }
            else{
              $praisesTotal.html( $newTotal + '个人觉得很赞');
            }
             $(this).html('赞');
          }
          if($newTotal == 0){
             $praisesTotal.css('display','none');
          }
          else{
             $praisesTotal.css('display','block');
          } 
        });         
        //评论获取焦点
        $boxs.on('focus', '.comment', function(){
          $(this).parents('.text-box').addClass('text-box-on');
          if($(this).val() == '评论…'){
             $(this).val('');
             $(this).parent().find('.btn').addClass('btn-off');
          }          
        });        
        //评论失去焦点       
        $boxs.on('blur', '.comment', function(){              
            if($(this).val() == ''){
               $(this).addClass('a');
               timer = setTimeout(function () {
                  $('.a').parent('.text-box').removeClass('text-box-on');
                  $('.a').val('评论…'); 
               }, 200);  
            }                   
        });
        //评论按键事件
        $boxs.on('keyup', '.comment', function(){
            var $val = $(this).val(); 
            if ($val.length <=0 || $val.length > 140) {
                $(this).parent().find('.btn').addClass('btn-off');
            }
            else {
                $(this).parent().find('.btn').removeClass('btn-off');
            }
            $(this).parent().find('.word').html($val.length + '/140');            
        });
        //给留言点赞
        $boxs.on('click', '.comment-praise', function(){
          var $myPraise = parseInt($(this).attr('my'));
          var $oldTotal = parseInt($(this).attr('total'));
          var $newTotal;
          if ($myPraise == 0) {
            $newTotal = $oldTotal + 1;
            $(this).attr('total', $newTotal);
            $(this).attr('my', 1);
            $(this).html($newTotal + ' 取消赞');
          }
          else {
            $newTotal = $oldTotal - 1;
            $(this).attr('total', $newTotal);
            $(this).attr('my', 0);
            if($newTotal == 0){
              $(this).html('赞');
            }
            else{
              $(this).html( $newTotal + ' 赞');
            }
          }
          if($newTotal == 0){
              $(this).css('display','');
          }
          else{
              $(this).css('display','inline-block');
          }
       });  
       //回复别人留言或删除自己留言
       $boxs.on('click', '.comment-operate', function(){
          var $txt = $(this).html();
          var $user = $(this).parents('.comment-box').find('.user-name1').html();
          var $textarea = $(this).parents('.box').find('.comment');
          if ($txt == '回复') {
               $(this).parents('.box').find('.text-box').addClass('text-box-on');
               if($textarea.val() == '评论…'){
                  $textarea.val('');
                  $(this).parents('.box').find('.btn').addClass('btn-off');
               }  
               $textarea.val('回复' + $user);
               var $val = $textarea.val();
               $(this).parents('.box').find('.word').html($val.length + '/140');
          }                              
          else {
            $(this).parents('.comment-box').css('border-top','none');
            $(this).parents('.comment-box').remove();
          }
       });      
   });


 


});
