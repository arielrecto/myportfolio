<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from '@/components/Icon.vue'
import personal from '@/data/personal.json'
import logo from '@/assets/logo-mark.png'

const links = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
]

const isOpen = ref(false)
const isScrolled = ref(false)
const onScroll = () => { isScrolled.value = window.scrollY > 8 }

onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
    <header
        :class="['fixed inset-x-0 top-0 z-30 transition-colors duration-300',
            isScrolled || isOpen ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'border-b border-transparent']">
        <nav class="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
            <a href="#home" class="flex items-center gap-3">
                <img :src="logo" alt="" class="h-9 w-9" />
                <span class="font-semibold tracking-tight text-content">{{ personal.shortName }}</span>
            </a>

            <div class="hidden items-center gap-8 md:flex">
                <a v-for="link in links" :key="link.href" :href="link.href"
                    class="text-sm text-muted transition-colors hover:text-content">{{ link.label }}</a>
                <a href="#contact" class="btn-primary !px-4 !py-2">Contact</a>
            </div>

            <button class="rounded-lg p-2 text-content md:hidden" :aria-expanded="isOpen" aria-label="Toggle menu"
                @click="isOpen = !isOpen">
                <Icon :name="isOpen ? 'close' : 'menu'" class="h-6 w-6" />
            </button>
        </nav>

        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
            leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isOpen" class="border-t border-line px-5 pb-6 pt-2 md:hidden">
                <a v-for="link in links" :key="link.href" :href="link.href" @click="isOpen = false"
                    class="block border-b border-line py-3 text-content">{{ link.label }}</a>
                <a href="#contact" @click="isOpen = false" class="btn-primary mt-5 w-full">Contact</a>
            </div>
        </Transition>
    </header>
</template>
