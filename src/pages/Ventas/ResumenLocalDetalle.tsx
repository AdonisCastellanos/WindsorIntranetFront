import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { helpHttp } from "../../common/Helpers/helpHttp";
import { useSearchParams } from "react-router-dom";


const ResumenLocal = (  ) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const [paramData, setParamData] = useState<{reportDate:string}>({reportDate:new Date().toISOString().substring(0, 10)});

    const [reportData, setReportData] =  useState<[{localId:string,local:string,fecha:string}]>([{localId:"",local:"",fecha:""}]);

    const [searchParams] = useSearchParams();

    const [errorMessage, setErrorMessage] = useState({});
    
    
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
          await api.get(`api/v1/report/resumen-local-detalle/${searchParams.get("localId")}/?date=${paramData.reportDate}`, options).then((res:any) => {
              if (!res.err) {
                if(res.length>0){
                    setReportData(res);
                  }else{
                    setReportData([{localId:"",local:"",fecha:""}]);
                  }
              } else {
              setErrorMessage(res.errors);
              }
          }).catch((err:any) => console.log(err));
  
          setLoading(false)
        }
        
  useEffect(() => {
    getReportData();
  }, [paramData.reportDate]);

  const ReportTable = <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900 border-b border-stroke py-2 px-3 dark:border-strokedark">
  <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
          <th scope="col" className="px-6 py-3">Numero de Doc</th>
          <th scope="col" className="px-6 py-3">Tipo de Documento</th>
          <th scope="col" className="px-6 py-3">Cliente</th>
          <th scope="col" className="px-8 py-3">Rut</th>
          <th scope="col" className="px-6 py-3">Codigo</th>
          <th scope="col" className="px-6 py-3">Producto</th>
          <th scope="col" className="px-6 py-3">Cantidad</th>
          <th scope="col" className="px-6 py-3">Precio</th>
          <th scope="col" className="px-6 py-3">Total Linea</th>
          <th scope="col" className="px-6 py-3">Vendedor</th>
      </tr>
  </thead>
  <tbody className='w-full'>
      {
          reportData[0].local!==''?reportData.map((local:any, index:number) => (
          <tr  className="bg-white dark:bg-graydark dark:text-gray" 
              key={index}>
              <td className="px-3 py-3" >{local.numero}</td>
              <td className="px-3 py-3" >{local.tipodoc}</td>
              <td className="px-3 py-3" >{local.cliente}</td>
              <td className="px-4 py-4" >{local.rut}</td>
              <td className="px-3 py-3" >{local.codigo}</td>
              <td className="px-3 py-3" >{local.producto}</td>
              <td className="px-3 py-3" >{local.cantidad}</td>
              <td className="px-3 py-3" >{Currency.format(local.precio)}</td>
              <td className="px-3 py-3" >{Currency.format(local.totalLinea)}</td>
              <td className="px-3 py-3" >{local.vendedor}</td>
          </tr>
      )):<tr><td colSpan={12} className="px-3 py-3 text-center">No hay datos para mostrar</td></tr>}
  </tbody>
</table>

return (
<div className="flex flex-col gap-2 mt-1">   
    <div className="w-full p-5 text-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <h1 className="text-3xl" ><strong>{loading?<Loader></Loader>:reportData[0].local}</strong></h1>
    <h2><strong><input className="text-2xl" 
            type='date' name="reportDate" value={paramData.reportDate} onChange={handleChange}></input></strong></h2>
    </div>   
            {/* <!-- Report Data --> */}
    <div className="relative overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    {loading?<Loader></Loader>:ReportTable}    
    </div>    
</div>
)

}
    export default ResumenLocal;
