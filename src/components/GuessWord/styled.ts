import styled from "styled-components";

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
    background-color:#ffc107;
    border-radius: 5px;
    font-size: 24px;
    font-weight: 500;
    padding: 5px;
    padding-bottom: 5px;

    @media screen and (max-width: 800px) {
        font-size: 2.5vw;
        min-height:36px;
    }
`