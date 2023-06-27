"use strict";

export const generateSrcSet = (imgPath) => {
    const lastdotPos = imgPath.lastIndexOf(".");
    const smallImgPath = imgPath.substring(0,lastdotPos) + "-small.jpg";
    const smallSrc = smallImgPath + " " + "300w";
    const largeSrc = imgPath + " " + "600w";
    const srcs = [smallSrc, largeSrc];
    return srcs.join(", ");
};

export const generateSizes = () => {
    const smallSize = "(max-width: 500px) 300px";
    const largeSize = "600px";
    const sizes = [smallSize, largeSize];
    return sizes.join(", ");
};