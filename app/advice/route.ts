import { Slip } from '@/app/types'

export async function GET(request: Request) {
  const response = await fetch('https://api.adviceslip.com/advice', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
  const data = (await response.json()) as { slip: Slip }
  return Response.json(data.slip)
}
