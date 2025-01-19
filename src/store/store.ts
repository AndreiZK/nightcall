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
    jwtToken:
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTczMTUyMDA1NiwiZXhwIjoxNzM0MTEyMDU2fQ.EFeyUxIzdPRC_skHDAghMxwI6RkF4OU37ZbnJQs1JG0", //null
        null,
    isAuth: false,
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
        const amounts = new Map(get().amounts);
        const productKey = Array.from(amounts.keys()).find(
            (i) => JSON.stringify(i) === JSON.stringify(product)
        );

        if (productKey) amounts.set(productKey, amount);
        else amounts.set(product, amount);

        // Заменяем прямое сохранение на использование saveToStorage
        saveToStorage('amounts', Array.from(amounts));

        set({ amounts });
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
    isLoginModalOpen: false,
    isRegistrationModalOpen: false,
    isSecondStepModalOpen: false,
    isProfileModalOpen: false,
    isOrderModalOpen: false,
    isCourierModalOpen: false,
    isPartnershipModalOpen: false,
    isTrackOpen: false,

    setLoginModal: (value: boolean) => set({ isLoginModalOpen: value }),
    setCourierModal: (value: boolean) => set({ isCourierModalOpen: value }),
    setPartnershipModal: (value: boolean) =>
        set({ isPartnershipModalOpen: value }),
    setRegistrationModal: (value: boolean) =>
        set({ isRegistrationModalOpen: value }),
    setSecondStepModal: (value: boolean) =>
        set({ isSecondStepModalOpen: value }),
    setProfileModal: (value: boolean) => set({ isProfileModalOpen: value }),
    setOrderModal: (value: boolean) => set({ isOrderModalOpen: value }),
    setTrackOpen: (value: boolean) => set({ isTrackOpen: value }),
    setInstitution: (letter) => {
        saveToStorage('institution', letter);
        set({ institution: letter });
    },
    clearInstitution: () => {
        localStorage.removeItem('institution');
        set({ institution: null });
    }
}));

export default useStore;