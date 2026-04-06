import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/layout/page-header"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <PageHeader
          title="문서"
          description="Claude Next.js Starters 사용 가이드와 API 레퍼런스를 확인하세요."
        />
        <p className="mt-8 text-muted-foreground">문서 내용을 준비 중입니다.</p>
      </main>
      <Footer />
    </div>
  )
}
