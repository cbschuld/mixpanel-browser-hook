import mixpanel from 'mixpanel-browser'

export interface MixpanelConfig {
  debug?: boolean
  track_pageview?: boolean
  persistence?: 'cookie' | 'localStorage'
  shouldResetOnUnmount?: boolean
  [key: string]: unknown
}

export interface MixpanelPeople {
  set: (properties: Record<string, unknown>) => void
  increment: (property: string, value: number) => void
}

export interface MixpanelAPI {
  track: (eventName: string, properties?: Record<string, unknown>) => void
  identify: (userId: string) => void
  alias: (aliasId: string, originalId?: string) => void
  reset: () => void
  optInTracking: () => void
  optOutTracking: () => void
  people: MixpanelPeople
  timeEvent: (eventName: string) => void
  register: (properties: Record<string, unknown>) => void
}
let hasWarned = false

const warnOnce = () => {
  if (!hasWarned) {
    console.warn('Mixpanel not initialized.')
    hasWarned = true
  }
}

// Core Mixpanel API creation function
export const createMixpanelAPI = (
  instance: typeof mixpanel | null,
  token: string | null,
): MixpanelAPI => {
  if (!instance || !token) {
    return {
      track: () => warnOnce(),
      identify: () => warnOnce(),
      alias: () => warnOnce(),
      reset: () => warnOnce(),
      optInTracking: () => warnOnce(),
      optOutTracking: () => warnOnce(),
      people: {
        set: () => warnOnce(),
        increment: () => warnOnce(),
      },
      timeEvent: () => warnOnce(),
      register: () => warnOnce(),
    }
  }

  return {
    track: (eventName, properties = {}) => {
      try {
        instance.track(eventName, properties)
      } catch (e) {
        console.error('Mixpanel track error:', e)
      }
    },
    identify: (userId) => {
      try {
        instance.identify(userId)
      } catch (e) {
        console.error('Mixpanel identify error:', e)
      }
    },
    alias: (aliasId, originalId) => {
      try {
        instance.alias(aliasId, originalId)
      } catch (e) {
        console.error('Mixpanel alias error:', e)
      }
    },
    reset: () => {
      try {
        instance.reset()
      } catch (e) {
        console.error('Mixpanel reset error:', e)
      }
    },
    optInTracking: () => {
      try {
        instance.opt_in_tracking()
      } catch (e) {
        console.error('Mixpanel opt-in error:', e)
      }
    },
    optOutTracking: () => {
      try {
        instance.opt_out_tracking()
      } catch (e) {
        console.error('Mixpanel opt-out error:', e)
      }
    },
    people: {
      set: (properties) => {
        try {
          instance.people.set(properties)
        } catch (e) {
          console.error('Mixpanel people.set error:', e)
        }
      },
      increment: (property, value) => {
        try {
          instance.people.increment(property, value)
        } catch (e) {
          console.error('Mixpanel people.increment error:', e)
        }
      },
    },
    timeEvent: (eventName) => {
      try {
        instance.time_event(eventName)
      } catch (e) {
        console.error('Mixpanel timeEvent error:', e)
      }
    },
    register: (properties) => {
      try {
        instance.register(properties)
      } catch (e) {
        console.error('Mixpanel register error:', e)
      }
    },
  }
}
