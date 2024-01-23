import { useState } from 'react';
import Loader from '../../common/Loader';
import { helpHttp } from "../../common/Helpers/helpHttp";
import OrderTracker from './components/OrderTracker';

const SeguimientoOV = () => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const [paramData, setParamData] = useState<{orderNo:string}>({orderNo:""});

    const [reportData, setReportData] = useState<{orderNo:string}>({orderNo:""});
    
    const [errorMessage, setErrorMessage] = useState({});
    
  let api = helpHttp();
    
  const handleChange = (e:any) => {
    setParamData({ ...paramData, [e.target.name]: e.target.value });
  };

    const getReportData = async() => {
        setLoading(true)        
        let options = {
            //body: paramData,
        };  
        await api.get(`api/v1/report/seg-ov/${paramData.orderNo}`, options).then((res:any) => {
            if (!res.err) {
            setReportData(res);
            } else {
            setErrorMessage(res.errors);
            }
        }).catch((err:any) => console.log(err));

        setLoading(false)
      }

    
  return (
        <>
            <div className="flex flex-col gap-9">
            {/* <!-- Report Params --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Parametros de Busqueda
                    </h3>
                    </div>
                    <div >
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                            Nota de Venta o Ref Cliente<span className="text-meta-1">*</span>
                            </label>
                            <input
                            type="text"
                            name="orderNo"
                            placeholder="Ingrese el numero de nota"
                            value={paramData.orderNo}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={handleChange}
                            />
                        </div>
                        <button className="flex w-1/2 justify-center rounded bg-primary mt-8 p-3 font-medium text-gray" onClick={getReportData}>
                        Buscar
                        </button>
                        </div>               
                    </div>
                </div>
            </div>
            </div>
            
    
            <div className="flex flex-col gap-9 mt-5">
            {/* <!-- Report Data --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    {loading ? <Loader></Loader> : reportData.orderNo!=="" ? <OrderTracker orderData={reportData}></OrderTracker> : ""}                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeguimientoOV;