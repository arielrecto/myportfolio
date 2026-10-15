<script setup>
import Icon from '@/components/Icon.vue'
import { projects } from '@/data/projects.json'
import { githubUrl, repoUrl } from '@/composables/usePersonal'

const featured = projects.filter((p) => p.type === 'professional')
const others = projects.filter((p) => p.type === 'capstone')
const repositories = projects.filter((p) => p.type === 'repository')

// "Overshot-backend" -> "backend" when a project has several repos; one repo -> "Code".
const repoLabel = (project, repo) => {
    if (project.repos.length === 1) return 'Code'
    const parts = repo.split(/[-_]/)
    return parts.length > 1 ? parts.at(-1) : repo
}
</script>

<template>
    <section id="projects" class="border-y border-line bg-surface/40">
        <div class="section">
            <div v-reveal class="max-w-2xl">
                <p class="eyebrow">Projects</p>
                <h2 class="section-title">Selected work</h2>
                <p class="mt-4 text-muted">Enterprise systems I've architected and shipped professionally.</p>
            </div>

            <!-- featured: professional work -->
            <div class="mt-12 grid gap-5 md:grid-cols-2">
                <article v-for="(project, index) in featured" :key="project.name" v-reveal :delay="(index % 2) * 100"
                    class="card group flex flex-col p-7 transition-colors hover:border-accent/50">
                    <div class="flex items-center justify-between gap-4">
                        <span class="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                            <Icon name="briefcase" class="h-3.5 w-3.5" /> {{ project.company }}
                        </span>
                        <span class="font-mono text-xs text-muted">{{ String(index + 1).padStart(2, '0') }}</span>
                    </div>
                    <h3 class="mt-4 text-xl font-semibold text-content">{{ project.name }}</h3>
                    <p class="mt-3 flex-1 leading-relaxed text-muted">{{ project.description }}</p>
                    <div class="mt-6 flex flex-wrap items-center gap-2">
                        <span v-for="stack in project.stacks" :key="stack.name" class="chip capitalize">
                            <img v-if="stack.icon" :src="stack.icon" alt="" class="h-3.5 w-3.5 object-contain" />
                            {{ stack.name }}
                        </span>
                        <a v-for="repo in project.repos" :key="repo" :href="repoUrl(repo)" target="_blank" rel="noopener"
                            class="ml-auto flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent">
                            <Icon name="github" class="h-4 w-4" /> {{ repoLabel(project, repo) }}
                        </a>
                    </div>
                </article>
            </div>

            <!-- freelance & academic -->
            <div v-if="others.length" class="mt-20">
                <div v-reveal>
                    <h3 class="text-2xl font-bold tracking-tight text-content">Freelance &amp; academic projects</h3>
                    <p class="mt-2 text-muted">Systems built for clients and university teams.</p>
                </div>

                <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <article v-for="(project, index) in others" :key="project.name" v-reveal :delay="(index % 3) * 80"
                        class="card group flex flex-col overflow-hidden transition-colors hover:border-accent/50">
                        <div class="aspect-[16/10] overflow-hidden border-b border-line bg-raised">
                            <img v-if="project.images?.length" :src="project.images[0]" :alt="`${project.name} screenshot`"
                                loading="lazy"
                                class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                        </div>
                        <div class="flex flex-1 flex-col p-5">
                            <h4 class="font-semibold capitalize text-content">{{ project.name }}</h4>
                            <p v-if="project.description" class="mt-2 text-sm text-muted">{{ project.description }}</p>
                            <p v-if="project.clients?.length" class="mt-2 text-xs text-muted">
                                <span class="text-content">Client:</span> {{ project.clients.join(', ') }}
                            </p>
                            <div class="mt-4 flex flex-wrap gap-1.5">
                                <span v-for="stack in project.stacks" :key="stack.name"
                                    class="rounded-md bg-raised px-2 py-0.5 font-mono text-[11px] text-muted">
                                    {{ stack.name }}
                                </span>
                            </div>
                            <div v-if="project.repos?.length" class="mt-auto flex flex-wrap gap-4 pt-4">
                                <a v-for="repo in project.repos" :key="repo" :href="repoUrl(repo)" target="_blank"
                                    rel="noopener"
                                    class="flex items-center gap-1.5 text-sm capitalize text-muted transition-colors hover:text-accent">
                                    <Icon name="github" class="h-4 w-4" /> {{ repoLabel(project, repo) }}
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <!-- more on GitHub -->
            <div v-if="repositories.length" class="mt-20">
                <div v-reveal class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <h3 class="text-2xl font-bold tracking-tight text-content">More on GitHub</h3>
                        <p class="mt-2 text-muted">Other systems and builds from my repositories.</p>
                    </div>
                    <a :href="`${githubUrl}?tab=repositories`" target="_blank" rel="noopener" class="btn-ghost shrink-0">
                        <Icon name="github" class="h-4 w-4" /> All repositories
                    </a>
                </div>

                <ul v-reveal class="card mt-8 divide-y divide-line">
                    <li v-for="repo in repositories" :key="repo.name">
                        <a :href="repoUrl(repo.repos[0])" target="_blank" rel="noopener"
                            class="group flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-raised sm:flex-row sm:items-center sm:gap-6">
                            <span class="w-12 shrink-0 font-mono text-xs text-muted">{{ repo.year }}</span>
                            <span class="min-w-0 flex-1">
                                <span class="flex items-center gap-2 font-medium text-content group-hover:text-accent">
                                    {{ repo.name }}
                                    <Icon name="external" class="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                                </span>
                                <span v-if="repo.description" class="mt-1 block text-sm text-muted">{{ repo.description }}</span>
                            </span>
                            <span class="flex shrink-0 flex-wrap gap-1.5">
                                <span v-for="stack in repo.stacks" :key="stack.name"
                                    class="rounded-md bg-raised px-2 py-0.5 font-mono text-[11px] text-muted">
                                    {{ stack.name }}
                                </span>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
