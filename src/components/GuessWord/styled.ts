import styled from "styled-components";
import Button from "react-bootstrap/Button";

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    
`
export const WordContainer = styled.div`
    display:flex;
    justify-content: space-evenly;
`

export const DuplicateContainer = styled.div`
    display:flex;
    justify-content: center;
`

export const WordBadge = styled.span`
    display: flex; 
    flex-wrap: wrap;  
    justify-content: center; 

    height: 100%;

    padding: 5px;
    padding-bottom: 5px;

    border-radius: 5px;

    font-size: 24px;
    font-weight: 500;
    word-break: break-all;

    background-color:#ffc107;
    
    @media screen and (max-width: 800px) {
        font-size: 1rem;
        min-height:36px;
    }
`

export const StyledButton = styled(Button)`
    margin-left: 10px;
`