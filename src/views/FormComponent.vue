<template>
    <div class="containerByCat">
        <!--    <form   @submit.prevent="sendEmail" :class="hideForm ? 'hide' : ''"> -->
        <div class="success" :class="hideForm ? '' : 'hide'">
            <div>
                <font-awesome-icon style="display:inline;margin-right:2px" icon="fas fa-check-circle " size="4x" />
                <h3 style="display:inline">Votre message a bien été envoyé !</h3>
            </div>
        </div>
        <form @submit.prevent="sendEmail" :class="hideForm ? 'hide' : ''">
            <h3>ME LAISSER UN MESSAGE</h3>
            <div> <input type="hidden" name="contact_number">

            </div>
            <div class="input"><input type="text" name="user_name" placeholder="Nom/Prénom"
                    :class="this.errors.name ? 'error-form' : ''" v-model="form.name">

                <input type="email" name="user_email" placeholder="Email" v-model="form.email"
                    :class="this.errors.email ? 'error-form' : ''">
            </div>
            <div>
                <textarea name="message" id="" cols="30" rows="5" placeholder="Votre message"
                    :class="this.errors.message ? 'error-form' : ''" v-model="form.message"></textarea>
            </div>

            <div class="error" v-if="messageError != ''">
                <font-awesome-icon icon="fas fa-exclamation-circle" /> {{ messageError }}
            </div>
            <div class="send">
                <button>ENVOYER</button>
            </div>
        </form>
    </div>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
    name: 'ContactForm',
    data: () => ({
        form: {
            name: '',
            email: '',
            message: ''
        },
        hideForm: false,
        messageError: '',
        errors: {
            email: false,
            name: false,
            message: false
        }
    }), methods: {
        resetForm() {
            this.messageError = ''
            this.errors.name = false
            this.errors.message = false
            this.errors.email = false
        },
        isValid(value) {
            value = value.trim();
            if (value.trim() == '') {
                return false
            }
            return value.length > 2
        },
        emailIsValid() {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email)) {
                return true
            } else {
                this.messageError = "L'email est invalide."
                this.errors.email = true
                return false
            }
        },
        checkForm() {
            this.resetForm()
            //vérification des champs du formulaire
            if (!this.isValid(this.form.name)) {
                this.messageError = "Veuillez remplir tous les champs."
                this.errors.name = true
            }
            if (!this.isValid(this.form.message)) {
                this.messageError = "Veuillez remplir tous les champs."
                this.errors.message = true
            }
            if (!this.isValid(this.form.email)) {
                this.messageError = "Veuillez remplir tous les champs."
                this.errors.email = true
            }
            if (this.messageError == '') {
                return true
            }
            return false
        },
        sendEmail(e) {
            if (this.checkForm() && this.emailIsValid()) {
                console.log("Test to send mail")
                try {
                    emailjs.sendForm('service_w94zr4t', 'template_ah0hnzh', e.target,
                        'lTg6uB3SSqdJZhtqN', {
                        name: this.name,
                        email: this.email,
                        message: this.message
                    }).then((result) => {
                          this.hideForm = true; 
                          console.log("Email envoyé: "+result)
                    }, (error) => {
                        console.log("Une erreur est survenue: "+error.text);
                         this.messageError = "Une erreur inconnue est survenue."
                    });
                  
                } catch (error) {
                    this.messageError = "Une erreur inconnue est survenue, veuillez ressayer plus tard."
                }
                //Reset form
                this.name = ''
                this.email = ''
                this.message = ''
            }
        },
    }
}
</script>

<style scoped>
@import "@/assets/style/form.css";
</style>