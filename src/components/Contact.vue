<script setup>
import { ref, computed, onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import personal from '@/data/personal.json'
import logo from '@/assets/logo-mark.png'

const contacts = computed(() => [
    { icon: 'mail', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: 'phone', label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: 'pin', label: 'Location', value: personal.location, href: null },
])

const emptyForm = () => ({ from: '', message: '' })
const emailData = ref(emptyForm())
const isLoading = ref(false)

const toast = (text) => Toastify({
    text,
    duration: 3000,
    style: { background: '#121823', border: '1px solid #232C3B', color: '#E7EBF1' },
}).showToast()

const sendEmail = async () => {
    isLoading.value = true
    try {
        await emailjs.send('service_5spy7bo', 'template_zy7kz5j', {
            from_email: emailData.value.from,
            message: emailData.value.message,
        })
        toast('Message sent — thank you!')
        emailData.value = emptyForm()
    } catch (error) {
        toast(`Could not send: ${error?.text ?? error}`)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    emailjs.init({ publicKey: '1IjuMSzitbJ023LEn' })
})

const year = new Date().getFullYear()
</script>

<template>
    <section id="contact" class="section">
        <div class="card grid gap-12 overflow-hidden p-8 sm:p-12 lg:grid-cols-2">
            <div v-reveal>
                <p class="eyebrow">Contact</p>
                <h2 class="section-title">Let's build something together.</h2>
                <p class="mt-4 max-w-md text-muted">Open to engineering roles, Odoo/ERP consulting, and project
                    collaborations. Send a message and I'll get back to you.</p>

                <ul class="mt-8 space-y-4">
                    <li v-for="contact in contacts" :key="contact.label" class="flex items-center gap-4">
                        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                            <Icon :name="contact.icon" class="h-4 w-4" />
                        </span>
                        <div>
                            <p class="text-xs text-muted">{{ contact.label }}</p>
                            <a v-if="contact.href" :href="contact.href"
                                class="text-content transition-colors hover:text-accent">{{ contact.value }}</a>
                            <p v-else class="text-content">{{ contact.value }}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <form v-reveal :delay="100" @submit.prevent="sendEmail" class="flex flex-col gap-5">
                <label class="flex flex-col gap-2">
                    <span class="text-sm font-medium text-content">Your email</span>
                    <input v-model="emailData.from" type="email" required placeholder="you@company.com" class="input" />
                </label>
                <label class="flex flex-1 flex-col gap-2">
                    <span class="text-sm font-medium text-content">Message</span>
                    <textarea v-model="emailData.message" required rows="6" placeholder="Tell me about your project or role…"
                        class="input flex-1 resize-none" />
                </label>
                <button type="submit" :disabled="isLoading" class="btn-primary disabled:cursor-wait disabled:opacity-60">
                    <template v-if="!isLoading">Send message <Icon name="send" class="h-4 w-4" /></template>
                    <template v-else>Sending…</template>
                </button>
            </form>
        </div>
    </section>

    <footer class="border-t border-line">
        <div
            class="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
            <p class="flex items-center gap-3">
                <img :src="logo" alt="" class="h-7 w-7" />
                © {{ year }} {{ personal.name }}. All rights reserved.
            </p>
            <div class="flex items-center gap-1">
                <a v-for="social in personal.socials" :key="social.name" :href="social.url" target="_blank"
                    rel="noopener" :aria-label="social.name"
                    class="rounded-lg p-2 transition-colors hover:text-accent">
                    <Icon :name="social.icon" class="h-4 w-4" />
                </a>
            </div>
        </div>
    </footer>
</template>
