const api = 'https://pomber.github.io/covid19/'
const DATA = api + 'timeseries.json'
const FLAGS = api + 'countries.json'

import fetch from 'node-fetch'

export const getStaticProps = async () => {
    const [data, flags] = await Promise.all([
        fetch(DATA).then(r => r.json()),
        fetch(FLAGS).then(r => r.json())
    ])

    const countries = Object.keys(data)
    const aCountry = data[countries[0]]
    const { date } = aCountry[aCountry.length - 1]

    const rows = countries.map(country => {
        const { deaths } = data[country]
            .find(r => r.date === date)
        const flag = flags[country]?.flag || '?'

        return { country, deaths, flag }
    })
        .filter(r => r.deaths > 8)

    return {
        props: { date, rows }
    }
}


import { TreeMap } from "@nivo/treemap"
import { Wrapper } from './index.styles'
import Node from './components/Node'

const HomePage = ({ date, rows, flag }) => <Wrapper>
        <h2>Coronavirus {date}</h2>
        <TreeMap
            colorBy="flag"
            colors={{ scheme: "blues" }}
            height={400}
            identity='country'
            innerPadding={1}
            label={({ value, flag }) => (
                <tspan
                    childer={ flag }
                    dominantBaseline='central'
                    style={{ fontSize: 10 + value / 200 }}
                />
            )}
            labelSkipSize={9}
            nodeComponent={ Node }
            nodeOpacity={0.65}
            root={{ children: rows }}
            tile='binary'
            tooltip={r => `${r.value} deaths in ${r.id}`}
            width={800}
            value='deaths'
        />
    </Wrapper>

export default HomePage
