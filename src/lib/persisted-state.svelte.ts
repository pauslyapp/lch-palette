import { browser } from '$app/environment'
import { z } from 'zod'

export const persistedState = <
  Schema extends z.ZodSchema,
  StateType extends z.infer<Schema>,
  InitialType extends StateType,
>(
  key: string,
  zodSchema: Schema,
  initial: InitialType,
): StateType => {
  if (browser) {
    try {
      const storedValue = window.localStorage.getItem(key)
      if (storedValue) {
        const parsed = JSON.parse(storedValue)
        zodSchema.parse(parsed)
        initial = parsed
      }
    } catch (e) {
      console.warn(`Unable to parse stored value for ${key}. Clearing it now.`, e)
      window.localStorage.removeItem(key)
    }
  }

  const state = $state(initial)

  $effect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  })

  return state as StateType
}
