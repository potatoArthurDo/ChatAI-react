import Form from "../components/Form"
import { Link } from "react-router-dom"
function Login() {
    return (
        <div className="custom-dark-gradient h-[100vh] w-[100vw] flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold my-4">Login</h1>
        <Form route="/user/login" method="login" />
        
        </div>
    )
}
export default Login