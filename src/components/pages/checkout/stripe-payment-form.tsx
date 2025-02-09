"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
}

interface StripePaymentFormProps {
  SubmitButton?: React.ReactNode;
  shippingInfo: ShippingInfo;
  user: string;
  products: {
    product: string;
    quantity: number;
  }[];
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  SubmitButton,
  shippingInfo,
}) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(`${api}/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: 100 }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to create checkout session");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        toast.error("Failed to initialize payment", {
          description: errorMessage,
        });
      }
    };

    fetchClientSecret();
  }, [api]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setError(null);

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    try {
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentMethodError) {
        console.log(paymentMethodError.message);
        throw new Error(paymentMethodError.message);
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: shippingInfo.name || "anonymous",
              email: shippingInfo.email || "a@gmail.com",
            },
          },
        });

      if (confirmError) {
        console.log(confirmError.message);
        throw new Error(confirmError.message);
      }

      if (paymentIntent?.status === "succeeded") {
        console.log("Payment successful", paymentIntent.id);
        toast.success("Payment placed successfully", {
          richColors: true,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment failed";
      setError(errorMessage);
      toast.error("Payment failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {SubmitButton}
    </form>
  );
};

export default StripePaymentForm;
