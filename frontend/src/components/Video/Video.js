import React from "react";
import WebRTCClient from "iotcomms-react-webrtc";
import ReactQueryParams from "react-query-params";

class Video extends ReactQueryParams{
    constructor(props,context) {
        super(props,context);
      }
      //Note these video elements must be present with the remoteVideo and localVideo id's to
      //have place to render video for the WebRTCClient component
      render() {
        return (
          <div className="App">
            <video width="25%"  id="localVideo" autoPlay playsInline  muted="muted"></video>
            <video width="50%" id="remoteVideo" autoPlay playsInline ></video>
            <WebRTCClient
              video={true}
              autoRegister = {true}
              sipDomain={decodeURIComponent(this.queryParams.domain)}
              sipServer={decodeURIComponent(this.queryParams.sipserver)}
              sipUser={decodeURIComponent(this.queryParams.userid)}
              sipPassword={decodeURIComponent(this.queryParams.password)}
              destination={decodeURIComponent(this.queryParams.destination)}
              metaData={{param1:"value1",obj1:{objparam1:"objvalue1"}}}
              //alertVideoUrl="alertVideoUrl"
              //ringbackVideoUrl="ringbackVideoUrl"
            />
          </div>
        );
      }
}


export default Video