import styled from "styled-components"
import { ReactComponent as Balloon } from "../../static/1524086080.svg";
import { Badge } from "react-bootstrap";

export const StyledBalloon = styled(Balloon) <{ balloonTop: number, left: number }>`
    top: ${(props: { balloonTop: number; }) => props.balloonTop}px;
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
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2em;
    border-radius: 10px;
    z-index: 0;
`

export const Container = styled.div`
    margin: auto;
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