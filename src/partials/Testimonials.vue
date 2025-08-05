<script setup>
import Testimonial from '../partials/Testimonial.vue'
import TestimonialImg01 from '../images/testimonial-01.jpg'
import TestimonialImg02 from '../images/testimonial-02.jpg'
import TestimonialImg03 from '../images/testimonial-03.jpg'
import TestimonialImg04 from '../images/testimonial-04.jpg'
import TestimonialImg05 from '../images/testimonial-05.jpg'
import TestimonialImg06 from '../images/testimonial-06.jpg'
import TestimonialImg07 from '../images/testimonial-07.jpg'
import TestimonialImg08 from '../images/testimonial-08.jpg'

const testimonials01 = [
  {
    image: TestimonialImg01,
    name: 'Lina James',
    user: '@linaj87',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
  {
    image: TestimonialImg02,
    name: 'Lina James',
    user: '@linaj87',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
  {
    image: TestimonialImg03,
    name: 'Lina James',
    user: '@linaj87',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
  {
    image: TestimonialImg04,
    name: 'Mary Kahl',
    user: '@marykahl',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },  
]

const testimonials02 = [
  {
    image: TestimonialImg05,
    name: 'Katy Dragán',
    user: '@katyd',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
  {
    image: TestimonialImg06,
    name: 'Karl Ahmed',
    user: '@karl87',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
  {
    image: TestimonialImg07,
    name: 'Carlotta Grech',
    user: '@carlagrech',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
  {
    image: TestimonialImg08,
    name: 'Alejandra Gok',
    user: '@alejandraIT',
    link: '#0',
    content: 'Extremely thoughtful approaches to business. I highly recommend this product to anyone wanting to jump into something new.',
  },
]
</script>

<template>
  <section class="bg-zinc-800">
    <div class="py-12 md:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 class="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-200">Ils ont trouvé leur expert avec nous</h2>
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
