import { NextResponse } from "next/server";
import crypto from "crypto";
// import { db } from "@/lib/firebase/config"

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Server-side verification successful
    // TODO: Save to Firestore
    /*
    await db.collection("paymentRecords").add({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      ...bookingData,
      status: "verified",
      createdAt: new Date().toISOString()
    });
    */

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
