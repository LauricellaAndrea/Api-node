import cors from "cors";

export function initCorsMiddleware(){
    //cors options: allow only this web page to make a request to out API
  const corsOptions = {
    origin: "http://localhost:8080",
    credentials: true,
   };

   return cors(corsOptions);
}