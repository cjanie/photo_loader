import Image from "next/image";

interface ImageProps {
    src: string
    alt: string
}
export default function ImageComponant(props: ImageProps) {
    return (
        <Image src={props.src} alt={props.alt} width={100} height={100}/>
    )
}