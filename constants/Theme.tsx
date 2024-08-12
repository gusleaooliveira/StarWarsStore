import { dark, default as def } from '@eva-design/eva'
import { createContext } from 'react'
 
export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {}
})


