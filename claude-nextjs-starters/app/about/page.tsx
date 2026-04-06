import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/layout/page-header"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <PageHeader
          title="소개"
          description="Claude Next.js Starters 프로젝트에 대해 알아보세요."
        />
        <p className="mt-8 text-muted-foreground">소개 내용을 준비 중입니다.</p>
      </main>
      <Footer />
    </div>
  )
}
