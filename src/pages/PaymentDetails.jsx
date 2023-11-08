import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPaymentDetails } from "../redux/features/payment/PaymentSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeStyle from "./Home.module.css";
import { Spinner } from "@chakra-ui/react";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const pathname = location.pathname;
  const parts = pathname.split("/"); // Split pathname by '/'
  const id = parts[parts.length - 1];
  console.log(id);

  useEffect(() => {
    dispatch(getPaymentDetails(id));
  }, [dispatch]);

  const data = useSelector((state) => state?.payment?.paymentdetails);
  const { isLoading } = useSelector((state) => state?.payment);
  console.log(data);

  return (
    <div className={HomeStyle.card_container}>
      {isLoading ? (
        <Spinner display="flex" justifyContent="center" alignItems="center" margin="auto"/>
      ) : (
        <>
          <img
            src={data?.images[0]?.url}
            alt="logo"
            className={HomeStyle.cardImg}
          />
          <div className={HomeStyle.details_container}>
            <h3>Sender: {data?.sender}</h3>
            <h3>Trxid: {data?.trxid}</h3>
            <p>USER</p>
            <h4>Name: {data?.user?.username}</h4>
            <h4>Email: {data?.user?.email}</h4>
            <h4>Phone: {data?.user?.phone}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
