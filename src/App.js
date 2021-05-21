// import logo from './logo.svg';
// import './App.css';

// import {loader} from "@monaco-editor/react";
import * as monaco from "monaco-editor";
// import * as monaco from "monaco-editor-core";
import {useEffect, useRef} from "react";
import {
  MonacoLanguageClient, MessageConnection, CloseAction, ErrorAction,
  MonacoServices, createConnection
} from 'monaco-languageclient';
import normalizeUrl from "normalize-url";
import ReconnectingWebSocket from "reconnecting-websocket";
import {listen} from "@codingame/monaco-jsonrpc";


function createLanguageClient(connection) {
  return new MonacoLanguageClient({
    name: "Sample Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ['json'],
      // disable the default error handler
      errorHandler: {
        error: () => ErrorAction.Continue,
        closed: () => CloseAction.DoNotRestart
      }
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: (errorHandler, closeHandler) => {
        return Promise.resolve(createConnection(connection, errorHandler, closeHandler))
      }
    }
  });
}

function createUrl(path){
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return normalizeUrl(`${protocol}://139.162.55.139:8080/${path}`);
}

function createWebSocket(url){
  const socketOptions = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false
  };
  return new ReconnectingWebSocket(url, [], socketOptions);
}

function App() {
  const mountPoint = useRef(null);
  useEffect(() => {
    // loader.init().then(monaco => {
      monaco.languages.register({
        id: 'python',
        extensions: ['.py'],
        aliases: ['Python'],
        mimetypes: ['application/text'],
      })

      const editor = monaco.editor.create(mountPoint.current,{
        model: monaco.editor.createModel("", 'python', monaco.Uri.parse('inmemory://model.py')),
        glyphMargin: true,
        lightbulb: {
          enabled: true
        }
      })

//       MonacoServices.install(monaco);
//
//       const url = createUrl('/py');
//       const webSocket = createWebSocket(url);
// // listen when the web socket is opened
//       listen({
//         webSocket,
//         onConnection: connection => {
//           // create and start the language client
//           const languageClient = createLanguageClient(connection);
//           const disposable = languageClient.start();
//           connection.onClose(() => disposable.dispose());
//         }
//       });


    // })
  },[mountPoint]);
  return (
    <div className="App" ref={mountPoint} style={{width: "100vw",height: "100vh"}}>

    </div>
  );
}

export default App;
