import React, { useState } from "react";
import CreateStyle from "./Create.module.css";
import { Input, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { videoForm } from "../redux/features/payment/PaymentSlice";

const CreateVideo = () => {
  const [video, setVideo] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(video)
    try {
      const formData = new FormData();
      formData.append("video", video);
      console.log(formData.get("video"))

      dispatch(videoForm(formData))
  } catch (error) {
      console.log(error)
  }
  
  };

  return (
    <div className={CreateStyle.container}>
      <h1>Create Video</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          onChange={(e) => setVideo((prev) => e.target.files[0])}
          accept="video/*"
        />
        <button>SUBMIT VIDEO</button>
      </form>
    </div>
  );
};

export default CreateVideo;
