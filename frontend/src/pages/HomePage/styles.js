import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    width: 100vw;
    height: 100vh;
`

export const ContainerHome = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 80vh;
    background-color: whitesmoke;
    border-radius: 2rem;
    padding: 1.5rem;
    text-align: center;

    > button {
        align-self: center;
        width: 200px;
        background-color: #000;
    }

    > button:hover {
        background-color: whitesmoke;
        color: black
    }

    > hr {
        width: 100%;
        
    }
`