//@ts-nocheck

import { create } from "zustand";

export type Product = {
    id: number;
    type: number[];
    extra: number[];
};

const saveToStorage = (key: string, value: any) => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const dataWithTimestamp = {
                data: value,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(dataWithTimestamp));
        }
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
    }
};

const loadFromStorage = (key: string) => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
    } catch (e) {
        console.warn('Failed to load from localStorage:', e);
        return null;
    }
};

const checkAndCleanStorage = (key: string) => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const item = localStorage.getItem(key);
            if (!item) return null;

            const parsed = JSON.parse(item);
            if (!parsed || !parsed.timestamp) {
                console.warn(`Invalid data structure for ${key}:`, parsed);
                return parsed;
            }

            const now = Date.now();
            const tenMinutes = 10 * 60 * 1000;

            console.log(`Checking ${key}:`, {
                stored: parsed,
                timePassed: now - parsed.timestamp,
                shouldClean: now - parsed.timestamp > tenMinutes
            });

            if (now - parsed.timestamp > tenMinutes) {
                localStorage.removeItem(key);
                console.log(`Cleared ${key}`);
                return null;
            }
            return parsed.data;
        }
    } catch (e) {
        console.warn('Failed to check/clean localStorage:', e);
        return null;
    }
};

const useStore = create((set, get) => ({
    isModalClosing: false,
    checkAndCleanStorage: checkAndCleanStorage,
    order: checkAndCleanStorage('order') || [],
    loadedIds: new Set(checkAndCleanStorage('loadedIds') || []),
    amounts: new Map(Array.isArray(checkAndCleanStorage('amounts')) ? checkAndCleanStorage('amounts') : []),
    institution: checkAndCleanStorage('institution'),
    phone: null,
    fio: null,
    street: null,
    flat: null,
    entrance: null,
    house: null,
    description: null,
    mail: null,
    pass: null,
    username: null,
    isOver: false,
    price: 0,
    orderId: null,
    isPaymentOver: false,
    isPayed: false,
    isContentLoaded: false,
    jwtToken: null,
    isAuth: false,
    user: null,
    paymentLink: "",
    promocode: null,
    addToOrder: (product: Product) => {
        set((state) => {
            if (!state.loadedIds.has(product)) {
                const updatedOrder = [...state.order, product];
                const updatedIds = new Set(state.loadedIds);
                const toastIndicator = state.toastIndicator;

                updatedIds.add(product);
                
                saveToStorage('order', updatedOrder);
                saveToStorage('loadedIds', Array.from(updatedIds));

                return {
                    order: updatedOrder,
                    loadedIds: updatedIds,
                    toastIndicator: toastIndicator + 1,
                };
            }
            return state;
        });
    },
    updateAmount: (product: Product, amount) => {
        const state = get();
        // Устанавливаем флаг, что изменение происходит из модального окна
        set({ modalAction: true });
        
        const amounts = new Map(state.amounts);
        const productKey = Array.from(amounts.keys()).find(
            (i) => JSON.stringify(i) === JSON.stringify(product)
        );

        if (productKey) amounts.set(productKey, amount);
        else amounts.set(product, amount);

        saveToStorage('amounts', Array.from(amounts));
        
        set({ amounts });
        // Сбрасываем флаг после обновления
        setTimeout(() => {
            set({ modalAction: false });
        }, 0);
    },
    addItem: (product: Product) => {
        set((state) => ({ order: [...state.order, product] }));
    },
    removeFromOrder: (product: Product) => {
        set((state) => {
            const newOrder = state.order.filter(
                (item) => JSON.stringify(item) !== JSON.stringify(product)
            );

            const updatedIds = new Set(state.loadedIds);
            updatedIds.delete(product);

            // Заменяем прямое сохранение на saveToStorage
            saveToStorage('order', newOrder);
            saveToStorage('loadedIds', Array.from(updatedIds));

            return { order: newOrder, loadedIds: updatedIds };
        });
    },
    clearOrder: () => {
        set((state) => {
            // Clear from localStorage
            localStorage.removeItem('order');
            localStorage.removeItem('loadedIds');
            localStorage.removeItem('amounts');
            localStorage.removeItem('institution');

            return { 
                order: [], 
                loadedIds: new Set(),
                institution: null 
            };
        });
    },
    addDuplicateItem: (product: Product) => {
        set((state) => {
            const existingItemIndex = state.order.findIndex(
                (item) => JSON.stringify(item) !== JSON.stringify(product)
            );

            if (existingItemIndex !== -1) {
                const newItem = { ...state.order[existingItemIndex] };
                const updatedOrder = [
                    ...state.order.slice(0, existingItemIndex + 1),
                    newItem,
                    ...state.order.slice(existingItemIndex + 1),
                ];

                return { order: updatedOrder };
            }

            return state;
        });
    },
    removeFirstItem: (product: Product) => {
        set((state) => {
            const newOrder = state.order.slice();

            const indexToRemove = state.order.findIndex(
                (item) => JSON.stringify(item) !== JSON.stringify(product)
            );

            if (indexToRemove !== -1) {
                newOrder.splice(indexToRemove, 1);
                return { order: newOrder };
            }

            return state;
        });
    },
    isBucketClicked: false,
    toastIndicator: 0,
    isCliced: false,
    isLocal: false,

    // Добавим новое состояние для отслеживания источника изменений
    modalAction: false,

    // Добавим новые состояния
    activeModal: null, // Хранит имя активного модального окна
    isModalTransitioning: false, // Флаг для отслеживания переходного состояния

    // Общая функция для управления модальными окнами
    setModal: (modalName: string | null) => {
        const state = get();
        
        if (state.isModalTransitioning) return;
        
        if (!modalName) {
            // Закрытие модального окна
            set({ isModalTransitioning: true });
            setTimeout(() => {
                set({ 
                    activeModal: null,
                    isModalTransitioning: false,
                    isOrderModalOpen: false,
                    isLoginModalOpen: false,
                    isRegistrationModalOpen: false,
                    isProfileModalOpen: false,
                    isTrackOpen: false,
                    isCourierModalOpen: false,
                    isPartnershipModalOpen: false
                });
            }, 300);
        } else {
            // Открытие модального окна
            set({ 
                activeModal: modalName,
                isOrderModalOpen: modalName === 'order',
                isLoginModalOpen: modalName === 'login',
                isRegistrationModalOpen: modalName === 'registration',
                isProfileModalOpen: modalName === 'profile',
                isTrackOpen: modalName === 'track',
                isCourierModalOpen: modalName === 'courier',
                isPartnershipModalOpen: modalName === 'partnership'
            });
        }
    },
    setInstitution: (letter) => {
        saveToStorage('institution', letter);
        set({ institution: letter });
    },
    clearInstitution: () => {
        localStorage.removeItem('institution');
        set({ institution: null });
    },
    logout: () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('user');
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        set({ 
            jwtToken: null,
            isAuth: false,
            user: null,
            mail: null,
            pass: null,
            username: null,
        });
    },
    login: (token) => {
        if (!token) return;
        
        // Сохраняем токен во всех местах
        localStorage.setItem('jwt', token);
        // document.cookie = `jwt=${token}; path=/; max-age=2592000`; // 30 дней
        
        set({ 
            jwtToken: token,
            isAuth: true
        });
    },
    checkAuth: () => {
        const state = get();
        // Проверяем токен в разных местах
        const localToken = localStorage.getItem('jwt');
        // const cookieToken = document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];
        
        // Если есть действующий токен в store, проверяем его валидность
        if (state.jwtToken) {
            return true;
        }
        
        // Если нашли токен в localStorage или cookie, восстанавливаем сессию
        if (localToken) {
            const token = localToken;
            set({ 
                jwtToken: token,
                isAuth: true
            });
            return true;
        }
        
        return false;
    },
    // Метод для очистки всех данных пользователя
    clearUserData: () => {
        const clearOrder = get().clearOrder;
        const logout = get().logout;
        
        // Очищаем корзину
        clearOrder();
        // Выходим из аккаунта
        logout();
        
        // Очищаем все остальные пользовательские данные
        localStorage.clear();
        sessionStorage.clear();
        
        // Очищаем все куки
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
    }
}));

export default useStore;