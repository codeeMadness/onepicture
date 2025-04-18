export const java_arr = [
    'OOP',
    'How Java Compile',
    'Garbage Collection',
    'Process and Thread',
    'Access Modifiers',
    'Overloading Methods',
    'Functional Interface',
    'List Set Map',
    'ArrayList',
    'Equals',
    'Exception',
    'Var',
    'Order Execution',
    'Custom Annotations',
    'Numeric Promotion',
    'Operator Precedence',
    'Git Merge vs Git Rebase',
]

export const spring_arr = [
    'Spring',
    'Component vs Service vs Repository'
]

export const database_arr = [
    'ACID',
    'Index',
    'Joins Operator',
    'Speed Up SQL Performance'

]

export const system_design_arr = [
    'SOLID',
    'JWT Workflow',
    'SAML Workflow',
    'Event Loop',
]

export const hibernate = [
    'N+1 Problem',
]

export const design_pattern_arr = [
    'Singleton vs Prototype',
    'Decorator Pattern',
    
]

export const mixed = () => {
    const arr = java_arr
    .concat(database_arr)
    .concat(spring_arr)
    .concat(system_design_arr)
    .concat(design_pattern_arr)
    .concat(hibernate)
    ;

    return shuffleArray(arr);
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}