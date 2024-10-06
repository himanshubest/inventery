let addPrefix = (route) => {
    return 'https://inventeryweb.somee.com' + '/' + route;
};


export const ROUTE_REGISTER = addPrefix('user/register');
export const ROUTE_LOGIN = addPrefix('Login/LoginDetails');
export const AllMasterData= addPrefix('MasterData/AllMasterData');
export const CreatePo = addPrefix('PoMaster/CreateLaptopPO');
export const PoListURL = addPrefix('PoMaster/PoDetailList');
export const PoNameURL =  addPrefix('StockMaster/StockPoList');
export const PoItemNameURL =  addPrefix('StockMaster/GetStockItemList');
export const PoItemQtyURL =  addPrefix('StockMaster/GetStockItemQuntity');
export const StockRecivingBulk = addPrefix('StockMaster/StockRecivingBulk');
export const StockRecivingWithoutSeriolNumber = addPrefix('StockMaster/StockRecivingWithoutSeriolNumber');
export const SeriolNumberUpload = addPrefix('StockMaster/SeriolNumberUpload');
export const Device_List = addPrefix('StockMaster/DeviceList');