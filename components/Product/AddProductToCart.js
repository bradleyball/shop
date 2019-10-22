import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import catchErrors from "../../utils/catchErrors";

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 2000);
    }
  }, [success]);

  async function handleAddProductToCart() {
    try {
      setLoading(true);
      console.log("im here");
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };

      const { data } = await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (err) {
      catchErrors(err, window.alert);
    } finally {
      setLoading(false);
    }
  }
  console.log(user);
  return (
    <Input
      type="number"
      min="1"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={
        user && success
          ? {
              color: "blue",
              content: "Item Added!",
              icon: "plus cart",
              disabled: true
            }
          : user
          ? {
              color: "orange",
              content: "Add to Cart",
              icon: "plus cart",
              loading,
              disabled: loading,
              onClick: () => handleAddProductToCart()
            }
          : {
              color: "blue",
              content: "Sign Up To Purchase",
              icon: "signup",
              onClick: () => router.push("/signup")
            }
      }
    />
  );
}

export default AddProductToCart;
