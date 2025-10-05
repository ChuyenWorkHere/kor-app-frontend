import React, { useEffect, useState } from 'react'
import PricingCard from './PricingCard'
import api from '../../config/axiosConfig'
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../../features/userSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Pricing = () => {

  const dispatch = useDispatch();
  const [pricingArr, setPricingArr] = useState([]);
  const { info, loading, error  } = useSelector(state => state.user);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const clientSecret = info?.clientSecret;

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await api.get("/users/subscription-plans");
        console.log(response.data);
        setPricingArr(response.data.data);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      }
    };

    fetchPricing();
  }, []);

  const handleBuy = async (plan) => {
    try {
      dispatch(createPaymentIntent({
        amount: plan.price * 100,
        currency: "usd",
      }))
      setSelectedPlan(plan);
    } catch (error) {
      toast.error("Lỗi khi thanh toán");
    }
  }

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} plan = {selectedPlan} />
      </Elements>
    );
  }

  return (
    <div className="row justify-content-center align-items-center mb-1">
      {pricingArr.map((p) => (
        <div key={p.planId} className="col-md-3 ps-md-0">
          <PricingCard pricing={p} onBuy={handleBuy} />
        </div>
      ))}
    </div>
  )
}

export default Pricing