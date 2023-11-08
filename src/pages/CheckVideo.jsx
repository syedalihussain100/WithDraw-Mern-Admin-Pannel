import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvideoId } from "../redux/features/payment/PaymentSlice";
import { useLocation } from "react-router-dom";
import { Card } from "@chakra-ui/react";
import CheckVideoStyle from "./CheckVideo.module.css";


const CheckVideo = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const pathname = location.pathname;
  const parts = pathname.split("/"); // Split pathname by '/'
  const id = parts[parts.length - 1];
  // console.log(id);

  useEffect(() => {
    dispatch(getvideoId(id));
  }, [dispatch]);

  const data = useSelector((state) => state?.payment?.getvideo?.video[0]);

  console.log(data);

  return (
    <div className={CheckVideoStyle.mainContainer}>
      <Card className={CheckVideoStyle.container}>
        <video  controls style={{height:"100%",width:"100%"}}>
          <source src={data?.url} type="video/mp4" />
        </video>
      </Card>
    </div>
  );
};

export default CheckVideo;
