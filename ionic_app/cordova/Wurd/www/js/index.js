/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var wnd = []; 
var height = window.innerHeight-88;
var width = window.innerWidth;
var timeOutFun;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');

        timeOutFun = setTimeout(function(){
            //toServer();
        },2000);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

// document.getElementById('index-open-camera').onclick = function(){
// 	navigator.camera.getPicture(function(imageData) {
// 		var image = document.getElementById('myImage');
// 		image.src = "data:image/jpeg;base64," + imageData;
// 	}, function onFail(message) {
// 		alert('Failed because: ' + message);
// 	}, { quality: 25,
// 		destinationType: Camera.DestinationType.DATA_URL
// 	});

// };

document.getElementById('index-logo-img').onclick = function(){
    if(timeOutFun){
        clearTimeout(timeOutFun);
    }
    var indexConfigElm = document.getElementById("index-config");
    var server = localStorage.getItem("wurd.server");
    if(server){
        document.getElementById("index-config-server").value = server;
    }
    indexConfigElm.style.display = "block";
};

document.getElementById('index-logo-img').addEventListener('touchmove', function(event) {
    event.preventDefault();
    toServer();
}, false);

document.getElementById('index-logo-img').ondragleave = function(){
	toServer();
};

document.getElementById('index-cancle').onclick = function(){
	var indexConfigElm = document.getElementById("index-config");
    indexConfigElm.style.display = "none";
};

document.getElementById('index-save').onclick = function(){
    var indexConfigElm = document.getElementById("index-config");
    var server = document.getElementById("index-config-server").value;
    if(!server){
        alert("input server");
        return;
    }
    var iframeOrNot = 0;
    var iframeOrNotElm = document.getElementsByName("iframeOrNot");
    for(var i=0;i<iframeOrNotElm.length;i++){
        if(iframeOrNotElm[i].checked){
            iframeOrNot = iframeOrNotElm[i].value;
            break;
        }
    }
    localStorage.setItem("wurd.server", server);
    localStorage.setItem("wurd.iframeOrNot", iframeOrNot);
    indexConfigElm.style.display = "none";
};

document.getElementById('indexUrlTo').onclick = function(){
	var url = document.getElementById('indexUrl').value;
	url = getUrl(url);
	if(url){
		var iframeOrNot = localStorage.getItem("wurd.iframeOrNot");
        if(!iframeOrNot || iframeOrNot == "0"){
			try {
				window.location.href = url;
                //var inAppBrowserRef  = cordova.InAppBrowser.open(encodeURI(url), 
                //   '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=Close');
				
            } catch (error) {
                console.error(error);
                location.href = url;
            }
		}else{
			openIframe(url);
		}
	}
}

document.getElementById('indexUrlToNew').onclick = function(){
	var url = document.getElementById('indexUrl').value;
	url = getUrl(url);
	if(url){
		var iframeOrNot = localStorage.getItem("wurd.iframeOrNot");
        if(!iframeOrNot || iframeOrNot == "0"){
			try {
				//window.open(url);
                var w = window.open(server, '', 'height=' + height + ', width=' + width + ', top=44, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
				wnd.push(w);
				
				//var inAppBrowserRef  = cordova.InAppBrowser.open(encodeURI(url), 
                //   '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=Close');
				
            } catch (error) {
                console.error(error);
                location.href = url;
            }
		}else{
			openIframe(url);
		}
	}
}

document.getElementById('indexUrlToNew').onclick = function(){
	document.getElementById('index-iframe').contentWindow.history.back();
}

document.getElementById('indexForward').onclick = function(){
	document.getElementById('index-iframe').contentWindow.history.forward();
}

function getUrl(url){
	if(url){
		if(!url.startsWith("https://") && !url.startsWith("http://")){
			url = "http://" + url;
		}
	}
	return url;
}

function toServer(){
    var server = localStorage.getItem("wurd.server");
	server = getUrl(server);
    if(server){
        var iframeOrNot = localStorage.getItem("wurd.iframeOrNot");
        if(!iframeOrNot || iframeOrNot == "0"){
            try {
				//window.open(server);
				var w = window.open(server, '', 'height=' + height + ', width=' + width + ', top=44, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
				wnd.push(w);
                //var inAppBrowserRef  = cordova.InAppBrowser.open(encodeURI(server), 
                //   '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=Close');
				
            } catch (error) {
                console.error(error);
                location.href = server;
            }
        }else{
			openIframe(server);
            
        }
    }
}

function openIframe(url){
	var logoElm = document.getElementById("index-logo");
	logoElm.style.display = "none";
	var iframeElm = document.getElementById("index-iframe");
	iframeElm.style.display = "block";
	document.getElementById("index-header").style.display = "block";
	document.getElementById("index-footer").style.display = "block";
	iframeElm.src = url;
}

var exitCount = 0;
document.addEventListener("deviceready",function(){
    
    document.addEventListener("backbutton", function(){
		exitCount = exitCount + 1;
		if(exitCount > 1){
			navigator.app.exitApp();
		}
		setTimeout(function(){
			exitCount = 0;
		},1500);
		
    }, false);
},false);



