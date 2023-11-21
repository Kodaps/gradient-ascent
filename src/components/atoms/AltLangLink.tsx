
import React from 'react';

interface AltLinkProps {
  altLink: string;
  children?: React.ReactNode;
  hidden?: boolean;
}


export const AltLink:React.FC<AltLinkProps> = ({altLink, children, hidden}) => {

return <> { altLink && <><a id="languageSwitch" 
        href={altLink} 
        className={hidden ? 'hidden': ''}>
  {children}
  </a>
  </>
}</>

}