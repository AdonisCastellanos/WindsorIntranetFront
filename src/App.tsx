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
  const [auth, setAuth] = useState<boolean>(window.localStorage.getItem('WindsorIntranetUser')!==null);
  //const [user, setUser] = useState<any>();
  const [errorMessage, setErrorMessage] = useState({});
  
  let api = helpHttp();

  const logout = () => {
    localStorage.removeItem('WindsorIntranetUser');
    setAuth(false);
  }

  const singin = async (username: string, password: string) => {
    setLoading(true)
    console.log(username,password)      
    let options = {
        body: {username,password},
    };  
    /*if(username==="admin" && password==="1234"){
      setAuth(true);
      window.localStorage.setItem(
        "WindsorIntranetUserToken", (`${username} ${password}`)
      )
      console.log(window.localStorage.getItem('WindsorIntranetUserToken'))
    }
    else {      
      setAuth(false);
    }*/
    await api.post(`api/v1/auth/login/`, options).then((res:any) => {
      if (!res.err) {
        let user = JSON.stringify(res);
        window.localStorage.setItem(
          "WindsorIntranetUser", user
        )
        console.log(res)
        console.log(user)
        setAuth(true);
      } else {
        setErrorMessage(res.message);
      }
  }).catch((err:any) => console.log(err));

    setLoading(false)
  }

  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if(!auth){
    return (
      <>
        <Suspense fallback={<Loader />}>
          <SignIn singin={singin}/>
        </Suspense>
      </>
      )
  }

  return loading ? (
    <Loader />
  ) : (
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
        <Route element={<DefaultLayout logout={logout}/>}>
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
