import styled from "styled-components";



export const Container = styled.div`
    display: flex;
    position: relative;
    width: 90%;
    height: 10vh;
    flex-direction: column;
    align-items: center;
    background-color: #A9A9A9;
    border-radius: 1.5rem;
    padding: 0.4rem;
    margin-bottom: 0.5rem;

    #closebutton {
        position: absolute;
        right: 1px;
        top: 1px;
    }
`

export const Row = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: initial;
    overflow: auto;
    margin-right: 1rem;

    p {
        font-size: 1rem;
        margin: 0 0.5rem;
        padding: 0;
    }
`