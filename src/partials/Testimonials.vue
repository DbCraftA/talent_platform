<script setup>
import Testimonial from '../partials/Testimonial.vue'
import TestimonialImg01 from '../images/amin.jpeg'
import TestimonialImg02 from '../images/dyalna.jpeg'
import TestimonialImg03 from '../images/antoine.jpeg'
import TestimonialImg04 from '../images/mehdi.jpeg'

const testimonials01 = [
  {
    image: TestimonialImg03,
    name: 'Antoine Scoffier',
    user: 'Architecte DevOps & Cloud',
    link: 'https://www.linkedin.com/in/antoine-scoffier-a8bb6aab/',
    content: 'Un process simple et efficace qui m’a ouvert la porte d’une mission taillée sur mesure, parfaitement alignée avec mon expertise et mes ambitions professionnelles.',
  },
  {
    image: TestimonialImg02,
    name: 'Abdelaali Sadki',
    user: 'Head of Platforms',
    link: 'https://www.linkedin.com/in/abdelaali-sadki/',
    content: 'La shortlist ciblée proposée nous a permis de gagner plusieurs semaines sur un projet critique, tout en réduisant considérablement les risques techniques.',
  },
  {
    image: TestimonialImg01,
    name: 'Dr. Amin Lahnaoui',
    user: 'Docteur en énergie',
    link: 'https://www.linkedin.com/in/amin-lahnaoui/',
    content: 'Un accompagnement clair et pragmatique qui nous a permis de structurer nos environnements cloud tout en maintenant notre rythme d’innovation.',
  }
]

const testimonials02 = [
  {
    image: TestimonialImg04,
    name: 'Mehdi Ouaghlani',
    user: 'Architecte Data',
    link: 'https://www.linkedin.com/in/mehdi-ouaghlani-9016745b/',
    content: 'Ma mission était en parfaite adéquation avec mon expertise, et l’accompagnement constant m’a permis de rester focalisé sur la valeur que j’apporte.',
  },
  {
    image: TestimonialImg02,
    name: 'Abdelaali Sadki',
    user: 'Head of Platforms',
    link: 'https://www.linkedin.com/in/abdelaali-sadki/',
    content: 'La shortlist ciblée proposée nous a permis de gagner plusieurs semaines sur un projet critique, tout en réduisant considérablement les risques techniques.',
  },
  {
    image: TestimonialImg01,
    name: 'Dr. Amin Lahnaoui',
    user: 'Docteur en énergie',
    link: 'https://www.linkedin.com/in/amin-lahnaoui/',
    content: 'Un accompagnement clair et pragmatique qui nous a permis de structurer nos environnements cloud tout en maintenant notre rythme d’innovation.',
  }
]
</script>

<template>
  <section class="bg-zinc-800">
    <div class="py-12 md:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 class="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-200">Des experts et des clients qui nous choisissent</h2>
        </div>
      </div>
      <div class="max-w-[94rem] mx-auto space-y-6">
        <!-- Row #1 -->
        <div class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
          <div class="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]">
            <!-- Items -->
            <Testimonial v-for="(testimonial, index) in testimonials01" :key="testimonial.id" :testimonial="testimonial" >
              {{ testimonial.content }}
            </Testimonial>
          </div>
          <!-- Duplicated element for infinite scroll -->
          <div class="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]" aria-hidden="true">
            <!-- Items -->
            <Testimonial v-for="(testimonial, index) in testimonials01" :key="testimonial.id" :testimonial="testimonial" >
              {{ testimonial.content }}
            </Testimonial>
          </div>          
        </div>
        <!-- Row #2 -->
        <div class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
          <div class="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll-inverse group-hover:[animation-play-state:paused] [animation-delay:-7.5s]">
            <!-- Items -->
            <Testimonial v-for="(testimonial, index) in testimonials01" :key="testimonial.id" :testimonial="testimonial" >
              {{ testimonial.content }}
            </Testimonial>
          </div>
          <!-- Duplicated element for infinite scroll -->
          <div class="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll-inverse group-hover:[animation-play-state:paused] [animation-delay:-7.5s]" aria-hidden="true">
            <!-- Items -->
            <Testimonial v-for="(testimonial, index) in testimonials02" :key="testimonial.id" :testimonial="testimonial" >
              {{ testimonial.content }}
            </Testimonial>
          </div>          
        </div>
      </div>
    </div>
  </section>
</template>
