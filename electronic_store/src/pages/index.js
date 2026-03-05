import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";
import { data } from "react-router-dom";

function Index(){
    function showSuccessToast(){
        console.log("Success toast")
        // toast.success("This is success message!");
        toast.warn("This is error message");
    }

    const getDataFromServer = () => {
        toast.info("Getting data from server");

        axios.get("http://localhost:9090/users")
             .then((response) => {
            console.log(response.data)
            toast.success("Request done")
        })
        .catch((error) => {
            console.log(error)
            toast.error("Something went wrong")
        });
    };

    return (
        <Base title="Shop what you need" 
              description={'Welcome to Trending Store, We provide best items as you need.'} 
              buttonEnabled={true} 
              buttonText="Start Shopping" 
              buttonType="primary">

        <h1>Working on home page</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quasi dignissimos dicta qui obcaecati facere debitis repellat corporis veniam quas deserunt soluta dolorum veritatis id dolorem non beatae et, voluptate unde dolore consectetur rerum. Fuga enim impedit nisi explicabo quia aperiam vitae consequuntur ipsum recusandae ipsam. Sapiente cum iste esse.</p>
        <Button variant="success" onClick={showSuccessToast}>Toastify Success</Button>

        <Button variant="primary" onClick={getDataFromServer}>Get data from Fake API</Button>
        </Base>
    )
}

export default Index;