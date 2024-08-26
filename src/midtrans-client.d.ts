declare module "midtrans-client" {
  interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CustomerDetails {
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
  }

  interface ItemDetails {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  interface CreateTransactionParams {
    transaction_details: TransactionDetails;
    item_details?: ItemDetails[];
    customer_details?: CustomerDetails;
    credit_card?: object;
    enabled_payments?: string[];
    callbacks?: object;
    expiry?: object;
    custom_field1?: string;
    custom_field2?: string;
    custom_field3?: string;
  }

  interface CreateTransactionResponse {
    token: string;
    redirect_url: string;
  }

  class Snap {
    constructor(options: SnapOptions);
    createTransaction(
      params: CreateTransactionParams
    ): Promise<CreateTransactionResponse>;
  }
}
