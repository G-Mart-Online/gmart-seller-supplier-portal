import Image from "next/image";
import React from "react";
import SideImage from "../../assets/images/side-image.jpg";

const AuthSideImage = () => {
  return <Image src={SideImage} className="auth-side-img" alt="Side Image" />;
};

export default AuthSideImage;
