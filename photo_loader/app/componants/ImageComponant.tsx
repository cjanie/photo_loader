import Image from "next/image";

interface ImageProps {
    src: string
    alt: string
}

export default function ImageComponant(props: ImageProps) {
    return (
        <Image src={props.src} alt={props.alt} width={600} height={600}/>
    )
}

export function SmallImageComponant(props: ImageProps) {
    return (
        <Image src={props.src} alt={props.alt} width={200} height={200}/>
    )
}