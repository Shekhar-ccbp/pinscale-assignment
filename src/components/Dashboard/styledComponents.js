import styled from 'styled-components'

export const DashboardPage = styled.div`
  display: flex;
  flex-direction: row;
`

export const DashboardWithHeader = styled.div`
  width: 82.64%;
  //   width: 80.5%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  padding: 15px;
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const CreditAndDebitContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
