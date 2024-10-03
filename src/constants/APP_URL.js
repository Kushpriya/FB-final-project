const APP_URL = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    CATEGORY: '/category',
    MERCHANDISE: '/merchandise',
    CLIENTS: '/clients',
    VENUE: (clientId) => `/venue/${clientId}`, 
    TRANSPORT: '/transport',
    ORDER_GROUP: '/ordergroup',
    COURIERS: '/couriers',
    CHILDREN_RECURRING_ORDER: (mainRecurringOrderId) => `/childrenrecurringorder/${mainRecurringOrderId}`, 
};

export { APP_URL };
