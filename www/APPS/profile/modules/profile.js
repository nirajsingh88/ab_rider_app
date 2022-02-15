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
    getdisctricts();
    getUserdetail();
    getAjaxPstation(userConfig.district);
    getoffice();
    $('#updateprofile').on('click',updateProfile);
  }

  function getoffice(){
    var form = new FormData();

    DM_CORE.apiForm('offices',form,function(res){
      console.log(res);
      var htm = "<option value = '' disabled selected>Select office</option>";
      var allbranch = res.bdata;
      for(var i =0;i<allbranch.length;i++){
        htm +=`<option value = "${allbranch[i].id}">${allbranch[i].name}</option>`;
      }
      $("#office").html(htm);
      $('#office').val(userConfig.office);

      if(userConfig.office != ""){
        document.getElementById("office").disabled = true;
      }
    })
  }

  function getdisctricts(){
    var form = new FormData();

    DM_CORE.apiForm('districts',form,function(res){
      console.log(res);
      var htm = "<option value = '' disabled selected>Select District</option>";
      var alldist = res.distdata;
      for(var i =0;i<alldist.length;i++){
        htm +=`<option value = "${alldist[i].id}">${alldist[i].district_name}</option>`;
      }
      $("#distt").html(htm);
      $('#distt').val(userConfig.district);
    })
  }

  $("#distt").on('change', function(e) {
    var dist = $("#distt").val();
    console.log(dist);
    getAjaxPstation(dist);
  });

  function getAjaxPstation(dist){
  console.log(dist);
  var form = new FormData();
    form.append("district", dist);

    DM_CORE.apiForm('stationlist',form,function(res){
      console.log(res);

      var htm = "<option value = '' disabled selected>Select Police Station</option>";
      var allps = res.pstdata;
      for(var i =0;i<allps.length;i++){
        htm +=`<option value = "${allps[i].id}">${allps[i].station_name}</option>`;
      }
      $("#police_station").html(htm);
      $('#police_station').val(userConfig.police_station);
    })
  }

  function getUserdetail(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      $('#transporter_id').val(userConfig.transporter_id);
    $('#m_nid').val(userConfig.m_nid);
    $('#name').val(userConfig.name);
    $('#phno').val(userConfig.phone);
    $('#email').val(userConfig.email);
    $('#address').val(userConfig.address);
    $('#merchant_landmark').val(userConfig.merchant_landmark);
    $('#distt').val(userConfig.district);
    $('#police_station').val(userConfig.police_station);

    $('#company').val(userConfig.company);
    $('#web').val(userConfig.website);

    $('#package').val(userConfig.package);
    $('#office').val(userConfig.office);
    
    }
  }

  function updateProfile(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
    
    var userid = userConfig.id;
    var m_nid = $('#m_nid').val();
    var name = $('#name').val();
    var phno = $('#phno').val();
    var email = $('#email').val();
    var address = $('#address').val();
    var merchant_landmark = $('#merchant_landmark').val();
    var distt = $('#distt').val();
    var police_station = $('#police_station').val();
    var company = $('#company').val();
    var web = $('#web').val();
    var office = $('#office').val();

    if(office == ''){
      alert('Please choose the office first');
      return false;
    }

    var form = new FormData();
    form.append("userid", userid);
    form.append("m_nid", m_nid);
    form.append("name", name);
    form.append("phno", phno);
    form.append("email", email);
    form.append("address", address);
    form.append("merchant_landmark", merchant_landmark);
    form.append("district", distt);
    form.append("police_station", police_station);
    form.append("company", company);
    form.append("web", web);
    form.append("package", '15');
    form.append("office", office);
    
    if(office == null){
      alert('Please choose the office');
      return false;
    }

    DM_CORE.apiForm('updateprofile',form,function(res){
      console.log(res);
      
      if (res.success == true) {
          swal({
                title: "Success!",
                text: "Successfully updated your profile!",
                icon: "success",
                // button: "Aww yiss!",
              });
          window.setTimeout(function() {
            window.location.href = "#/main";
              }, 1000);
            localStorage.setItem('userConfig', btoa(JSON.stringify(res.userdetails)));
            location.reload();
      } else {
          swal({
                title: "Failure!",
                text: "Profile update failed!",
                icon: "error",
                button: "Try again",
              });
      }

      
    })
    }
  }


})();
