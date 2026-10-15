<script setup>
import { aboutMe } from '@/data/about.json'

// Highlights are written as "Title: detail" — split so the title can be emphasised.
const splitHighlight = (text) => {
    const at = text.indexOf(':')
    return at === -1 ? { title: '', body: text } : { title: text.slice(0, at), body: text.slice(at + 1).trim() }
}
</script>

<template>
    <section id="experience" class="border-y border-line bg-surface/40">
        <div class="section">
            <div v-reveal>
                <p class="eyebrow">Experience</p>
                <h2 class="section-title">Where I've worked</h2>
            </div>

            <ol class="relative mt-12 space-y-12 border-l border-line">
                <li v-for="(job, index) in aboutMe.experiences" :key="job.company + job.year" v-reveal
                    :delay="index * 80" class="relative pl-8 lg:pl-12">
                    <span aria-hidden="true"
                        :class="['absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ink',
                            index === 0 ? 'bg-accent ring-4 ring-accent/20' : 'bg-line']" />

                    <div class="grid gap-2 lg:grid-cols-[13rem_1fr] lg:gap-10">
                        <p class="font-mono text-xs uppercase tracking-wider text-muted lg:pt-1.5">{{ job.year }}</p>
                        <div>
                            <h3 class="text-xl font-semibold text-content">{{ job.name }}</h3>
                            <p class="mt-1 font-medium text-accent">{{ job.company }}</p>
                            <ul v-if="job.highlights?.length" class="mt-4 space-y-3">
                                <li v-for="highlight in job.highlights.map(splitHighlight)" :key="highlight.title + highlight.body"
                                    class="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2.5 before:h-1 before:w-2.5 before:rounded-full before:bg-accent/60">
                                    <span v-if="highlight.title" class="font-medium text-content">{{ highlight.title }}.
                                    </span>{{ highlight.body }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    </section>
</template>
