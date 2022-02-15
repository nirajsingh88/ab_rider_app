'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") == null){
    init();
    }else{
      window.location.href = "#/main";
    }

  function init() {
    $('.btm-mnu').hide();
    $('.sidebar').hide();
    $('.content-right').hide();
    $('#reset').on('click',doReset);
  }

  function doReset(){
    document.getElementById("reset").disabled = true;
    document.getElementById("reset").innerHTML = "Sending mail....";
    var email = $('#email').val();
    if(email == ''){
      alert('Please provide the email');
      document.getElementById("reset").disabled = false;
      document.getElementById("reset").innerHTML = "Send Email";
      return false;
    }
    var form = new FormData();
    form.append("email", email);

    DM_CORE.apiForm('resetpass',form,function(res){
      console.log(res)
      window.setTimeout(function() {
        if (res.success == true) {
            swal({
                  title: "Success!",
                  text: "Reset mail has been sent, please check your mail!!",
                  icon: "success",
                  // button: "Aww yiss!",
                });
            window.setTimeout(function() {
              window.location.href = "#/login";
                }, 1000);
        } else {
            swal({
                  title: "Failure!",
                  text: "Something went wrong pls try again!",
                  icon: "error",
                  button: "Try again",
                });
                document.getElementById("reset").disabled = false;
                document.getElementById("reset").innerHTML = "Send Email";
        }
    }, 1000);
      
    })


  }
})();
