export const helpHttp:any = () => {
    const serverApi = "http://38.7.203.45:3000/";
    
    const customFetch = async (endpoint:any, options:any) => {

        const defaultHeader = {
            accept: "application/json",
            "Access-Control-Allow-Origin":'http://localhost:3000',
            "Access-Control-Allow-Credentials":'true',
            "Content-Type": "application/json",
        };

        const controller = new AbortController();
        options.signal = controller.signal;
        options.method = options.method || "GET";
        options.headers = options.headers? {  ...defaultHeader, ...options.headers} : defaultHeader;
        options.credentials = "include";

        options.body = JSON.stringify(options.body)||false;
        if(!options.body) delete options.body;

        let response = {status:"",ok:false,statusText:""};

        setTimeout(() => controller.abort(), 60000)
        return fetch(serverApi+endpoint, options)
        .then((res) => {
            response = { ok:res.ok, status : (res.status||"00")+'',
            statusText : res.statusText||"Error" };
            return res.json()
        }).then((res) => 
            response.ok?
            res
            :Promise.reject({
                err : true,
                status : response.status||"00",
                statusText : response.statusText||"Error",
                errors: res.errors
            })
        ).catch((err) => err)
    };

    const get = (url:string, options:{}) => customFetch(url,options);

    
    const post = (url:string, options:{"method":string}) => {
        options.method = "POST"
        return customFetch(url,options);
    };

    
    const put = (url:string, options:{"method":string}) => {
        options.method = "PUT"
        return customFetch(url,options);
    };

    
    const del = (url:string, options:{"method":string}) => {
        options.method = "DELETE"
        return customFetch(url,options);
    };

    return {
        get,post,put,del
    };
}