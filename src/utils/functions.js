import emailjs from "@emailjs/browser";


export const SERVICE_ID = "service_b9av8k6"
export const TEMPLATE_ID = "template_mjy84uk"
export const USER_ID = "2exdNLWP56ycM0-6J"


export const sendEmail = (isLoading ,form,router) => {
    console.log(isLoading,form,router)
    isLoading = true
    emailjs
        .sendForm(SERVICE_ID , TEMPLATE_ID, form,  USER_ID)
        .then(
            () => {
                isLoading = false
                console.log('SUCCESS!');
                form.resetForm()
                router.push('/c-03')
            },
            (error) => {
                isLoading = false
                console.log('FAILED...', error.text);
            },
        );

}