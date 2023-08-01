import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  DashboardPage,
  DashboardWithHeader,
  DashboardContainer,
  CreditAndDebitContainer,
} from './styledComponents'

const Dashboard = () => {
  const jwtToken = Cookies.get('user_id')
  console.log(jwtToken)
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <DashboardPage>
      <DashboardWithHeader>
        <DashboardContainer>
          <CreditAndDebitContainer>
            <h1>Usage</h1>
          </CreditAndDebitContainer>
        </DashboardContainer>
      </DashboardWithHeader>
    </DashboardPage>
  )
}

export default Dashboard
