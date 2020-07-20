const routes = [
    {
        path : '/', component : homeView
    },
    {
        path : '/home', component : homeView
    },
    {
        path: '/posts', component : homeView 
    },
    {
        path : '/posts/:slug', component : postView,
    },
    {
        path: '/404', component : NotFound
    }, 
    {
        path: '*', redirect : '/404'
    },
    {
        path: '/edit/:id', component : EditPost 
    },
    {
        path: '/edithistory/:id', component : EditHistory 
    },
    {
        path: '/about', component : About
    },
    {
        path: '/dev', component : About
    },
    {
        path: '/project', component : About
    }
];

const router = new VueRouter({
    // mode: 'history',
    routes,
})