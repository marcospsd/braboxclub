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
    width: 90vw;
    height: 90vh;
    background-color: whitesmoke;
    border-radius: 2rem;
    padding: 0.5rem;
    text-align: center;


    @media (min-width:800px) {
     width : 80vw;
     height: 80vh;
    }

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