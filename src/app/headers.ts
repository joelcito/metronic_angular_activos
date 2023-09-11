// En algún lugar de tu aplicación, por ejemplo, cuando deseas cambiar a 'Content-Type: application/json'
export const HEADERS_GLOBAL = {
    
    // DESARROLLO
    // 'Content-Type': 'application/json'
    // END DESARROLLO
    
    // PRODUCCION
    'Authorization': 'Bearer '+sessionStorage.access_token
    // END PRODUCCION
};