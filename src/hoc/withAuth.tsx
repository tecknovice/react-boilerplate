import React from 'react'
import { Navigate } from 'react-router-dom'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { CircularProgress } from '@mui/material'

type AuthProps = { children: Element }
type AuthState = {
    loading: boolean
    signedIn: boolean
}

const withAuth = (WrappedComponent: any) => {
    class withAuth extends React.Component<any, AuthState> {
        constructor(props: any) {
            super(props)
            this.state = {
                loading: true,
                signedIn: false,
            }
        }

        componentDidMount() {
            try {
                const jwt = localStorage.getItem('jwt')
                if (jwt) {
                    const decodedToken = jwtDecode<JwtPayload>(jwt)
                    const currentTimeStamp = Math.floor(new Date().getTime() / 1000)
                    if (decodedToken.exp && decodedToken.exp > currentTimeStamp) {
                        this.setState({ loading: false, signedIn: true })
                    } else {
                        this.setState({ loading: false, signedIn: false })
                    }
                } else {
                    this.setState({ loading: false, signedIn: false })
                }
            } catch (error) {
                console.error(error)
            }
        }

        render() {
            if (this.state.loading) return <CircularProgress />
            else if (this.state.signedIn) return <WrappedComponent {...this.props} />
            else return <Navigate to="/signin" />
        }
    }
    return withAuth
}

export default withAuth
