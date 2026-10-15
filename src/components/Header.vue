<script setup>
import Icon from '@/components/Icon.vue'
import personal from '@/data/personal.json'
import { hero, stats } from '@/data/header.json'
import { aboutMe } from '@/data/about.json'
import photo from '@/assets/profile.jpg'

// The current position is whichever experience is still running.
const current = aboutMe.experiences.find((e) => /present/i.test(e.year))
</script>

<template>
    <section id="home" class="relative overflow-hidden">
        <!-- soft background glow -->
        <div aria-hidden="true"
            class="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" />

        <div class="section relative grid items-center gap-12 !pt-32 lg:grid-cols-[1.25fr_1fr] lg:!pt-40">
            <div v-reveal>
                <span v-if="current" class="chip !text-content">
                    <span class="relative flex h-2 w-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        <span class="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    {{ current.name }} at {{ current.company }}
                </span>

                <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-content sm:text-5xl lg:text-6xl">
                    {{ personal.name }}
                </h1>
                <p class="mt-3 text-lg font-medium text-accent sm:text-xl">{{ personal.role }}</p>
                <p class="mt-6 max-w-xl leading-relaxed text-muted">{{ hero.intro }}</p>

                <div class="mt-8 flex flex-wrap items-center gap-3">
                    <a href="#projects" class="btn-primary">
                        View my work <Icon name="arrow" class="h-4 w-4" />
                    </a>
                    <a v-if="personal.resumeUrl" :href="personal.resumeUrl" download class="btn-ghost">
                        <Icon name="download" class="h-4 w-4" /> Download CV
                    </a>
                    <a v-else href="#contact" class="btn-ghost">Get in touch</a>
                </div>

                <div class="mt-8 flex items-center gap-2">
                    <a v-for="social in personal.socials" :key="social.name" :href="social.url" target="_blank"
                        rel="noopener" :aria-label="social.name"
                        class="rounded-lg p-2 text-muted transition-colors hover:bg-raised hover:text-accent">
                        <Icon :name="social.icon" class="h-5 w-5" />
                    </a>
                    <span class="mx-2 h-5 w-px bg-line" />
                    <span class="flex items-center gap-2 text-sm text-muted">
                        <Icon name="pin" class="h-4 w-4" /> {{ personal.location }}
                    </span>
                </div>
            </div>

            <div v-reveal :delay="150" class="mx-auto w-full max-w-sm lg:max-w-none">
                <div class="relative">
                    <div aria-hidden="true"
                        class="absolute -inset-3 rounded-[2rem] border border-line bg-gradient-to-br from-accent/20 to-transparent" />
                    <img :src="photo" :alt="`Portrait of ${personal.name}`"
                        class="relative aspect-[4/5] w-full rounded-3xl object-cover object-top" />
                </div>
            </div>
        </div>

        <!-- stats -->
        <div class="mx-auto max-w-page px-5 pb-8 sm:px-8">
            <dl class="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line gap-px lg:grid-cols-4">
                <div v-for="(stat, index) in stats" :key="stat.label" v-reveal :delay="index * 80"
                    class="bg-surface px-6 py-6">
                    <dt class="text-sm text-muted">{{ stat.label }}</dt>
                    <dd class="mt-1 text-3xl font-bold tracking-tight text-content">{{ stat.value }}</dd>
                </div>
            </dl>
        </div>
    </section>
</template>
