export const QUESTIONS_SERVICE = process.env.REACT_APP_ENV === "PROD" ? 
"https://question-service-313275155433.asia-southeast1.run.app" : "http://localhost:3001";

export const USER_SERVICE = process.env.REACT_APP_ENV === "PROD" ?
"https://user-service-313275155433.asia-southeast1.run.app" : "http://localhost:3002";

export const NOTIFICATION_SERVICE = process.env.REACT_APP_ENV === "PROD" ?
"https://notification-service-313275155433.asia-southeast1.run.app" : "http://localhost:5000";

export const MATCHING_SERVICE = process.env.REACT_APP_ENV === "PROD" ?
"https://matching-service-313275155433.asia-southeast1.run.app" : "http://localhost:5001";

export const COLLABORATION_SERVICE = process.env.REACT_APP_ENV === "PROD" ?
"wss://collaboration-service-313275155433.asia-southeast1.run.app" : "ws://localhost:5002";

export const HTTP_COLLABORATION_SERVICE = process.env.REACT_APP_ENV === "PROD" ?
"https://collaboration-service-313275155433.asia-southeast1.run.app" : "http://localhost:5002";

export const AICHATBOT_SERVICE = process.env.REACT_APP_ENV === "PROD" ?
"https://aichatbot-service-313275155433.asia-southeast1.run.app" : "http://localhost:5003";
