import fetch from "node-fetch"

const api = "https://pomber.github.io/covid19/"
const DATA = api + "timeseries.json"

export async function getStaticPaths() {
    const res = await fetch(DATA)
    const data = await res.json()
    const countries = Object.keys(data)

    return {
        fallback: false,
        paths: countries.map(name => ({
            params: { name },
        })),
    }
}

export async function getStaticProps(context) {
    const { name } = context.params
    const res = await fetch(DATA)
    const data = await res.json()
    const rows = data[name]

    return { props: { name, rows } }
}

import Link from 'next/link'
import { Stream } from '@nivo/stream'
import { Wrapper } from './[name].styles'

const Country = ({ name, rows }) => {
    return (
        <Wrapper>
            <h1 style={{ textAlign: 'center' }}>
                {name}
            </h1>
            <Stream
                axisBottomobjectoptional={{ enable: true }}
                colors={{ scheme: "pastel1" }}
                data={rows}
                enableDots={true}
                enableGridX={true}
                enableGridY={true}
                height={400}
                keys={['deaths', 'confirmed']}
                offsetType='diverging'
                width={800}
            />
            <Link href='/'>
                <a>Go back</a>
            </Link>
        </Wrapper>
    )
}

export default Country
