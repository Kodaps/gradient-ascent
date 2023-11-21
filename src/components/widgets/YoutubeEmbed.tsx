import { CSSProperties } from "react";



const styles : {[key:string]: CSSProperties} = {
ytContainer : {
  overflow: "hidden",
  paddingBottom: "56.25%",
  position: "relative",
  height: 0,

},
iframeContainer : {
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  position:"absolute"
}
};
interface EmbedProps {
  embedId: string;
  className?: string;
}

export const YoutubeEmbed:React.FC<EmbedProps> = ({embedId, className}) => {
return <div className={className} style={styles.ytContainer}>
  <iframe style={styles.iframeContainer}
    width="853"
    height="480"
    src={`https://www.youtube.com/embed/${embedId}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />
</div>;
}
