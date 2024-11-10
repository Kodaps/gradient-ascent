'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary',
    description: 'These cookies are essential for the website to function properly.',
    required: true,
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'These cookies enable personalized features and functionality.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'These cookies help us understand how visitors interact with the website.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'These cookies are used to deliver relevant ads and marketing campaigns.',
  },
]

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: Record<string, boolean>) => void;
}

export default function CookiePreferencesModal({ isOpen, onClose, onSave }: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<Record<string, boolean>>(() => 
    cookieCategories.reduce((acc, category) => ({
      ...acc,
      [category.id]: category.required || false
    }), {})
  )

  const handleToggle = (categoryId: string) => {
    setPreferences(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  const handleSave = () => {
    onSave(preferences)
    onClose()
  }

  const handleAcceptAll = () => {
    const allAccepted = cookieCategories.reduce((acc, category) => ({
      ...acc,
      [category.id]: true
    }), {})
    onSave(allAccepted)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. Required cookies cannot be disabled as they are essential for the website to function properly.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          {cookieCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-4">
              <Switch
                id={category.id}
                checked={preferences[category.id]}
                onCheckedChange={() => handleToggle(category.id)}
                disabled={category.required}
              />
              <div className="space-y-1">
                <Label htmlFor={category.id} className="font-medium">
                  {category.name}
                </Label>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleAcceptAll}>
            Accept All
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Preferences
          </Button>
        </DialogFooter>
        <Button
          type="button"
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}