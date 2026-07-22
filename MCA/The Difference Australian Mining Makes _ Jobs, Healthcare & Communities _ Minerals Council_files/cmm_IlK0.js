/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var payload = [];
var journey, selected_country, base_url, ajax_url, share_url, donation_url;
var name, lastname, email, country, phone, postcode, state, validate_condition, validate_condition_msg, condition, comment, user_id, ori_phone;
var question_number, question, answer, last_question, flag, journey, send_journey_to_datacleancing;

const cookie_allow_status = getCookie('viewed_cookie_policy');

function getValidSource() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value.toLowerCase();
    });
    var source = vars["src"];

    var available_sources = [
        "fdfb",
        "fdtw",
        "fdgoogle",
        "fdedm",
        "fdnosoc",
        "fdtwsh",
        "fdfbsh",
        "fbdonate",
        "edm",
    ];
    var available_sources_range = [
        { "key": "fdfb", "start": 1, "finish": 1500 },
        { "key": "fdtw", "start": 1, "finish": 2 },
        { "key": "fdgoogle", "start": 1, "finish": 1500 },
        { "key": "fdedm", "start": 1, "finish": 2 },
        { "key": "fdnosoc", "start": 0, "finish": 0 },
        { "key": "fdtwsh", "start": 1, "finish": 3 },
        { "key": "fdfbsh", "start": 1, "finish": 3 },
        { "key": "fbdonate", "start": 0, "finish": 0 },
        { "key": "edm", "start": 0, "finish": 0 },
    ];
    var return_source = "fdnosoc";
    if (source !== undefined) {
        if (source.includes('#')) {//remove after #
            source = source.split('#')[0];
        }
        var sourceStr = source.match(/[a-zA-Z]+/g);
        var sourceNum = source.match(/\d+/g);
        if (sourceStr.length > 0) {
            var result = available_sources_range.filter(obj => {
                return obj.key === sourceStr[0];
            })
            if (result.length === 1) {
                var ob = result[0];
                if (ob.start == 0 && ob.finish == 0) {
                    return_source = source;
                }
                if (ob.start > 0 && ob.finish > 0) {
                    if (sourceNum[0] >= ob.start && sourceNum[0] <= ob.finish) {
                        return_source = source;
                    }
                }
            }
        }
    } else {
        if (available_sources.indexOf(source) !== -1) {
            return_source = source;
        }
    }
    return return_source;
}

function au_phone_formating(phone) {
    var e = phone;
    return "61" == (e = (e = (e = (e = e.replace(/\s/g, "")).replace(/\(/g, "")).replace(/\)/g, "")).replace(/\+61/g, "")).substring(0, 2) && (e = e.substring(2)), e
}

function nz_phone_formating(phone) {
    var r = phone;
    return "64" == (r = (r = (r = (r = r.replace(/\s/g, "")).replace(/\(/g, "")).replace(/\)/g, "")).replace(/\+64/g, "")).substring(0, 2) && (r = r.substring(2)), r
}

function uk_phone_formating(phone) {
    var result = phone;
    // Remove all spaces
    result = result.replace(/\s/g, '');
    // Remove all brackets
    result = result.replace(/\(/g, '');
    result = result.replace(/\)/g, '');
    return result;
}

