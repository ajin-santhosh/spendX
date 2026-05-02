import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Empty className="w-full max-w-md text-center space-y-6">
        
        <EmptyHeader className="space-y-4">
          
          {/* Image ABOVE spinner (clean layout) */}
          <EmptyMedia className="flex flex-col items-center gap-4">
            <img
              src="https://res.cloudinary.com/djqxrh1gk/image/upload/v1776871980/Spend_X_1_-Photoroom_wrhzma.png"
              className="w-32 h-32 object-contain opacity-80 dark:hidden"
              alt="Processing"
            />
            <img
              src="https://res.cloudinary.com/djqxrh1gk/image/upload/v1776871258/Dark_Spend_X-Photoroom_richbe.png"
              className="w-32 h-32 object-contain opacity-80 hidden dark:block"
              alt="Processing"
            />

            {/* Spinner BELOW image */}
            <Spinner />
          </EmptyMedia>

          <EmptyTitle className="text-lg font-semibold">
            Processing your request
          </EmptyTitle>

          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>

        </EmptyHeader>

        <EmptyContent>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </EmptyContent>

      </Empty>
    </div>
  )
}

export default PageLoader