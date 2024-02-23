import { ReactNode } from "react";
import { SelectComponant } from "./global/SelectComponant";
import { UseCaseWebSite } from "./menu/UseCase";
import { classNames } from "./style/classNames";

interface Navbar {
    options: ReactNode[]
    
}

export default function NavbarComponant(props: Navbar) {
    
    return (
        <div className={classNames.navbar}> 
          <nav data-active={true} className={classNames.heightFullContainer}>
            <div className={classNames.containerFlexHeightFull}>
                <ul className={classNames.navbarElementsContainer}>
                    {
                        props.options.map(option => (<li>{option}</li>))
                    }
                </ul>
            </div>
        </nav>
      </div>
    )
}