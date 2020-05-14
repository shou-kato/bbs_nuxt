export default function({ store, route, redirect }) {
    if (!store.getters.isAuthenticated && route.name !== '/auth/login') {
        redirect('/auth/login')
    }
    if (store.getters.isAuthenticated && route.name === '/auth/login') {
        redirect('/protected')
    }
}
