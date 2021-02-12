import React, { useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import Recaptcha from 'react-recaptcha';
import {AuthContext} from '../../../context/Auth/Login'

import {
  CButton,
  CSpinner,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const validateSchema = yup.object().shape({
  email: yup.string().min(6, 'number should not be smaller than 6 character').max(16, 'number should not be longer than 16 character').required(),
  password: yup.string().min(6, 'password should not be smaller than 6 character').max(16, 'password should not be longer than 16 character')
})

const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const {dispatch} = useContext(AuthContext);
  const verifyCallback = (res) =>{
    if(res) {
      setIsVerified(true);      
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validateSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      if(!isVerified) {
                        setErrorMessage('recaptcha is not verified')
                        return false;
                      }
                      setErrorMessage('')
                      setLoading(true)
                      axios({
                        method: 'post',
                        url: '/',
                        data: {
                          query: `
                          query {
                            login(input : {phone : "${values.email}" , password : "${values.password}"}){
                              token
                            }
                          }
                          `
                        }
                      }).then((res) => {
                        if (res.data.errors) {
                          setLoading(false)
                          const { message } = res.data.errors[0];
                          setErrorMessage(message)
                          setSubmitting(false)
                          resetForm();
                        }
                        else {
                          setLoading(false)
                          const { token } = res.data.data.login
                          dispatch({type : 'login' , payload : token})
                          props.history.replace('/dashboard');
                        }

                      })
                        .catch(error => {
                          console.log(error);
                        })
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        {errorMessage ? <div style={{ color: 'red' }}>{errorMessage}</div> : ''}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />

                        </CInputGroup>
                        <div style={{ color: 'red', marginBottom: '8px' }}>
                          {errors.email && touched.email && errors.email}
                        </div>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <div style={{ color: 'red', marginBottom: '8px' }}>
                            {errors.password && touched.password && errors.password}
                          </div>
                        </CInputGroup>
                        <CInputGroup className='mb-4'>
                          <Recaptcha
                            sitekey="6LcIAlMaAAAAAAEJscavJ4mrZVsHAAoSvBxQ-VP0"
                            render="explicit"
                            verifyCallback={verifyCallback}
                            
                          />,
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton color="primary" className="px-4" type="submit" disabled={isSubmitting}>
                              {loading ? <CSpinner size="sm" /> : 'Login'}
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">Forgot password?</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
