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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
(function() {
	
    var BASE_DIRECTORY = "CS_Recorder";	
    var audioMedia;
    var recordingMedia;	
    var recInterval;
    
    $(document).on("pageinit", "#main", function(e) {
        e.preventDefault();
                
        function onDeviceReady() { 
        	console.log("[Notice] Device is now ready. Now registering app events ...");
        	
	        $("#recordSound").on("tap", function(e) {
	            e.preventDefault();
	        
	            var recordingCallback = {};
	            
	            recordingCallback.recordSuccess = handleRecordSuccess;
	            recordingCallback.recordError = handleRecordError;
	            
	            startRecordingSound(recordingCallback);
	            
	            var recTime = 0;
	            
	            $("#soundDuration").html("Duration: " + recTime + " seconds");
	            
	            $("#recordSoundDialog").popup("open");
	            
	            recInterval = setInterval(function() {
	                                         recTime = recTime + 1;
	                                         $("#soundDuration").html("Duration: " + recTime + " seconds");
	                                      }, 1000);            
	        });       
	        
	        $("#recordSoundDialog").on("popupafterclose", function(event, ui) {
	            clearInterval(recInterval);
	            stopRecordingSound();
	        });        
	        
	        $("#stopRecordingSound").on("tap", function(e) {
	            $("#recordSoundDialog").popup("close");
	        });
	        
	        $("#playSound").on("tap", function(e) {
	            e.preventDefault();
	        
	            var playCallback = {};
	            
	            playCallback.playSuccess = handlePlaySuccess;
	            playCallback.playError = handlePlayError;
	            
	            playSound($("#location").val(), playCallback);
	        });    
        }
        
        $(document).on('deviceready', onDeviceReady);
        
        initPage();
    });
        
    function handleRecordSuccess(newFilePath) {            
        var currentFilePath = newFilePath;
        
        $("#location").val(currentFilePath);    
        $("#playSound").closest('.ui-btn').show();  
    }
        
    function handleRecordError(error) {
    	console.log(error);
    }  
    
    function handlePlaySuccess() {
        console.log("Sound file is played successfully ...");
    }
    
    function handlePlayError(error) {
        displayMediaError(error);
    }  
    
    function onDeviceReady() {
    	console.log("Device is ready ...");
    }
    
    function startRecordingSound(recordingCallback) {
        var recordVoice = function(dirPath) {
            var basePath = "";

            if (dirPath) {
                basePath = dirPath + "/";
            }

            var mediaFilePath = basePath + (new Date()).getTime() + ".wav";
            
            var recordingSuccess = function() {
                recordingCallback.recordSuccess(mediaFilePath);
            };            
            
            recordingMedia = new Media(mediaFilePath, recordingSuccess, recordingCallback.recordError);

            // Record audio
            recordingMedia.startRecord(); 
        };
        
        if (device.platform === "Android") {
            var callback = {};
        
            callback.requestSuccess = recordVoice;              
            callback.requestError = recordingCallback.recordError;

            requestApplicationDirectory(callback);     
        } else {

            recordVoice();
        }
    }
    
    function stopRecordingSound(recordingCallback) {
        recordingMedia.stopRecord();   
        recordingMedia.release();   
    }                 
    
    function playSound(filePath, playCallback) {
        if (filePath) {                  
            cleanUpResources();
               
            audioMedia = new Media(filePath, playCallback.playSuccess, playCallback.playError);
          
            // Play audio
            audioMedia.play();
        }            
    }
    
    function cleanUpResources() {
        if (audioMedia) {
            audioMedia.stop();
            audioMedia.release();
            audioMedia = null;
        } 
        
        if (recordingMedia) {
      	  recordingMedia.stop();
      	  recordingMedia.release();
      	  recordingMedia = null;
        } 
    }    
    
    function requestApplicationDirectory(callback) {
        var directoryReady = function (dirEntry) { 
      	  callback.requestSuccess(dirEntry.toURL());
        };
  	  
        var fileSystemReady = function(fileSystem) {
            fileSystem.root.getDirectory(BASE_DIRECTORY, {create: true}, directoryReady);                    
        };        	  
  	  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemReady, callback.requestError);
    }  
    
    function initPage() {
        $("#playSound").closest('.ui-btn').hide(); 	
    }
})();