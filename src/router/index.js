import { createRouter, createWebHistory } from 'vue-router';
import LoanListPage from '../views/LoanListPage.vue';
import LoanUserListPage from '../views/LoanUserListPage.vue';
import LoanDetailsPage from '../views/LoanDetailsPage.vue';

const routes = [
{
    path: '/',
    name: 'LoanListPage',
    component: LoanListPage
},
{
    path: '/loan-user-list',
    name: 'LoanUserListPage',
    component: LoanUserListPage
},
{
    path: '/loan-details/:id',
    name: 'LoanDetails',
    component: LoanDetailsPage
}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;