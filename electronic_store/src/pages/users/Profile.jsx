import { Alert, Col, Container, Row } from "react-bootstrap"
import UserProfileView from "../../components/users/UserProfileView"
import { useContext, useEffect, useState } from "react"
import UserContext from '../../context/UserContext'
import { toast } from "react-toastify"
import { getUser } from "../../services/user.service"
import { useParams } from "react-router-dom"

const Profile = () => {
    const userContext = useContext(UserContext)
    const {userId} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // console.log("Data from url userid " + userId)

        // if(userContext.userData){
        //     getUserDataFromServer()
        // }

        getUserDataFromServer()
        
    }, [])

    const getUserDataFromServer = () => {
        console.log(userContext)

        getUser(userId)
        .then(data => {
            console.log(data);
            setUser(data)
        })
        .catch(error => {
            console.log(error);
            setUser(null)
            toast.error("Error in loading user information from server!")
        })
    }

    return (
        <div>
            <Container className="mt-3">
            <Row>
             <Col md={
                {
                    span: 8,
                    offset: 2
                }
             }>
              
              {(user ? (
              <UserProfileView user = {
                // {
                // name: "Vansh Jangra",
                // email: "vanshjangra@gmail.com",
                // gender: "Male",
                // about: "I am admin user",
                // roles: [{roleId: 1, roleName: "Admin"}, {roleId: 2, roleName: "Normal"}]
                // }
                user
              }/>
              ) : <Alert><h3 className="text-center text-uppercase m-2">User not loaded from server!</h3></Alert>)}

              {/* {userContext.userData.user.userId} */}

             </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Profile