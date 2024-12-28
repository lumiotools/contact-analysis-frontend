"use client"

import ContractSimulator from '@/components/ContractSimulator'
import { GaugeChart } from '@/components/gauge-chart'
import { SavingsChart } from '@/components/savings-graph'
import { Card } from '@/components/ui/card'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Dashboard() {
  return (
    <div className={`min-h-screen bg-[#2A2A3C] p-6 ${montserrat.className}`}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-transparent border-none">
            <GaugeChart score={75} />
          </Card>
          <Card className="bg-transparent border-none">
            <SavingsChart />
          </Card>
        </div>
        <Card className="bg-transparent border-none">
          <ContractSimulator />
        </Card>
      </div>
    </div>
  )
}

