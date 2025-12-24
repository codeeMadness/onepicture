export enum Mode {
    MONTH = 0,
    YEAR = 1,
    LIFE = 2
}

export interface PricingModel {
    name: string;
    price: number;
    mode: Mode;
    currency: string;
}

export const pricing_models: PricingModel[] = [
    {
        name: "One Month Access",
        price: 1,
        mode: Mode.MONTH,
        currency: "USD"
    },
    {
        name: "One Year Access",
        price: 8,
        mode: Mode.YEAR,
        currency: "USD"
    },
    {
        name: "Life Time Access",
        price: 20,
        mode: Mode.YEAR,
        currency: "USD"
    },
]

export interface PricingDrawerMode {
    pricingModel?: PricingModel;
    displayPricingPlan: boolean;
    tab?: number;
}