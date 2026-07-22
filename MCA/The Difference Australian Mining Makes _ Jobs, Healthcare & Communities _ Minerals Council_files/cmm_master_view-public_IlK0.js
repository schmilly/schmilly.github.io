(function($) {
    'use strict';

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */

})(jQuery);

function removeErrors() {
    jQuery('.invalid-feedback').css('display', 'none');
}

function au_phone_formating(phone) {
    var e = phone;
    return "61" == (e = (e = (e = (e = e.replace(/\s/g, "")).replace(/\(/g, "")).replace(/\)/g, "")).replace(/\+61/g, "")).substring(0, 2) && (e = e.substring(2)), e
}

function registration_validation(firstname, lastname, email, phone, postcode, country, condition, validate_condition) {
    console.log('regis here');
    var error_obj = [];
    var input_country;
    if (typeof firstname != 'undefined' && (firstname !== null)) {
        firstname = firstname.trim();
        if (firstname == '') {
            error_obj.push({ "field": "firstname", "result": "First name is required!" });
        } else if (firstname.trim().length < 2) {
            error_obj.push({ "field": "firstname", "result": "First name is too short!" });
        }
    } else {
        error_obj.push({ "field": "firstname", "result": "First name is invalid!" });
    }
    if (typeof lastname != 'undefined' && (lastname !== null)) {
        lastname = lastname.trim();
        if (lastname == '') {
            error_obj.push({ "field": "lastname", "result": "Last name is required!" });
        } else if (lastname.trim().length < 2) {
            error_obj.push({ "field": "lastname", "result": "Last name is too short!" });
        }
    } else {
        error_obj.push({ "field": "lastname", "result": "Last name is invalid!" });
    }
    if (typeof email != 'undefined' && (email !== null)) {
        email = email.trim();
        if (email == '') {
            error_obj.push({ "field": "email", "result": "Email is required!" });
        } else if (email.trim().length < 2) {
            error_obj.push({ "field": "email", "result": "Email is too short!" });
        } else {
            var emailReg = /^([\w-\.+]+@([\w-]+\.)+[\w-]{2,5})?$/;
            if (!emailReg.test(email)) {
                error_obj.push({ "field": "email", "result": "Email is invalid!" });
            }
        }
    } else {
        error_obj.push({ "field": "email", "result": "Email is invalid!" });
    }
    if (typeof country != 'undefined' && (country !== null)) {
        country = country.trim();
        if (country == '') {
            error_obj.push({ "field": "country", "result": "Country is required!" });
        } else if (country.trim().length < 2) {
            error_obj.push({ "field": "country", "result": "Country is too short!" });
        } else {
            if (typeof postcode != 'undefined' && (postcode !== null)) {
                postcode = postcode.trim();
                if (postcode == '') {
                    error_obj.push({ "field": "postcode", "result": "Postcode is required!" });
                } else if (postcode.trim().length < 3) {
                    error_obj.push({ "field": "postcode", "result": "Postcode is too short!" });
                } else {

                    var postcodeReg = /^[0-9]*$/;
                    if (!postcodeReg.test(postcode)) {
                        error_obj.push({ "field": "postcode", "result": "Postcode should be a number!" });
                    }

                    // if (country.toLowerCase() == "canada") {

                    //     if (postcode.trim().length == 3) {
                    //         var postcodeReg = /^[0-9a-zA-Z]{3}$/;
                    //         if (!postcodeReg.test(postcode)) {
                    //             error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
                    //         }
                    //     } else if (postcode.trim().length == 7) {
                    //         var postcodeReg = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
                    //         if (!postcodeReg.test(postcode)) {
                    //             error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
                    //         }
                    //     } else {
                    //         error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
                    //     }
                    //     // console.log("oopss");
                    //     // console.log(postcodeReg.test(postcode))

                    // }
                    // else if (country.toLowerCase() != "international") {
                    //     if (postcode.trim().length < 5) {
                    //         error_obj.push({ "field": "postcode", "result": "Zipcode is invalid!" });
                    //     }
                    //     var postcodeReg = /^[0-9]{3,5}$/;
                    //     console.log("oopss");
                    //     console.log(postcodeReg.test(postcode))
                    //     if (!postcodeReg.test(postcode)) {
                    //         error_obj.push({ "field": "postcode", "result": "Zipcode is invalid!" });
                    //     } else if (postcode === '0000') {
                    //         error_obj.push({ "field": "postcode", "result": "Zipcode is invalid!" });
                    //     }
                    // }
                }
            } else {
                error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
            }
            if (typeof phone != 'undefined' && (phone !== null)) {
                phone = phone.trim();
                if (phone == '') {
                    //error_obj.push({ "field": "phone", "result": "Phone is required!" });
                } else if (phone.trim().length < 2) {
                    error_obj.push({ "field": "phone", "result": "Phone is too short!" });
                } else {
                    if (country.toLowerCase() === "australia") {
                        input_country = "AU";
                        phone = au_phone_formating(phone);
                        var phoneReg = /^(\d{8}|\d{9}|\d{10})$/;
                        if (!phoneReg.test(phone)) {
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        } else {
                            if (phone.length == 8) {
                                var postcode_map = [
                                    [1000, 1999, "NSW"],
                                    [2000, 2599, "NSW"],
                                    [2619, 2899, "NSW"],
                                    [2921, 2999, "NSW"],
                                    [200, 299, "ACT"],
                                    [2600, 2618, "ACT"],
                                    [2900, 2920, "ACT"],
                                    [3000, 3999, "VIC"],
                                    [8000, 8999, "VIC"],
                                    [9000, 9999, "QLD"],
                                    [4000, 4999, "QLD"],
                                    [5000, 5799, "SA"],
                                    [5800, 5999, "SA"],
                                    [6000, 6797, "WA"],
                                    [6800, 6999, "WA"],
                                    [7000, 7799, "TAS"],
                                    [7800, 7999, "TAS"],
                                    [800, 899, "NT"],
                                    [900, 999, "NT"]
                                ];
                                var state_areacode_map = [
                                    ["NSW", "02"],
                                    ["ACT", "02"],
                                    ["VIC", "03"],
                                    ["TAS", "03"],
                                    ["QLD", "07"],
                                    ["WA", "08"],
                                    ["SA", "08"],
                                    ["NT", "08"]
                                ];
                                var postcode_int = parseInt(postcode);
                                for (i = 0; i < postcode_map.length; i++) {
                                    var element = postcode_map[i];
                                    var lower_bound = element[0];
                                    var upper_bound = element[1];
                                    var mapped_state = element[2];
                                    if (postcode_int >= lower_bound && postcode_int <= upper_bound) {
                                        state = mapped_state;
                                    }
                                }
                                if (state != "") {
                                    for (i = 0; i < state_areacode_map.length; i++) {
                                        var element = state_areacode_map[i];
                                        var mapped_state = element[0];
                                        var mapped_areacode = element[1];
                                        if (state == mapped_state) {
                                            phone = mapped_areacode + phone;
                                        }
                                    }
                                }
                            } else if (phone.length == 9) {
                                phone = "0" + phone;
                            }
                        }
                    } else if (country.toLowerCase() === "united kingdom") {
                        input_country = "GB";
                        phone = uk_phone_formating(phone);
                        var regExp = /[a-zA-Z]/g;
                        var testString = phone;
                        var noLetters = true;
                        if (regExp.test(testString)) {
                            noLetters = false;
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        }
                        if (phone != '' && noLetters) {
                            var reg3 = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
                            var numb = phone.match(/\d/g);
                            numb = numb.join("");
                            if (numb.startsWith("44")) {
                                numb = '+' + numb;
                                phone = '+' + phone;
                            }
                            if (!reg3.test(numb)) {
                                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                            }
                        }
                    } else if (country.toLowerCase() === "united status") {
                        input_country = "US";

                    } else if (country.toLowerCase() === "canada") {
                        input_country = "US";

                    } else if (country.toLowerCase() === "new zealand") {
                        input_country = "NZ";
                        phone = nz_phone_formating(phone);
                        var first_digits = phone.substring(0, 3);
                        var digitsForMobile = ['03', '04', '06', '07', '09'];
                        var lengthForLand = [9, 10, 11];
                        if (first_digits == "+64") {
                            var phoneWithoutCC = phone.substring(3);
                            first_digits = phoneWithoutCC.substring(0, 2)
                        } else {
                            phoneWithoutCC = phone;
                        }
                        var firstDigitsZero = first_digits.substring(0, 1);
                        if (firstDigitsZero != "0") {
                            first_digits = "0" + firstDigitsZero;
                            phoneWithoutCC = "0" + phoneWithoutCC;
                        } else {
                            first_digits = phoneWithoutCC.substring(0, 2);
                        }
                        if (first_digits == "02") {
                            if (!lengthForLand.includes(phoneWithoutCC.length)) {
                                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                            }
                        } else if (digitsForMobile.includes(first_digits)) {
                            if (phoneWithoutCC.length != 9) {
                                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                            }
                        } else {
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        }
                    } else if (country.toLowerCase() === "south africa") {
                        input_country = "ZA";

                    } else if (country.toLowerCase() === "ca") {
                        input_country = "CA";
                        phone = ca_phone_formating(phone);
                        var regExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g;
                        var testString = phone;
                        var noLetters = true;
                        if (regExp.test(testString)) {
                            noLetters = false;
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        }

                    } else if (country.toLowerCase() === "international") {

                    } else {
                        error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                    }
                    if (country.toLowerCase() !== "international") {
                        var libpn = new libphonenumber.parsePhoneNumber(phone, input_country);
                        if (!libpn.isValid()) {
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        } else {
                            phone = libpn.number;
                        }
                    }
                }
            } else {
                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
            }
        }
    } else {
        error_obj.push({ "field": "country", "result": "Country is invalid!" });
    }
    if (validate_condition) {
        if (typeof condition == 'undefined' || (condition == null)) {
            if (typeof validate_condition_msg == 'undefined' || (validate_condition_msg == null)) {
                validate_condition_msg = "Condition is invalid!";
            }
            error_obj.push({ "field": "condition", "result": validate_condition_msg });
        }
    }
    return error_obj;
}

