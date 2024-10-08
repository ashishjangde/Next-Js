import { NextResponse } from 'next/server'
import {auth} from './auth'


 
export default  auth((request ) => {

  

  const { nextUrl } = request;
  // !! is a double NOT operator, it converts the value to a boolean
  // So if request.auth is truthy (i.e. not null, undefined, 0, etc.)
  // then !!request.auth will be true, otherwise it will be false
  const isLoggedIn = !!request.auth
  const publicPaths = ['/sign-in', '/sign-up', '/verify',]

  if (isLoggedIn && publicPaths.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }


  return NextResponse.next()
})
// Supports both a single string value or an array of matchers
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    "/",
    '/verify', 
    '/dashboard/:path*'
],
}