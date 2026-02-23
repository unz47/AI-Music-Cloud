import type { Metadata } from "next";

export const metadata: Metadata = { title: "利用規約" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-text-secondary">
      <h1 className="mb-8 text-2xl font-bold text-text-primary">利用規約</h1>
      <p className="mb-4 text-xs text-text-tertiary">最終更新日: 2026年2月23日</p>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">1. サービスの概要</h2>
        <p className="text-sm leading-relaxed">
          AI Music Cloud（以下「本サービス」）は、AI生成音楽の投稿・共有・視聴を目的としたプラットフォームです。本サービスを利用することにより、本利用規約に同意したものとみなされます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">2. アカウント</h2>
        <p className="text-sm leading-relaxed">
          本サービスの一部機能を利用するにはGoogleアカウントによるログインが必要です。アカウントの管理はユーザー自身の責任で行ってください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">3. コンテンツの投稿</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>投稿するコンテンツは、ユーザー自身がAIツール（Suno、Udio等）を使用して生成したものに限ります。</li>
          <li>他者の著作権、商標権、プライバシー権、その他の権利を侵害するコンテンツの投稿は禁止します。</li>
          <li>違法、有害、脅迫的、虐待的、嫌がらせ、中傷的、わいせつなコンテンツの投稿は禁止します。</li>
          <li>投稿されたコンテンツの権利はユーザーに帰属しますが、本サービス上での配信・表示に必要な範囲でのライセンスを本サービスに付与するものとします。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">4. 禁止事項</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>本サービスの不正利用、サーバーへの過度な負荷をかける行為</li>
          <li>他のユーザーへのなりすまし</li>
          <li>スパム、マルウェアの配布</li>
          <li>本サービスのリバースエンジニアリング</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">5. コンテンツの削除</h2>
        <p className="text-sm leading-relaxed">
          本サービスは、本規約に違反するコンテンツを事前の通知なく削除する権利を有します。また、権利者からの申し立てがあった場合、該当コンテンツを削除する場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">6. 免責事項</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>本サービスは「現状のまま」提供され、いかなる保証も行いません。</li>
          <li>ユーザーが投稿したコンテンツに関する責任はユーザー自身が負います。</li>
          <li>本サービスの利用により生じた損害について、運営者は一切の責任を負いません。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">7. 規約の変更</h2>
        <p className="text-sm leading-relaxed">
          本規約は予告なく変更される場合があります。変更後も本サービスを利用した場合、変更後の規約に同意したものとみなされます。
        </p>
      </section>
    </div>
  );
}
