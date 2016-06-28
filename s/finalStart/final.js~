app = angular.module("f",['ngAnimate','ngMaterial','ngRoute','ngFileUpload']);


setTimeout(
			function a() {

				angular.bootstrap( document, [ "f" ] );
				
			},
			( 2* 1000 )
		);

app.config(function($routeProvider,$mdIconProvider,$mdThemingProvider){
	$routeProvider.when('/',{
		templateUrl:'front.html',
		controller:'front'

	}).when('/homePage',{
		templateUrl:'homePage.html',
		controller:'z'
	}).when('/register',{
		templateUrl:'reg.html',
		controller:'registerCtrl'
	}).when('/allshops',{
		templateUrl:'allshops.html',
		controller:'shopsData'
	}).when('/temp',{
		templateUrl:'temp',
		controller:'tempCon'
	}).when('/vendorprofile',{
		templateUrl:'vendorProfile.html',
		controller:'v'
	}).when('/vendorLogin',{
		templateUrl:'vendorLogin.html',
		controller:'vLogin'
	}).otherwise({
		redirectTo:'/'
	});

	 $mdIconProvider.iconSet("avatar", 'img/192.ico',192);
	 $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
	
});
app.factory('myService', function() {
 	var savedData ;
 	function set(data) {
 		  savedData = data;
 	}
 	function get() {
 		 return savedData;
 	}
	
	 return {
		  set: set,
		  get: get
	 }

});




//Copy for shrink..................



/*
 * 'scroll' Angular Directive
 * Used to handle page header during scroll event (and rezise event too) of the window.
 *
 */
app.directive("scroll", function ($window) {

    return function(scope, element, attrs) {

      /* header DOM element with md-page-header attribute */
      var header         = document.querySelector('[md-page-header]');
      /* Store header dimensions to initialize header styling */
      var baseDimensions = header.getBoundingClientRect();
      /* DOM element with md-header-title attribute (title in toolbar) */
      var title          = angular.element(document.querySelector('[md-header-title]'));
      /* DOM element with md-header-picture attribute (picture in header) */
      var picture        = angular.element(document.querySelector('[md-header-picture]'));
      /* DOM element with main-fab class (a DOM element which contains the main float action button element) */
      var fab            = angular.element(document.querySelector('.main-fab'));
      /* The height of a toolbar by default in Angular Material */
      var legacyToolbarH = 64;
      /* The mid-height of a float action button by default in Angular Material */
      var legacyFabMid   = 56/2;
      /* The zoom scale of the toolbar title when it's placed at the bottom of the header picture */
      var titleZoom      = 1.5;
      /* The primary color palette used by Angular Material */
      var primaryColor   = [63,81,181];
      
      function styleInit () {
        title.css('padding-left','16px');
        title.css('position','relative');
        title.css('transform-origin', '24px');
      }

      function handleStyle(dim) {
        fab.css('top',(dim.height-legacyFabMid)+'px');
        if ((dim.bottom-baseDimensions.top) > legacyToolbarH) {
          title.css('top', ((dim.bottom-baseDimensions.top)-legacyToolbarH)+'px');
          element.css('height', (dim.bottom-baseDimensions.top)+'px');
          title.css('transform','scale('+((titleZoom-1)*ratio(dim)+1)+','+((titleZoom-1)*ratio(dim)+1)+')');
          
        } else {
          title.css('top', '0px');
          element.css('height', legacyToolbarH+'px');
          title.css('transform','scale(1,1)');
        }
        if ((dim.bottom-baseDimensions.top) < legacyToolbarH*2 && !fab.hasClass('hide')) {
          fab.addClass('hide');
        }
        if((dim.bottom-baseDimensions.top)>legacyToolbarH*2 && fab.hasClass('hide')) {
          fab.removeClass('hide');
        }       
        element.css('background-color','rgba('+primaryColor[0]+','+primaryColor[1]+','+primaryColor[2]+','+(1-ratio(dim))+')');
        picture.css('background-position','50% '+(ratio(dim)*50)+'%');
        /* Uncomment the line below if you want shadow inside picture (low performance) */
        //element.css('box-shadow', '0 -'+(dim.height*3/4)+'px '+(dim.height/2)+'px -'+(dim.height/2)+'px rgba(0,0,0,'+ratio(dim)+') inset');
      }

      function ratio(dim) {
        var r = (dim.bottom-baseDimensions.top)/dim.height;
        if(r<0) return 0;
        if(r>1) return 1;
        return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
      }

      styleInit();
      handleStyle(baseDimensions);

      	/* Scroll event listener */
      angular.element($window).bind("scroll", function() {
        var dimensions = header.getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });
      
      /* Resize event listener */
      angular.element($window).bind('resize',function () {
        baseDimensions = header.getBoundingClientRect();
        var dimensions = header.getBoundingClientRect();
        handleStyle(dimensions);
        scope.$apply();
      });

    };

});



