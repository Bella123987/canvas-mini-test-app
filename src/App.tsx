import React, { useCallback, useEffect } from "react";
import useIframeAppender, { AccountSyncLocation } from "./cpns/CrossSync";

function App() {
  const iframeRef = useIframeAppender();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const token = event.data.access_token;
      if (token) {
        console.log("Token-sent-by-Account:", token);
        localStorage.setItem("access_token", token);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("message", handleMessage, false);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const postMessage2AccountHandler = useCallback(() => {
    console.log("log: postMessage2AccountHandler clicked");

    // Access the iframe element using the ref
    const iframe = iframeRef.current;

    // Check if the iframe exists and post a message
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        "Hello from canvas test window!",
        AccountSyncLocation
      );
      console.log("msg: Hello from canvas test window!");
    } else {
      console.error("ERROR: frame is not exitst");
    }
  }, [iframeRef]);

  return (
    <div className="App">
      <h1>Canvas Test App</h1>
      <button onClick={postMessage2AccountHandler}>
        Click To Post Message To Account
      </button>
    </div>
  );
}

export default App;
