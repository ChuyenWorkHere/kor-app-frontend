import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import PaymentSuccessCard from './PaymentSuccessCard';
import { useDispatch } from 'react-redux';
import { activateSubscription } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ clientSecret, plan }) => {
    const stripe = useStripe();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const paymentElementOptions = {
        layout: "tabs",
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            toast.error(error.message || "Thanh toán không thành công");
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {

            const subscription = {
                planId: plan.planId,
                paymentIntentId: paymentIntent.id
            }
            dispatch(activateSubscription({ subscription, setSuccess, toast, navigate}));
        }
        setLoading(false);
    };

    return !success ?
        (
            <form onSubmit={handleSubmit} className='border shadow p-4 rounded-3' style={{ maxWidth: '400px', margin: 'auto' }}>
                <h3 className='mb-3'>{plan.name}</h3>
                {clientSecret && <PaymentElement options={paymentElementOptions} />}
                <button
                    className='w-100 mt-3 p-3 bg-primary text-white rounded border-0'
                    type="submit"
                    disabled={!stripe || loading}
                >
                    {loading ? `${<BeatLoader />}` : ``} Thanh toán ${plan.price}
                </button>
            </form>
        ) : (
            <PaymentSuccessCard />
        )
};

export default CheckoutForm;
