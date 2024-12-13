import { colors } from '@/styles/theme/colors'

export const buttonVariants = {
  primary: {
    base: `bg-[${colors.components.button.primary.bg}] text-white hover:bg-[${colors.components.button.primary.hover}] active:bg-[${colors.components.button.primary.active}]`,
    outline: `border-2 border-[${colors.components.button.primary.bg}] text-[${colors.components.button.primary.bg}] hover:bg-[${colors.components.button.primary.bg}] hover:text-white`,
    ghost: `text-[${colors.components.button.primary.bg}] hover:bg-[${colors.components.button.ghost.hover}] active:bg-[${colors.components.button.ghost.active}]`,
  },
  secondary: {
    base: `bg-[${colors.components.button.secondary.bg}] text-[${colors.components.button.secondary.text}] hover:bg-[${colors.components.button.secondary.hover}] active:bg-[${colors.components.button.secondary.active}]`,
    outline: `border-2 border-[${colors.neutral[300]}] text-[${colors.neutral[700]}] hover:bg-[${colors.neutral[100]}]`,
    ghost: `text-[${colors.neutral[700]}] hover:bg-[${colors.neutral[100]}] active:bg-[${colors.neutral[200]}]`,
  },
  danger: {
    base: `bg-[${colors.semantic.error.base}] text-white hover:bg-[${colors.semantic.error.dark}]`,
    outline: `border-2 border-[${colors.semantic.error.base}] text-[${colors.semantic.error.base}] hover:bg-[${colors.semantic.error.base}] hover:text-white`,
    ghost: `text-[${colors.semantic.error.base}] hover:bg-[${colors.semantic.error.light}]`,
  },
}
