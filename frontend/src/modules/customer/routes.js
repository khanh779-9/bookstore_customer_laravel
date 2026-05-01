import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Account = lazy(() => import('@/pages/Account'));
const Orders = lazy(() => import('@/pages/Orders'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const Contact = lazy(() => import('@/pages/Contact'));
const About = lazy(() => import('@/pages/About'));
const PrivacyPolicy = lazy(() => import('@/pages/policies/PrivacyPolicy'));
const ReturnPolicy = lazy(() => import('@/pages/policies/ReturnPolicy'));
const WarrantyPolicy = lazy(() => import('@/pages/policies/WarrantyPolicy'));
const ShippingPolicy = lazy(() => import('@/pages/policies/ShippingPolicy'));

export const customerRoutes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/products/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/return-policy', component: ReturnPolicy },
  { path: '/warranty-policy', component: WarrantyPolicy },
  { path: '/shipping-delivery', component: ShippingPolicy },
  { path: '/checkout', component: Checkout },
  { path: '/account', component: Account },
  { path: '/orders', component: Orders },
  { path: '/wishlist', component: Wishlist },
  { path: '/notifications', component: Notifications },
];
