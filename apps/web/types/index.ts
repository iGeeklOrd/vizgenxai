export enum Plantype {
    basic = "basic",
    premium = "premium"
}

export enum  TransactionStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PENDING = "PENDING",
}

export interface PaymentResponse {
    sessionId?: string
    url?: string
    id? : string
    amount?: number
    currency?: string
    success?: boolean
    message?: string
}

export interface RazorpayResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

export interface Subscription {
    plan: Plantype
    createdAt: string,
    credits: number
}

export interface Transaction {
    id: string
    userId: string
    amount: number 
    currency: string 
    paymentId: string 
    orderId: string 
    plan: Plantype
    isAnnual: boolean
    status: TransactionStatus
    createdAt: string
    updatedAt: string
}