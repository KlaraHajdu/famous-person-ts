import styled from 'styled-components'

export const MainTile = styled.div`
    z-index: 0;

    width: 40%;
    @media screen and (max-width: 1000px) {
        width:60%;
    }
    @media screen and (max-width: 400px) {
        width:90%;
    }

    margin: 3rem auto;    

    padding: 2em;

    border-radius: 10px;

    background-color: rgba(255, 255, 255, 0.9);
`

export const gameTheme = {
    whiteBackgroundColor: "rgba(255, 255, 255, 0.9)",
    greenBackgroundColor: "rgba(147, 179, 84, 0.8)",
    blueBackgroundColor: "rgba(101, 168, 247, 0.6)",
}

