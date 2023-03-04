const BASE_URL= 'http://localhost:3000';

export const frontendLink= Object.freeze({
    PRIVATE:{
        PRODUCT:`${BASE_URL}/product`
    },
    PUBLIC:{
        SIGN_IN: `${BASE_URL}/sign-in`,
        SIGN_UP: `${BASE_URL}/sign-up`,

    }

})