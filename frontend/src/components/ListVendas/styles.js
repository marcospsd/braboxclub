import styled from "styled-components";

export const BigConteiner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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