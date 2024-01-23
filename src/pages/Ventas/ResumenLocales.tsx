import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { helpHttp } from "../../common/Helpers/helpHttp";
import { useNavigate } from "react-router-dom";


const ResumenLocales = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const [paramData, setParamData] = useState<{reportDate:string}>({reportDate:new Date().toISOString().substring(0, 10)});

    const [reportData, setReportData] = useState<[{localId:string,fecha:string}]>([{localId:"",fecha:""}]);

    const [errorMessage, setErrorMessage] = useState({});
    
    const navigate = useNavigate();
    
    let api = helpHttp();    

    const handleChange = (e:any) => {
        setParamData({ ...paramData, [e.target.name]: e.target.value });
      };
    
    let Currency = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });
  
      const getReportData = async() => {
          setLoading(true)        
          let options = {
              //body: paramData,
          };  
          await api.get(`api/v1/report/resumen-locales/?date=${paramData.reportDate}`, options).then((res:any) => {
              if (!res.err) {
              setReportData(res);
              } else {
              setErrorMessage(res.errors);
              }
          }).catch((err:any) => console.log(err));
  
          setLoading(false)
        }

        const showLocal = (e:any) => {
            navigate(`/ventas/resumen-local/?localId=${e.target.id}`);
        }
        
  useEffect(() => {
    getReportData();
  }, [paramData.reportDate]);

  const ReportTable = <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900 border-b border-stroke py-2 px-3 dark:border-strokedark">
                        <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className="px-6 py-3">Local</th>
                                <th scope="col" className="px-6 py-3">Total</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                reportData.length>0?reportData.map((local:any, index:number) => (
                                <tr  className="bg-white hover:bg-gray hover:cursor-pointer dark:bg-graydark dark:text-gray dark:hover:bg-primary" 
                                    key={index} onClick={showLocal}>
                                    <td className="px-3 py-3" id={local.localId}>{local.local}</td>
                                    <td className="px-3 py-3" id={local.localId}>{Currency.format(local.total)}</td>
                                </tr>
                            )):<tr><td colSpan={4} className="px-3 py-3 text-center">No hay datos para mostrar</td></tr>}
                        </tbody>
                        </table>

return (
<div className="flex flex-col gap-2 mt-1">  

    <div className="w-full p-5 text-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <strong><input className="text-3xl" 
            type='date' name="reportDate" value={paramData.reportDate} onChange={handleChange}></input></strong>

    </div>   
            {/* <!-- Report Data --> */}
    <div className="relative overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {loading?<Loader></Loader>:ReportTable}
    
    </div>
</div>
)

}
    export default ResumenLocales;