function setCookie(cname, cvalue) {
    var newDate = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000));
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; expires=" + newDate.toUTCString() +"; path=/";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = document.cookie;
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie() {
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = "answered_quizes=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

function quiz_data_validation(first_name, last_name, email, postcode, agreement) {
    var error_obj = [];
    let country = 'Australia';

    if (typeof first_name != 'undefined' && (first_name !== null)) {
        first_name = first_name.trim();
        if (first_name == '') {
            error_obj.push({ "field": "input_first-name", "result": "Please enter your First name." });
        } else if (first_name.trim().length < 3) {
            error_obj.push({ "field": "input_first-name", "result": "The First name is too short!" });
        }
    } else {
        error_obj.push({ "field": "input_first-name", "result": "Invalid First name!" });
    }

     if (typeof last_name != 'undefined' && (last_name !== null)) {
        last_name = last_name.trim();
        if (last_name == '') {
            error_obj.push({ "field": "input_last-name", "result": "Please enter your Last name." });
        } else if (last_name.trim().length < 3) {
            error_obj.push({ "field": "input_last-name", "result": "The Last name is too short!" });
        }
    } else {
        error_obj.push({ "field": "input_last-name", "result": "Invalid Last name!" });
    }

    if (typeof email != 'undefined' && (email !== null)) {
        email = email.trim();
        if (email == '') {
            error_obj.push({ "field": "input_email", "result": "Please enter your email." });
        } else if (email.trim().length < 2) {
            error_obj.push({ "field": "input_email", "result": "Email is too short!" });
        } else {
            var emailReg = /^([\w-\.+]+@([\w-]+\.)+[\w-]{2,5})?$/;
            if (!emailReg.test(email)) {
                error_obj.push({ "field": "input_email", "result": "Invalid email!" });
            }
        }
    } else {
        error_obj.push({ "field": "input_email", "result": "Invalid email!" });
    }

    if (country.toLowerCase() == "international") {
        if (postcode.trim().length != 4) {
            error_obj.push({ "field": "input_post-code", "result": "Post Code is invalid!" });
        }
        var postcodeReg = /^[0-9]{3,5}$/;
        
        if (!postcodeReg.test(postcode)) {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        }

    }
    else {
        if (!isValidAustPostcode(postcode)) {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        }
    }

    if (!agreement) {
        error_obj.push({ "field": "input_iagree", "result": "You must agree to the terms and conditions." });
    }

    return error_obj;
}

function hys_validation(first_name, last_name, email, postcode, message) {
    var error_obj = [];
    let country = 'Australia';

    if (typeof first_name != 'undefined' && (first_name !== null)) {
        first_name = first_name.trim();
        if (first_name == '') {
            error_obj.push({ "field": "input_first-name", "result": "Please enter your First name." });
        } else if (first_name.trim().length < 3) {
            error_obj.push({ "field": "input_first-name", "result": "The First name is too short!" });
        }
    } else {
        error_obj.push({ "field": "input_first-name", "result": "Invalid First name!" });
    }

     if (typeof last_name != 'undefined' && (last_name !== null)) {
        last_name = last_name.trim();
        if (last_name == '') {
            error_obj.push({ "field": "input_last-name", "result": "Please enter your Last name." });
        } else if (last_name.trim().length < 3) {
            error_obj.push({ "field": "input_last-name", "result": "The Last name is too short!" });
        }
    } else {
        error_obj.push({ "field": "input_last-name", "result": "Invalid Last name!" });
    }

    if (typeof email != 'undefined' && (email !== null)) {
        email = email.trim();
        if (email == '') {
            error_obj.push({ "field": "input_email", "result": "Please enter your email." });
        } else if (email.trim().length < 2) {
            error_obj.push({ "field": "input_email", "result": "Email is too short!" });
        } else {
            var emailReg = /^([\w-\.+]+@([\w-]+\.)+[\w-]{2,5})?$/;
            if (!emailReg.test(email)) {
                error_obj.push({ "field": "input_email", "result": "Invalid email!" });
            }
        }
    } else {
        error_obj.push({ "field": "input_email", "result": "Invalid email!" });
    }

    if (country.toLowerCase() == "international") {
        if (postcode.trim().length != 4) {
            error_obj.push({ "field": "input_post-code", "result": "Post Code is invalid!" });
        }
        var postcodeReg = /^[0-9]{3,5}$/;
        
        if (!postcodeReg.test(postcode)) {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        }

    }
    else {
        //var postcodeReg = /^(?!0000)[0-9]{4}$/;
        // console.log("oopss");
        // console.log(postcodeReg.test(postcode))
        if (!isValidAustPostcode(postcode)) {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "input_post-code", "result": "Postcode is invalid!" });
        }
    }

    // Message validation: not empty, at least two words
    if (typeof message !== 'undefined' && message !== null) {
        message = message.trim();
        if (message === '') {
            error_obj.push({ "field": "input_message", "result": "Message cannot be empty!" });
        } else if (message.split(/\s+/).length < 2) {
            error_obj.push({ "field": "input_message", "result": "Message must contain at least two words!" });
        }
    } else {
        error_obj.push({ "field": "input_message", "result": "Invalid message!" });
    }


    return error_obj;
}

