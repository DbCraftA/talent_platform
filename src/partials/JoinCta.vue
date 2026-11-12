<template>
  <section class="bg-white px-4 py-12 sm:px-6 md:py-16">
    <div class="mx-auto flex max-w-6xl flex-col items-start gap-5 rounded-3xl bg-slate-950 px-6 py-8 text-white md:flex-row md:items-center md:px-10" data-aos="fade-up">
      <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-indigo-200" aria-hidden="true">
        <svg class="h-9 w-9" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="10" r="4"/><circle cx="6" cy="14" r="3"/><circle cx="26" cy="14" r="3"/><path d="M8 27v-3a8 8 0 0 1 16 0v3H8Zm-6 0v-3a5 5 0 0 1 5-5m23 8v-3a5 5 0 0 0-5-5"/></svg>
      </div>
      <div class="grow md:border-l md:border-white/40 md:pl-8">
        <h2 class="font-cabinet-grotesk text-2xl font-bold">Envie de rejoindre un collectif d’architectes exigeants ?</h2>
        <p class="mt-1 text-sm text-white/85">Partagez-nous votre parcours, vos expertises et les sujets sur lesquels vous souhaitez intervenir. Nous reviendrons vers vous pour un premier échange.</p>
      </div>
      <router-link class="btn inline-flex shrink-0 items-center gap-2 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50" to="/nous-contacter">Rejoindre le collectif <span aria-hidden="true">→</span></router-link>
    </div>
  </section>
</template>
