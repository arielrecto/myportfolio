<script setup>
import skills from '@/data/skills.json'
</script>

<template>
    <section id="skills" class="section">
        <div v-reveal class="max-w-2xl">
            <p class="eyebrow">Skills</p>
            <h2 class="section-title">Core competencies</h2>
            <p class="mt-4 text-muted">From application code to ERP customization, deployment, and the business
                processes the software serves.</p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="(competency, index) in skills.competencies" :key="competency.name" v-reveal
                :delay="index * 80" class="card p-6">
                <h3 class="font-semibold text-content">{{ competency.name }}</h3>
                <div class="mt-4 flex flex-wrap gap-2">
                    <span v-for="item in competency.items" :key="item" class="chip">{{ item }}</span>
                </div>
            </article>
        </div>

        <div v-reveal class="mt-16">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-content">Tech stack</h3>
            <ul class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <li v-for="skill in skills.skills" :key="skill.name"
                    class="flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5 pr-4 transition-colors hover:border-accent/50">
                    <!-- white tile: logos ship with mixed (often white) backgrounds and wordmark shapes -->
                    <span class="flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
                        <img v-if="skill.image_url" :src="skill.image_url" :alt="`${skill.name} logo`" loading="lazy"
                            class="max-h-full max-w-full object-contain" />
                        <span v-else class="font-mono text-xs font-semibold text-ink">
                            {{ skill.name.slice(0, 2).toUpperCase() }}
                        </span>
                    </span>
                    <span class="truncate text-sm text-content">{{ skill.name }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>
