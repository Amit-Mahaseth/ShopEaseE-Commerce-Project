import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3000", // Change to your API URL
	// You can add headers or other config here
});
// 

export default instance;
