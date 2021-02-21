import styled from 'styled-components'

export const Wrapper = styled.div`
    display: block;
    font-family: monospace;

    h1 {
        margin-bottom: 32px;
        text-align: center;
    }

    div {
        margin: 0 auto;
        width: 800px;
    }

    a {
        color: black;
        display: block;
        font-size: 16px;
        padding: 8px;
        text-align: center;
        text-decoration: none;

        &:hover {
            text-decoration: line-through;
        }
    }
`
