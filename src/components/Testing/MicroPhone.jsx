import { useAVToggle } from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import {Mic,  MicOff } from 'react-feather'

function MicroPhone() {

  const [checkFirstTimeAudioEnable, setCheckFirstTimeAudioEnable] = useState(false)
  const {
    isLocalAudioEnabled,
    toggleAudio
  } = useAVToggle();

  useEffect(() => {
    if (isLocalAudioEnabled && !checkFirstTimeAudioEnable) {
      toggleAudio()
      setCheckFirstTimeAudioEnable(true)
    }
  }, [isLocalAudioEnabled])


  return (
    <div className="control-bar  container mx-auto absolute bottom-[2%] sm:bottom-[7%]  sm:right-1 w-[60%] sm:w-[6.8%] right-0  text-sm"
    // width: 70px;
    // position: absolute;
    // bottom: 10%;
    // right: 0;"
    >
      <button className="btn-control" onClick={toggleAudio}>
        {/* {isLocalAudioEnabled ? "Mute" : "Unmute"} */}
        {isLocalAudioEnabled ?
          <Mic size={25} />
          :
          <MicOff size={25} />
        }
      </button>
    </div>
  );
}

export default MicroPhone;
