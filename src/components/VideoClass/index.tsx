import ReactPlayer from "react-player"
import { VideoContainer } from "./styles"


export const VideoClass = (props : {url: string}) => {

    return(
        <> 
            <VideoContainer>
                <ReactPlayer 
                    url= {props.url}
                    volume={0.2}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute',top: 0,left: 0}}
                />
            </VideoContainer>
        </>
    )
}