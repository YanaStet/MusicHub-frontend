import { Cloudinary } from "@cloudinary/url-gen/instance/Cloudinary";
import { CLOUDNAME } from "../utils/constants";

export const cld = new Cloudinary({ cloud: { cloudName: CLOUDNAME } });
