import styled from "styled-components";

export const BigConteiner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;


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
    align-items: center;
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
    border: 0.1rem solid;
    border-radius: 1.5rem;

    @media (max-width: 800px) {
        width: 95%;

    }

    h1 {
        font-size: 25px;
    }

    .MuiTextField-root, .MuiFormControl-root {
        margin: 0.5rem 0.5rem;
        width: 90%;
    }

    hr {
        width: 90%;

    }

`

export const Container2 = styled.div`

    @media (max-width: 800px) {
        width: 95%;

    }

    h1 {
        font-size: 25px;
    }

    .MuiTextField-root, .MuiFormControl-root {
        margin: 0.5rem 0.5rem 0 0;
        width: 100%;
    }

    hr {
        width: 90%;

    }

`


export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 1rem;
    width: 90%;

`

export const Helper = styled.span`
    background-color: red;
    color: black;
    width: 100%;
    margin: 0.5rem 0rem;
    border-radius: 1rem;
    text-align: center;
    color: white;
`

export const Bloco = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100px;
    height: 100px;
    border-radius: 1rem;
    background-color: black;
    color: white;
    margin-left: 1rem;
    margin-right: 1rem;

    > p {
        margin: 0;
        padding: 0;
    }

`


export const CardCliente = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 10vh;
    border-radius: 1.5rem;
    background-color: #f0f0f0;
    align-items: center;
    justify-content: space-around;


    p {
        font-size: 1rem;
        margin: 0rem;
    }
`