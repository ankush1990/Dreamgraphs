var global_login_id = "";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('LogoutCtrl', function($scope,$rootScope,$ionicHistory,$state) {
 $scope.login = "";
 $rootScope.$on('login_var', function (event, args) {
	$scope.login = args.global_login;
	global_login_id = args.global_login;
 });
 $scope.logout = function(){
		var login_var = "";
		$rootScope.$broadcast('login_var',{global_login:login_var});
		window.localStorage.removeItem("login_var_local");
		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
    };
})
/** Member Login Controller**/
.controller('loginCtrl',function($scope,$http,$state,$ionicLoading,$ionicPopup,$ionicHistory,$rootScope,$ionicSideMenuDelegate) {
	/* http://dreamgraphs.com/web_service.php?action=user_login&email=user@gmail.com&password=admin123 */
	$scope.submitLoginForm = function(FormName) {
		var action = "user_login";
        var data_parameters = "action="+action+"&email="+$scope.email+"&password="+$scope.password;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response[0].success == 'Y'){
					$scope.email = $scope.password = '' ;
					FormName.$setPristine();
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$rootScope.$broadcast('login_var',{global_login:response[0].msg.id});
					window.localStorage.setItem("login_var_local",response[0].msg.id);
					$state.go("app.home");
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-android-cancel icon-popup"></i></p> '+response[0].msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom'
						},
					  ]
					});
				}
				$ionicLoading.hide();
			});
		}
	};
	$ionicSideMenuDelegate.canDragContent(false);
})
/** Member Registration Controller**/
.controller('registrationCtrl',function($scope,$http,$state,$ionicLoading,$ionicPopup) {
	/* http://jainoswalfederation.com/webservice/?action=register */
	var alertPopup; 
	$scope.submitRegistrationForm = function(FormName) {
		var action = "user_registration";
		var data_parameters = "action="+action+"&username="+$scope.username+"&first_name="+$scope.first_name+"&last_name="+$scope.last_name+"&email="+$scope.email+"&password="+$scope.password+"&phone="+$scope.phone+"&term_and_con=1" ;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response[0].msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response[0].success == 'Y'){
					$scope.username = $scope.first_name = $scope.last_name = $scope.password = $scope.confirmpassword = $scope.email = $scope.phone = $scope.termsandconditions = '';
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
})
/** Forgot Password Controller **/
.controller('forgotPassCtrl',function($scope,$http,$ionicLoading,$state,$ionicPopup) {
	/* http://dreamgraphs.com/web_service.php?action=forgot_password&email=jaymakerits@gmail.com */
	$scope.submitforgotPassForm = function(FormName) {
		var action = "forgot_password";
		var data_parameters = "action="+action+"&email="+$scope.email;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response[0].msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response[0].success == 'Y'){
					$scope.email = '' ;
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
})
/** Change Password Controller **/
.controller('changePassCtrl',function($scope,$http,$ionicLoading,$state,$ionicPopup) {
	$scope.data = {};
	/* http://dreamgraphs.com/web_service.php?action=change_password&user_id=48&old_password=123&current_password=12345 */
	$scope.submitchangePassForm = function(FormName) {
		var action = "change_password";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&old_password="+$scope.data.old_password+"&current_password="+$scope.data.password;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response.success == 'Y'){
					$scope.data.old_password = $scope.data.password = $scope.data.confirmpassword = '' ;
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	};
})
/** Compensation/Transaction Controller **/
.controller('compensationTransactionCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=transactions&user_id=20 **/
	$scope.$on('$ionicView.enter', function() {
		$scope.transactions = {};
		var action = "transactions";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.transactions = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Wall Controller **/
.controller('wallCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicPopup,$filter) {
	/** http://dreamgraphs.com/web_service.php?action=wall&user_id=48 **/
	$scope.comments = '';
	$scope.$on('$ionicView.enter', function() {
		$scope.wallitems = {};
		var action = "wall";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.wallitems = response.data;
				$ionicLoading.hide();
			}
		});
	});
	/** Like Details **/
	$scope.likeDetails = function(wall_id) {
		/** http://dreamgraphs.com/web_service.php?action=get_like_of_wall&wall_id=373 **/
		var likers = '';
		var action = "get_like_of_wall";
		var data_parameters = "action="+action+"&wall_id="+wall_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				angular.forEach(response.data, function(value, key){
					likers += '<p class="bottom-border">'+value.username+'</p>';
				});
				$ionicLoading.hide();
				$ionicPopup.show({
				  template: likers,
				  title: 'Likes',
				  scope: $scope,
				  cssClass: 'my-custom-popup',
				  buttons: [
					{ 
					  text: 'Close',
					  type: 'button-custom'
					},
				  ]
				});
			}
		});
	}
	$scope.loadingComments = new Array();
	/** Like Details **/
	$scope.commentsDetails = function(wall_id,index) {
		/** http://dreamgraphs.com/web_service.php?action=get_comment_of_wall&wall_id=373 **/
		$scope.loadingComments[index] = true;
		var action = "get_comment_of_wall";
		var data_parameters = "action="+action+"&wall_id="+wall_id;
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.wallitems[index].getcomments = response.data;
				$scope.wallitems[index].comment_count = response.comment_count;
			}
			$scope.loadingComments[index] = false;
		});
	}
	/** Like Dislike **/
	$scope.wallLikeDislike = function(wall_id,index,user_exist) {
		/** http://dreamgraphs.com/web_service.php?action=wall_like_dislike&user_id=12&wall_id=377 **/
		var likers = '';
		var action = "wall_like_dislike";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&wall_id="+wall_id;
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.wallitems[index].like_count = response.total_like;
				$scope.wallitems[index].user_exist = !user_exist;
			}
			$ionicLoading.hide();
		});
	}
	$scope.formData = {};
	// Write A Comment
	$scope.submitcommentForm = function(wall_id,index) {
		/** http://dreamgraphs.com/web_service.php?action=put_comment_on_wall&user_id=12&wall_id=377&comment=looking nice **/
		var data_parameters = "action=put_comment_on_wall"+"&user_id="+global_login_id+"&wall_id="+wall_id+"&comment="+$scope.formData.newcomment[index];
		if($scope.formData.newcomment[index] != '' && $scope.formData.newcomment[index] != undefined) {
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == 'Y'){
					$scope.formData.newcomment[index] = '';
					var data_parameters2 = "action=get_comment_of_wall"+"&wall_id="+wall_id;
					$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
					$http.post(globalip,data_parameters2, {
						headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
					})
					.success(function(response2) {
						if(response2.success == "Y"){
							$scope.wallitems[index].getcomments = response2.data;
							$scope.wallitems[index].comment_count = response2.comment_count;
						}
						$ionicLoading.hide();
					}); 
				}
				$ionicLoading.hide();
			});
		}
	}
})
/** Member Profile Controller **/
.controller('memberProfileCtrl',function($scope,$http,$ionicLoading,$ionicHistory,$state,$ionicPopup) {
	$scope.GotoPage = function(page){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page);
	}
})
/** Followers Controller **/
.controller('followersCtrl', function($http,$scope,$state,$ionicLoading,$stateParams) {
	/** http://dreamgraphs.com/web_service.php?action=follow_unfollow_list&user_id=12&option=followers **/
	$scope.$on('$ionicView.enter', function() {
		$scope.followers = {};
		var action = "follow_unfollow_list";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&option=followers";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.followers = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** My Activity Controller **/
.controller('myActivityCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=get_user_wall&user_id=50 **/
	$scope.$on('$ionicView.enter', function() {
		$scope.myactivities = {};
		var action = "get_user_wall";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.myactivities = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Following Controller **/
.controller('followingCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicPopup,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=follow_unfollow_list&user_id=12&option=following **/
	$scope.$on('$ionicView.enter', function() {
		$scope.followings = {};
		var action = "follow_unfollow_list";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&option=following";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.followings = response.data;
				$ionicLoading.hide();
			}
		});
	});
	/** Stop Following (Unfollow) **/
	$scope.unfollowUser = function(user_id) {
		/** http://dreamgraphs.com/web_service.php?action=follow&user_id=48&current_user=12 **/
		var action = "follow";
		var data_parameters = "action="+action+"&user_id="+user_id+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					  onTap: function() { 
						console.log('tapped');
						$state.go('app.following',{},{ reload: true });
					  }
					}
				  ]
				});
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	}
})
/** Home Controller **/
.controller('homeCtrl', function($http,$scope,$state,$ionicHistory,$ionicSlideBoxDelegate,$ionicPopup,$ionicLoading,$timeout,$rootScope) {
	/** Check Login **/
		$scope.$on('$ionicView.enter', function() {
			var login_var_local = window.localStorage.getItem("login_var_local");
			if(login_var_local !== undefined && login_var_local != null) {
				console.log(login_var_local);
				$rootScope.$broadcast('login_var',{global_login:login_var_local});
				/** http://dreamgraphs.com/web_service.php?action=testimonials **/
				var action = "testimonials";
				var data_parameters = "action="+action;
				$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
				$http.post(globalip,data_parameters, {
					headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				})
				.success(function(response) {
					if(response.success == "Y"){
						//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
						$scope.complete_challenge = response.complete_challenge;
						$scope.testimonials = response.testimonials;
						setTimeout(function(){
							$ionicSlideBoxDelegate.update();
							$ionicSlideBoxDelegate.loop(true);
						},1000);
						$ionicLoading.hide();
					}
				});
			}
			else{
				$state.go('app.login');
			}	
		});
	/** End Check Login **/
	// Form
	$scope.formData = {};
	$scope.submitshareForm = function(FormName) {
		/** https://www.dreamgraphs.com/web_service.php?action=invite&email=jaymakerits@gmail.com **/
		var action = "invite";
		var data_parameters = "action="+action+"&email="+$scope.formData.email ;
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
				if(response.success == 'Y'){
					$scope.formData.email = '';
					FormName.$setPristine();
				}
				$ionicLoading.hide();
			});
		}
	}
})
/** Challenges Controller **/
.controller('challengesCtrl', function($http,$scope,$state,$ionicLoading) {
	/** http://dreamgraphs.com/web_service.php?action=challenge_list **/
	$scope.$on('$ionicView.enter', function() {
		var action = "challenge_list";
		var data_parameters = "action="+action;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.challenges = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Challenge Details Controller **/
.controller('challengeDetailsCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=single_challenge_list&id=55 **/
	$scope.$on('$ionicView.enter', function() {
		$scope.challengeDetails = {};
		var action = "single_challenge_list";
		var challenge_id = $stateParams.challenge_id;
		var data_parameters = "action="+action+"&id="+challenge_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.challengeDetails = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Challenges - Accept This Challenge Controller **/
.controller('acceptThisChallengeCtrl', function($http,$scope,$state,$ionicLoading,$ionicPopup,$stateParams,$ionicHistory,$filter) {
	$scope.data = {};
	$scope.$on('$ionicView.enter', function() {
		$scope.challengeDetails = {};
		var action = "single_challenge_list";
		var challenge_id = $stateParams.challenge_id;
		var data_parameters = "action="+action+"&id="+challenge_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.challengeDetails = response.data;
				$ionicLoading.hide();
			}
		});
	});
	// Datepicker
	$scope.data.StartDate = $scope.data.EndDate = $filter('date')(new Date(), "dd-MM-yyyy"); 
	$scope.data.minStartDate = $scope.data.minEndDate =  $filter('date')(new Date(), "dd-MM-yyyy");
	$scope.CallbackStartDate = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.data.StartDate = val;
		}
	};
	$scope.CallbackEndDate = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.data.EndDate = val;
		}
	};
	// End Datepicker
	/** Challenge Yourself **/
	$scope.submitacceptThisChallengeForm = function(FormName) {
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else {
			/** http://dreamgraphs.com/web_service.php?action=accept_challenge&user_id=9&record_id=5&challenge_id=49&end_date=15-12-2015&days=5&send_by=12 **/
			var action = "accept_challenge";
			var data_parameters = "action="+action+"&user_id="+global_login_id+"&challenge_id="+$scope.challengeDetails.challenge_id+"&start_date="+$scope.data.StartDate+"&end_date="+$scope.data.EndDate+"&send_by="+global_login_id;
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == "Y"){
					$scope.data.StartDate = $scope.data.EndDate = '';
					FormName.$setPristine();
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom',
						  onTap: function() { 
							console.log('tapped');
							$state.go('app.challenges',{},{ reload: true });
						  }
						}
					  ]
					});
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom'
						},
					  ]
					});	
				}
				$ionicLoading.hide();
			});
		}
	}
})
/** Challenges - Giving This Challenge Controller **/
.controller('givingThisChallengeCtrl', function($http,$scope,$state,$ionicLoading,$ionicPopup,$stateParams,$ionicHistory,$filter) {
	$scope.data = {};
	$scope.$on('$ionicView.enter', function() {
		/** Challenge Details **/
		$scope.challengeDetails = {};
		var action = "single_challenge_list";
		var challenge_id = $stateParams.challenge_id;
		var data_parameters = "action="+action+"&id="+challenge_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.challengeDetails = response.data;
				$ionicLoading.hide();
			}
		});
		/** Friends **/
		$scope.friends = {};
		var action = "friend_list";
		var data_parameters = "action="+action+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.friends = response.data;
				$ionicLoading.hide();
			}
		});
	});
	// Datepicker
	$scope.data.StartDate = $scope.data.EndDate = $filter('date')(new Date(), "dd-MM-yyyy"); 
	$scope.data.minStartDate = $scope.data.minEndDate =  $filter('date')(new Date(), "dd-MM-yyyy");
	$scope.CallbackStartDate = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.data.StartDate = val;
		}
	};
	$scope.CallbackEndDate = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.data.EndDate = val;
		}
	};
	// End Datepicker
	/** Giving A Challenge **/
	$scope.submitgivingThisChallengeForm = function(FormName) {
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else {
			/** http://dreamgraphs.com/web_service.php/?action=send_challenge&type=guest&email=parmar.jay350@gmail.com&name=jay&challenge=123&start_date=9-10-1600&end_date=9-10-1600&current_user=15 **/
			var action = "send_challenge";
			var name = $scope.data.type == 'reg_user' ? $scope.data.friendobj.fname : $scope.data.name;
			var email = $scope.data.type == 'reg_user' ? $scope.data.friendobj.email : $scope.data.email;
			var data_parameters = "action="+action+"&type="+$scope.data.type+"&email="+email+"&name="+name+"&challenge="+$scope.challengeDetails.challenge_id+"&start_date="+$scope.data.StartDate+"&end_date="+$scope.data.EndDate+"&current_user="+global_login_id;
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == "Y"){
					$scope.data.StartDate = $scope.data.EndDate = $scope.data.type = $scope.data.name = $scope.data.email = $scope.data.friendobj = '';
					FormName.$setPristine();
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom',
						  onTap: function() { 
							console.log('tapped');
							$state.go('app.challenges',{},{ reload: true });
						  }
						}
					  ]
					});
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-custom'
						},
					  ]
					});	
				}
				$ionicLoading.hide();
			});
		}
	}
})
/** Friend Without Accept Controller **/
.controller('friendWithoutAcceptedCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicScrollDelegate) {
	/** http://dreamgraphs.com/web_service.php?action=not_accpeted&user_id=12 **/
	$scope.$on('$ionicView.enter', function() {
		$scope.notaccepted = {};
		var action = "not_accpeted";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.notaccepted = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Friend In-Progress Controller **/
.controller('friendInProgressCtrl', function($http,$scope,$state,$ionicLoading) {
	/** http://dreamgraphs.com/web_service.php?action=friend_challenge&user_id=20&condition=in_progress **/
	$scope.$on('$ionicView.enter', function() {
		$scope.in_progress = {};
		var action = "friend_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&condition=in_progress";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.in_progress = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Friend In-Failed Controller **/
.controller('friendInFailedCtrl', function($http,$scope,$state,$ionicLoading) {
	/** http://dreamgraphs.com/web_service.php?action=friend_challenge&user_id=48&condition=failed **/
	$scope.$on('$ionicView.enter', function() {
		$scope.in_failed = {};
		var action = "friend_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&condition=failed";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.in_failed = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Friend Achievments Controller **/
.controller('friendAchievmentsCtrl', function($http,$scope,$state,$ionicLoading) {
	/** http://dreamgraphs.com/web_service.php?action=friend_challenge&user_id=20&condition=completed **/
	$scope.$on('$ionicView.enter', function() {
		$scope.achievments = {};
		var action = "friend_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&condition=completed";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.achievments = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Friend List Controller **/
.controller('friendsListCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicScrollDelegate,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=friend_list&current_user=12 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "friend_list";
		var data_parameters = "action="+action+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.friends = response.data;
				$ionicLoading.hide();
			}
		});
	});
	/** Remove Friend (Unfriend) **/
	$scope.unfriendUser = function(friend_id) {
		/** http://dreamgraphs.com/web_service.php?action=unfriend&current_user=12&friend_id=3 **/
		var action = "unfriend";
		var data_parameters = "action="+action+"&friend_id="+friend_id+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					  onTap: function() { 
						console.log('tapped');
						$state.go('app.friends-list',{},{ reload: true });
					  }
					}
				  ]
				});
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	}
	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop();
	};
})
/** Users List Controller **/
.controller('usersListCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicScrollDelegate,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=users_list&current_user=12 **/
	$scope.users = {};
	$scope.$on('$ionicView.enter', function() {
		var action = "users_list";
		var data_parameters = "action="+action+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.users = response.data;
				$ionicLoading.hide();
			}
		});
	});
	/** Send And Cancel Friend Request **/
	$scope.sendFriendRequest = function(friend_id,singleuser) {
		/** http://dreamgraphs.com/web_service.php?action=send_request&current_user=12&request_user=18 **/
		var action = "send_request";
		var data_parameters = "action="+action+"&request_user="+friend_id+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.users[$scope.users.indexOf(singleuser)].send_request = response.send_request;
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					}
				  ]
				});
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	}
	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop();
	};
})
/** Recieved Challenges **/
.controller('recievedChallengesCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup,$ionicSideMenuDelegate) {
	/** http://dreamgraphs.com/web_service.php?action=received_challenge&user_id=9 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "received_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.recdChallenges = response.data;
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	});
})
/** Recieved Challenge Details **/
.controller('recievedChallengeDetailsCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup,$ionicSideMenuDelegate,$stateParams) {
	/** http://dreamgraphs.com/web_service.php?action=received_challenge_details&user_id=9&record_id=196 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "received_challenge_details";
		var record_id = $stateParams.record_id;
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&record_id="+record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.recdChallengeDetails = response.data;
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	});
	/** Accept Received Challenge **/
	$scope.acceptRecdChallenge = function(record_id,challenge_id,start_date,end_date,challenges_send_by) {
		/** http://dreamgraphs.com/web_service.php?action=accept_challenge&user_id=9&record_id=5&challenge_id=49&end_date=15-12-2015&days=5&send_by=12 **/
		var action = "accept_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&record_id="+record_id+"&challenge_id="+challenge_id+"&start_date="+start_date+"&end_date="+end_date+"&send_by="+challenges_send_by;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					  onTap: function() { 
						console.log('tapped');
						$state.go('app.my-challenges~without-accepted',{},{ reload: true });
					  }
					}
				  ]
				});
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});	
			}
			$ionicLoading.hide();
		});
	}
	/** Cancel Received Challenge **/
	$scope.cancelRecdChallenge = function(record_id,challenge_id) {
		/** http://dreamgraphs.com/web_service.php?action=cancel_challenge_request&user_id=48&record_id=155 **/
		var action = "cancel_challenge_request";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&record_id="+record_id+"&challenge_id="+challenge_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					  onTap: function() { 
						console.log('tapped');
						$state.go('app.my-challenges~without-accepted',{},{ reload: true });
					  }
					}
				  ]
				});
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	}
})
/** My-In-Progress Challenges **/
.controller('myInProgressChallengesCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=my_challenge&user_id=15&condition=in_progress **/
	$scope.$on('$ionicView.enter', function() {
		var action = "my_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&condition=in_progress";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.myInProgressChallenges = response.data;
			}
			$ionicLoading.hide();
		});
	});
	$scope.GotoRetograma = function(retoID){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.retograma',{retoID:retoID});
	}
})
/** Retograma Controller **/
.controller('retogramaCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=in_progress_deatils&record_id=172 **/
	$scope.$on('$ionicView.enter', function() {
		$scope.challengeDetails = {};
		var action = "in_progress_deatils";
		$scope.retoID = $stateParams.retoID;
		var data_parameters = "action="+action+"&record_id="+$scope.retoID;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.challengeDetails = response.data;
				$ionicLoading.hide();
			}
		});
	});
})
/** Retograma Benefits Controller **/
.controller('retogramaBenefitsCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=in_progress_deatils&record_id=172&column_name=benefits **/
	$scope.$on('$ionicView.enter', function() {
		$scope.benefits = {};
		var action = "in_progress_deatils";
		var data_parameters = "action="+action+"&record_id="+$stateParams.record_id+"&column_name=benefits";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.benefits = response.data[0];
				$ionicLoading.hide();
			}
		});
	});
})
/** Retograma Progress Controller **/
.controller('retogramaProgressCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=checkbox_show&accpet_id=193 **/
	$scope.$on('$ionicView.enter', function() {
		$scope.tickboxes = {};
		var action = "checkbox_show";
		var data_parameters = "action="+action+"&accpet_id="+$stateParams.record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.tickboxes = response.data;
				$scope.percentage = response.process;
				$ionicLoading.hide();
			}
		});
	});
	/** Change Reto Checkbox Challenge **/
	$scope.retoChanged = function(tickbox,index) {
		/** http://dreamgraphs.com/web_service.php?action=daily_entry_checkbox&checkbox_name=track2&accpet_challenge_id=55 **/
		var action = "daily_entry_checkbox";
		var data_parameters = "action="+action+"&checkbox_name="+tickbox+"&accpet_challenge_id="+$stateParams.record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$scope.percentage = response.data.process;
				$scope.tickboxes[index].check = 'yes';
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.data,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	}
})
/** Retograma bitacora-challenge Controller **/
.controller('retogramaBitacoraChallengeCtrl', function($http,$scope,$state,$ionicLoading,$ionicPopup,$stateParams,$filter,$cordovaCamera,$cordovaFileTransfer) {
	var alertPopup; 
	$scope.getdata = $scope.data = {};
	$scope.data.imageData = $scope.data.file_type = '';
	/** http://dreamgraphs.com/web_service.php?action=day_count&accpet_id=185 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "day_count";
		var data_parameters = "action="+action+"&accpet_id="+$stateParams.record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.getdata = response;
				$scope.data.challenge_name = $scope.getdata.challenge_name;
				$ionicLoading.hide();
			}
		});
	});
	// Datepicker
	$scope.data.Seldate = $filter('date')(new Date(), "dd-MM-yyyy"); 
	$scope.data.minSeldate =  $filter('date')(new Date(), "dd-MM-yyyy");
	$scope.CallbackSeldate = function (val) {
		if (!val) {	
			console.log('Date not selected');
		} else {
			console.log('Selected date is : ', val);
			val = $filter('date')(val, "dd-MM-yyyy");
			$scope.data.Seldate = val;
		}
	};
	$scope.chooseOption4PPhoto = function() {
		alertPopup = $ionicPopup.show({
		  template: '<div class="row text-center"><div class="col col-50"><button style="line-height:28px;" class="button button-royal icon ion-camera" ng-click="takePhoto4Upload();"></button></div><div class="col col-50"><button style="line-height:28px;" class="button button-energized icon ion-images" ng-click="choosePhoto4Upload();" ></button></div></div>',
		  title: 'Choose Option',
		  scope: $scope,
		  buttons: [
			{ 
			  text: 'Close',
			  type: 'button-custom'
			},
		  ]
		});
	};
	// open PhotoLibrary
    $scope.takePhoto4Upload = function () {
		alertPopup.close();
		console.log('takePhoto');
		var options = {
			quality: 75,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 500,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.data.imageData = imageData;
		}, function (err) {
			// An error occured. Show a message to the user
		});
	}
	$scope.choosePhoto4Upload = function () {
		alertPopup.close();
		console.log('choosePhoto');
		var options = {
			quality: 75,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 800,
			targetHeight: 500,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.data.imageData = imageData;
		}, function (err) {
			// An error occured. Show a message to the user
		});
	}
	$scope.submitbitacoraChallengeForm = function(FormName) {
		/** http://dreamgraphs.com/web_service.php?action=daily_entry&challenge_id=6&day_name=day%201&user_id=48&record_date=27-01-2017&sensacion=when%20an%20unknown%20printer%20took%20a%20galley%20of%20type%20and&accept_challange=177 **/
		if(FormName.$invalid) {
			console.log('Form is invalid');
			$ionicPopup.show({
			  template: '',
			  title: '<p><i class="ion-android-cancel icon-popup"></i></p> Form Is Incomplete',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
		}
		else{
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			var server = globalip;
			var imageData = $scope.data.imageData;
			var options = new FileUploadOptions();
			options.fileKey = "strImagen";
			options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
			options.mimeType = "image/jpeg";
			options.chunkedMode = false; // Transfer picture to server
			var params = new Object(); 
			params.action = 'daily_entry';
			params.challenge_id = $scope.getdata.challenge_id;
			params.day_name = $scope.data.days_obj.day_name;
			params.day_value = $scope.data.days_obj.value;
			params.user_id = global_login_id;
			params.record_date = $scope.data.Seldate;
			params.sensacion = $scope.data.description;
			params.accept_challange = $stateParams.record_id;
			//Send Parameters			
			options.params = params;
			var ft = new FileTransfer();
			$ionicPopup.show({
			  template: '',
			  title: imageData+' ####'+JSON.stringify(options),
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-custom'
				},
			  ]
			});
			ft.upload(imageData, server, function(r) {
				var k = JSON.parse(r.response);
				$ionicLoading.hide();
				$ionicPopup.show({
				  template: '',
				  title: r,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom', 
					},
				  ]
				});
				$ionicPopup.show({
				  template: '',
				  title: k[0].msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					  onTap: function() { 
						console.log('tapped');
						if(k[0].success == 'Y'){
							$state.go('app.retograma~progress',{},{ reload: true });
						}
					  }
					},
				  ]
				});
				if(k[0].success == 'Y'){
					$scope.data.challenge_name = $scope.data.day_name = $scope.data.Seldate = $scope.data.description = $scope.data.imageData = '' ;
					FormName.$setPristine();
				}
			}, function(error) {
				$ionicPopup.show({
				  template: '',
				  title: error,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom', 
					},
				  ]
				});
			   // document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
			   $ionicLoading.hide();
			}, options);
		}
	};
})
/** Retograma Instructions Controller **/
.controller('retogramaInstructionsCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=in_progress_deatils&record_id=167&column_name=instructions **/
	$scope.$on('$ionicView.enter', function() {
		$scope.instructions = {};
		var action = "in_progress_deatils";
		var data_parameters = "action="+action+"&record_id="+$stateParams.record_id+"&column_name=instructions";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.instructions = response.data;
				$ionicLoading.hide();
			}
		});
	});
	$scope.GotoLink = function(url){
	  var ref = window.open(url,'_blank','location=no'); 
	  return false;
	}
})
/** Retograma Motivate Controller **/
.controller('retogramaMotivateCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory) {
	/** http://dreamgraphs.com/web_service.php?action=in_progress_deatils&record_id=167&column_name=motivate **/
	$scope.$on('$ionicView.enter', function() {
		$scope.motivates = {};
		var action = "in_progress_deatils";
		var data_parameters = "action="+action+"&record_id="+$stateParams.record_id+"&column_name=motivate";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.motivates = response.data;
				$ionicLoading.hide();
			}
		});
	});
	$scope.GotoLink = function(url){
	  var ref = window.open(url,'_blank','location=no'); 
	  return false;
	}
})
/** Retograma Daily Entry Controller **/
.controller('retogramaDailyentryCtrl', function($http,$scope,$state,$ionicLoading,$stateParams,$ionicHistory,$ionicPopup,$filter) {
	/** http://dreamgraphs.com/web_service.php?action=in_progress_deatils&user_id=48&record_id=167&column_name=daily_entry **/
	$scope.comments = '';
	$scope.$on('$ionicView.enter', function() {
		$scope.dailyentries = {};
		var action = "in_progress_deatils";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&record_id="+$stateParams.record_id+"&column_name=daily_entry";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.dailyentries = response.data;
				$ionicLoading.hide();
			}
		});
	});
	/** Like Details **/
	$scope.likeDetails = function(wall_id) {
		/** http://dreamgraphs.com/web_service.php?action=get_like_of_wall&wall_id=373 **/
		var likers = '';
		var action = "get_like_of_wall";
		var data_parameters = "action="+action+"&wall_id="+wall_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				angular.forEach(response.data, function(value, key){
					likers += '<p class="bottom-border">'+value.username+'</p>';
				});
				$ionicLoading.hide();
				$ionicPopup.show({
				  template: likers,
				  title: 'Likes',
				  scope: $scope,
				  cssClass: 'my-custom-popup',
				  buttons: [
					{ 
					  text: 'Close',
					  type: 'button-custom'
					},
				  ]
				});
			}
		});
	}
	$scope.loadingComments = new Array();
	/** Like Details **/
	$scope.commentsDetails = function(wall_id,index) {
		/** http://dreamgraphs.com/web_service.php?action=get_comment_of_wall&wall_id=373 **/
		$scope.loadingComments[index] = true;
		var action = "get_comment_of_wall";
		var data_parameters = "action="+action+"&wall_id="+wall_id;
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.dailyentries[index].getcomments = response.data;
				$scope.dailyentries[index].comment_count = response.comment_count;
			}
			$scope.loadingComments[index] = false;
		});
	}
	/** Like Dislike **/
	$scope.wallLikeDislike = function(wall_id,index,user_exist) {
		/** http://dreamgraphs.com/web_service.php?action=wall_like_dislike&user_id=12&wall_id=377 **/
		var likers = '';
		var action = "wall_like_dislike";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&wall_id="+wall_id;
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				$scope.dailyentries[index].like_count = response.total_like;
				$scope.dailyentries[index].user_exist = !user_exist;
			}
			$ionicLoading.hide();
		});
	}
	$scope.formData = {};
	// Write A Comment
	$scope.submitcommentForm = function(wall_id,index) {
		/** http://dreamgraphs.com/web_service.php?action=put_comment_on_wall&user_id=12&wall_id=377&comment=looking nice **/
		var data_parameters = "action=put_comment_on_wall"+"&user_id="+global_login_id+"&wall_id="+wall_id+"&comment="+$scope.formData.newcomment[index];
		if($scope.formData.newcomment[index] != '' && $scope.formData.newcomment[index] != undefined) {
			$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
			$http.post(globalip,data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				if(response.success == 'Y'){
					$scope.formData.newcomment[index] = '';
					var data_parameters2 = "action=get_comment_of_wall"+"&wall_id="+wall_id;
					$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
					$http.post(globalip,data_parameters2, {
						headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
					})
					.success(function(response2) {
						if(response2.success == "Y"){
							$scope.dailyentries[index].getcomments = response2.data;
							$scope.dailyentries[index].comment_count = response2.comment_count;
						}
						$ionicLoading.hide();
					}); 
				}
				$ionicLoading.hide();
			});
		}
	}
})
/** My-In-Failed Challenges **/
.controller('myInFailedChallengesCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=my_challenge&user_id=15&condition=failed **/
	$scope.$on('$ionicView.enter', function() {
		var action = "my_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&condition=failed";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.myInFailedChallenges = response.data;
			}
			$ionicLoading.hide();
		});
	});
})
/** My-Achievments Challenges **/
.controller('myAchievementsCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=my_challenge&user_id=48&condition=completed **/
	$scope.$on('$ionicView.enter', function() {
		var action = "my_challenge";
		var data_parameters = "action="+action+"&user_id="+global_login_id+"&condition=completed";
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.myAchievements = response.data;
			}
			$ionicLoading.hide();
		});
	});
})
/** My-Achievment Details Challenges **/
.controller('myAchievementDetailsCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup,$stateParams) {
	/** http://dreamgraphs.com/web_service.php?action=achievement_deatils&record_id=168 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "achievement_deatils";
		var record_id = $stateParams.record_id
		var data_parameters = "action="+action+"&record_id="+record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.myAchievementDetails = response.data;
			}
			$ionicLoading.hide();
		});
	});
})
/** sendChallengesCtrl Challenges **/
.controller('sendChallengesCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=list_send_challenge&current_user=20 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "list_send_challenge";
		var data_parameters = "action="+action+"&current_user="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.mysendChallenges = response.data;
			}
			$ionicLoading.hide();
		});
	});
})
/** sendChallengeDetailsCtrl Challenges **/
.controller('sendChallengeDetailsCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup,$stateParams) {
	/** http://dreamgraphs.com/web_service.php?action=send_challenge_details&record_id=196 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "send_challenge_details";
		var record_id = $stateParams.record_id;
		var data_parameters = "action="+action+"&current_user="+global_login_id+"&record_id="+record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.sendChallengeDetails = response.data;
			}
			$ionicLoading.hide();
		});
	});
	/** Delete Send Challenge **/
	$scope.deleteSendChallenge = function(record_id) {
		/** dreamgraphs.com/web_service.php?action=send_challenge_details&delete=204 **/
		var action = "send_challenge_details";
		var data_parameters = "action="+action+"&delete="+record_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-thumbsup icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom',
					  onTap: function() { 
						console.log('tapped');
						$state.go('app.send-challenges',{},{ reload: true });
					  }
					}
				  ]
				});
			}
			else{
				$ionicPopup.show({
				  template: '',
				  title: '<p><i class="ion-ios-information icon-popup"></i></p> '+response.msg,
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-custom'
					},
				  ]
				});
			}
			$ionicLoading.hide();
		});
	}
})
/** myChallengesCtrl Challenges **/
.controller('myChallengesCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=my_challenge_count&user_id=48 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "my_challenge_count";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.myChallenges = response.my_challenge;
			}
			$ionicLoading.hide();
		});
	});
	$scope.GotoPage = function(page){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page);
	}
})
/** friendChallengesCtrl Challenges **/
.controller('friendChallengesCtrl', function($http,$scope,$state,$ionicHistory,$ionicLoading,$ionicPopup) {
	/** http://dreamgraphs.com/web_service.php?action=friend_challenge_count&user_id=48 **/
	$scope.$on('$ionicView.enter', function() {
		var action = "friend_challenge_count";
		var data_parameters = "action="+action+"&user_id="+global_login_id;
		$ionicLoading.show({template: '<ion-spinner icon="ios" class="spinner-primary"></ion-spinner>'});
		$http.post(globalip,data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			if(response.success == "Y"){
				//window.localStorage.setItem("offineData.homepageData", angular.toJson(response));
				$scope.friendChallenges = response.friend_challenge;
			}
			$ionicLoading.hide();
		});
	});
	$scope.GotoPage = function(page){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page);
	}
})
/** bottomTabsCtrl Challenges **/
.controller('bottomTabsCtrl', function($scope,$state,$ionicHistory,$ionicTabsDelegate,$timeout) {
	$scope.GotoPage = function(page,tab){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$timeout(function(){
			$ionicTabsDelegate.select(tab);
		},100);
		$state.go('app.'+page);
	}
})
/** Menu **/
.controller('MenuController', function($scope,$ionicSideMenuDelegate,$state,$ionicHistory) {
	$scope.GotoPage = function(page){ 
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('app.'+page);
		$ionicSideMenuDelegate.toggleLeft();
	}
});
