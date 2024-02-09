import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { helpHttp } from "./common/Helpers/helpHttp";

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [errorMessage, setErrorMessage] = useState({});
  
  let api = helpHttp();

  const logout = async () => {
    setLoading(true)   
    let options = {
    };  
    await api.post(`api/v1/auth/logout`, options).then((res:any) => {
      if (!res.err) {
        setAuth(false);
      } else {
        setErrorMessage(res.message);
      }
  }).catch((err:any) => console.log(err));
    setLoading(false)
  }

  function getCookie(key:string) {
    let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const singin = async (username: string, password: string) => {
    setLoading(true)   
    let options = {
        body: {username,password},
    };  
    await api.post(`api/v1/auth/login/`, options).then((res:any) => {
      if (!res.err) {
        let user = res;      
        setUser(user);
        setAuth(true);
      } else {
        setErrorMessage(res.message);
      }
  }).catch((err:any) => console.log(err));

    setLoading(false)
  }

  useEffect(() => {
    let options = {
    };  
    api.get(`api/v1/auth/`, options).then((res:any) => {
      if (!res.err) {
        let user = res;
        setUser(user);
        setAuth(true);
      } else {
        console.log(res);
        setAuth(false);
        setErrorMessage(res.message);
      }
  }).catch((err:any) => console.log(err));
  
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if(loading){
    return (
      <Loader />
    )
  }
    
  if(!auth){
    return (
      <>
        <Suspense fallback={<Loader />}>
          <SignIn singin={singin}/>
        </Suspense>
      </>
      )
  }

  return (
    <>
      
      <Suspense fallback={<Loader />}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn singin={singin}/>} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout logout={logout} user={user}/>}>
          <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
      
      </Suspense>
    </>
  );
}

export default App;
