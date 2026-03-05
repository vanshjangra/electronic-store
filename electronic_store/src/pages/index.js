import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";

function Index(){
    function showSuccessToast(){
        console.log("Success toast")
        // toast.success("This is success message!");
        toast.warn("This is error message");
    }

    return (
        <Base title="Shop what you need" 
              description={'Welcome to Trending Store, We provide best items as you need.'} 
              buttonEnabled={true} 
              buttonText="Start Shopping" 
              buttonType="primary">

        <h1>Working on home page</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quasi dignissimos dicta qui obcaecati facere debitis repellat corporis veniam quas deserunt soluta dolorum veritatis id dolorem non beatae et, voluptate unde dolore consectetur rerum. Fuga enim impedit nisi explicabo quia aperiam vitae consequuntur ipsum recusandae ipsam. Sapiente cum iste esse.</p>
        <Button variant="success" onClick={showSuccessToast}>Toastify Success</Button>
        </Base>
    )
}

export default Index;