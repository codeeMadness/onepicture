export const java_arr = ['access_modifiers2','ArrayList','Custom_Annotations','equals','Exception','garbage_collection','How Java Compile','numeric_promotion','operator_precedence','order_execution','overloading_methods','Spring_Framework','Var']

export const system_design_arr = ['jwt_workflow','SAML_workflows','SOLID','OOP','ACID']

export const mixed = () => {
    const arr = java_arr.concat(system_design_arr);
    return shuffleArray(arr);
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}