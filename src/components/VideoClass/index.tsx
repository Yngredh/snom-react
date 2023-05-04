import ReactPlayer from "react-player"
import { DescriptionContainer, VideoContainer } from "./styles"


export const VideoClass = () => {


    return(
        <> 
            <VideoContainer>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=bBHPq3UQFsw&ab_channel=GilsonsOficial'
                    volume={0.2}
                    width='100%'
                    height='100%'
                    style={{ position: 'absolute',top: 0,left: 0}}
                />
            </VideoContainer>
            <DescriptionContainer>
                    
            </DescriptionContainer>
        </>
    )
}