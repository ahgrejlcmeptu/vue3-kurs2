import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import './theme.css'

const app = createApp(App)

app.component('summary-title', defineAsyncComponent(() => {
    return import('./SummaryTitle')
}))
app.component('summary-avatar', defineAsyncComponent(() => {
    return import('./SummaryAvatar')
}))
app.component('summary-subtitle', defineAsyncComponent(() => {
    return import('./SummarySubTitle')
}))
app.component('summary-text', defineAsyncComponent(() => {
    return import('./SummaryText')
}))

app.mount('#app')
