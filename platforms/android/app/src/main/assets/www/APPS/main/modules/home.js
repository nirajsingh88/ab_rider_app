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
      document.getElementById("uname").innerHTML = userConfig.name+'<br> Employee ID: '+userConfig.transporter_id+'<br> Phone No: '+userConfig.phone;
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('getdash',form,function(res){
      console.log(res);
      document.getElementById("torder").innerHTML = res.res[0].total_order;
      document.getElementById("pcancel").innerHTML = res.res[1].total_cancelled_till_date;
      document.getElementById("prec").innerHTML = res.res[2].total_receved;
      document.getElementById("norder").innerHTML = res.res[3].total_order_today;
      document.getElementById("in-trans").innerHTML = res.res[4].total_intransit;
      document.getElementById("pdel").innerHTML = res.res[5].total_delivery_till_date;
      document.getElementById("pres").innerHTML = res.res[6].total_reschedule;
      document.getElementById("pret").innerHTML = res.res[7].total_return;

      document.getElementById("tsales").innerHTML = res.res[8].totalsales;
      document.getElementById("tdue").innerHTML = res.totaldue;

      var tpaid = res.res[9].totalpaid;
      var totalpaid = "";
      var add = "";
      if(userid == 143){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 207){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 299){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 140){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 333){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 204){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 145){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 160){
        totalpaid = Math.round(tpaid);
        add = "";
      } else if(userid == 324){
        totalpaid = Math.round(tpaid+1388);
        add = "";
      } else if(userid == 152){
        totalpaid = Math.round(tpaid+128);
        add = "";
      } else{
        totalpaid = Math.round(tpaid);
        add = "";
      }
      document.getElementById("tpaid").innerHTML = totalpaid;

      var total_dcpaid = res.totaldcpaid;
      var totaldcpaid = "";
      var adddc = "";
      if(userid == 143){
        totaldcpaid = Math.round(total_dcpaid-480);
        adddc = "";
      } else if(userid == 207){
        totaldcpaid = Math.round(total_dcpaid-900);
        adddc = "";
      } else if(userid == 299){
        totaldcpaid = Math.round(total_dcpaid-933);
        adddc = "";
      } else if(userid == 140){
        totaldcpaid = Math.round(total_dcpaid-1935);
        adddc = "";
      } else if(userid== 333){
        totaldcpaid = Math.round(total_dcpaid-3921);
        adddc = "";
      } else if(userid == 204){
        totaldcpaid = Math.round(total_dcpaid);
        adddc = "";
      } else if(userid == 145){
        totaldcpaid = Math.round(total_dcpaid-1241);
        adddc = "";
      } else if(userid == 160){
        totaldcpaid = Math.round(total_dcpaid-791);
        adddc = "";
      }else{
        totaldcpaid = Math.round(total_dcpaid);
        adddc = "";
      }
      document.getElementById("tdcpaid").innerHTML = totaldcpaid;
      
    })
    }
  }
})();
