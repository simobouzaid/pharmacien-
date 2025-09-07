
import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div>
            <h3>register</h3>
            <Link to={'/login'} className=' text-2xl hover:underline transition duration-200'>login</Link>
        </div>
    );
};

export default Register;