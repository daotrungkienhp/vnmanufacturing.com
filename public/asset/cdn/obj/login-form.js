/*
 * ===========================================================================================
 * auth
 * - require  auth.js
 * ===========================================================================================
 */
var net = net || {};

function showFormLogin(callback) {

    var util = net.util;

    var idContainer = "fr-" + random(9);
    var idLoginForm = "fr-" + random(9);

    var idUsername = "fr-" + random(9);
    var idPassword = "fr-" + random(9);

    var idContainerId = "fr-" + random(9);
    var idHost = "fr-" + random(9);

    var idError1 = "fr-" + random(9);
    var idError2 = "fr-" + random(9);
    var idSubmit = "fr-" + random(9);
    var idSuccess = "fr-" + random(9);


    var html = `
        <section id="${idContainer}" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: #f0f0f0;">
            <style type="text/css">
            h1 {
                margin: 0;
                padding: 0;
                font-size: 18px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.87);
                text-align: left;
            }

            h1 b,
            h1 strong {
                font-weight: 700;
            }

            input:focus::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                color: transparent;
            }

            input:focus::-moz-placeholder {
                /* Firefox 19+ */
                color: transparent;
            }

            input:focus:-ms-input-placeholder {
                /* IE 10+ */
                color: transparent;
            }

            input:focus:-moz-placeholder {
                /* Firefox 18- */
                color: transparent;
            }

            ::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                color: rgba(0, 0, 0, 0.54);
            }

            ::-moz-placeholder {
                /* Firefox 19+ */
                color: rgba(0, 0, 0, 0.54);
            }

            :-ms-input-placeholder {
                /* IE 10+ */
                color: rgba(0, 0, 0, 0.54);
            }

            :-moz-placeholder {
                /* Firefox 18- */
                color: rgba(0, 0, 0, 0.54);
            }

            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            textarea:-webkit-autofill,
            textarea:-webkit-autofill:hover,
            textarea:-webkit-autofill:focus,
            select:-webkit-autofill,
            select:-webkit-autofill:hover,
            select:-webkit-autofill:focus {
                border: none;
                border-bottom: 1px solid #F17923;
                -webkit-text-fill-color: inherit;
                -webkit-box-shadow: 0 0 0px 1000px #fff inset;
                transition: background-color 5000s ease-in-out 0s;
            }

            .form {
                margin: auto;
                margin-top: 15%;
                background: #ffffff;
                max-width: 415px;
                width: 415px;
                border-radius: 5px;
                box-shadow: 0 0 2px 0 rgba(0, 0, 0, .12), 0 1px 2px 0 rgba(0, 0, 0, .24);
                border: 1px solid rgba(255, 255, 255, .8);
                padding: 20px 25px 30px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                position: relative;
            }

            .form-title {}

            .form-title i {
                position: absolute;
                top: 7px;
                right: 7px;
                color: darkgray;
                font-weight: bold;
                cursor: pointer;
            }

            .form-body {
                padding: 0px 25px;
            }

            .success-form .account {
                display: inline-block;
                margin-top: 0;
            }

            .success-form .account p {
                color: #4caf50;
                font-weight: bold;
                font-size: 17px;
            }

            .account .submit {
                display: flex;
                justify-content: flex-end;
            }

            .account button.btn {
                color: #F17923;
                text-transform: uppercase;
                padding: 0;
                line-height: 1;
                background-color: transparent;
                display: table;
                border: none;
                border-radius: 20px;
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                font-size: 14px;
                text-align: center;
                cursor: pointer;
                outline: none;
                margin-top: 30px;
            }

            .account button.btn:hover,
            .account button.btn:focus {
                text-decoration: none;
            }

            div.terms {
                width: 420px;
                text-align: center;
                color: lightgray;
                font-size: 11px;
                margin: 20px auto;
            }

            div.terms a {
                color: rgba(0, 0, 0, 0.75);
                text-decoration: none;
                padding: 2px 5px;
                font-weight: 400;
            }

            label {
                display: block;
            }

            label.pass {
                margin-top: 29px;
            }

            .account {
                margin-top: 38px;
            }

            .account label p {
                font-size: 13px;
                color: rgba(0, 0, 0, 0.87);
                margin: 0 0 7px;
            }


            .input-value {
                font-family: 'Roboto', sans-serif;
                width: 100%;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                border: none;
                font-size: 13px;
                padding: 8px 0 4px;
                line-height: 1;
                border-radius: 0;
                text-align: left;
                background-color: transparent;
                outline: none;
                border-bottom: 1px solid #E0E0E0;
            }

            input.input-value:focus {
                border-bottom: 1px solid #F17923;
            }

            .error-msg {
                color: red;
                font-style: italic;
                font-size: 13px;
                text-align: right;
                margin: 0;
                padding: 0;
            }

            .error-msg p {
                color: red;
                margin-top: 15px;
            }

            .error-msg a {
                color: #117ace;
                cursor: pointer;
                font-style: italic;
            }

            .success-form {
                text-align: center;
                margin: 25px auto 0;
                display: table;
            }

            .success-form:before {
                display: inline-block;
                content: '';
                background-image: url(../img/success.svg);
                background-position: 0 0;
                background-repeat: no-repeat;
                background-size: 40px;
                width: 40px;
                height: 40px;
                position: relative;
                float: left;
            }
            </style>
            <div class="form">
                <div class="form-title">
                    <h1>Login to your account</h1>
                </div>
                <div id="${idLoginForm}" class="form-body login">
                    <div class="account">
                        <div>
                            <label class="user">
                                <p>Name or Email</p>
                                <input id="${idUsername}" class="input-value" type="text" placeholder="Name or email eg: john_does" />
                            </label>
                            <label class="pass">
                                <p>Password</p>
                                <input id="${idPassword}" class="input-value" type="password" placeholder="Your password" autocomplete="off" />
                            </label>
                        </div>
                        <div class="error-msg">
                            <p id="${idError1}" style="display: none;">Username is incorrect or invalid format</p>
                            <p id="${idError2}" style="display: none;">Login failure, please try again later</p>
                        </div>
                        <div class="submit">
                            <button id="${idSubmit}" class="btn">Login</button>
                        </div>
                    </div>
                </div>
                <div id="${idSuccess}" class="success-form" class="form-body" style="display: none;">
                    <div class="account">
                        <p>Login successful!</p>
                    </div>
                </div>
            </div>
            <div class="terms">
                <a href="/terms" target="blank">Terms</a>
                <small>|</small>
                <a href="/privacy-policy" target="blank">Privacy</a>
                <small>|</small>
                <a href="/forgotpassword">Forgot password</a>
                <small>|</small>
                <a href="/register">Register new</a>
            </div>
        </section>
    `;

    document.body.insertAdjacentHTML("afterbegin", html);


    var elementContainer = document.getElementById(idContainer);
    var elementLoginForm = document.getElementById(idLoginForm);
    var elementUsername = document.getElementById(idUsername);
    var elementPassword = document.getElementById(idPassword);

    var elementError1 = document.getElementById(idError1);
    var elementError2 = document.getElementById(idError2);

    var elementSubmit = document.getElementById(idSubmit);
    var elementSuccess = document.getElementById(idSuccess);


    elementPassword.onclick = function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            elementSubmit.click();
        }
    };

    elementSubmit.onclick = function() {
        doLogin();
    };


    function doLogin() {
        var userId = elementUsername.value.replace(/\+|\s/g, '');

        if (!userId) {
            elementError1.style.display = "block";
            return;
        }

        var str = elementPassword.value;

        if (str.indexOf(' ') > -1 || str.length < 6 || str.length > 32) {
            alert("Password length must be in range 6->32 character!");
            return;
        }

        var password = str.replace(/ /g, '');

        net.user.login(userId, password, (respon) => {
            if (respon.code === 0) {
                // show success
                elementLoginForm.style.display = 'none';
                elementSuccess.style.display = 'block';

                // hide form
                setTimeout(function() {
                    elementContainer.remove();
                    if (callback) {
                        callback();
                    }
                }, 1000);
            } else {
                // show error
                elementError2.style.display = "block";
            }
        });
    }

    function random(length) {
        var ran = '';
        var chat = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var leng = chat.length;
        for (var i = 0; i < length; i++) {
            ran += chat.charAt(Math.floor(Math.random() * leng));
        }
        return ran;
    }
}