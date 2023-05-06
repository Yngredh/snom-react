import ReactPlayer from "react-player"
import { VideoContainer } from "./styles"


export const VideoClass = () => {


    return(
        <> 
            <VideoContainer>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=IzPc01-54TQ'
                    volume={0.2}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute',top: 0,left: 0}}
                />
            </VideoContainer>
        </>
    )
}