import config from "@/config";
import axios from "axios";

const ax = axios.create({
  baseURL: `${config.api || "http://localhost:5000"}/api`,
  withCredentials: true,
});

export default ax;
