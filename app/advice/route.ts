import { Slip } from '@/app/types'

export async function GET(request: Request) {
  console.log('Inside GET')
  const response = await fetch('https://api.adviceslip.com/advice', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  const data = (await response.json()) as { slip: Slip }

  console.log('data ===>', data)

  return Response.json(data.slip)
}
