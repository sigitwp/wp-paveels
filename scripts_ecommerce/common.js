var wp = {
	api: 'https://localhost:8443/json/',
	uri_scripts: 'scripts_ecommerce/',
	uri_styles: 'styles_ecommerce/',
	ver: '800-000-1616.95.20150622',
	bizId: 'paveels',
	viewSize: -1,
	viewIndex: -1,
	pageId: ''
};

var dev = {
	log: {
		error: 'background-color: #DDDDDD; color: #FF0400',
		info: 'background-color: #DDDDDD; color: #0064FF',
		success: 'background-color: #DDDDDD; color: #00CC09'
	}
};// end var dev

console.log('common.js called...');

if (Modernizr.localstorage) {
	console.log("window.localStorage is available");
	console.log("wp.api: "+wp.api);
	console.log("wp.ver: "+wp.ver);
	
	var pdid = localStorage["pdid"];
	console.log("pdid: "+pdid);
	
	var drid = localStorage["drid"];
	console.log("drid: "+drid);
	
	if(pdid == null || drid == null){
		console.log("pdid or drid is null, now trying to get pdid from backend");
		drid = acak(1,100000000000,0);	
		registerNewDevice(wp.ver,drid);
	}
} else {
	console.log("window.localStorage is NOT available");
	alert("NOT SUPPORTED");
	//FIXME seharusnya ngapain gitu, biar gak bisa buka yang selanjutnya, karena ini common js
}// end if Modernizr.localStorage
	
