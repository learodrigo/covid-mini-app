import { TreeMapDefaultProps as TreeMapDefault } from "@nivo/treemap"
import Link from "next/link"

const Node = (props) => {
    const { country } = props.node.data

    return (
        <Link href="/country/[name]" as={`/country/${country}`}>
            <a>
                <TreeMapDefault.nodeComponent {...props} />
            </a>
        </Link>
    )
}

export default Node
