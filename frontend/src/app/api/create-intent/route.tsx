import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
    apiVersion: "2024-04-10",
});

export async function POST(request) {
    const data = await request.json();
    const amount = data.amount;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "USD",
        });

        return NextResponse.json({ client_secret: paymentIntent.client_secret }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 400 });
    }
}