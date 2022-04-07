'use strict';

(function() {
  if(localStorage.getItem("userConfig") != null){
  init();
  }else{
    window.location.href = "#/login";
  }

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getUser();
  }

  function getUser(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig);
      document.getElementById("uname").innerHTML = '<b>'+userConfig.name+'</b><br> Employee ID: '+userConfig.transporter_id+'<br> Phone No: '+userConfig.phone;
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('getdash',form,function(res){
      console.log(res);
      document.getElementById("torder").innerHTML = res.res[1].totalReceived;
      document.getElementById("pcancel").innerHTML = res.res[0].totalDelivery;
      document.getElementById("tsales").innerHTML = res.res[3].received_thismonth;
      document.getElementById("tpaid").innerHTML = res.res[2].delivered_thismonth;
      
    })
    }
  }
})();
