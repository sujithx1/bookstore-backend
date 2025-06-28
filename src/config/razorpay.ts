import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAYID!,
  key_secret: process.env.RAZORPAYKEY!,
});
 