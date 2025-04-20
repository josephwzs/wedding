export class Card {

    bankName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCcv: string;



    constructor(
        bankName: string,
        cardNumber: string,
        cardExpiry: string,
        cardCcv: string,
    ){
        this.bankName = bankName
        this.cardNumber = cardNumber
        this.cardExpiry = cardExpiry
        this.cardCcv = cardCcv
    }
    static createEmptyModel(): Card {
        return {
            bankName: null as any,
            cardNumber: null as any,
            cardExpiry: null as any,
            cardCcv: null as any,
        }
    }

}