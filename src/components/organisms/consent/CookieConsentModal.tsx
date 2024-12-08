"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import CookiePreferencesModal from "./CookiePreferencesModal"

export default function CookieConsentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const consent = getCookie("cookie-consent")
    if (!consent) {
      setIsOpen(true)
    }
  }, [])

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
  }

  const getCookie = (name: string) => {
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=")
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, "")
  }

  const handleAccept = () => {
    setCookie("cookie-consent", "accepted", 365)
    setIsOpen(false)
  }

  const handleManagePreferences = () => {
    setIsOpen(false)
    setShowPreferences(true)
  }

  const handleSavePreferences = (preferences: Record<string, boolean>) => {
    const preferencesString = JSON.stringify(preferences)
    setCookie("cookie-preferences", preferencesString, 365)
    setShowPreferences(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cookie Consent</DialogTitle>
            <DialogDescription>
              We use cookies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. By clicking
              "Accept All", you consent to our use of cookies.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="default" onClick={handleAccept}>
              Accept All
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleManagePreferences}
            >
              Manage Preferences
            </Button>
          </DialogFooter>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogContent>
      </Dialog>
      <CookiePreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
      />
    </>
  )
}
