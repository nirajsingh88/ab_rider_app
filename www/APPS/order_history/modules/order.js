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
      // var allcons = res.consdetail;
      var a = res.consdetail;
      var htm = "";
      var dstatus = "";
      var scolor = "";

      let finalObj = {}
      a.forEach((consignment) => {
        const date = consignment.assignedDate
        if (finalObj[date]) {
          finalObj[date].push(consignment);
        } else {
          finalObj[date] = [consignment];
        }
      })
      console.log(finalObj);
      Object.keys(finalObj).forEach(function(key) {
        htm +=`<div class="items">
          <center>
          <h3 style="color:#99211d;">${key}</h3></center>
      </div>`;
      const alllist = finalObj[key],
      result = Object.values(alllist.reduce((r, { merchant_company,merchant_name,merchant_address,merch_phone}) => {
        r[merchant_company] ??= { merchant_company, count: 0,merchant_name: merchant_name, merchant_address: merchant_address, merch_phone: merch_phone};
        r[merchant_company].count++;
        return r;
    }, {}));
      for(var i =0;i<result.length;i++){
        htm +=`<div class="items">
        <h3>${result[i].merchant_company}</h3>
        <p><b>Merchant Name : </b>${result[i].merchant_name}</p>
        <p><b>Address : </b>${result[i].merchant_address}</p>
        <p><b>Phone : </b>${result[i].merch_phone}<button class="btn-small" style ="float:right;color:blue;"><a onclick="playAudioCall();" href="tel:0${result[i].merch_phone}"><i class="fa fa-phone"></i></a></button></p>
    </div>`;
      }
      
      });

      
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
      // var allcons = res.consdetail;
      var a = res.consdetail;
      var htm = "";
      var dstatus = "";
      var scolor = "";
      let finalObj = {}
      a.forEach((consignment) => {
        const date = consignment.assignedDate
        if (finalObj[date]) {
          finalObj[date].push(consignment);
        } else {
          finalObj[date] = [consignment];
        }
      })
      console.log(finalObj);
      Object.keys(finalObj).forEach(function(key) {
        htm +=`<div class="items">
          <center>
          <h3 style="color:#99211d;">${key}</h3></center>
      </div>`;
      // var allcons = finalObj[key];

      const alllist = finalObj[key],
      result = Object.values(alllist.reduce((r, { merchant_company,merchant_name,merchant_address,merch_phone}) => {
        r[merchant_company] ??= { merchant_company, count: 0,merchant_name: merchant_name, merchant_address: merchant_address, merch_phone: merch_phone};
        r[merchant_company].count++;
        return r;
    }, {}));

      for(var i =0;i<result.length;i++){
        htm +=`<div class="items">
        <h3>${result[i].merchant_company}</h3>
        <p><b>Merchant Name : </b>${result[i].merchant_name}</p>
        <p><b>Address : </b>${result[i].merchant_address}</p>
        <p><b>Phone : </b>${result[i].merch_phone}<button class="btn-small" style ="float:right;color:blue;"><a onclick="playAudioCall();" href="tel:0${result[i].merch_phone}"><i class="fa fa-phone"></i></a></button></p>
    </div>`;
      }
      
      });
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
