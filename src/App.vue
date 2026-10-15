<script setup>
  import NavBar from '@/components/NavBar.vue';
  import Header from '@/components/Header.vue';
  import About from '@/components/About.vue';
  import Experience from '@/components/Experience.vue';
  import Skills from '@/components/Skills.vue';
  import Project from '@/components/Project.vue';
  import Contact from '@/components/Contact.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <NavBar />
    <main>
      <Header />
      <About />
      <Experience />
      <Skills />
      <Project />
      <Contact />
    </main>
  </div>
</template>
