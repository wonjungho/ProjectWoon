import React,{Component} from 'react'
import "webrtc-adapter";
class Video extends Component{
    state = {
        startDisabled: false,
        callDisabled: true,
        hangUpDisabled: true,
        servers: null,
        pc1: null,
        pc2: null,
        localStream: null
    };
 
    localVideoRef = React.createRef();
    remoteVideoRef = React.createRef();
 
    start = () => {
        this.setState({
            startDisabled:true
        })
        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })
        .then(this.gotStream).catch(e=>alert("getUsrMedia() error:"+ e.name))
    };
    gotStream = stream =>{
        this.localVideoRef.current.srcObject =stream;
        this.setState({
            callDisabled:false,
            localStream:stream
        })
    }
    gotRemoteStream = event => {
        let remoteVideo = this.remoteVideoRef.current;

        if (remoteVideo.srcObject !== event.streams[0]) {
            remoteVideo.srcObject = event.streams[0];
        }
    };
    call = () => {
        this.setState({
            callDisabled:true,
            hangUpDisabled:false
        })
        let {localStream} =this.state;
        let servers =null,
            pc1 =new RTCPeerConnection(servers),
            pc2 = new RTCPeerConnection(servers)
        pc1.onicecandidate = e => this.onIceCandidate(pc1,e)
        pc1.onicegatheringstatechange = e =>this.onIceStateChange(pc1,e)

        pc1.onicecandidate = e => this.onIceCandidate(pc2,e)
        pc2.onicegatheringstatechange = e=>this.onIceStateChange(pc2,e)
        pc2.ontrack = this.gotRemoteStream;

        localStream.getTracks().forEach(track => pc1.addTrack(track, localStream))
        pc1.createOffer({
            offerToReceiveAudio:1,
            offerToReceiveAudio:1
        }).then(this.onCreateOfferSuccess,error =>
            console.error(
                error.toString()
            )
        )
    this.setState({
        servers,
        pc1,
        pc2,
        localStream
    })
    };

    onCreateOfferSuccess = desc =>{
        let {pc1,pc2} = this.state;

        pc1.setLocalDescription(desc)
        .then(
            ()=>
                console.log("pc1 setLocalDescription complete createOffer"),
            error =>
                console.error(
                    error.toString()
                )
        )

        pc2.setRemoteDescription(desc).then(
            () => {
                console.log("pc2 setRemoteDescription complete createOffer");
                pc2
                    .createAnswer()
                    .then(this.onCreateAnswerSuccess, error =>
                        console.error(
                            "pc2 Failed to set session description in createAnswer",
                            error.toString()
                        )
                    );
            },
            error =>
                console.error(
                    "pc2 Failed to set session description in createOffer",
                    error.toString()
                )
        )
    }

    onCreateAnswerSuccess = desc =>{
        let{pc1,pc2} = this.state
        pc1
            .setRemoteDescription(desc)
            .then(
                () =>
                    console.log(
                        "pc1 setRemoteDescription complete createAnswer"
                    ),
                error =>
                    console.error(
                        "pc1 Failed to set session description in onCreateAnswer",
                        error.toString()
                    )
            )
        pc2
            .setLocalDescription(desc)
            .then(
                () =>
                    console.log(
                        "pc2 setLocalDescription complete createAnswer"
                    ),
                error =>
                    console.error(
                        "pc2 Failed to set session description in onCreateAnswer",
                        error.toString()
                    )
            )
    }
    onIceCandidate =(pc,event) =>{
        let {pc1,pc2} = this.state;
        let otherPc = pc ===pc1 ? pc2 : pc1;

        otherPc
            .window.addIceCandidate(event.candidate)
            .then(
                () => console.log("addIceCandidate success"),
                error =>
                    console.error(
                        "failed to add ICE Candidate",
                        error.toString()
                )
            )
    }
    
    onIceStateChange =(pc,event) =>{
        console.log("ICE State:"+pc.iceConnectState);
    }
 
    hangUp = () => {
        let {pc1,pc2} =this.state;
        pc1.close();
        pc2.close();

        this.setState({
            pc1:null,
            pc2:null,
            hangUpDisabled:true,
            callDisabled:false
        })
    };
 
    render() {
        const { startDisabled, callDisabled, hangUpDisabled } = this.state;
 
        return (
            <div>
                <video
                    ref={this.localVideoRef}
                    autoPlay
                    muted
                    style={{ width: "240px", height: "180px" }}
                />
                <video
                    ref={this.remoteVideoRef}
                    autoPlay
                    style={{ width: "240px", height: "180px" }}
                />
 
                <div>
                    <button onClick={this.start} disabled={startDisabled}>
                        Start
                    </button>
                    <button onClick={this.call} disabled={callDisabled}>
                        Call
                    </button>
                    <button onClick={this.hangUp} disabled={hangUpDisabled}>
                        Hang Up
                    </button>
                </div>
            </div>
        );
    }
}

export default Video