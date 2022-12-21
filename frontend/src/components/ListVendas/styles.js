import styled from "styled-components";

export const BigContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 80%;  


    @media (max-width: 800px) {
        flex-direction: column;
        overflow: overlay;

        :-webkit-scrollbar {
        width: 0px;
        }
    }

    > div {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;

    @media (max-width: 800px) {
        width: 100%;
    }

    hr {
        width: 100%;
    }
`

export const Painel = styled.div`
    display: flex;

`

export const Bloco = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 90%;
    height: 100px;
    border-radius: 1rem;
    background-color: black;
    color: white;
    margin: 1rem;

    > p {
        margin: 0;
        padding: 0;
    }

`