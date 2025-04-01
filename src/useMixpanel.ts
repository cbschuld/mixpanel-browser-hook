import { useEffect, useState, useMemo, useContext, createContext } from 'react'
import mixpanel from 'mixpanel-browser'
import { MixpanelAPI, MixpanelConfig, createMixpanelAPI } from './MixpanelTypes'

export const MixpanelContext = createContext<MixpanelAPI | undefined>(undefined)

// The single hook, context-aware and strongly typed
export const useMixpanel = (
  token?: string | null,
  config: MixpanelConfig = {},
): MixpanelAPI => {
  const context = useContext(MixpanelContext)
  const [mixpanelInstance, setMixpanelInstance] = useState<
    typeof mixpanel | null
  >(null)

  useEffect(() => {
    if (token && !context) {
      mixpanel.init(token, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: true,
        persistence: 'localStorage',
        ...config,
      })
      setMixpanelInstance(mixpanel)
    }
    return () => {
      // Only reset if explicitly needed
      if (config.shouldResetOnUnmount && mixpanelInstance && !context) {
        mixpanelInstance.reset()
      }
    }
  }, [token, config, context])

  return useMemo(() => {
    if (context) {
      return context // Use the provider's instance
    }
    return createMixpanelAPI(mixpanelInstance, token ?? null)
  }, [context, mixpanelInstance, token])
}