function isValidAustPostcode(postcode) {
       // Ensure it's a 4-digit number
    if (!/^\d{4}$/.test(postcode)) return false;

    const firstTwoDigits = parseInt(postcode.substring(0, 2));

    // Valid ranges by state/territory
    const validRanges = [
        { min: 2000, max: 2599 }, // NSW
        { min: 2619, max: 2898 }, // NSW
        { min: 2900, max: 2920 }, // ACT
        { min: 3000, max: 3999 }, // VIC
        { min: 4000, max: 4999 }, // QLD
        { min: 5000, max: 5799 }, // SA
        { min: 5800, max: 5999 }, // SA
        { min: 6000, max: 6797 }, // WA
        { min: 6800, max: 6999 }, // WA
        { min: 7000, max: 7799 }, // TAS
        { min: 7800, max: 7999 }, // TAS
        { min: 800, max: 999 },   // NT (3-digit postcodes like 0800–0999)
        { min: 2600, max: 2618 }, // ACT
    ];

    const postcodeNum = parseInt(postcode);

    // Check if postcode falls in any valid range
    for (let range of validRanges) {
        if (postcodeNum >= range.min && postcodeNum <= range.max) {
            return true;
        }
    }

    return false;
}

function subscriber_validation(first_name, last_name, email, postcode) {
    var error_obj = [];
    let country = 'Australia';

    if (typeof first_name != 'undefined' && (first_name !== null)) {
        first_name = first_name.trim();
        if (first_name == '') {
            error_obj.push({ "field": "first-name", "result": "Please enter your First name." });
        } else if (first_name.trim().length < 3) {
            error_obj.push({ "field": "first-name", "result": "The First name is too short!" });
        }
    } else {
        error_obj.push({ "field": "first-name", "result": "Invalid First name!" });
    }

     if (typeof last_name != 'undefined' && (last_name !== null)) {
        last_name = last_name.trim();
        if (last_name == '') {
            error_obj.push({ "field": "last-name", "result": "Please enter your Last name." });
        } else if (last_name.trim().length < 3) {
            error_obj.push({ "field": "last-name", "result": "The Last name is too short!" });
        }
    } else {
        error_obj.push({ "field": "last-name", "result": "Invalid Last name!" });
    }

    if (typeof email != 'undefined' && (email !== null)) {
        email = email.trim();
        if (email == '') {
            error_obj.push({ "field": "email", "result": "Please enter your email." });
        } else if (email.trim().length < 2) {
            error_obj.push({ "field": "email", "result": "Email is too short!" });
        } else {
            var emailReg = /^([\w-\.+]+@([\w-]+\.)+[\w-]{2,5})?$/;
            if (!emailReg.test(email)) {
                error_obj.push({ "field": "email", "result": "Invalid email!" });
            }
        }
    } else {
        error_obj.push({ "field": "email", "result": "Invalid email!" });
    }

    if (country.toLowerCase() == "international") {
        if (postcode.trim().length != 4) {
            error_obj.push({ "field": "post-code", "result": "Post Code is invalid!" });
        }
        var postcodeReg = /^[0-9]{3,5}$/;
        
        if (!postcodeReg.test(postcode)) {
            error_obj.push({ "field": "post-code", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "post-code", "result": "Postcode is invalid!" });
        }

    }
    else {
        //var postcodeReg = /^(?!0000)[0-9]{4}$/;
        // console.log("oopss");
        // console.log(postcodeReg.test(postcode))
        if (!isValidAustPostcode(postcode)) {
            error_obj.push({ "field": "post-code", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "post-code", "result": "Postcode is invalid!" });
        }
    }

    return error_obj;
}
