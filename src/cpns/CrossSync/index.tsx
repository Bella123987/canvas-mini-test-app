import { useEffect, useRef } from "react";

export const AccountSyncLocation =
  "https://account-test-app.vercel.app";

const useIframeAppender = () => {
  // Create a ref to hold the iframe element
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = AccountSyncLocation;

    // Append the iframe to the body element
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    return () => {
      // Remove the iframe when the component unmounts
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  // Return the iframe ref for external use
  return iframeRef;
};

export default useIframeAppender;