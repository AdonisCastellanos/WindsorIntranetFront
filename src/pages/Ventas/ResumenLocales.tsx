import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { helpHttp } from "../../common/Helpers/helpHttp";
import { useNavigate } from "react-router-dom";


const ResumenLocales = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [reportData, setReportData] = useState<[{localId:string}]>([{localId:""}]);

    const [errorMessage, setErrorMessage] = useState({});
    
    const navigate = useNavigate();
    
    let api = helpHttp();    

    
    let Currency = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });
  
      const getReportData = async() => {
          const userString:string = window.localStorage.getItem('WindsorIntranetUser')||"";
          console.log(userString);
          const user = JSON.parse(userString);
          console.log(user);
          setLoading(true)        
          let options = {
              //body: paramData,
          };  
          await api.get(`api/v1/report/resumen-locales/`, options).then((res:any) => {
              if (!res.err) {
              setReportData(res);
              } else {
              setErrorMessage(res.errors);
              }
          }).catch((err:any) => console.log(err));
  
          setLoading(false)
        }

        const showLocal = (e:any) => {
            console.log(e.target.id);
            //navigate(`/ventas/resumen-local/${e.target.id}`);
        }
        
  useEffect(() => {
    getReportData();
  }, []);

return (
<div className="flex flex-col gap-2 mt-1">  

            {/* <!-- Report Data --> */}
    <div className="relative overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900 border-b border-stroke py-2 px-3 dark:border-strokedark">
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
                <th scope="col" className="px-6 py-3">Local</th>
                <th scope="col" className="px-6 py-3">Fecha</th>
                <th scope="col" className="px-6 py-3">Total</th>
            </tr>
        </thead>
        <tbody className='w-full'>
            {
                loading ? <Loader></Loader>
                :reportData.map((local:any, index:number) => (
                <tr  className="bg-white hover:bg-gray hover:cursor-pointer dark:bg-graydark dark:text-gray dark:hover:bg-primary" 
                    key={index} onClick={showLocal}>
                    <td className="px-3 py-3" id={local.localId}>{local.local}</td>
                    <td className="px-3 py-3" id={local.localId}>{local.fecha}</td>
                    <td className="px-3 py-3" id={local.localId}>{Currency.format(local.total)}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
</div>
)

}
    export default ResumenLocales;
