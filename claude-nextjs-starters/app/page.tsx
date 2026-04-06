import Link from "next/link"
import { Code2, Layers, Moon, Package, Paintbrush, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// 주요 기능 카드 데이터
const features = [
  {
    icon: Layers,
    title: "Next.js 16",
    description: "App Router, Server Components, Streaming을 활용한 최신 Next.js 아키텍처",
  },
  {
    icon: Code2,
    title: "TypeScript",
    description: "완전한 타입 안전성으로 개발 생산성과 코드 품질을 동시에 향상",
  },
  {
    icon: Paintbrush,
    title: "Tailwind CSS v4",
    description: "CSS 변수 기반의 새로운 테마 시스템과 향상된 성능을 제공",
  },
  {
    icon: Package,
    title: "shadcn/ui",
    description: "접근성을 갖춘 Radix UI 기반 컴포넌트로 빠른 UI 개발 가능",
  },
  {
    icon: Moon,
    title: "다크모드",
    description: "next-themes를 활용한 시스템 설정 연동 및 수동 테마 전환 지원",
  },
  {
    icon: Zap,
    title: "빠른 성능",
    description: "React 19와 최적화된 번들링으로 최고의 웹 바이탈 점수 달성",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero 섹션 */}
        <section className="container mx-auto flex flex-col items-center gap-6 px-4 py-24 text-center">
          <Badge variant="secondary">New · Next.js 16 + React 19</Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            빠른 웹 개발 시작
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Next.js 16, React 19, Tailwind CSS v4, shadcn/ui로 구성된 프로덕션 수준의
            스타터킷입니다. 복잡한 설정 없이 바로 개발을 시작하세요.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                시작하기
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">문서 보기</Link>
            </Button>
          </div>
        </section>

        {/* Features 섹션 */}
        <section className="container mx-auto px-4 pb-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">주요 기능</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
