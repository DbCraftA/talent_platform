<template>
  <div className="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <Hero01 />
      <Clients />
      <Explainer />
      <Features01 />
      <Features02 />
      <Citation/>
      <Features03 />
      <Features04 />
      <Features/>
      <Testimonials />
      <Faqs />
      <Cta />

    </main>
    
    <!-- Site footer -->
    <Footer />    

  </div>
</template>

<script>
import Header from '../partials/Header.vue'
import Hero from '../partials/Hero.vue'
import Hero01 from '../partials/Hero01.vue'
import Clients from '../partials/Clients.vue'
import Explainer from '../partials/Explainer.vue'
import Features01 from '../partials/Features01.vue'
import Features02 from '../partials/Features02.vue'
import Features03 from '../partials/Features03.vue'
import Features04 from '../partials/Features04.vue'
import Services from '../partials/Services.vue'
import Pricing from '../partials/Pricing.vue'
import Testimonials from '../partials/Testimonials.vue'
import Faqs from '../partials/Faqs.vue'
import Cta from '../partials/Cta.vue'
import Footer from '../partials/Footer.vue'
import Citation from '../partials/Citation.vue'
import Features from '../partials/Features.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    Hero01,
    Clients,
    Explainer,
    Features01,
    Features02,
    Features03,
    Features04,
    Services,
    Pricing,
    Testimonials,
    Faqs,
    Cta,
    Footer,
    Citation,
    Features
},
}
</script>