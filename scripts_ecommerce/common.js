
var wp = {
	api: 'https://localhost:8443/json/',
	uri_scripts: 'scripts_ecommerce/',
	uri_styles: 'styles_ecommerce/',
	ver: '800-000-1616.95.20150622'
}

var dev = {
	log: {
		error: 'background-color: #DDDDDD; color: #FF0400',
		info: 'background-color: #DDDDDD; color: #0064FF',
		success: 'background-color: #DDDDDD; color: #00CC09'
	}
}// end var dev

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
	

$( document ).on( "pagecontainershow", function( event, ui ) {

	//FIXME TESTING KALAU SUDAH DI WEB SERVER, apakah masih bener perhitungan indexnya
	// FIXME sementara tidak dipakai karena jquerymobile gak load common.js lagi kalau link diclick
	var pathname = window.location.pathname
	// alert("window.location.pathname: "+pathname);
	var titikHtml = pathname.lastIndexOf(".html");
	// alert("titikHtml: "+titikHtml);
	var garisMiring = pathname.lastIndexOf("/");
	
	pathname = pathname.substring(garisMiring+1, titikHtml);
	// alert("pathname now: "+pathname);
	
	loadJsCssFile(wp.uri_scripts+pathname+".js", "js");

});


function parseApi(){	
	console.log('parseApi called...');
	var apiList = $('.api-name');
	var indexApi = 0;

	while (indexApi<apiList.length)
	{
		var api = apiList[indexApi];		
		
		//FIXME di sini panggil ajax sesuai nama api.id untuk diisi ke JSON
		//sementara

		var apiItemName = '#'+api.id+'_item';			
		var apiItem = $(apiItemName);

		var dataJson = 7; //FIXME harusnya sesuai dengan jumlah data JSON yang dijawab.
		var indexApiRecord = 0;
		
		if(dataJson > 0){
			while(indexApiRecord < dataJson){
				apiItem.parent().append(apiItem.clone().attr("id", api.id+"_item_"+indexApiRecord));
				
				var apiFields = $("#"+api.id+"_item_"+indexApiRecord).find('.api-field');
				var indexApiField = 0;
				while(indexApiField < apiFields.length){
					//FIXME di sini isi sesuai data dari JSON
					
					$(apiFields[indexApiField]).attr("id", apiFields[indexApiField].id+"_"+indexApiRecord);

					$(apiFields[indexApiField]).text("yuhuuu_"+indexApiRecord); //FIXME isi sesuai nama field dengan data JSON
					indexApiField++;
				}// end isi Field
				
				indexApiRecord++;
			}// end while sesuai jumlah record
		}else{
			var apiTitleName = '#'+api.id+'_title';
			var apiTitle = $(apiTitleName);
			apiTitle.text(apiTitle.text()+" - no data");
		}
		
		$(apiItemName).css("display","none");
		
		indexApi++;
	}// end while sesuai jumlah api yang harus dipanggil ke belakang
	console.log('parseApi finished...');
}// end parseApi

function getData(url, parameters, callback) {
	var request = $.ajax({
		url: wp.api + url,
		data: parameters,
		dataType: 'json'
	});

	request.done(function(data, status, xhr) {
		if (data.wpCode == 999) {
			if (typeof(callback) == "function") {
				callback(data);
			}
		} else {
			// console.log(data, status, xhr);
			console.log('%c Error when requesting to "' + url + '". ' + 'Please check your parameters or connection. ', dev.log.error);
			alert(data.wpCode+": "+data.wpMessage)
		}// end else if 999
	})// end request.done

	request.fail(function(xhr, status, error) {
		// console.log(xhr, status, error);
		console.log('%c Error when requesting to "' + url + '" ', dev.log.error);
	})
}// end getData


/*
 * example of using
 * loadJsCssFile("myscript.js", "js") //dynamically load and add this .js file
 * loadJsCssFile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
 * loadJsCssFile("mystyle.css", "css") ////dynamically load and add this .css file
*/
function loadJsCssFile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}// end loadJsCssFile



function setHeader(mustLogin){
	// FIXME seharusnya di sini bisa set header beneran, karena kalau pake jQuery mobile toh walaupun kirim header, headernya dibuang.
	// jadi setiap html, cuma perlu contentnya doang.
	// header dan footer bisa ambil waktu diperluin aja
	
	if(mustLogin == true){
		var User = localStorage["User"];

		if(User == null){
			window.location.href = "signin.html";
		}else{
			// we dont ask for User data to backend anymore, because if something wrong, preprocessor in backend should already handle.
			User = JSON.parse(User);
			alert(User.profileImgUrl);
			$("#profileImgUrl").attr("src",User.profileImgUrl);
		}// end User == null
	}// end if mustLogin
	
}// end setHeader

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

