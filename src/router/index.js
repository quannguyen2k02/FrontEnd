import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '@/views/Detail.vue'
import Shop from '@/views/Shop.vue'
import Cookies from 'js-cookie'
import Login from '../views/Login.vue'
import Register from '@/views/Register.vue';
import Cart from '../views/Cart.vue'
import Checkout from '@/views/Checkout.vue'
import User from '@/views/User.vue'
import Contact from '@/views/Contact.vue'
import AllProduct from '@/views/AllProduct.vue'
import ShopDetail from '@/views/ShopDetail.vue'
import HomeAdmin from '@/views/Admin/HomeAdmin.vue'

import AddViewproduct from '@/views/Admin/AddViewproduct.vue'
import EditViewproduct from '@/views/Admin/EditViewproduct.vue'
import AddViewcategory from '@/views/Admin/AddViewcategory.vue'
import EditViewcategory from '@/views/Admin/EditViewcategory.vue'
import AddVieworder from '@/views/Admin/AddVieworder.vue'
import { jwtDecode } from 'jwt-decode'
import EditVieworder from '@/views/Admin/EditVieworder.vue'
import UserOrder from '@/views/UserOrder.vue'
import ResultCheckout from '@/views/ResultCheckout.vue'
import DetailViewUser from '@/views/Admin/DetailViewUser.vue'
import Unauthorized from '@/views/unauthorized.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/product/:id',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/categoryproduct/:id',
            name: 'Shop',
            component: Shop
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/AllProducts',
            name: 'AllProducts',
            component: AllProduct
        },
        {
            path: '/ShopDetail',
            name: 'ShopDetail',
            component: ShopDetail
        },
        {
            path: '/userorder/:id',
            name: 'userorder',
            component: UserOrder
        },
        {
            path: '/detailuser/:id',
            name: 'detailuser',
            component: DetailViewUser
        },
        {
            path: '/resultcheckout',
            name: 'resultcheckout',
            component: ResultCheckout
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: Unauthorized
        },
        {
            path: '/admin',
            name: 'admin',
            component: HomeAdmin,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
        {
            path: '/admin/addproduct',
            name: 'addproduct',
            component: AddViewproduct,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
        {
            path: '/admin/editproduct/:id',
            name: 'editproduct',
            component: EditViewproduct,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
        {
            path: '/admin/addcategory',
            name: 'addcategory',
            component: AddViewcategory,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
        {
            path: '/admin/editcategory/:id',
            name: 'editcategory',
            component: EditViewcategory,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
        {
            path: '/admin/addorder',
            name: 'addorder',
            component: AddVieworder,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
        {
            path: '/admin/editorder/:id',
            name: 'editorder',
            component: EditVieworder,
            beforeEnter: (to, from, next) => {
                const token = Cookies.get('token');
                if (token == null) {
                    next('/unauthorized');
                }
                const decodedToken = jwtDecode(token);
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role === 'Administrator') {
                    next();
                } else {
                    next('/unauthorized');
                }
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 }; // Chuyển lên đầu trang
        }
    },
})
router.beforeEach((to, from, next) => {
    const token = Cookies.get('token'); // Lấy JWT từ cookie


    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next('/login'); // Chuyển hướng đến trang đăng nhập nếu không có token
    } else {
        next();
    }
});
export default router