export class Product{

   private description:string;
   private  price:string;
   private image1:File;
   private image2:File;

    constructor(description:string, price:string, image1:File, image2:File){

            this.description = description;
            this.price = price;
            this.image1 = image1;
            this.image2 = image2;

        }

    public set setDescription(des:string){

        this.description=des;

    }

    public set setPrice(prc:string){
        this.price=prc;
    }

    public set setImage1(img1:File){
        this.image1=img1;
    }

    public set setImage2(img2:File){
        this.image2=img2;
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

    public get P_image2(){
        return this.image2;
    }

}