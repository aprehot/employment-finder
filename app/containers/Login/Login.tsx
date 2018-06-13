import * as React from 'react';


import AniGrid from '../hoc/aniGrid';
import LoginForm from './LoginForm';



const Login:React.SFC = () => (
    <AniGrid Left={LoginForm} />
  );


export default Login;
