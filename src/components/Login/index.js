import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {NameAndLogo, CompanyName, CompanyNameMatters} from './styledComponents'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = userId => {
    const {history} = this.props

    Cookies.set('user_id', userId, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
    // console.log("Enter");
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id`
    const loginDetails = {email, password}
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      },
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data);
    if (response.ok) {
      //   const getUerId = data.get_user_id;
      const userId = data.get_user_id[0].id
      //   console.log(userId);

      this.onSubmitSuccess(userId)
    } else {
      console.log('Error')
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Enter Password"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Enter Email"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('user_id')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://www.edumilestones.com/career-library/images/investement-plan.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://www.edumilestones.com/career-library/images/investement-plan.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <NameAndLogo>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="38"
              viewBox="0 0 44 38"
              fill="none"
            >
              <path
                d="M30.3509 11.1367C29.8451 6.71605 28.7706 2.94096 27.6895 0C25.8811 0.334497 23.7781 0.6087 21.419 0.71431C18.3655 0.850644 15.6396 0.670914 13.3691 0.384422C14.2593 1.84453 15.153 3.53699 15.9395 5.45487C16.2667 6.25252 16.5486 7.02482 16.7925 7.76601C16.4468 6.0605 16.1012 4.35499 15.7556 2.64948C16.9234 2.71054 18.1281 2.75125 19.3667 2.76737C21.7757 2.79887 24.0538 2.73435 26.1879 2.60301C26.7986 4.12034 27.3696 5.74251 27.8719 7.46608C29.8785 14.3523 30.1043 20.5253 29.7353 25.3922C30.4542 21.8844 31.0199 16.986 30.3509 11.1363V11.1367Z"
                fill="#60C7CA"
              />
              <path
                d="M33.1462 4.17485C31.6719 3.87338 30.3727 3.47936 29.2678 3.07458C29.4479 3.69442 29.628 4.31387 29.8085 4.93371C30.6876 5.2444 31.6853 5.54625 32.7925 5.8001C33.8801 6.04972 34.8924 6.2114 35.8053 6.31509C35.4028 10.0349 34.5764 14.6268 32.8812 19.6961C31.5117 23.7907 29.8869 27.2659 28.3423 30.0889C31.2057 26.1572 34.672 20.2902 36.6494 12.5818C37.3756 9.75108 37.7908 7.10199 38.0116 4.71558C36.6275 4.68793 34.9765 4.54852 33.1462 4.17447V4.17485Z"
                fill="#00B4B7"
              />
              <path
                d="M40.5364 11.8753C39.6792 11.3496 38.8781 10.82 38.1315 10.2961C37.9614 10.9164 37.7917 11.537 37.6215 12.1572C38.4453 12.8389 39.4027 13.5409 40.5034 14.2095C40.9327 14.4702 41.3548 14.7083 41.7657 14.9253C40.0168 18.3893 37.3888 22.7032 33.4678 27.0563C30.9969 29.7995 28.5241 31.9908 26.3013 33.7171C29.2564 31.9532 33.3875 29.023 37.3078 24.4176C40.6347 20.5092 42.712 16.6846 43.9996 13.802C42.899 13.2498 41.7369 12.6119 40.536 11.8757L40.5364 11.8753Z"
                fill="#02969C"
              />
              <path
                d="M36.5278 26.2317C36.2609 26.4859 35.9878 26.734 35.7094 26.9756C32.379 32.7914 26.1562 35.3207 19 35C8.80457 34.543 2.04261 27.1958 2.5 17C2.82029 9.85728 5.857 3.82117 11.9298 1.0177C5.22257 3.76779 0.366034 10.2158 0.0196323 17.9338C-0.455422 28.529 7.74877 37.5036 18.344 37.9786C26.8861 38.3615 34.3745 33.1033 37.2048 25.4986C36.9982 25.7647 36.7724 25.999 36.5278 26.2317Z"
                fill="#F89A23"
              />
              <path
                d="M25.0263 19.7258C24.7161 19.0645 24.2711 18.5011 23.7028 18.05C23.1701 17.6275 22.5333 17.2829 21.8101 17.026C21.3811 16.8736 20.9181 16.7334 20.4309 16.6093V16.1581H25.1959L25.1119 15.069C24.9914 13.5025 24.4342 12.2327 23.4565 11.294C22.6809 10.5499 21.6639 10.05 20.4309 9.80659V8H16.9845V9.77463C16.4936 9.86846 16.0298 10.002 15.6028 10.1725C14.8899 10.4577 14.2703 10.8433 13.7614 11.319C13.2365 11.8095 12.8305 12.402 12.5547 13.0797C12.2851 13.7422 12.1486 14.4794 12.1486 15.2706C12.1486 16.1512 12.3113 16.9289 12.6321 17.5816C12.9489 18.227 13.391 18.783 13.9454 19.2337C14.4682 19.6586 15.0788 20.0073 15.7594 20.2696C16.1486 20.42 16.5596 20.5539 16.9845 20.6691V22.5564C16.8862 22.3179 16.8222 22.0286 16.7932 21.6914L16.7133 20.7666H11.6528L11.7221 21.8434C11.7844 22.8113 11.9737 23.6713 12.2847 24.3995C12.6059 25.153 13.0464 25.7955 13.5938 26.3085C14.1396 26.8207 14.7989 27.2181 15.5528 27.4898C15.9958 27.6496 16.4764 27.7746 16.9841 27.8631V29.6565H20.4305V27.8713C20.9259 27.784 21.3992 27.6525 21.8401 27.4795C22.5805 27.189 23.2295 26.7821 23.7696 26.2704C24.317 25.7512 24.7456 25.1263 25.0435 24.413C25.3381 23.7066 25.4877 22.9129 25.4877 22.0549C25.4877 21.1968 25.3324 20.3798 25.0259 19.7258H25.0263Z"
                fill="#FAA31B"
              />
              <path
                d="M24.1104 20.1548C23.8662 19.6344 23.5207 
          19.1968 23.0741 18.8424C22.6271 18.4879 22.0932 
          18.1999 21.4712 17.9786C20.8496 17.7574 20.1653 
          17.5689 19.4196 17.4119V13.2808C20.405 13.4927 
          20.9393 14.1147 21.0221 15.146H24.1034C24.0018 
          13.8291 23.5531 12.7879 22.7562 12.0233C21.9592 
          11.2587 20.8471 10.8121 19.4196 
          10.683V9.01123H17.9965V10.6556C17.2503 
          10.7203 16.5779 10.8719 15.9793 
          11.1116C15.3802 11.3513 14.8717 11.6668 
          14.4526 12.0581C14.0334 12.4499 13.7134 
          12.917 13.4921 13.4607C13.2712 14.0044 
          13.1606 14.6076 13.1606 15.2706C13.1606 
          15.9983 13.2872 16.6203 13.5405 
          17.1358C13.7937 17.6516 14.1416 18.0893 
          14.5837 18.4482C15.0258 18.8075 15.5392 
          19.1001 16.1243 19.3255C16.7091 19.5512 
          17.3335 19.7332 17.9965 
          19.8713V24.3756C17.2872 24.2744 16.7574 
          24.0028 16.4075 23.5607C16.0571 23.1185 
          15.8502 22.5244 15.7859 
          21.7782H12.7324C12.7877 22.635 12.9488 
          23.3763 13.2159 24.0028C13.4831 24.6293 
          13.84 25.1521 14.2866 25.5709C14.7332 
          25.9901 15.2696 26.3125 15.8961 
          26.5379C16.5222 26.7637 17.2225 26.9087 
          17.9961 26.9731V28.6448H19.4191V26.9731C20.1653 
          26.9268 20.8492 26.7817 21.4708 26.5379C22.0924 
          26.2941 22.6267 25.9602 23.0737 25.5361C23.5203 
          25.1124 23.8658 24.608 24.11 24.0233C24.3538 
          23.4385 24.4763 22.7821 24.4763 22.0544C24.4763 
          21.3267 24.3542 20.6752 24.11 20.1544L24.1104 
          20.1548ZM17.9965 17.053C17.4806 16.9059 17.0684 
          16.6936 16.7599 16.4175C16.4513 16.1413 16.2968 
          15.7266 16.2968 15.1739C16.2968 14.0872 16.8635 
          13.4468 17.9965 13.2534V17.053ZM20.8565 
          23.6987C20.5525 24.0671 20.0735 24.2929 19.4196 
          24.3756V20.2445C20.1104 20.4289 20.5984 20.6707 
          20.884 20.9698C21.1692 21.2693 21.3122 21.677 
          21.3122 22.1925C21.3122 22.828 21.1602 23.3304 
          20.8561 23.6987H20.8565Z"
                fill="#FFD981"
              />
              <path
                d="M4.7501 9.49957C3.97204 11.1014 2.52537 14.6691 3.10143 19.1931C4.04654 26.6142 9.69113 30.7676 10.7684 31.5299C11.2081 30.9692 11.6478 30.4085 12.0875 29.8474C10.9469 29.0075 9.41846 27.7095 7.96565 25.8419C7.04895 24.6637 5.58231 21.7236 4.7501 18C3.86297 14.0306 4.96849 10.6921 5.5 9L4.7501 9.49957Z"
                fill="#FFF4CF"
              />
              <path
                d="M13.0962 30.4036C12.6657 30.9623 12.2352 31.5211 11.8047 32.0799C12.3089 32.4528 13.0144 32.8917 13.9207 33.2339C14.5206 33.4605 15.0736 33.5938 15.5421 33.6736C15.8352 32.9593 16.1286 32.2446 16.4216 31.5303C15.9077 31.384 15.3759 31.22 14.8278 31.0357C14.2203 30.8314 13.6431 30.6194 13.0966 30.4036H13.0962Z"
                fill="#FFF4CF"
              />
            </svg>
            <CompanyName>
              Money <CompanyNameMatters>Matters</CompanyNameMatters>
            </CompanyName>
          </NameAndLogo>
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
