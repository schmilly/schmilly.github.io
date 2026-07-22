/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

jQuery(document).ready(function () {


    if (navigator.platform.match('Mac') !== null) {
        jQuery('body').addClass('OSX');
    }

    // Progressively enhanced infinite horizontal scroll
    const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }


    /**
    * Hides all validation error messages on the form.
    *
    * This function selects all elements with the class `.invalid-feedback`
    * and sets their display property to `none`, effectively removing them
    * from view without deleting them from the DOM.
    *
    * Typically called before re-validating or resetting a form.
    */
    function removeErrors() {
        jQuery('.invalid-feedback').css('display', 'none');
    }

    function clearAllCookies() {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

    /**
     * Clears all UTM-related cookies from the browser.
     *
     * This function removes stored campaign tracking data (utm_source, utm_medium,
     * utm_campaign, utm_content) by setting their expiration date to a past date,
     * effectively deleting them.
     *
     * Used to ensure that outdated or irrelevant marketing attribution data
     * does not persist when no UTM parameters are present in the current URL.
     */

    function clearUTMCookies() {
        const utmCookies = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

        utmCookies.forEach(function (name) {
            deleteCookie(name);
        });
    }

    clearUTMCookies();

    let urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get('utm_source');
    let utmMedium = urlParams.get('utm_medium');
    let utmCampaign = urlParams.get('utm_campaign');
    let utmContent = urlParams.get('utm_content');

    //Set cookies for UTM parameters
    if (utmSource || utmMedium || utmCampaign || utmContent) {
        if (utmSource) {
            setCookie('utm_source', utmSource);
        }
        if (utmMedium) {
            setCookie('utm_medium', utmMedium);
        }
        if (utmCampaign) {
            setCookie('utm_campaign', utmCampaign);
        }
        if (utmContent) {
            setCookie('utm_content', utmContent);
        }
    }

    /**
    * Handles "Quiz" form functionality.
    *
    * This block runs only if one or more elements with the class
    * `.take-the-quiz__container_quiz-form` exist on the page.
    *
    * Responsibilities:
    * - Validates user inputs (name, email, postcode) on input/change.
    * - Validates quiz inputs on input/change.
    * - Dynamically enables or disables the submit button based on validation state.
    * - Submits the form data asynchronously via WordPress AJAX.
    * - Displays a success or error feedback based on the response.
    */

    //quiz
    if (jQuery('.take-the-quiz__container_quiz-form').length) {

        jQuery('.take-the-quiz__container_quiz-form').each(function () {
            var hysForm = jQuery(this);
            var validationTimer = null; // debounce timer

            hysForm.find('input[type="radio"]').on('change', function () {
                toggleNextButton(hysForm);
            });

            async function toggleNextButton(form) {
                const result = await validateAnswerFields(form);

                let active_quiz = form.find('.take-the-quiz__container_quiz:visible');
                let button = active_quiz.find('.take-the-quiz__container_quiz-card_quiz_q-next-button');


                if (result && result.isValid) {
                    button.removeClass('pe-none');
                    let active_question_index = active_quiz.data('question-index');
                } else {
                    button.addClass('pe-none');
                }
            }

            function validateAnswerFields(form) {
                return new Promise(function (resolve) {
                    removeErrors();

                    let active_question_index = form.find('.take-the-quiz__container_quiz:visible').data('question-index');

                    var answer = form.find('input[name="take-the-quiz__q' + active_question_index + '_choice"]:checked').val();
                    var correct_answer = form.find('.take-the-quiz__q' + active_question_index + '_correct_answer').val();

                    form.find('.take-the-quiz__container_quiz .take-the-quiz__container_quiz-card_quiz_q-wrapper_radio-contain').removeClass('correct-answer wrong-answer');

                    form.find('#take-the-quiz__q' + active_question_index + '_wrapper').addClass('pe-none');

                    if (answer) {

                        setCookie('q' + active_question_index + '_response', answer);

                        // Find the checked input
                        let selected_choice = form.find('input[name="take-the-quiz__q' + active_question_index + '_choice"]:checked');

                        // Find its wrapper (label container)
                        let radio_wrapper = selected_choice.closest('.take-the-quiz__container_quiz-card_quiz_q-wrapper_radio-contain');

                        if (answer === correct_answer) {
                            setCookie('q' + active_question_index + '_correct', true);
                            radio_wrapper.addClass('correct-answer');
                        } else {
                            setCookie('q' + active_question_index + '_correct', false);
                            radio_wrapper.addClass('wrong-answer');
                            let correct_radio_wrapper = form.find('.take-the-quiz__container_quiz-card_quiz_q-wrapper_radio-contain[data-answer="' + correct_answer + '"]');
                            correct_radio_wrapper.addClass('correct-answer');
                        }

                        return resolve({
                            isValid: true
                        });

                    } else {
                        form.find('.take-the-quiz__q' + active_question_index + '_choice_label_error').show().text('Please select a choice');
                        return resolve({
                            isValid: false
                        });
                    }
                });
            }

            hysForm.find(".take-the-quiz__container_quiz-card_quiz_q-next-button").on('click', function (e) {
                e.preventDefault();

                let active_quiz = hysForm.find('.take-the-quiz__container_quiz:visible');
                let active_question_index = active_quiz.data('question-index');

                // move to next question
                active_quiz.hide();

                let next_question_index = active_question_index + 1;
                let next_quiz = hysForm.find('.take-the-quiz__container_quiz[data-question-index="' + next_question_index + '"]');

                if (next_quiz.length) {
                    next_quiz.show();
                } else {
                    let dataCollectionDiv = jQuery('.take-the-quiz__container_data-collection');
                    dataCollectionDiv.addClass('show');
                    // Trigger focus on first input to prompt autofill
                    let firstInput = dataCollectionDiv.find('input:first');
                    firstInput.trigger('focus');
                    firstInput.trigger('blur'); // blur ensures autofill suggestions appear
                }
            });

        });
    }

    if (jQuery('.take-the-quiz__container_quiz-card_quiz_thankyou-form').length) {

        jQuery('.take-the-quiz__container_quiz-card_quiz_thankyou-form').each(function () {

            var thankYouForm = jQuery(this);
            var quiz_form = jQuery('#take-the-quiz__form');

            var validationTimer = null; // debounce timer
            let isResettingForm = false;
            let isSubmitting = false;

            var container = thankYouForm.closest('.take-the-quiz__container');
            var dataCollectionDiv = container.find('.take-the-quiz__container_data-collection');
            var quizForm = container.find('.take-the-quiz__container_quiz-form');

            // on input/change for text fields
            thankYouForm.find('input, textarea').on('input change', function () {
                if (isSubmitting || isResettingForm) return;

                clearTimeout(validationTimer); // reset debounce
                validationTimer = setTimeout(async function () {
                    await toggleSubmitButton(thankYouForm);
                }, 800); // validate 800ms after last keystroke
            });

            async function toggleSubmitButton(form) {
                const result = await validateFormFields(form);
                var button = form.find('#take-the-quiz__submit-button');
                if (result && result.isValid) {
                    button.removeClass('pe-none');
                } else {
                    button.addClass('pe-none');
                }
            }

            function validateFormFields(form) {
                return new Promise(function (resolve) {

                    if (isSubmitting || isResettingForm) {
                        return resolve({ isValid: true });
                    }

                    removeErrors();

                    let first_name = form.find('.take-the-quiz__container_quiz-card_quiz_thankyou_first-name').val();
                    let last_name = form.find('.take-the-quiz__container_quiz-card_quiz_thankyou_last-name').val();
                    let email = form.find('.take-the-quiz__container_quiz-card_quiz_thankyou_email').val();
                    let postcode = form.find('.take-the-quiz__container_quiz-card_quiz_thankyou_postcode').val();
                    let agreement = form.find('.take-the-quiz__container_quiz-card_form-check-input').is(':checked');

                    var result = quiz_data_validation(first_name, last_name, email, postcode, agreement)

                    if (result.length != 0) {
                        lastValidatedEmailSuccess = '';
                        if (!isResettingForm) {
                            for (var co = 0; co < result.length; co++) {
                                form.find('.take-the-quiz__container_quiz-card_quiz_thankyou_' + result[co].field + '_label_error').show().text(result[co].result);
                            }
                        }
                        return resolve({ isValid: false });
                    } else {
                        return resolve({ isValid: true });
                    }
                });
            }

            // submit button click — scope to this form so handlers don't multiply
            thankYouForm.find("#take-the-quiz__submit-button").on('click', async function (e) {
                e.preventDefault();
                removeErrors();

                var thankSubmitButton = jQuery(this);

                const validation = await validateFormFields(thankYouForm);
                if (!validation.isValid) return;

                let first_name = thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_thankyou_first-name').val();
                let last_name = thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_thankyou_last-name').val();
                let email = thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_thankyou_email').val();
                let postcode = thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_thankyou_postcode').val();

                let pageID = quiz_form.find('.signup__input_page-id').val();
                let pageTitle = quiz_form.find('.signup__input_page-title').val();
                let pageUrl = quiz_form.find('.signup__input_page-url').val();
                let form_name = "Quiz";

                var post_url = cmm_script.ajaxurl;
                var params = { first_name, last_name, email, postcode, pageID, pageTitle, pageUrl, form_name, nonce: cmm_script.quiz_nonce, action: "cmm_save_quiz_form" };

                removeErrors();
                jQuery.ajax({
                    type: 'POST',
                    datatype: 'JSON',
                    url: post_url,
                    data: params,
                    beforeSend: function () {
                        thankSubmitButton.addClass('pe-none');
                        thankSubmitButton.find('.quiz_thankyou__submit_loader').show();
                    },
                    success: function (data) {
                        thankSubmitButton.removeClass('pe-none');
                        thankSubmitButton.find('.quiz_thankyou__submit_loader').hide();

                        var response_data = JSON.parse(data);

                        if (response_data.response === 'success') {
                            isResettingForm = true;
                            thankYouForm[0].reset();
                            thankSubmitButton.addClass('pe-none');
                            removeErrors();
                            setTimeout(() => { isResettingForm = false; }, 300);
                            thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_return-message').show().addClass('form_success').text('Thank you for completing the quiz!');
                            //fadeout message after 3 seconds
                            setTimeout(function () {
                                thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_return-message').fadeOut();
                                //enable re-taking the quiz
                                dataCollectionDiv.removeClass('show');
                                quizForm.fadeIn();
                                quizForm.find('.take-the-quiz__container_quiz[data-question-index="1"]').fadeIn();
                                container.find('.take-the-quiz__container_quiz-card_quiz_q-wrapper_radio-wrapper').removeClass('pe-none');
                                container.find('input[type="radio"]').prop('checked', false);
                            }, 3000);
                        } else {
                            thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_return-message').show().addClass('form_error').text(response.message);
                        }
                    },
                    error: function () {
                        thankSubmitButton.removeClass('pe-none');
                        thankSubmitButton.find('.quiz_thankyou__submit_loader').hide();
                        thankYouForm.find('.take-the-quiz__container_quiz-card_quiz_return-message').show().addClass('form_error').text('An error occurred. Please try again.');
                    }
                });
            });


        });
    }

    function quiz_data_validation(first_name, last_name, email, postcode, agreement) {
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
                error_obj.push({ "field": "postcode", "result": "Post Code is invalid!" });
            }
            var postcodeReg = /^[0-9]{3,5}$/;

            if (!postcodeReg.test(postcode)) {
                error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
            } else if (postcode === '0000') {
                error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
            }

        }
        else {
            if (!isValidAustPostcode(postcode)) {
                error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
            } else if (postcode === '0000') {
                error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
            }
        }

        if (!agreement) {
            error_obj.push({ "field": "privacy", "result": "You must agree to the Mineral Council of Australia’s privacy policy." });
        }

        return error_obj;
    }

    function register_interest_data_validation(first_name, last_name, email, postcode, privacy) {
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

        if (!isValidAustPostcode(postcode)) {
            error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
        } else if (postcode === '0000') {
            error_obj.push({ "field": "postcode", "result": "Postcode is invalid!" });
        }

        if (!privacy) {
            error_obj.push({ "field": "privacy", "result": "You must agree to the Mineral Council of Australia’s privacy policy." });
        }

        return error_obj;
    }


    //---- Subscribe form
    if (jQuery('.signup__form').length) {

        jQuery('.signup__form').each(function () {
            var signupForm = jQuery(this);
            var validationTimer = null; // debounce timer
            var lastValidatedEmailSuccess = ''; // store last email that was validated SUCCESSFULLY
            let isResettingForm = false;
            let isSubmitting = false;

            // on input/change for text fields
            signupForm.find('input, textarea').on('input change', function () {
                if (isSubmitting || isResettingForm) return;

                clearTimeout(validationTimer);
                validationTimer = setTimeout(async function () {
                    await toggleSubmitButton(signupForm);
                }, 800);
            });

            async function toggleSubmitButton(form) {
                const result = await validateFormFields(form);
                var button = form.find('.signup__submit_btn');
                if (result && result.isValid) {
                    button.removeClass('pe-none');
                } else {
                    button.addClass('pe-none');
                }
            }

            function validateFormFields(form) {
                return new Promise(function (resolve) {
                    if (isSubmitting || isResettingForm) {
                        return resolve({ isValid: true });
                    }
                    removeErrors();

                    let first_name = form.find('.signup__first-name_input').val();
                    let last_name = form.find('.signup__last-name_input').val();
                    let email = form.find('.signup__email_input').val();
                    let postcode = form.find('.signup__post-code_input').val();
                    let agreement = form.find('.signup__agreement_input').is(':checked');
                    let country = "Australia";

                    var result = subscriber_validation(first_name, last_name, email, postcode);
                    if (!agreement) {
                        result.push({
                            field: 'agreement',
                            result: 'You must agree before submitting.'
                        });
                    }

                    if (result.length != 0) {
                        // local validation failed -> clear last successful validated email
                        lastValidatedEmailSuccess = '';
                        if (!isResettingForm) {
                            for (var co = 0; co < result.length; co++) {
                                form.find('.signup__' + result[co].field + '_error').show().text(result[co].result);
                            }
                        }
                        return resolve({ isValid: false });
                    }

                    // ✅ If we already have a SUCCESSFUL validation for this exact email, skip AJAX
                    if (email && email === lastValidatedEmailSuccess) {
                        return resolve({ isValid: true });
                    }

                    // Do AJAX check because email not yet successfully validated
                    var post_url = cmm_ajax.ajaxurl;
                    var params = { action: "cmm_check_subscriber_form_user_exists", email: email };

                    jQuery.ajax({
                        type: 'POST',
                        datatype: 'JSON',
                        url: post_url,
                        data: params,
                        beforeSend: function () {
                            form.find('.signup__submit_loader').show();
                        },
                        success: function (data) {
                            form.find('.signup__submit_loader').hide();

                            // If server returns a JSON string, parse it safely
                            var responseData = (typeof data === 'string') ? JSON.parse(data) : data;

                            if (responseData.status == 'success') {
                                if (isSubmitting || isResettingForm) {
                                    return resolve({ isValid: true });
                                }
                                // Only mark email as successfully validated now
                                lastValidatedEmailSuccess = email;
                                resolve({ isValid: true });
                            } else {
                                // Validation failed on server: clear stored success and show error
                                lastValidatedEmailSuccess = '';
                                form.find('.signup__form_error').show().text(responseData.message);
                                resolve({ isValid: false });
                            }
                        },
                        error: function () {
                            // On AJAX error, clear stored success so next change will re-check
                            lastValidatedEmailSuccess = '';
                            form.find('.signup__submit_loader').hide();
                            resolve({ isValid: false });
                        }
                    });
                });
            }

            // submit button click — scope to this form so handlers don't multiply
            signupForm.find(".signup__submit_btn")
                .off('click')
                .on('click', async function (e) {
                    clearTimeout(validationTimer);
                    e.preventDefault();

                    // 🔐 HARD BLOCK double submit
                    if (isSubmitting) return;
                    isSubmitting = true;

                    removeErrors();

                    var signupFormButton = jQuery(this);

                    const validation = await validateFormFields(signupForm);

                    if (!validation.isValid) {
                        isSubmitting = false;
                        return;
                    }

                    let first_name = signupForm.find('.signup__first-name_input').val();
                    let last_name = signupForm.find('.signup__last-name_input').val();
                    let email = signupForm.find('.signup__email_input').val();
                    let postcode = signupForm.find('.signup__post-code_input').val();
                    let edm_template_id = signupForm.find('.have-your-say__input_edm-template-id').val();
                    let dataSource = getValidSource();
                    let pageID = signupForm.find('.signup__input_page-id').val();
                    let pageTitle = signupForm.find('.signup__input_page-title').val();
                    let pageUrl = signupForm.find('.signup__input_page-url').val();


                    jQuery.ajax({
                        type: 'POST',
                        datatype: 'JSON',
                        url: cmm_ajax.ajaxurl,
                        data: {
                            action: 'cmm_save_subscriber_form',
                            name: first_name,
                            lastname: last_name,
                            email,
                            postcode,
                            dataSource,
                            edmTemplate_id: edm_template_id,
                            pageID,
                            pageUrl,
                            pageTitle,
                            formName: "Subscription",
                            nonce: cmm_script.subscription_nonce,
                        },
                        beforeSend: function () {
                            signupFormButton.addClass('pe-none');
                            signupFormButton.find('.signup__submit_loader').show();
                        },
                        success: function (data) {


                            lastValidatedEmailSuccess = '';

                            var newData = JSON.parse(data);

                            if (newData.response == 'success') {
                                isResettingForm = true;
                                clearTimeout(validationTimer);
                                lastValidatedEmailSuccess = '';
                                removeErrors();
                                signupForm.find('.signup__form_success')
                                    .show()
                                    .text(newData.message);

                                setTimeout(function () {
                                    signupForm.find('.signup__form_success').fadeOut();
                                    isResettingForm = false;
                                }, 2000);

                                signupForm[0].reset();

                            } else if (newData.response == "error") {
                                signupForm.find('.signup__form_error')
                                    .show()
                                    .text(newData.message);
                            }

                        },
                        error: function () {

                            signupForm.find('.signup__form_error')
                                .show()
                                .text('An error occurred. Please try again.');
                        },
                        complete: function () {
                            // 🔓 ALWAYS unlock
                            isSubmitting = false;
                            signupFormButton.addClass('pe-none');
                            signupFormButton.find('.signup__submit_loader').hide();
                        }
                    });
                });


        });
    }

    //---- end subscription

    //---- Register Interest form
    if (jQuery('#build-your-career__modal-form').length) {

        var registerForm = jQuery('#build-your-career__modal-form');
        var validationTimer = null; // debounce timer
        let isResettingForm = false;
        let isSubmitting = false;

        // on input/change for text fields
        registerForm.find('input').on('input change', function () {
            if (isSubmitting || isResettingForm) return;

            clearTimeout(validationTimer);
            validationTimer = setTimeout(async function () {
                await toggleSubmitButton(registerForm);
            }, 800);
        });

        async function toggleSubmitButton(form) {
            const result = await validateFormFields(form);
            var button = form.find('#build-your-career__submit-button');
            if (result && result.isValid) {
                button.removeClass('pe-none');
            } else {
                button.addClass('pe-none');
            }
        }

        function validateFormFields(form) {
            return new Promise(function (resolve) {
                if (isSubmitting || isResettingForm) {
                    return resolve({ isValid: true });
                }
                removeErrors();

                let first_name = form.find('.build-your-career__modal_first-name').val();
                let last_name = form.find('.build-your-career__modal_last-name').val();
                let email = form.find('.build-your-career__modal_email').val();
                let postcode = form.find('.build-your-career__modal_postcode').val();

                let privacy = form.find('.build-your-career__modal_form-check-input').is(':checked');

                var result = register_interest_data_validation(first_name, last_name, email, postcode, privacy);

                if (result.length != 0) {
                    for (var co = 0; co < result.length; co++) {
                        form.find('.build-your-career__modal_' + result[co].field + '_label_error').show().text(result[co].result);
                    }
                    return resolve({ isValid: false });
                } else {
                    return resolve({ isValid: true });
                }
            });
        }

        // submit button click
        registerForm.find("#build-your-career__submit-button").on('click', async function (e) {
            e.preventDefault();
            removeErrors();

            var submitButton = jQuery(this);

            const validation = await validateFormFields(registerForm);
            if (!validation.isValid) return;

            let first_name = registerForm.find('.build-your-career__modal_first-name').val();
            let last_name = registerForm.find('.build-your-career__modal_last-name').val();
            let email = registerForm.find('.build-your-career__modal_email').val();
            let postcode = registerForm.find('.build-your-career__modal_postcode').val();
            let current_occupation = registerForm.find('.build-your-career__modal_current-occupation').val();
            let experience_level = registerForm.find('.build-your-career__modal_experience-level').val();
            let career_edm_template_id = registerForm.find('#build-your-career__submit-button').data('template-id');

            let pageID = registerForm.find('.signup__input_page-id').val();
            let pageTitle = registerForm.find('.signup__input_page-title').val();
            let pageUrl = registerForm.find('.signup__input_page-url').val();
            let formName = "Careers";

            var post_url = cmm_script.ajaxurl;
            var params = { first_name, last_name, email, postcode, current_occupation, experience_level, career_edm_template_id, pageID, pageTitle, pageUrl, formName, nonce: cmm_script.register_interest_nonce, action: "cmm_save_register_interest_form" };

            removeErrors();
            jQuery.ajax({
                type: 'POST',
                datatype: 'JSON',
                url: post_url,
                data: params,
                beforeSend: function () {
                    submitButton.addClass('pe-none');
                    submitButton.find('.build-your-career__submit_loader').show();
                },
                success: function (data) {
                    submitButton.removeClass('pe-none');
                    submitButton.find('.build-your-career__submit_loader').hide();

                    var response_data = JSON.parse(data);

                    if (response_data.response === 'success') {
                        isResettingForm = true;
                        registerForm[0].reset();
                        submitButton.addClass('pe-none');
                        removeErrors();
                        setTimeout(() => { isResettingForm = false; }, 300);
                        // Hide register modal and show thankyou modal
                        jQuery('#register-interest-modal').modal('hide');
                        jQuery('#thankyou-modal').modal('show');
                    } else {
                        alert(response_data.message);
                    }
                },
                error: function () {
                    submitButton.removeClass('pe-none');
                    submitButton.find('.build-your-career__submit_loader').hide();
                    alert('An error occurred. Please try again.');
                }
            });
        });
    }

    // ================= MAP INIT =================
    (function () {

        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        // prevent duplicate initialization
        if (window.myLeafletMap) return;

        const loader = document.getElementById("mapLoader");

        // 🇦🇺 Australia bounds
        const australiaBounds = L.latLngBounds(
            [-45.5, 110.5],
            [-9.5, 155.5]
        );

        // 🌍 Create map
        const map = L.map('map', {
            preferCanvas: true,
            maxZoom: 18,
            minZoom: 2,
            maxBounds: australiaBounds,
            maxBoundsViscosity: 1.0
        }).setView([-27, 134], 2.8);

        // Fit Australia
        map.fitBounds(australiaBounds, {
            padding: [10, 10]
        });

        // Disable dragging initially
        map.dragging.disable();

        // Enable dragging only after zooming in
        map.on('zoomend', function () {

            const currentZoom = map.getZoom();

            // enable dragging only when zoomed in
            if (currentZoom > 4) {
                map.dragging.enable();
            } else {
                map.dragging.disable();

                // optional: reset back to Australia center
                map.panInsideBounds(australiaBounds);
            }
        });

        // ✅ LOCK zoom-out EXACTLY after fit
        map.once('moveend', function () {
            const initialZoom = map.getZoom();
            map.setMinZoom(initialZoom);
        });

        // 📏 Scale
        L.control.scale().addTo(map);

        let selectedField = "Total_Direct_Spending";
        let geojson;
        let legend;

        // 🎨 Color logic
        function getColor(d) {

            if (selectedField === "Total_Direct_Spending") {
                return d > 4000 ? '#ff0000fd' :
                    d > 2000 ? '#0e1167' :
                        d > 1000 ? '#cf8206' :
                            d > 500 ? '#e309c2' :
                                d > 100 ? '#0d0dc4' :
                                    d > 0 ? '#06c52c' :
                                        '#06c52c';
            }

            if (selectedField === "Residing_Employees") {
                return d > 10000 ? '#4208a5' :
                    d > 5000 ? '#023960' :
                        d > 1000 ? '#0b4c7d' :
                            d > 500 ? '#0413e3' :
                                d > 100 ? '#0f8fa3' :
                                    d > 0 ? '#77fef7' :
                                        '#77fef7';
            }

            if (selectedField === "Local_Suppliers_Businesses") {
                return d > 1000 ? '#021e0d' :
                    d > 500 ? '#0ea039' :
                        d > 400 ? '#0a834c' :
                            d > 300 ? '#18b706' :
                                d > 200 ? '#225b1c' :
                                    d > 100 ? '#4ba042' :
                                        d > 0 ? '#70fc5d' :
                                            '#70fc5d';
            }
        }

        // 🎯 Style
        function style(feature) {
            return {
                fillColor: getColor(feature.properties[selectedField] || 0),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            };
        }

        // 🖱 Hover
        function highlightFeature(e) {
            e.target.setStyle({
                weight: 3,
                color: '#666',
                fillOpacity: 0.9
            });
        }

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
        }

        // 📌 Dynamic popup content
        function getPopupContent(feature) {

            let label = '';
            let value = feature.properties[selectedField] || 0;

            if (selectedField === "Residing_Employees") {
                label = "Residing Employees (FTEs)";
            }

            if (selectedField === "Total_Direct_Spending") {
                label = "Total Direct Spending ($M)";
            }

            if (selectedField === "Local_Suppliers_Businesses") {
                label = "Local Suppliers / Businesses";
            }

            return `
            <strong>${feature.properties.Elect_div}</strong><br>
            ${label}: ${value}
        `;
        }

        // 📌 Feature events
        function onEachFeature(feature, layer) {

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: function () {

                    layer.bindPopup(
                        getPopupContent(feature)
                    ).openPopup();
                }
            });
        }

        // 📊 Legend ranges
        function getGrades() {

            const minVal = getMinValue(selectedField);

            if (selectedField === "Total_Direct_Spending") {
                return [minVal, 100, 500, 1000, 2000, 4000];
            }

            if (selectedField === "Residing_Employees") {
                return [minVal, 100, 500, 1000, 5000, 10000];
            }

            if (selectedField === "Local_Suppliers_Businesses") {
                return [minVal, 100, 200, 300, 400, 500, 1000];
            }
        }

        // 📊 Get minimum non-zero value
        function getMinValue(field) {

            let values = [];

            geojson.eachLayer(function (layer) {

                const val = Number(layer.feature.properties[field]);

                // ignore 0 and invalid values
                if (!isNaN(val) && val > 0) {
                    values.push(val);
                }
            });

            return values.length ? Math.min(...values) : 0;
        }

        // 🧱 Legend control
        function addLegend() {

            if (legend) {
                legend.remove();
            }

            legend = L.control({ position: 'bottomright' });

            legend.onAdd = function () {

                const div = L.DomUtil.create('div', 'info legend');
                const grades = getGrades();

                div.innerHTML += "<strong>" + selectedField.replace(/_/g, ' ') + "</strong><br>";

                for (let i = 0; i < grades.length; i++) {

                    const from = grades[i];
                    const to = grades[i + 1];

                    div.innerHTML +=
                        '<i style="background:' + getColor(from + 1) + '"></i> ' +
                        from + (to ? '&ndash;' + to : '+') + '<br>';
                }

                return div;
            };

            legend.addTo(map);
        }

        // 📦 Load GeoJSON
        fetch(cmm_script.geojson_url)
            .then(res => res.json())
            .then(data => {

                geojson = L.geoJson(data, {
                    style: style,
                    onEachFeature: onEachFeature
                }).addTo(map);

                addLegend();

                if (loader) {
                    setTimeout(() => {
                        loader.style.display = "none";
                    }, 300);
                }
            })
            .catch(err => {

                console.error("Error loading GeoJSON:", err);

                if (loader) {
                    loader.innerHTML = "Failed to load map data";
                }
            });

        // 🔄 Dropdown change
        const filter = document.getElementById("mapFilter");

        if (filter) {

            filter.addEventListener("change", function () {

                // ✅ close any open popup
                map.closePopup();

                selectedField = this.value;

                geojson.eachLayer(function (layer) {

                    layer.setStyle({
                        fillColor: getColor(layer.feature.properties[selectedField] || 0)
                    });

                    // update popup content
                    layer.bindPopup(
                        getPopupContent(layer.feature)
                    );
                });

                addLegend();
            });
        }

    })();

    // ================= CONTRIBUTION STATS =================
    (function () {

        const regionSelect = document.getElementById('region-select');

        if (!regionSelect) return;

        const statCards = document.querySelectorAll('.contribution-stats__cards');
        const statSources = document.querySelectorAll('.contribution-stats__source');

        function showSelectedRegion() {

            const selectedRegion = regionSelect.value.toUpperCase();

            // Hide all cards
            statCards.forEach(function (card) {
                card.style.display = 'none';
            });

            // Hide all sources
            statSources.forEach(function (source) {
                source.style.display = 'none';
            });

            // Show selected card
            const activeCard = document.querySelector(
                '.contribution-stats__cards.' + selectedRegion
            );

            if (activeCard) {
                activeCard.style.display = 'flex';
            }

            // Show selected source
            const activeSource = document.querySelector(
                '.contribution-stats__source.' + selectedRegion
            );

            if (activeSource) {
                activeSource.style.display = 'block';
            }
        }

        showSelectedRegion();

        regionSelect.addEventListener('change', showSelectedRegion);

    })();

});