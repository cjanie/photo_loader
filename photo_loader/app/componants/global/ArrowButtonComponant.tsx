import Image from "next/image"
import { ReactNode } from "react"

export interface IconButton {
    onClick: () => void
}

const arrowIcon = (): ReactNode => {
    return (<Image src="/icons/right-arrow-backup-2-svgrepo-com.svg" alt="arrow" height={50} width={50}/>)
} 

export function NextButtonComponant(props: IconButton) {
    return (
        <button onClick={props.onClick}>{arrowIcon()}</button>
    )
}

export function BackButtonComponant(props: IconButton) {
    return (
        <button onClick={props.onClick} style={backArrowStyle}>{arrowIcon()}</button>
    )
}

const backArrowStyle = {
    transform: 'rotate(180deg)'
}

