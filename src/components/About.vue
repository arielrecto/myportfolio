<script setup>
import Icon from '@/components/Icon.vue'
import { aboutMe } from '@/data/about.json'
import { services } from '@/data/header.json'
</script>

<template>
    <section id="about" class="section">
        <div class="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div v-reveal>
                <p class="eyebrow">About</p>
                <h2 class="section-title">Engineering systems that run real businesses.</h2>
            </div>
            <div v-reveal :delay="100" class="space-y-8">
                <p class="text-lg leading-relaxed text-muted">{{ aboutMe.description }}</p>

                <div>
                    <h3 class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-content">
                        <Icon name="graduation" class="h-4 w-4 text-accent" /> Education
                    </h3>
                    <ul class="mt-4 space-y-3">
                        <li v-for="education in aboutMe.education" :key="education.course"
                            class="flex flex-col justify-between gap-1 border-l-2 border-line pl-4 sm:flex-row sm:items-baseline">
                            <div>
                                <p class="font-medium text-content">{{ education.course }}</p>
                                <p class="text-sm text-muted">{{ education.school }}</p>
                            </div>
                            <span class="shrink-0 font-mono text-xs text-muted">{{ education.yearGraduated }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-16 grid gap-5 md:grid-cols-3">
            <article v-for="(service, index) in services" :key="service.name" v-reveal :delay="index * 100"
                class="card p-6 transition-colors hover:border-accent/50">
                <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon :name="service.icon" class="h-5 w-5" />
                </span>
                <h3 class="mt-5 text-lg font-semibold text-content">{{ service.name }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-muted">{{ service.description }}</p>
            </article>
        </div>
    </section>
</template>
