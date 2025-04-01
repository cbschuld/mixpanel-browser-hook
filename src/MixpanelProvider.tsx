import React, { createContext, ReactNode } from 'react'
import { MixpanelAPI } from './MixpanelTypes'
import { MixpanelContext, useMixpanel } from './useMixpanel'

interface MixpanelProviderProps {
  children: ReactNode
  token: string | null
  config?: Record<string, any>
}

export const MixpanelProvider: React.FC<MixpanelProviderProps> = ({
  children,
  token,
  config,
}) => {
  const mixpanel = useMixpanel(token, config)

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  )
}