function hys_validation(firstname, email, phone, postcode, country, condition, validate_condition) {
    var error_obj = [];
    var input_country;
    if (typeof firstname != 'undefined' && (firstname !== null)) {
        firstname = firstname.trim();
        if (firstname == '') {
            error_obj.push({ "field": "firstname", "result": "Name is required!" });
        } else if (firstname.trim().length < 2) {
            error_obj.push({ "field": "firstname", "result": "Name is too short!" });
        }
    } else {
        error_obj.push({ "field": "firstname", "result": "Name is invalid!" });
    }
    if (typeof email != 'undefined' && (email !== null)) {
        email = email.trim();
        if (email == '') {
            error_obj.push({ "field": "email", "result": "Email is required!" });
        } else if (email.trim().length < 2) {
            error_obj.push({ "field": "email", "result": "Email is too short!" });
        } else {
            var emailReg = /^([\w-\.+]+@([\w-]+\.)+[\w-]{2,5})?$/;
            if (!emailReg.test(email)) {
                error_obj.push({ "field": "email", "result": "Email is invalid!" });
            }
        }
    } else {
        error_obj.push({ "field": "email", "result": "Email is invalid!" });
    }
    if (typeof country != 'undefined' && (country !== null)) {
        country = country.trim();
        if (country == '') {
            error_obj.push({ "field": "country", "result": "Country is required!" });
        } else if (country.trim().length < 2) {
            error_obj.push({ "field": "country", "result": "Country is too short!" });
        } else {
            if (typeof postcode != 'undefined' && (postcode !== null)) {
                postcode = postcode.trim();
                if (postcode == '') {
                    error_obj.push({ "field": "postcode", "result": "Postcode is required!" });
                } else if (postcode.trim().length < 4) {
                    error_obj.push({ "field": "postcode", "result": "Postcode is too short!" });
                }

                var postcodeReg = /^[0-9]*$/;
                if (!postcodeReg.test(postcode)) {
                    error_obj.push({ "field": "postcode", "result": "Postcode should be a number!" });
                }

            } else {
                error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
            }
            if (typeof phone != 'undefined' && (phone !== null)) {
                phone = phone.trim();
                if (phone == '') {
                    //error_obj.push({ "field": "phone", "result": "Phone is required!" });
                } else if (phone.trim().length < 2) {
                    error_obj.push({ "field": "phone", "result": "Phone is too short!" });
                } else {
                    if (country.toLowerCase() === "australia") {
                        input_country = "AU";
                        phone = au_phone_formating(phone);
                        var phoneReg = /^(\d{8}|\d{9}|\d{10})$/;
                        if (!phoneReg.test(phone)) {
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        } else {
                            if (phone.length == 8) {
                                var postcode_map = [
                                    [1000, 1999, "NSW"],
                                    [2000, 2599, "NSW"],
                                    [2619, 2899, "NSW"],
                                    [2921, 2999, "NSW"],
                                    [200, 299, "ACT"],
                                    [2600, 2618, "ACT"],
                                    [2900, 2920, "ACT"],
                                    [3000, 3999, "VIC"],
                                    [8000, 8999, "VIC"],
                                    [9000, 9999, "QLD"],
                                    [4000, 4999, "QLD"],
                                    [5000, 5799, "SA"],
                                    [5800, 5999, "SA"],
                                    [6000, 6797, "WA"],
                                    [6800, 6999, "WA"],
                                    [7000, 7799, "TAS"],
                                    [7800, 7999, "TAS"],
                                    [800, 899, "NT"],
                                    [900, 999, "NT"]
                                ];
                                var state_areacode_map = [
                                    ["NSW", "02"],
                                    ["ACT", "02"],
                                    ["VIC", "03"],
                                    ["TAS", "03"],
                                    ["QLD", "07"],
                                    ["WA", "08"],
                                    ["SA", "08"],
                                    ["NT", "08"]
                                ];
                                var postcode_int = parseInt(postcode);
                                for (i = 0; i < postcode_map.length; i++) {
                                    var element = postcode_map[i];
                                    var lower_bound = element[0];
                                    var upper_bound = element[1];
                                    var mapped_state = element[2];
                                    if (postcode_int >= lower_bound && postcode_int <= upper_bound) {
                                        state = mapped_state;
                                    }
                                }
                                if (state != "") {
                                    for (i = 0; i < state_areacode_map.length; i++) {
                                        var element = state_areacode_map[i];
                                        var mapped_state = element[0];
                                        var mapped_areacode = element[1];
                                        if (state == mapped_state) {
                                            phone = mapped_areacode + phone;
                                        }
                                    }
                                }
                            } else if (phone.length == 9) {
                                phone = "0" + phone;
                            }
                        }
                    } else if (country.toLowerCase() === "united kingdom") {
                        input_country = "GB";
                        phone = uk_phone_formating(phone);
                        var regExp = /[a-zA-Z]/g;
                        var testString = phone;
                        var noLetters = true;
                        if (regExp.test(testString)) {
                            noLetters = false;
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        }
                        if (phone != '' && noLetters) {
                            var reg3 = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
                            var numb = phone.match(/\d/g);
                            numb = numb.join("");
                            if (numb.startsWith("44")) {
                                numb = '+' + numb;
                                phone = '+' + phone;
                            }
                            if (!reg3.test(numb)) {
                                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                            }
                        }
                    } else if (country.toLowerCase() === "united status") {
                        input_country = "US";

                    } else if (country.toLowerCase() === "canada") {
                        input_country = "US";

                    } else if (country.toLowerCase() === "new zealand") {
                        input_country = "NZ";
                        phone = nz_phone_formating(phone);
                        var first_digits = phone.substring(0, 3);
                        var digitsForMobile = ['03', '04', '06', '07', '09'];
                        var lengthForLand = [9, 10, 11];
                        if (first_digits == "+64") {
                            var phoneWithoutCC = phone.substring(3);
                            first_digits = phoneWithoutCC.substring(0, 2)
                        } else {
                            phoneWithoutCC = phone;
                        }
                        var firstDigitsZero = first_digits.substring(0, 1);
                        if (firstDigitsZero != "0") {
                            first_digits = "0" + firstDigitsZero;
                            phoneWithoutCC = "0" + phoneWithoutCC;
                        } else {
                            first_digits = phoneWithoutCC.substring(0, 2);
                        }
                        if (first_digits == "02") {
                            if (!lengthForLand.includes(phoneWithoutCC.length)) {
                                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                            }
                        } else if (digitsForMobile.includes(first_digits)) {
                            if (phoneWithoutCC.length != 9) {
                                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                            }
                        } else {
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        }
                    } else if (country.toLowerCase() === "south africa") {
                        input_country = "ZA";

                    } else if (country.toLowerCase() === "ca") {
                        input_country = "CA";
                        phone = ca_phone_formating(phone);
                        var regExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g;
                        var testString = phone;
                        var noLetters = true;
                        if (regExp.test(testString)) {
                            noLetters = false;
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        }

                    } else if (country.toLowerCase() === "international") {

                    } else {
                        error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                    }
                    if (country.toLowerCase() !== "international") {
                        var libpn = new libphonenumber.parsePhoneNumber(phone, input_country);
                        if (!libpn.isValid()) {
                            error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
                        } else {
                            phone = libpn.number;
                        }
                    }
                }
            } else {
                error_obj.push({ "field": "phone", "result": "Phone is invalid!" });
            }
        }
    } else {
        error_obj.push({ "field": "country", "result": "Country is invalid!" });
    }
    if (validate_condition) {
        if (typeof condition == 'undefined' || (condition == null)) {
            if (typeof validate_condition_msg == 'undefined' || (validate_condition_msg == null)) {
                validate_condition_msg = "Condition is invalid!";
            }
            error_obj.push({ "field": "condition", "result": validate_condition_msg });
        }
    }

    //video validation
    //var hys_file_input = document.getElementById("video_upload-cmm-have-your-say");
    //var hys_video_file = hys_file_input.files[0];

    var hys_all_files_input = $('#file_upload_cmm_have_your_say').prop('files');

    var hys_file_allowed_ext = ["mp4", "x-matroska", "webm", "quicktime", "x-m4v", "x-msvideo", "pdf", "jpeg", "png", "jpg"];
    var hys_file_max_size = 209715200;

    if (hys_all_files_input.length <= 2) {

        if (hys_all_files_input != null || hys_all_files_input != "" || hys_all_files_input != 'undefined') {

            for (var i = 0; i < hys_all_files_input.length; i++) {
                var hys_file_name = hys_all_files_input[i].name;
                var hys_file_size = hys_all_files_input[i].size;
                var hys_file_type = hys_all_files_input[i].type;

                var file_real_index = i + 1;

                console.log('hys_file_name ' + file_real_index + ' - ' + hys_file_name);
                console.log('hys_file_size ' + file_real_index + ' - ' + hys_file_size);
                console.log('hys_file_type ' + file_real_index + ' - ' + hys_file_type);

                if (hys_file_max_size < hys_file_size) {
                    // error_obj.push({"field": "video_size", "result": "File size limit (10MB) is exceeded ("+hys_file_name+")"});
                    error_obj.push({ "field": "video_size", "result": "File size limit (200MB) is exceeded" });
                    console.log("File size limit (200MB) is exceeded on " + hys_file_name);
                }

                if (!hys_file_allowed_ext.includes(hys_file_type.split("/")[1])) {
                    error_obj.push({ "field": "video_type", "result": "Invalid file type, only videos, images and PDFs are allowed." });
                    console.log("Invalid file type on " + hys_file_name);
                }
            }
        }
    } else {
        error_obj.push({ "field": "file_count", "result": "A maximum of 2 files are allowed!" });
    }

    //end video validation
    return error_obj;
}

function getValidSource() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
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
        "donate",
    ];
    var available_sources_range = [
        { "key": "fdfb", "start": 1, "finish": 1500 },
        { "key": "fdtw", "start": 1, "finish": 2 },
        { "key": "fdgoogle", "start": 1, "finish": 1500 },
        { "key": "fdedm", "start": 1, "finish": 2 },
        { "key": "fdnosoc", "start": 0, "finish": 0 },
        { "key": "fdtwsh", "start": 1, "finish": 3 },
        { "key": "fdfbsh", "start": 1, "finish": 3 },
        { "key": "donate", "start": 0, "finish": 0 },
    ];
    var return_source = "fdnosoc";
    if (source !== undefined) {
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