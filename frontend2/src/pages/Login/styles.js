import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000;
    width: 100vw;
    height: 100vh;
`

export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    max-width: 450px;
    height: 450px;
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
`

export const ImgLogo = styled.img`
    width: 400px;
    max-width: 100%;
    height: auto;
    padding: 1.5rem;

`

export const Helper = styled.span`
    background-color: red;
    color: black;
    width: 100%;
    margin: 0.5rem 0rem;
    border-radius: 1rem;
    text-align: center;
    color: white
`