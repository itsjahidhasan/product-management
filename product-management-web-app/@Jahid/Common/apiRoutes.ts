const BASE_URL= 'https://localhost:44310';
const PUBLIC_ROUTE = BASE_URL + '/public';
const PRIVATE_ROUTE = BASE_URL + '/private';

export const routes= Object.freeze({
    PRIVATE:{
        CATEGORY_AP:`${PRIVATE_ROUTE}/category`,
        ADD_PRODUCT:`${PRIVATE_ROUTE}/product`,
        CATEGORY_PRODUCTS:(productId:number|null)=>`${PRIVATE_ROUTE}/category-product/${productId}`,
        CREATE_USER:`${PRIVATE_ROUTE}/user`,
    },
    PUBLIC:{
        LOGIN: `${PUBLIC_ROUTE}/login`,
    }

})