Prepare Authentication (Signature)
  //Sign up Wiro dashboard and create project
export YOUR_API_KEY="n32r4bx1xmxxm2vjrah3lnczhmt7i7yg";
export YOUR_API_SECRET="0d245f7034e999f613f9547972b93d661e65839aa06663c97633c360ae987904";

//unix time or any random integer value
export NONCE=$(date +%s);

//hmac-SHA256 (YOUR_API_SECRET+Nonce) with YOUR_API_KEY
export SIGNATURE="$(echo -n "${YOUR_API_SECRET}${NONCE}" | openssl dgst -sha256 -hmac "${YOUR_API_KEY}")";
    
Run Command - Make HTTP Post Request (Multipart)

# ⚠️ IMPORTANT: Remove all commented lines (starting with #) before running
# Bash doesn't support comments in command continuation (lines ending with \)

curl -X POST "https://api.wiro.ai/v1/Run/tencent/hunyuan-flux-srpo"  \
-H "x-api-key: ${YOUR_API_KEY}" \
-H "x-nonce: ${NONCE}" \
-H "x-signature: ${SIGNATURE}" \
  // ⚠️ IMPORTANT:
  // - inputImage: up to 1 entry (files, URLs, or mixed)

  // Option 1: Send 1 inputImage as FILE
  -F "inputImage=@path/to/image1.jpg" \

  // Option 2: Send 1 inputImage as URL
  // -F "inputImage=https://example.com/image1.jpg" \

  -F "prompt=A close up portrait of a Chinese princess wearing colorful clothing with a highly detailed face and eyes." \
  -F "steps=20" \
  -F "scale=3.5" \
  -F "strength=0.88" \
  -F "samples=1" \
  -F "seed=7350148318" \
  -F "width=1024" \
  -F "height=1024" \
  -F "callbackUrl=Optional: Webhook URL for task completion notifications";

    
Run Command - Response

//response body
{
    "errors": [],
    "taskid": "2221",
    "socketaccesstoken": "eDcCm5yyUfIvMFspTwww49OUfgXkQt",
    "result": true
}
    
Get Task Detail - Make HTTP Post Request with Task Token

curl -X POST "https://api.wiro.ai/v1/Task/Detail"  \
-H "Content-Type: application/json" \
-H "x-api-key: ${YOUR_API_KEY}" \
-H "x-nonce: ${NONCE}" \
-H "x-signature: ${SIGNATURE}" \
-d '{
  "tasktoken": "eDcCm5yyUfIvMFspTwww49OUfgXkQt"
}';

    
Get Task Detail - Response

//response body
{
  "total": "1",
  "errors": [],
  "tasklist": [
      {
          "id": "534574",
          "uuid": "15bce51f-442f-4f44-a71d-13c6374a62bd",
          "name": "",
          "socketaccesstoken": "eDcCm5yyUfIvMFspTwww49OUfgXkQt",
          "parameters": {
              "inputImage": "https://api.wiro.ai/v1/File/mCmUXgZLG1FNjjjwmbtPFr2LVJA112/inputImage-6060136.png"
          },
          "debugoutput": "",
          "debugerror": "",
          "starttime": "1734513809",
          "endtime": "1734513813",
          "elapsedseconds": "6.0000",
          "status": "task_postprocess_end",
          "cps": "0.000585000000",
          "totalcost": "0.003510000000",
          "guestid": null,
          "projectid": "699",
          "modelid": "598",
          "description": "",
          "basemodelid": "0",
          "runtype": "model",
          "modelfolderid": "",
          "modelfileid": "",
          "callbackurl": "",
          "marketplaceid": null,
          "createtime": "1734513807",
          "canceltime": "0",
          "assigntime": "1734513807",
          "accepttime": "1734513807",
          "preprocessstarttime": "1734513807",
          "preprocessendtime": "1734513807",
          "postprocessstarttime": "1734513813",
          "postprocessendtime": "1734513814",
          "pexit": "0",
          "categories": "["tool","image-to-image","quick-showcase","compare-landscape"]",
          "outputs": [
              {
                  "id": "6bc392c93856dfce3a7d1b4261e15af3",
                  "name": "0.png",
                  "contenttype": "image/png",
                  "parentid": "6c1833f39da71e6175bf292b18779baf",
                  "uuid": "15bce51f-442f-4f44-a71d-13c6374a62bd",
                  "size": "202472",
                  "addedtime": "1734513812",
                  "modifiedtime": "1734513812",
                  "accesskey": "dFKlMApaSgMeHKsJyaDeKrefcHahUK",
                  "foldercount": "0",
                  "filecount": "0",
                  "ispublic": 0,
                  "expiretime": null,
                  "url": "https://cdn1.wiro.ai/6a6af820-c5050aee-40bd7b83-a2e186c6-7f61f7da-3894e49c-fc0eeb66-9b500fe2/0.png"
              }
          ],
          "size": "202472"
      }
  ],
  "result": true
}
    
