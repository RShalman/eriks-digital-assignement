export type IProduct = {
    Toepassing: string;
    salePrice: string;
    manufacturerName: string;
    Hardheid: string;
    grossPrice: string;
    BUP_UOM: string;
    Artikelnummer: string;
    stepQuantity: string;
    BUP_Value: string;
    badges: string;
    uom: string;
    Kleur: string;
    productImage: string;
    Temperatuurgebied: string;
    BUP_Conversion: string;
    minQuantity: string;
    manufacturerImage: string;
    name: string;
    Materiaal: string;
    sku: string;
    Snoerdikte: string;
    "Inwendige diameter": string;
    "Maat volgens AS568": string;
    listPrice: string;
    channel: string;
    display: boolean;
    atp: Record<string, unknown>;
};

export type NOT_USED_PRODUCT_FIELDS =
    | "salePrice"
    | "manufacturerName"
    | "grossPrice"
    | "BUP_UOM"
    | "BUP_Value"
    | "uom"
    | "productImage"
    | "BUP_Conversion"
    | "minQuantity"
    | "manufacturerImage"
    | "name"
    | "sku"
    | "listPrice"
    | "channel"
    | "display"
    | "atp";

export type IProducts = {
    products: IProduct[];
};
