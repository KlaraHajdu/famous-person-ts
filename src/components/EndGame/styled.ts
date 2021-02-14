import styled from "styled-components"
import { Badge } from "react-bootstrap";
import { ReactComponent as Balloon } from "../../static/1524086080.svg";
import { gameTheme } from "../../Theme/theme"

export const StyledBalloon = styled(Balloon) <{ balloontop: number, left: number }>`
    top: ${(props: { balloontop: number; }) => props.balloontop}px;
    height: 300px;
    position: absolute;
    z-index: 1;
    left: ${(props: { left: number; }) => props.left}%;
    width: 120px;
`
export const StyledBadge = styled(Badge)<{ variant: string }>`
    variant: ${(props: { variant: string; }) => props.variant};
    margin-right: 5px;
    margin-left: 5px;
`

export const MainTile = styled.div`
    display: flex; 
    flex-flow: column wrap;
    justify-content: center;
    margin: 3em auto;
    width: 40%;
    background-color: ${gameTheme.whiteBackgroundColor};
    padding: 2em;
    border-radius: 10px;
    z-index: 0;
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    line-height: 18px;
    margin: 1rem;
    font-weight: 500;
    font-size: 1.5rem;
`

export const ResultsContainer = styled.div`
    display: flex;
    justify-content: center;
    line-height: 18px;
`