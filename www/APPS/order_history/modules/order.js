'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") != null){
    init();
    }else{
      window.location.href = "#/login";
    }
  var pageNum = 1;

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    // setEvents();
    getConsList();
    $('#searchcus').on('click',getConsList);
    $('#showmore').on('click',setEvents);
  }

  $('#example').submit(function (evt) {
    evt.preventDefault();
    window.history.back();
});

  function setEvents(){
        addToConsList();
  }



  function getConsList(){
    event.preventDefault()
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var cussname = $('#cussname').val();
      var userid = userConfig.id;

      pageNum = 1;
    var form = new FormData();
    if(cussname != ''){
    form.append("recipientname", cussname);
    }
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);
    // form.append("limit", pageNum);

    DM_CORE.apiForm('conslist',form,function(res){
      ++pageNum;
      console.log(res.consdetail);
      var allcons = res.consdetail;
      var htm = "";
      var dstatus = "";
      var scolor = "";
      for(var i =0;i<allcons.length;i++){
        htm +=`<div class="items">
        <h3>${allcons[i].consignment_id}</h3>
        <p><b>Merchant Name : </b>${allcons[i].merchant_name}</p>
        <p><b>Address : </b>${allcons[i].merchant_address}</p>
        <p><b>Phone : </b>${allcons[i].merch_phone}<a style ="float:right;color:blue;" href="tel:${allcons[i].merch_phone}"><i class="fa fa-phone" style="font-size:28px;color:green"></i></a></p>
    </div>`;
      }
      $("#hist-item").html(htm);
    })
    }
  }

  function addToConsList(){
    console.log('pagenumber='+pageNum+' offset='+10*(pageNum-1))
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", 10*(pageNum-1));
    // form.append("limit", pageNum);

    DM_CORE.apiForm('conslist',form,function(res){
      ++pageNum;
      console.log(res.consdetail);
      var allcons = res.consdetail;
      var htm = "";
      var dstatus = "";
      var scolor = "";
      for(var i =0;i<allcons.length;i++){
        htm +=`<div class="items">
        <h3>${allcons[i].consignment_id}</h3>
        <p><b>Merchant Name : </b>${allcons[i].merchant_name}</p>
        <p><b>Address : </b>${allcons[i].merchant_address}</p>
        <p><b>Phone : </b>${allcons[i].merch_phone}<a style ="float:right;color:blue;" href="tel:${allcons[i].merch_phone}"><i class="fa fa-phone" style="font-size:28px;color:green"></i></a></p>
    </div>`;
      }
      $("#hist-item").append(htm);
    })
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

})();

function passConsIdc(ccid){
  localStorage.setItem('consid', ccid);
  window.location.href = "#/cons_detail";
}