Kill Task - Make HTTP Post Request with Task ID

curl -X POST "https://api.wiro.ai/v1/Task/Kill"  \
-H "Content-Type: application/json" \
-H "x-api-key: ${YOUR_API_KEY}" \
-H "x-nonce: ${NONCE}" \
-H "x-signature: ${SIGNATURE}" \
-d '{
  "taskid": "534574"
}';

    
Kill Task - Response

//response body
{
  "errors": [],
  "tasklist": [
      {
          "id": "534574",
          "uuid": "15bce51f-442f-4f44-a71d-13c6374a62bd",
          "name": "",
          "socketaccesstoken": "ZpYote30on42O4jjHXNiKmrWAZqbRE",
          "parameters": {
              "inputImage": "https://api.wiro.ai/v1/File/mCmUXgZLG1FNjjjwmbtPFr2LVJA112/inputImage-6060136.png"
          },
          "debugoutput": "",
          "debugerror": "",
          "starttime": "1734513809",
          "endtime": "1734513813",
          "elapsedseconds": "6.0000",
          "status": "task_cancel",
          "cps": "0.000585000000",
          "totalcost": "0.003510000000",
          "guestid": null,
          "projectid": "699",
          "modelid": "598",
          "description": "",
          "basemodelid": "0",
          "runtype": "model",
          "modelfolderid": "",
          "modelfileid": "",
          "callbackurl": "",
          "marketplaceid": null,
          "createtime": "1734513807",
          "canceltime": "0",
          "assigntime": "1734513807",
          "accepttime": "1734513807",
          "preprocessstarttime": "1734513807",
          "preprocessendtime": "1734513807",
          "postprocessstarttime": "1734513813",
          "postprocessendtime": "1734513814",
          "pexit": "0",
          "categories": "["tool","image-to-image","quick-showcase","compare-landscape"]",
          "outputs": [
              {
                  "id": "6bc392c93856dfce3a7d1b4261e15af3",
                  "name": "0.png",
                  "contenttype": "image/png",
                  "parentid": "6c1833f39da71e6175bf292b18779baf",
                  "uuid": "15bce51f-442f-4f44-a71d-13c6374a62bd",
                  "size": "202472",
                  "addedtime": "1734513812",
                  "modifiedtime": "1734513812",
                  "accesskey": "dFKlMApaSgMeHKsJyaDeKrefcHahUK",
                  "foldercount": "0",
                  "filecount": "0",
                  "ispublic": 0,
                  "expiretime": null,
                  "url": "https://cdn1.wiro.ai/6a6af820-c5050aee-40bd7b83-a2e186c6-7f61f7da-3894e49c-fc0eeb66-9b500fe2/0.png"
              }
          ],
          "size": "202472"
      }
  ],
  "result": true
}
    
Cancel Task - Make HTTP Post Request (For tasks on queue)

curl -X POST "https://api.wiro.ai/v1/Task/Cancel"  \
-H "Content-Type: application/json" \
-H "x-api-key: ${YOUR_API_KEY}" \
-H "x-nonce: ${NONCE}" \
-H "x-signature: ${SIGNATURE}" \
-d '{
  "taskid": "634574"
}';

    
Cancel Task - Response