app.controller('v',v);
function v($scope,$rootScope,myService,$http,$location,$mdDialog,Upload){
	$scope.userId = myService.get();
	//this i will use in dialogC to add offer....
	$rootScope.currentUser = $scope.userId;
	var posting = $http({
                    method: 'POST',
                    /*posting to /post */
                    url: '/finalClickedVendor.html',
			data: {abc:$scope.userId}
		})
		posting.success(function (response) {
                    /*executed when server responds back*/
                    console.log(response);
			$scope.vendorData = response;
				var posting2 = $http({
                   		 method: 'POST',
                    		/*posting to /post */
                    		url: '/finalClickedVendorOffers.html',
				data: {abc:$scope.userId}
				})
				posting2.success(function (response) {
                		    /*executed when server responds back*/
                		    console.log(response);
					$scope.offers = response;
				});		
		});	

		$scope.openDialogg = function(){
			
    			$mdDialog.show({
     				 controller: 'dialogC',
     				 templateUrl: 'dialog1.tmpl.html',
     				 parent: angular.element(document.body),
     				 clickOutsideToClose:true,
    			}).then(function(){
				
					var posting2 = $http({
                   			 method: 'POST',
                    			/*posting to /post */
                    			url: '/finalClickedVendorOffers.html',
					data: {abc:$scope.userId}
					})
					posting2.success(function (response) {
                			    /*executed when server responds back*/
						$scope.offers = response;
					});	
		
	

			},function(){

			});
	
		};
		$scope.deleteOffer = function(id){
			var confirm = $mdDialog.confirm()
          		.title('Would you like to delete This Offer?')
          		.ariaLabel('Lucky day')
          		.ok('Please do it!')
          		.cancel('No No Dont remove it');
			$mdDialog.show(confirm).then(function(){
				var remove = $http({

					method:'POST',
					url:'/removeoffer',
					data:{offerId:id,userId:$scope.userId}



				})
				remove.success(function (respo){
					var posting2 = $http({
                   			 method: 'POST',
                    			/*posting to /post */
                    			url: '/finalClickedVendorOffers.html',
					data: {abc:$scope.userId}
					})
					posting2.success(function (response) {
                			    /*executed when server responds back*/
						$scope.offers = response;
					});	
		
	
				});

			},function(){

			});
		};
		$scope.upload = function (filee,imageNum) {
			
			Upload.upload({
            		url: '/addimage',
			file:filee, //webAPI exposed to upload the file
            		data:{num:imageNum,id:$scope.userId} //pass file as data, should be user ng-model
        		
			});

		};
		
		$scope.addd = function(imageNum){
			$scope.image = imageNum;         	 	
			 $scope.upload($scope.file,imageNum); //call upload function
				
            	};
		}

app.controller('dialogC',dialogC);
function dialogC($scope,$http,$rootScope,$mdToast,$mdDialog){
	$scope.data={};
	$scope.data.userId = $rootScope.currentUser;
	$scope.submitOffer = function(){
		$mdDialog.hide();
		var go =  $http({
			method:'POST',
			url:'/addoffer',
			data : $scope.data
		})
		go.success(function(response){
				$mdToast.show(
					$mdToast.simple()
					.textContent('Offer Added')
					.hideDelay(3000)
			
					

				);
				$scope.data.head = "";
				$scope.data.res = "";
				$scope.data.value = "";



		});

		

	}

} 

app.controller('vLogin',vLogin);
function vLogin($scope,$rootScope,myService,$http,$location){

	$scope.xyz = function(){
		var posting = $http({
                    method: 'POST',
                    /*posting to /post */
                    url: '/loginMeVendor.html',
		data: $scope.data2
		})
		posting.success(function (response) {
                    /*executed when server responds back*/
			if(response.ans==true){
				myService.set($scope.data2.userId);
				$location.path('/vendorprofile');
			}else{
				 $scope.error = response.message;
                  		  $scope.dataLoading = false;
			}		
					
		});	
		
	};
}

