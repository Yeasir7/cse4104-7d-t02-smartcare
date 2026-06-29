import app from "./app";
import { envVars } from "./app/config/env";

const port = envVars.PORT;

// Start the server
const bootstrap = () =>{
    try{
        app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
        });
    }catch(error){
        console.log("failed to start the server", error);
    }
}
bootstrap()
