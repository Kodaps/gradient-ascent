import React from 'react'

import type { Page } from '@payload-types'

import { HighImpactHero } from '@cms/heroes/HighImpact'
import { LowImpactHero } from '@cms/heroes/LowImpact'
import { MediumImpactHero } from '@cms/heroes/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}