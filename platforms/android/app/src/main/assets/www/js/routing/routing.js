var app_name, sub_page;
var get_param1, get_param2;

//normal page
crossroads.addRoute('{page}/{subPage}/:param2:/:param3:', function(page, subPage, param1, param2) {

  app_name = page;
  sub_page = subPage;
  get_param1 = param1;
  get_param2 = param2;
  $('#main').load('APPS/' + page + '/' + subPage + '.html');

  setActive(app_name);
  $('#slide-out').sideNav('hide');

  // if (page !== 'main') {
  //   elq('.header-back-img').style.display = 'block';
  // } else {
  //   elq('.header-back-img').style.display = 'none';
  // }

  routingCheck();
});

//normale seiten
crossroads.addRoute('{page}', function(page) {
  //DM_PUBSUB.reset('ScoreboardSnapshot')
  app_name = page;
  subPage = null;
  sub_page = null;
  get_param1 = null;
  get_param2 = null;
  $('#main').load("APPS/" + page + "/index.html");

  setActive(page);
  $('#slide-out').sideNav('hide');

  // if (page !== 'main') {
  //   elq('.header-back-img').style.display = 'block';
  // } else {
  //   elq('.header-back-img').style.display = 'none';
  // }

  $('body').scrollTop(0);

  routingCheck();

});

//keine route passt
crossroads.bypassed.add(function(request) {
  //DM_PUBSUB.reset('ScoreboardSnapshot')
  app_name = 'main';
  subPage = null;
  get_param1 = null;
  get_param2 = null;

  if(localStorage.getItem("userConfig") != null){
  $('#main').load('APPS/main/index.html');
  setActive('main');
  }else{
    $('#main').load('APPS/login/index.html');
  setActive('login');
  }

  $('#slide-out').sideNav('hide');

  //elq('.header-back-img').style.display = 'none';
  //$('#header').html('<div class="container"> <div id="camName" class="hidden-sm-down">DokuMe - <span class="meOrange">Cam</span></div> <img src="img/logo/dokume.jpg" class="pull-right"> </div>');
  hasher.changed.active = false;
  hasher.setHash('main');
  hasher.changed.active = true;

  $('body').scrollTop(0);

  routingCheck();

});

/*****************setup hasher*******************/
function parseHash(newHash, oldHash) {
  crossroads.parse(newHash);
}

hasher.initialized.add(parseHash);
//parse initial hash
hasher.changed.add(parseHash);
//parse hash changes

if (typeof cordova !== 'undefined') {
  document.addEventListener('deviceready', function() {
    hasher.init();
  });
} else {
  hasher.init();
}
//start listening for history change

//update URL fragment generating new history record
//hasher.setHash('dashboard');

function setActive(page) {
  //$('.nav-item').removeClass('active');
  //$('[data-setactive="' + page + '"]').addClass('active');
  //$('.navbar-collapse').collapse('hide');
}

function routingCheck() {
  //commonSaveUrl();
  // //commonCheckLocationAccess();
  // if (!auth || !auth.config || !auth.config.id) {
  //   if (app_name === 'signup' || sub_page === 'allowlocation' || sub_page === 'chooselanguage' || sub_page === 'app_tour' || sub_page === 'acceptterms' || app_name === 'login') return false;

  //   window.location = '#/intro';
  //   return false;
  // }
}

var DM_ROUTING = (function() {

  function routingAuthCheck(callback) {
    if (auth && auth.config && auth.config.token !== '' && auth.config.token !== null) {

      backend.setAccess();
      backend.get('init', null, function(data) {
        if (data.SUCCESS !== true) {
          DM_CORE.loginCheck();
          console.log('check here');
          return false;
        }

        auth.loggedIn = true;
        auth.config.id = data.MESSAGE.ID;
        auth.config.user = data.MESSAGE.FIRSTNAME + ' ' + data.MESSAGE.LASTNAME;

        DM_CONFIG = data.MESSAGE;

        if (callback) {
          callback();
        }
        //DM_TEMPLATE.setDesign(DM_CONFIG.DESIGN);

        /*hasher.setHash('dashboard');
        window.location = '#/dashboard';

        if (data.MESSAGE.LANGUAGE) {
          DokuMe_Translation.setLng(data.MESSAGE.LANGUAGE);
        }

        DM_CORE.initLanguage();*/
      }, 'general');

    } else {
      //console.log('get refresh');
      DM_CORE.loginCheck();
    }
  }

  return {routingAuthCheck};
})();
