<template>
  <footer>
    <div id="contact">
      <h2>CONTACT</h2>
    </div>  
      <div class="footer-container">
        <div id="contact-form-container">
          <ContactForm></ContactForm>
        </div>
        <div><!-- void -->
        </div>
        <div id="contact-adress-container">
          <div class="adress">
            <div>
              <ul>
                <li>
                  <h3>STEVE KACI</h3>
                </li>
                <li>901 ROUTE DE TREVOUX</li>
                <li>ST JEAN DE THURIGNEUX</li>
              </ul>
            </div>
          </div>

          <div class="social-container">
            <div class="social">
              <div> <a href="https://github.com/steveKac01?tab=repositories" target="_blank">
                  <font-awesome-icon icon="fab fa-github " size="3x" alt="github-icon" />
                </a></div>
              <div> <a href="#">
                  <font-awesome-icon icon="fab fa-linkedin " size="3x" alt="linkedin-icon" />
                </a></div>
              <div> <a href="mailto:kaci.steve@k-net.fr">
                  <font-awesome-icon icon="fas fa-at " size="3x" alt="envelope-icon" />
                </a></div>
            </div>
          </div>
          <div class="copyright">@ 2022 | <a href="mailto:kaci.steve@k-net.fr">Kaci.steve@k-net.fr</a>
          </div>
        </div>
      </div>
  </footer>
</template>

<script>
import ContactForm from './FormComponent.vue'

export default {
  name: 'FooterPortfolio',
  props: {
    isDarkMode: Boolean
  },
  components: {
    ContactForm
  },
  data: () => ({
  })
}
</script>

<style scoped>
@import "@/assets/style/footer.css";
</style>