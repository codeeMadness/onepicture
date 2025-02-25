export const java_arr = ['Access Modifiers','ArrayList','Custom Annotations','Equals','Exception','Garbage Collection','How Java Compile','Numeric Promotion','Operator Precedence','Order Execution','Overloading Methods','Spring','Var']

export const system_design_arr = ['JWT Workflow','SAML Workflow','SOLID','OOP','ACID']

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