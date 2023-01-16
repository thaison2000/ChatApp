import axios from "axios";
interface userLoginInterface {
    email: string,
    password: string
}

interface userRegisterInterface {
    email: string,
    name: string,
    password: string,
    againPassword: string
}

export const APILogin = async (userLogin: userLoginInterface) => {
    try {

        const res = await axios.post(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/auth/login", userLogin);
        alert('Đăng nhập thành công')
        return {
            status: true,
            data: res.data
        }
    }
    catch (err:any) {
        if(err.response.data == 'Email is not found'){
            alert('Không tìm thấy Email')
            return {status: false}
        }
        if(err.response.data == 'Invalid Password'){
            alert('Sai mật khẩu')
            return {status: false}
        }
        if(err.response.data == '"password" length must be at least 3 characters long'){
            alert('Mật khẩu phải nhiều hơn bằng 3 kí tự')
            return {status: false}
        }
        if(err.response.data == '"email" must be a valid email'){
            alert('Sai định dạng mail')
            console.log('gg')
            return {status: false}
        }
        if(err.response.data == '"email" length must be at least 6 characters long'){
            alert('mail phải nhiều hơn bằng 6 kí tự')
            console.log('gg')
            return {status: false}
        }
    }
};

export const APIRegister = async (userRegister: userRegisterInterface) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER1_URL}`    + "/api/auth/register", userRegister);
        alert('Đăng ký tài khoản thành công')
        return {
            status: true,
            data: res.data
        }
    }
    catch (err:any) {
        if(err.response.data == 'Email already exist'){
            alert('Email đã tồn tại, sử dụng email khác')
            return {status: false}
        }
        if(err.response.data == 'Password is not matching'){
            alert('Mật khẩu không giống nhau, yêu cầu nhập lại')
            return {status: false}
        }
        if(err.response.data == '"password" length must be at least 3 characters long'){
            alert('Mật khẩu phải nhiều hơn bằng 3 kí tự')
            return {status: false}
        }
        if(err.response.data == '"name" length must be at least 3 characters long'){
            alert('Tên phải nhiều hơn bằng 3 kí tự')
            return {status: false}
        }
        if(err.response.data == '"email" must be a valid email'){
            alert('Sai định dạnh mail')
            console.log('gg')
            return {status: false}
        }
        if(err.response.data == '"email" length must be at least 6 characters long'){
            alert('mail phải nhiều hơn bằng 6 kí tự')
            console.log('gg')
            return {status: false}
        }
    }
};
