export class Product{

    description:string;
    price:string;
    image1:File;

    constructor(description:string, price:string, image1:File){

            this.description = description;
            this.price = price;
            this.image1 = image1;
    }

    public get P_description(){
        return this.description;
    }

    public get P_price(){
        return this.price;
    }

    public get P_image1(){
        return this.image1;
    }

}