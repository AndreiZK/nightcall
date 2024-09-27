import { toVars } from "./utils"

export const _colors = {
    white100: '#FFFFFF',
    black100: '#070707',
    black200: '#1e1e1e',
    purple: '#A43FFD',
    
}


export const colors: typeof _colors = toVars(_colors)