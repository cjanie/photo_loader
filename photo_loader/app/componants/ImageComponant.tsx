import Image from "next/image";

interface ImageProps {
    src: string
    alt: string
    size: number
}

export default function ImageComponant(props: ImageProps) {
    return (
        <Image src={props.src} alt={props.alt} width={props.size} height={props.size} objectFit="contain"/>
    )
}
