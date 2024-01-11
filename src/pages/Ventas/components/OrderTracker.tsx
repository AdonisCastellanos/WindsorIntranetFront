const OrderTracker = ( props: {
  orderData: any;} ) => {
 const order = props.orderData; /*{
    status: 'Completed',
    orderPlaced: true ,
    orderDate: '2022-11-30',
    paymentConfirmed: '2022-11-30T10:18',
    orderShipped: '2022-12-02T11:36',
    orderReceived: '2022-12-06T07:03',
    orderCompleted: '2023-01-05T23:59',
 };*/

 const style = {
  orderText: order.orderPlaced?"text-success":"text-danger",
  orderBorder: order.orderPlaced?"border-success":"border-danger",
  pickingText: order.picking?"text-success":"text-danger",
  pickingBorder: order.picking?"border-success":"border-danger",
  packagedText: order.packaged?"text-success":"text-danger",
  packagedBorder: order.packaged?"border-success":"border-danger",
  dispatchedText: order.dispatched?"text-success":"text-danger",
  dispatchedBorder: order.dispatched?"border-success":"border-danger",
  invoiceText: order.invoiced?"text-success":"text-danger",
  invoiceBorder: order.invoiced?"border-success":"border-danger",
  transportedText: order.transported?"text-success":"text-danger",
  transportedBorder: order.transported?"border-success":"border-danger",
  deliveredText: order.delivered?"text-success":"text-danger",
  deliveredBorder: order.delivered?"border-success":"border-danger",
 }

 return !order.orderPlaced ?<h1>Orden no encontrada</h1>:(
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Orden numero: {order.orderNo}</h1>
        <div className="bg-white p-4 rounded">
          <div className="space-x-2 flex flex-wrap">
            
            {/** Order info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.orderBorder} mt-8 p-3 m-auto`}>
                <svg className={`h-18 w-20 ${style.orderText}`}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
                
                </div>              
                <p><strong>Orden:</strong>  </p>
                <p>{order.orderDate}</p>
                <p><strong>Firma Fin:</strong>  </p>
                <p>{order.firmafin}</p>
                <p><strong>Ultima aprobacion:</strong>  </p>
                <p>{order.UltimaAprobacion}</p>
              </div>      

              <div className="my-auto">
              <svg className={`h-10 w-20 ${style.orderText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="0" y1="12" x2="30" y2="12" />  <line x1="24" y1="16" x2="30" y2="12" />  <line x1="24" y1="8" x2="30" y2="12" /></svg>
              </div>
              
            </div>

            {/** Picking info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.pickingBorder} mt-8 p-3 m-auto`}>
                <svg className={`h-18 w-20 ${style.pickingText}`}  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="5" cy="17" r="2" />  <circle cx="14" cy="17" r="2" />  <line x1="7" y1="17" x2="12" y2="17" />  <path d="M3 17v-6h13v6" />  <path d="M5 11v-4h4" />  <path d="M9 11v-6h4l3 6" />  <path d="M22 15h-3v-10" />  <line x1="16" y1="13" x2="19" y2="13" /></svg>
                
                </div>              
                <p><strong>Picking:</strong>  </p>
                <p>{order.pickingDate}</p>
                <p><strong>F. Asginacion:</strong>  </p>
                <p>{order.TOPICKINGDATE}</p>
              </div>      
                      
              <div className="my-auto">
              <svg className={`h-10 w-20 ${style.pickingText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="0" y1="12" x2="30" y2="12" />  <line x1="24" y1="16" x2="30" y2="12" />  <line x1="24" y1="8" x2="30" y2="12" /></svg>
              </div>
              
            </div>

            {/** Packaging info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.packagedBorder} mt-8 p-3 m-auto`}>
                
                <svg className={`h-18 w-20 ${style.packagedText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />  <line x1="12" y1="12" x2="20" y2="7.5" />  <line x1="12" y1="12" x2="12" y2="21" />  <line x1="12" y1="12" x2="4" y2="7.5" />  <line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>
                
                </div>              
                <p><strong>{order.packaged?"Embalado":"No Embalado"}</strong></p>
                
                <p>{order.packagedDate}</p>
              </div>      
                      
              <div className="my-auto">
              <svg className={`h-10 w-20 ${style.packagedText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="0" y1="12" x2="30" y2="12" />  <line x1="24" y1="16" x2="30" y2="12" />  <line x1="24" y1="8" x2="30" y2="12" /></svg>
              </div>
              
            </div>

            {/** Dispatch info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.dispatchedBorder} mt-8 p-3 m-auto`}>
                <svg className={`h-18 w-20 ${style.dispatchedText}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />  <line x1="3" y1="6" x2="21" y2="6" />  <path d="M16 10a4 4 0 0 1-8 0" /></svg>
                
                </div>              
                <p><strong>{order.dispatched?"Despachado":"No Despachado"}</strong>  </p>
                <p>{order.dispatchDate}</p>
              </div>      
                      
              <div className="my-auto">
              <svg className={`h-10 w-20 ${style.dispatchedText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="0" y1="12" x2="30" y2="12" />  <line x1="24" y1="16" x2="30" y2="12" />  <line x1="24" y1="8" x2="30" y2="12" /></svg>
              </div>
              
            </div>

            {/** Invoice info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.invoiceBorder} mt-8 p-3 m-auto`}>
                <svg className={`h-18 w-20 ${style.invoiceText}`}   width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="9" y1="7" x2="10" y2="7" />  <line x1="9" y1="13" x2="15" y2="13" />  <line x1="13" y1="17" x2="15" y2="17" /></svg>
                
                </div>              
                <p><strong>Factura Creada:</strong>  </p>
                <p>{order.invoiceDate}</p>
              </div>      
                      
              <div className="my-auto">
              <svg className={`h-10 w-20 ${style.invoiceText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="0" y1="12" x2="30" y2="12" />  <line x1="24" y1="16" x2="30" y2="12" />  <line x1="24" y1="8" x2="30" y2="12" /></svg>
              </div>
              
            </div>

            {/** Transport info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.transportedBorder} mt-8 p-3 m-auto`}>
                <svg className={`h-18 w-20 ${style.transportedText}`}  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /></svg>
                
                </div>              
                <p><strong>En Camion:</strong>  </p>
                <p>{order.transporteDate}</p>
                <p><strong>Fecha de Salida:</strong>  </p>
                <p>{order.transporteDateOut}</p>
                {order.nbulto>0?<p><strong>bultos:</strong>{order.nbulto}</p>:""}
              </div>      
                      
              <div className="my-auto">
              <svg className={`h-10 w-20 ${style.transportedText}`} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="0" y1="12" x2="30" y2="12" />  <line x1="24" y1="16" x2="30" y2="12" />  <line x1="24" y1="8" x2="30" y2="12" /></svg>
              </div>
              
            </div>

            {/** Dispatched info **/}
            <div className="flex text-center">
              <div className="">
                <div className={`flex w-25 h-25  justify-center rounded-full bg-white border-2 ${style.deliveredBorder} mt-8 p-3 m-auto`}>
                <svg className={`h-18 w-20 ${style.deliveredText}`}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                
                </div>              
                <p><strong>Entregado</strong>  </p>
              </div>      
              
            </div>


          </div>
        </div>
      </div>
    </div>
 );
};

export default OrderTracker;