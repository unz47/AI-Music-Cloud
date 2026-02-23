import type { Metadata } from "next";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-text-secondary">
      <h1 className="mb-8 text-2xl font-bold text-text-primary">プライバシーポリシー</h1>
      <p className="mb-4 text-xs text-text-tertiary">最終更新日: 2026年2月23日</p>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">1. 収集する情報</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li><strong>アカウント情報:</strong> Googleログイン時に提供される名前、メールアドレス、プロフィール画像</li>
          <li><strong>投稿コンテンツ:</strong> アップロードされた音楽ファイル、アートワーク、楽曲情報</li>
          <li><strong>利用データ:</strong> 再生回数、いいね、フォロー等のアクティビティ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">2. 情報の利用目的</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>本サービスの提供・運営・改善</li>
          <li>ユーザーアカウントの管理・認証</li>
          <li>ユーザーサポートの提供</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">3. 情報の共有</h2>
        <p className="text-sm leading-relaxed">
          ユーザーの個人情報を第三者に販売・貸与することはありません。ただし、以下の場合を除きます：
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mt-2">
          <li>法令に基づく開示要求があった場合</li>
          <li>ユーザーの同意がある場合</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">4. データの保管</h2>
        <p className="text-sm leading-relaxed">
          データはAmazon Web Services（AWS）のサーバーに保管されます。適切なセキュリティ対策を講じていますが、インターネット上の通信の完全な安全性を保証するものではありません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">5. Cookieの使用</h2>
        <p className="text-sm leading-relaxed">
          本サービスでは、認証状態の維持のためにCookieを使用します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">6. お問い合わせ</h2>
        <p className="text-sm leading-relaxed">
          プライバシーに関するお問い合わせは、本サービス内のReportフォームよりご連絡ください。
        </p>
      </section>
    </div>
  );
}