//response body
{
  "errors": [],
  "tasklist": [
      {
          "id": "634574",
          "uuid": "15bce51f-442f-4f44-a71d-13c6374a62bd",
          "name": "",
          "socketaccesstoken": "ZpYote30on42O4jjHXNiKmrWAZqbRE",
          "parameters": {
              "inputImage": "https://api.wiro.ai/v1/File/mCmUXgZLG1FNjjjwmbtPFr2LVJA112/inputImage-6060136.png"
          },
          "debugoutput": "",
          "debugerror": "",
          "starttime": "1734513809",
          "endtime": "1734513813",
          "elapsedseconds": "6.0000",
          "status": "task_cancel",
          "cps": "0.000585000000",
          "totalcost": "0.003510000000",
          "guestid": null,
          "projectid": "699",
          "modelid": "598",
          "description": "",
          "basemodelid": "0",
          "runtype": "model",
          "modelfolderid": "",
          "modelfileid": "",
          "callbackurl": "",
          "marketplaceid": null,
          "createtime": "1734513807",
          "canceltime": "0",
          "assigntime": "1734513807",
          "accepttime": "1734513807",
          "preprocessstarttime": "1734513807",
          "preprocessendtime": "1734513807",
          "postprocessstarttime": "1734513813",
          "postprocessendtime": "1734513814",
          "pexit": "0",
          "categories": "["tool","image-to-image","quick-showcase","compare-landscape"]",
          "outputs": [
              {
                  "id": "6bc392c93856dfce3a7d1b4261e15af3",
                  "name": "0.png",
                  "contenttype": "image/png",
                  "parentid": "6c1833f39da71e6175bf292b18779baf",
                  "uuid": "15bce51f-442f-4f44-a71d-13c6374a62bd",
                  "size": "202472",
                  "addedtime": "1734513812",
                  "modifiedtime": "1734513812",
                  "accesskey": "dFKlMApaSgMeHKsJyaDeKrefcHahUK",
                  "foldercount": "0",
                  "filecount": "0",
                  "ispublic": 0,
                  "expiretime": null,
                  "url": "https://cdn1.wiro.ai/6a6af820-c5050aee-40bd7b83-a2e186c6-7f61f7da-3894e49c-fc0eeb66-9b500fe2/0.png"
              }
          ],
          "size": "202472"
      }
  ],
  "result": true
}
    
Get Task Process Information and Results with Socket Connection

<script type="text/javascript">
  window.addEventListener('load',function() {
    //Get socketAccessToken from task run response
    var SocketAccessToken = 'eDcCm5yyUfIvMFspTwww49OUfgXkQt';
    WebSocketConnect(SocketAccessToken);
  });

  //Connect socket with connection id and register task socket token
  async function WebSocketConnect(accessTokenFromAPI) {
    if ("WebSocket" in window) {
        var ws = new WebSocket("wss://socket.wiro.ai/v1");
        ws.onopen = function() {
          //Register task socket token which has been obtained from task run API response
          ws.send('{"type": "task_info", "tasktoken": "' + accessTokenFromAPI + '"}');
        };

        ws.onmessage = function (evt) {
          var msg = evt.data;

          try {
              var debugHtml = document.getElementById('debug');
              debugHtml.innerHTML = debugHtml.innerHTML + "\n" + msg;

              var msgJSON = JSON.parse(msg);
              console.log('msgJSON: ', msgJSON);

              if(msgJSON.type != undefined)
              {
                console.log('msgJSON.target: ',msgJSON.target);
                switch(msgJSON.type) {
                    case 'task_queue':
                      console.log('Your task has been waiting in the queue.');
                    break;
                    case 'task_accept':
                      console.log('Your task has been accepted by the worker.');
                    break;
                    case 'task_preprocess_start':
                      console.log('Your task preprocess has been started.');
                    break;
                    case 'task_preprocess_end':
                      console.log('Your task preprocess has been ended.');
                    break;
                    case 'task_assign':
                      console.log('Your task has been assigned GPU and waiting in the queue.');
                    break;
                    case 'task_start':
                      console.log('Your task has been started.');
                    break;
                    case 'task_output':
                      console.log('Your task has been started and printing output log.');
                      console.log('Log: ', msgJSON.message);
                    break;
                    case 'task_error':
                      console.log('Your task has been started and printing error log.');
                      console.log('Log: ', msgJSON.message);
                    break;
                   case 'task_output_full':
                      console.log('Your task has been completed and printing full output log.');
                    break;
                    case 'task_error_full':
                      console.log('Your task has been completed and printing full error log.');
                    break;
                    case 'task_end':
                      console.log('Your task has been completed.');
                    break;
                    case 'task_postprocess_start':
                      console.log('Your task postprocess has been started.');
                    break;
                    case 'task_postprocess_end':
                      console.log('Your task postprocess has been completed.');
                      console.log('Outputs: ', msgJSON.message);
                      //output files will add ui
                      msgJSON.message.forEach(function(currentValue, index, arr){
                          console.log(currentValue);
                          var filesHtml = document.getElementById('files');
                          filesHtml.innerHTML = filesHtml.innerHTML + '<img src="' + currentValue.url + '" style="height:300px;">'
                      });
                    break;
                }
              }
          } catch (e) {
            console.log('e: ', e);
            console.log('msg: ', msg);
          }
        };

        ws.onclose = function() {
          alert("Connection is closed...");
        };
    } else {
        alert("WebSocket NOT supported by your Browser!");
    }
  }
</script>
    
Prepare UI Elements Inside Body Tag

  <div id="files"></div>
  <pre id="debug"></pre>