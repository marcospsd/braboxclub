import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;

    > img {
        width: 50px;
        background-color: black;
        padding: 0.6rem;
        border-radius: 1.5rem;
    }
`

export const Bloco = styled.div`
    display: flex;
    flex-direction: column;
    width: 10vw;
    height: 100%;
    margin-left: 1.5rem;
    padding: 0;
    background-color: black;
    border-radius: 1.5rem;
    align-items: center;
    justify-content: center;

    > p {
        color: white;
        margin: 0;
    }
`

export const FunctionsPage = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-left: 0.5rem;
    background-color: black;
    border-radius: 1.5rem;
    align-items: center;
    justify-content: space-between;
    overflow: auto;

    @media (min-width: 700px) {
     justify-content: center;
    }

    :-webkit-scrollbar {
    width: 0px;
    }

    > button {
        margin: 0rem;
        flex-direction: column;
        p {
            margin: 0;
            font-size: 15px;
            color: white;
        }
    }

`