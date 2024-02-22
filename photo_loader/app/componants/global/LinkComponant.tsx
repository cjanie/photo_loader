interface Link {
    url: string
}

export default function LinkComponant(props: Link) {
    return (
        <a href={props.url}>
            <p>{props.url}</p>
        </a>  
    )
}