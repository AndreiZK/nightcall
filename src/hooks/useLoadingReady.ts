import { useEffect } from 'react';
import useStore from '@/store/store';

export const useLoadingReady = (...dependencies: any[]) => {
    useEffect(() => {
        const isAllDependenciesLoaded = dependencies.every(dep => {
            if (Array.isArray(dep)) {
                return dep.length > 0 && dep.every(item => 
                    item !== null && item !== undefined
                );
            }
            return dep !== null && dep !== undefined;
        });

        useStore.setState({ isContentLoaded: isAllDependenciesLoaded });
    }, dependencies);

    return dependencies.every(dep => {
        if (Array.isArray(dep)) {
            return dep.length > 0 && dep.every(item => 
                item !== null && item !== undefined
            );
        }
        return dep !== null && dep !== undefined;
    });
};