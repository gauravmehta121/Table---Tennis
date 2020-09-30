var hallAvail = [0,0,0,0,0,0,0,0,0,0];
Webcam.attach('#my_camera');
function imageArray(index) 
{		
		var dataUri,bb,blob;
		var byteCharacters;
    	var params = 
    	{
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };
   		Webcam.snap(function(data_uri) 
   		{
        	dataUri = data_uri.split(",")[1];
        	byteCharacters = atob(dataUri);
    		var len = byteCharacters.length;
    		var bytes = new Uint8Array( len );
    		for (var i = 0; i < len; i++)        
    		{
        		bytes[i] = byteCharacters.charCodeAt(i);
    		}
    		blob = new Blob([bytes], {type: "application/octet-stream"});
        });
        var xhr = new XMLHttpRequest();
		xhr.onload = function(data)
		{
			console.log(xhr.response);
			alert(xhr.response["description"]["tags"]);
			var counter = 0;
           // console.log(data["description"]["tags"]);
        	for(var i = 0; i < xhr.response["description"]["tags"].length ; i++)
        	{
        		if(xhr.response["description"]["tags"][i]==="people" || xhr.response["description"]["tags"][i]==="racket" || xhr.response["description"]["tags"][i]==="ball" || xhr.response["description"]["tags"][i]==="playing" || xhr.response["description"]["tags"][i]==="person")
        			{
        			console.log("Tag no:"+i);
        			counter = counter+1;
        			}
        	}
        	if(counter>=3)
        	{
        		hallAvail[index]=1;
        		document.getElementById(index).href = './' + index + '.html';
        	}
        	else
        	{
				hallAvail[index]=0;
				document.getElementById(index).href = './' + index + 'n' + '.html';
        	}
        };
        	xhr.responseType = 'json';
			xhr.open('POST', 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?'+$.param(params));
			xhr.setRequestHeader("Content-Type", "application/octet-stream");
			xhr.setRequestHeader("Ocp-Apim-Subscription-Key", '36918d1d47d94191bd4e51bee91622b7');
			xhr.send(blob);
			
			
}
