const ReponseObj ={
    status:null,
    data:null,
    message:"",
    error:""
}

const sendResponse =(status,data,message,error)=>{
    ReponseObj.status=status;
    ReponseObj.data=data;
    ReponseObj.message=message;
    ReponseObj.error=error;
    return ReponseObj;
}

module.exports={
    sendResponse,
}
