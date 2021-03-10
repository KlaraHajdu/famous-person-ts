import styled from "styled-components"
import { Badge } from "react-bootstrap";
import { ReactComponent as Balloon } from "../../static/1524086080.svg";
import { gameTheme } from "../../Theme/theme"

export const StyledBalloon = styled(Balloon) <{ balloontop: number, left: number }>`
    position: absolute;
    top: ${(props: { balloontop: number; }) => props.balloontop}px;
    left: ${(props: { left: number; }) => props.left}%;
    @media screen and (max-width: 600px) {
        left: ${(props: { left: number; }) => props.left == 73? 5 : props.left}%;
    }
    z-index: 1;
    
    height: 300px;
    width: 120px;
`
export const StyledBadge = styled(Badge)<{ variant: string }>`
    margin-right: 5px;
    margin-left: 5px;

    variant: ${(props: { variant: string; }) => props.variant};
`

export const MainTile = styled.div`
    display: flex; 
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    
    z-index: 0;

    width: 40%;
    @media screen and (max-width: 600px) {
        width: 90%;
        
    }

    margin: 3em auto;
    padding: 2em;

    border-radius: 10px;

    background-color: ${gameTheme.whiteBackgroundColor};
`

export const TitleContainer = styled.div`
    margin: 1rem;

    line-height: 25px;
    font-size: 1.5rem;
    font-weight: 500;
`

export const ResultsContainer = styled.div`
    display: flex;
    justify-content: center;
    
    line-height: 18px;
`