app.controller('tempCon',tempCon);
function tempCon($scope,$rootScope,$http,$location){
	$scope.data=$rootScope.DataSh;
	
	var pos = $http({
		method:'POST',
		url:'/offers.html',
		data:{abc:$scope.data.userId}
	})
	pos.success(function(response){
		$scope.offer = response;
	});
	$scope.img = $scope.data.imageUrl1;
	$scope.num = 1;
	$scope.left = function(){
		$scope.num = $scope.num-1;
		if( $scope.num==0)$scope.num=3;
		
		switch($scope.num)
		{
			case 1:		
				$scope.img = $scope.data.imageUrl1;
				break;
			case 2:
				$scope.img = $scope.data.imageUrl2;
				break;
			case 3:
				$scope.img = $scope.data.imageUrl3;
				break;
		}
	
	};
	$scope.right = function(){
		$scope.num = $scope.num+1;
		if( $scope.num==4)$scope.num=1;
		switch($scope.num)
		{
			case 1:		
				$scope.img = $scope.data.imageUrl1;
				break;
			case 2:
				$scope.img = $scope.data.imageUrl2;
				break;
			case 3:
				$scope.img = $scope.data.imageUrl3;
				break;
			default:
		}
	

	};
	/*$scope.abbcc = $scope.dataaa.RowDataPacket;
	var pos = $http({
		method:'POST',
		url:'/temp2.html',
		data:{abc:$scope.dataaa.getPropertyValue('userId')}
	})
	pos.success(function(response){
		$location.path('/');
	});*/
}


app.controller('registerCtrl',registerCtrl);
function registerCtrl($scope,$http,$rootScope,$location){
	$scope.avail=false;
	$scope.avail2=false;
	$scope.register = function(){
		var x = $http({
			method: 'POST',
			url:'registerMe.html',
			data:{num:$scope.number,pass:$scope.password,email:$scope.email}
		})
		x.success(function(response){
			$rootScope.dataa = true;
			$location.path('/homePage');
		});
	};
	$scope.check = function(){
		$scope.avail2=true;
		var x = $http({
			method: 'POST',
			url:'checkAvail.html',
			data:{number:$scope.number}
		})
		x.success(function (response){
			$scope.allow = response.allow;
			if(!$scope.allow){
				$scope.avail=true;
			}else{
				$scope.avail=false;
			}
				$scope.avail2=false;
		});

	};

}

app.controller('shopsData',function($scope,$http,$location,myService,$rootScope){
	$scope.cate = myService.get();	
	var pos = $http({
		method:'POST',
		url:'/shopsdata.html',
		data:{abc:$scope.cate}
	})
	pos.success(function(response){
		$scope.allData  = response;
	});
	$scope.tempClicked = function(userId){
		$scope.xyz=userId;		
		var pos = $http({
		method:'POST',
		url:'/finalClicked.html',
		data:{abc:$scope.xyz}
	})
	pos.success(function(response){
		$rootScope.DataSh  = response;
		$location.path('/temp');
	});
	};


})
app.controller('front',function($scope,$location,$window,$http,$rootScope){
	
	$scope.xyz = function(){
		var posting = $http({
                    method: 'POST',
                    /*posting to /post */
                    url: '/loginMe.html',
		data: $scope.data2
		})
		posting.success(function (response) {
                    /*executed when server responds back*/
                    console.log(response);
			$rootScope.dataa=response.ans;
			if($rootScope.dataa){
				$location.path('/homePage');
			}else{
				 $scope.error = response.message;
                  		  $scope.dataLoading = false;
			}		
					
		});	
		
	};
	$scope.regi = function(){
		$location.path('/register');
	};
	});

app.run(['$rootScope', '$location',
    function ($rootScope, $location) {
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if($location.path() == '/admin'){
		$location.path('/admin');
	}else if ($location.path() != '/' && !$rootScope.dataa) {
                $location.path('/');
            }
	
        });
    }]);
app.directive('firstTwo',function($animate){
		return({
			link:link,
			restrict:'C'
		});
		function link($scope,$element,$attributes){
			$animate.leave($element.children().eq(1)).then(
				function cleanUp(){
					
					$element.remove();
					$element=$attributes=$scope=null;
				}
			)	


		}
	
});
app.controller('z',z);

function z($scope,$mdSidenav,$rootScope,$location,myService){
	$scope.xyz= bu('right');
	$scope.xyzClose = function(){
		$mdSidenav('right').close();
	};
	$scope.isOpen = function(){
		return $mdSidenav('right').isOpen();

	};
	
	$scope.isClose = function(){
		return !($mdSidenav('right').isOpen());
	};
	
	function bu(navId){
	return(function(){$mdSidenav(navId).toggle();});
	}
	$scope.clicked = function(type){
		myService.set(type);
		$location.path('/allshops');
		

	};

	
}
app.controller('listC',listC);

function listC($scope,$mdDialog,$location,$mdToast){
	$scope.allNames=[
		{namee:'Home',im:'img/home.svg',url:'/'},{namee:'Our Members',im:'img/mem.svg',url:'/vendorLogin'},{namee:'exit',im:'img/exit.svg',url:'/dashboard'}
		
		
	];

 $scope.goTo = function(person, event) {
	
	$location.path(person);
  };
}


app.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])




