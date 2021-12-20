//用户名校验
function validateUsername() {
    const name = document.getElementById("username").value;
    const ErrorForUsername = document.getElementById("ErrorForUsername");
    if (name.length < 4) {
        ErrorForUsername.innerHTML = "用户名必须为4-16位字符，请重新填写";
        return false;
    } else {
        ErrorForUsername.innerHTML = "";
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const ErrorForPassword = document.getElementById("ErrorForPassword");

    if (password.length >= 6) {
        ErrorForPassword.innerHTML = "";
        return true;
    } else {
        ErrorForPassword.innerHTML = "密码不能少于6位";
        return false;
    }
}

function validatePhone() {
    const phone = document.getElementById("phone").value;

    const ErrorForPhone = document.getElementById("ErrorForPhone");
    if (phone.length !== 11) {
        ErrorForPhone.innerHTML = "请输入正确的手机号码";
        return false;
    } else {
        ErrorForPhone.innerHTML = "";
        return true;
    }
}

function validate() {
    if (validateUsername() && validatePassword() && validatePhone()) {
        return true;
    } else {
        return false;
    }
}