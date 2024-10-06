import { POST, GET, getBody,WithPOSTAndKey,WithPOSTAPIKey,WithAPIKeyData,WithAPIKeyFormData } from "./common";
import { ROUTE_LOGIN,AllMasterData,CreatePo,PoListURL,PoItemQtyURL,PoItemNameURL,PoNameURL,StockRecivingBulk,StockRecivingWithoutSeriolNumber,SeriolNumberUpload,Device_List } from "./apilist";

export const REQUEST_LOGIN = (formData, callback) => {
    return POST(ROUTE_LOGIN, formData).end(callback);
};
export const Get_MasterData = (jwtToken,apiKey, callback) => {
    return WithPOSTAndKey(AllMasterData, jwtToken,apiKey).end(callback);
};
export const Create_PO = (formData, callback) => {
    return POST(CreatePo, formData).end(callback);
};
export const Po_List=(apiKey, callback)=>{
    return WithPOSTAPIKey(PoListURL, apiKey).end(callback);
}
export const Po_NameList=(apiKey, callback)=>{
    return WithPOSTAPIKey(PoNameURL, apiKey).end(callback);
}
export const Item_NameList=(apiKey,Poid ,callback)=>{
    return WithAPIKeyData(PoItemNameURL,apiKey,Poid).end(callback);
}
export const Item_QtyList=(apiKey, PoItem,callback)=>{
    return WithAPIKeyData(PoItemQtyURL,apiKey,PoItem).end(callback);
}
export const Stock_RecivingBulk=(apiKey, PoItem,callback)=>{
    return WithAPIKeyFormData(StockRecivingBulk,apiKey,PoItem).end(callback);
}
export const Stock_RecivingWithoutSN=(apiKey, PoItem,callback)=>{
    return WithAPIKeyData(StockRecivingWithoutSeriolNumber,apiKey,PoItem).end(callback);
}
export const Seriol_NumberUpload=(apiKey, PoItem,callback)=>{
    return WithAPIKeyFormData(SeriolNumberUpload,apiKey,PoItem).end(callback);
}
export const Device_ListData=(apiKey, callback)=>{
    return WithPOSTAPIKey(Device_List, apiKey).end(callback);
}


