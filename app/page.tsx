'use client'

import { twMerge } from 'tailwind-merge'
import Button from '@/app/Button'
import { useEffect, useState } from 'react'
import { Slip } from '@/app/types'

const defaultAdvice = {
  id: 117,
  advice:
    "It is easy to sit up and take notice, what's difficult is getting up and taking action",
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [advice, setAdvice] = useState(defaultAdvice)

  useEffect(() => {
    onClick({ minDelaySeconds: 0 })
  }, [])

  async function onClick({ minDelaySeconds = 2 }) {
    console.log(minDelaySeconds)
    setIsLoading(true)
    const start = Date.now()
    const result = await getAdvice()
    const end = Date.now()
    const delay = minDelaySeconds * 1000 - (end - start)
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    setAdvice(result)
    setIsLoading(false)
  }

  async function getAdvice(): Promise<Slip> {
    const response = await fetch('/advice', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })
    return (await response.json()) as Slip
  }

  return (
    <div
      className={`flex flex-col min-h-dvh min-w-fit bg-background tablet:items-center tablet:justify-center`}
    >
      <div className={`flex flex-col px-4 pt-[120px] pb-[200px] tablet:p-0`}>
        <div
          className={twMerge(
            `relative`,
            `flex flex-col bg-dark_grayish_blue items-center rounded-[10px] px-6 pt-10 pb-16`,
            `tablet:w-[540px] tablet:p-12 tablet:pb-[72px] tablet:rounded-[15px]`
          )}
        >
          <Title className={`mb-6`} advice={advice} isLoading={isLoading} />
          <Advice
            className={`mb-6 tablet:mb-10`}
            advice={advice}
            isLoading={isLoading}
          />
          <Divider />
          <Button
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2`}
            onClick={() => onClick({ minDelaySeconds: 2 })}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

function Title({
  className = '',
  advice,
  isLoading = false,
}: {
  className?: string
  advice: Slip
  isLoading?: boolean
}) {
  return (
    <h1
      className={twMerge(
        `text-[11px] text-primary font-semibold leading-[120%] uppercase tracking-[3.457px]`,
        `tablet:text-[13px] tablet:tracking-[4.086px]`,
        !isLoading && `transition-[color,text-opacity] duration-500`,
        isLoading &&
          'text-primary/0 bg-primary bg-opacity-20 animate-pulse rounded-3xl',
        className
      )}
    >
      Advice #{advice.id}
    </h1>
  )
}

function Advice({
  className = '',
  advice,
  isLoading = false,
}: {
  className?: string
  advice: Slip
  isLoading?: boolean
}) {
  return (
    <p
      className={twMerge(
        `text-center text-[24px] text-lightcyan font-bold leading-[140%] tracking-[-0.257px]`,
        `tablet:text-[28px] tablet:tracking-[-0.3px]`,
        !isLoading && `transition-[color] duration-500`,
        isLoading &&
          'text-lightcyan/0 bg-lightcyan bg-opacity-20 animate-pulse rounded-3xl',
        className
      )}
    >
      “{advice.advice}”
    </p>
  )
}

function Divider({ className = '' }: { className?: string }) {
  return (
    <div
      className={twMerge(`w-full flex flex-row gap-4 items-center`, className)}
    >
      <div className={`grow bg-grayish_blue h-px`} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
      >
        <rect width="6" height="16" rx="3" fill="#CEE3E9" />
        <rect x="14" width="6" height="16" rx="3" fill="#CEE3E9" />
      </svg>
      <div className={`grow bg-grayish_blue h-px`} />
    </div>
  )
}