function getParameter(name) {
	var name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
		regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function callApi(apiName){	
	console.log('callApi called...');

	var api_params_in = api_params[apiName]["params_in"];

	var parameters = {};
	parameters.pdid = localStorage['pdid'];
	parameters.drid = localStorage['drid'];
	parameters.dtk = localStorage['dtk'];
		
	var index_params_in = 0;
		
	while(index_params_in < api_params_in.length){
		var api_params_in_Name = api_params_in[index_params_in];
		var valueFromRequest = getParameter(api_params_in_Name);
		
		if(valueFromRequest == "" ){
			parameters[api_params_in_Name] = wp[api_params_in_Name];
		}else{
			parameters[api_params_in_Name] = valueFromRequest;
		}
		index_params_in++;
	}// end while setting field parameters

	getData(apiName, parameters, function(data){

		var field_name = api_params[data.apiName]['params_out']['field_name'];
		api_params[data.apiName]['params_out']['field_data'] = data[field_name];
		
		if(data[field_name].length < 1){
			$('[data-api-name="'+apiName+'"]').remove();
		}else{
			fillResultToHtml(data.apiName);
		}
	});// end getData
		
	console.log('callApi finished...');
}// end callApi

function fillResultToHtml(apiName){
	
	//FIXME not all fields are needed
	var field_name 		=  api_params[apiName]['params_out']['field_name'];
	var field_type 		=  api_params[apiName]['params_out']['field_type'];
	var field_parent 	=  api_params[apiName]['params_out']['field_parent'];
	var field_key 		=  api_params[apiName]['params_out']['field_key'];
	var field_data 		= api_params[apiName]['params_out']['field_data'];
	
	
	var $apiElements = $('#'+wp.pageId).find('[data-api-name="'+apiName+'"]');

	var indexElement = 0;
	
	$($apiElements).each(function(){
		var $thisApiElement = $(this);
		var $apiLoops = $thisApiElement.find('[data-api-loop]');
		
		var indexLoop = 0;
		$($apiLoops).each(function(){
			$thisApiLoop = $(this);
			var apiLoop = $thisApiLoop.data('api-loop');
			
			if(apiLoop == "one"){
			
			};// end apiShow == one
			
			if(apiLoop == "list"){
				var $apiRecords = $thisApiLoop.find('[data-api-record="record"]');
				var indexApiRecord = 0;
				
				$($apiRecords).each(function(){
					$thisApiRecord = $(this);
					for (var indexRecord=0; indexRecord < field_data.length; indexRecord++){
					
						var $apiFields = $thisApiRecord.find('[data-api-field]');
						
						$($apiFields).each(function(){
							var $thisApiField = $(this);
							var fieldNameInElement = $thisApiField.data('api-field');
							
							if($thisApiField.prop("tagName") == "IMG"){
								$thisApiField.attr("src", field_data[indexRecord][fieldNameInElement]);
							}
							else if($thisApiField.prop("tagName") == "A"){	
								var hrefNew = $thisApiField.data('link-url')+"?";
								var fieldLinks = fieldNameInElement.split(',');
								
								var indexFieldLink = 0;
								while(indexFieldLink < fieldLinks.length){
									var fieldLinkName = fieldLinks[indexFieldLink];
									hrefNew = hrefNew+fieldLinkName+"="+field_data[indexRecord][fieldLinkName]+"&";
									indexFieldLink++;
								}// end while indexFieldLink
								hrefNew = hrefNew.substring(0, (hrefNew.length-1) );
								$thisApiField.attr("href", hrefNew);
							}else{
								$thisApiField.text(field_data[indexRecord][fieldNameInElement]);
							} //end else if
						});// end apiField.each
						
						$thisApiLoop.append($thisApiRecord.clone().attr('id',apiName+'_'+indexElement+'_'+indexApiRecord+'_'+indexRecord));

					};// end for indexRecord
					$thisApiRecord.first().remove();		
					
					indexApiRecord++;
				});// end apiRecords.each
			};// end apiLoop == list
			
			if(apiLoop == "array"){
				var $apiParentRecords = $thisApiLoop.find('[data-api-record="parent"]');
				var indexApiParentRecord = 0;

				var parent_data = $.grep(field_data, function(e){
					return e[field_parent] == null;
				});
				
				$($apiParentRecords).each(function(){
					var $thisApiParentRecord = $(this);
					
					var $thisApiParentRecordClone = $thisApiParentRecord.clone();

					for (var indexParentRecord=0; indexParentRecord < parent_data.length; indexParentRecord++){
						console.log("parent: "+parent_data[indexParentRecord][field_key]);
						
						var $apiParentFields = $thisApiParentRecord.find('[data-api-field]');
						$($apiParentFields).each(function(){
							var $thisApiParentField = $(this);
							var fieldNameInElement = $thisApiParentField.data('api-field');
							if($thisApiParentField.prop("tagName") == "IMG"){
								$thisApiParentField.attr("src", parent_data[indexParentRecord][fieldNameInElement]);
							}
							else if($thisApiParentField.prop("tagName") == "A"){	
								var hrefNew = $thisApiParentField.data('link-url')+"?";
								var fieldLinks = fieldNameInElement.split(',');
								
								var indexFieldLink = 0;
								while(indexFieldLink < fieldLinks.length){
									var fieldLinkName = fieldLinks[indexFieldLink];
									hrefNew = hrefNew+fieldLinkName+"="+parent_data[indexParentRecord][fieldLinkName]+"&";
									indexFieldLink++;
								}// end while indexFieldLink
								hrefNew = hrefNew.substring(0, (hrefNew.length-1) );
								$thisApiParentField.attr("href", hrefNew);
							}else{
								$thisApiParentField.text(parent_data[indexParentRecord][fieldNameInElement]);
							} //end else if
							console.log("thisApiParentField: "+fieldNameInElement);
						})// end apiParentFields.each
						
						$thisApiParentRecord.attr('data-api-parent',parent_data[indexParentRecord][field_key]);

												
						$thisApiLoop.append($thisApiParentRecord.clone().attr('id',apiName+'_'+indexElement+'_'+indexApiParentRecord+'_'+indexParentRecord));
						
						
					}// end for indexParentRecord
					
					$thisApiParentRecord.first().remove();
					
					// $thisApiLoop.append($thisApiParentRecordClone);
					
					indexApiParentRecord++;
				});// end apiParentRecords.each
				
				console.log("now working the chilren ***********************");
				for(var indexParentRecord=0; indexParentRecord < parent_data.length; indexParentRecord++){
					var parentId = parent_data[indexParentRecord][field_key];
					console.log("parentId: "+ parentId);
					
					var $parentElements = $thisApiLoop.find('[data-api-parent="'+parentId+'"]');
					
					$($parentElements).each(function(){
						var $thisParentElement = $(this);
						
						var $thisChildrenArray = $thisParentElement.find('[data-api-loop="children-array"]');
						
						$($thisChildrenArray).each(function(){
							
							var $thisApiChildrenRecord = $thisChildrenArray.find('[data-api-record="children"]');
							// var $thisApiChildrenRecordClone = $thisApiChildrenRecord.clone();
							
							$($thisApiChildrenRecord).each(function(){
								var children_data = $.grep(field_data, function(e){
									return e[field_parent] == parent_data[indexParentRecord][field_key];
								});
								
								console.log("children_data.length: "+children_data.length);
								
								for(var indexChildrenRecord=0; indexChildrenRecord < children_data.length; indexChildrenRecord++){
									console.log("childrenId: "+children_data[indexChildrenRecord][field_key]);
									
									var $apiChildrenFields = $thisApiChildrenRecord.find('[data-api-field]');
									$($apiChildrenFields).each(function(){
										var $thisApiChildrenField = $(this);
										var fieldNameInElement = $thisApiChildrenField.data('api-field');
										if($thisApiChildrenField.prop("tagName") == "IMG"){
											$thisApiChildrenField.attr("src", children_data[indexChildrenRecord][fieldNameInElement]);
										}
										else if($thisApiChildrenField.prop("tagName") == "A"){	
											var hrefNew = $thisApiChildrenField.data('link-url')+"?";
											var fieldLinks = fieldNameInElement.split(',');
											
											var indexFieldLink = 0;
											while(indexFieldLink < fieldLinks.length){
												var fieldLinkName = fieldLinks[indexFieldLink];
												hrefNew = hrefNew+fieldLinkName+"="+children_data[indexChildrenRecord][fieldLinkName]+"&";
												indexFieldLink++;
											}// end while indexFieldLink
											hrefNew = hrefNew.substring(0, (hrefNew.length-1) );
											$thisApiChildrenField.attr("href", hrefNew);
										}else{
											$thisApiChildrenField.text(children_data[indexChildrenRecord][fieldNameInElement]);
										} //end else if
										console.log("thisApiChildrenField: "+fieldNameInElement);
									})// end apiChildrenFields.each
									
									$thisChildrenArray.append($thisApiChildrenRecord.clone().attr('id',apiName+'_'+indexElement+'_'+'_'+indexChildrenRecord));
									
								}// end for indexChildrenRecord
								
								$thisChildrenArray.children().first().remove();

							});// end thisApiChildrenRecord.each

							
							
							
							
							
							
							
						})// end thisChildrenArray.each
						
						
						
						
					});// end parentElement.each
					
				}// end for indexParentRecord
				
				

				
				
				
				
			};// end apiLoop == array
			
			indexLoop++;
		});// end apiLoop.each
		
		indexElement++;
	});// end apiElements.each

}// end fillResultToHtml




function getData(apiName, parameters, callback) {
	var request = $.ajax({
		type: "POST",
		url: wp.api + apiName,
		data: parameters,
		dataType: 'json'
	});

	request.done(function(data, status, xhr) {
		console.log("data.wpCode: "+data.wpCode);
		data.apiName = apiName;

		if (data.wpCode == 999) {
			if (typeof(callback) == "function") {
				callback(data);
			}
		} else {
			console.log('%c Error when requesting to "' + apiName+ '". ' + 'Please check your parameters or connection. ', dev.log.error);
			
			//FIXME keluarin notifikasi kalau ada error dari belakang
			console.log("apiName: "+apiName+", "+data.wpCode+": "+data.wpMessage);
			
			$('[data-api-name="'+apiName+'"]').remove();
		}// end else if 999
	})// end request.done

	request.fail(function(xhr, status, error) {
		// console.log(xhr, status, error);
		console.log('%c Error when requesting to "' + apiName + '" ', dev.log.error);
		
		$('[data-api-name="'+apiName+'"]').remove();
		// FIXME hilangin aja pake remove
	})
}// end getData

function checkDevice(){
	var userAgent = navigator.userAgent.toLowerCase();
	if( /windows phone/i.test(userAgent) ){
		return "windowsPhone";
	}else
	if( /android/i.test(userAgent) ){
		return "Android";
	}else
	if( /ipad|iphone|ipod/i.test(userAgent) ){
		return "iOS";
	}else{
		return "Browser";
	}
}// end checkDevice

function acak(min, max, whole) {
	console.log("acak called...");
	return void 0===whole||!1===whole?Math.random()*(max-min+1)+min:!isNaN(parseFloat(whole))&&0<=parseFloat(whole)&&20>=parseFloat(whole)?(Math.random()*(max-min+1)+min).toFixed(whole):Math.floor(Math.random()*(max-min+1))+min;
};

function registerNewDevice(ver,drid){
	console.log("registerNewDevice called...");
	var jawaban = false;
	
	$.ajax({
		async: false,
		url: wp.api+"registerNewDevice",
		data: { 
			ver: ver,
			drid: drid,
			userDevice: checkDevice()
		},
		type: "POST",
		cache: false,
		dataType: 'json',
		
		success: function(response, status, xhr) {
			console.log("registerNewDevice responded...");
			
			if (response.wpCode == 999) {
				console.log("now writing to local storage");
				
				localStorage.setItem("pdid",response.pdid);
				localStorage.setItem("drid",drid);
				
			}else{
				console.log("something not right happened...");
				console.log("error code: "+response.wpCode);
				console.log("error message: "+response.wpMessage);
				
				// FIXME
				// harus dibuang ke page awal aja. hati hati async
				alert("error code: "+response.wpCode+", error message: "+response.wpMessage);
			}
			
		},
		error: function(xhr, status, error) {
			console.log("error in contacting registerNewDevice...");
			console.log(xhr, status, error);
			// window.location.href = "error.html";
		}
	});
}; // end registerNewDevice


$( document ).on( "pagecontainershow", function( event, ui ) {
	wp.pageId = $('body').pagecontainer('getActivePage').prop('id'); 
	
	var $pageNow = $('#'+wp.pageId);
	var apis = $pageNow.data('api-name');
	var apiNames = apis.split(',');
	
	for (var indexApiName = 0; indexApiName < apiNames.length; indexApiName++) {
	   var apiName = $.trim(apiNames[indexApiName]);
	   callApi(apiName);
	}// end for apiNames
}); // end document on pagecontainershow

