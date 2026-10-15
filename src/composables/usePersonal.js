import personal from '@/data/personal.json'

// Repo links are derived from the single GitHub profile URL in personal.json.
const githubUrl = personal.socials.find((s) => s.icon === 'github')?.url ?? ''

export const repoUrl = (repo) => `${githubUrl}/${repo}`

export { personal, githubUrl }
