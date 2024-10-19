//@ts-nocheck

import { create } from "zustand";

export type Product = {
    id: number;
    type: number[];
    extra: number[];
};

const useStore = create((set, get) => ({
    order: [],
    loadedIds: new Set(),
    amounts: new Map(),
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
    institution: null,
    jwtToken: null,
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

            return { order: newOrder, loadedIds: updatedIds };
        });
    },
    clearOrder: () => {
        set((state) => {
            return { order: [], loadedIds: new Set() };
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
}));

export default useStore;
